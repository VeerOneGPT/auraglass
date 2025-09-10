#!/usr/bin/env node

/**
 * AuraGlass Focusify Codemod
 * Adds proper focus utilities and ARIA attributes to interactive elements
 */

import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FocusifyCodemod {
  constructor() {
    this.filesProcessed = 0;
    this.elementsFixed = 0;
    this.violations = [];
  }
  
  /**
   * Transform a single file
   */
  transformFile(filePath) {
    // Skip non-React files
    if (!filePath.match(/\.(tsx|jsx)$/)) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let changes = 0;
    
    // Pattern to match interactive divs with onClick
    const interactiveDivPattern = /<div([^>]*onClick[^>]*)>/g;
    content = content.replace(interactiveDivPattern, (match, attributes) => {
      let newAttributes = attributes;
      
      // Check if it already has proper attributes
      const hasRole = /role=/.test(attributes);
      const hasTabIndex = /tabIndex=/.test(attributes);
      const hasFocusClass = /glass-focus/.test(attributes);
      const hasAriaLabel = /aria-label/.test(attributes);
      
      // Add missing attributes
      if (!hasRole) {
        newAttributes += ' role="button"';
        changes++;
      }
      
      if (!hasTabIndex) {
        newAttributes += ' tabIndex={0}';
        changes++;
      }
      
      // Add focus class to className
      if (!hasFocusClass) {
        if (/className=/.test(newAttributes)) {
          // Add to existing className
          newAttributes = newAttributes.replace(
            /className=["']([^"']+)["']/,
            'className="$1 glass-focus glass-touch-target"'
          );
          newAttributes = newAttributes.replace(
            /className={["'`]([^"'`]+)["'`]}/,
            'className={"$1 glass-focus glass-touch-target"}'
          );
        } else {
          // Add new className
          newAttributes += ' className="glass-focus glass-touch-target"';
        }
        changes++;
      }
      
      // Add aria-label if missing and log violation
      if (!hasAriaLabel) {
        this.violations.push({
          file: filePath,
          element: 'div',
          issue: 'Missing aria-label for interactive div',
          line: this.getLineNumber(content, match),
        });
      }
      
      return `<div${newAttributes}>`;
    });
    
    // Pattern to match buttons without touch target
    const buttonPattern = /<button([^>]*)>/g;
    content = content.replace(buttonPattern, (match, attributes) => {
      let newAttributes = attributes;
      
      const hasTouchTarget = /glass-touch-target/.test(attributes);
      const hasFocusClass = /glass-focus/.test(attributes);
      
      if (!hasTouchTarget || !hasFocusClass) {
        if (/className=/.test(newAttributes)) {
          // Add to existing className
          newAttributes = newAttributes.replace(
            /className=["']([^"']+)["']/,
            (classMatch, classes) => {
              let newClasses = classes;
              if (!hasTouchTarget) newClasses += ' glass-touch-target';
              if (!hasFocusClass) newClasses += ' glass-focus';
              return `className="${newClasses.trim()}"`;
            }
          );
        } else {
          // Add new className
          newAttributes += ' className="glass-touch-target glass-focus"';
        }
        changes++;
      }
      
      return `<button${newAttributes}>`;
    });
    
    // Pattern to match links
    const linkPattern = /<a\s+([^>]*href[^>]*)>/g;
    content = content.replace(linkPattern, (match, attributes) => {
      let newAttributes = attributes;
      
      const hasFocusClass = /glass-focus/.test(attributes);
      
      if (!hasFocusClass) {
        if (/className=/.test(newAttributes)) {
          newAttributes = newAttributes.replace(
            /className=["']([^"']+)["']/,
            'className="$1 glass-focus"'
          );
        } else {
          newAttributes += ' className="glass-focus"';
        }
        changes++;
      }
      
      return `<a ${newAttributes}>`;
    });
    
    // Pattern to match inputs without proper labeling
    const inputPattern = /<input([^>]*)>/g;
    content = content.replace(inputPattern, (match, attributes) => {
      let newAttributes = attributes;
      
      const hasAriaLabel = /aria-label/.test(attributes);
      const hasAriaLabelledBy = /aria-labelledby/.test(attributes);
      const hasPlaceholder = /placeholder=/.test(attributes);
      const hasId = /id=/.test(attributes);
      
      // Add focus class
      if (!/glass-focus/.test(attributes)) {
        if (/className=/.test(newAttributes)) {
          newAttributes = newAttributes.replace(
            /className=["']([^"']+)["']/,
            'className="$1 glass-focus glass-input"'
          );
        } else {
          newAttributes += ' className="glass-focus glass-input"';
        }
        changes++;
      }
      
      // Log violation if no proper labeling
      if (!hasAriaLabel && !hasAriaLabelledBy && !hasId) {
        this.violations.push({
          file: filePath,
          element: 'input',
          issue: 'Input missing proper labeling (aria-label, aria-labelledby, or associated label)',
          line: this.getLineNumber(content, match),
        });
      }
      
      return `<input${newAttributes}>`;
    });
    
    // Add keyboard handlers for interactive divs
    if (content.includes('role="button"') && !content.includes('onKeyDown')) {
      // Add import for keyboard handler if not present
      if (!content.includes('handleButtonKeyDown')) {
        const importPattern = /import\s+{([^}]+)}\s+from\s+['"]@\/utils\/focus['"]/;
        if (importPattern.test(content)) {
          // Add to existing import
          content = content.replace(importPattern, (match, imports) => {
            if (!imports.includes('handleButtonKeyDown')) {
              return match.replace(imports, `${imports}, handleButtonKeyDown`);
            }
            return match;
          });
        } else {
          // Add new import after other imports
          const lastImportPattern = /(import[^;]+;)/g;
          const matches = content.match(lastImportPattern);
          if (matches) {
            const lastImport = matches[matches.length - 1];
            content = content.replace(
              lastImport,
              `${lastImport}\nimport { handleButtonKeyDown } from '@/utils/focus';`
            );
          }
        }
      }
    }
    
    // Only write if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      this.filesProcessed++;
      this.elementsFixed += changes;
    }
  }
  
  /**
   * Get line number for a match
   */
  getLineNumber(content, match) {
    const lines = content.substring(0, content.indexOf(match)).split('\n');
    return lines.length;
  }
  
  /**
   * Run the codemod
   */
  run(pattern = 'src/**/*.{tsx,jsx}') {
    console.log('🎯 Running AuraGlass Focusify Codemod...\n');
    
    const files = glob.sync(pattern, {
      ignore: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/*.test.*',
        '**/*.spec.*',
      ],
    });
    
    console.log(`Found ${files.length} files to process\n`);
    
    files.forEach(file => {
      this.transformFile(file);
    });
    
    this.report();
  }
  
  /**
   * Generate report
   */
  report() {
    console.log('✨ Focusify Complete!\n');
    console.log(`📊 Statistics:`);
    console.log(`   Files modified: ${this.filesProcessed}`);
    console.log(`   Elements fixed: ${this.elementsFixed}\n`);
    
    if (this.violations.length > 0) {
      console.log('⚠️  Manual fixes needed:');
      console.log('   The following elements need manual attention:\n');
      
      this.violations.slice(0, 10).forEach(({ file, element, issue, line }) => {
        console.log(`   ${file}:${line}`);
        console.log(`     ${element}: ${issue}\n`);
      });
      
      if (this.violations.length > 10) {
        console.log(`   ... and ${this.violations.length - 10} more\n`);
      }
      
      // Write full violations report
      const reportPath = path.join(process.cwd(), 'focusify-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(this.violations, null, 2));
      console.log(`📄 Full report written to: ${reportPath}\n`);
    }
    
    console.log('💡 Next steps:');
    console.log('   1. Review and fix violations listed above');
    console.log('   2. Add proper aria-labels to interactive elements');
    console.log('   3. Test keyboard navigation');
    console.log('   4. Run accessibility audit');
    console.log('   5. Commit changes\n');
    
    if (this.filesProcessed > 0) {
      console.log('🎯 Improvements made:');
      console.log('   ✅ Added role="button" to interactive divs');
      console.log('   ✅ Added tabIndex={0} for keyboard navigation');
      console.log('   ✅ Added glass-focus utility for focus visibility');
      console.log('   ✅ Added glass-touch-target for minimum touch size');
      console.log('   ✅ Enhanced input accessibility\n');
    }
  }
}

// Run if executed directly
if (process.argv[1] === __filename) {
  const codemod = new FocusifyCodemod();
  const pattern = process.argv[2] || 'src/**/*.{tsx,jsx}';
  codemod.run(pattern);
}

export default FocusifyCodemod;