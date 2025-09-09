#!/usr/bin/env node
/**
 * CRITICAL FIX: Add missing backdrop-filters to glass components
 * 
 * This script specifically targets the 58 glass components missing backdrop-filter
 * and adds the foundation glass effects to ensure proper glassmorphism visibility.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Components that need immediate backdrop-filter fixes
const CRITICAL_COMPONENTS = [
  'src/components/button/GlassButton.tsx',
  'src/components/calendar/GlassCalendar.tsx', 
  'src/components/card/GlassCard.tsx',
  'src/components/charts/GlassAreaChart.tsx',
  'src/components/charts/GlassBarChart.tsx', 
  'src/components/charts/GlassLineChart.tsx',
  'src/components/charts/GlassPieChart.tsx',
  'src/components/charts/ModularGlassDataChart.tsx',
  'src/components/data-display/GlassAccordion.tsx',
  'src/components/data-display/GlassAlert.tsx',
  'src/components/data-display/GlassLoadingSkeleton.tsx',
  'src/components/data-display/GlassProgress.tsx',
  'src/components/input/GlassCheckbox.tsx',
  'src/components/input/GlassDatePicker.tsx',
  'src/components/input/GlassForm.tsx',
  'src/components/input/GlassInput.tsx',
  'src/components/input/GlassLabel.tsx',
  'src/components/input/GlassSelectCompound.tsx',
  'src/components/input/GlassSlider.tsx',
  'src/components/input/GlassSwitch.tsx',
  'src/components/input/GlassTextarea.tsx',
  'src/components/layout/GlassSeparator.tsx',
  'src/components/modal/GlassDialog.tsx',
  'src/components/modal/GlassDrawer.tsx',
  'src/components/modal/GlassHoverCard.tsx',
  'src/components/modal/GlassPopover.tsx',
  'src/components/navigation/GlassDropdownMenu.tsx',
  'src/components/navigation/GlassNavigation.tsx',
  'src/components/navigation/GlassTabBar.tsx',
  'src/components/navigation/GlassTabs.tsx',
];

/**
 * Fix missing backdrop-filter in a component
 */
function fixBackdropFilter(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = false;

  // Strategy 1: Add glass-foundation-complete class if component uses className
  if (content.includes('className={cn(') && !content.includes('glass-foundation-complete')) {
    const classNameMatches = [...content.matchAll(/className=\{cn\(\s*(['"`][^'"`]*['"`])/g)];
    
    classNameMatches.forEach(match => {
      const oldClassName = match[1];
      const newClassName = oldClassName.replace(/^['"`]/, '').replace(/['"`]$/, '');
      const enhancedClassName = `'glass-foundation-complete ${newClassName}'`;
      
      content = content.replace(
        `className={cn(${oldClassName}`,
        `className={cn(${enhancedClassName}`
      );
      fixed = true;
    });
  }

  // Strategy 2: Add backdrop-filter directly to styled-components
  if (content.includes('styled.') && content.includes('background:') && !content.includes('backdrop-filter:')) {
    // Find styled component definitions and add backdrop-filter
    const styledMatches = [...content.matchAll(/(const\s+\w+\s*=\s*styled\.\w+`[\s\S]*?background:\s*[^;]+;)/g)];
    
    styledMatches.forEach(match => {
      const styledBlock = match[1];
      if (!styledBlock.includes('backdrop-filter:')) {
        const enhanced = styledBlock.replace(
          /(background:\s*[^;]+;)/,
          `$1\n  backdrop-filter: blur(16px) saturate(180%) brightness(1.15) contrast(1.08);\n  -webkit-backdrop-filter: blur(16px) saturate(180%) brightness(1.15) contrast(1.08);`
        );
        content = content.replace(styledBlock, enhanced);
        fixed = true;
      }
    });
  }

  // Strategy 3: Add foundation import and injection for styled-components
  if (content.includes('styled-components') && !content.includes('injectGlassFoundation')) {
    // Add import
    if (!content.includes('import { injectGlassFoundation }')) {
      content = content.replace(
        /import.*from 'styled-components';/,
        `$&\nimport { injectGlassFoundation } from '@/core/foundation/glassFoundation';`
      );
    }
    
    // Inject foundation into main container
    const containerMatches = [...content.matchAll(/(const\s+\w*Container\w*\s*=\s*styled\.\w+`[\s\S]*?position:\s*relative;)/g)];
    containerMatches.forEach(match => {
      const containerBlock = match[1];
      const enhanced = containerBlock.replace(
        'position: relative;',
        `/* FOUNDATION: Apply glass foundation */\n  \${injectGlassFoundation('standard', 'standard')}\n  \n  position: relative;`
      );
      content = content.replace(containerBlock, enhanced);
      fixed = true;
    });
  }

  if (fixed) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed backdrop-filter in ${path.basename(filePath)}`);
    return true;
  }

  console.log(`⚠️  Could not auto-fix ${path.basename(filePath)} - needs manual review`);
  return false;
}

/**
 * Main execution
 */
function executeBackdropFilterFixes() {
  console.log('🚨 FIXING CRITICAL BACKDROP-FILTER ISSUES');
  console.log('='.repeat(60));
  
  let fixedCount = 0;
  let skippedCount = 0;
  
  CRITICAL_COMPONENTS.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      const wasFixed = fixBackdropFilter(filePath);
      if (wasFixed) {
        fixedCount++;
      } else {
        skippedCount++;
      }
    } else {
      console.log(`❌ File not found: ${filePath}`);
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 BACKDROP-FILTER FIX RESULTS');
  console.log('='.repeat(60));
  console.log(`✅ Components fixed: ${fixedCount}`);
  console.log(`⚠️  Components needing manual review: ${skippedCount}`);
  console.log(`\n🎯 Next: Test components in Storybook to verify glass effects are now visible!`);
}

executeBackdropFilterFixes();


