const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.nav\.active svg\{[\s\S]*?\}/, '.nav.active svg{\n  opacity: 1 !important;\n  stroke: #000000 !important;\n}');

css = css.replace(/\.nav\.active\{[\s\S]*?\}/, '.nav.active{\n  background:var(--gold) !important;\n  color:#000000 !important;\n}\n.nav.active svg{\n  opacity: 1 !important;\n  stroke: #000000 !important;\n}');

fs.writeFileSync('styles.css', css);
console.log('Nav active patched');
