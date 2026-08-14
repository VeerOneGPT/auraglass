import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = process.cwd();
const appDir = process.argv[2];
const baseUrl = process.argv[3];
if (!appDir || !baseUrl) throw new Error("usage: capture-320.mjs <appDir> <baseUrl>");
const require = createRequire(path.join(root, "package.json"));
const { chromium } = require("@playwright/test");
const visualRoot = path.join(root, "reports/audit/visual-all");
const ids = fs.readdirSync(visualRoot)
  .filter((name) => name.startsWith("recipe-"))
  .map((name) => name.slice("recipe-".length))
  .sort();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 320, height: 844 } });
const failures = [];
for (const id of ids) {
  const pageErrors = [];
  const consoleErrors = [];
  const onPageError = (error) => pageErrors.push(error.message);
  const onConsole = (message) => { if (message.type() === "error") consoleErrors.push(message.text()); };
  page.on("pageerror", onPageError);
  page.on("console", onConsole);
  await page.goto(`${baseUrl}/?recipe=${encodeURIComponent(id)}`, { waitUntil: "networkidle" });
  const locator = page.locator(`[data-recipe-id="${id}"]`);
  await locator.waitFor();
  const evidenceDir = path.join(visualRoot, `recipe-${id}`);
  await page.screenshot({ path: path.join(evidenceDir, "320.png"), fullPage: true });
  const computed = await page.evaluate((recipeId) => {
    const rootNode = document.querySelector(`[data-recipe-id="${recipeId}"]`);
    const rect = rootNode?.getBoundingClientRect();
    const documentOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    const rootOverflow = rootNode ? rootNode.scrollWidth > rootNode.clientWidth + 1 : true;
    const zeroSurfaceCount = rootNode ? [...rootNode.querySelectorAll("[class*='glass'],[style*='backdrop-filter']")]
      .filter((node) => { const r = node.getBoundingClientRect(); return r.width < 1 || r.height < 1; }).length : 0;
    return {
      id: recipeId,
      viewport: { name: "320", width: innerWidth, height: innerHeight },
      root: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height, scrollWidth: rootNode.scrollWidth, clientWidth: rootNode.clientWidth } : null,
      document: { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth },
      layoutIssues: [
        ...(documentOverflow ? [{ type: "document-horizontal-overflow" }] : []),
        ...(rootOverflow ? [{ type: "recipe-root-horizontal-overflow" }] : []),
        ...(zeroSurfaceCount ? [{ type: "zero-size-glass-surface", count: zeroSurfaceCount }] : []),
      ],
    };
  }, id);
  computed.consoleErrors = consoleErrors;
  computed.pageErrors = pageErrors;
  fs.writeFileSync(path.join(evidenceDir, "320.computed-styles.json"), `${JSON.stringify(computed, null, 2)}\n`);
  if (computed.layoutIssues.length || pageErrors.length || consoleErrors.length) failures.push(computed);
  page.off("pageerror", onPageError);
  page.off("console", onConsole);
}
await browser.close();
const summary = { generatedAt: new Date().toISOString(), count: ids.length, failures };
fs.writeFileSync(path.join(root, "reports/audit/recipe-final/320-capture-summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary));
