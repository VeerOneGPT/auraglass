import { chromium } from 'playwright';
const targets = [
  ['mesh-gradient','effects-advanced-glass-mesh-gradient--default'],
  ['webgl-shader','effects-advanced-glass-web-glshader--default'],
  ['magnetic-cursor','effects-advanced-glass-magnetic-cursor--default'],
  ['liquid-transition','effects-advanced-glass-liquid-transition--default'],
  ['audio-player','media-glass-advanced-audio-player--default'],
  ['video-player','media-glass-advanced-video-player--default'],
  ['workspace','workflows-collaborative-glass-workspace--default'],
  ['foundation','primitives-glass-advanced--default'],
  ['optimized','primitives-optimized-glass-advanced--default'],
  ['liquid-material','primitives-liquid-glass-material--default'],
];
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [label, id] of targets) {
  try {
    await page.goto(`http://localhost:6006/iframe.html?id=${id}&viewMode=story&globals=previewMode:light`, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(900);
    const out = await page.evaluate(() => {
      const isChrome = (n) => {
        const c = String(n.className||'');
        if (/glass-on-light|contrast-guard|ag-story-|glass-sr-only/.test(c)) return true;
        return n.closest('[class*="ag-story-"]') !== null;
      };
      const cands = [...document.querySelectorAll('#storybook-root *')].filter(n=>{
        if (isChrome(n)) return false;
        const cs = getComputedStyle(n); const r = n.getBoundingClientRect();
        if (r.width<=1||r.height<=1) return false;
        if (cs.display==='none'||cs.visibility==='hidden') return false;
        if (Number(cs.opacity||'1')<=0.01) return false;
        const bd = cs.backdropFilter || cs.webkitBackdropFilter || 'none';
        const cls = String(n.className||'');
        return bd!=='none' || /glass-surface(?:-|$)/.test(cls) || /\boptimized-glass-surface\b/.test(cls);
      }).sort((a,b)=>{const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect(); return rb.width*rb.height-ra.width*ra.height;}).slice(0,4);
      return cands.map((el)=>{
        const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
        const bd = cs.backdropFilter || cs.webkitBackdropFilter || 'none';
        return { cls:(el.className.baseVal??el.className??'').toString().slice(0,100), bd, bg:cs.backgroundColor, bgImg:(cs.backgroundImage||'').slice(0,120), border:cs.borderTopColor, w:Math.round(r.width), h:Math.round(r.height), scrollW:el.scrollWidth, clientW:el.clientWidth };
      });
    });
    console.log(JSON.stringify({label, surfaces: out}));
  } catch (e) { console.log(JSON.stringify({label, error:String(e).slice(0,140)})); }
}
await browser.close();
