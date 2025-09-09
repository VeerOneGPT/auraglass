#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Fix Remaining TypeScript Errors - Phase 2
 * Addresses specific error patterns from typecheck output
 */

class RemainingErrorFixer {
  constructor() {
    this.fixesApplied = 0;
    this.filesProcessed = 0;
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    };
    console.log(`${colors[type]}${message}${colors.reset}`);
  }

  readFile(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      this.log(`Error reading ${filePath}: ${error.message}`, 'error');
      return null;
    }
  }

  writeFile(filePath, content) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    } catch (error) {
      this.log(`Error writing ${filePath}: ${error.message}`, 'error');
      return false;
    }
  }

  // Fix stories files with elevation number errors
  fixStoriesElevationErrors(content) {
    let fixes = 0;

    // Fix elevation: 2 -> elevation: 'level2', etc.
    content = content.replace(/elevation:\s*1(\s*[,}])/g, (match, suffix) => {
      fixes++;
      return `elevation: 'level1'${suffix}`;
    });

    content = content.replace(/elevation:\s*2(\s*[,}])/g, (match, suffix) => {
      fixes++;
      return `elevation: 'level2'${suffix}`;
    });

    content = content.replace(/elevation:\s*3(\s*[,}])/g, (match, suffix) => {
      fixes++;
      return `elevation: 'level3'${suffix}`;
    });

    content = content.replace(/elevation:\s*4(\s*[,}])/g, (match, suffix) => {
      fixes++;
      return `elevation: 'level4'${suffix}`;
    });

    content = content.replace(/elevation:\s*5(\s*[,}])/g, (match, suffix) => {
      fixes++;
      return `elevation: 'level5'${suffix}`;
    });

    return { content, fixes };
  }

  // Fix GlassIntent enum issues
  fixIntentEnumErrors(content) {
    let fixes = 0;

    // Replace 'error' intent with 'danger' (which exists in our enum)
    content = content.replace(/intent:\s*['"]error['"]/g, () => {
      fixes++;
      return `intent: 'danger'`;
    });

    // Replace 'secondary' intent with 'neutral' 
    content = content.replace(/intent:\s*['"]secondary['"]/g, () => {
      fixes++;
      return `intent: 'neutral'`;
    });

    return { content, fixes };
  }

  // Fix elevation enum issues  
  fixElevationEnumErrors(content) {
    let fixes = 0;

    // Remove 'level5' references (only level1-level4 exist)
    content = content.replace(/['"]level5['"]/g, () => {
      fixes++;
      return `'level4'`;
    });

    return { content, fixes };
  }

  // Fix import path issues
  fixImportPaths(content) {
    let fixes = 0;

    // Fix glassMixins import paths
    content = content.replace(/from ['"]\.\.\/\.\.\/core\/mixins\/glassMixins['"]/g, () => {
      fixes++;
      return `from '../../../core/mixins/glassMixins'`;
    });

    // Fix missing module imports
    content = content.replace(/from ['"]\.\.\/components\/card\/div['"]/g, () => {
      fixes++;
      return `from './div'`;
    });

    return { content, fixes };
  }

  // Fix undefined glassMixins references
  fixGlassMixinsReferences(content) {
    let fixes = 0;

    // Replace glassMixins calls with createGlassStyle
    content = content.replace(/glassMixins\./g, () => {
      fixes++;
      return 'createGlassStyle';
    });

    // Remove undefined glassMixins references
    content = content.replace(/Cannot find name 'glassMixins'[.\s\S]*?glassMixins\./g, () => {
      fixes++;
      return 'createGlassStyle';
    });

    return { content, fixes };
  }

  // Fix theme provider export issues
  fixThemeProviderExports(content, filePath) {
    let fixes = 0;

    if (filePath.includes('ThemeProvider.tsx')) {
      // Replace missing exports with AURA_GLASS token access
      const replacements = {
        'colors': 'AURA_GLASS.surfaces',
        'typography': 'AURA_GLASS.typography',
        'spacing': 'AURA_GLASS.spacing',
        'shadows': 'AURA_GLASS.shadows',
        'borderRadius': 'AURA_GLASS.borderRadius',
        'zIndex': 'AURA_GLASS.zIndex'
      };

      Object.entries(replacements).forEach(([oldExport, newAccess]) => {
        const pattern = new RegExp(`import\\s*{[^}]*${oldExport}[^}]*}\\s*from\\s*['"][^'"]*tokens/glass['"]`, 'g');
        if (content.match(pattern)) {
          content = content.replace(pattern, `import { AURA_GLASS } from '../tokens/glass'`);
          content = content.replace(new RegExp(`\\b${oldExport}\\b`, 'g'), newAccess);
          fixes++;
        }
      });
    }

    return { content, fixes };
  }

  // Fix type issues in glass API
  fixTypeIssues(content) {
    let fixes = 0;

    // Fix type vs value usage
    content = content.replace(/(\w+)\s+only\s+refers\s+to\s+a\s+type.*?being\s+used\s+as\s+a\s+value/g, () => {
      fixes++;
      return '';
    });

    // Fix webkitBackdropFilter
    content = content.replace(/\.webkitBackdropFilter/g, () => {
      fixes++;
      return '.backdropFilter';
    });

    return { content, fixes };
  }

  processFile(filePath) {
    this.filesProcessed++;
    const originalContent = this.readFile(filePath);
    
    if (!originalContent) return;

    let content = originalContent;
    let totalFixes = 0;

    this.log(`Processing ${filePath}...`);

    // Apply fixes sequentially
    const fix1 = this.fixStoriesElevationErrors(content);
    content = fix1.content;
    totalFixes += fix1.fixes;

    const fix2 = this.fixIntentEnumErrors(content);
    content = fix2.content;
    totalFixes += fix2.fixes;

    const fix3 = this.fixElevationEnumErrors(content);
    content = fix3.content;
    totalFixes += fix3.fixes;

    const fix4 = this.fixImportPaths(content);
    content = fix4.content;
    totalFixes += fix4.fixes;

    const fix5 = this.fixGlassMixinsReferences(content);
    content = fix5.content;
    totalFixes += fix5.fixes;

    const fix6 = this.fixThemeProviderExports(content, filePath);
    content = fix6.content;
    totalFixes += fix6.fixes;

    const fix7 = this.fixTypeIssues(content);
    content = fix7.content;
    totalFixes += fix7.fixes;

    if (totalFixes > 0) {
      if (this.writeFile(filePath, content)) {
        this.fixesApplied += totalFixes;
        this.log(`  ✅ Applied ${totalFixes} fixes`, 'success');
      }
    } else {
      this.log(`  ℹ️  No fixes needed`, 'info');
    }
  }

  async run() {
    this.log('🔧 Starting Remaining TypeScript Error Fixes...', 'info');

    // Target specific problematic files and patterns
    const targetFiles = [
      'src/**/*.stories.tsx',
      'src/**/*.tsx',
      'src/**/*.ts'
    ];

    let allFiles = [];
    targetFiles.forEach(pattern => {
      const files = glob.sync(pattern, { 
        cwd: process.cwd(),
        ignore: ['**/*.d.ts', '**/node_modules/**'] 
      });
      allFiles = allFiles.concat(files);
    });

    // Remove duplicates
    allFiles = [...new Set(allFiles)];

    this.log(`📁 Found ${allFiles.length} files to process`, 'info');

    // Process each file
    for (const filePath of allFiles) {
      this.processFile(filePath);
    }

    // Summary
    this.log('\n📊 Fix Summary:', 'success');
    this.log(`   Files processed: ${this.filesProcessed}`, 'info');
    this.log(`   Total fixes applied: ${this.fixesApplied}`, 'success');
    
    if (this.fixesApplied > 0) {
      this.log('\n✅ Remaining TypeScript error fixes completed!', 'success');
      this.log('🔍 Run `npm run typecheck` again to verify progress', 'info');
    } else {
      this.log('\nℹ️  No additional fixes were needed', 'warning');
    }
  }
}

// Run the fixer
const fixer = new RemainingErrorFixer();
fixer.run().catch(console.error);