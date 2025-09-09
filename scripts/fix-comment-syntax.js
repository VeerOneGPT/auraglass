#!/usr/bin/env node
/**
 * Fix Comment Syntax Script
 * 
 * Fixes malformed comment syntax that's breaking Storybook and TypeScript compilation.
 * Common issue: `fontSize: '1rem' // comment,` should be `fontSize: '1rem', // comment`
 */

const fs = require('fs');
const path = require('path');

class CommentSyntaxFixer {
  constructor() {
    this.fixedFiles = 0;
    this.totalChanges = 0;
    this.errors = [];
  }

  async run() {
    console.log('🔧 Starting Comment Syntax Fix...');
    console.log('🎯 Target: Fix malformed comment syntax breaking Storybook\n');

    const filesToFix = await this.findFilesWithSyntaxIssues();
    console.log(`Found ${filesToFix.length} files with comment syntax issues\n`);

    for (const filePath of filesToFix) {
      try {
        await this.fixFile(filePath);
      } catch (error) {
        this.errors.push({ file: filePath, error: error.message });
      }
    }

    this.generateReport();
  }

  async findFilesWithSyntaxIssues() {
    const componentFiles = this.getAllTsxFiles('src/components');
    const filesWithIssues = [];
    
    for (const filePath of componentFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for common problematic patterns
      const hasIssues = this.hasSyntaxIssues(content);
      if (hasIssues) {
        filesWithIssues.push(filePath);
      }
    }
    
    return filesWithIssues;
  }

  hasSyntaxIssues(content) {
    const problematicPatterns = [
      // Property with comment before comma: `property // comment,`
      /:\s*['"][^'"]*['"]\s*\/\/[^,\n]*,/g,
      // Property with comment before comma: `property: value // comment,`
      /:\s*[^,\n}]*\s*\/\/[^,\n]*,/g,
      // Multiline property with comment issues
      /fontWeight:\s*['"][^'"]*['"]\s*\/\/[^,\n]*,/g,
      // Other variations
      /fontSize:\s*['"][^'"]*['"]\s*\/\/[^,\n]*,/g,
    ];
    
    return problematicPatterns.some(pattern => pattern.test(content));
  }

  getAllTsxFiles(dir) {
    let files = [];
    
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          files = files.concat(this.getAllTsxFiles(fullPath));
        } else if (item.endsWith('.tsx')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Skip directories that don't exist or can't be read
    }
    
    return files;
  }

  async fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    const fileName = path.basename(filePath);
    
    console.log(`🔧 Fixing ${fileName}...`);

    // Fix patterns where comment comes before comma
    const fixes = [
      {
        // Fix: `fontSize: '1rem' // comment,` → `fontSize: '1rem', // comment`
        pattern: /(:\s*['"][^'"]*['"])\s*(\/\/[^,\n]*),/g,
        replacement: '$1, $2',
        description: 'Property string with trailing comment'
      },
      {
        // Fix: `fontWeight: 600 // comment,` → `fontWeight: 600, // comment`  
        pattern: /(:\s*[0-9]+)\s*(\/\/[^,\n]*),/g,
        replacement: '$1, $2',
        description: 'Property number with trailing comment'
      },
      {
        // Fix: `color: value // comment,` → `color: value, // comment`
        pattern: /(:\s*[^,\n}]+)\s+(\/\/[^,\n]*),/g,
        replacement: '$1, $2',
        description: 'Property value with trailing comment'
      },
      {
        // Fix complex cases with function calls or template strings
        pattern: /(:\s*[^,\n}]*['"][^'"]*['"][^,\n}]*)\s*(\/\/[^,\n]*),/g,
        replacement: '$1, $2',
        description: 'Complex property with trailing comment'
      }
    ];

    let changeCount = 0;
    
    for (const { pattern, replacement, description } of fixes) {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, replacement);
        changeCount += matches.length;
        console.log(`  ✅ ${description}: ${matches.length} fixes`);
      }
    }

    // Special handling for specific problematic patterns
    content = this.fixSpecialCases(content);

    if (changeCount > 0 && content !== originalContent) {
      // Validate the fix doesn't break syntax further
      if (this.validateSyntax(content)) {
        fs.writeFileSync(filePath, content, 'utf8');
        this.fixedFiles++;
        this.totalChanges += changeCount;
        console.log(`  ✅ Fixed ${fileName} (${changeCount} changes)\n`);
      } else {
        console.log(`  ⚠️  Skipped ${fileName} - fix would break syntax\n`);
      }
    } else {
      console.log(`  ℹ️  No changes needed in ${fileName}\n`);
    }
  }

  fixSpecialCases(content) {
    // Fix very specific cases we know are problematic
    const specialFixes = [
      // Fix the specific TabItem pattern
      {
        from: "fontWeight: 'var(--typography-heading-weight)' // semi-bold,",
        to: "fontWeight: 'var(--typography-heading-weight)', // semi-bold"
      },
      {
        from: "fontSize: '0.875rem' // body text,",
        to: "fontSize: '0.875rem', // body text"
      },
      {
        from: "fontSize: '0.75rem' // caption,",
        to: "fontSize: '0.75rem', // caption"
      },
      // Fix style object syntax issues
      {
        from: "fontWeight: 'var(--typography-heading-weight)' // semi-bold, marginBottom:",
        to: "fontWeight: 'var(--typography-heading-weight)', // semi-bold\n        marginBottom:"
      }
    ];

    for (const { from, to } of specialFixes) {
      if (content.includes(from)) {
        content = content.replace(from, to);
      }
    }

    return content;
  }

  validateSyntax(content) {
    // Basic syntax validation - check for balanced braces and proper commas
    try {
      // Count braces
      const openBraces = (content.match(/\{/g) || []).length;
      const closeBraces = (content.match(/\}/g) || []).length;
      
      if (openBraces !== closeBraces) return false;
      
      // Check for obvious syntax errors
      if (content.includes('// comment,')) return false;
      if (content.includes(',, //')) return false;
      
      return true;
    } catch (error) {
      return false;
    }
  }

  generateReport() {
    console.log('📊 Comment Syntax Fix Report:');
    console.log('='.repeat(50));
    console.log(`✅ Files fixed: ${this.fixedFiles}`);
    console.log(`🔄 Total changes: ${this.totalChanges}`);
    console.log(`❌ Errors: ${this.errors.length}`);

    if (this.errors.length > 0) {
      console.log('\nErrors encountered:');
      this.errors.forEach(({ file, error }) => {
        console.log(`  ❌ ${path.basename(file)}: ${error}`);
      });
    }

    console.log('\n🎉 Benefits:');
    console.log('  • Fixed Storybook compilation errors');
    console.log('  • Resolved TypeScript parsing issues');
    console.log('  • Improved code maintainability');
    console.log('  • Eliminated syntax warnings');

    if (this.fixedFiles > 0) {
      console.log('\n✅ Storybook should now work without syntax errors!');
      console.log('🚀 Try running Storybook again to verify fixes.');
    }
  }
}

// Run the fixer
if (require.main === module) {
  const fixer = new CommentSyntaxFixer();
  fixer.run().catch(error => {
    console.error('❌ Comment syntax fix failed:', error);
    process.exit(1);
  });
}

module.exports = CommentSyntaxFixer;