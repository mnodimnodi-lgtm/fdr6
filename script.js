const { chromium } = require('playwright');

// بيانات التجربة (غيرها حسب ما تحب)
const username = 'testuser';
const email = 'test@mail.com';
const password = '518184ff';
const senderName = 'MySender';
const message = 'Hello there!';
const numbersList = '1234567890\n0987654321'; // كل رقم بسطر جديد

// تنويع
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/605.1.15 Version/17.1 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36'
];
const locales = ['en-US', 'en-GB', 'fr-FR', 'de-DE'];
const viewports = [
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1536, height: 864 },
  { width: 1920, height: 1080 }
];
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

(async () => {
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    userAgent: pick(userAgents),
    locale: pick(locales),
    viewport: pick(viewports)
  });

  const page = await context.newPage();

  // === صفحة التسجيل ===
  await page.goto('https://hustlers.ly/signup', { waitUntil: 'networkidle' });
  await page.fill('#username', username);
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.fill('#password-confirmation-field input', password); // لو confirmation input جوه div
  await page.click('#submit');
  await page.waitForTimeout(2000); // استنى التحميل

  // === صفحة SMS ===
  await page.goto('https://hustlers.ly/sms', { waitUntil: 'networkidle' });
  await page.fill('#checker', senderName);
  await page.fill('#format', message);
  await page.fill('#cards', numbersList);
  await page.click('button:text("Send")'); // لو الزرار فيه نص Send
  await page.waitForTimeout(2000);

  await browser.close();
})();
