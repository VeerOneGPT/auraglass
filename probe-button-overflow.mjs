import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:6006/iframe.html?id=foundations-liquid-glass-primitives-button--default&viewMode=story&globals=previewMode:light';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
const rows = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.body;
  const out = [];
  const btns = [...root.querySelectorAll('button')];
  for (const b of btns.slice(0, 5)) {
    const s = getComputedStyle(b);
    const box = b.getBoundingClientRect();
    const rec = { tag: 'button', cls: (b.className||'').slice(0,140), boxW: box.width, sw: b.scrollWidth, cw: b.clientWidth, overflow: s.overflow, overflowX: s.overflowX };
    // pseudo after
    const pa = getComputedStyle(b, '::after');
    const pabox = (() => { const r = b.getBoundingClientRect(); return { left: r.left, top: r.top, w: r.width, h: r.height }; })();
    rec.pseudoAfter = { content: pa.content, position: pa.position, transform: pa.transform, opacity: pa.opacity, animationName: pa.animationName, animationDuration: pa.animationDuration, animationDelay: pa.animationDelay, animationPlayState: pa.animationPlayState, bg: pa.backgroundColor, w: pa.width, h: pa.height };
    // children rects
    rec.children = [...b.children].map(c => {
      const cs = getComputedStyle(c);
      const cb = c.getBoundingClientRect();
      return { tag: c.tagName.toLowerCase(), cls: (c.className||'').slice(0,80), left: cb.left, top: cb.top, w: cb.width, h: cb.height, pos: cs.position, overflow: cs.overflow, transform: cs.transform };
    });
    out.push(rec);
  }
  return out;
});
console.log(JSON.stringify(rows, null, 2));
await browser.close();
