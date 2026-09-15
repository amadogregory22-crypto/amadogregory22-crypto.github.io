const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Replace specific white backgrounds
css = css.replace(/\.library-summary-card\{\s*display:flex;[\s\S]*?background:#fff;/g, (match) => match.replace('background:#fff;', 'background:var(--panel);'));
css = css.replace(/\.library-official-card\{\s*display:flex;[\s\S]*?background:#fff;/g, (match) => match.replace('background:#fff;', 'background:var(--panel);'));
css = css.replace(/\.library-list-thumb\{\s*position:relative;[\s\S]*?background:#fff;/g, (match) => match.replace('background:#fff;', 'background:var(--panel);'));
css = css.replace(/\.library-list-actions button\.fav\{\s*min-width:32px;\s*color:#8594a8;\s*background:#fff;/g, (match) => match.replace('background:#fff;', 'background:var(--panel);'));
css = css.replace(/\.tool-run-panel\{\s*border:1px solid var\(--line\);\s*border-radius:14px;\s*background:#fff;/g, (match) => match.replace('background:#fff;', 'background:var(--panel);'));

fs.writeFileSync('styles.css', css);
console.log('Colors patched');
