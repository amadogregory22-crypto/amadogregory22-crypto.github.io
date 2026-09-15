const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldModalContent = `      <div>
        <label class="block text-sm font-semibold text-slate-700 mb-2">Que voulez-vous générer ?</label>
        <textarea id="aiAssetPrompt" rows="3" class="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none" placeholder="Décrivez votre idée... (ex: Un logo minimaliste de montagne bleu)"></textarea>
      </div>
      <div>
        <label class="block text-sm font-semibold text-slate-700 mb-2">Type d'asset</label>
        <select id="aiAssetType" class="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none">
          <option value="logo">Logo</option>
          <option value="background">Fond / Arrière-plan</option>
          <option value="icon">Picto / Icône</option>
          <option value="motif">Motif</option>
          <option value="shape">Forme</option>
        </select>
      </div>`;

const newModalContent = `      <div>
        <label class="block text-sm font-semibold text-slate-700 mb-2">Type d'asset</label>
        <select id="aiAssetType" class="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none mb-4" onchange="document.querySelectorAll('.ai-prompt-area').forEach(el => el.classList.add('hidden')); document.getElementById('prompt-area-' + this.value).classList.remove('hidden');">
          <option value="logo">Logo</option>
          <option value="background">Fond / Arrière-plan</option>
          <option value="icon">Picto / Icône</option>
          <option value="motif">Motif</option>
          <option value="shape">Forme</option>
        </select>
      </div>
      <div id="prompt-area-logo" class="ai-prompt-area">
        <label class="block text-sm font-semibold text-slate-700 mb-2">Prompt pour le Logo</label>
        <textarea id="aiAssetPrompt-logo" rows="3" class="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none" placeholder="Décrivez votre logo... (ex: Un logo minimaliste de montagne bleu)"></textarea>
      </div>
      <div id="prompt-area-background" class="ai-prompt-area hidden">
        <label class="block text-sm font-semibold text-slate-700 mb-2">Prompt pour le Fond</label>
        <textarea id="aiAssetPrompt-background" rows="3" class="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none" placeholder="Décrivez votre fond... (ex: Un dégradé abstrait tech)"></textarea>
      </div>
      <div id="prompt-area-icon" class="ai-prompt-area hidden">
        <label class="block text-sm font-semibold text-slate-700 mb-2">Prompt pour l'Icône</label>
        <textarea id="aiAssetPrompt-icon" rows="3" class="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none" placeholder="Décrivez votre icône... (ex: Une icône de téléphone flat design)"></textarea>
      </div>
      <div id="prompt-area-motif" class="ai-prompt-area hidden">
        <label class="block text-sm font-semibold text-slate-700 mb-2">Prompt pour le Motif</label>
        <textarea id="aiAssetPrompt-motif" rows="3" class="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none" placeholder="Décrivez votre motif... (ex: Un motif géométrique discret)"></textarea>
      </div>
      <div id="prompt-area-shape" class="ai-prompt-area hidden">
        <label class="block text-sm font-semibold text-slate-700 mb-2">Prompt pour la Forme</label>
        <textarea id="aiAssetPrompt-shape" rows="3" class="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none" placeholder="Décrivez votre forme... (ex: Un polygone asymétrique)"></textarea>
      </div>`;

html = html.replace(oldModalContent, newModalContent);
fs.writeFileSync('index.html', html);
