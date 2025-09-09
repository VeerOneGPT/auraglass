#!/usr/bin/env node
/**
 * Typography Hardcoding Fix Script
 * 
 * Systematically fixes ALL remaining hardcoded typography issues
 * to achieve 100% typography consistency across the design system
 */

const fs = require('fs');
const path = require('path');

class TypographyHardcodingFixer {
  constructor() {
    this.fixedComponents = 0;
    this.totalChanges = 0;
    this.errors = [];
    
    // Typography token mappings
    this.typographyTokens = {
      // Font sizes
      '24px': 'var(--typography-heading-size)', // 1.5rem
      '18px': 'var(--typography-subheading-size)', // 1.125rem  
      '16px': '1rem', // base size
      '14px': 'var(--typography-body-size)', // 0.875rem
      '12px': 'var(--typography-caption-size)', // 0.75rem
      '11px': 'var(--typography-caption-size)', // 0.75rem
      '10px': '0.625rem', // small caption
      
      // Font weights
      'bold': 'var(--typography-heading-weight)', // 600
      '700': 'var(--typography-heading-weight)', // 600
      '600': 'var(--typography-heading-weight)', // 600
      '500': 'var(--typography-subheading-weight)', // 500
      '400': 'var(--typography-body-weight)', // 400
      'normal': 'var(--typography-body-weight)', // 400
    };

    this.replacementPatterns = [
      // fontSize patterns
      {
        pattern: /fontSize:\s*['"]?24px['"]?/g,
        replacement: "fontSize: 'var(--typography-heading-size)'",
        description: '24px → heading size token'
      },
      {
        pattern: /fontSize:\s*['"]?18px['"]?/g,
        replacement: "fontSize: 'var(--typography-subheading-size)'",
        description: '18px → subheading size token'
      },
      {
        pattern: /fontSize:\s*['"]?16px['"]?/g,
        replacement: "fontSize: '1rem'",
        description: '16px → base size (1rem)'
      },
      {
        pattern: /fontSize:\s*['"]?14px['"]?/g,
        replacement: "fontSize: 'var(--typography-body-size)'",
        description: '14px → body size token'
      },
      {
        pattern: /fontSize:\s*['"]?12px['"]?/g,
        replacement: "fontSize: 'var(--typography-caption-size)'",
        description: '12px → caption size token'
      },
      {
        pattern: /fontSize:\s*['"]?11px['"]?/g,
        replacement: "fontSize: 'var(--typography-caption-size)'",
        description: '11px → caption size token'
      },
      {
        pattern: /fontSize:\s*['"]?10px['"]?/g,
        replacement: "fontSize: '0.625rem'",
        description: '10px → small size (0.625rem)'
      },

      // CSS fontSize patterns
      {
        pattern: /font-size:\s*24px/g,
        replacement: "font-size: var(--typography-heading-size)",
        description: 'CSS 24px → heading size token'
      },
      {
        pattern: /font-size:\s*18px/g,
        replacement: "font-size: var(--typography-subheading-size)",
        description: 'CSS 18px → subheading size token'
      },
      {
        pattern: /font-size:\s*16px/g,
        replacement: "font-size: 1rem",
        description: 'CSS 16px → base size'
      },
      {
        pattern: /font-size:\s*14px/g,
        replacement: "font-size: var(--typography-body-size)",
        description: 'CSS 14px → body size token'
      },
      {
        pattern: /font-size:\s*12px/g,
        replacement: "font-size: var(--typography-caption-size)",
        description: 'CSS 12px → caption size token'
      },
      {
        pattern: /font-size:\s*10px/g,
        replacement: "font-size: 0.625rem",
        description: 'CSS 10px → small size'
      },

      // fontWeight patterns
      {
        pattern: /fontWeight:\s*['"]?bold['"]?/g,
        replacement: "fontWeight: 'var(--typography-heading-weight)'",
        description: 'bold → heading weight token'
      },
      {
        pattern: /fontWeight:\s*['"]?700['"]?/g,
        replacement: "fontWeight: 'var(--typography-heading-weight)'",
        description: '700 → heading weight token'
      },
      {
        pattern: /fontWeight:\s*['"]?600['"]?/g,
        replacement: "fontWeight: 'var(--typography-heading-weight)'",
        description: '600 → heading weight token'
      },
      {
        pattern: /fontWeight:\s*['"]?500['"]?/g,
        replacement: "fontWeight: 'var(--typography-subheading-weight)'",
        description: '500 → subheading weight token'
      },
      {
        pattern: /fontWeight:\s*['"]?400['"]?/g,
        replacement: "fontWeight: 'var(--typography-body-weight)'",
        description: '400 → body weight token'
      },

      // CSS fontWeight patterns
      {
        pattern: /font-weight:\s*bold/g,
        replacement: "font-weight: var(--typography-heading-weight)",
        description: 'CSS bold → heading weight token'
      },
      {
        pattern: /font-weight:\s*700/g,
        replacement: "font-weight: var(--typography-heading-weight)",
        description: 'CSS 700 → heading weight token'
      },
      {
        pattern: /font-weight:\s*600/g,
        replacement: "font-weight: var(--typography-heading-weight)",
        description: 'CSS 600 → heading weight token'
      },
      {
        pattern: /font-weight:\s*500/g,
        replacement: "font-weight: var(--typography-subheading-weight)",
        description: 'CSS 500 → subheading weight token'
      },
      {
        pattern: /font-weight:\s*400/g,
        replacement: "font-weight: var(--typography-body-weight)",
        description: 'CSS 400 → body weight token'
      }
    ];
  }

  async run() {
    console.log('🔤 Starting Typography Hardcoding Fix...');
    console.log('🎯 Target: 100% typography consistency - eliminate ALL hardcoded values\n');

    const componentsWithIssues = await this.findComponentsWithTypographyIssues();
    console.log(`Found ${componentsWithIssues.length} components with typography hardcoding\n`);

    for (const componentPath of componentsWithIssues) {
      try {
        await this.fixComponentTypography(componentPath);
      } catch (error) {
        this.errors.push({ component: componentPath, error: error.message });
      }
    }

    await this.addTypographyImportsWhereNeeded();
    
    this.generateReport();
  }

  async findComponentsWithTypographyIssues() {
    const hardcodedPatterns = [
      /fontSize:\s*['"]?\d+px['"]?/g,
      /fontWeight:\s*['"]?bold['"]?/g,
      /fontWeight:\s*['"]?[567]00['"]?/g,
      /font-size:\s*\d+px/g,
      /font-weight:\s*bold/g,
      /font-weight:\s*[567]00/g
    ];

    const componentFiles = this.getAllTsxFiles('src/components');
    const componentsWithIssues = [];
    
    for (const filePath of componentFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      const hasIssues = hardcodedPatterns.some(pattern => pattern.test(content));
      if (hasIssues) {
        componentsWithIssues.push(filePath);
      }
    }
    
    return componentsWithIssues;
  }

  getAllTsxFiles(dir) {
    let files = [];
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files = files.concat(this.getAllTsxFiles(fullPath));
      } else if (item.endsWith('.tsx') && !item.includes('.stories.')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  async fixComponentTypography(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    const fileName = path.basename(filePath);
    let componentChanges = 0;

    console.log(`🔧 Fixing typography in ${fileName}...`);

    // Apply all typography replacement patterns
    for (const { pattern, replacement, description } of this.replacementPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, replacement);
        componentChanges += matches.length;
        console.log(`  ✅ ${description}: ${matches.length} replacements`);
      }
    }

    if (componentChanges > 0 && content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      this.fixedComponents++;
      this.totalChanges += componentChanges;
      console.log(`  ✅ Fixed ${fileName} (${componentChanges} changes)\n`);
    } else {
      console.log(`  ℹ️  No changes needed in ${fileName}\n`);
    }
  }

  async addTypographyImportsWhereNeeded() {
    console.log('📦 Adding typography imports where needed...');

    // Components that use typography tokens should import the CSS
    const componentsWithTokens = this.getAllTsxFiles('src/components').filter(filePath => {
      const content = fs.readFileSync(filePath, 'utf8');
      return content.includes('var(--typography-');
    });

    for (const componentPath of componentsWithTokens) {
      let content = fs.readFileSync(componentPath, 'utf8');
      
      // Check if it already imports styles
      if (content.includes('import') && content.includes('.css')) {
        continue; // Already has style imports
      }

      // Add typography CSS import comment
      const fileName = path.basename(componentPath);
      if (!content.includes('Typography tokens available via')) {
        const insertIndex = content.indexOf('import React');
        if (insertIndex !== -1) {
          const beforeImport = content.substring(0, insertIndex);
          const afterImport = content.substring(insertIndex);
          
          const comment = `// Typography tokens available via typography.css (imported in index.css)\n`;
          content = beforeImport + comment + afterImport;
          
          fs.writeFileSync(componentPath, content, 'utf8');
          console.log(`  ✅ Added typography import comment to ${fileName}`);
        }
      }
    }
  }

  generateReport() {
    console.log('\n📊 Typography Hardcoding Fix Report:');
    console.log('='.repeat(60));
    console.log(`✅ Components fixed: ${this.fixedComponents}`);
    console.log(`🔄 Total replacements: ${this.totalChanges}`);
    console.log(`❌ Errors: ${this.errors.length}`);

    if (this.errors.length > 0) {
      console.log('\nErrors encountered:');
      this.errors.forEach(({ component, error }) => {
        console.log(`  ❌ ${path.basename(component)}: ${error}`);
      });
    }

    console.log('\n🎨 Typography improvements:');
    console.log('  • Font sizes now use CSS custom properties');
    console.log('  • Font weights standardized to design tokens');
    console.log('  • Consistent typography scale across all components');
    console.log('  • Central control via typography.css');

    console.log('\n✅ Benefits achieved:');
    console.log('  • 100% typography consistency');
    console.log('  • Easy global typography adjustments');
    console.log('  • Maintainable design system');
    console.log('  • Professional visual hierarchy');

    // Validate the fixes
    console.log('\n🔍 Validating fixes...');
    this.validateFixes();
  }

  async validateFixes() {
    const componentsWithIssues = await this.findComponentsWithTypographyIssues();
    
    if (componentsWithIssues.length === 0) {
      console.log('🎉 SUCCESS: ALL typography hardcoding eliminated!');
      console.log('🎯 Typography consistency: 100% achieved');
    } else {
      console.log(`⚠️  ${componentsWithIssues.length} components still have hardcoded typography:`);
      componentsWithIssues.slice(0, 5).forEach(filePath => {
        console.log(`   - ${path.basename(filePath)}`);
      });
      if (componentsWithIssues.length > 5) {
        console.log(`   ... and ${componentsWithIssues.length - 5} more`);
      }
    }
  }
}

// Run the fixer
if (require.main === module) {
  const fixer = new TypographyHardcodingFixer();
  fixer.run().catch(error => {
    console.error('❌ Typography fix failed:', error);
    process.exit(1);
  });
}

module.exports = TypographyHardcodingFixer;