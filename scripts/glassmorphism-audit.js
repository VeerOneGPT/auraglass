#!/usr/bin/env node
/**
 * AURA GLASS - COMPREHENSIVE GLASSMORPHISM AUDIT SCRIPT
 * 
 * This script systematically audits and fixes ALL glassmorphism components
 * to ensure consistent, beautiful, visible glass effects across the entire system.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Define our standards
const GLASS_STANDARDS = {
  MINIMUM_OPACITY: 0.15,
  STANDARD_OPACITY: 0.22,
  STRONG_OPACITY: 0.35,
  REQUIRED_BACKDROP_FILTER: 'backdrop-filter',
  REQUIRED_WEBKIT_BACKDROP_FILTER: '-webkit-backdrop-filter',
  MINIMUM_BLUR: 8, // pixels
  MINIMUM_BORDER_OPACITY: 0.2,
};

// Track issues found
const auditResults = {
  totalFiles: 0,
  filesWithIssues: 0,
  issuesFound: [],
  issuesFixed: [],
  manualReviewNeeded: [],
};

// Define dangerous patterns to find and fix
const DANGEROUS_PATTERNS = [
  // Ultra-low opacity values (1-14%)
  { 
    pattern: /rgba\([\d\s,]+,\s*0\.0[1-9]\)/g,
    description: 'Ultra-low opacity (1-9%)',
    fix: (match) => match.replace(/0\.0[1-9]/, '0.22')
  },
  { 
    pattern: /rgba\([\d\s,]+,\s*0\.1[0-4]\)/g,
    description: 'Low opacity (10-14%)',
    fix: (match) => match.replace(/0\.1[0-4]/, '0.22')
  },
  
  // Dangerous background-color patterns
  {
    pattern: /background-color:\s*rgba\(255,\s*255,\s*255,\s*0\.0[1-9]\)/g,
    description: 'Ultra-low background-color',
    fix: (match) => match.replace(/0\.0[1-9]/, '0.22')
  },
  
  // Missing backdrop filters
  {
    pattern: /backdrop-filter:\s*none/g,
    description: 'Disabled backdrop filter',
    fix: (match) => 'backdrop-filter: blur(16px) saturate(180%) brightness(1.15)'
  },
  
  // Weak blur values
  {
    pattern: /blur\(([1-7])px\)/g,
    description: 'Too weak blur (under 8px)',
    fix: (match) => match.replace(/blur\([1-7]px\)/, 'blur(16px)')
  },
  
  // Dangerous Tailwind classes
  {
    pattern: /bg-white\/[1-9](?!\d)/g,
    description: 'Low-opacity Tailwind background (1-9%)',
    fix: (match) => 'bg-white/22'
  },
  {
    pattern: /bg-white\/1[0-4](?!\d)/g,
    description: 'Low-opacity Tailwind background (10-14%)',
    fix: (match) => 'bg-white/22'
  },
  
  // Border opacity issues
  {
    pattern: /border-white\/[1-9](?!\d)/g,
    description: 'Low-opacity Tailwind border',
    fix: (match) => 'border-white/30'
  },
];

// Component categories for systematic review
const COMPONENT_CATEGORIES = {
  backgrounds: 'src/components/backgrounds/**/*.tsx',
  cards: 'src/components/card/**/*.tsx',
  buttons: 'src/components/button/**/*.tsx',
  inputs: 'src/components/input/**/*.tsx',
  navigation: 'src/components/navigation/**/*.tsx',
  charts: 'src/components/charts/**/*.tsx',
  interactive: 'src/components/interactive/**/*.tsx',
  animations: 'src/components/animations/**/*.tsx',
  surfaces: 'src/components/surfaces/**/*.tsx',
  modals: 'src/components/modal/**/*.tsx',
  templates: 'src/components/templates/**/*.tsx',
  primitives: 'src/primitives/**/*.tsx',
};

/**
 * Audit a single file for glassmorphism issues
 */
function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  const fixes = [];
  let fixedContent = content;

  // Check each dangerous pattern
  DANGEROUS_PATTERNS.forEach((pattern) => {
    const matches = [...content.matchAll(pattern.pattern)];
    
    if (matches.length > 0) {
      matches.forEach((match) => {
        issues.push({
          file: filePath,
          line: content.substring(0, match.index).split('\n').length,
          issue: pattern.description,
          found: match[0],
          fix: pattern.fix(match[0]),
        });

        // Apply the fix
        fixedContent = fixedContent.replace(match[0], pattern.fix(match[0]));
        fixes.push(`${filePath}: ${pattern.description} - ${match[0]} → ${pattern.fix(match[0])}`);
      });
    }
  });

  // Check for missing foundation classes in React components
  if (filePath.includes('.tsx') && !filePath.includes('.stories.')) {
    const hasGlassClasses = /className.*glass-|aura-glass-/.test(content);
    const hasLowOpacity = /rgba\([\d\s,]+,\s*0\.[01]/.test(content);
    const hasBackdropFilter = /backdrop-filter|backdropFilter/.test(content);

    if (hasLowOpacity && !hasGlassClasses) {
      issues.push({
        file: filePath,
        issue: 'Component uses low opacity but no foundation glass classes',
        severity: 'HIGH',
        recommendation: 'Add .glass-foundation-complete class or use createGlassFoundation()',
      });
    }

    if (!hasBackdropFilter && hasLowOpacity) {
      issues.push({
        file: filePath,
        issue: 'Component has glass styling but no backdrop-filter',
        severity: 'CRITICAL',
        recommendation: 'Add backdrop-filter with blur and enhancement filters',
      });
    }
  }

  // Write fixes if any were applied
  if (fixes.length > 0) {
    fs.writeFileSync(filePath, fixedContent);
    console.log(`✅ Fixed ${fixes.length} issues in ${path.relative(process.cwd(), filePath)}`);
    auditResults.issuesFixed.push(...fixes);
  }

  return { issues, fixes, hasIssues: issues.length > 0 };
}

/**
 * Audit Storybook stories for completeness
 */
function auditStorybook(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  // Check for incomplete argTypes
  if (/argTypes:\s*{\s*\/\//.test(content)) {
    issues.push({
      file: filePath,
      issue: 'Storybook story has incomplete argTypes',
      severity: 'MEDIUM',
      recommendation: 'Add proper argTypes for glass properties',
    });
  }

  // Check for incomplete args
  if (/args:\s*{\s*\/\//.test(content)) {
    issues.push({
      file: filePath,
      issue: 'Storybook story has incomplete args',
      severity: 'MEDIUM',
      recommendation: 'Add default args with proper dimensions',
    });
  }

  // Check for missing render wrapper with dimensions
  if (!/render:\s*\(args\)\s*=>\s*\(/.test(content)) {
    issues.push({
      file: filePath,
      issue: 'Story missing custom render function with dimensions',
      severity: 'LOW',
      recommendation: 'Add render function with proper sizing for background components',
    });
  }

  return issues;
}

/**
 * Generate component health report
 */
function generateHealthReport(category, files) {
  console.log(`\n🔍 AUDITING ${category.toUpperCase()} COMPONENTS (${files.length} files)`);
  console.log('='.repeat(60));

  let categoryIssues = 0;
  let categoryFixes = 0;

  files.forEach((file) => {
    auditResults.totalFiles++;
    
    const result = auditFile(file);
    
    if (result.hasIssues) {
      auditResults.filesWithIssues++;
      categoryIssues += result.issues.length;
    }
    
    categoryFixes += result.fixes.length;
    auditResults.issuesFound.push(...result.issues);

    // Audit Storybook stories
    if (file.includes('.stories.')) {
      const storyIssues = auditStorybook(file);
      auditResults.issuesFound.push(...storyIssues);
    }

    // Log file status
    const status = result.hasIssues 
      ? `❌ ${result.issues.length} issues${result.fixes.length > 0 ? ` (${result.fixes.length} fixed)` : ''}`
      : '✅ Clean';
    
    console.log(`  ${path.relative(process.cwd(), file).padEnd(40)} ${status}`);
  });

  console.log(`\n📊 ${category} Summary: ${categoryIssues} issues found, ${categoryFixes} auto-fixed\n`);
}

/**
 * Main audit execution
 */
function executeAudit() {
  console.log('🚀 STARTING COMPREHENSIVE GLASSMORPHISM AUDIT');
  console.log('=' .repeat(80));
  console.log('📋 Scanning for glassmorphism issues in ALL components...\n');

  // Audit each component category
  Object.entries(COMPONENT_CATEGORIES).forEach(([category, pattern]) => {
    const files = glob.sync(pattern);
    generateHealthReport(category, files);
  });

  // Generate final report
  console.log('\n' + '='.repeat(80));
  console.log('📊 FINAL AUDIT REPORT');
  console.log('='.repeat(80));
  console.log(`📁 Total files scanned: ${auditResults.totalFiles}`);
  console.log(`⚠️  Files with issues: ${auditResults.filesWithIssues}`);
  console.log(`🐛 Total issues found: ${auditResults.issuesFound.length}`);
  console.log(`✅ Issues auto-fixed: ${auditResults.issuesFixed.length}`);
  
  // Categorize remaining issues by severity
  const criticalIssues = auditResults.issuesFound.filter(i => i.severity === 'CRITICAL');
  const highIssues = auditResults.issuesFound.filter(i => i.severity === 'HIGH');
  const mediumIssues = auditResults.issuesFound.filter(i => i.severity === 'MEDIUM');

  if (criticalIssues.length > 0) {
    console.log(`\n🚨 CRITICAL ISSUES (${criticalIssues.length}):`);
    criticalIssues.forEach(issue => {
      console.log(`   ${issue.file}: ${issue.issue}`);
      console.log(`   💡 ${issue.recommendation}\n`);
    });
  }

  if (highIssues.length > 0) {
    console.log(`\n🔥 HIGH PRIORITY ISSUES (${highIssues.length}):`);
    highIssues.forEach(issue => {
      console.log(`   ${issue.file}: ${issue.issue}`);
      console.log(`   💡 ${issue.recommendation}\n`);
    });
  }

  if (mediumIssues.length > 0) {
    console.log(`\n⚡ MEDIUM PRIORITY ISSUES (${mediumIssues.length}):`);
    mediumIssues.slice(0, 10).forEach(issue => { // Show first 10
      console.log(`   ${issue.file}: ${issue.issue}`);
    });
    if (mediumIssues.length > 10) {
      console.log(`   ... and ${mediumIssues.length - 10} more`);
    }
  }

  // Save detailed report
  fs.writeFileSync(
    'GLASSMORPHISM_AUDIT_REPORT.json', 
    JSON.stringify(auditResults, null, 2)
  );

  console.log('\n📄 Detailed report saved to: GLASSMORPHISM_AUDIT_REPORT.json');
  console.log('\n🎯 NEXT STEPS:');
  console.log('1. Review critical and high-priority issues above');
  console.log('2. Test fixed components in Storybook');
  console.log('3. Verify all background components are visible');
  console.log('4. Check both Studio and Showcase modes');
  console.log('\n✨ Run `pnpm run storybook` to see the improvements!');
}

/**
 * Verification script for specific component types
 */
function verifyComponentType(componentType, expectedFeatures) {
  console.log(`\n🔍 VERIFYING ${componentType.toUpperCase()} COMPONENTS`);
  console.log('-'.repeat(50));
  
  const files = glob.sync(COMPONENT_CATEGORIES[componentType] || `src/components/${componentType}/**/*.tsx`);
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const missing = [];
    
    expectedFeatures.forEach(feature => {
      if (!new RegExp(feature.pattern).test(content)) {
        missing.push(feature.name);
      }
    });
    
    const status = missing.length === 0 ? '✅' : `❌ Missing: ${missing.join(', ')}`;
    console.log(`  ${path.basename(file).padEnd(35)} ${status}`);
  });
}

// Expected features for different component types
const COMPONENT_EXPECTATIONS = {
  backgrounds: [
    { name: 'Backdrop Filter', pattern: 'backdrop-filter|backdropFilter' },
    { name: 'Minimum Opacity', pattern: 'rgba\\([^)]+, 0\\.[2-9]|rgba\\([^)]+, 0\\.[1][5-9]' },
    { name: 'Proper Dimensions', pattern: 'width|height|minHeight' },
  ],
  cards: [
    { name: 'Glass Foundation', pattern: 'glass-foundation-complete|aura-glass-|createGlassFoundation' },
    { name: 'Backdrop Filter', pattern: 'backdrop-filter|backdropFilter' },
    { name: 'Interactive States', pattern: 'hover:|focus:|disabled' },
  ],
  buttons: [
    { name: 'Glass Foundation', pattern: 'glass-foundation-complete|aura-glass-button|createGlassFoundation' },
    { name: 'Interactive States', pattern: 'hover:|focus:|active:|disabled' },
    { name: 'Accessible Cursor', pattern: 'cursor: pointer|cursor-pointer' },
  ],
};

// Run specific verification if requested
if (process.argv.includes('--verify')) {
  const componentType = process.argv[process.argv.indexOf('--verify') + 1];
  if (COMPONENT_EXPECTATIONS[componentType]) {
    verifyComponentType(componentType, COMPONENT_EXPECTATIONS[componentType]);
  } else {
    console.log('Available component types:', Object.keys(COMPONENT_EXPECTATIONS).join(', '));
  }
  process.exit(0);
}

// Run full audit
executeAudit();


