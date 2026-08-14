import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:6006/iframe.html?id=navigation-glass-responsive-nav--default&viewMode=story&globals=previewMode:light', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
const out = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root');
  const nav = root?.querySelector('[role="navigation"]');
  if (!nav) return 'NO NAV';
  const s = getComputedStyle(nav); const b = nav.getBoundingClientRect();
  return {
    innerHTML: nav.innerHTML.slice(0, 2000),
    childCount: nav.childElementCount,
    h: b.height, w: b.width,
    paddingTop: s.paddingTop, paddingBottom: s.paddingBottom, minHeight: s.minHeight,
    outerHTML: nav.outerHTML.slice(0, 500),
  };
});
console.log(JSON.stringify(out, null, 2));
await browser.close();
