const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.topbar\{[\s\S]*?overflow:hidden;\s*\}/, '.topbar{\n  height:72px;\n  min-width:0;\n  display:flex;\n  align-items: center;\n  gap:12px;\n  padding:0 8px 0 0;\n  background:#ffffff;\n  border-bottom:1px solid var(--line);\n  overflow:visible;\n}');

css = css.replace(/\.brand\{[\s\S]*?flex:0 0 220px\s*\}/, '.brand{\n  display:flex;\n  align-items: center;\n  gap:16px;\n  min-width:220px;\n  flex:0 0 220px;\n  height:100%;\n}');

css = css.replace(/\.brand-logo\{[\s\S]*?font-size:22px\s*\}/, '.brand-logo{\n  width:72px;\n  height:72px;\n  background:var(--navy);\n  border-radius:0 0 24px 0;\n  display:flex;\n  align-items:center;\n  justify-content:center;\n  color:#fff;\n  font-weight:950;\n  font-size:22px;\n}');

css = css.replace(/\.sidebar\{[\s\S]*?flex-shrink:0\s*\}/, '.sidebar{\n  background:var(--navy);\n  border-right:none;\n  padding:20px 12px;\n  overflow-y:auto;\n  overflow-x:hidden;\n  width:240px;\n  flex-shrink:0;\n  border-top-right-radius:24px;\n}');

css = css.replace(/\.workspace\{[\s\S]*?background:var\(--bg\)\s*\}/, '.workspace{\n  display:grid;\n  grid-template-columns:240px 1fr;\n  height:100%;\n  overflow:hidden;\n  background:var(--bg);\n}');

fs.writeFileSync('styles.css', css);
console.log('Patched brand and sidebar css');
