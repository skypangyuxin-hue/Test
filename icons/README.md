# Extension Icons

This directory should contain the following icon files for the Chrome extension:

- `icon-16.png` - 16x16 pixels (toolbar icon)
- `icon-48.png` - 48x48 pixels (extension management page)
- `icon-128.png` - 128x128 pixels (Chrome Web Store)

## Creating Icons

You can create these icons using any image editor. Here's a quick way to create placeholder icons:

### Using ImageMagick (if installed):

```bash
# Create a simple purple gradient icon
convert -size 128x128 gradient:purple-blue icon-128.png
convert -size 48x48 gradient:purple-blue icon-48.png
convert -size 16x16 gradient:purple-blue icon-16.png
```

### Or use an online tool:
- https://www.favicon-generator.org/
- Upload a logo or image
- Download 16x16, 48x48, and 128x128 versions

## Temporary Workaround

For testing purposes, you can temporarily modify `manifest.json` to remove icon references:

```json
{
  "action": {
    "default_popup": "popup.html"
  }
}
```

Note: The extension will work without icons, but Chrome will show a default placeholder icon.
