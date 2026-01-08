import puppeteer from 'puppeteer-core';
import * as chromeLauncher from 'chrome-launcher';

async function readFirstPostOf2026() {
  console.log('🚀 Launching Chrome...');

  // Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const browser = await puppeteer.connect({
    browserURL: `http://localhost:${chrome.port}`,
    defaultViewport: null
  });

  try {
    const page = await browser.newPage();

    console.log('📱 Navigating to X...');

    // Navigate to X login page first
    await page.goto('https://x.com/home', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    console.log('⏸️  Please log in to X if needed...');
    console.log('⏸️  Waiting 10 seconds for you to log in...');

    // Wait for user to log in
    await new Promise(resolve => setTimeout(resolve, 10000));

    console.log('👤 Looking for your profile...');

    // Try to find and click on profile link
    try {
      // Wait for the page to load
      await page.waitForSelector('[data-testid="AppTabBar_Profile_Link"], a[href*="/"]', { timeout: 5000 });

      // Get the current user's username from the page
      const profileLink = await page.$('[data-testid="AppTabBar_Profile_Link"]');

      if (profileLink) {
        await profileLink.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
      } else {
        // Alternative: try to navigate to profile by getting username
        console.log('⚠️  Could not find profile link. Please enter your X username:');
        console.log('💡 Or manually navigate to your profile page...');
        await new Promise(resolve => setTimeout(resolve, 15000));
      }

    } catch (error) {
      console.log('⚠️  Please manually navigate to your profile page...');
      await new Promise(resolve => setTimeout(resolve, 15000));
    }

    console.log('📜 Scrolling through posts to find first post of 2026...');

    // Scroll and collect posts
    let posts = [];
    let scrollAttempts = 0;
    const maxScrolls = 20;

    while (scrollAttempts < maxScrolls) {
      // Get all tweets on the page
      const tweets = await page.$$('[data-testid="tweet"]');

      for (const tweet of tweets) {
        try {
          // Get the tweet text
          const textElement = await tweet.$('[data-testid="tweetText"]');
          const timeElement = await tweet.$('time');

          if (textElement && timeElement) {
            const text = await page.evaluate(el => el.textContent, textElement);
            const datetime = await page.evaluate(el => el.getAttribute('datetime'), timeElement);

            const postDate = new Date(datetime);
            const postYear = postDate.getFullYear();

            // Check if this is a 2026 post
            if (postYear === 2026) {
              posts.push({
                text,
                date: datetime,
                timestamp: postDate.getTime()
              });
            }
          }
        } catch (err) {
          // Skip this tweet if we can't parse it
          continue;
        }
      }

      // Scroll down
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await new Promise(resolve => setTimeout(resolve, 2000));

      scrollAttempts++;
      console.log(`📊 Scrolled ${scrollAttempts}/${maxScrolls} times, found ${posts.length} posts from 2026`);
    }

    if (posts.length === 0) {
      console.log('❌ No posts from 2026 found. You might need to scroll more or check your profile.');
      return;
    }

    // Sort posts by timestamp to find the first one
    posts.sort((a, b) => a.timestamp - b.timestamp);

    const firstPost = posts[0];

    console.log('\n🎉 Found your first post of 2026!\n');
    console.log('📅 Date:', new Date(firstPost.date).toLocaleString());
    console.log('📝 Content:\n');
    console.log('─'.repeat(60));
    console.log(firstPost.text);
    console.log('─'.repeat(60));

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.disconnect();
    await chrome.kill();
    console.log('\n✅ Done!');
  }
}

// Run the script
readFirstPostOf2026().catch(console.error);
