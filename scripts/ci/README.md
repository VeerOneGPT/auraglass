# AuraGlass CI Scripts

This directory contains automated enforcement tools for maintaining design system compliance and ensuring a 100/100 design system score.

## 🎯 Overview

These scripts enforce token-first styling, accessibility rules, and glassmorphism patterns to prevent design system violations.

## 📁 Scripts

### 🎨 `token-lint.js`
**Purpose**: Validates token usage and flags raw values that should use design tokens.

**Detects:**
- Raw hex colors (`#ffffff` → `glass-surface-white`)
- Raw RGB/RGBA colors (`rgba(255,255,255,0.5)` → `glass-surface-primary`)
- Raw HSL colors (`hsl(200,100%,50%)` → `glass-accent-primary`)
- Inline backdrop filters (`backdrop-filter: blur(8px)` → `createGlassStyle()`)
- Raw box-shadow values (`0 4px 16px rgba(0,0,0,0.16)` → `glass-elev-2`)
- Raw spacing values (`padding: 16px` → `glass-p-4`)
- Raw border-radius (`border-radius: 12px` → `glass-rounded-md`)
- Tailwind's `animate-pulse` (`animate-pulse` → `glass-animate-pulse`)

**Usage:**
```bash
node token-lint.js                    # Check src directory
node token-lint.js "**/*.tsx"         # Custom glob pattern
npm run lint:tokens                   # Via npm script
```

### 🔍 `style-audit.js`
**Purpose**: Validates glassmorphism implementation patterns and accessibility compliance.

**Checks:**
- Interactive elements have `glass-focus` utility for accessibility
- Glass surfaces include `glass-contrast-guard` for readability
- Touch targets meet minimum size requirements (44px)
- Motion classes respect `prefers-reduced-motion` preference
- Proper `glass-` class prefixes for consistent naming

**Usage:**
```bash
node style-audit.js                   # Check src directory
node style-audit.js "**/*.tsx"        # Custom glob pattern
npm run lint:styles                   # Via npm script
```

## 🚀 Integration Points

Both scripts are integrated into multiple layers:

### 1. Pre-commit Hooks
```bash
# Runs automatically on git commit
git commit -m "feat: add new component"
```

### 2. GitHub Actions
```yaml
# .github/workflows/design-system-compliance.yml
- name: Run Token Linter
  run: npm run lint:tokens
  
- name: Run Style Audit  
  run: npm run lint:styles
```

### 3. VSCode Tasks
- `Ctrl+Shift+P` → "Tasks: Run Task" → "Check Design System Compliance"

### 4. NPM Scripts
```json
{
  "scripts": {
    "lint:tokens": "node scripts/ci/token-lint.js",
    "lint:styles": "node scripts/ci/style-audit.js",
    "glass:full-check": "npm run typecheck && npm run lint:check && npm run lint:tokens && npm run lint:styles && npm run glass:validate && npm run test:glass-contrast"
  }
}
```

## 📊 Exit Codes & Output

**Exit Codes:**
- `0`: No violations found ✅
- `1`: Violations detected ❌

**Output Format:**
```bash
🔍 Running AuraGlass Token Linter...

📊 Scanned 45 files

❌ Found 3 violations in 2 files:

📄 1. src/components/BadComponent.tsx
   ❌ 12:5 - Raw hex color "#ffffff" found. Use glass color tokens instead.
      💡 Suggestion: glass-surface-white
   ❌ 15:23 - Inline backdrop-filter found. Use createGlassStyle() instead.
      💡 Suggestion: Use createGlassStyle({ blur: "md" })

📈 Summary by violation type:
   🎨 raw-color: 1
   🌫️ inline-backdrop: 1

🔧 Quick fixes:
   • Raw colors: Use tokens from --glass-color-* or glass-surface-*
   • Backdrop filters: Replace with createGlassStyle({ blur: "md" })
```

## ⚙️ Configuration

### Customize Patterns
Edit violation patterns in the scripts:

```javascript
// token-lint.js
const PATTERNS = {
  hexColor: /#[0-9a-fA-F]{3,8}/g,
  customPattern: /your-regex/g  // Add custom patterns
};

// style-audit.js  
const CHECKS = {
  CUSTOM_CHECK: 'custom-check'  // Add custom checks
};
```

### Adjust Suggestions
Modify the suggestion mappings:

```javascript
// token-lint.js
suggestColorToken(hexColor) {
  const colorMap = {
    '#ffffff': 'glass-surface-white',
    '#your-color': 'glass-surface-custom'  // Add mappings
  };
  return colorMap[hexColor.toLowerCase()] || 'appropriate glass token';
}
```

## 🎯 Best Practices

### Token Usage
```typescript
// ❌ Bad - Raw values
const style = {
  backgroundColor: '#ffffff',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
  padding: '16px'
};

// ✅ Good - Using tokens
const style = createGlassStyle({ 
  intent: 'neutral', 
  elevation: 'level2',
  blur: 'md' 
});
// Or
<div className="glass-surface-white glass-elev-2 glass-blur-md glass-p-4">
```

### Accessibility
```typescript
// ❌ Bad - Missing focus utilities
<button onClick={handleClick}>Click me</button>

// ✅ Good - Proper accessibility
<button 
  onClick={handleClick}
  className="glass-focus glass-touch-target"
>
  Click me
</button>
```

## 🔄 Troubleshooting

### Common Issues

1. **File not found**: Ensure the script is run from the project root
2. **Pattern not matching**: Check your glob pattern syntax
3. **False positives**: Add exceptions for CSS custom properties and comments
4. **Performance**: Use specific patterns instead of scanning all files

### Debug Mode
Add debug logging to scripts for troubleshooting:

```javascript
const DEBUG = process.env.DEBUG === 'true';
if (DEBUG) console.log('Processing file:', filePath);
```

## 📚 Related Documentation

- [Design System Enforcement Guide](../../docs/DESIGN_SYSTEM_ENFORCEMENT.md)
- [Glass Tokens Reference](../../docs/GLASS_TOKENS.md)
- [Contributing Guidelines](../../CONTRIBUTING.md)

---

**Goal: Maintain 100/100 design system compliance!** 🏆
