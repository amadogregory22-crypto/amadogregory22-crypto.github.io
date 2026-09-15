const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.dark-mode \.sidebar \{ background-color: #0f172a; \}/g, '.dark-mode .sidebar { background-color: var(--panel); }');
css = css.replace(/\.dark-mode \.brand-logo \{ background-color: #0f172a !important; \}/g, '.dark-mode .brand-logo { background-color: var(--panel) !important; }');
css = css.replace(/color: #f8fafc !important;/g, 'color: var(--ink) !important;');
css = css.replace(/background-color: rgba\(255,255,255,0\.1\) !important;/g, 'background-color: var(--info-bg) !important;');

fs.writeFileSync('styles.css', css);
console.log('Sidebar vars fixed');
