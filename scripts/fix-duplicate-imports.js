#!/usr/bin/env node

/**
 * FIX DUPLICATE IMPORTS
 *
 * Fixes duplicate and malformed import statements created by the previous fixer
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DuplicateImportFixer {
  constructor() {
    this.fixedFiles = 0;
    this.totalFiles = 0;
  }

  async run() {
    console.log('🔧 FIXING DUPLICATE IMPORTS');
    console.log('===========================\n');

    // Find all story files
    const storyFiles = this.findStoryFiles();
    console.log(`📁 Found ${storyFiles.length} story files to check\n`);

    // Fix each story file
    for (const filePath of storyFiles) {
      this.fixStoryFile(filePath);
    }

    console.log('\n📊 FIX SUMMARY');
    console.log('==============');
    console.log(`Files checked: ${this.totalFiles}`);
    console.log(`Files fixed: ${this.fixedFiles}`);
    console.log(`Success rate: ${this.totalFiles > 0 ? Math.round((this.fixedFiles / this.totalFiles) * 100) : 0}%`);
  }

  findStoryFiles() {
    try {
      const result = execSync('find src -name "*.stories.*" -type f', {
        encoding: 'utf8',
        cwd: process.cwd()
      });

      return result.trim().split('\n').filter(line => line.trim());
    } catch (error) {
      console.error('❌ Error finding story files:', error.message);
      return [];
    }
  }

  fixStoryFile(filePath) {
    this.totalFiles++;

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let fixedContent = content;
      let wasFixed = false;

      // Fix duplicate import blocks
      const duplicateFixed = this.fixDuplicateImports(fixedContent);
      if (duplicateFixed !== fixedContent) {
        fixedContent = duplicateFixed;
        wasFixed = true;
      }

      // Fix invalid identifiers (like glass-panel)
      const invalidFixed = this.fixInvalidIdentifiers(fixedContent);
      if (invalidFixed !== fixedContent) {
        fixedContent = invalidFixed;
        wasFixed = true;
      }

      // Fix malformed import syntax
      const syntaxFixed = this.fixImportSyntax(fixedContent);
      if (syntaxFixed !== fixedContent) {
        fixedContent = syntaxFixed;
        wasFixed = true;
      }

      // Save if changes were made
      if (wasFixed) {
        fs.writeFileSync(filePath, fixedContent, 'utf8');
        console.log(`✅ Fixed ${path.basename(filePath)}`);
        this.fixedFiles++;
      }

    } catch (error) {
      console.log(`❌ Error fixing ${path.basename(filePath)}: ${error.message}`);
    }
  }

  fixDuplicateImports(content) {
    const lines = content.split('\n');
    const cleanedLines = [];
    const seenImports = new Set();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check for duplicate import patterns
      if (line.startsWith('import')) {
        const importKey = this.getImportKey(line);

        if (seenImports.has(importKey)) {
          // Skip duplicate
          continue;
        }

        seenImports.add(importKey);
      }

      cleanedLines.push(lines[i]);
    }

    return cleanedLines.join('\n');
  }

  getImportKey(importLine) {
    // Extract the main part of the import for comparison
    const match = importLine.match(/import\s+(?:type\s+)?(?:\{[^}]+\}|\w+)\s+from\s+['"]([^'"]+)['"]/);
    if (match) {
      return match[1]; // The module path
    }
    return importLine; // Fallback to full line
  }

  fixInvalidIdentifiers(content) {
    // Replace invalid identifiers like "glass-panel" with valid ones
    let fixed = content;

    // Common invalid patterns
    const invalidPatterns = [
      { from: /\bglass-panel\b/g, to: 'GlassPanel' },
      { from: /\bimage-list\b/g, to: 'ImageList' },
      { from: /\bimage-list-item\b/g, to: 'ImageListItem' },
      { from: /\bimage-list-item-bar\b/g, to: 'ImageListItemBar' },
      { from: /\btoggle-button\b/g, to: 'ToggleButton' },
      { from: /\btoggle-button-group\b/g, to: 'ToggleButtonGroup' },
      { from: /\btree-view\b/g, to: 'TreeView' },
      { from: /\btree-item\b/g, to: 'TreeItem' },
      { from: /\bspeed-dial\b/g, to: 'SpeedDial' },
      { from: /\bspeed-dial-action\b/g, to: 'SpeedDialAction' },
      { from: /\bspeed-dial-icon\b/g, to: 'SpeedDialIcon' },
      { from: /\bglass-motion-controller\b/g, to: 'GlassMotionController' },
      { from: /\bglass-localization-provider\b/g, to: 'GlassLocalizationProvider' }
    ];

    for (const pattern of invalidPatterns) {
      fixed = fixed.replace(pattern.from, pattern.to);
    }

    return fixed;
  }

  fixImportSyntax(content) {
    const lines = content.split('\n');
    const fixedLines = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Fix malformed import statements
      if (line.includes('import {') && line.includes('}')) {
        // Check if there are nested braces or other syntax issues
        const openBraces = (line.match(/\{/g) || []).length;
        const closeBraces = (line.match(/\}/g) || []).length;

        if (openBraces > closeBraces) {
          // Try to fix by merging with next line
          if (i + 1 < lines.length) {
            const nextLine = lines[i + 1].trim();
            if (nextLine.includes('}')) {
              line = line.trim() + ' ' + nextLine;
              i++; // Skip next line
            }
          }
        }
      }

      // Remove completely malformed lines
      if (line.includes('import {') && !line.includes('from')) {
        // Skip this line if it's malformed
        continue;
      }

      fixedLines.push(line);
    }

    return fixedLines.join('\n');
  }
}

// Run the fixer
const fixer = new DuplicateImportFixer();
fixer.run().catch(error => {
  console.error('💥 Duplicate import fixer failed:', error);
  process.exit(1);
});
