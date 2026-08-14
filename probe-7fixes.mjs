import { chromium } from 'playwright';

const storybookUrl = 'http://localhost:6006';
const id = process.argv[2];
const vp = (process.argv[3] || '390x844').split('x').map(Number);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: vp[0], height: vp[1] } });
const url = `${storybookUrl}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&globals=previewMode:light`;
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
await page.waitForTimeout(3000);
const result = await page.evaluate(() => {
  const root = document.querySelector('#storybook-root') || document.querySelector('#root');
  if (!root) return 'NO ROOT';
  const isSurface = (el) => {
    const s = getComputedStyle(el);
    return (s.backdropFilter && s.backdropFilter !== 'none') ||
      /glass-surface|optimized-glass-surface|liquid-glass/.test(el.className?.toString?.() || '');
  };
  const out = [];
  const walk = (el, depth) => {
    const cls = (el.className?.toString?.()) || '';
    const s = getComputedStyle(el);
    if (depth < 12 && (isSurface(el) || /glass-/.test(cls))) {
      const b = el.getBoundingClientRect();
      const over = el.scrollWidth > el.clientWidth + 2;
      const tag = el.tagName.toLowerCase();
      out.push(`${'  '.repeat(Math.min(depth, 6))}<${tag}.${cls.slice(0, 110)}> w=${Math.round(b.width)} sw=${el.scrollWidth} cw=${el.clientWidth} ox=${s.overflowX} oy=${s.overflowY} bd=${(s.backdropFilter||'none').slice(0,40)} bg=${(s.backgroundColor||'').slice(0,32)}${over ? '  <<<OVERFLOW' : ''}`);
    }
    for (const c of el.children) walk(c, depth + 1);
  };
  walk(root, 0);
  return out.join('\n');
});
console.log(result.slice(0, 12000));
await browser.close();
