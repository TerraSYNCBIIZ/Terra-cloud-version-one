const fs = require('node:fs');
const path = require('node:path');

// Function to fix a file
function fixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    let modified = false;
    
    // Add "use client" directive if needed
    if (
      (content.includes('export const') || 
       content.includes('export default function') || 
       content.includes('export function') ||
       content.includes('export default')) && 
      !content.includes('// server-only') && 
      !content.trim().startsWith('"use client"') && 
      !content.trim().startsWith("'use client'")
    ) {
      console.log(`Adding "use client" directive to ${filePath}...`);
      updatedContent = `"use client";\n\n${content}`;
      modified = true;
    }
    
    // Fix React imports if needed
    if (updatedContent.includes('import React, {')) {
      console.log(`Fixing React import in ${filePath}...`);
      
      updatedContent = updatedContent.replace(
        /import React, \{([^}]+)\} from ['"]react['"]/g, 
        (match, types) => `import React from 'react';\nimport type { ${types} } from 'react'`
      );
      
      modified = true;
    }
    
    // Write changes if modified
    if (modified) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Successfully updated ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

// Function to process a directory recursively
function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules and .next directories
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        processDirectory(entryPath);
      }
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx')) {
      // Process .tsx and .jsx files
      fixFile(entryPath);
    }
  }
}

// Start processing from the app directory
console.log('Starting to fix all components...');
processDirectory(path.join(__dirname, 'app'));
console.log('Fix process completed.'); 