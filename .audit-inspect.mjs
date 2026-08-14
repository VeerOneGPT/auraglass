import { chromium } from 'playwright';
const storyId = process.argv[2];
const url = `http://localhost:6006/iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story&globals=previewMode:light`;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
await page.waitForTimeout(1500);
const out = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.querySelector('#root') || document.body;
  const htmlAttrs = { theme: document.documentElement.getAttribute('data-theme'), persona: document.documentElement.getAttribute('data-persona') };
  const rows = [...root.querySelectorAll('*')].map((node) => {
    const s = getComputedStyle(node);
    const b = node.getBoundingClientRect();
    const cls = String(node.className || '');
    if (b.width <= 1 || b.height <= 1) return null;
    if (!/glass|liquid/i.test(cls) && s.backdropFilter === 'none') return null;
    return {
      cls: cls.slice(0, 170),
      tag: node.tagName.toLowerCase(),
      bg: s.backgroundColor,
      bgImg: (s.backgroundImage || '').slice(0, 260),
      bd: s.backdropFilter || (s.webkitBackdropFilter || 'none'),
      color: s.color,
      overflowX: s.overflowX,
      scrollW: node.scrollWidth,
      clientW: node.clientWidth,
    };
  }).filter(Boolean).slice(0, 20);
  return { htmlAttrs, rows };
});
console.log(JSON.stringify(out, null, 2));
await browser.close();
