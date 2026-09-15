const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

js = js.replace(/document\.body\.classList\.add\("dark-mode"\)/g, 'document.documentElement.classList.add("dark-mode")');
js = js.replace(/document\.body\.classList\.remove\("dark-mode"\)/g, 'document.documentElement.classList.remove("dark-mode")');
js = js.replace(/document\.body\.classList\.toggle\("dark-mode"/g, 'document.documentElement.classList.toggle("dark-mode"');

fs.writeFileSync('app.js', js);
console.log('app.js updated for dark mode class');
