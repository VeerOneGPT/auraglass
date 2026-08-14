import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage();
await page.goto('http://localhost:6006/iframe.html?id=foundations-liquid-glass-primitives-optimized-glass-core--default&viewMode=story', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const out = await page.evaluate(() => {
  const el = document.querySelector('.optimized-glass-surface');
  if (!el) return { found: false };
  const cs = getComputedStyle(el);
  return {
    found: true,
    inline: el.getAttribute('style'),
    backdrop: cs.backdropFilter,
    webkitGet: cs.getPropertyValue('-webkit-backdrop-filter'),
  };
});
console.log(JSON.stringify(out, null, 2));
await browser.close();
