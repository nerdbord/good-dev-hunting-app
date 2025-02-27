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
        const hasImportMixins = content.includes('@import "src/styles/mixins.scss"') ||
            content.includes('@import "src/styles/mixins"') ||
            content.includes('@import "../styles/mixins.scss"') ||
            content.includes('@import "../styles/mixins"') ||
            content.includes('@import "./styles/mixins.scss"') ||
            content.includes('@import "./styles/mixins"');

        const hasImportTokens = content.includes('@import "src/styles/tokens.scss"') ||
            content.includes('@import "src/styles/tokens"') ||
            content.includes('@import "../styles/tokens.scss"') ||
            content.includes('@import "../styles/tokens"') ||
            content.includes('@import "./styles/tokens.scss"') ||
            content.includes('@import "./styles/tokens"');

        if (!hasImportMixins && !hasImportTokens) {
            return false; // No changes needed
        }

        // Replace @import with @use
        let updatedContent = content;

        // Handle different import paths
        const importPaths = [
            '@import "src/styles/mixins.scss";',
            '@import "src/styles/mixins";',
            '@import "../styles/mixins.scss";',
            '@import "../styles/mixins";',
            '@import "./styles/mixins.scss";',
            '@import "./styles/mixins";'
        ];

        const tokenImportPaths = [
            '@import "src/styles/tokens.scss";',
            '@import "src/styles/tokens";',
            '@import "../styles/tokens.scss";',
            '@import "../styles/tokens";',
            '@import "./styles/tokens.scss";',
            '@import "./styles/tokens";'
        ];

        // Replace mixins imports
        for (const importPath of importPaths) {
            if (updatedContent.includes(importPath)) {
                const usePath = importPath.replace('@import', '@use').replace(';', ' as *;');
                updatedContent = updatedContent.replace(importPath, usePath);
            }
        }

        // Replace tokens imports
        for (const importPath of tokenImportPaths) {
            if (updatedContent.includes(importPath)) {
                const usePath = importPath.replace('@import', '@use').replace(';', ' as *;');
                updatedContent = updatedContent.replace(importPath, usePath);
            }
        }

        // Handle combined imports on the same line
        const combinedImportPatterns = [
            '@import "src/styles/mixins.scss"; @import "src/styles/tokens.scss";',
            '@import "src/styles/mixins"; @import "src/styles/tokens";',
            '@import "../styles/mixins.scss"; @import "../styles/tokens.scss";',
            '@import "../styles/mixins"; @import "../styles/tokens";',
            '@import "./styles/mixins.scss"; @import "./styles/tokens.scss";',
            '@import "./styles/mixins"; @import "./styles/tokens";'
        ];

        for (const pattern of combinedImportPatterns) {
            if (updatedContent.includes(pattern)) {
                const replacement = pattern
                    .replace('@import', '@use')
                    .replace(';', ' as *;')
                    .replace('@import', '@use')
                    .replace(';', ' as *;');
                updatedContent = updatedContent.replace(pattern, replacement);
            }
        }

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
        const platformAppDir = path.resolve(__dirname, '../apps/platform-app');
        const scssFiles = await findScssFiles(platformAppDir);

        console.log(`Found ${scssFiles.length} SCSS files to check in platform-app.`);

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