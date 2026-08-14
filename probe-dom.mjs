import { chromium } from 'playwright';
const story = process.argv[2];
const url = `http://localhost:6006/iframe.html?id=${story}&viewMode=story&globals=previewMode:light`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const data = await p.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.body;
  const walk = (el, depth) => {
    if (depth > 6) return [];
    const out = [];
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    out.push({
      d: depth, tag: el.tagName.toLowerCase(), cls: String(el.className||'').slice(0,120),
      w: Math.round(r.width), h: Math.round(r.height), bf: (cs.backdropFilter||'none').slice(0,60),
      bg: cs.backgroundColor, bgImage: (cs.backgroundImage||'').slice(0,120),
    });
    for (const c of el.children) out.push(...walk(c, depth+1));
    return out;
  };
  return walk(root, 0).slice(0, 40);
});
console.log(JSON.stringify(data, null, 1));
await b.close();
