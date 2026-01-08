# X Post Reader

Automated Chrome script to read your first X (Twitter) post from 2026.

## Setup

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## Usage

Run the script:

```bash
npm start
# or
node readPost.js
```

## How it works

1. **Launches Chrome** - Opens a new Chrome browser window
2. **Navigates to X** - Goes to x.com/home
3. **Waits for login** - Gives you 10 seconds to log in (if not already logged in)
4. **Finds your profile** - Attempts to navigate to your profile page
5. **Scrolls through posts** - Scrolls up to 20 times to collect posts from 2026
6. **Finds first post** - Sorts by date and displays your earliest 2026 post

## Notes

- Make sure you're logged into X in your default browser profile
- The script will wait for you to manually log in if needed
- If it can't find your profile automatically, manually navigate to your profile page during the wait period
- The script scrolls through your timeline, so if you have many posts, you might need to increase `maxScrolls`

## Troubleshooting

- **Can't find profile**: Manually navigate to your profile when the script pauses
- **No posts found**: Increase the `maxScrolls` value in `readPost.js`
- **Login issues**: Make sure you're using a browser profile where you're already logged into X
