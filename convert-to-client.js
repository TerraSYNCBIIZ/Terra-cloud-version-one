const fs = require('fs');
const path = require('path');

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file imports MainLayout
    if (content.includes('import MainLayout from') || content.includes("import MainLayout from")) {
      // Check if the file already has "use client" directive
      if (!content.trim().startsWith('"use client"') && !content.trim().startsWith("'use client'")) {
        console.log(`Converting ${filePath} to a client component...`);
        
        // Add "use client" directive
        const updatedContent = '"use client";\n\n' + content;
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`✅ Successfully converted ${filePath}`);
      } else {
        console.log(`✓ File ${filePath} is already a client component`);
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
      processFile(entryPath);
    }
  }
}

// Start processing from the app directory
console.log('Starting to convert components that use MainLayout to client components...');
processDirectory(path.join(__dirname, 'app'));
console.log('Conversion process completed.'); 