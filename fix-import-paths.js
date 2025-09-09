#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Find all TypeScript/TSX files in the components directory
function findFiles(dir, ext) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findFiles(fullPath, ext));
    } else if (item.endsWith(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

// Fix import paths in a file
function fixImportPaths(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Replace the incorrect import path
    const oldImport = "from '@/design-system/utilsCore'";
    const newImport = "from '@/lib/utilsComprehensive'";

    if (content.includes(oldImport)) {
      content = content.replace(new RegExp(oldImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newImport);
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
function main() {
  const componentsDir = path.join(__dirname, 'src', 'components');
  const tsFiles = findFiles(componentsDir, '.ts');
  const tsxFiles = findFiles(componentsDir, '.tsx');

  const allFiles = [...tsFiles, ...tsxFiles];
  let fixedCount = 0;

  console.log(`Found ${allFiles.length} TypeScript files to check...`);

  for (const file of allFiles) {
    if (fixImportPaths(file)) {
      fixedCount++;
    }
  }

  console.log(`\nFixed ${fixedCount} files with incorrect import paths.`);
}

if (require.main === module) {
  main();
}