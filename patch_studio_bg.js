const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.studio-left,\.studio-main,\.studio-right\{\n  border:1px solid var\(--line\);\n  border-radius:14px;\n  background:white;/, '.studio-left,.studio-main,.studio-right{\n  border:1px solid var(--line);\n  border-radius:14px;\n  background:var(--panel);');

css = css.replace(/\.studio-shell\{\n  display:grid;\n  grid-template-columns: 280px minmax\(0,1fr\) 280px;\n  height: calc\(100% - 42px\);\n  background: #f8fafc;/, '.studio-shell{\n  display:grid;\n  grid-template-columns: 280px minmax(0,1fr) 280px;\n  height: calc(100% - 42px);\n  background: var(--bg);');

fs.writeFileSync('styles.css', css);
console.log('Studio BG Patched');
