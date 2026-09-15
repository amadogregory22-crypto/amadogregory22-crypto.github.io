const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/background: #fff;/g, 'background: var(--panel);');
css = css.replace(/background: #fff5f5;/g, 'background: var(--danger-bg);');
css = css.replace(/background:#fff;/g, 'background: var(--panel);');

fs.writeFileSync('styles.css', css);
console.log('Patched more #fff');
