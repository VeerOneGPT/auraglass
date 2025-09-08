const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// List of files with errors from the logs
const errorFiles = [
  'src/components/data-display/Typography.stories.tsx',
  'src/components/icons/ClearIcon.stories.tsx',
  'src/components/image-list/ImageList.stories.tsx',
  'src/components/image-list/ImageListItem.stories.tsx',
  'src/components/image-list/ImageListItemBar.stories.tsx',
  'src/components/input/GlassForm.stories.tsx',
  'src/components/input/GlassSelectCompound.stories.tsx',
  'src/components/interactive/ContextAwareGlass.stories.tsx',
  'src/components/interactive/GlassA11yAuditor.stories.tsx',
  'src/components/interactive/GlassCarousel.stories.tsx',
  'src/components/interactive/GlassInfiniteScroll.stories.tsx',
  'src/components/interactive/GlassPresets.stories.tsx',
  'src/components/interactive/GlassThemeDemo.stories.tsx',
  'src/components/interactive/ThemedGlassComponents.stories.tsx',
  'src/components/layout/Box.stories.tsx',
  'src/components/layout/GlassAppShell.stories.tsx',
  'src/components/layout/GlassBox.stories.tsx',
  'src/components/layout/GlassContainer.stories.tsx',
  'src/components/layout/GlassFlex.stories.tsx',
  'src/components/layout/GlassGrid.stories.tsx',
  'src/components/layout/GlassMasonry.stories.tsx',
  'src/components/layout/GlassScrollArea.stories.tsx',
  'src/components/layout/GlassSeparator.stories.tsx',
  'src/components/layout/GlassStack.stories.tsx',
  'src/components/layout/HStack.stories.tsx',
  'src/components/layout/OptimizedGlassContainer.stories.tsx',
  'src/components/layout/VStack.stories.tsx',
  'src/components/modal/GlassBottomSheet.stories.tsx',
  'src/components/modal/GlassDialog.stories.tsx',
  'src/components/modal/GlassDrawer.stories.tsx',
  'src/components/modal/GlassModal.stories.tsx',
  'src/components/navigation/GlassBottomNav.stories.tsx',
  'src/components/navigation/GlassBreadcrumb.stories.tsx',
  'src/components/navigation/GlassCommandBar.stories.tsx',
  'src/components/navigation/GlassContextMenu.stories.tsx',
  'src/components/navigation/GlassDropdownMenu.stories.tsx',
  'src/components/navigation/GlassHeader.stories.tsx',
  'src/components/navigation/GlassMobileNav.stories.tsx',
  'src/components/navigation/GlassResponsiveNav.stories.tsx',
  'src/components/navigation/GlassTabs.stories.tsx',
  'src/components/navigation/GlassToolbar.stories.tsx',
  'src/components/navigation/components/CollapsedMenu.stories.tsx',
  'src/components/navigation/components/ScrollButtons.stories.tsx',
  'src/components/navigation/components/TabItem.stories.tsx',
  'src/components/speed-dial/SpeedDialAction.stories.tsx',
  'src/components/speed-dial/SpeedDialIcon.stories.tsx',
  'src/components/surfaces/DimensionalGlass.stories.tsx',
  'src/components/surfaces/FrostedGlass.stories.tsx',
  'src/components/surfaces/HeatGlass.stories.tsx',
  'src/components/surfaces/PageGlassContainer.stories.tsx',
  'src/components/surfaces/WidgetGlass.stories.tsx',
  'src/components/templates/dashboard/GlassDashboard.stories.tsx',
  'src/components/templates/dashboard/widgets/ChartWidget.stories.tsx',
  'src/components/templates/dashboard/widgets/MetricWidget.stories.tsx',
  'src/components/templates/dashboard/widgets/TableWidget.stories.tsx',
  'src/components/templates/detail/GlassDetailView.stories.tsx',
  'src/components/templates/forms/GlassFormTemplate.stories.tsx',
  'src/components/templates/forms/GlassFormWizardSteps.stories.tsx',
  'src/components/templates/forms/GlassWizardTemplate.stories.tsx',
  'src/components/templates/list/GlassListView.stories.tsx',
  'src/components/tree-view/TreeView.stories.tsx',
  'src/components/ui-components/GlassAccordionUI.stories.tsx',
  'src/components/ui-components/GlassCheckboxUI.stories.tsx',
  'src/components/visual-feedback/FocusIndicator.stories.tsx',
  'src/components/visual-feedback/RippleButton.stories.tsx',
  'src/components/visual-feedback/StateIndicator.stories.tsx',
  'src/components/visual-feedback/VisualFeedback.stories.tsx',
  'src/components/website-components/GlassChartsDemo.stories.tsx',
  'src/components/website-components/GlassPrismComparison.stories.tsx',
  'src/components/website-components/GlassWipeSliderExamples.stories.tsx',
  'src/lib/GlassLocalizationProvider.stories.tsx',
  'src/primitives/focus/FocusTrap.stories.tsx',
  'src/primitives/focus/ScreenReader.stories.tsx',
  'src/primitives/focus/SkipLinks.stories.tsx',
  'src/primitives/motion/ReducedMotionProvider.stories.tsx',
  'src/components/charts/GlassBarChart.stories.tsx',
  'src/components/charts/GlassChart.stories.tsx',
  'src/components/charts/GlassDataChart.stories.tsx',
  'src/components/charts/GlassLineChart.stories.tsx',
  'src/components/charts/GlassPieChart.stories.tsx',
  'src/components/charts/ModularGlassDataChart.stories.tsx',
  'src/components/charts/components/AtmosphericEffects.stories.tsx',
  'src/components/input/GlassDatePicker.tsx',
  'src/components/interactive/GlassFocusRing.tsx',
  'src/components/surfaces/FrostedGlass.tsx',
  'src/components/surfaces/HeatGlass.tsx',
  'src/components/templates/dashboard/GlassDashboard.tsx',
  'src/components/templates/dashboard/widgets/ChartWidget.tsx',
  'src/components/templates/dashboard/widgets/MetricWidget.tsx',
  'src/components/templates/dashboard/widgets/TableWidget.tsx',
  'src/components/templates/list/GlassListView.tsx',
  'src/components/toggle-button/ToggleButtonGroup.stories.tsx',
  'src/components/tree-view/TreeItem.tsx',
  'src/components/tree-view/TreeView.tsx',
  'src/components/website-components/MotionAwareGlass.tsx',
  'src/hooks/extended/useGlassFocus.ts'
];

function fixStoryFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Skip if file already contains proper args without children/className/disabled
    if (!content.includes('children:') && !content.includes('className:') && !content.includes('disabled:')) {
      console.log(`Skipping ${filePath} - appears already fixed`);
      return;
    }

    // Basic fixes for common issues
    let fixedContent = content;

    // Remove children from argTypes and args
    fixedContent = fixedContent.replace(/,\s*children:\s*{\s*control:\s*['"]text['"],\s*description:\s*['"]children prop['"],?\s*}/g, '');
    fixedContent = fixedContent.replace(/,\s*children:\s*['"][^'"]*['"]/g, '');
    fixedContent = fixedContent.replace(/children:\s*\([^)]*\),?/g, '');
    fixedContent = fixedContent.replace(/children:\s*null,?\??/g, '');

    // Remove disabled from argTypes and args if it doesn't belong
    fixedContent = fixedContent.replace(/,\s*disabled:\s*{\s*control:\s*['"]boolean['"],\s*description:\s*['"]disabled prop['"],?\s*}/g, '');
    fixedContent = fixedContent.replace(/,\s*disabled:\s*(?:true|false),?/g, '');

    // Remove className from argTypes and args if component doesn't support it
    // This is trickier - we'll be conservative and only remove if it's clearly wrong

    // Fix implicit any types in render functions
    fixedContent = fixedContent.replace(/render:\s*\((args)\)\s*=>/g, 'render: (args: any) =>');

    // Remove empty lines that might be left behind
    fixedContent = fixedContent.replace(/\n\s*\n\s*\n/g, '\n\n');

    if (fixedContent !== content) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`Fixed ${filePath}`);
    } else {
      console.log(`No changes needed for ${filePath}`);
    }

  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
}

// Process all files
console.log('Starting to fix story files...');
errorFiles.forEach(fixStoryFile);
console.log('Finished fixing story files.');
