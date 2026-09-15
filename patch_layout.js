const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newTabs = `
              <div class="studio-sidebar-nav p-3 h-full overflow-y-auto bg-white border-r border-slate-200" style="width: 280px; display: flex; flex-direction: column;">
                <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">OUTILS CRÉATIFS</div>
                <div class="relative mb-4">
                  <svg class="w-4 h-4 absolute left-2.5 top-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <input type="text" placeholder="Rechercher un outil..." class="w-full pl-8 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-300">
                </div>
                
                <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">CRÉER</div>
                <div class="grid grid-cols-3 gap-2 mb-4">
                  <button class="studio-tab active flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all gap-1" data-studio-panel="studio-formats">
                    <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
                    <span class="text-[9px] font-medium text-slate-600">Formats</span>
                  </button>
                  <button class="studio-tab flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all gap-1" data-studio-panel="studio-elements">
                    <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
                    <span class="text-[9px] font-medium text-slate-600">Éléments</span>
                  </button>
                  <button class="studio-tab flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all gap-1" data-studio-panel="studio-text">
                    <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 4h18M9 4v16m6-16v16"></path></svg>
                    <span class="text-[9px] font-medium text-slate-600">Texte</span>
                  </button>
                  <button class="studio-tab flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all gap-1" data-studio-panel="studio-images">
                    <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span class="text-[9px] font-medium text-slate-600">Images</span>
                  </button>
                  <button class="studio-tab flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all gap-1" data-studio-panel="studio-ai">
                    <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    <span class="text-[9px] font-medium text-slate-600">IA Créative</span>
                  </button>
                  <button class="studio-tab flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all gap-1" data-studio-panel="studio-effects">
                    <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                    <span class="text-[9px] font-medium text-slate-600">Effets</span>
                  </button>
                  <button class="studio-tab flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all gap-1" data-studio-panel="studio-templates">
                    <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    <span class="text-[9px] font-medium text-slate-600">Templates</span>
                  </button>
                  <button class="studio-tab flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all gap-1" data-studio-panel="studio-library">
                    <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    <span class="text-[9px] font-medium text-slate-600">Bibliothèque</span>
                  </button>
                  <button class="studio-tab flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all gap-1" data-studio-panel="studio-pages">
                    <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <span class="text-[9px] font-medium text-slate-600">Pages</span>
                  </button>
                </div>
              </div>
`;

html = html.replace(/<div class="studio-tabs">[\s\S]*?<\/div>/, newTabs);
fs.writeFileSync('index.html', html);
console.log('Patched layout');
