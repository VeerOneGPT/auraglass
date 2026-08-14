// Reproduce the audit's exact page state: matchMedia shim + waitForStoryRender +
// collectLayoutIssues, at all 3 viewports.
// Usage: node probe-audit-exact.mjs <storyId> [more...]
import { chromium } from "playwright";

const base = process.env.STORYBOOK_URL || "http://localhost:6006";
const ids = process.argv.slice(2);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

for (const id of ids) {
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.addInitScript(() => {
      window.matchMedia = window.matchMedia || ((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }));
    });
    const url = `${base}/iframe.html?id=${id}&viewMode=story&globals=previewMode:light`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25_000 });
    await page.waitForFunction(
      () => {
        const root = document.querySelector("#storybook-root") || document.querySelector("#root");
        if (!root) return false;
        const box = root.getBoundingClientRect();
        if (box.width <= 0 || box.height <= 0) return false;
        const text = root.textContent?.trim() || "";
        const hasVisualSurface = Boolean(root.querySelector("canvas, svg, img, video"));
        const visibleChildren = [...root.querySelectorAll("*")].some((node) => {
          const style = window.getComputedStyle(node);
          const childBox = node.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            Number(style.opacity || "1") > 0.01 &&
            childBox.width > 1 &&
            childBox.height > 1
          );
        });
        const looksLikeSpinner = box.width <= 48 && box.height <= 48 && !text && !hasVisualSurface;
        return !looksLikeSpinner && (text.length > 0 || hasVisualSurface || visibleChildren);
      },
      { timeout: 20_000 }
    );
    await page.waitForTimeout(150);

    const data = await page.evaluate(() => {
      const isStorybookChrome = (node) => {
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
      const webkitBackdropFilter = (style) => style.webkitBackdropFilter || "none";
      const root = document.querySelector("#storybook-root") || document.querySelector("#root") || document.body;
      const glassLike = [...root.querySelectorAll('[class*="glass"], [class*="Glass"], [class*="liquid"], [class*="Liquid"]')].filter((node) => {
        if (isStorybookChrome(node)) return false;
        const style = window.getComputedStyle(node);
        const box = node.getBoundingClientRect();
        const cls = String(node.className || "");
        const backdrop = style.backdropFilter || webkitBackdropFilter(style) || "none";
        const isSurfaceRole =
          backdrop !== "none" ||
          /glass-surface(?:-|$)/.test(cls) ||
          /\boptimized-glass-surface\b/.test(cls) ||
          /liquid-glass-(?:material|concentric-frame|scroll-edge|surface-layer|transition|source|destination|effect|layer-provider)/.test(cls);
        if (!isSurfaceRole) return false;
        return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity || "1") > 0.01;
      });
      const doc = document.documentElement;
      return {
        doc: { sw: doc.scrollWidth, cw: doc.clientWidth },
        glassLike: glassLike.map((node) => ({
          tag: node.tagName,
          cls: String(node.className || "").slice(0, 180),
          sw: node.scrollWidth,
          cw: node.clientWidth,
          ow: node.offsetWidth,
          rectW: Math.round(node.getBoundingClientRect().width),
          overflowX: getComputedStyle(node).overflowX,
        })),
      };
    });
    console.log(`\n=== ${id} @ ${vp.name} ===`);
    console.log(JSON.stringify(data, null, 1).slice(0, 5000));
  }
}
await browser.close();
