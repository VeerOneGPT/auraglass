import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:6006/iframe.html?id=navigation-glass-tabs--default&viewMode=story&globals=previewMode:light', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
const rows = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.body;
  const tabs = [...root.querySelectorAll('[class*="glass-tabs"]')];
  const out = [];
  for (const t of tabs.slice(0, 8)) {
    const s = getComputedStyle(t);
    const b = t.getBoundingClientRect();
    out.push({ tag: t.tagName, cls: (t.className||'').slice(0,180), boxL: b.left, boxR: b.right, boxW: b.width, sw: t.scrollWidth, cw: t.clientWidth, overflowX: s.overflowX, display: s.display, flexWrap: s.flexWrap, flexDirection: s.flexDirection, maxW: s.maxWidth, gap: s.gap, minW0: s.minWidth });
  }
  return out;
});
console.log(JSON.stringify(rows, null, 2));
await browser.close();
