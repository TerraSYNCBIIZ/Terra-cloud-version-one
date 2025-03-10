const fs = require('node:fs');
const path = require('node:path');

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file contains a React component declaration or export
    if (
      (content.includes('export const') || content.includes('export default function')) && 
      !content.includes('// server-only') && 
      !content.trim().startsWith('"use client"') && 
      !content.trim().startsWith("'use client'")
    ) {
      console.log(`Converting ${filePath} to a client component...`);
      
      // Add "use client" directive
      const updatedContent = `"use client";\n\n${content}`;
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Successfully converted ${filePath}`);
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
    } else if (entry.name.endsWith('.tsx') && entry.name.includes('components/')) {
      // Process .tsx files in components folders
      processFile(entryPath);
    }
  }
}

// Start processing from the components directory
console.log('Starting to convert components to client components...');
processDirectory(path.join(__dirname, 'app'));
console.log('Conversion process completed.'); 