const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">\n`;

html = html.replace('<title>Signature Studio v34</title>', '<title>Atelier Signature</title>');
html = html.replace('<link rel="stylesheet" href="./tailwind.css?v=91">', fonts + '  <link rel="stylesheet" href="./tailwind.css?v=91">');
html = html.replace('<h1>Signature</h1>', '<h1>Atelier Signature</h1>');
html = html.replace('<meta name="theme-color" content="#273540">', '<meta name="theme-color" content="#0F2F26">');

fs.writeFileSync('index.html', html);
console.log('Patched index.html');
