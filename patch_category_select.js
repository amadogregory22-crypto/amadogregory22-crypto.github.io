const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

const folderHtmlOld = `<!-- Dossier -->
      <div>
        <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Dossier</h4>
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2 font-medium text-slate-700">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            / \${esc(assetFolder)}
          </div>
          <button id="changeFolderBtn" class="text-[#90b9d4] font-semibold hover:underline">Modifier</button>
        </div>
      </div>`;

const folderHtmlNew = `<!-- Catégorie -->
      <div>
        <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Catégorie Personnalisée</h4>
        <select id="assetCategorySelect" class="w-full border border-slate-200 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none">
          <option value="">Aucune (Catégorie par défaut)</option>
          \${(state.customCategories || []).map(c => \`<option value="\${c.id}" \${selectedAsset.customCategoryId === c.id ? 'selected' : ''}>\${esc(c.name)}</option>\`).join('')}
        </select>
      </div>`;

js = js.replace(folderHtmlOld, folderHtmlNew);

const btnOld = `$("changeFolderBtn").onclick = () => {
    const folder = prompt("Nouveau dossier :", assetFolder);
    if(!folder || !folder.trim()) return;
    const nextFolder = folder.trim().slice(0, 60);
    apply(() => {
      selectedAsset.folder = nextFolder;
    }, true, "Modif dossier");
    renderLibraryDetails(selectedAsset);
  };`;

const btnNew = `if($("assetCategorySelect")) {
    $("assetCategorySelect").onchange = (e) => {
      apply(() => {
        selectedAsset.customCategoryId = e.target.value || null;
      }, true, "Modif catégorie");
      renderAssets();
    };
  }`;

js = js.replace(btnOld, btnNew);

fs.writeFileSync('app.js', js);
