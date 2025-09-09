#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Glass foundation fixes
const glassFixes = [
  // Low opacity fixes
  { pattern: /bg-white\/10/g, replacement: 'bg-white/25' },
  { pattern: /bg-white\/15/g, replacement: 'bg-white/25' },
  { pattern: /bg-white\/20/g, replacement: 'bg-white/30' },
  
  // Typography fixes
  { pattern: /text-white\/60/g, replacement: 'text-white/70' },
  { pattern: /text-white\/50/g, replacement: 'text-white/70' },
  
  // Glass class fixes
  { pattern: /glass-base backdrop-blur-md/g, replacement: 'glass-foundation-complete' },
  { pattern: /glass-base backdrop-blur-sm/g, replacement: 'glass-foundation-complete' },
  { pattern: /glass-base backdrop-blur-lg/g, replacement: 'glass-foundation-complete' },
  
  // Hover state fixes
  { pattern: /hover:bg-white\/10/g, replacement: 'hover:bg-white/25' },
  { pattern: /hover:bg-white\/15/g, replacement: 'hover:bg-white/25' },
  { pattern: /hover:bg-white\/20/g, replacement: 'hover:bg-white/30' },
  
  // Focus state fixes
  { pattern: /focus:bg-white\/15/g, replacement: 'focus:bg-white/30' },
  { pattern: /focus:bg-white\/10/g, replacement: 'focus:bg-white/25' },
  
  // Shadow fixes
  { pattern: /shadow-glass-\d+/g, replacement: 'shadow-lg' },
  { pattern: /hover:shadow-glass-\d+/g, replacement: 'hover:shadow-xl' },
  { pattern: /active:shadow-glass-\d+/g, replacement: 'active:shadow-lg' },
];

// Component-specific fixes
const componentFixes = {
  'GlassInput': [
    { pattern: /bg-white\/22/g, replacement: 'glass-foundation-complete' },
    { pattern: /border border-white\/30/g, replacement: '' },
  ],
  'GlassModal': [
    { pattern: /backdrop-blur-xl backdrop-saturate-180 backdrop-brightness-115 backdrop-contrast-108/g, replacement: '' },
  ],
  'GlassButton': [
    { pattern: /text-white\/95 hover:text-white border-0/g, replacement: 'glass-foundation-complete text-white/95 hover:text-white border-0' },
  ],
  'GlassCard': [
    { pattern: /bg-white\/22 backdrop-blur-md backdrop-saturate-150 backdrop-brightness-115 backdrop-contrast-108/g, replacement: '' },
  ]
};

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Apply general glass fixes
    glassFixes.forEach(fix => {
      if (fix.pattern.test(content)) {
        content = content.replace(fix.pattern, fix.replacement);
        modified = true;
      }
    });
    
    // Apply component-specific fixes
    const fileName = path.basename(filePath, '.tsx');
    if (componentFixes[fileName]) {
      componentFixes[fileName].forEach(fix => {
        if (fix.pattern.test(content)) {
          content = content.replace(fix.pattern, fix.replacement);
          modified = true;
        }
      });
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🚀 Starting comprehensive glass component fixes...\n');
  
  // Get all component files
  const componentPatterns = [
    'src/components/**/*.tsx',
    'src/primitives/**/*.tsx'
  ];
  
  let totalFiles = 0;
  let fixedFiles = 0;
  
  componentPatterns.forEach(pattern => {
    const files = glob.sync(pattern, { cwd: process.cwd() });
    
    files.forEach(file => {
      totalFiles++;
      if (fixFile(file)) {
        fixedFiles++;
      }
    });
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`   Total files processed: ${totalFiles}`);
  console.log(`   Files fixed: ${fixedFiles}`);
  console.log(`   Files unchanged: ${totalFiles - fixedFiles}`);
  console.log(`\n🎉 Glass component fixes complete!`);
}

if (require.main === module) {
  main();
}

module.exports = { fixFile, glassFixes, componentFixes };