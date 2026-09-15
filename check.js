const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n').slice(642, 908);
let divCount = 0;
lines.forEach((line, i) => {
  const opens = (line.match(/<div/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  divCount += opens - closes;
});
console.log('Final div balance for appearance view:', divCount);
