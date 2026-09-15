const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const bottomPanel = `
              <div class="studio-bottom-panel p-4 bg-white border-t border-slate-200 overflow-x-auto hide-scrollbar">
                <div class="flex gap-4 min-w-max">
                  <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 w-[220px]">
                    <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Assistant IA</div>
                    <button class="w-full text-left p-2 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all flex items-center gap-2 mb-1">
                      <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                      <div>
                        <div class="text-xs font-semibold text-slate-700">Générer variantes</div>
                        <div class="text-[9px] text-slate-500">Déclinaisons automatiques</div>
                      </div>
                    </button>
                    <button class="w-full text-left p-2 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all flex items-center gap-2">
                      <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      <div>
                        <div class="text-xs font-semibold text-slate-700">Supprimer fond</div>
                        <div class="text-[9px] text-slate-500">Détourage IA en un clic</div>
                      </div>
                    </button>
                  </div>

                  <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 w-[220px]">
                    <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Suggestions</div>
                    <div class="grid grid-cols-2 gap-2">
                      <div class="h-10 bg-slate-200 rounded border border-slate-300"></div>
                      <div class="h-10 bg-slate-200 rounded border border-slate-300"></div>
                      <div class="h-10 bg-slate-200 rounded border border-slate-300"></div>
                      <div class="h-10 bg-slate-200 rounded border border-slate-300"></div>
                    </div>
                    <button class="mt-2 text-[10px] text-indigo-600 font-medium hover:underline">Voir toutes les suggestions →</button>
                  </div>
                  
                  <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 w-[220px]">
                    <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Variantes Marque</div>
                    <div class="grid grid-cols-3 gap-2">
                      <div class="h-14 bg-slate-800 rounded border border-slate-300 flex items-center justify-center"><div class="w-4 h-4 rounded-full bg-yellow-500"></div></div>
                      <div class="h-14 bg-white rounded border border-slate-300 flex items-center justify-center"><div class="w-4 h-4 rounded-full bg-slate-800"></div></div>
                      <div class="h-14 bg-slate-100 rounded border border-slate-300 flex items-center justify-center"><div class="w-4 h-4 rounded-full bg-yellow-500"></div></div>
                    </div>
                    <button class="mt-2 text-[10px] text-indigo-600 font-medium hover:underline">Voir variantes →</button>
                  </div>
                  
                  <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 w-[220px]">
                    <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Vérification</div>
                    <div class="flex flex-col gap-1.5">
                      <div class="flex justify-between items-center text-[10px]">
                        <span class="text-slate-600 font-medium">Contraste</span>
                        <span class="text-emerald-600 font-semibold flex items-center gap-1">AA 4.6:1 <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></span>
                      </div>
                      <div class="flex justify-between items-center text-[10px]">
                        <span class="text-slate-600 font-medium">Lisibilité</span>
                        <span class="text-emerald-600 font-semibold flex items-center gap-1">Excellente <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
`;

html = html.replace(/<div id="studioGuides" class="studio-guides"><\/div><\/div>\s*<\/div>\s*<\/main>/, '<div id="studioGuides" class="studio-guides"></div></div>\n              </div>\n' + bottomPanel + '            </main>');

fs.writeFileSync('index.html', html);
console.log('Patched bottom panel');
