const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');
const replacements = [
  { line: 264, old: "text- ", new: "text-navy " },
  { line: 838, old: "border- ", new: "border-navy " },
  { line: 838, old: "ring- ", new: "ring-navy " },
  { line: 838, old: "border-\'", new: "border-gold\'" },
  { line: 841, old: "hover:border- ", new: "hover:border-navy " },
  { line: 864, old: "hover:border- ", new: "hover:border-navy " },
  { line: 2041, old: "hover:border- ", new: "hover:border-navy " },
  { line: 2155, old: "bg- ", new: "bg-navy " },
  { line: 2155, old: "hover:bg-\"", new: "hover:bg-navy2\"" },
];
let lines = js.split('\n');
for (const r of replacements) {
  let idx = r.line - 1;
  if (lines[idx]) {
    lines[idx] = lines[idx].replace(r.old, r.new);
  }
}
fs.writeFileSync('app.js', lines.join('\n'));
console.log('Fixed app.js classes!');
