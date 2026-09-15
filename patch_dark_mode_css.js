const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/body\.dark-mode/g, '.dark-mode');

fs.writeFileSync('styles.css', css);
console.log('CSS body.dark-mode replaced with .dark-mode');
