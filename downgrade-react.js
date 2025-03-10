const fs = require('node:fs');
const path = require('node:path');

// Read the package.json file
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Downgrade React and related packages
packageJson.dependencies.react = "^18.2.0";
packageJson.dependencies["react-dom"] = "^18.2.0";
packageJson.dependencies.next = "^14.1.0";
packageJson.devDependencies["eslint-config-next"] = "^14.1.0";

// Write the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

console.log('Successfully downgraded React and Next.js to more stable versions.');
console.log('Please run "npm install" to apply the changes.'); 