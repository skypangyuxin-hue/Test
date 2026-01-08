/**
 * Background Service Worker for Claude Chrome Connector
 * Routes messages between content scripts, popup, and manages extension state
 */

// Store active tabs and their connection status
const connectionState = new Map();

// Message queue for storing messages when popup isn't open
const messageQueue = [];
const MAX_QUEUE_SIZE = 100;

/**
 * Handle installation
 */
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Claude Chrome Connector installed:', details.reason);

  // Initialize storage
  chrome.storage.local.set({
    isConnected: false,
    lastSync: null,
    messageHistory: []
  });
});

/**
 * Handle messages from content scripts and popup
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request.type, request);

  switch (request.type) {
    case 'CONTENT_SCRIPT_READY':
      handleContentScriptReady(sender, request);
      sendResponse({ success: true });
      break;

    case 'FROM_DASHBOARD':
      handleDashboardMessage(sender, request);
      sendResponse({ success: true });
      break;

    case 'POPUP_READY':
      handlePopupReady(sender);
      sendResponse({
        success: true,
        queuedMessages: messageQueue.slice()
      });
      break;

    case 'SEND_TO_DASHBOARD':
      handleSendToDashboard(request);
      sendResponse({ success: true });
      break;

    case 'GET_CONNECTION_STATE':
      sendResponse({
        success: true,
        connections: Array.from(connectionState.entries()).map(([tabId, state]) => ({
          tabId,
          ...state
        }))
      });
      break;

    case 'PING':
      sendResponse({ success: true, pong: true, timestamp: Date.now() });
      break;

    default:
      console.warn('Unknown message type:', request.type);
      sendResponse({ success: false, error: 'Unknown message type' });
  }

  return true; // Keep channel open for async responses
});

/**
 * Handle content script ready signal
 */
function handleContentScriptReady(sender, request) {
  const tabId = sender.tab?.id;
  if (!tabId) return;

  connectionState.set(tabId, {
    url: request.url,
    title: request.title,
    connected: true,
    timestamp: request.timestamp
  });

  console.log(`Content script ready in tab ${tabId}: ${request.title}`);

  // Notify popup if it's open
  notifyPopup({
    type: 'TAB_CONNECTED',
    tabId,
    url: request.url,
    title: request.title
  });

  // Update storage
  updateConnectionState();
}

/**
 * Handle messages from dashboard
 */
function handleDashboardMessage(sender, request) {
  const tabId = sender.tab?.id;

  console.log('Message from dashboard:', request.data);

  // Add to message queue
  addToQueue({
    type: 'DASHBOARD_MESSAGE',
    source: 'dashboard',
    tabId,
    url: request.url,
    data: request.data,
    timestamp: request.timestamp
  });

  // Notify popup
  notifyPopup({
    type: 'DASHBOARD_MESSAGE',
    tabId,
    data: request.data
  });

  // Store in history
  storeMessage(request);
}

/**
 * Handle popup ready signal
 */
function handlePopupReady(sender) {
  console.log('Popup ready');

  // Send current connection state
  chrome.storage.local.get(['isConnected', 'messageHistory'], (result) => {
    notifyPopup({
      type: 'STATE_UPDATE',
      isConnected: result.isConnected,
      connections: Array.from(connectionState.entries())
    });
  });
}

/**
 * Send message to dashboard
 */
function handleSendToDashboard(request) {
  const { tabId, data } = request;

  if (!tabId) {
    console.error('No tab ID specified');
    return;
  }

  // Send to content script, which will forward to page
  chrome.tabs.sendMessage(tabId, {
    type: 'TO_DASHBOARD',
    data: data,
    timestamp: Date.now()
  }).catch(err => {
    console.error('Error sending to dashboard:', err);
    notifyPopup({
      type: 'ERROR',
      message: 'Failed to send message to dashboard',
      error: err.message
    });
  });

  console.log('Sent to dashboard in tab', tabId, ':', data);
}

/**
 * Notify popup of updates
 */
function notifyPopup(message) {
  chrome.runtime.sendMessage(message).catch(err => {
    // Popup might not be open, that's okay
    console.log('Could not notify popup (probably not open):', err.message);
  });
}

/**
 * Add message to queue
 */
function addToQueue(message) {
  messageQueue.push(message);

  // Keep queue size limited
  if (messageQueue.length > MAX_QUEUE_SIZE) {
    messageQueue.shift();
  }
}

/**
 * Store message in history
 */
function storeMessage(request) {
  chrome.storage.local.get(['messageHistory'], (result) => {
    const history = result.messageHistory || [];
    history.push({
      data: request.data,
      url: request.url,
      timestamp: request.timestamp
    });

    // Keep only last 50 messages
    const trimmedHistory = history.slice(-50);

    chrome.storage.local.set({
      messageHistory: trimmedHistory,
      lastSync: Date.now()
    });
  });
}

/**
 * Update connection state in storage
 */
function updateConnectionState() {
  const hasConnections = connectionState.size > 0;
  chrome.storage.local.set({
    isConnected: hasConnections
  });
}

/**
 * Clean up disconnected tabs
 */
chrome.tabs.onRemoved.addListener((tabId) => {
  if (connectionState.has(tabId)) {
    connectionState.delete(tabId);
    updateConnectionState();

    notifyPopup({
      type: 'TAB_DISCONNECTED',
      tabId
    });
  }
});

console.log('Claude Chrome Connector: Background service worker started');
