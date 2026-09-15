const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/:root\{/, ':root{\n  --workspace-sidebar: 240px;');

fs.writeFileSync('styles.css', css);
console.log('Sidebar variable patched');
