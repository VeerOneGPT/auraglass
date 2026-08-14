import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:6006/iframe.html?id=navigation-glass-responsive-nav--default&viewMode=story&globals=previewMode:light', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
const out = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root');
  const nav = root?.querySelector('[role="navigation"]');
  const tabs = root?.querySelectorAll('[role="tablist"]');
  const res = [];
  if (nav) {
    const s = getComputedStyle(nav); const b = nav.getBoundingClientRect();
    res.push({kind:'wrapper', cls:String(nav.className), w:b.width,h:b.height, display:s.display, position:s.position, overflow:s.overflow});
    for (const c of nav.children) {
      const cs = getComputedStyle(c); const cb = c.getBoundingClientRect();
      res.push({kind:'child', tag:c.tagName, cls:String(c.className).slice(0,180), w:cb.width,h:cb.height, display:cs.display, position:cs.position, overflow:cs.overflow, bf:cs.backdropFilter});
    }
  }
  for (const t of tabs) {
    const s = getComputedStyle(t); const b = t.getBoundingClientRect();
    res.push({kind:'tablist', cls:String(t.className).slice(0,220), w:b.width,h:b.height, display:s.display, position:s.position, top:b.top, bottom:b.bottom});
  }
  return res;
});
console.log(JSON.stringify(out, null, 2));
await browser.close();
