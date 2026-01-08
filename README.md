# Claude Chrome Connector

A Chrome extension that enables bidirectional communication between Claude and the Executive Compensation Dashboard.

## Features

- ✅ Bidirectional message passing between extension and dashboard
- ✅ Real-time connection status monitoring
- ✅ Interactive popup UI for sending commands
- ✅ Message history and logging
- ✅ Support for multiple tabs simultaneously

## Installation

### 1. Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the `/home/user/Test` directory (this repository folder)
5. The extension should now appear in your extensions list

### 2. Pin the Extension (Optional)

1. Click the puzzle piece icon in Chrome toolbar
2. Find "Claude Chrome Connector"
3. Click the pin icon to keep it visible

## Usage

### Opening the Dashboard

1. Open `index.html` in Chrome (either as a local file or hosted on a server)
2. The extension will automatically inject and establish connection
3. Check the browser console to see connection messages

### Using the Extension Popup

1. Click the extension icon in the Chrome toolbar
2. You'll see:
   - **Connection status** (green dot when connected)
   - **Active connections** (list of tabs with the dashboard)
   - **Message input** (JSON or plain text)
   - **Recent messages** (communication log)

### Sending Messages to Dashboard

From the extension popup, you can send JSON commands:

#### Get Companies List
```json
{"action": "GET_COMPANIES"}
```

#### Get Specific Company Data
```json
{"action": "GET_COMPANY_DATA", "company": "BTBT"}
```

#### Select a Company
```json
{"action": "SELECT_COMPANY", "company": "DMG"}
```

#### Change Year
```json
{"action": "CHANGE_YEAR", "year": 2023}
```

#### Get Current State
```json
{"action": "GET_STATE"}
```

#### Ping Test
```json
{"action": "ping"}
```

## Architecture

### Communication Flow

```
Dashboard (index.html)
    ↕ window.postMessage()
Content Script (content.js)
    ↕ chrome.runtime.sendMessage()
Background Service Worker (background.js)
    ↕ chrome.runtime.sendMessage()
Extension Popup (popup.html/js)
```

### Message Protocol

**Dashboard → Extension:**
```javascript
window.postMessage({
  type: 'FROM_DASHBOARD',
  payload: { /* your data */ }
}, '*');
```

**Extension → Dashboard:**
```javascript
window.postMessage({
  type: 'FROM_EXTENSION',
  payload: { /* your data */ }
}, '*');
```

## Dashboard API

The dashboard listens for these message actions:

| Action | Parameters | Response | Description |
|--------|------------|----------|-------------|
| `GET_COMPANIES` | - | `COMPANY_LIST` | Returns list of all companies |
| `GET_COMPANY_DATA` | `company` (string) | `COMPANY_DATA` | Returns full data for a company |
| `SELECT_COMPANY` | `company` (string) | `COMPANY_SELECTED` | Selects company in UI |
| `CHANGE_YEAR` | `year` (number) | `YEAR_CHANGED` | Changes fiscal year |
| `GET_STATE` | - | `CURRENT_STATE` | Returns current dashboard state |
| `ping` | - | `PONG` | Health check |

## Files Structure

```
/home/user/Test/
├── manifest.json          # Extension configuration
├── background.js          # Service worker (message router)
├── content.js             # Content script (page injection)
├── popup.html             # Extension popup UI
├── popup.js               # Popup logic
├── index.html             # Dashboard (with extension integration)
├── icons/                 # Extension icons
│   └── README.md          # Instructions for adding icons
└── README.md              # This file
```

## Development

### Debugging

**Content Script:**
- Open dashboard page
- Press F12 → Console tab
- Look for messages prefixed with "Claude Chrome"

**Background Script:**
- Navigate to `chrome://extensions/`
- Find "Claude Chrome Connector"
- Click "service worker" link
- Console will show background script logs

**Popup:**
- Right-click extension icon → Inspect popup
- Console will show popup script logs

### Modifying the Extension

After making changes:
1. Go to `chrome://extensions/`
2. Click the refresh icon on "Claude Chrome Connector"
3. Reload any open dashboard tabs

## Example Use Cases

### 1. Automated Company Selection

```javascript
// From popup, select DMG company
{"action": "SELECT_COMPANY", "company": "DMG"}
```

### 2. Data Extraction

```javascript
// Get all companies
{"action": "GET_COMPANIES"}

// Get specific data
{"action": "GET_COMPANY_DATA", "company": "BTBT"}
```

### 3. Dashboard Control

```javascript
// Change to 2023 data
{"action": "CHANGE_YEAR", "year": 2023}

// Check current state
{"action": "GET_STATE"}
```

## Security Notes

- Extension uses `<all_urls>` permission to work on any page
- Messages are validated before processing
- Only accepts messages from same window (security check)
- No external network requests made

## Troubleshooting

### Extension not connecting?

1. Check that extension is enabled in `chrome://extensions/`
2. Reload the dashboard page
3. Check console for error messages

### Messages not being received?

1. Open browser console on dashboard page
2. Check for "Extension connected" message
3. Verify message format is valid JSON

### Popup shows no connections?

1. Make sure dashboard (index.html) is open in a tab
2. Refresh the dashboard page
3. Check content script is injecting (console messages)

## Icon Placeholder

The extension currently needs icon files. See `icons/README.md` for instructions on creating them. The extension will work without icons but show a default placeholder.

## Version

Current version: 1.0.0

## License

This extension is part of the Claude Chrome integration project.
