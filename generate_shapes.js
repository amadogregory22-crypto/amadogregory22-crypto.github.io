const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const modalHtml = `
<!-- Add Shape Modal -->
<div id="addShapeModal" class="fixed inset-0 z-[100000] bg-slate-900/60 backdrop-blur-sm hidden items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-2xl w-[400px] max-w-[95vw] overflow-hidden flex flex-col">
    <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
      <h3 class="text-lg font-bold text-slate-800">Ajouter une Forme</h3>
      <button onclick="document.getElementById('addShapeModal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
    <div class="p-6 grid grid-cols-3 gap-4">
      <button class="flex flex-col items-center gap-2 p-4 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50" onclick="window.addStandardShape('square')">
        <div class="w-8 h-8 bg-slate-800"></div>
        <span class="text-xs font-semibold text-slate-700">Carré</span>
      </button>
      <button class="flex flex-col items-center gap-2 p-4 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50" onclick="window.addStandardShape('circle')">
        <div class="w-8 h-8 bg-slate-800 rounded-full"></div>
        <span class="text-xs font-semibold text-slate-700">Cercle</span>
      </button>
      <button class="flex flex-col items-center gap-2 p-4 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50" onclick="window.addStandardShape('line')">
        <div class="w-8 h-1 bg-slate-800 mt-3 mb-4"></div>
        <span class="text-xs font-semibold text-slate-700">Ligne</span>
      </button>
    </div>
  </div>
</div>
`;

html = html.replace('</body>', modalHtml + '\n</body>');
fs.writeFileSync('index.html', html);
