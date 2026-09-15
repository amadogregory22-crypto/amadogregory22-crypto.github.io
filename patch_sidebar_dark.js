const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css += '\nbody.dark-mode .sidebar { background-color: #0f172a; }\n';
css += 'body.dark-mode .sidebar .nav { background-color: transparent !important; color: #f8fafc !important; border: none !important; }\n';
css += 'body.dark-mode .sidebar .nav:hover:not(.active) { background-color: rgba(255,255,255,0.1) !important; }\n';
css += 'body.dark-mode .sidebar .nav.active { background-color: var(--gold) !important; color: #000000 !important; }\n';
css += 'body.dark-mode .sidebar .nav.active svg { opacity: 1 !important; stroke: #000000 !important; }\n';

fs.writeFileSync('styles.css', css);
console.log('Sidebar dark mode patched');
