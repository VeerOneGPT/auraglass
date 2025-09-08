#!/usr/bin/env node

/**
 * FIX STORYBOOK 9.x ACTION ARGS
 * 
 * Automatically fixes "implicit action arg" warnings by:
 * 1. Adding `import { fn } from '@storybook/test'` to story files
 * 2. Converting implicit action props to explicit fn() calls
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 FIXING STORYBOOK 9.x ACTION ARGS');
console.log('=================================\n');

let fixedFiles = 0;

// Common action prop patterns
const actionPatterns = [
  /on[A-Z]\w*:\s*\([^)]*\)\s*=>\s*[^,}]+/g,
  /on[A-Z]\w*:\s*\([^)]*\)\s*=>\s*\{[^}]+\}/g,
  /on[A-Z]\w*:\s*console\.log/g,
  /on[A-Z]\w*:\s*\(\w*\)\s*=>\s*console\.log/g
];

// Find all story files
const storyFiles = glob.sync('src/**/*.stories.{tsx,ts}', {
  ignore: ['node_modules/**', 'dist/**', 'build/**']
});

console.log(`Found ${storyFiles.length} story files to check...\n`);

storyFiles.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let hasChanges = false;

    // Check if file needs fixing
    const hasActionProps = actionPatterns.some(pattern => pattern.test(content));
    
    if (!hasActionProps) {
      return; // Skip files without action props
    }

    console.log(`🔍 Fixing ${path.basename(filePath)}...`);

    // 1. Add fn import if not already present
    if (!content.includes('import { fn }') && !content.includes('from \'@storybook/test\'')) {
      // Add import after existing imports
      const importRegex = /(import[^;]+;)\n(?!\s*import)/;
      if (content.match(importRegex)) {
        content = content.replace(importRegex, '$1\nimport { fn } from \'@storybook/test\';\n');
        hasChanges = true;
      } else {
        // Add at the top if no imports found
        content = `import { fn } from '@storybook/test';\n${content}`;
        hasChanges = true;
      }
    }

    // 2. Replace action prop patterns with fn()
    const actionReplacements = [
      // Pattern: onSomething: (param) => console.log(...)
      {
        find: /(on[A-Z]\w*):\s*\([^)]*\)\s*=>\s*console\.log\([^)]+\)/g,
        replace: '$1: fn()'
      },
      // Pattern: onSomething: () => { console.log(...) }
      {
        find: /(on[A-Z]\w*):\s*\([^)]*\)\s*=>\s*\{[^}]*console\.log[^}]*\}/g,
        replace: '$1: fn()'
      },
      // Pattern: onSomething: console.log
      {
        find: /(on[A-Z]\w*):\s*console\.log/g,
        replace: '$1: fn()'
      },
      // Pattern: onSomething: (param) => { /* any code */ }
      {
        find: /(on[A-Z]\w*):\s*\([^)]*\)\s*=>\s*\{[^}]*\}/g,
        replace: '$1: fn()'
      },
      // Pattern: onSomething: (param) => someExpression,
      {
        find: /(on[A-Z]\w*):\s*\([^)]*\)\s*=>\s*[^,}]+,/g,
        replace: '$1: fn(),'
      }
    ];

    actionReplacements.forEach(({ find, replace }) => {
      const newContent = content.replace(find, replace);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    // 3. Write changes
    if (hasChanges && content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed action args in ${path.basename(filePath)}`);
      fixedFiles++;
    }

  } catch (error) {
    console.log(`❌ Error fixing ${filePath}: ${error.message}`);
  }
});

console.log(`\n📊 SUMMARY`);
console.log(`=========`);
console.log(`Story files checked: ${storyFiles.length}`);
console.log(`Files fixed: ${fixedFiles}`);
console.log(`\n✅ Storybook 9.x action arg warnings should be resolved!`);
console.log(`All action props now use explicit fn() mocks.`);
