#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filesToFix = [
  '/Users/gurbakshchahal/AuraGlass/src/components/charts/components/AtmosphericEffects.tsx',
  '/Users/gurbakshchahal/AuraGlass/src/components/charts/components/ChartContainer.tsx',
  '/Users/gurbakshchahal/AuraGlass/src/components/charts/components/ChartFilters.tsx',
  '/Users/gurbakshchahal/AuraGlass/src/components/charts/components/ChartLegend.tsx',
  '/Users/gurbakshchahal/AuraGlass/src/components/charts/components/ChartRenderer.tsx',
  '/Users/gurbakshchahal/AuraGlass/src/components/charts/components/ChartTooltip.tsx',
  '/Users/gurbakshchahal/AuraGlass/src/components/charts/components/KpiChart.tsx',
  '/Users/gurbakshchahal/AuraGlass/src/components/charts/hooks/useQualityTier.ts'
];

console.log('Fixing charts component import paths...');

for (const filePath of filesToFix) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const newContent = content.replace(
      /from ['"]\.\.\/\.\.\/core\/mixins\/glassMixins['"];/g,
      "from '../../../core/mixins/glassMixins';"
    );
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Fixed: ${filePath}`);
    } else {
      console.log(`No change needed: ${filePath}`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
}

console.log('Done!');