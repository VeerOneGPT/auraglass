import { chromium } from 'playwright';
const storybookUrl = 'http://localhost:6006';
const id = process.argv[2];
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const url = `${storybookUrl}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&globals=previewMode:light`;
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
await page.waitForTimeout(2500);
const result = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.querySelector('#root');
  if (!root) return 'NO ROOT';
  const walk = (el, depth) => {
    if (depth > 20) return '';
    const cls = (el.className && el.className.toString) ? el.className.toString() : (el.getAttribute?.('class') || '');
    const s = getComputedStyle(el);
    const b = el.getBoundingClientRect();
    let out = `${'  '.repeat(depth)}<${el.tagName.toLowerCase()} aria="${el.getAttribute?.('aria-label') || ''}" class="${cls.slice(0,300)}" w=${Math.round(b.width)} h=${Math.round(b.height)} sh=${el.scrollHeight} ch=${el.clientHeight} oy=${s.overflowY} bd=${(s.backdropFilter||'none').slice(0,50)}>\n`;
    for (const c of el.children) out += walk(c, depth + 1);
    return out;
  };
  return walk(root, 0);
});
console.log(result.slice(0, 30000));
await browser.close();
