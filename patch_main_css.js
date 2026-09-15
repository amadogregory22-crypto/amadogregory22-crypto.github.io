const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.studio-main\{[\s\S]*?grid-template-rows:auto 1fr;\s*\}/, '.studio-main{\n  display:flex;\n  flex-direction:column;\n}');

css = css.replace(/\.studio-canvas-wrap\{[\s\S]*?\}/, '.studio-canvas-wrap{\n  flex:1;\n  position:relative;\n  overflow:auto;\n  background:var(--bg);\n}');

fs.writeFileSync('styles.css', css);
console.log('Patched main css');
