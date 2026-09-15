const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// The line is: .sidebar,.main-panel,.preview-panel,.props-panel{...}
css = css.replace(/\.sidebar,\.main-panel,\.preview-panel,\.props-panel\{/, '.main-panel,.preview-panel,.props-panel{');

fs.writeFileSync('styles.css', css);
console.log('Fixed sidebar background overriding');
