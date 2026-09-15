const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const documentsStartStr = '<section class="view p-6" id="documents">';
const startIndex = html.indexOf(documentsStartStr);

if (startIndex !== -1) {
  const contentStart = html.indexOf('<input id="documentInput"', startIndex);

  if (contentStart !== -1) {
    const newDocumentsHeader = `
          <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
            <div>
              <p class="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">ÉDITION</p>
              <h2 class="text-3xl font-light text-[#273540]">Publipostage</h2>
              <p class="text-sm text-slate-500 mt-1">Gestion des documents et publipostage. Extraction des collaborateurs depuis vos fichiers.</p>
            </div>
            <div class="flex flex-wrap items-center gap-3" id="documentsActionsContainer">
              <button id="importDocumentBtn" class="bg-[#273540] hover:bg-[#1e2932] text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors">Importer document</button>
              <button id="documentModeBtn" class="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors">Mode lecture</button>
              <button id="toggleSignerPanelBtn" class="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors">Signature visuelle</button>
              <button id="exportAnnotationPlanBtn" class="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors">Exporter plan</button>
              <button id="togglePdfEngineBtn" class="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors">Moteur PDF</button>
              <button id="clearDocumentsBtn" class="bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors">Vider</button>
            </div>
          </div>
          `;

    // Calculate replacing everything between the <section> start tag and <input id="documentInput">
    const newHtml = html.substring(0, startIndex + documentsStartStr.length) + newDocumentsHeader + html.substring(contentStart);
    
    // Also, update the section class to remove p-6 if we want it to match Tableau de bord
    const finalHtml = newHtml.replace('<section class="view p-6" id="documents">', '<section class="view p-0 sm:p-2 lg:p-4" id="documents">');

    fs.writeFileSync('index.html', finalHtml);
    console.log('Successfully replaced documents header.');
  }
}
