const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.brand\{[\s\S]*?flex:0 0 220px;\n  height:100%;\n\}/, '.brand{\n  display:flex;\n  align-items: center;\n  gap:16px;\n  min-width:240px;\n  flex:0 0 240px;\n  height:100%;\n}');

fs.writeFileSync('styles.css', css);
console.log('Sidebar width patched');
