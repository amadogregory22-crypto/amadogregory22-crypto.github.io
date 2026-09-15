const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.brand-logo\{[\s\S]*?font-size:22px;\n\}/, '.brand-logo{\n  width:72px;\n  height:calc(100% + 1px);\n  margin-bottom:-1px;\n  background:var(--navy);\n  border-radius:0 0 24px 0;\n  display:flex;\n  align-items:center;\n  justify-content:center;\n  color:#fff;\n  font-weight:950;\n  font-size:22px;\n  z-index:10;\n}');

fs.writeFileSync('styles.css', css);
console.log('Brand logo patched for border overlap');
