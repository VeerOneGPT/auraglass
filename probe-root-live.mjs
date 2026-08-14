import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:6006/iframe.html?id=navigation-glass-responsive-nav--default&viewMode=story&globals=previewMode:light', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);
const out = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root');
  const walk = (el, d=0) => {
    if (!el || d>10) return '';
    const cls = typeof el.className === 'string' ? el.className : String(el.className||'');
    const s = getComputedStyle(el); const b = el.getBoundingClientRect();
    return `${'  '.repeat(d)}<${el.tagName.toLowerCase()} "${cls.slice(0,120)}" w=${Math.round(b.width)} h=${Math.round(b.height)} display=${s.display} pos=${s.position}>\n` + [...el.children].map(c=>walk(c,d+1)).join('');
  };
  return walk(root);
});
console.log(out.slice(0,9000));
await browser.close();
