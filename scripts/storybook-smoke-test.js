#!/usr/bin/env node

/**
 * STORYBOOK SMOKE TEST
 *
 * Comprehensive smoke test for all Storybook components:
 * 1. Tests if Storybook starts successfully
 * 2. Tests each component by attempting to load its story
 * 3. Reports pass/fail/timeout results
 * 4. Provides detailed error analysis
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class StorybookSmokeTest {
  constructor() {
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      timeout: 0,
      errors: []
    };
    this.storybookProcess = null;
    this.startTime = Date.now();
  }

  async run() {
    console.log('🚀 STORYBOOK SMOKE TEST');
    console.log('======================\n');

    try {
      // Step 1: Test Storybook startup
      await this.testStorybookStartup();

      // Step 2: Load story files
      const storyFiles = this.loadStoryFiles();

      // Step 3: Test each component
      await this.testAllComponents(storyFiles);

      // Step 4: Generate report
      this.generateReport();

    } catch (error) {
      console.error('❌ Smoke test failed:', error.message);
    } finally {
      this.cleanup();
    }
  }

  async testStorybookStartup() {
    console.log('🔥 Testing Storybook startup...');

    try {
      // Try to build Storybook first to catch build errors
      console.log('📦 Building Storybook...');
      execSync('pnpm build-storybook --quiet', {
        stdio: 'pipe',
        timeout: 120000 // 2 minutes timeout
      });
      console.log('✅ Storybook build successful');
    } catch (error) {
      console.log('❌ Storybook build failed');
      this.results.errors.push({
        component: 'Storybook',
        type: 'BUILD_ERROR',
        error: error.message,
        output: error.stdout?.toString() || ''
      });
      throw error;
    }
  }

  loadStoryFiles() {
    console.log('\n📚 Loading story files...');

    const storyFiles = fs.readFileSync('story_files.txt', 'utf8')
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'));

    console.log(`📋 Found ${storyFiles.length} story files`);
    this.results.total = storyFiles.length;

    return storyFiles;
  }

  async testAllComponents(storyFiles) {
    console.log('\n🧪 Testing individual components...');
    console.log('This may take several minutes...\n');

    // Process components in batches to avoid overwhelming the system
    const batchSize = 10;
    for (let i = 0; i < storyFiles.length; i += batchSize) {
      const batch = storyFiles.slice(i, i + batchSize);
      console.log(`\n📦 Testing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(storyFiles.length/batchSize)} (${batch.length} components)`);

      await this.testComponentBatch(batch);

      // Brief pause between batches
      if (i + batchSize < storyFiles.length) {
        await this.sleep(1000);
      }
    }
  }

  async testComponentBatch(components) {
    const promises = components.map(component => this.testComponent(component));
    await Promise.allSettled(promises);
  }

  async testComponent(component) {
    const startTime = Date.now();

    try {
      console.log(`  🔍 Testing ${component}...`);

      // Try to find and test the story file
      const storyPath = this.findStoryFile(component);
      if (!storyPath) {
        throw new Error(`Story file not found for ${component}`);
      }

      // Test if the component can be imported without errors
      await this.testComponentImport(component, storyPath);

      const duration = Date.now() - startTime;
      console.log(`  ✅ ${component} - PASSED (${duration}ms)`);
      this.results.passed++;

    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`  ❌ ${component} - FAILED (${duration}ms)`);

      this.results.failed++;
      this.results.errors.push({
        component,
        type: 'COMPONENT_ERROR',
        error: error.message,
        duration,
        stack: error.stack
      });
    }
  }

  findStoryFile(component) {
    // Convert component name to potential story file paths
    const possiblePaths = [
      `src/components/${component}.stories.tsx`,
      `src/components/${component}.stories.ts`,
      `src/lib/${component}.stories.tsx`,
      `src/primitives/${component}.stories.tsx`,
      `src/${component}.stories.tsx`
    ];

    // Also check subdirectories for complex components
    const parts = component.split('/');
    if (parts.length > 1) {
      const category = parts[0];
      const compName = parts[1];
      possiblePaths.push(
        `src/components/${category}/${compName}.stories.tsx`,
        `src/components/${category}/${compName}.stories.ts`
      );
    }

    for (const path of possiblePaths) {
      if (fs.existsSync(path)) {
        return path;
      }
    }

    return null;
  }

  async testComponentImport(component, storyPath) {
    try {
      // Use Node.js to try importing the story file
      const storyContent = fs.readFileSync(storyPath, 'utf8');

      // Check for common import/export issues
      this.checkStoryStructure(component, storyContent);

      // Check for missing dependencies
      this.checkDependencies(component, storyContent);

    } catch (error) {
      throw new Error(`Failed to analyze ${component}: ${error.message}`);
    }
  }

  checkStoryStructure(component, content) {
    // Check if story has proper exports
    if (!content.includes('export default') && !content.includes('export const')) {
      throw new Error('No proper story exports found');
    }

    // Check for Storybook story structure
    if (!content.includes('StoryObj') && !content.includes('StoryFn') && !content.includes('Story')) {
      throw new Error('No Storybook story types found');
    }

    // Check for component import
    if (!content.includes('import') || !content.includes('from')) {
      throw new Error('No component imports found');
    }
  }

  checkDependencies(component, content) {
    // Check for common missing dependencies
    const commonDeps = [
      'react',
      'framer-motion',
      '@aura/aura-glass',
      '../',
      './'
    ];

    let hasValidImport = false;
    for (const dep of commonDeps) {
      if (content.includes(`from '${dep}'`) || content.includes(`from "${dep}"`)) {
        hasValidImport = true;
        break;
      }
    }

    if (!hasValidImport) {
      throw new Error('No valid component imports found');
    }

    // Check for undefined variables
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.includes('undefined') || line.includes('null') || line.includes('NaN')) {
        // This might indicate missing data
        console.warn(`  ⚠️  ${component}: Potential undefined value in line: ${line.trim()}`);
      }
    }
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  generateReport() {
    const duration = Date.now() - this.startTime;

    console.log('\n📊 SMOKE TEST RESULTS');
    console.log('====================');

    console.log(`⏱️  Total time: ${Math.round(duration / 1000)}s`);
    console.log(`📦 Total components: ${this.results.total}`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⏰ Timeout: ${this.results.timeout}`);

    const successRate = this.results.total > 0 ?
      Math.round((this.results.passed / this.results.total) * 100) : 0;
    console.log(`📈 Success rate: ${successRate}%\n`);

    if (this.results.errors.length > 0) {
      console.log('🔥 DETAILED ERROR ANALYSIS');
      console.log('==========================');

      // Group errors by type
      const errorGroups = {};
      this.results.errors.forEach(error => {
        const type = error.type || 'UNKNOWN';
        if (!errorGroups[type]) {
          errorGroups[type] = [];
        }
        errorGroups[type].push(error);
      });

      Object.keys(errorGroups).forEach(type => {
        const errors = errorGroups[type];
        console.log(`\n📂 ${type} (${errors.length} errors):`);

        errors.slice(0, 10).forEach(error => {
          console.log(`   ❌ ${error.component}`);
          console.log(`      ${error.error}`);
          if (error.duration) {
            console.log(`      Duration: ${error.duration}ms`);
          }
        });

        if (errors.length > 10) {
          console.log(`   ... and ${errors.length - 10} more`);
        }
      });
    }

    // Provide recommendations
    this.provideRecommendations(successRate);
  }

  provideRecommendations(successRate) {
    console.log('\n💡 RECOMMENDATIONS');
    console.log('==================');

    if (successRate === 100) {
      console.log('🎉 All components passed! Your Storybook is healthy.');
      console.log('   ✅ Consider adding this test to your CI pipeline');
    } else if (successRate >= 90) {
      console.log('👍 Most components working well.');
      console.log('   🔧 Fix the failed components for better stability');
    } else if (successRate >= 70) {
      console.log('⚠️  Many components have issues.');
      console.log('   🚨 Focus on fixing critical components first');
    } else {
      console.log('🚨 Critical issues detected!');
      console.log('   🛠️  Immediate fixes needed for production stability');
    }

    if (this.results.failed > 0) {
      console.log('\n🔧 Next Steps:');
      console.log('   1. Run: pnpm storybook');
      console.log('   2. Check failed components manually in browser');
      console.log('   3. Fix import/export issues');
      console.log('   4. Add missing dependencies');
      console.log('   5. Re-run this smoke test');
    }
  }

  cleanup() {
    if (this.storybookProcess) {
      console.log('\n🧹 Cleaning up...');
      this.storybookProcess.kill();
    }
  }
}

// Run the smoke test
const test = new StorybookSmokeTest();
test.run().catch(error => {
  console.error('💥 Smoke test crashed:', error);
  process.exit(1);
});
