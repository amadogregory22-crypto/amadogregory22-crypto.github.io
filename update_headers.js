const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<section class="view p-0 sm:p-2 lg:p-4" id="appearance">([\s\S]*?)<div class="flex-1 flex overflow-hidden relative" id="appearanceViewContent">/, `<section class="view" id="appearance">
          <div class="px-4 py-2 bg-white border-b border-slate-200 flex justify-between items-center z-20 relative shrink-0">
            <div class="flex items-center gap-3">
              <span class="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold tracking-widest uppercase">Édition</span>
              <h2 class="text-lg font-semibold text-slate-800 m-0">Édition Complète</h2>
            </div>
            <div class="flex items-center gap-2">
              <button id="appearanceUndoBtn" class="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded shadow-sm hover:bg-slate-50">Annuler</button>
              <button id="appearanceRedoBtn" class="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded shadow-sm hover:bg-slate-50">Rétablir</button>
              <button id="appearanceSettingsBtn" class="px-3 py-1.5 bg-[#273540] text-white text-xs font-semibold rounded shadow-sm hover:bg-[#1e2932]">Paramètres</button>
            </div>
          </div>
          <div class="flex-1 flex overflow-hidden relative" id="appearanceViewContent">`);

html = html.replace(/<section class="view p-0 sm:p-2 lg:p-4" id="documents">([\s\S]*?)<input id="documentInput"/, `<section class="view" id="documents">
          <div class="px-4 py-2 bg-white border-b border-slate-200 flex justify-between items-center z-20 relative shrink-0">
            <div class="flex items-center gap-3">
              <span class="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold tracking-widest uppercase">Édition</span>
              <h2 class="text-lg font-semibold text-slate-800 m-0">Publipostage</h2>
            </div>
            <div class="flex items-center gap-2" id="documentsActionsContainer">
              <button id="importDocumentBtn" class="px-3 py-1.5 bg-[#273540] text-white text-xs font-semibold rounded shadow-sm hover:bg-[#1e2932]">Importer</button>
              <button id="documentModeBtn" class="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded shadow-sm hover:bg-slate-50">Mode lecture</button>
              <button id="toggleSignerPanelBtn" class="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded shadow-sm hover:bg-slate-50">Signature</button>
            </div>
          </div>
          <input id="documentInput"`);

html = html.replace(/<section class="view p-0 sm:p-2 lg:p-4" id="studio">([\s\S]*?)<div class="studio-shell">/, `<section class="view" id="studio">
          <div class="px-4 py-2 bg-white border-b border-slate-200 flex justify-between items-center z-20 relative shrink-0">
            <div class="flex items-center gap-3">
              <span class="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold tracking-widest uppercase">Édition</span>
              <h2 class="text-lg font-semibold text-slate-800 m-0">Studio Créatif</h2>
            </div>
            <div class="flex items-center gap-2">
              <button id="studioUndoTopBtn" class="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded shadow-sm hover:bg-slate-50">Annuler</button>
              <button id="studioExportBtn" class="px-3 py-1.5 bg-[#273540] text-white text-xs font-semibold rounded shadow-sm hover:bg-[#1e2932]">Exporter PNG</button>
            </div>
          </div>
          <div class="studio-shell">`);

fs.writeFileSync('index.html', html);
