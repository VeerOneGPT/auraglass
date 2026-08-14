import { chromium } from 'playwright';
const targets = [
  ['navigation-menu','navigation-glass-navigation-menu--default'],
  ['optimized-glass-advanced','foundations-liquid-glass-primitives-optimized-glass-advanced--default'],
  ['liquid-glass-material','foundations-liquid-glass-primitives-liquid-glass-material--default'],
  ['loading-skeleton','data-visualization-glass-loading-skeleton--default'],
  ['data-chart','data-visualization-glass-data-chart--default'],
  ['bottom-nav','navigation-glass-bottom-nav--default'],
];
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [label, id] of targets) {
  try {
    await page.goto(`http://localhost:6006/iframe.html?id=${id}&viewMode=story&globals=previewMode:light`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(1200);
    const out = await page.evaluate((label) => {
      const els = [...document.querySelectorAll('[data-glass-component], .glass-backdrop-blur, .liquid-glass-material, .optimized-glass-surface, .glass-surface-primary, .glass-surface-subtle, .glass-skeleton, canvas')];
      const info = els.slice(0, 8).map((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          cls: (el.className?.baseVal ?? el.className ?? '').toString().slice(0, 120),
          backdrop: cs.backdropFilter || null,
          webkit: cs.getPropertyValue('-webkit-backdrop-filter') || null,
          bg: cs.backgroundColor,
          bgImage: (cs.backgroundImage || '').slice(0, 120),
          border: cs.borderTopColor + ' ' + cs.borderTopWidth,
          w: Math.round(r.width), h: Math.round(r.height),
          scrollW: el.scrollWidth, clientW: el.clientWidth,
        };
      });
      return { label, surfaces: info, consoleWarnings: [] };
    }, label);
    console.log(JSON.stringify({ label, ...out }, null, 1));
  } catch (e) {
    console.log(JSON.stringify({ label, error: String(e).slice(0, 200) }));
  }
}
await browser.close();
