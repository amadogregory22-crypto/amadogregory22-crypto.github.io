const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newSidebar = `
        <nav class="flex flex-col gap-6 w-full">
          <!-- Accueil -->
          <div class="flex flex-col gap-2">
            <div class="text-[10px] font-bold text-[#C8A96B] uppercase tracking-widest px-3 mb-1">Accueil</div>
            <button class="nav active w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="home">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Tableau de bord
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="charter">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
              Charte Graphique
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="library">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              Bibliothèque
            </button>
          </div>

          <div class="h-px w-full bg-white/10"></div>

          <!-- Édition -->
          <div class="flex flex-col gap-2">
            <div class="text-[10px] font-bold text-[#C8A96B] uppercase tracking-widest px-3 mb-1">Édition</div>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="appearance">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              Édition
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="documents">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
              Publications
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="studio">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              Studio Créatif
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="campaigns">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              Kits de Campagne
            </button>
          </div>

          <div class="h-px w-full bg-white/10"></div>

          <!-- Export & Outils -->
          <div class="flex flex-col gap-2">
            <div class="text-[10px] font-bold text-[#C8A96B] uppercase tracking-widest px-3 mb-1">Export & Outils</div>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="export">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              Export
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="tools">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Outils PDF
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="media-lab">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              Media Lab
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="settings">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Paramètres
            </button>
          </div>

          <div class="h-px w-full bg-white/10"></div>

          <!-- Avancé -->
          <div class="flex flex-col gap-2">
            <div class="text-[10px] font-bold text-[#C8A96B] uppercase tracking-widest px-3 mb-1">Avancé</div>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="backend">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
              Backend
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="quality">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              Contrôle qualité
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="business-connectors">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
              Connecteurs métiers
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="applications">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              Catalogue & Assistant E1
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="ecosystem">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Écosystème
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="connectors">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              API et Connecteurs
            </button>
            <button class="nav w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold transition-all border-none" data-view="collaboration">
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              Collaboration
            </button>
          </div>

          <!-- Storage widget -->
          <div class="mt-4 p-3 rounded-xl border border-white/20 bg-white/5">
            <div class="text-[10px] font-bold text-white mb-2">Stockage & utilisation</div>
            <div class="flex justify-between text-[10px] text-white/70 mb-1">
              <span>42,6 Go / 100 Go</span>
              <span>43%</span>
            </div>
            <div class="w-full h-1.5 bg-white/20 rounded-full mb-3">
              <div class="h-full bg-[#C8A96B] rounded-full" style="width: 43%"></div>
            </div>
            <div class="text-[10px] font-bold text-white mb-2">Utilisateurs actifs</div>
            <div class="flex -space-x-2">
              <img class="w-6 h-6 rounded-full border border-[#0F2F26]" src="https://i.pravatar.cc/100?img=3" alt="">
              <img class="w-6 h-6 rounded-full border border-[#0F2F26]" src="https://i.pravatar.cc/100?img=4" alt="">
              <img class="w-6 h-6 rounded-full border border-[#0F2F26]" src="https://i.pravatar.cc/100?img=5" alt="">
              <div class="w-6 h-6 rounded-full border border-[#0F2F26] bg-white/10 flex items-center justify-center text-[8px] text-white font-bold">+12</div>
            </div>
          </div>
        </nav>
`;

html = html.replace(/<nav>[\s\S]*?<\/nav>/, newSidebar);
fs.writeFileSync('index.html', html);
console.log('Sidebar updated');
