const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const iconFn = `
function getHistoryIconSvg(label) {
  const l = (label || "").toLowerCase();
  if (l.includes("ajout") || l.includes("création")) return \`<svg class="w-3 h-3 text-emerald-500 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>\`;
  if (l.includes("suppression") || l.includes("corbeille")) return \`<svg class="w-3 h-3 text-red-500 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>\`;
  if (l.includes("déplacement") || l.includes("mouvement") || l.includes("position") || l.includes("redimensionnement") || l.includes("rotation")) return \`<svg class="w-3 h-3 text-blue-500 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>\`;
  if (l.includes("alignement") || l.includes("centrer")) return \`<svg class="w-3 h-3 text-indigo-500 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>\`;
  if (l.includes("duplication") || l.includes("copie") || l.includes("dupliquer")) return \`<svg class="w-3 h-3 text-amber-500 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>\`;
  // Default edit icon
  return \`<svg class="w-3 h-3 text-slate-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>\`;
}
`;

app = app.replace('function renderStudioHistory(){', iconFn + '\nfunction renderStudioHistory(){');

app = app.replace(
  '<span class="text-xs font-medium text-slate-700 truncate mr-2" style="max-width: 150px;" title="${esc(h.label)}">${esc(h.label)}</span>',
  '<div class="flex items-center flex-1 min-w-0 mr-2">${getHistoryIconSvg(h.label)}<span class="text-xs font-medium text-slate-700 truncate" title="${esc(h.label)}">${esc(h.label)}</span></div>'
);

fs.writeFileSync('app.js', app);
console.log('Patched history icons');
