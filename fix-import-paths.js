#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixImportPathsInDirectory(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        
        if (file.isDirectory()) {
            fixImportPathsInDirectory(fullPath);
        } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                
                // Fix the specific import path issue: ../../../core/mixins/glassMixins -> ../../core/mixins/glassMixins
                const newContent = content.replace(
                    /from ['"]\.\.\/\.\.\/\.\.\/core\/mixins\/glassMixins['"];/g,
                    "from '../../core/mixins/glassMixins';"
                );
                
                if (content !== newContent) {
                    fs.writeFileSync(fullPath, newContent, 'utf8');
                    console.log(`Fixed import path in: ${fullPath}`);
                }
            } catch (error) {
                console.error(`Error processing ${fullPath}:`, error.message);
            }
        }
    }
}

console.log('Fixing import paths for createGlassStyle...');
fixImportPathsInDirectory('/Users/gurbakshchahal/AuraGlass/src/components');
console.log('Done fixing import paths!');