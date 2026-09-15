const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add "Gérer catégories" button
const filterHtml = '<select id="assetFilter" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 outline-none">';
const newFilterHtml = filterHtml + '\n                    <option value="custom_category_placeholder" disabled>--- Catégories ---</option>';
html = html.replace(filterHtml, newFilterHtml);

// Add button
const typeDiv = '<div class="flex items-center gap-2">\n                  <span class="text-xs font-medium text-slate-500">Type</span>\n                  <select id="assetFilter"';
html = html.replace(typeDiv, '<div class="flex items-center gap-2">\n                  <span class="text-xs font-medium text-slate-500">Type</span>\n                  <button id="manageCustomCategoriesBtn" class="p-1 text-slate-400 hover:text-slate-700" title="Gérer les catégories"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></button>\n                  <select id="assetFilter"');

const modalHtml = `
<!-- Custom Categories Modal -->
<div id="customCategoriesModal" class="fixed inset-0 z-[100000] bg-slate-900/60 backdrop-blur-sm hidden items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-2xl w-[400px] max-w-[95vw] overflow-hidden flex flex-col">
    <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
      <h3 class="text-lg font-bold text-slate-800">Gérer les catégories</h3>
      <button onclick="document.getElementById('customCategoriesModal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
    <div class="p-6 flex flex-col gap-4">
      <div class="flex gap-2">
        <input type="text" id="newCustomCategoryName" class="flex-1 border border-slate-200 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none" placeholder="Nouvelle catégorie...">
        <button id="addCustomCategoryBtn" class="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold">+</button>
      </div>
      <div id="customCategoriesList" class="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
        <!-- populated via js -->
      </div>
    </div>
  </div>
</div>
`;

html = html.replace('</body>', modalHtml + '\n</body>');
fs.writeFileSync('index.html', html);
