const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.studio-props\{[\s\S]*?min-width:0;\s*\}/, '.studio-props{\n  display:block;\n  padding:12px;\n  border-bottom:1px solid var(--line);\n  overflow-y:auto;\n  flex:1;\n}');

fs.writeFileSync('styles.css', css);
console.log('Patched props css');
