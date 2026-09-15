const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

const logic = `
// Custom categories logic
window.addEventListener("DOMContentLoaded", () => {
  if (!state.customCategories) state.customCategories = [];
  
  const manageBtn = document.getElementById("manageCustomCategoriesBtn");
  const modal = document.getElementById("customCategoriesModal");
  const addBtn = document.getElementById("addCustomCategoryBtn");
  const inputName = document.getElementById("newCustomCategoryName");
  const listEl = document.getElementById("customCategoriesList");
  const assetFilter = document.getElementById("assetFilter");

  function renderCustomCategories() {
    listEl.innerHTML = "";
    state.customCategories.forEach((cat, idx) => {
      const div = document.createElement("div");
      div.className = "flex justify-between items-center bg-slate-50 border border-slate-100 p-2 rounded-lg";
      div.innerHTML = \`<span class="text-sm font-semibold text-slate-700">\${esc(cat.name)}</span>
        <button class="text-red-500 hover:text-red-700" onclick="deleteCustomCategory(\${idx})"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>\`;
      listEl.appendChild(div);
    });
    updateAssetFilterDropdown();
  }

  window.deleteCustomCategory = function(idx) {
    if (confirm("Supprimer cette catégorie ?")) {
      apply(() => {
        state.customCategories.splice(idx, 1);
      }, true, "Suppression catégorie");
      renderCustomCategories();
    }
  };

  function updateAssetFilterDropdown() {
    if(!assetFilter) return;
    // remove old custom options
    Array.from(assetFilter.options).forEach(opt => {
      if (opt.value.startsWith("cat_")) opt.remove();
    });
    state.customCategories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = "cat_" + cat.id;
      opt.textContent = cat.name;
      assetFilter.appendChild(opt);
    });
  }

  if (manageBtn) manageBtn.onclick = () => {
    renderCustomCategories();
    modal.classList.remove("hidden");
  };

  if (addBtn) addBtn.onclick = () => {
    const name = inputName.value.trim();
    if (name) {
      apply(() => {
        if (!state.customCategories) state.customCategories = [];
        state.customCategories.push({ id: Date.now().toString(), name });
      }, true, "Ajout catégorie");
      inputName.value = "";
      renderCustomCategories();
    }
  };
  
  // also inject custom categories into any category dropdowns if needed, or when rendering library items
});
`;

js = js + "\n" + logic;
fs.writeFileSync('app.js', js);
