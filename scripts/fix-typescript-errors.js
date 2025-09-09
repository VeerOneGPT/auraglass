#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Comprehensive TypeScript Error Fixing Script
 * Addresses 212 compilation errors systematically
 */

class TypeScriptErrorFixer {
  constructor() {
    this.fixesApplied = 0;
    this.errorsFound = 0;
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

  // Fix elevation type mismatches (number -> string literal)
  fixElevationTypes(content) {
    let fixes = 0;
    
    // Fix elevation prop assignments
    content = content.replace(/elevation:\s*(\d+)/g, (match, num) => {
      const levelMap = { '1': 'level1', '2': 'level2', '3': 'level3', '4': 'level4', '5': 'level5' };
      if (levelMap[num]) {
        fixes++;
        return `elevation: '${levelMap[num]}'`;
      }
      return match;
    });

    // Fix elevation in objects and interfaces
    content = content.replace(/elevation\s*=\s*(\d+)/g, (match, num) => {
      const levelMap = { '1': 'level1', '2': 'level2', '3': 'level3', '4': 'level4', '5': 'level5' };
      if (levelMap[num]) {
        fixes++;
        return `elevation = '${levelMap[num]}'`;
      }
      return match;
    });

    // Fix elevation in component props
    content = content.replace(/elevation={(\d+)}/g, (match, num) => {
      const levelMap = { '1': 'level1', '2': 'level2', '3': 'level3', '4': 'level4', '5': 'level5' };
      if (levelMap[num]) {
        fixes++;
        return `elevation={'${levelMap[num]}'}`;
      }
      return match;
    });

    return { content, fixes };
  }

  // Remove duplicate createGlassStyle imports/declarations
  fixDuplicateGlassStyle(content) {
    let fixes = 0;
    
    // Remove old createGlassStyle definitions
    const oldDefinitionPattern = /export\s+(?:const|function)\s+createGlassStyle[\s\S]*?(?=\n\n|\nexport|\n\/\*|$)/g;
    const matches = content.match(oldDefinitionPattern);
    if (matches && matches.length > 1) {
      // Keep only the first definition, remove others
      let firstFound = false;
      content = content.replace(oldDefinitionPattern, (match) => {
        if (!firstFound) {
          firstFound = true;
          return match;
        } else {
          fixes++;
          return '';
        }
      });
    }

    // Remove duplicate imports
    const importLines = content.split('\n').filter(line => line.includes('createGlassStyle'));
    if (importLines.length > 1) {
      const uniqueImports = [...new Set(importLines)];
      if (uniqueImports.length < importLines.length) {
        fixes += importLines.length - uniqueImports.length;
        // Replace all createGlassStyle imports with the first unique one
        content = content.split('\n').map(line => {
          if (line.includes('createGlassStyle') && importLines.includes(line)) {
            return importLines.indexOf(line) === 0 ? line : '';
          }
          return line;
        }).join('\n');
      }
    }

    return { content, fixes };
  }

  // Fix missing exports
  fixMissingExports(content, filePath) {
    let fixes = 0;
    
    // Add missing createGlassStyle export if it's defined but not exported
    if (content.includes('function createGlassStyle') && !content.includes('export') && !content.includes('createGlassStyle')) {
      content = content.replace('function createGlassStyle', 'export function createGlassStyle');
      fixes++;
    }

    // Add missing interface exports for commonly referenced interfaces
    const commonInterfaces = ['GlassOptions', 'GlassSurfaceSpec', 'AuraGlassTokens'];
    commonInterfaces.forEach(interfaceName => {
      const regex = new RegExp(`interface\\s+${interfaceName}`, 'g');
      if (content.match(regex) && !content.includes(`export interface ${interfaceName}`)) {
        content = content.replace(regex, `export interface ${interfaceName}`);
        fixes++;
      }
    });

    return { content, fixes };
  }

  // Fix import issues
  fixImports(content) {
    let fixes = 0;

    // Fix relative import paths for glassMixins
    if (content.includes("from './glassMixins'") && !fs.existsSync(path.resolve(path.dirname(content), 'glassMixins.ts'))) {
      content = content.replace(/from '\.\/glassMixins'/g, "from '../core/mixins/glassMixins'");
      fixes++;
    }

    // Fix glassSurface import paths
    if (content.includes("from './glassSurface'")) {
      content = content.replace(/from '\.\/glassSurface'/g, "from '../core/mixins/glassSurface'");
      fixes++;
    }

    // Fix glass token imports
    if (content.includes("from './tokens'")) {
      content = content.replace(/from '\.\/tokens'/g, "from '../tokens/glass'");
      fixes++;
    }

    return { content, fixes };
  }

  // Fix styled-components type issues
  fixStyledComponentsTypes(content) {
    let fixes = 0;

    // Fix styled-components interface props
    content = content.replace(/interface\s+(\w+Props)\s*{([^}]*)elevation\?\s*:\s*number([^}]*)}/g, (match, propName, before, after) => {
      fixes++;
      return `interface ${propName} {${before}elevation?: 'level1' | 'level2' | 'level3' | 'level4' | 'level5'${after}}`;
    });

    return { content, fixes };
  }

  // Fix React import issues
  fixReactImports(content) {
    let fixes = 0;

    // Ensure React is imported when JSX is used
    if ((content.includes('<') || content.includes('React.')) && !content.includes("import React")) {
      content = "import React from 'react';\n" + content;
      fixes++;
    }

    return { content, fixes };
  }

  // Fix interface property conflicts
  fixInterfaceConflicts(content) {
    let fixes = 0;

    // Fix conflicting glass props in interfaces
    const conflictPattern = /(\w+):\s*string;\s*\1:\s*number;/g;
    content = content.replace(conflictPattern, (match, propName) => {
      fixes++;
      return `${propName}: string | number;`;
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
    const fix1 = this.fixElevationTypes(content);
    content = fix1.content;
    totalFixes += fix1.fixes;

    const fix2 = this.fixDuplicateGlassStyle(content);
    content = fix2.content;
    totalFixes += fix2.fixes;

    const fix3 = this.fixMissingExports(content, filePath);
    content = fix3.content;
    totalFixes += fix3.fixes;

    const fix4 = this.fixImports(content);
    content = fix4.content;
    totalFixes += fix4.fixes;

    const fix5 = this.fixStyledComponentsTypes(content);
    content = fix5.content;
    totalFixes += fix5.fixes;

    const fix6 = this.fixReactImports(content);
    content = fix6.content;
    totalFixes += fix6.fixes;

    const fix7 = this.fixInterfaceConflicts(content);
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
    this.log('🔧 Starting TypeScript Error Fixing Script...', 'info');
    this.log('📋 Targeting 212 compilation errors across 114 files', 'info');

    // Get all TypeScript files in src/
    const tsFiles = glob.sync('src/**/*.{ts,tsx}', { 
      cwd: process.cwd(),
      ignore: ['**/*.d.ts', '**/*.stories.tsx', '**/node_modules/**'] 
    });

    this.log(`📁 Found ${tsFiles.length} TypeScript files to process`, 'info');

    // Process each file
    for (const filePath of tsFiles) {
      this.processFile(filePath);
    }

    // Summary
    this.log('\n📊 Fix Summary:', 'success');
    this.log(`   Files processed: ${this.filesProcessed}`, 'info');
    this.log(`   Total fixes applied: ${this.fixesApplied}`, 'success');
    
    if (this.fixesApplied > 0) {
      this.log('\n✅ TypeScript error fixes completed!', 'success');
      this.log('🔍 Run `npm run typecheck` to verify remaining errors', 'info');
    } else {
      this.log('\nℹ️  No TypeScript fixes were needed', 'warning');
    }
  }
}

// Run the fixer
const fixer = new TypeScriptErrorFixer();
fixer.run().catch(console.error);