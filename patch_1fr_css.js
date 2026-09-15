const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/grid-template-columns: 220px 1fr !important;/g, "grid-template-columns: 220px minmax(0, 1fr) !important;");
css = css.replace(/grid-template-columns:126px 380px 1fr/g, "grid-template-columns:126px 380px minmax(0, 1fr)");
css = css.replace(/grid-template-columns:var\(--workspace-cols,220px 1fr\)/g, "grid-template-columns:var(--workspace-cols,220px minmax(0, 1fr))");

fs.writeFileSync('styles.css', css);
