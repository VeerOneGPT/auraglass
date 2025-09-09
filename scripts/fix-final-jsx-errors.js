#!/usr/bin/env node
/**
 * Fix Final JSX Migration Errors
 * 
 * Clean up invalid TypeScript syntax from the codemod migration
 */

const fs = require('fs');
const path = require('path');

class JSXErrorFixer {
  constructor() {
    this.fixCount = 0;
  }

  async fixAll() {
    console.log('🔧 Fixing JSX migration errors...');
    
    const srcDir = path.join(process.cwd(), 'src');
    await this.scanDirectory(srcDir);
    
    console.log(`✅ Fixed ${this.fixCount} files`);
  }

  async scanDirectory(dir) {
    const entries = fs.readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        await this.scanDirectory(fullPath);
      } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
        await this.fixFile(fullPath);
      }
    }
  }

  async fixFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Fix invalid createGlassStyle function call syntax in type definitions
      content = content.replace(
        /createGlassStyle\(\{[^}]*\}\)\?\s*:\s*[^;]+;/g,
        '// Removed invalid createGlassStyle type annotation'
      );
      
      // Fix broken import statements 
      content = content.replace(
        /import\s+\{\s*createGlassStyle\(\{[^}]*\}\)\s*\}/g,
        'import { createGlassStyle }'
      );
      
      // Fix broken variable declarations
      content = content.replace(
        /const\s+\w+\s*=\s*createGlassStyle\(\{[^}]*\}\)\?\s*:\s*[^;]+;/g,
        '// Removed invalid createGlassStyle assignment'
      );
      
      // Remove broken interface properties with createGlassStyle
      content = content.replace(
        /\s*createGlassStyle\(\{[^}]*\}\)\?\s*:\s*[^;]*;/g,
        ''
      );
      
      // Fix object property definitions with createGlassStyle
      content = content.replace(
        /(\w+):\s*createGlassStyle\(\{[^}]*\}\)\?\s*:\s*[^,}]+/g,
        '$1: {}'
      );
      
      // Clean up broken JSX attribute assignments
      content = content.replace(
        /\s*=\s*createGlassStyle\(\{[^}]*\}\)\?\s*:\s*[^}]*}/g,
        '={createGlassStyle({ intent: "neutral", elevation: "level2" })}'
      );
      
      // Fix style property assignments
      content = content.replace(
        /style\s*=\s*createGlassStyle\(\{[^}]*\}\)\?\s*:\s*[^}]*}/g,
        'style={createGlassStyle({ intent: "neutral", elevation: "level2" })}'
      );
      
      // Remove stray characters and fix syntax
      content = content.replace(/\?\s*:\s*undefined/g, '');
      content = content.replace(/createGlassStyle\(\{[^}]*\}\)\s*\?\s*:\s*/g, '');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        this.fixCount++;
        console.log(`✓ Fixed ${path.relative(process.cwd(), filePath)}`);
      }
    } catch (error) {
      console.error(`❌ Error fixing ${filePath}:`, error.message);
    }
  }
}

if (require.main === module) {
  const fixer = new JSXErrorFixer();
  fixer.fixAll().catch(console.error);
}

module.exports = JSXErrorFixer;