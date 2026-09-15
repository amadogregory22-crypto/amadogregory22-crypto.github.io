const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.brand h1\{[\s\S]*?\}/, '.brand h1{\n  font-family: "Cormorant Garamond", serif;\n  font-size:24px;\n  color:var(--navy);\n  margin:0;\n  font-weight:600;\n}');

if (!css.includes('.brand h1{')) {
  css += '\n.brand h1{\n  font-family: "Cormorant Garamond", serif;\n  font-size:24px;\n  color:var(--navy);\n  margin:0;\n  font-weight:600;\n}\n';
}

fs.writeFileSync('styles.css', css);
console.log('H1 css updated');
