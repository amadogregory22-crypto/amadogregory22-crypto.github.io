const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Replace the hardcoded 1fr which causes overflow
css = css.replace(/grid-template-columns: var\(--workspace-cols, 220px 1fr 450px\) !important;/g, 
"grid-template-columns: var(--workspace-sidebar, 220px) minmax(0, 1fr) var(--workspace-props, 450px) !important;");

css = css.replace(/grid-template-columns:var\(--workspace-cols,128px minmax\(360px,460px\) 1fr\);/g, 
"grid-template-columns:var(--workspace-cols,128px minmax(360px,460px) minmax(0, 1fr));");

fs.writeFileSync('styles.css', css);
