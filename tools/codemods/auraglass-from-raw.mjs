#!/usr/bin/env node

/**
 * AuraGlass Codemod: Migrate from raw values to tokens
 * Transforms raw colors, spacing, and filters to token-based system
 */

import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color mappings
const COLOR_MAP = {
  // Hex to token
  '#ffffff': 'var(--glass-color-white)',
  '#000000': 'var(--glass-color-black)',
  '#fff': 'var(--glass-color-white)',
  '#000': 'var(--glass-color-black)',
  '#3b82f6': 'hsl(var(--glass-color-primary))',
  '#10b981': 'hsl(var(--glass-color-success))',
  '#f59e0b': 'hsl(var(--glass-color-warning))',
  '#ef4444': 'hsl(var(--glass-color-danger))',
  '#0ea5e9': 'hsl(var(--glass-color-info))',
  
  // RGB to token
  'rgb(255, 255, 255)': 'rgb(var(--glass-color-white))',
  'rgb(0, 0, 0)': 'rgb(var(--glass-color-black))',
  'rgba(255, 255, 255, 0.95)': 'var(--glass-text-primary)',
  'rgba(255, 255, 255, 0.8)': 'var(--glass-text-secondary)',
  'rgba(255, 255, 255, 0.6)': 'var(--glass-text-tertiary)',
  'rgba(255, 255, 255, 0.4)': 'var(--glass-text-disabled)',
};

// Spacing mappings (px to token)
const SPACING_MAP = {
  '0px': 'var(--glass-space-0)',
  '1px': 'var(--glass-space-px)',
  '4px': 'var(--glass-space-1)',
  '8px': 'var(--glass-space-2)',
  '12px': 'var(--glass-space-3)',
  '16px': 'var(--glass-space-4)',
  '20px': 'var(--glass-space-5)',
  '24px': 'var(--glass-space-6)',
  '32px': 'var(--glass-space-8)',
  '48px': 'var(--glass-space-12)',
  '64px': 'var(--glass-space-16)',
};

// Radius mappings
const RADIUS_MAP = {
  '0px': 'var(--glass-radius-none)',
  '8px': 'var(--glass-radius-sm)',
  '12px': 'var(--glass-radius-md)',
  '16px': 'var(--glass-radius-lg)',
  '20px': 'var(--glass-radius-xl)',
  '24px': 'var(--glass-radius-2xl)',
  '9999px': 'var(--glass-radius-full)',
};

// Class mappings
const CLASS_MAP = {
  'animate-pulse': 'glass-animate-float',
  'backdrop-blur-sm': 'glass-blur-sm',
  'backdrop-blur-md': 'glass-blur-md',
  'backdrop-blur-lg': 'glass-blur-lg',
  'backdrop-blur-xl': 'glass-blur-xl',
  'bg-white/10': 'glass-surface-default',
  'bg-white/20': 'glass-surface-default',
  'bg-white/30': 'glass-surface-default',
  'border-white/10': 'glass-border-subtle',
  'border-white/20': 'glass-border-default',
  'border-white/30': 'glass-border-strong',
};

class AuraGlassCodemod {
  constructor() {
    this.filesProcessed = 0;
    this.totalChanges = 0;
    this.diffSummary = [];
  }
  
  /**
   * Transform a single file
   */
  transformFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let changes = 0;
    
    // Transform colors
    Object.entries(COLOR_MAP).forEach(([raw, token]) => {
      const regex = new RegExp(this.escapeRegex(raw), 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, token);
        changes += matches.length;
      }
    });
    
    // Transform spacing in CSS
    if (filePath.endsWith('.css')) {
      Object.entries(SPACING_MAP).forEach(([raw, token]) => {
        const patterns = [
          `padding: ${raw}`,
          `margin: ${raw}`,
          `gap: ${raw}`,
          `top: ${raw}`,
          `right: ${raw}`,
          `bottom: ${raw}`,
          `left: ${raw}`,
        ];
        
        patterns.forEach(pattern => {
          const regex = new RegExp(this.escapeRegex(pattern), 'g');
          const replacement = pattern.replace(raw, token);
          const matches = content.match(regex);
          if (matches) {
            content = content.replace(regex, replacement);
            changes += matches.length;
          }
        });
      });
      
      // Transform border-radius
      Object.entries(RADIUS_MAP).forEach(([raw, token]) => {
        const pattern = `border-radius: ${raw}`;
        const regex = new RegExp(this.escapeRegex(pattern), 'g');
        const replacement = `border-radius: ${token}`;
        const matches = content.match(regex);
        if (matches) {
          content = content.replace(regex, replacement);
          changes += matches.length;
        }
      });
      
      // Transform inline backdrop-filter to utility
      const backdropPattern = /\.([a-zA-Z-]+)\s*{\s*backdrop-filter:\s*blur\((\d+)px\)[^}]*}/g;
      content = content.replace(backdropPattern, (match, className, blurValue) => {
        const blurClass = this.getBlurClass(blurValue);
        return `.${className} { /* Use ${blurClass} utility instead */ }`;
      });
    }
    
    // Transform className strings in TSX/JSX
    if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
      // Simple class replacements
      Object.entries(CLASS_MAP).forEach(([raw, token]) => {
        const patterns = [
          `className="${raw}"`,
          `className='${raw}'`,
          `className={\`${raw}\`}`,
          `className={"${raw}"}`,
          `className={'${raw}'}`,
        ];
        
        patterns.forEach(pattern => {
          const regex = new RegExp(this.escapeRegex(pattern), 'g');
          const replacement = pattern.replace(raw, token);
          const matches = content.match(regex);
          if (matches) {
            content = content.replace(regex, replacement);
            changes += matches.length;
          }
        });
      });
      
      // Multi-class replacements
      const classNamePattern = /className=["'`{]([^"'`}]+)["'`}]/g;
      content = content.replace(classNamePattern, (match, classes) => {
        let newClasses = classes;
        Object.entries(CLASS_MAP).forEach(([raw, token]) => {
          newClasses = newClasses.replace(new RegExp(`\\b${this.escapeRegex(raw)}\\b`, 'g'), token);
        });
        return match.replace(classes, newClasses);
      });
      
      // Replace style props with tokens
      const stylePattern = /style={{([^}]+)}}/g;
      content = content.replace(stylePattern, (match, styles) => {
        let newStyles = styles;
        
        // Replace colors
        Object.entries(COLOR_MAP).forEach(([raw, token]) => {
          newStyles = newStyles.replace(new RegExp(this.escapeRegex(raw), 'g'), token);
        });
        
        // Replace spacing
        Object.entries(SPACING_MAP).forEach(([raw, token]) => {
          newStyles = newStyles.replace(new RegExp(`:\\s*${this.escapeRegex(raw)}`, 'g'), `: ${token}`);
        });
        
        return `style={{${newStyles}}}`;
      });
    }
    
    // Only write if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      this.filesProcessed++;
      this.totalChanges += changes;
      
      // Generate diff summary
      this.diffSummary.push({
        file: filePath,
        changes: changes,
        before: this.getSnippet(originalContent),
        after: this.getSnippet(content),
      });
    }
  }
  
  /**
   * Escape regex special characters
   */
  escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  /**
   * Get blur class from pixel value
   */
  getBlurClass(pixels) {
    const value = parseInt(pixels);
    if (value <= 4) return 'glass-blur-sm';
    if (value <= 8) return 'glass-blur-md';
    if (value <= 16) return 'glass-blur-lg';
    return 'glass-blur-xl';
  }
  
  /**
   * Get a snippet of the file for diff
   */
  getSnippet(content) {
    const lines = content.split('\n').slice(0, 5);
    return lines.join('\n');
  }
  
  /**
   * Run the codemod
   */
  run(pattern = 'src/**/*.{tsx,ts,css,jsx,js}') {
    console.log('🔄 Running AuraGlass Raw-to-Token Codemod...\n');
    
    const files = glob.sync(pattern, {
      ignore: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/tokens.css',
        '**/themes/*.css',
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
    console.log('✨ Codemod Complete!\n');
    console.log(`📊 Statistics:`);
    console.log(`   Files modified: ${this.filesProcessed}`);
    console.log(`   Total replacements: ${this.totalChanges}\n`);
    
    if (this.filesProcessed > 0) {
      console.log('📝 Sample changes:');
      this.diffSummary.slice(0, 5).forEach(({ file, changes }) => {
        console.log(`   ${file}: ${changes} changes`);
      });
      
      console.log('\n💡 Next steps:');
      console.log('   1. Run token linter: npm run lint:tokens');
      console.log('   2. Run style audit: npm run lint:styles');
      console.log('   3. Test your application');
      console.log('   4. Commit changes\n');
    } else {
      console.log('✅ No changes needed - your code is already using tokens!\n');
    }
  }
}

// Run if executed directly
if (process.argv[1] === __filename) {
  const codemod = new AuraGlassCodemod();
  const pattern = process.argv[2] || 'src/**/*.{tsx,ts,css,jsx,js}';
  codemod.run(pattern);
}

export default AuraGlassCodemod;