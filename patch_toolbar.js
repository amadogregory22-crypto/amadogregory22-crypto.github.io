const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.studio-toolbar\{[\s\S]*?\}/, '.studio-toolbar{\n  display:flex;\n  gap:12px;\n  padding:12px 16px;\n  background:white;\n  border-bottom:1px solid var(--line);\n  align-items:center;\n  flex-wrap:wrap;\n}');

css = css.replace(/\.studio-toolbar button\{[\s\S]*?\}/, '.studio-toolbar button{\n  display:flex;\n  flex-direction:column;\n  align-items:center;\n  gap:4px;\n  background:transparent;\n  border:none;\n  font-size:10px;\n  color:var(--text);\n  padding:4px 8px;\n  border-radius:6px;\n}\n.studio-toolbar button:hover{\n  background:var(--slate-100);\n}');

fs.writeFileSync('styles.css', css);
console.log('Patched toolbar css');
