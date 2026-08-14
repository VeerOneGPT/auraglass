import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:6006/iframe.html?id=controls-inputs-glass-toggle--default&viewMode=story';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const data = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.body;
  const out = [];
  const interactive = [...root.querySelectorAll('button, [href], input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])')];
  for (const n of interactive) {
    const b = n.getBoundingClientRect();
    out.push({ tag: n.tagName, cls: String(n.className||'').slice(0,120), role: n.getAttribute('role'), tab: n.getAttribute('tabindex'), box: [b.x.toFixed(1), b.y.toFixed(1), b.width.toFixed(1), b.height.toFixed(1)] });
  }
  return out;
});
console.log(JSON.stringify(data, null, 1));
await browser.close();
