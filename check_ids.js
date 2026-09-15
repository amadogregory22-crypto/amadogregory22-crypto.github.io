const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');

const idRegex = /\$\(["']([^"']+)["']\)/g;
let match;
const missing = [];
while ((match = idRegex.exec(js)) !== null) {
  const id = match[1];
  if (!html.includes(`id="${id}"`) && !html.includes(`id='${id}'`)) {
    missing.push(id);
  }
}
console.log('Missing IDs:', missing.filter((v, i, a) => a.indexOf(v) === i));
