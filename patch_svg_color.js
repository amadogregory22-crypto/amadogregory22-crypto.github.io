const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

js = js.replace(/fill="currentColor"/g, 'fill="#273540"');

fs.writeFileSync('app.js', js);
