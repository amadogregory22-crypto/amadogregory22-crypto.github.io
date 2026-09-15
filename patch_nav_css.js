const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.nav\.active\{[\s\S]*?\}/, '.nav.active{\n  background:var(--gold);\n  color:#000000;\n}\n.nav.active svg{\n  opacity: 1;\n  stroke: #000000;\n}');

css = css.replace(/\.nav\{[\s\S]*?\}/, '.nav{\n  /* Removed old nav styles */\n}\n.nav:hover:not(.active){\n  background:rgba(255,255,255,0.1);\n}');

fs.writeFileSync('styles.css', css);
console.log('Nav css updated');
