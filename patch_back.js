const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
let html = fs.readFileSync('index.html', 'utf8');

// Add a back button and title area to the left panel
if(!html.includes('id="studioPanelHeader"')) {
  html = html.replace(
    '<div class="studio-sidebar-nav',
    `<div id="studioPanelHeader" class="hidden flex items-center gap-2 p-3 border-b border-slate-200 bg-white">
       <button id="studioBackToNavBtn" class="p-1 hover:bg-slate-100 rounded text-slate-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
       <strong id="studioPanelTitle" class="text-sm font-semibold text-slate-700">Outil</strong>
     </div>
     <div class="studio-sidebar-nav`
  );
  fs.writeFileSync('index.html', html);
}

// Modify activateStudioPanel
app = app.replace(
  'function activateStudioPanel(id){',
  `function activateStudioPanel(id){
  const nav = document.querySelector('.studio-sidebar-nav');
  const header = document.getElementById('studioPanelHeader');
  const title = document.getElementById('studioPanelTitle');
  if(nav) nav.classList.add('hidden');
  if(header) header.classList.remove('hidden');
  
  const tab = document.querySelector(\`.studio-tab[data-studio-panel="\${id}"]\`);
  if(title && tab) title.textContent = tab.textContent.trim();
`
);

app = app.replace(
  'document.querySelectorAll(".studio-tab").forEach(b=>b.onclick=()=>activateStudioPanel(b.dataset.studioPanel));',
  `document.querySelectorAll(".studio-tab").forEach(b=>b.onclick=()=>activateStudioPanel(b.dataset.studioPanel));
  if(document.getElementById('studioBackToNavBtn')) {
    document.getElementById('studioBackToNavBtn').onclick = () => {
      document.querySelectorAll(".studio-panel").forEach(x=>x.classList.remove("active"));
      document.querySelector('.studio-sidebar-nav').classList.remove('hidden');
      document.getElementById('studioPanelHeader').classList.add('hidden');
    };
  }`
);

fs.writeFileSync('app.js', app);
console.log('Patched back btn');
