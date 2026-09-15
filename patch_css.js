const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.studio-left\{[\s\S]*?\}/, '.studio-left{\n  display:flex;\n  flex-direction:column;\n  border:none;\n  background:transparent;\n}');

css = css.replace(/\.app-view-studio \.studio-shell\{[\s\S]*?\}/, '.app-view-studio .studio-shell{\n  grid-template-columns: 280px minmax(0,1fr) 280px;\n  height: calc(100% - 42px);\n  background: #f8fafc;\n  gap: 16px;\n}');

css = css.replace(/\.studio-right\{[\s\S]*?\}/, '.studio-right{\n  border:1px solid var(--line);\n  border-radius:14px;\n  background:white;\n  overflow:hidden;\n  display:flex;\n  flex-direction:column;\n}');

fs.writeFileSync('styles.css', css);
console.log('Patched css');
