/**
 * Popup Script for Claude Chrome Connector
 * Manages the extension popup UI and interactions
 */

// DOM elements
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const connectionList = document.getElementById('connectionList');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messageLog = document.getElementById('messageLog');

// State
let activeConnections = [];
let currentTabId = null;
let messages = [];

/**
 * Initialize popup
 */
async function initialize() {
  console.log('Popup initializing...');

  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  currentTabId = tab?.id;

  // Notify background that popup is ready
  chrome.runtime.sendMessage({ type: 'POPUP_READY' }, (response) => {
    if (response?.queuedMessages) {
      messages = response.queuedMessages;
      renderMessages();
    }
  });

  // Get connection state
  chrome.runtime.sendMessage({ type: 'GET_CONNECTION_STATE' }, (response) => {
    if (response?.success) {
      activeConnections = response.connections || [];
      updateConnectionUI();
    }
  });

  // Set up event listeners
  setupEventListeners();

  // Listen for messages from background
  chrome.runtime.onMessage.addListener(handleBackgroundMessage);

  console.log('Popup initialized');
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  sendBtn.addEventListener('click', handleSendMessage);

  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSendMessage();
    }
  });
}

/**
 * Handle messages from background script
 */
function handleBackgroundMessage(request, sender, sendResponse) {
  console.log('Popup received message:', request);

  switch (request.type) {
    case 'TAB_CONNECTED':
      handleTabConnected(request);
      break;

    case 'TAB_DISCONNECTED':
      handleTabDisconnected(request);
      break;

    case 'DASHBOARD_MESSAGE':
      handleDashboardMessage(request);
      break;

    case 'STATE_UPDATE':
      handleStateUpdate(request);
      break;

    case 'ERROR':
      handleError(request);
      break;
  }

  return true;
}

/**
 * Handle tab connected event
 */
function handleTabConnected(data) {
  const existingIndex = activeConnections.findIndex(c => c.tabId === data.tabId);

  if (existingIndex >= 0) {
    activeConnections[existingIndex] = {
      tabId: data.tabId,
      url: data.url,
      title: data.title,
      connected: true
    };
  } else {
    activeConnections.push({
      tabId: data.tabId,
      url: data.url,
      title: data.title,
      connected: true
    });
  }

  updateConnectionUI();
  addLogMessage('System', `Connected to tab: ${data.title}`);
}

/**
 * Handle tab disconnected event
 */
function handleTabDisconnected(data) {
  activeConnections = activeConnections.filter(c => c.tabId !== data.tabId);
  updateConnectionUI();
  addLogMessage('System', `Tab disconnected: ${data.tabId}`);
}

/**
 * Handle message from dashboard
 */
function handleDashboardMessage(data) {
  console.log('Dashboard message:', data);

  const messageData = typeof data.data === 'string' ? data.data : JSON.stringify(data.data, null, 2);
  addLogMessage('Dashboard', messageData);
}

/**
 * Handle state update
 */
function handleStateUpdate(data) {
  if (data.connections) {
    activeConnections = data.connections.map(([tabId, state]) => ({
      tabId,
      ...state
    }));
    updateConnectionUI();
  }
}

/**
 * Handle error
 */
function handleError(data) {
  console.error('Error:', data);
  addLogMessage('Error', data.message || data.error);
}

/**
 * Update connection UI
 */
function updateConnectionUI() {
  const hasConnections = activeConnections.length > 0;

  // Update status indicator
  if (hasConnections) {
    statusDot.classList.add('connected');
    statusText.textContent = `Connected (${activeConnections.length} tab${activeConnections.length > 1 ? 's' : ''})`;
  } else {
    statusDot.classList.remove('connected');
    statusText.textContent = 'No active connections';
  }

  // Update connection list
  if (hasConnections) {
    connectionList.innerHTML = activeConnections.map(conn => `
      <li class="connection-item" data-tab-id="${conn.tabId}">
        <div class="connection-title">${escapeHtml(conn.title || 'Untitled')}</div>
        <div class="connection-url">${escapeHtml(conn.url || '')}</div>
      </li>
    `).join('');

    // Add click handlers
    connectionList.querySelectorAll('.connection-item').forEach(item => {
      item.addEventListener('click', () => {
        const tabId = parseInt(item.dataset.tabId);
        currentTabId = tabId;

        // Visual feedback
        connectionList.querySelectorAll('.connection-item').forEach(i => {
          i.style.background = '';
        });
        item.style.background = '#f0f0f0';
      });
    });

    // Auto-select current tab if available
    if (currentTabId) {
      const currentItem = connectionList.querySelector(`[data-tab-id="${currentTabId}"]`);
      if (currentItem) {
        currentItem.style.background = '#f0f0f0';
      }
    }
  } else {
    connectionList.innerHTML = '<li class="empty-state">No active connections</li>';
  }

  // Update send button state
  sendBtn.disabled = !hasConnections;
}

/**
 * Handle send message
 */
function handleSendMessage() {
  const messageText = messageInput.value.trim();

  if (!messageText) {
    alert('Please enter a message');
    return;
  }

  if (!currentTabId) {
    alert('No active tab selected');
    return;
  }

  try {
    // Try to parse as JSON
    let messageData;
    try {
      messageData = JSON.parse(messageText);
    } catch {
      // If not JSON, send as plain text
      messageData = { message: messageText };
    }

    // Send to background script
    chrome.runtime.sendMessage({
      type: 'SEND_TO_DASHBOARD',
      tabId: currentTabId,
      data: messageData
    }, (response) => {
      if (response?.success) {
        addLogMessage('Sent', JSON.stringify(messageData, null, 2));
        messageInput.value = '';
      } else {
        addLogMessage('Error', 'Failed to send message');
      }
    });
  } catch (err) {
    console.error('Error sending message:', err);
    alert('Error sending message: ' + err.message);
  }
}

/**
 * Add log message
 */
function addLogMessage(source, data) {
  const timestamp = new Date().toLocaleTimeString();

  messages.push({
    source,
    data,
    timestamp
  });

  // Keep only last 20 messages
  if (messages.length > 20) {
    messages = messages.slice(-20);
  }

  renderMessages();
}

/**
 * Render messages
 */
function renderMessages() {
  if (messages.length === 0) {
    messageLog.innerHTML = '<div class="empty-state">No messages yet</div>';
    return;
  }

  messageLog.innerHTML = messages.map(msg => `
    <div class="message-item">
      <div class="message-time">${escapeHtml(msg.timestamp)} - ${escapeHtml(msg.source)}</div>
      <div class="message-data">${escapeHtml(msg.data)}</div>
    </div>
  `).join('');

  // Scroll to bottom
  messageLog.scrollTop = messageLog.scrollHeight;
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initialize);
