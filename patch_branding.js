const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('Signature Studio v21', 'Atelier Signature');
html = html.replace('Signature Studio v', 'Atelier Signature v');
fs.writeFileSync('index.html', html);

let app = fs.readFileSync('app.js', 'utf8');
app = app.replace(/Signature Studio/g, 'Atelier Signature');
fs.writeFileSync('app.js', app);

let sw = fs.readFileSync('sw.js', 'utf8');
sw = sw.replace(/Signature Studio/g, 'Atelier Signature');
fs.writeFileSync('sw.js', sw);

console.log('Patched branding across files.');
