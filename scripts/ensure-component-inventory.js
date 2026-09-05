#!/usr/bin/env node
// Ensures reports/component_inventory.json exists before a Storybook build.
// The curated-guide story statically imports that generated file; worker
// tarballs exclude reports/, so without this guard `storybook build`
// fails at bundle time with an unresolvable import. When the real
// inventory is present this is a no-op.
const fs = require("fs");
const path = require("path");

const target = path.join(__dirname, "..", "reports", "component_inventory.json");
if (fs.existsSync(target)) {
  console.log(`[ensure-component-inventory] present: ${target}`);
  process.exit(0);
}

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, JSON.stringify({ components: [] }, null, 2) + "\n");
console.log(`[ensure-component-inventory] wrote empty fallback: ${target}`);
