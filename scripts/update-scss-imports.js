#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Function to recursively find all SCSS files
async function findScssFiles(dir) {
    const files = await readdir(dir);
    const scssFiles = [];

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await stat(filePath);

        if (stats.isDirectory()) {
            const nestedFiles = await findScssFiles(filePath);
            scssFiles.push(...nestedFiles);
        } else if (file.endsWith('.scss') || file.endsWith('.module.scss')) {
            scssFiles.push(filePath);
        }
    }

    return scssFiles;
}

// Function to update SCSS imports
async function updateScssImports(filePath) {
    try {
        const content = await readFile(filePath, 'utf8');

        // Check if the file contains @import statements for mixins or tokens
        const hasImportMixins = content.includes('@import "src/styles/mixins.scss"');
        const hasImportTokens = content.includes('@import "src/styles/tokens.scss"');

        if (!hasImportMixins && !hasImportTokens) {
            return false; // No changes needed
        }

        // Replace @import with @use
        let updatedContent = content;

        if (hasImportMixins) {
            updatedContent = updatedContent.replace(
                '@import "src/styles/mixins.scss";',
                '@use "src/styles/mixins" as *;'
            );
        }

        if (hasImportTokens) {
            updatedContent = updatedContent.replace(
                '@import "src/styles/tokens.scss";',
                '@use "src/styles/tokens" as *;'
            );
        }

        // If both imports are present, they might be on the same line
        updatedContent = updatedContent.replace(
            '@import "src/styles/mixins.scss"; @import "src/styles/tokens.scss";',
            '@use "src/styles/mixins" as *;\n@use "src/styles/tokens" as *;'
        );

        // Write the updated content back to the file
        await writeFile(filePath, updatedContent, 'utf8');
        console.log(`Updated: ${filePath}`);
        return true;
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error);
        return false;
    }
}

// Main function
async function main() {
    try {
        const uiSystemDir = path.resolve(__dirname, '../packages/ui-system');
        const scssFiles = await findScssFiles(uiSystemDir);

        console.log(`Found ${scssFiles.length} SCSS files to check.`);

        let updatedCount = 0;
        for (const file of scssFiles) {
            const updated = await updateScssImports(file);
            if (updated) {
                updatedCount++;
            }
        }

        console.log(`Updated ${updatedCount} files.`);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main(); 