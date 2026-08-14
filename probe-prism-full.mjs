import { chromium } from 'playwright';
const story = 'reference-legacy-components-glass-prism-comparison--default';
const viewport = (process.argv[2] || '390x844').split('x').map(Number);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: viewport[0], height: viewport[1] } });
await page.goto(`http://localhost:6006/iframe.html?id=${story}&viewMode=story&globals=previewMode:light`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1800);
const rows = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.body;
  const isCompact = !!root.querySelector('section.glass-contrast-guard');
  const all = [...root.querySelectorAll('*')];
  const surfaces = all.filter(n => {
    const cls = String(n.className || '');
    const s = getComputedStyle(n);
    const b = n.getBoundingClientRect();
    if (b.width <= 1 || b.height <= 1) return false;
    const bf = s.backdropFilter || s.webkitBackdropFilter || 'none';
    return bf !== 'none' || /glass-surface(?:-|$)/.test(cls) || /glass-foundation/.test(cls);
  }).map(n => {
    const s = getComputedStyle(n);
    const b = n.getBoundingClientRect();
    return { cls: String(n.className || '').slice(0, 130), bf: (s.backdropFilter || 'none').slice(0, 60), w: Math.round(b.width), h: Math.round(b.height) };
  });
  const zeroTexts = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const text = node.textContent?.trim() || '';
    if (text.length) {
      const parent = node.parentElement;
      if (parent) {
        const style = getComputedStyle(parent);
        const color = style.color;
        const m = color.match(/rgba?\([\d.,\s/]+\)/);
        if (m && /(?:0\s*,\s*0\s*,\s*0\s*,\s*0|transparent)/.test(color)) {
          zeroTexts.push({ text: text.slice(0, 30), cls: (parent.className || '').slice(0, 80), color });
        }
      }
    }
    node = walker.nextNode();
  }
  return { isCompact, surfaces: surfaces.slice(0, 12), zeroTexts: zeroTexts.slice(0, 12) };
});
console.log(JSON.stringify(rows, null, 2));
await browser.close();
