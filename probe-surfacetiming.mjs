import { chromium } from "playwright";
const base = process.env.STORYBOOK_URL || "http://localhost:6006";
const ids = (process.argv[2] || "foundations-liquid-glass-primitives-glass-advanced--default,surfaces-app-shells-layout-glass-flex--default,effects-advanced-glass-engine--interactive-demo,surfaces-app-shells-layout-glass-app-shell--default,foundations-liquid-glass-primitives-liquid-glass-backdrop-sampler--default,data-visualization-glass-data-chart--default,controls-buttons-glass-button--default").split(",").filter(Boolean);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });
await page.addInitScript(() => {
  window.matchMedia = window.matchMedia || ((q) => ({ matches: false, media: q, onchange: null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){} }));
});
for (const id of ids) {
  const url = `${base}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&globals=previewMode:light`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
  const snap = async (label) => {
    const data = await page.evaluate(() => {
      const isChrome = (node) => {
        const cls = String(node.className || "");
        if (/\bglass-on-light\b/.test(cls)) return true;
        if (/\bag-story-\b/.test(cls)) return true;
        if (node.closest('[class*="ag-story-"]')) return true;
        if (/\bcontrast-guard\b|\bglass-contrast-guard\b/.test(cls)) return true;
        if (/\bglass-sr-only\b/.test(cls)) return true;
        const tag = node.tagName.toLowerCase();
        if (tag === "a" && /skip-link|sr-only/i.test(cls)) return true;
        return false;
      };
      const root = document.querySelector("#storybook-root") || document.querySelector("#root") || document.body;
      const all = [...root.querySelectorAll("*")];
      const candidates = all.filter((node) => {
        if (isChrome(node)) return false;
        const style = window.getComputedStyle(node);
        const box = node.getBoundingClientRect();
        if (box.width <= 1 || box.height <= 1) return false;
        if (style.display === "none" || style.visibility === "hidden") return false;
        if (Number(style.opacity || "1") <= 0.01) return false;
        const cls = String(node.className || "");
        const bd = style.backdropFilter || style.webkitBackdropFilter || "none";
        if (bd !== "none") return true;
        return /glass-surface(?:-|$)/.test(cls) || /\boptimized-glass-surface\b/.test(cls) || /liquid-glass-(?:material|concentric-frame|scroll-edge|surface-layer|transition|source|destination|effect|layer-provider)/.test(cls);
      });
      const withBd = candidates.filter((n) => (getComputedStyle(n).backdropFilter || getComputedStyle(n).webkitBackdropFilter || "none") !== "none");
      const pool = withBd.length ? withBd : candidates;
      return pool.slice(0, 3).map((n) => {
        const cs = getComputedStyle(n);
        return { cls: String(n.className||"").slice(0,90), tag: n.tagName.toLowerCase(), bd: cs.backdropFilter || cs.webkitBackdropFilter, w: Math.round(n.getBoundingClientRect().width), h: Math.round(n.getBoundingClientRect().height) };
      });
    });
    console.log(id, label, JSON.stringify(data));
  };
  await page.waitForFunction(() => { const r = document.querySelector("#storybook-root"); return r && r.getBoundingClientRect().width > 0 && (r.textContent?.trim()?.length || r.querySelectorAll("*").length > 0); }, { timeout: 20000 });
  await snap("t150");
  await page.waitForTimeout(700);
  await snap("t850");
  await page.waitForTimeout(1200);
  await snap("t2050");
}
await browser.close();
