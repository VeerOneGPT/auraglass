import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:6006/index.json', { waitUntil: 'networkidle' });
const json = await page.evaluate(() => JSON.parse(document.body.innerText));
const keys = Object.keys(json.entries || {}).filter(k => /optimized/i.test(k));
console.log(keys.slice(0, 30).join('\n'));
await browser.close();
