import { chromium } from 'playwright';
const story = process.argv[2] || 'controls-buttons-glass-button--default';
const url = `http://localhost:6006/iframe.html?id=${story}&viewMode=story&globals=previewMode:light`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const data = await p.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll('*')) {
    const cls = String(el.className || '');
    if (!/glass|liquid/.test(cls)) continue;
    const cs = getComputedStyle(el);
    const bf = cs.backdropFilter || 'none';
    if (bf === 'none' && !/glass-surface|glass-foundation|optimized-glass/.test(cls)) continue;
    const r = el.getBoundingClientRect();
    out.push({
      tag: el.tagName, cls: cls.slice(0, 140), w: Math.round(r.width), h: Math.round(r.height),
      bf: bf.slice(0, 90), bg: cs.backgroundColor, bgImage: (cs.backgroundImage||'').slice(0,160),
      border: cs.borderTopColor, scrollW: el.scrollWidth, clientW: el.clientWidth,
    });
  }
  return out.slice(0, 12);
});
console.log(JSON.stringify(data, null, 1));
await b.close();
