import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:6006/iframe.html?id=foundations-liquid-glass-primitives-liquid-glass-material--default&viewMode=story';
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
const out = await page.evaluate(() => {
  const el = document.querySelector('.liquid-glass-material');
  if (!el) return { found: false };
  const cs = getComputedStyle(el);
  return {
    found: true,
    inline: el.getAttribute('style'),
    backdrop: cs.backdropFilter,
    webkit: cs.getPropertyValue('-webkit-backdrop-filter'),
    bgColor: cs.backgroundColor,
    bgImage: cs.backgroundImage,
    border: cs.borderTopColor,
  };
});
console.log(JSON.stringify(out, null, 2));
await browser.close();
