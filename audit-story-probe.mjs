import { chromium } from 'playwright';

const storybookUrl = 'http://localhost:6006';
const ids = process.argv.slice(2);
const viewport = { width: 1440, height: 900 };

const parseFilter = (filter, name) => {
  const m = filter.match(new RegExp(`${name}\\(\\s*([\\d.]+)px?\\s*\\)`));
  return m ? Number(m[1]) : null;
};

for (const id of ids) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message.slice(0, 300)));
  const url = `${storybookUrl}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&globals=previewMode:light`;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForFunction(() => {
      const root = document.querySelector('#storybook-root') || document.querySelector('#root');
      if (!root) return false;
      const box = root.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && (root.textContent?.trim() || root.querySelector('canvas,svg,img,video') || [...root.querySelectorAll('*')].some(n => { const s=getComputedStyle(n); const b=n.getBoundingClientRect(); return s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||'1')>0.01&&b.width>1&&b.height>1; }));
    }, { timeout: 20000 });
    await page.waitForTimeout(200);
    const result = await page.evaluate(() => {
      const els = [...document.querySelectorAll('*')].filter((el) => {
        const s = getComputedStyle(el);
        const b = el.getBoundingClientRect();
        if (b.width <= 0 || b.height <= 0) return false;
        const cls = el.className?.toString?.() || '';
        const bd = s.backdropFilter !== 'none' || s.webkitBackdropFilter !== 'none';
        const glass = /glass-surface|optimized-glass-surface|liquid-glass/i.test(cls);
        return bd || glass;
      }).sort((a, b) => {
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return (rb.width * rb.height) - (ra.width * ra.height);
      }).slice(0, 4);
      return els.map((el) => {
        const s = getComputedStyle(el);
        const b = el.getBoundingClientRect();
        const cls = el.className?.toString?.() || '';
        return {
          cls: cls.slice(0, 220),
          w: Math.round(b.width), h: Math.round(b.height),
          scrollW: el.scrollWidth, clientW: el.clientWidth,
          bd: s.backdropFilter, webkitBd: s.webkitBackdropFilter,
          bg: s.backgroundColor, bgImage: s.backgroundImage?.slice(0, 200),
          border: s.borderTopColor,
        };
      });
    });
    const docOverflow = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    console.log('\n=== ' + id + ' ===');
    console.log(JSON.stringify({ surfaces: result, docOverflow, errors }, null, 1));
  } catch (e) {
    console.log('\n=== ' + id + ' ERROR ===');
    console.log(e.message.slice(0, 500));
  } finally {
    await browser.close();
  }
}
