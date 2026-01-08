# OG Advisory Executive Compensation Tracker - Chrome Extension

A Chrome browser extension that provides quick access to executive compensation data for portfolio companies including LMFA, BTBT, HIVE, DMG, and PHX.

## Features

- **Quick Access**: View executive compensation data right from your browser toolbar
- **Company Search**: Search through portfolio companies by ticker or full name
- **Financial Overview**: See market cap, revenue, EBITDA, and net income for each company
- **Executive Details**: View detailed compensation breakdowns for each executive
- **Compact Design**: Optimized interface for browser extension popup
- **Multi-Year Data**: Access compensation data for FY2023 and FY2024

## Installation

### Step 1: Generate Extension Icons

Before installing the extension, you need to generate the required icon files:

1. Open `icons/generate-icons.html` in your web browser
2. Download all four icon sizes (16px, 32px, 48px, 128px)
3. Save them to the `icons/` directory with the exact filenames shown

Alternatively, see `icons/README.md` for other methods to generate icons.

### Step 2: Load the Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked"
5. Select the directory containing this extension (the root folder with `manifest.json`)
6. The extension icon should now appear in your Chrome toolbar

## Usage

### Viewing Company List

1. Click the extension icon in your Chrome toolbar
2. The popup will display all portfolio companies with:
   - Company name and ticker
   - Market cap and revenue
   - Total compensation for the latest fiscal year

### Searching Companies

- Use the search box at the top to filter companies by ticker or name
- Search is case-insensitive and updates in real-time

### Viewing Company Details

1. Click on any company card in the list
2. The detail view shows:
   - Complete financial overview (market cap, revenue, EBITDA, net income)
   - Compensation summary (total and average per executive)
   - Individual executive compensation breakdowns
3. Click the back arrow (←) to return to the company list

### Executive Compensation Details

For each executive, you can view:
- Base salary
- Cash bonus or annual incentive
- Stock awards (with units where applicable)
- Option awards
- Other compensation
- Total compensation

## File Structure

```
├── manifest.json           # Extension configuration
├── popup.html             # Extension popup interface
├── popup.js               # Extension functionality and data
├── icons/                 # Extension icons
│   ├── icon16.png        # 16x16 icon
│   ├── icon32.png        # 32x32 icon
│   ├── icon48.png        # 48x48 icon
│   ├── icon128.png       # 128x128 icon
│   ├── icon.svg          # SVG source
│   ├── generate-icons.html  # Icon generator tool
│   └── README.md         # Icon generation instructions
├── index.html            # Full dashboard (separate from extension)
└── EXTENSION_README.md   # This file
```

## Data Coverage

The extension includes compensation data for:

- **LMFA** (LM Funding America, Inc.) - USD
- **BTBT** (Bit Digital, Inc.) - USD
- **HIVE** (HIVE Digital Technologies) - CAD
- **DMG** (DMG Blockchain Solutions) - CAD
- **PHX** (Phoenix Group PLC) - USD

## Updating Data

To update compensation or financial data:

1. Open `popup.js`
2. Locate the `financialData` and `compensationData` objects
3. Update the relevant values following the existing structure
4. Reload the extension in Chrome:
   - Go to `chrome://extensions/`
   - Click the refresh icon on the extension card

## Customization

### Changing Colors

The extension uses the OG Advisory brand colors:
- Primary dark: `#1a1a1a`
- Orange accent: `#e67e22`
- Background: `#d4cdc4`
- Light background: `#f8f6f3`

To customize colors, edit the CSS in `popup.html`.

### Adding More Companies

To add a new company:

1. Add financial data to the `financialData` object in `popup.js`
2. Add compensation data to the `compensationData` object in `popup.js`
3. Add the ticker to the companies array in `renderCompanyList()` function

## Troubleshooting

### Extension won't load
- Ensure all icon files are present in the `icons/` directory
- Check that `manifest.json` is in the root directory
- Verify Developer Mode is enabled in Chrome

### Data not displaying
- Check the browser console for errors (F12 → Console tab)
- Verify the data structure in `popup.js` matches the expected format

### Icons not showing
- Ensure all four icon sizes are generated and saved in `icons/`
- Icon filenames must match exactly: icon16.png, icon32.png, icon48.png, icon128.png

## Development

Built with:
- Manifest V3 (latest Chrome extension format)
- Vanilla JavaScript (no frameworks)
- CSS Grid for responsive layouts

## Support

For issues or questions about the extension, please contact the OG Advisory development team.

## Related Files

- **index.html** - Full web-based dashboard (separate from this extension)
- **icons/generate-icons.html** - Tool to generate extension icons

---

**Orange Group Advisors**
https://www.orangegroupadvisors.com/
