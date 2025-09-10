#!/usr/bin/env node

/**
 * AuraGlass Token Linter
 * Validates token usage and flags raw values
 */

const fs = require("fs");
const path = require("path");

// Use fast-glob if available, otherwise fall back to manual file walking
let glob;
try {
  glob = require("fast-glob");
} catch (e) {
  try {
    glob = require("glob");
  } catch (e2) {
    // Fallback implementation
    glob = {
      sync: (pattern, options = {}) => {
        const walkDir = (dir, fileList = []) => {
          const files = fs.readdirSync(dir);
          files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory() && !options.ignore?.some(ign => filePath.includes(ign))) {
              walkDir(filePath, fileList);
            } else if (stat.isFile()) {
              const ext = path.extname(file);
              if (['.tsx', '.ts', '.css'].includes(ext)) {
                fileList.push(filePath);
              }
            }
          });
          return fileList;
        };
        
        return walkDir('src');
      }
    };
  }
}

// Violation types
const VIOLATIONS = {
  RAW_COLOR: "raw-color",
  INLINE_BACKDROP: "inline-backdrop",
  ANIMATE_PULSE: "animate-pulse",
  SHADOW_LITERAL: "shadow-literal",
  RAW_SPACING: "raw-spacing",
  INLINE_RADIUS: "inline-radius",
};

// Patterns to detect violations
const PATTERNS = {
  // Raw hex colors
  hexColor: /#[0-9a-fA-F]{3,8}/g,
  
  // Raw rgb/rgba colors
  rgbColor: /rgba?\s*\([^)]+\)/g,
  
  // Raw hsl/hsla colors
  hslColor: /hsla?\s*\([^)]+\)/g,
  
  // Inline backdrop-filter
  backdropFilter: /backdrop-filter\s*:/g,
  webkitBackdropFilter: /-webkit-backdrop-filter\s*:/g,
  
  // Animate pulse
  animatePulse: /animate-pulse/g,
  
  // Shadow literals
  boxShadow: /box-shadow\s*:\s*[^;]+(?:px|em|rem)/g,
  dropShadow: /drop-shadow\s*\([^)]+\)/g,
  
  // Raw spacing values
  rawSpacing: /(?:padding|margin|gap|space|top|right|bottom|left)\s*:\s*\d+px/g,
  
  // Inline border radius
  borderRadius: /border-radius\s*:\s*\d+px/g,
};

class TokenLinter {
  constructor() {
    this.violations = [];
    this.fileCount = 0;
    this.totalViolations = 0;
  }
  
  lintFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const fileViolations = this.detectViolations(content, filePath);
      
      if (fileViolations.length > 0) {
        this.violations.push({
          file: filePath,
          violations: fileViolations,
        });
        this.totalViolations += fileViolations.length;
      }
    } catch (error) {
      console.warn(`Warning: Could not read file ${filePath}: ${error.message}`);
    }
    
    this.fileCount++;
  }
  
  detectViolations(content, filePath) {
    const violations = [];
    
    // Check for raw hex colors (but allow CSS custom properties)
    const hexMatches = [...content.matchAll(PATTERNS.hexColor)];
    hexMatches.forEach(match => {
      const context = this.getContext(content, match.index);
      // Skip CSS custom properties and comments
      if (!context.includes('--') && !context.includes('//') && !context.includes('/*')) {
        violations.push({
          type: VIOLATIONS.RAW_COLOR,
          message: `Raw hex color "${match[0]}" found. Use glass color tokens instead.`,
          line: this.getLineNumber(content, match.index),
          column: this.getColumnNumber(content, match.index),
          suggestion: this.suggestColorToken(match[0]),
        });
      }
    });
    
    // Check for raw RGB/RGBA colors
    const rgbMatches = [...content.matchAll(PATTERNS.rgbColor)];
    rgbMatches.forEach(match => {
      const context = this.getContext(content, match.index);
      if (!context.includes('--glass-') && !context.includes('//') && !context.includes('/*')) {
        violations.push({
          type: VIOLATIONS.RAW_COLOR,
          message: `Raw RGB color "${match[0]}" found. Use glass color tokens instead.`,
          line: this.getLineNumber(content, match.index),
          column: this.getColumnNumber(content, match.index),
          suggestion: 'Use glass-surface-* or glass-accent-* tokens',
        });
      }
    });
    
    // Check for raw HSL colors
    const hslMatches = [...content.matchAll(PATTERNS.hslColor)];
    hslMatches.forEach(match => {
      const context = this.getContext(content, match.index);
      if (!context.includes('--glass-') && !context.includes('//') && !context.includes('/*')) {
        violations.push({
          type: VIOLATIONS.RAW_COLOR,
          message: `Raw HSL color "${match[0]}" found. Use glass color tokens instead.`,
          line: this.getLineNumber(content, match.index),
          column: this.getColumnNumber(content, match.index),
          suggestion: 'Use glass-surface-* or glass-accent-* tokens',
        });
      }
    });
    
    // Check for inline backdrop-filter
    const backdropMatches = [...content.matchAll(PATTERNS.backdropFilter)];
    backdropMatches.forEach(match => {
      violations.push({
        type: VIOLATIONS.INLINE_BACKDROP,
        message: 'Inline backdrop-filter found. Use createGlassStyle() instead.',
        line: this.getLineNumber(content, match.index),
        column: this.getColumnNumber(content, match.index),
        suggestion: 'Use createGlassStyle({ blur: "md" })',
      });
    });
    
    // Check for webkit backdrop filter
    const webkitBackdropMatches = [...content.matchAll(PATTERNS.webkitBackdropFilter)];
    webkitBackdropMatches.forEach(match => {
      violations.push({
        type: VIOLATIONS.INLINE_BACKDROP,
        message: 'Inline -webkit-backdrop-filter found. Use createGlassStyle() instead.',
        line: this.getLineNumber(content, match.index),
        column: this.getColumnNumber(content, match.index),
        suggestion: 'Use createGlassStyle({ blur: "md" })',
      });
    });
    
    // Check for animate-pulse (should use glass-animate-pulse)
    const pulseMatches = [...content.matchAll(PATTERNS.animatePulse)];
    pulseMatches.forEach(match => {
      violations.push({
        type: VIOLATIONS.ANIMATE_PULSE,
        message: 'Raw animate-pulse found. Use glass-animate-pulse instead.',
        line: this.getLineNumber(content, match.index),
        column: this.getColumnNumber(content, match.index),
        suggestion: 'Replace with glass-animate-pulse',
      });
    });
    
    // Check for raw box-shadow values
    const shadowMatches = [...content.matchAll(PATTERNS.boxShadow)];
    shadowMatches.forEach(match => {
      const context = this.getContext(content, match.index);
      if (!context.includes('--glass-elev-') && !context.includes('//') && !context.includes('/*')) {
        violations.push({
          type: VIOLATIONS.SHADOW_LITERAL,
          message: `Raw box-shadow "${match[0].substring(0, 50)}..." found. Use glass elevation tokens.`,
          line: this.getLineNumber(content, match.index),
          column: this.getColumnNumber(content, match.index),
          suggestion: 'Use glass-elev-* classes or --glass-elev-* tokens',
        });
      }
    });
    
    // Check for raw spacing values
    const spacingMatches = [...content.matchAll(PATTERNS.rawSpacing)];
    spacingMatches.forEach(match => {
      const context = this.getContext(content, match.index);
      if (!context.includes('--glass-space-') && !context.includes('//') && !context.includes('/*')) {
        violations.push({
          type: VIOLATIONS.RAW_SPACING,
          message: `Raw spacing "${match[0]}" found. Use glass spacing tokens.`,
          line: this.getLineNumber(content, match.index),
          column: this.getColumnNumber(content, match.index),
          suggestion: 'Use glass-p-*, glass-m-*, glass-gap-* classes or --glass-space-* tokens',
        });
      }
    });
    
    // Check for raw border-radius
    const radiusMatches = [...content.matchAll(PATTERNS.borderRadius)];
    radiusMatches.forEach(match => {
      const context = this.getContext(content, match.index);
      if (!context.includes('--glass-radius-') && !context.includes('//') && !context.includes('/*')) {
        violations.push({
          type: VIOLATIONS.INLINE_RADIUS,
          message: `Raw border-radius "${match[0]}" found. Use glass radius tokens.`,
          line: this.getLineNumber(content, match.index),
          column: this.getColumnNumber(content, match.index),
          suggestion: 'Use glass-rounded-* classes or --glass-radius-* tokens',
        });
      }
    });
    
    return violations;
  }
  
  getContext(content, index, contextLength = 50) {
    const start = Math.max(0, index - contextLength);
    const end = Math.min(content.length, index + contextLength);
    return content.substring(start, end);
  }
  
  getLineNumber(content, index) {
    const before = content.substring(0, index);
    return before.split('\n').length;
  }
  
  getColumnNumber(content, index) {
    const before = content.substring(0, index);
    const lines = before.split('\n');
    return lines[lines.length - 1].length + 1;
  }
  
  suggestColorToken(hexColor) {
    const colorMap = {
      '#ffffff': 'glass-surface-white',
      '#fff': 'glass-surface-white',
      '#000000': 'glass-surface-black',
      '#000': 'glass-surface-black',
      '#3b82f6': 'glass-accent-primary',
      '#ef4444': 'glass-accent-danger',
      '#10b981': 'glass-accent-success',
      '#f59e0b': 'glass-accent-warning',
    };
    
    return colorMap[hexColor.toLowerCase()] || 'glass-surface-primary or appropriate glass token';
  }
  
  run(pattern = "src/**/*.{tsx,ts,css}") {
    console.log("🔍 Running AuraGlass Token Linter...\n");
    
    const files = glob.sync(pattern, {
      ignore: ["**/node_modules/**", "**/dist/**", "**/build/**"],
    });
    
    files.forEach(file => {
      this.lintFile(file);
    });
    
    this.report();
  }
  
  report() {
    console.log(`📊 Scanned ${this.fileCount} files\n`);
    
    if (this.violations.length === 0) {
      console.log("✅ No violations found! All files use tokens correctly.\n");
      console.log("🎯 Your design system compliance is perfect!\n");
      process.exit(0);
    }
    
    console.log(`❌ Found ${this.totalViolations} violations in ${this.violations.length} files:\n`);
    
    // Group violations by type for summary
    const violationsByType = {};
    let fileIndex = 1;
    
    this.violations.forEach(({ file, violations }) => {
      console.log(`\n📄 ${fileIndex++}. ${file}`);
      
      violations.forEach(violation => {
        const location = `${violation.line}:${violation.column}`;
        console.log(`   ❌ ${location} - ${violation.message}`);
        if (violation.suggestion) {
          console.log(`      💡 Suggestion: ${violation.suggestion}`);
        }
        
        // Count by type
        violationsByType[violation.type] = (violationsByType[violation.type] || 0) + 1;
      });
    });
    
    // Summary by violation type
    console.log(`\n📈 Summary by violation type:`);
    Object.entries(violationsByType).forEach(([type, count]) => {
      const emoji = this.getViolationEmoji(type);
      console.log(`   ${emoji} ${type}: ${count}`);
    });
    
    console.log(`\n🔧 Quick fixes:`);
    console.log(`   • Raw colors: Use tokens from --glass-color-* or glass-surface-*`);
    console.log(`   • Backdrop filters: Replace with createGlassStyle({ blur: "md" })`);
    console.log(`   • Shadows: Use glass-elev-* classes or --glass-elev-* tokens`);
    console.log(`   • Spacing: Use glass-p-*, glass-m-*, glass-gap-* classes`);
    console.log(`   • Border radius: Use glass-rounded-* or --glass-radius-* tokens`);
    
    console.log(`\n📚 Documentation: Check docs/DESIGN_SYSTEM.md for token reference\n`);
    
    // Set exit code based on severity
    process.exit(1);
  }
  
  getViolationEmoji(type) {
    const emojiMap = {
      [VIOLATIONS.RAW_COLOR]: '🎨',
      [VIOLATIONS.INLINE_BACKDROP]: '🌫️',
      [VIOLATIONS.ANIMATE_PULSE]: '💫',
      [VIOLATIONS.SHADOW_LITERAL]: '🌑',
      [VIOLATIONS.RAW_SPACING]: '📏',
      [VIOLATIONS.INLINE_RADIUS]: '🔘',
    };
    
    return emojiMap[type] || '⚠️';
  }
}

// Run if executed directly
if (require.main === module) {
  const linter = new TokenLinter();
  const pattern = process.argv[2] || "src/**/*.{tsx,ts,css}";
  linter.run(pattern);
}

module.exports = TokenLinter;
