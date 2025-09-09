#!/usr/bin/env node
/**
 * Fix JSX-only errors from codemod
 */

const fs = require('fs');
const path = require('path');

class JSXOnlyFixer {
  constructor() {
    this.fixCount = 0;
  }

  async fixAll() {
    console.log('🔧 Fixing specific JSX syntax errors...');
    
    // Fix the specific files with known issues
    const files = [
      'src/components/button/GlassButton.tsx',
      'src/components/navigation/GlassNavigation.tsx',
      'src/components/surfaces/HeatGlass.tsx',
      'src/components/surfaces/PageGlassContainer.tsx',
      'src/components/charts/types/ChartProps.ts',
      'src/components/speed-dial/SpeedDial.tsx',
      'src/hooks/useGlassOptimization.tsx',
      'src/index.ts',
      'src/primitives/GlassCore.tsx'
    ];
    
    for (const filePath of files) {
      const fullPath = path.join(process.cwd(), filePath);
      if (fs.existsSync(fullPath)) {
        await this.fixFile(fullPath);
      }
    }
    
    console.log(`✅ Fixed ${this.fixCount} files`);
  }

  async fixFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Fix broken default parameter syntax
      content = content.replace(
        /createGlassStyle\(\{[^}]*\}\)\s*=\s*[^,}]+/g,
        'border = "subtle"'
      );
      
      // Fix broken object property names
      content = content.replace(
        /createGlassStyle\(\{[^}]*\}\)(\s*:\s*)/g,
        'border$1'
      );
      
      // Fix broken imports with createGlassStyle in curly braces
      content = content.replace(
        /import\s*\{\s*createGlassStyle\(\{[^}]*\}\)[^}]*\}\s*from/g,
        'import { createGlassStyle } from'
      );
      
      // Clean up any remaining deprecated API references
      content = content.replace(/glassSurface(?!\w)/g, 'createGlassStyle({ intent: "neutral", elevation: "level2" })');
      content = content.replace(/glassBorder(?!\w)/g, 'createGlassStyle({ intent: "neutral", elevation: "level2" })');
      content = content.replace(/interactiveGlass(?!\w)/g, 'createGlassStyle({ intent: "neutral", elevation: "level2", interactive: true })');
      content = content.replace(/createGlassMixin(?!\w)/g, 'createGlassStyle');
      content = content.replace(/createGlassFoundation(?!\w)/g, 'createGlassStyle');
      
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
  const fixer = new JSXOnlyFixer();
  fixer.fixAll().catch(console.error);
}

module.exports = JSXOnlyFixer;