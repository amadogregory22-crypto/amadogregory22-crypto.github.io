const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/--panel:#ffffff;/, '--panel:#ffffff;\n  --surface:#ffffff;');

fs.writeFileSync('styles.css', css);
console.log('Added --surface to :root');
