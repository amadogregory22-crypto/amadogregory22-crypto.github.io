const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const appearanceStartStr = '<section class="view !p-0 flex flex-col bg-slate-50 overflow-hidden" id="appearance">';
const startIndex = html.indexOf(appearanceStartStr);

if (startIndex !== -1) {
  const topbarStart = html.indexOf('<!-- Topbar -->', startIndex);
  const contentStart = html.indexOf('<div class="flex-1 flex overflow-hidden relative" id="appearanceViewContent">', startIndex);

  if (topbarStart !== -1 && contentStart !== -1) {
    const newTopbar = `
          <!-- Topbar -->
          <div class="px-6 py-4 bg-white border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0 shadow-sm z-20 relative">
            <div>
              <p class="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">ÉDITION</p>
              <h2 class="text-2xl font-light text-[#273540]">Édition Complète</h2>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <button id="appearanceUndoBtn" class="px-4 py-2 bg-white border border-slate-200 text-slate-800 font-semibold text-xs rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg> Annuler
              </button>
              <button id="appearanceRedoBtn" class="px-4 py-2 bg-white border border-slate-200 text-slate-800 font-semibold text-xs rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"></path></svg> Rétablir
              </button>
              <button id="appearanceGridToggleBtn" class="px-2 py-2 bg-white border border-slate-200 text-slate-800 font-semibold text-xs rounded-lg shadow-sm hover:bg-slate-50 flex items-center justify-center" title="Grille de précision">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16v16H4V4zm0 4h16M4 12h16M4 16h16M8 4v16M12 4v16M16 4v16"></path></svg>
              </button>
              <div class="h-6 w-px bg-slate-200 mx-1"></div>
              <button id="appearanceZoomOutBtn" class="px-2 py-2 bg-white border border-slate-200 text-slate-800 font-semibold text-xs rounded-lg shadow-sm hover:bg-slate-50 flex items-center justify-center" title="Dézoomer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
              </button>
              <span id="appearanceZoomLevel" class="text-xs font-bold text-slate-800 min-w-[4ch] text-center">100%</span>
              <button id="appearanceZoomInBtn" class="px-2 py-2 bg-white border border-slate-200 text-slate-800 font-semibold text-xs rounded-lg shadow-sm hover:bg-slate-50 flex items-center justify-center" title="Zoomer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              </button>
              <button id="appearanceZoomAutoBtn" class="px-2 py-2 bg-white border border-slate-200 text-slate-800 font-semibold text-xs rounded-lg shadow-sm hover:bg-slate-50 flex items-center justify-center" title="Zoom Auto">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
              </button>
              <div class="h-6 w-px bg-slate-200 mx-1"></div>
              <button id="appearanceSaveThemeBtn" class="px-4 py-2 bg-[#273540] text-white font-semibold text-xs rounded-lg shadow-sm hover:bg-[#1e2932] flex items-center gap-2 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg> Enregistrer comme thème <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </div>
          </div>
          `;

    const newHtml = html.substring(0, topbarStart) + newTopbar + html.substring(contentStart);
    fs.writeFileSync('index.html', newHtml);
    console.log('Successfully replaced appearance topbar.');
  }
}
