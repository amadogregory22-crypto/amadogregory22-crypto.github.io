const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newTopbar = `
              <div class="studio-topbar flex flex-wrap items-center gap-1 p-2 bg-white border-b border-slate-200">
                <button id="studioUndoBtn" class="flex flex-col items-center justify-center p-1.5 rounded hover:bg-slate-100 text-slate-600 min-w-[60px]" title="Annuler (Ctrl+Z)">
                  <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
                  <span class="text-[9px]">Annuler</span>
                </button>
                <div class="w-px h-8 bg-slate-200 mx-1"></div>
                <button id="studioDuplicateObjectBtn" class="flex flex-col items-center justify-center p-1.5 rounded hover:bg-slate-100 text-slate-600 min-w-[60px]" title="Dupliquer">
                  <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                  <span class="text-[9px]">Dupliquer</span>
                </button>
                <button id="studioDeleteObjectBtn" class="flex flex-col items-center justify-center p-1.5 rounded hover:bg-red-50 text-red-600 min-w-[60px]" title="Supprimer">
                  <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  <span class="text-[9px]">Supprimer</span>
                </button>
                <div class="w-px h-8 bg-slate-200 mx-1"></div>
                <button id="studioGroupBtn" class="flex flex-col items-center justify-center p-1.5 rounded hover:bg-slate-100 text-slate-600 min-w-[60px]" title="Grouper">
                  <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span class="text-[9px]">Grouper</span>
                </button>
                <button id="studioBringFrontBtn" class="flex flex-col items-center justify-center p-1.5 rounded hover:bg-slate-100 text-slate-600 min-w-[60px]" title="Devant">
                  <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                  <span class="text-[9px]">Devant</span>
                </button>
                <button id="studioSendBackBtn" class="flex flex-col items-center justify-center p-1.5 rounded hover:bg-slate-100 text-slate-600 min-w-[60px]" title="Derrière">
                  <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                  <span class="text-[9px]">Derrière</span>
                </button>
                <div class="w-px h-8 bg-slate-200 mx-1"></div>
                <button id="studioSmartGuidesBtn" class="flex flex-col items-center justify-center p-1.5 rounded hover:bg-slate-100 text-slate-600 min-w-[60px]" title="Snap">
                  <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                  <span class="text-[9px]">Snap</span>
                </button>
                <button id="studioRulerBtn" class="flex flex-col items-center justify-center p-1.5 rounded hover:bg-slate-100 text-slate-600 min-w-[60px]" title="Règles">
                  <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                  <span class="text-[9px]">Règles</span>
                </button>
                <div class="w-px h-8 bg-slate-200 mx-1"></div>
                <button id="studioExportPngBtn" class="flex flex-col items-center justify-center p-1.5 rounded hover:bg-slate-100 text-slate-600 min-w-[60px]" title="PNG">
                  <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  <span class="text-[9px]">PNG</span>
                </button>
                <button id="studioExportPdfBtn" class="flex flex-col items-center justify-center p-1.5 rounded hover:bg-slate-100 text-slate-600 min-w-[60px]" title="PDF">
                  <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                  <span class="text-[9px]">PDF</span>
                </button>
                <button id="studioExportJsonBtn" class="flex flex-col items-center justify-center p-1.5 rounded hover:bg-slate-100 text-slate-600 min-w-[60px]" title="JSON">
                  <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span class="text-[9px]">JSON</span>
                </button>
              </div>
`;

html = html.replace(/<div class="studio-topbar">[\s\S]*?<\/div>\s*<div class="studio-canvas-wrap"/, newTopbar + '\n              <div class="studio-canvas-wrap"');

fs.writeFileSync('index.html', html);
console.log('Patched topbar');
