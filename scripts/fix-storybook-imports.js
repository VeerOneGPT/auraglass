#!/usr/bin/env node

/**
 * FIX STORYBOOK IMPORTS
 *
 * Automatically fixes missing React imports and other common import issues in story files
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class StorybookImportFixer {
  constructor() {
    this.fixedFiles = 0;
    this.totalFiles = 0;
  }

  async run() {
    console.log('🔧 FIXING STORYBOOK IMPORTS');
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

      // Fix 1: Add React import if missing
      if (!this.hasReactImport(content)) {
        fixedContent = this.addReactImport(fixedContent);
        wasFixed = true;
      }

      // Fix 2: Add missing React hooks imports
      const missingHooks = this.getMissingHooks(content);
      if (missingHooks.length > 0) {
        fixedContent = this.addHookImports(fixedContent, missingHooks);
        wasFixed = true;
      }

      // Fix 3: Add missing Storybook imports
      const missingSbImports = this.getMissingStorybookImports(content);
      if (missingSbImports.length > 0) {
        fixedContent = this.addStorybookImports(fixedContent, missingSbImports);
        wasFixed = true;
      }

      // Fix 4: Fix component import paths
      const componentImportFix = this.fixComponentImport(content, filePath);
      if (componentImportFix !== content) {
        fixedContent = componentImportFix;
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

  hasReactImport(content) {
    return content.includes('import React') ||
           content.includes("from 'react'") ||
           content.includes('from "react"');
  }

  addReactImport(content) {
    const lines = content.split('\n');

    // Find the first import line
    let firstImportIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import')) {
        firstImportIndex = i;
        break;
      }
    }

    // Add React import at the beginning
    const reactImport = "import React from 'react';";
    if (firstImportIndex >= 0) {
      lines.splice(firstImportIndex, 0, reactImport);
    } else {
      lines.unshift(reactImport);
    }

    return lines.join('\n');
  }

  getMissingHooks(content) {
    const hooks = ['useState', 'useEffect', 'useCallback', 'useMemo', 'useRef'];
    const missing = [];

    for (const hook of hooks) {
      if (content.includes(hook) && !content.includes(`import { ${hook}`) &&
          !content.includes(`import React, { ${hook}`) &&
          !content.includes(`from 'react'`)) {
        missing.push(hook);
      }
    }

    return missing;
  }

  addHookImports(content, hooks) {
    const lines = content.split('\n');
    let reactImportIndex = -1;

    // Find existing React import
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("from 'react'") || lines[i].includes('from "react"')) {
        reactImportIndex = i;
        break;
      }
    }

    if (reactImportIndex >= 0) {
      // Update existing React import to include hooks
      const currentImport = lines[reactImportIndex];
      if (currentImport.includes('import React')) {
        // Replace with named imports
        lines[reactImportIndex] = `import React, { ${hooks.join(', ')} } from 'react';`;
      } else if (currentImport.includes('{')) {
        // Add to existing named imports
        const match = currentImport.match(/import \{([^}]+)\}/);
        if (match) {
          const existingImports = match[1].split(',').map(s => s.trim()).filter(s => s);
          const allImports = [...new Set([...existingImports, ...hooks])].sort();
          lines[reactImportIndex] = currentImport.replace(/\{[^}]+\}/, `{ ${allImports.join(', ')} }`);
        }
      }
    } else {
      // Add new React import with hooks
      const hookImport = `import { ${hooks.join(', ')} } from 'react';`;
      lines.unshift(hookImport);
    }

    return lines.join('\n');
  }

  getMissingStorybookImports(content) {
    const imports = [];
    const neededImports = {
      'Meta': content.includes('Meta') && !content.includes('import.*Meta'),
      'StoryObj': content.includes('StoryObj') && !content.includes('import.*StoryObj'),
      'StoryFn': content.includes('StoryFn') && !content.includes('import.*StoryFn')
    };

    for (const [imp, needed] of Object.entries(neededImports)) {
      if (needed) {
        imports.push(imp);
      }
    }

    return imports;
  }

  addStorybookImports(content, imports) {
    const lines = content.split('\n');
    let sbImportIndex = -1;

    // Find existing Storybook import
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("from '@storybook/react'")) {
        sbImportIndex = i;
        break;
      }
    }

    if (sbImportIndex >= 0) {
      // Update existing import
      const currentImport = lines[sbImportIndex];
      const match = currentImport.match(/import \{([^}]+)\}/);
      if (match) {
        const existingImports = match[1].split(',').map(s => s.trim()).filter(s => s);
        const allImports = [...new Set([...existingImports, ...imports])].sort();
        lines[sbImportIndex] = currentImport.replace(/\{[^}]+\}/, `{ ${allImports.join(', ')} }`);
      }
    } else {
      // Add new import
      const sbImport = `import type { ${imports.join(', ')} } from '@storybook/react';`;
      lines.unshift(sbImport);
    }

    return lines.join('\n');
  }

  fixComponentImport(content, filePath) {
    const componentName = path.basename(filePath, path.extname(filePath)).replace('.stories', '');
    const dirName = path.dirname(filePath);

    // Check if component import exists
    const componentImportPattern = new RegExp(`import.*${componentName}.*from`, 'i');
    if (!componentImportPattern.test(content)) {
      // Try to find the component file
      const possiblePaths = [
        `./${componentName}.tsx`,
        `./${componentName}.ts`,
        `../${componentName}.tsx`,
        `../../${componentName}.tsx`,
        `./${componentName}/${componentName}.tsx`
      ];

      for (const relPath of possiblePaths) {
        const fullPath = path.resolve(dirName, relPath);
        if (fs.existsSync(fullPath)) {
          const lines = content.split('\n');

          // Find where to insert the import (after other imports)
          let insertIndex = 0;
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('import')) {
              insertIndex = i + 1;
            } else if (lines[i].trim() !== '') {
              break;
            }
          }

          const importLine = `import { ${componentName} } from '${relPath.replace('.tsx', '')}';`;
          lines.splice(insertIndex, 0, importLine);

          return lines.join('\n');
        }
      }
    }

    return content;
  }
}

// Run the fixer
const fixer = new StorybookImportFixer();
fixer.run().catch(error => {
  console.error('💥 Import fixer failed:', error);
  process.exit(1);
});
