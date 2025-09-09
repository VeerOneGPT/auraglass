#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to fix JSX syntax errors - ONLY the safe patterns
function fixJSXSyntax(content) {
  let fixed = content;
  
  // ONLY fix the obvious malformed patterns
  
  // Fix 1: Extra closing parenthesis in className attributes
  // Pattern: ))}>  should be )}>
  fixed = fixed.replace(/\)\)\}>/g, ')}>');
  
  // Fix 2: Extra closing parenthesis in other JSX attributes  
  // Pattern: ))} should be )}
  fixed = fixed.replace(/\)\)\}/g, ')}');
  
  return fixed;
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixJSXSyntax(content);
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed);
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
function main() {
  console.log('🔧 Re-applying safe JSX fixes...\n');
  
  // Find all TypeScript/JSX files in components
  const pattern = 'src/**/*.{tsx,ts}';
  const files = glob.sync(pattern);
  
  let fixedCount = 0;
  
  files.forEach(file => {
    if (processFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n✅ Re-applied fixes to ${fixedCount} files`);
}

if (require.main === module) {
  main();
}
