const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.topbar\{\n  height:72px;\n  min-width:0;\n  display:flex;\n  align-items: center;\n  gap:12px;\n  padding:0 8px 0 0;\n  background:#ffffff;\n  border-bottom:1px solid var\(--line\);\n  overflow:visible;\n\}/, '.topbar{\n  height:72px;\n  min-width:0;\n  display:flex;\n  align-items: center;\n  gap:12px;\n  padding:0 8px 0 0;\n  background:var(--panel);\n  border-bottom:1px solid var(--line);\n  overflow:visible;\n}');

fs.writeFileSync('styles.css', css);
console.log('Patched topbar bg');
