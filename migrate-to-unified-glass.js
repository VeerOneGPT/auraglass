#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Track migration progress
let migrated = 0;
let total = 0;
let skipped = 0;

const logResults = () => {
  console.log(`\n📊 Migration Summary:`);
  console.log(`✅ Migrated: ${migrated} files`);
  console.log(`⏭️  Skipped: ${skipped} files (already using unified system)`);
  console.log(`📁 Total processed: ${total} files`);
  console.log(`🎯 Progress: ${Math.round((migrated / total) * 100)}% of processed files migrated`);
};

// Patterns to detect hardcoded glass styles that need migration
const hardcodedPatterns = [
  /backdrop-filter\s*:\s*blur\([^)]+\)/gi,
  /background\s*:\s*rgba\([^)]*,\s*0\.[0-9]+[^)]*\)/gi,
  /background-color\s*:\s*rgba\([^)]*,\s*0\.[0-9]+[^)]*\)/gi,
  /border\s*:\s*[^;]*rgba\([^)]*,\s*0\.[0-9]+[^)]*\)/gi,
  /box-shadow\s*:\s*[^;]*rgba\(0,\s*0,\s*0,\s*0\.[0-9]+\)/gi,
];

// Check if file already uses unified system
function usesUnifiedSystem(content) {
  return content.includes('createGlassStyle') || 
         content.includes('OptimizedGlass') ||
         content.includes('from \'../../core/mixins/glassMixins\'');
}

// Check if file has hardcoded glass styles
function hasHardcodedGlass(content) {
  return hardcodedPatterns.some(pattern => pattern.test(content));
}

// Migration patterns for different component types
function migrateComponent(filePath, content) {
  total++;
  
  // Skip if already using unified system
  if (usesUnifiedSystem(content)) {
    skipped++;
    return content;
  }
  
  // Skip if no hardcoded glass patterns detected
  if (!hasHardcodedGlass(content)) {
    skipped++;
    return content;
  }
  
  console.log(`🔄 Migrating: ${path.relative('/Users/gurbakshchahal/AuraGlass', filePath)}`);
  
  let migratedContent = content;
  
  // Add import for createGlassStyle if not present
  if (!migratedContent.includes('createGlassStyle')) {
    // Determine correct import path based on file location
    const relativePath = path.relative('/Users/gurbakshchahal/AuraGlass/src', filePath);
    const depth = relativePath.split('/').length - 1;
    const importPath = '../'.repeat(depth) + 'core/mixins/glassMixins';
    
    // Add import after existing React imports
    const reactImportMatch = migratedContent.match(/import React[^;]*;/);
    if (reactImportMatch) {
      migratedContent = migratedContent.replace(
        reactImportMatch[0],
        `${reactImportMatch[0]}\nimport { createGlassStyle } from '${importPath}';`
      );
    } else {
      // Add at the beginning if no React import found
      migratedContent = `import { createGlassStyle } from '${importPath}';\n${migratedContent}`;
    }
  }
  
  // Replace common hardcoded glass patterns with createGlassStyle calls
  // This is a simplified migration - complex cases may need manual review
  
  // Replace backdrop-filter: blur patterns
  migratedContent = migratedContent.replace(
    /backdrop-filter\s*:\s*blur\((\d+)px\)/gi,
    (match, blurValue) => {
      const tier = parseInt(blurValue) >= 12 ? 'high' : parseInt(blurValue) >= 8 ? 'medium' : 'low';
      return `/* Migrated from ${match} */ ...createGlassStyle({ tier: '${tier}' })`;
    }
  );
  
  // Replace common glass background patterns
  migratedContent = migratedContent.replace(
    /background\s*:\s*rgba\(255,\s*255,\s*255,\s*0\.([0-9]+)\)/gi,
    (match, opacity) => {
      const elevation = parseFloat(`0.${opacity}`) >= 0.2 ? 'level3' : 
                       parseFloat(`0.${opacity}`) >= 0.15 ? 'level2' : 'level1';
      return `/* Migrated from ${match} */ ...createGlassStyle({ elevation: '${elevation}' })`;
    }
  );
  
  migrated++;
  return migratedContent;
}

// Process files recursively
function processDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      // Skip node_modules, .git, etc.
      if (!file.name.startsWith('.') && file.name !== 'node_modules') {
        processDirectory(fullPath);
      }
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      // Skip test files and stories for now
      if (file.name.includes('.test.') || file.name.includes('.spec.') || file.name.includes('.stories.')) {
        continue;
      }
      
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const migratedContent = migrateComponent(fullPath, content);
        
        if (content !== migratedContent) {
          fs.writeFileSync(fullPath, migratedContent, 'utf8');
          console.log(`✅ Updated: ${path.relative('/Users/gurbakshchahal/AuraGlass', fullPath)}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${fullPath}:`, error.message);
      }
    }
  }
}

console.log('🚀 Starting unified glass system migration...\n');

// Process all components
processDirectory('/Users/gurbakshchahal/AuraGlass/src/components');

logResults();

// Additional suggestions
console.log(`\n💡 Next Steps:`);
console.log(`1. Review migrated files for correctness`);
console.log(`2. Run TypeScript check: pnpm typecheck`);
console.log(`3. Test components in Storybook`);
console.log(`4. Update any complex styled-components manually`);

process.exit(0);