const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let js = fs.readFileSync('app.js', 'utf8');

// Replace text-[var(--navy)] with text-[var(--ink)]
html = html.replace(/text-\[var\(--navy\)\]/g, 'text-[var(--ink)]');
js = js.replace(/text-\[var\(--navy\)\]/g, 'text-[var(--ink)]');

// Replace text-slate-800 with text-[var(--ink)]
html = html.replace(/text-slate-800/g, 'text-[var(--ink)]');
js = js.replace(/text-slate-800/g, 'text-[var(--ink)]');

// Replace text-slate-900 with text-[var(--ink)]
html = html.replace(/text-slate-900/g, 'text-[var(--ink)]');
js = js.replace(/text-slate-900/g, 'text-[var(--ink)]');

// Replace text-slate-500 and text-slate-600 with text-[var(--muted)]
html = html.replace(/text-slate-500/g, 'text-[var(--muted)]');
js = js.replace(/text-slate-500/g, 'text-[var(--muted)]');
html = html.replace(/text-slate-600/g, 'text-[var(--muted)]');
js = js.replace(/text-slate-600/g, 'text-[var(--muted)]');

fs.writeFileSync('index.html', html);
fs.writeFileSync('app.js', js);
console.log("Colors replaced in HTML and JS");
