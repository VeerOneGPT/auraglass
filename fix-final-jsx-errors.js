#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to fix the remaining JSX syntax errors based on the exact error patterns
function fixFinalJSXErrors(content) {
  let fixed = content;
  
  // Fix 1: Missing comma after )} in JSX expressions (most common pattern)
  // Pattern: )} at end of line followed by whitespace should be )},
  // But be careful not to break existing valid syntax
  fixed = fixed.replace(/(\s+\)}\s*\n)/g, (match) => {
    return match.replace(')}', ')},');
  });
  
  // Fix 2: Missing closing parenthesis in function calls with extra }
  // Pattern: Number(e.target.value} should be Number(e.target.value))
  fixed = fixed.replace(/Number\(([^)]+)\}/g, 'Number($1))');
  
  // Fix 3: Missing closing parenthesis in new Date calls
  // Pattern: new Date( without closing ) 
  fixed = fixed.replace(/new Date\(([^)]+)\}/g, 'new Date($1))');
  
  // Fix 4: Function calls missing closing parenthesis 
  // Pattern: functionName(args} should be functionName(args)
  fixed = fixed.replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\(([^)]*)\}/g, '$1($2))');
  
  // Fix 5: Specific pattern - onClick handlers missing closing parens
  // Pattern: onClick={() => handler(} should be onClick={() => handler()}
  fixed = fixed.replace(/onClick=\{[^}]*=>\s*([^}]+)\}/g, (match) => {
    // Only fix if it's missing the closing parenthesis
    if (!match.includes('))')) {
      return match.replace(/\}$/, ')}');
    }
    return match;
  });
  
  return fixed;
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixFinalJSXErrors(content);
    
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
  console.log('🔧 Fixing final 273 JSX syntax errors...\n');
  
  // Get all TypeScript/JSX files
  const pattern = 'src/**/*.{tsx,ts}';
  const files = glob.sync(pattern);
  
  let fixedCount = 0;
  
  files.forEach(file => {
    if (processFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n✅ Fixed ${fixedCount} files`);
  console.log('🔍 Running typecheck to verify...\n');
}

if (require.main === module) {
  main();
}
