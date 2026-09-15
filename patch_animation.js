const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// replace .studio-object.selected
css = css.replace(/\.studio-object\.selected\{\s*outline:2px solid var\(--gold2\);\s*box-shadow:0 0 0 3px rgba\(255,201,40,\.25\);\s*\}/g, `
@keyframes studio-border-glow {
  0% { box-shadow: 0 0 0 2px var(--navy), 0 0 0px var(--navy); }
  50% { box-shadow: 0 0 0 2px var(--navy), 0 0 8px var(--navy); }
  100% { box-shadow: 0 0 0 2px var(--navy), 0 0 0px var(--navy); }
}
.studio-object.selected{
  outline: none;
  animation: studio-border-glow 2s infinite;
  z-index: 100 !important;
}
`);

fs.writeFileSync('styles.css', css);
console.log('Patched animation');
