import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Landing Page
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  console.log('Landing page loaded');
  await page.screenshot({ path: 'landing-page.png', fullPage: true });

  // Signup Page
  await page.goto('http://localhost:3000/signup', { waitUntil: 'networkidle0' });
  console.log('Signup page opened');
  await page.screenshot({ path: 'signup-page.png', fullPage: true });

  // Login Page
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  console.log('Login page opened');
  await page.screenshot({ path: 'login-page.png', fullPage: true });

  // Guest Chat Page
  await page.goto('http://localhost:3000/chat', { waitUntil: 'networkidle0' });
  console.log('Guest chat page opened');
  await page.screenshot({ path: 'guest-chat-page.png', fullPage: true });

  await browser.close();
})();