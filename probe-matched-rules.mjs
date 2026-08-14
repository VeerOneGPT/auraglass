import { chromium } from "playwright";
const base = process.env.STORYBOOK_URL || "http://localhost:6006";
const id = process.argv[2] || "controls-buttons-glass-button--default";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });
await page.addInitScript(() => {
  window.matchMedia = window.matchMedia || ((q) => ({ matches: false, media: q, onchange: null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){} }));
});
const url = `${base}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&globals=previewMode:light`;
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
await page.waitForFunction(() => document.querySelector(".optimized-glass-surface"), { timeout: 20000 });
await page.waitForTimeout(400);
const out = await page.evaluate(() => {
  const btn = document.querySelector(".optimized-glass-surface");
  const cs = getComputedStyle(btn);
  const pseudo = getComputedStyle(btn, "::after");
  const cls = String(btn.className);
  const rules = [];
  for (const sheet of document.styleSheets) {
    let href = "";
    try { href = sheet.href || ""; } catch {}
    let rulesList = [];
    try { rulesList = sheet.cssRules || []; } catch {}
    const walk = (list) => {
      for (const r of list) {
        if (r.cssRules) { walk(r.cssRules); continue; }
        if (!r.selectorText) continue;
        if (r.selectorText.includes("::after")) {
          let match = false;
          try { match = btn.matches(r.selectorText.replace(/::after/g, "")); } catch {}
          if (match) rules.push({ selector: r.selectorText, css: r.style.cssText.slice(0, 300), href: href.split("/").slice(-2).join("/") });
        }
      }
    };
    walk(rulesList);
  }
  return {
    cls,
    pseudo: { width: pseudo.width, left: pseudo.left, right: pseudo.right, top: pseudo.top, bottom: pseudo.bottom, position: pseudo.position, transform: pseudo.transform, opacity: pseudo.opacity, animation: pseudo.animationName + " " + pseudo.animationDuration + " " + pseudo.animationTimingFunction, inset: pseudo.inset },
    btn: { overflow: cs.overflow, position: cs.position, animation: cs.animationName + " " + cs.animationDuration },
    rules,
  };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
