#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Find all story files recursively
function findStoryFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      findStoryFiles(fullPath, files);
    } else if (stat.isFile() && item.match(/\.stories\.(ts|tsx|js|jsx)$/)) {
      files.push(fullPath);
    }
  }

  return files;
}

// Check if file has implicit actions
function hasImplicitActions(content) {
  const implicitPatterns = [
    /on\w+:\s*\(\.\.\.args\)\s*=>\s*console\.log\('Mock function called',\s*\.\.\.args\)/g,
    /on\w+:\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\}/g,
    /on\w+:\s*\([^)]*\)\s*=>\s*console\.log/g
  ];

  return implicitPatterns.some(pattern => pattern.test(content));
}

// Add fn import if not present
function addFnImport(content) {
  if (content.includes("import { fn } from '@storybook/test'")) {
    return content;
  }

  // Find the first import line and add fn import after it
  const lines = content.split('\n');
  let insertIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import')) {
      insertIndex = i;
    } else if (lines[i].trim() !== '' && !lines[i].trim().startsWith('//') && !lines[i].trim().startsWith('/*')) {
      break;
    }
  }

  if (insertIndex !== -1) {
    lines.splice(insertIndex + 1, 0, "import { fn } from '@storybook/test';");
    return lines.join('\n');
  }

  return content;
}

// Replace implicit actions with fn()
function replaceImplicitActions(content) {
  let result = content;

  // Replace onEvent: (...args) => console.log('Mock function called', ...args)
  result = result.replace(
    /on\w+:\s*\(\.\.\.args\)\s*=>\s*console\.log\('Mock function called',\s*\.\.\.args\)/g,
    (match) => {
      const eventName = match.match(/on\w+:/)[0];
      return `${eventName} fn()`;
    }
  );

  // Replace onEvent: (param) => { console.log('...', param); }
  result = result.replace(
    /on\w+:\s*\([^)]+\)\s*=>\s*\{\s*console\.log\([^}]+;\s*\}/g,
    (match) => {
      const eventName = match.match(/on\w+:/)[0];
      return `${eventName} fn()`;
    }
  );

  // Replace onEvent: (interaction) => { console.log('...', interaction); }
  result = result.replace(
    /on\w+:\s*\([^)]+\)\s*=>\s*\{\s*console\.log\('[^']*',\s*[^)]+\);\s*\}/g,
    (match) => {
      const eventName = match.match(/on\w+:/)[0];
      return `${eventName} fn()`;
    }
  );

  return result;
}

// Process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    if (!hasImplicitActions(content)) {
      return false; // No implicit actions found
    }

    console.log(`Processing: ${filePath}`);

    let updatedContent = content;
    updatedContent = addFnImport(updatedContent);
    updatedContent = replaceImplicitActions(updatedContent);

    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🔍 Finding story files with implicit actions...');

  const files = findStoryFiles('./src');
  console.log(`Found ${files.length} story files`);

  let processedCount = 0;
  let fixedCount = 0;

  for (const file of files) {
    processedCount++;
    const fixed = processFile(file);
    if (fixed) {
      fixedCount++;
    }

    // Progress indicator
    if (processedCount % 10 === 0) {
      console.log(`Progress: ${processedCount}/${files.length} files processed`);
    }
  }

  console.log(`\n🎉 Done!`);
  console.log(`Processed: ${processedCount} files`);
  console.log(`Fixed: ${fixedCount} files`);
}

main();
