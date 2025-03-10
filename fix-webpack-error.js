const fs = require('node:fs');
const path = require('node:path');

// Function to fix imports in a file
function fixImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip files that already have 'use client' directive
    if (content.trim().startsWith('"use client"') || content.trim().startsWith("'use client'")) {
      // Fix the React import if needed
      if (content.includes('import React, {') || content.includes("import React, {")) {
        console.log(`Fixing React import in ${filePath}...`);
        
        // Replace React import to use type imports for React types
        const updatedContent = content
          .replace(/import React, \{([^}]+)\} from ['"]react['"]/g, (match, types) => {
            return `import React from 'react';\nimport type { ${types} } from 'react'`;
          });
        
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`✅ Successfully fixed imports in ${filePath}`);
      }
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
      fixImports(entryPath);
    }
  }
}

// Start processing from the app directory
console.log('Starting to fix component imports...');
processDirectory(path.join(__dirname, 'app'));
console.log('Fix process completed.'); 