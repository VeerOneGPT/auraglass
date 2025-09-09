#!/usr/bin/env node
/**
 * AuraGlass Unified Migration Codemod
 * 
 * Automatically migrates components from deprecated glass patterns to unified createGlassStyle().
 * This is part of Phase 4: Repository-Wide Migration for glass system unification.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Migration patterns
const MIGRATION_PATTERNS = {
  // Import replacements
  imports: [
    {
      from: /import\s*{[^}]*glassBorder[^}]*}\s*from\s*['"][^'"]*glassBorder['"];?/g,
      to: "import { createGlassStyle } from '../mixins/glassMixins';"
    },
    {
      from: /import\s*{[^}]*glassSurface[^}]*}\s*from\s*['"][^'"]*glassSurface['"];?/g,
      to: "import { createGlassStyle } from '../mixins/glassMixins';"
    },
    {
      from: /import\s*{[^}]*interactiveGlass[^}]*}\s*from\s*['"][^'"]*interactiveGlass['"];?/g,
      to: "import { createGlassStyle } from '../mixins/glassMixins';"
    },
    {
      from: /import\s*{[^}]*glassFoundation[^}]*}\s*from\s*['"][^'"]*glassFoundation['"];?/g,
      to: "import { createGlassStyle } from '../mixins/glassMixins';"
    },
  ],

  // Function call replacements
  functions: [
    {
      from: /glassBorder(?!\w)/g,
      to: "createGlassStyle({ intent: 'neutral', elevation: 'level2' })"
    },
    {
      from: /glassBorderHover(?!\w)/g,
      to: "createGlassStyle({ intent: 'neutral', elevation: 'level3', interactive: true })"
    },
    {
      from: /glassSurface(?!\w)/g,
      to: "createGlassStyle({ intent: 'neutral', elevation: 'level2' })"
    },
    {
      from: /glassSurfaceHover(?!\w)/g,
      to: "createGlassStyle({ intent: 'neutral', elevation: 'level3', interactive: true })"
    },
    {
      from: /glassSurfaceActive(?!\w)/g,
      to: "createGlassStyle({ intent: 'neutral', elevation: 'level1' })"
    },
    {
      from: /interactiveGlass\(\s*{[^}]*}\s*\)/g,
      to: "createGlassStyle({ intent: 'neutral', elevation: 'level2', interactive: true })"
    },
    {
      from: /createGlassFoundation\([^)]*\)/g,
      to: "createGlassStyle({ intent: 'neutral', elevation: 'level2', tier: 'high' })"
    },
  ],

  // Inline style replacements
  inlineStyles: [
    {
      from: /{\s*backdropFilter:\s*['"`]blur\([^'"`]*\)['"`],\s*background:\s*['"`]rgba\([^'"`]*\)['"`][^}]*}/g,
      to: "createGlassStyle({ intent: 'neutral', elevation: 'level2' })"
    },
    {
      from: /{\s*background:\s*['"`]rgba\(255,\s*255,\s*255,\s*0\.[0-9]+\)['"`],\s*backdropFilter:\s*['"`]blur\([^'"`]*\)['"`][^}]*}/g,
      to: "createGlassStyle({ intent: 'neutral', elevation: 'level2' })"
    },
  ],

  // CSS-in-JS object replacements
  objectStyles: [
    {
      from: /const\s+(\w+)\s*=\s*{\s*backdropFilter:\s*['"`][^'"`]*['"`],\s*background:\s*['"`][^'"`]*['"`][^}]*};/g,
      to: "const $1 = createGlassStyle({ intent: 'neutral', elevation: 'level2' });"
    }
  ]
};

class GlassMigrationCodemod {
  constructor() {
    this.migratedFiles = [];
    this.errors = [];
    this.stats = {
      filesProcessed: 0,
      filesModified: 0,
      importsReplaced: 0,
      functionsReplaced: 0,
      stylesReplaced: 0
    };
  }

  async migrate() {
    console.log('🔄 Starting AuraGlass unified migration codemod...');
    
    try {
      // Find all component files
      const componentFiles = this.findComponentFiles();
      console.log(`📁 Found ${componentFiles.length} component files to migrate`);

      // Process each file
      for (const filePath of componentFiles) {
        await this.migrateFile(filePath);
      }

      // Generate migration report
      this.generateReport();
      
      console.log('✅ Migration completed successfully!');
      console.log(`📊 Files processed: ${this.stats.filesProcessed}`);
      console.log(`✏️  Files modified: ${this.stats.filesModified}`);
      
    } catch (error) {
      console.error('❌ Migration failed:', error);
      process.exit(1);
    }
  }

  findComponentFiles() {
    const srcDir = path.join(process.cwd(), 'src');
    const files = [];
    
    const walkDir = (dir) => {
      const entries = fs.readdirSync(dir);
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Skip node_modules and build directories
          if (!entry.includes('node_modules') && !entry.includes('dist') && !entry.includes('build')) {
            walkDir(fullPath);
          }
        } else if (this.isComponentFile(fullPath)) {
          files.push(fullPath);
        }
      }
    };
    
    walkDir(srcDir);
    return files;
  }

  isComponentFile(filePath) {
    // Target TypeScript/TSX files, but exclude test files and stories
    return /\.(ts|tsx)$/.test(filePath) && 
           !filePath.includes('.test.') && 
           !filePath.includes('.spec.') &&
           !filePath.includes('.stories.') &&
           !filePath.includes('node_modules') &&
           !filePath.includes('dist');
  }

  async migrateFile(filePath) {
    this.stats.filesProcessed++;
    
    try {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      let content = originalContent;
      let modified = false;

      // Apply migration patterns
      modified = this.applyImportMigrations(content, filePath) || modified;
      content = this.applyImportMigrations(content, filePath, true);
      
      modified = this.applyFunctionMigrations(content, filePath) || modified;
      content = this.applyFunctionMigrations(content, filePath, true);
      
      modified = this.applyStyleMigrations(content, filePath) || modified;
      content = this.applyStyleMigrations(content, filePath, true);

      // Only write if file was modified
      if (modified && content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        this.migratedFiles.push(filePath);
        this.stats.filesModified++;
        
        console.log(`✏️  Migrated: ${path.relative(process.cwd(), filePath)}`);
      }
      
    } catch (error) {
      console.error(`❌ Error migrating ${filePath}:`, error.message);
      this.errors.push({ file: filePath, error: error.message });
    }
  }

  applyImportMigrations(content, filePath, apply = false) {
    let modified = false;
    let newContent = content;

    for (const pattern of MIGRATION_PATTERNS.imports) {
      if (pattern.from.test(content)) {
        modified = true;
        if (apply) {
          newContent = newContent.replace(pattern.from, pattern.to);
          this.stats.importsReplaced++;
        }
      }
    }

    return apply ? newContent : modified;
  }

  applyFunctionMigrations(content, filePath, apply = false) {
    let modified = false;
    let newContent = content;

    for (const pattern of MIGRATION_PATTERNS.functions) {
      if (pattern.from.test(content)) {
        modified = true;
        if (apply) {
          newContent = newContent.replace(pattern.from, pattern.to);
          this.stats.functionsReplaced++;
        }
      }
    }

    return apply ? newContent : modified;
  }

  applyStyleMigrations(content, filePath, apply = false) {
    let modified = false;
    let newContent = content;

    const allStylePatterns = [
      ...MIGRATION_PATTERNS.inlineStyles,
      ...MIGRATION_PATTERNS.objectStyles
    ];

    for (const pattern of allStylePatterns) {
      if (pattern.from.test(content)) {
        modified = true;
        if (apply) {
          newContent = newContent.replace(pattern.from, pattern.to);
          this.stats.stylesReplaced++;
        }
      }
    }

    return apply ? newContent : modified;
  }

  generateReport() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(process.cwd(), 'reports', 'glass', 'unify-20250909-2255', `migration-${timestamp}.json`);
    
    const report = {
      timestamp: new Date().toISOString(),
      phase: 'Phase 4: Repository-Wide Migration',
      task: 'Execute codemod to migrate all components to createGlassStyle()',
      stats: this.stats,
      migratedFiles: this.migratedFiles.map(f => path.relative(process.cwd(), f)),
      errors: this.errors,
      patterns: Object.keys(MIGRATION_PATTERNS).map(key => ({
        category: key,
        count: MIGRATION_PATTERNS[key].length
      }))
    };
    
    // Ensure reports directory exists
    const reportsDir = path.dirname(reportPath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Migration report saved: ${path.relative(process.cwd(), reportPath)}`);
  }
}

// CLI execution
if (require.main === module) {
  const codemod = new GlassMigrationCodemod();
  codemod.migrate().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = GlassMigrationCodemod;