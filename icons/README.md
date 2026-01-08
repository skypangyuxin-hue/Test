# Extension Icons

This directory contains the icons for the OG Advisory Executive Compensation Tracker Chrome extension.

## Generating Icons

The extension requires PNG icons in the following sizes:
- icon16.png (16x16 pixels)
- icon32.png (32x32 pixels)
- icon48.png (48x48 pixels)
- icon128.png (128x128 pixels)

### Method 1: Using the Icon Generator (Recommended)

1. Open `generate-icons.html` in your web browser
2. Click the "Download" button for each icon size
3. Save each file to this `icons/` directory with the exact filename shown

### Method 2: Convert from SVG

You can also convert `icon.svg` to PNG using any image editing tool:

**Using ImageMagick (command line):**
```bash
convert -background none -resize 16x16 icon.svg icon16.png
convert -background none -resize 32x32 icon.svg icon32.png
convert -background none -resize 48x48 icon.svg icon48.png
convert -background none -resize 128x128 icon.svg icon128.png
```

**Using online tools:**
- Visit https://cloudconvert.com/svg-to-png
- Upload `icon.svg`
- Set the desired dimensions
- Download and rename the files

### Method 3: Create Custom Icons

You can also create your own custom icons using any image editor (Photoshop, GIMP, Figma, etc.). Just make sure to save them with the correct filenames in this directory.

## Design Specifications

The current icon design features:
- Dark background (#1a1a1a)
- Orange accent circle (#e67e22)
- "OG" text in white
- Rounded corners (24px radius at 128px size)

Feel free to customize the design to match your branding!
