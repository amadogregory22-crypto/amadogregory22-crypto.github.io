const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newPropsHead = `
              <div class="border-b border-slate-200">
                <div class="flex items-center overflow-x-auto px-2 pt-2 hide-scrollbar">
                  <button class="px-3 py-1.5 text-[10px] font-semibold text-slate-800 border-b-2 border-slate-800 whitespace-nowrap">Propriétés</button>
                  <button class="px-3 py-1.5 text-[10px] font-medium text-slate-500 hover:text-slate-700 whitespace-nowrap">Style</button>
                  <button class="px-3 py-1.5 text-[10px] font-medium text-slate-500 hover:text-slate-700 whitespace-nowrap">Disposition</button>
                  <button class="px-3 py-1.5 text-[10px] font-medium text-slate-500 hover:text-slate-700 whitespace-nowrap">Effets</button>
                  <button class="px-3 py-1.5 text-[10px] font-medium text-slate-500 hover:text-slate-700 whitespace-nowrap">Export</button>
                </div>
              </div>
              <div class="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs">
                <span class="text-slate-500">Sélection</span>
                <strong id="studioSelectedInfo" class="text-slate-700">Aucun objet</strong>
              </div>
`;

html = html.replace(/<div class="studio-props-head">[\s\S]*?<\/div>/, newPropsHead);

fs.writeFileSync('index.html', html);
console.log('Patched right tabs');
