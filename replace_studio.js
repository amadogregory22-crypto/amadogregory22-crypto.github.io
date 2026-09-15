const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const studioStartStr = '<section class="view" id="studio">';
const startIndex = html.indexOf(studioStartStr);

if (startIndex !== -1) {
  const contentStart = html.indexOf('<div class="studio-shell">', startIndex);

  if (contentStart !== -1) {
    const newStudioHeader = `
          <div class="mb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
            <div>
              <p class="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">ÉDITION</p>
              <h2 class="text-3xl font-light text-[#273540]">Studio Créatif</h2>
              <p class="text-sm text-slate-500 mt-1">Conception visuelle libre et modèles Canva-like.</p>
            </div>
            <div class="flex items-center gap-3">
              <button id="studioExportBtn" class="bg-[#273540] text-white hover:bg-[#1e2932] px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors">Exporter modèle</button>
            </div>
          </div>
          `;

    const newHtml = html.substring(0, startIndex + studioStartStr.length) + newStudioHeader + html.substring(contentStart);
    
    // update the section class to remove p-6/default padding and match Tableau de bord
    const finalHtml = newHtml.replace('<section class="view" id="studio">', '<section class="view p-0 sm:p-2 lg:p-4" id="studio">');

    fs.writeFileSync('index.html', finalHtml);
    console.log('Successfully replaced studio header.');
  }
}
