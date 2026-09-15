const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Find and replace the defensive home rendering block
const blockToRemoveRegex = /\/\* Defensive home rendering:[\s\S]*?(?=\/\* Fix Edition Views Layout \*\/)/;
css = css.replace(blockToRemoveRegex, '');

fs.writeFileSync('styles.css', css);
console.log('Removed defensive home CSS');
