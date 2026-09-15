const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.sidebar\{\n  background:var\(--navy\);/, '.sidebar{\n  background:var(--navy);\n  min-height:0;');

fs.writeFileSync('styles.css', css);
console.log('Fixed sidebar min-height');
