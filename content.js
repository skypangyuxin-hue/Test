/**
 * Content Script for Claude Chrome Connector
 * Facilitates communication between the Chrome extension and the dashboard webpage
 */

// Inject a script to bridge the isolated world of content scripts with the page context
const script = document.createElement('script');
script.textContent = `
  (function() {
    // Listen for messages from the dashboard page
    window.addEventListener('message', function(event) {
      // Only accept messages from the same window
      if (event.source !== window) return;

      // Forward dashboard messages to content script
      if (event.data && event.data.type === 'FROM_DASHBOARD') {
        window.postMessage({
          type: 'DASHBOARD_TO_EXTENSION',
          data: event.data.payload
        }, '*');
      }
    });

    // Signal that the extension is connected
    window.postMessage({
      type: 'EXTENSION_CONNECTED',
      timestamp: Date.now()
    }, '*');
  })();
`;
document.documentElement.appendChild(script);
script.remove();

// Listen for messages from the injected script
window.addEventListener('message', (event) => {
  if (event.source !== window) return;

  if (event.data.type === 'DASHBOARD_TO_EXTENSION') {
    // Forward to background script
    chrome.runtime.sendMessage({
      type: 'FROM_DASHBOARD',
      data: event.data.data,
      url: window.location.href,
      timestamp: Date.now()
    }).catch(err => {
      console.error('Claude Chrome: Error sending message to background:', err);
    });
  }
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TO_DASHBOARD') {
    // Inject message into the page context
    window.postMessage({
      type: 'FROM_EXTENSION',
      payload: request.data,
      timestamp: Date.now()
    }, '*');

    sendResponse({ success: true });
  }
  return true; // Keep channel open for async response
});

// Notify background script that content script is ready
chrome.runtime.sendMessage({
  type: 'CONTENT_SCRIPT_READY',
  url: window.location.href,
  title: document.title,
  timestamp: Date.now()
}).catch(err => {
  console.error('Claude Chrome: Error notifying background script:', err);
});

console.log('Claude Chrome Connector: Content script loaded');
