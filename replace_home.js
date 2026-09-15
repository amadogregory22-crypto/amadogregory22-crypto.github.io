const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startIndex = html.indexOf('<section class="view active" id="home">');
const endIndex = html.indexOf('<section class="view" id="studio">');

if (startIndex !== -1 && endIndex !== -1) {
  const newHomeContent = `
<section class="view active p-0 sm:p-2 lg:p-4" id="home">
  <!-- Header -->
  <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
    <div>
      <p class="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">SIGNATURE STUDIO V34</p>
      <h2 class="text-3xl font-light text-[#273540]">Tableau de bord</h2>
      <p class="text-sm text-slate-500 mt-1">Un point d'entrée propre pour les projets, la charte, les exports et les ressources officielles.</p>
    </div>
    <div class="flex flex-wrap gap-3">
      <button id="newProjectBtnHome" class="bg-[#273540] hover:bg-[#1e2932] text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors">Nouveau projet</button>
      <button id="openProjectBtnHome" class="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors" onclick="document.getElementById('import-file').click()">Ouvrir</button>
      <button id="saveProjectBtnHome" class="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors" onclick="window.saveProjectToDisk()">Sauvegarder</button>
    </div>
  </div>

  <!-- Hero & Checklist -->
  <div class="flex flex-col xl:flex-row gap-6 mb-6 px-2">
    <!-- Hero -->
    <div class="bg-[#273540] rounded-2xl p-8 flex-1 relative overflow-hidden flex shadow-lg">
      <div class="flex-1 relative z-10 flex flex-col justify-center">
        <div class="mb-4 inline-block bg-[#ecc764] text-[#273540] text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase self-start">
          CHARTE RAGT ACTIVE
        </div>
        <h3 class="text-white text-3xl md:text-4xl font-semibold mb-4 tracking-tight">Studio de signature officiel</h3>
        <p class="text-slate-300 text-sm mb-8 max-w-lg leading-relaxed">Centralisez les logos, couleurs, signatures, documents et contrôles qualité avant export.</p>
        
        <div class="flex flex-wrap gap-4">
          <button class="bg-[#1e293b] hover:bg-slate-800 text-white text-sm font-semibold py-2.5 px-5 rounded-lg border border-slate-600 shadow-sm transition-all" onclick="openStudioWithTemplate('tmpl-ragt-standard')">Nouvelle signature</button>
          <button class="bg-white/5 hover:bg-white/10 text-white text-sm font-semibold py-2.5 px-5 rounded-lg border border-white/20 shadow-sm transition-all" data-jump="charter">Consulter la charte</button>
          <button class="bg-transparent hover:bg-white/5 text-white text-sm font-semibold py-2.5 px-5 rounded-lg border border-white/20 shadow-sm transition-all" onclick="document.getElementById('logo-upload').click()">Importer un logo</button>
        </div>
      </div>
      <!-- Right Graphic -->
      <div class="w-80 h-48 bg-[#fcd34d] rounded-2xl shrink-0 ml-8 relative shadow-inner p-6 flex gap-5 items-center transform rotate-1 hidden md:flex">
         <div class="w-16 h-16 bg-[#1e293b] rounded-xl flex items-center justify-center text-[#fcd34d] text-3xl font-black shadow-md">R</div>
         <div class="flex-1">
            <div class="text-[#1e293b] text-xl font-black tracking-tight leading-none mb-1">FIRSTNAME LASTNAME</div>
            <div class="text-white text-[10px] font-black tracking-widest uppercase mb-4 drop-shadow-sm">MARKETING MANAGER</div>
            <div class="w-full h-2 bg-[#d4af37] rounded-full mb-2 opacity-60"></div>
            <div class="w-4/5 h-2 bg-[#d4af37] rounded-full mb-2 opacity-60"></div>
            <div class="w-3/5 h-2 bg-[#d4af37] rounded-full opacity-60"></div>
         </div>
      </div>
    </div>

    <!-- Checklist -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 w-full xl:w-80 shrink-0 flex flex-col">
      <div class="flex justify-between items-start mb-6">
        <div>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">AVANT EXPORT</p>
          <h3 class="text-lg font-semibold text-slate-800">Checklist</h3>
        </div>
        <!-- Circle 70% -->
        <div class="relative w-12 h-12 flex items-center justify-center shrink-0">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path class="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4"/>
            <path class="text-orange-500" stroke-dasharray="70, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4"/>
          </svg>
          <span class="absolute text-[10px] font-bold text-slate-800">70</span>
        </div>
      </div>
      
      <ul class="space-y-4">
        <li class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <span class="text-sm text-slate-600">Compléter l'identité</span>
          </div>
          <span class="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">À faire</span>
        </li>
        <li class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span class="text-sm text-slate-600">Importer un logo RAGT</span>
          </div>
          <span class="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">Validé</span>
        </li>
        <li class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <span class="text-sm text-slate-600">Vérifier la charte RAGT</span>
          </div>
          <span class="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">À faire</span>
        </li>
        <li class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span class="text-sm text-slate-600">Outlook configuré</span>
          </div>
          <span class="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">Validé</span>
        </li>
        <li class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span class="text-sm text-slate-600">Zéro erreur qualité</span>
          </div>
          <span class="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">Validé</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- Stats Row -->
  <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 px-2">
    <!-- Identité -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer" data-jump="appearance">
      <p class="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Identité</p>
      <p class="text-2xl font-bold text-green-600">0 %</p>
    </div>
    <!-- Logo -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer" data-jump="appearance">
      <p class="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Logo</p>
      <p class="text-2xl font-bold text-green-600">Présent</p>
    </div>
    <!-- Design -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer" data-jump="appearance">
      <p class="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Design</p>
      <p class="text-2xl font-bold text-blue-400">Personnalisé</p>
    </div>
    <!-- Documents -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer" data-jump="documents">
      <p class="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Documents</p>
      <p class="text-2xl font-bold text-blue-400" id="docs-count-home">0 fichier</p>
    </div>
    <!-- Qualité -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer" data-jump="quality">
      <p class="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Qualité</p>
      <p class="text-2xl font-bold text-green-600">70 %</p>
    </div>
  </div>

  <!-- Projects & Actions -->
  <div class="flex flex-col xl:flex-row gap-6 mb-6 px-2">
    <!-- Projects -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1">
      <div class="flex justify-between items-center mb-6">
        <div>
           <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">ACCUEIL / PROJETS</p>
           <h3 class="text-lg font-semibold text-slate-800">Projet actif</h3>
        </div>
        <div class="flex gap-2 text-xs font-bold text-slate-600 hidden md:flex">
          <span class="bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">Total: 1</span>
          <span class="bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">Fav: 0</span>
          <span class="bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">Archives: 0</span>
        </div>
      </div>

      <div class="flex flex-wrap md:flex-nowrap gap-4 mb-6">
        <div class="flex-1 relative min-w-[200px]">
          <svg class="w-4 h-4 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" placeholder="Rechercher un projet..." class="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#273540] transition-shadow">
        </div>
        <select class="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 focus:outline-none bg-white">
          <option>Tous les statuts</option>
          <option>En cours</option>
          <option>Terminé</option>
        </select>
        <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors">Dossier</button>
        <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors" onclick="document.getElementById('import-file').click()">Importer</button>
        <div class="flex border border-slate-200 rounded-lg overflow-hidden">
          <button class="bg-[#1e293b] text-white px-3 py-2"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg></button>
          <button class="bg-white text-slate-400 hover:text-slate-600 px-3 py-2 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></button>
        </div>
      </div>

      <div class="border border-slate-200 rounded-xl p-6 relative hover:border-slate-300 transition-colors bg-slate-50/50">
        <div class="absolute -top-3 left-6 bg-[#d97706] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">URGENT 48H</div>
        
        <div class="flex justify-between items-start mb-4">
          <div>
            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 mt-1">EN COURS</p>
            <h4 class="text-xl font-bold text-slate-800">Projet Signature RAGT</h4>
          </div>
          <div class="flex gap-2">
            <button class="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
            <button class="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg></button>
            <button class="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg></button>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-6 mb-6">
          <div class="w-20 h-20 bg-[#1e293b] rounded-xl flex items-center justify-center shadow-md shrink-0">
            <svg class="w-8 h-8 text-[#fcd34d]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <div class="flex-1">
            <div class="inline-flex items-center gap-2 border border-slate-200 bg-white rounded-lg px-3 py-1.5 mb-4 shadow-sm">
              <span class="text-slate-400 text-sm font-bold">+</span>
              <input type="text" placeholder="Tag" class="text-sm outline-none text-slate-600 w-16 bg-transparent">
            </div>
            <p class="text-sm text-slate-500 mb-3 flex items-center flex-wrap gap-2">Dernière sauvegarde: aujourd'hui <span class="text-green-600 font-semibold text-xs bg-green-50 px-2 py-0.5 rounded border border-green-100">Hors ligne disponible</span></p>
            <div class="flex items-center gap-3">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">ECHEANCE</span>
              <div class="border border-slate-200 bg-white rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm">
                <input type="text" placeholder="jj / mm / aaaa" class="text-sm text-slate-600 outline-none w-28 bg-transparent">
                <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <button class="bg-[#1e293b] hover:bg-slate-800 text-white px-5 py-2 text-sm font-bold rounded-lg shadow-sm transition-colors" data-jump="studio">Reprendre édition</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-5 py-2 text-sm font-bold rounded-lg shadow-sm transition-colors" onclick="togglePreview()">Aperçu</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-5 py-2 text-sm font-bold rounded-lg shadow-sm transition-colors" data-jump="export">Exporter</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-5 py-2 text-sm font-bold rounded-lg shadow-sm transition-colors" data-jump="library">Bibliothèque</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-5 py-2 text-sm font-bold rounded-lg shadow-sm transition-colors">Partager</button>
          <button class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-5 py-2 text-sm font-bold rounded-lg shadow-sm ml-auto transition-colors">Archiver</button>
        </div>
      </div>
    </div>

    <!-- Actions (Raccourcis) -->
    <div class="w-full xl:w-96 shrink-0 flex flex-col gap-6">
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col">
        <div class="mb-6">
           <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">RACCOURCIS</p>
           <h3 class="text-lg font-semibold text-slate-800">Actions utiles</h3>
        </div>
        
        <div class="grid grid-cols-3 gap-3 mb-auto">
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-3 text-xs font-bold rounded-xl shadow-sm transition-colors flex flex-col items-center justify-center text-center h-16">Tags rapides</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-3 text-xs font-bold rounded-xl shadow-sm transition-colors flex flex-col items-center justify-center text-center h-16" onclick="window.exportCSV()">Export CSV</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-3 text-xs font-bold rounded-xl shadow-sm transition-colors flex flex-col items-center justify-center text-center h-16" onclick="window.exportPNG()">Export PNG</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-3 text-xs font-bold rounded-xl shadow-sm transition-colors flex flex-col items-center justify-center text-center h-16" onclick="if(window.deferredPrompt) { window.deferredPrompt.prompt(); } else { alert('Déjà installé ou non supporté'); }">Installer</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-3 text-xs font-bold rounded-xl shadow-sm transition-colors flex flex-col items-center justify-center text-center h-16" onclick="window.location.reload(true)">Reset cache</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-3 text-xs font-bold rounded-xl shadow-sm transition-colors flex flex-col items-center justify-center text-center h-16">Mode simple</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-3 text-xs font-bold rounded-xl shadow-sm transition-colors flex flex-col items-center justify-center text-center h-16">Vue compacte</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-3 text-xs font-bold rounded-xl shadow-sm transition-colors flex flex-col items-center justify-center text-center h-16" onclick="window.exportToDisk()">Export état</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-3 text-xs font-bold rounded-xl shadow-sm transition-colors flex flex-col items-center justify-center text-center h-16" data-jump="quality">Contrôle qualité</button>
          <button class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-3 text-xs font-bold rounded-xl shadow-sm transition-colors flex flex-col items-center justify-center text-center h-16 col-span-3">Aide</button>
        </div>
        
        <div class="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100">
          <div>
            <p class="text-[10px] font-bold text-slate-500 mb-1 tracking-wider uppercase">Score qualité</p>
            <p class="text-xl font-bold text-slate-800">70 %</p>
          </div>
          <div>
            <p class="text-[10px] font-bold text-slate-500 mb-1 tracking-wider uppercase">Mode</p>
            <p class="text-xl font-bold text-slate-800">Normal</p>
          </div>
          <div>
            <p class="text-[10px] font-bold text-slate-500 mb-1 tracking-wider uppercase">Dernière sauv.</p>
            <p class="text-xl font-bold text-slate-800" id="last-save-time-home">--:--</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Charts & Acces Direct -->
  <div class="flex flex-col xl:flex-row gap-6 px-2 mb-6">
     <div class="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
        <div class="flex justify-between items-center mb-6">
           <div>
              <p class="text-sm font-semibold text-slate-800">Signature email RAGT - synthese locale</p>
           </div>
           <span class="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full border border-green-100">Qualité 70%</span>
        </div>
        <div class="grid grid-cols-4 gap-4 mb-8">
           <div>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">IDENTITE</p>
              <p class="text-2xl font-bold text-slate-800">0%</p>
           </div>
           <div>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">ASSETS</p>
              <p class="text-2xl font-bold text-slate-800">265</p>
           </div>
           <div>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">DOCUMENTS</p>
              <p class="text-2xl font-bold text-slate-800">0</p>
           </div>
           <div>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">PAGES STUDIO</p>
              <p class="text-2xl font-bold text-slate-800">11</p>
           </div>
        </div>

        <!-- D3 bar chart placeholder equivalent -->
        <div class="h-40 flex items-end justify-between gap-2 px-4 border-b border-slate-100 pb-2 mb-6">
           <div class="w-10 bg-blue-300/60 rounded-t-lg h-8 relative group"><span class="absolute -bottom-6 text-xs text-slate-500 w-full text-center">Lun</span></div>
           <div class="w-10 bg-blue-300/60 rounded-t-lg h-12 relative group"><span class="absolute -bottom-6 text-xs text-slate-500 w-full text-center">Mar</span></div>
           <div class="w-10 bg-blue-400 rounded-t-lg h-24 relative group"><span class="absolute -bottom-6 text-xs text-slate-500 w-full text-center font-bold">Mer</span></div>
           <div class="w-10 bg-blue-300/60 rounded-t-lg h-20 relative group"><span class="absolute -bottom-6 text-xs text-slate-500 w-full text-center">Jeu</span></div>
           <div class="w-10 bg-blue-300/60 rounded-t-lg h-32 relative group"><span class="absolute -bottom-6 text-xs text-slate-500 w-full text-center">Ven</span></div>
           <div class="w-10 bg-blue-300/60 rounded-t-lg h-28 relative group"><span class="absolute -bottom-6 text-xs text-slate-500 w-full text-center">Sam</span></div>
           <div class="w-10 bg-blue-300/60 rounded-t-lg h-36 relative group"><span class="absolute -bottom-6 text-xs text-slate-500 w-full text-center">Dim</span></div>
        </div>

        <div class="flex justify-between items-center mb-4 mt-4">
           <h4 class="text-base font-bold text-slate-800">Echéances</h4>
           <button class="border border-slate-200 bg-white text-slate-700 px-3 py-1 text-xs font-bold rounded-md hover:bg-slate-50 transition-colors">Régler</button>
        </div>
        <p class="text-sm text-slate-500 mb-4">Juillet 2026</p>
        <div class="grid grid-cols-7 gap-1 text-center text-sm mb-4">
           <div class="text-xs font-bold text-slate-500 mb-2">L</div>
           <div class="text-xs font-bold text-slate-500 mb-2">M</div>
           <div class="text-xs font-bold text-slate-500 mb-2">M</div>
           <div class="text-xs font-bold text-slate-500 mb-2">J</div>
           <div class="text-xs font-bold text-slate-500 mb-2">V</div>
           <div class="text-xs font-bold text-slate-500 mb-2">S</div>
           <div class="text-xs font-bold text-slate-500 mb-2">D</div>
           
           <div class="py-2 text-slate-600">1</div>
           <div class="py-2 text-slate-600">2</div>
           <div class="py-2 bg-[#1e293b] text-white rounded-lg font-bold">3</div>
           <div class="py-2 text-red-500 font-bold">4</div>
           <div class="py-2 text-slate-600">5</div>
           <div class="py-2 text-red-500 font-bold bg-red-50 rounded-lg">6</div>
           <div class="py-2 text-slate-600">7</div>
           
           <div class="py-2 text-slate-600">8</div>
           <div class="py-2 text-slate-600">9</div>
           <div class="py-2 text-slate-600">10</div>
           <div class="py-2 text-slate-600">11</div>
           <div class="py-2 text-slate-600">12</div>
           <div class="py-2 text-slate-600">13</div>
           <div class="py-2 text-slate-600">14</div>
           
           <div class="py-2 text-slate-600">15</div>
           <div class="py-2 text-slate-600">16</div>
           <div class="py-2 text-slate-600">17</div>
           <div class="py-2 text-slate-600">18</div>
           <div class="py-2 text-slate-600">19</div>
           <div class="py-2 text-slate-600">20</div>
           <div class="py-2 text-slate-600">21</div>

           <div class="py-2 text-slate-600">22</div>
           <div class="py-2 text-slate-600">23</div>
           <div class="py-2 text-slate-600">24</div>
           <div class="py-2 text-slate-600">25</div>
           <div class="py-2 text-slate-600">26</div>
           <div class="py-2 text-slate-600">27</div>
           <div class="py-2 text-slate-600">28</div>

           <div class="py-2 text-slate-600">29</div>
           <div class="py-2 text-slate-600">30</div>
           <div class="py-2"></div>
           <div class="py-2"></div>
           <div class="py-2"></div>
           <div class="py-2"></div>
           <div class="py-2"></div>
        </div>

        <div class="flex justify-between items-center mt-auto border-t border-slate-100 pt-4">
           <p class="text-xs text-slate-400">Points rouges = action proche</p>
           <button class="bg-[#273540] hover:bg-[#1e2932] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors" data-jump="export">Exporter</button>
        </div>
     </div>

     <div class="w-full xl:w-96 shrink-0 bg-slate-50/50 rounded-2xl border border-slate-200 p-6 flex flex-col">
       <div class="mb-6">
         <h3 class="text-lg font-semibold text-slate-800">Accès direct</h3>
       </div>
       <div class="grid grid-cols-2 gap-3">
         <button class="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-slate-300 hover:shadow-sm transition-all" data-jump="appearance">
           <h4 class="text-sm font-bold text-slate-800 mb-1">Identité</h4>
           <p class="text-[10px] text-slate-500">Infos, réseaux, design</p>
         </button>
         <button class="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-slate-300 hover:shadow-sm transition-all" data-jump="charter">
           <h4 class="text-sm font-bold text-slate-800 mb-1">Charte graphique</h4>
           <p class="text-[10px] text-slate-500">Couleurs et règles</p>
         </button>
         <button class="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-slate-300 hover:shadow-sm transition-all" data-jump="studio">
           <h4 class="text-sm font-bold text-slate-800 mb-1">Studio</h4>
           <p class="text-[10px] text-slate-500">Édition visuelle</p>
         </button>
         <button class="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-slate-300 hover:shadow-sm transition-all" data-jump="documents">
           <h4 class="text-sm font-bold text-slate-800 mb-1">Documents</h4>
           <p class="text-[10px] text-slate-500">Publipostage</p>
         </button>
         <button class="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-slate-300 hover:shadow-sm transition-all" data-jump="pdf">
           <h4 class="text-sm font-bold text-slate-800 mb-1">Outils PDF</h4>
           <p class="text-[10px] text-slate-500">Traitements utiles</p>
         </button>
         <button class="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-slate-300 hover:shadow-sm transition-all" data-jump="settings">
           <h4 class="text-sm font-bold text-slate-800 mb-1">Paramètres</h4>
           <p class="text-[10px] text-slate-500">Préférences et document</p>
         </button>
       </div>
     </div>
  </div>

  <!-- Resources Footer -->
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 px-2 mx-2">
     <div class="mb-6">
       <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">NAVIGATEUR ET TELECHARGEMENTS</p>
       <h3 class="text-lg font-semibold text-slate-800">Ressources logos, icônes et charte</h3>
     </div>
     <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
       <a href="https://www.flaticon.com/" target="_blank" class="border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:border-slate-300 hover:bg-slate-50 transition-all">
         <div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-700">F</div>
         <div>
           <h4 class="text-sm font-bold text-slate-800">Flaticon</h4>
           <p class="text-[10px] text-slate-500 font-bold mt-1">Icônes SVG, PNG, PSD.</p>
         </div>
       </a>
       <a href="https://iconscout.com/" target="_blank" class="border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:border-slate-300 hover:bg-slate-50 transition-all">
         <div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-700">I</div>
         <div>
           <h4 class="text-sm font-bold text-slate-800">IconScout</h4>
           <p class="text-[10px] text-slate-500 font-bold mt-1">Icônes, illustrations, Lottie.</p>
         </div>
       </a>
       <a href="https://www.blogdumoderateur.com/outils/banque-images/" target="_blank" class="border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:border-slate-300 hover:bg-slate-50 transition-all">
         <div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-700">B</div>
         <div>
           <h4 class="text-sm font-bold text-slate-800">Le BDM</h4>
           <p class="text-[10px] text-slate-500 font-bold mt-1">Guides et banques recommandées.</p>
         </div>
       </a>
       <a href="https://www.iconfinder.com/free_icons" target="_blank" class="border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:border-slate-300 hover:bg-slate-50 transition-all">
         <div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-700">G</div>
         <div>
           <h4 class="text-sm font-bold text-slate-800">Icônes gratuites</h4>
           <p class="text-[10px] text-slate-500 font-bold mt-1">Classement par thèmes.</p>
         </div>
       </a>
     </div>
     
     <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
       <!-- RAGT Corporate -->
       <div class="border border-slate-200 rounded-xl p-5">
         <div class="flex items-center gap-4 mb-4">
           <div class="w-12 h-12 bg-[#ecc764] rounded-lg flex items-center justify-center font-black text-xs text-[#273540]">RAGT</div>
           <div>
             <h4 class="text-sm font-bold text-slate-800">Logo RAGT Corporate</h4>
             <p class="text-[10px] text-slate-500 font-bold">URL officielle</p>
           </div>
         </div>
         <div class="flex gap-2">
           <button class="border border-slate-200 text-slate-700 px-3 py-2 text-xs font-bold rounded-lg hover:bg-slate-50 flex-1" onclick="navigator.clipboard.writeText('https://upload.wikimedia.org/wikipedia/fr/5/53/RAGT_logo.jpg'); alert('URL Copiée !')">Copier URL</button>
           <button class="bg-white border border-slate-200 text-slate-700 px-3 py-2 text-xs font-bold rounded-lg hover:bg-slate-50 flex-[2]" onclick="document.getElementById('logoUrl').value='https://upload.wikimedia.org/wikipedia/fr/5/53/RAGT_logo.jpg'; document.querySelector('[data-jump=\'appearance\']').click(); setTimeout(() => document.getElementById('applyLogoUrlBtn')?.click(), 100);">Importer</button>
         </div>
       </div>

       <!-- RAGT Semences -->
       <div class="border border-slate-200 rounded-xl p-5">
         <div class="flex items-center gap-4 mb-4">
           <div class="w-12 h-12 bg-[#6ba56f] rounded-lg flex items-center justify-center font-black text-xs text-white">RAGT</div>
           <div>
             <h4 class="text-sm font-bold text-slate-800">RAGT Semences</h4>
             <p class="text-[10px] text-slate-500 font-bold">Logo web officiel</p>
           </div>
         </div>
         <div class="flex gap-2">
           <button class="border border-slate-200 text-slate-700 px-3 py-2 text-xs font-bold rounded-lg hover:bg-slate-50 flex-1" onclick="navigator.clipboard.writeText('https://upload.wikimedia.org/wikipedia/fr/5/53/RAGT_logo.jpg'); alert('URL Copiée !')">Copier URL</button>
           <button class="bg-white border border-slate-200 text-slate-700 px-3 py-2 text-xs font-bold rounded-lg hover:bg-slate-50 flex-[2]" onclick="document.getElementById('logoUrl').value='https://upload.wikimedia.org/wikipedia/fr/5/53/RAGT_logo.jpg'; document.querySelector('[data-jump=\'appearance\']').click(); setTimeout(() => document.getElementById('applyLogoUrlBtn')?.click(), 100);">Importer</button>
         </div>
       </div>

       <!-- Palette corporate -->
       <div class="border border-slate-200 rounded-xl p-5">
         <div class="mb-4">
           <h4 class="text-sm font-bold text-slate-800 mb-1">Palette corporate</h4>
         </div>
         <div class="flex items-center justify-between gap-2">
           <div class="flex-1 flex flex-col items-center gap-2">
             <div class="w-full h-8 bg-[#273540] rounded-md shadow-inner cursor-pointer hover:scale-105 transition-transform" onclick="navigator.clipboard.writeText('#273540'); alert('Copié: #273540')"></div>
             <span class="text-[10px] font-bold text-slate-600">#273540</span>
           </div>
           <div class="flex-1 flex flex-col items-center gap-2">
             <div class="w-full h-8 bg-[#90b9d4] rounded-md shadow-inner cursor-pointer hover:scale-105 transition-transform" onclick="navigator.clipboard.writeText('#90b9d4'); alert('Copié: #90b9d4')"></div>
             <span class="text-[10px] font-bold text-slate-600">#90b9d4</span>
           </div>
           <div class="flex-1 flex flex-col items-center gap-2">
             <div class="w-full h-8 bg-[#ecc764] rounded-md shadow-inner cursor-pointer hover:scale-105 transition-transform" onclick="navigator.clipboard.writeText('#ecc764'); alert('Copié: #ecc764')"></div>
             <span class="text-[10px] font-bold text-slate-600">#ecc764</span>
           </div>
           <div class="flex-1 flex flex-col items-center gap-2">
             <div class="w-full h-8 bg-[#6ba56f] rounded-md shadow-inner cursor-pointer hover:scale-105 transition-transform" onclick="navigator.clipboard.writeText('#6ba56f'); alert('Copié: #6ba56f')"></div>
             <span class="text-[10px] font-bold text-slate-600">#6ba56f</span>
           </div>
         </div>
       </div>
     </div>
  </div>

</section>
`;

  const newHtml = html.substring(0, startIndex) + newHomeContent + html.substring(endIndex);
  fs.writeFileSync('index.html', newHtml);
  console.log('Successfully replaced home section.');
} else {
  console.log('Could not find start or end index.');
}
