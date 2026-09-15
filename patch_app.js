const fs = require("fs");
let content = fs.readFileSync("app.js", "utf8");

// 1. alignment buttons
content = content.replace(
  'if($("studioCenterObjBtn")) $("studioCenterObjBtn").onclick=()=>apply(()=>{const p=studioPage(); const o=studioObject(); if(!o)return; o.x=Math.round((p.w-o.w)/2); o.y=Math.round((p.h-o.h)/2);},true,"Objet centré");',
  `const alignStudioObject=(alignType)=>{const o=studioObject();const p=studioPage();if(!o||!p)return;apply(()=>{if(alignType==="left")o.x=0;if(alignType==="hcenter")o.x=Math.round((p.w-o.w)/2);if(alignType==="right")o.x=p.w-o.w;if(alignType==="top")o.y=0;if(alignType==="vcenter")o.y=Math.round((p.h-o.h)/2);if(alignType==="bottom")o.y=p.h-o.h;},true,"Alignement "+alignType);};
  if($("studioAlignLeftBtn"))$("studioAlignLeftBtn").onclick=()=>alignStudioObject("left");
  if($("studioAlignHCenterBtn"))$("studioAlignHCenterBtn").onclick=()=>alignStudioObject("hcenter");
  if($("studioAlignRightBtn"))$("studioAlignRightBtn").onclick=()=>alignStudioObject("right");
  if($("studioAlignTopBtn"))$("studioAlignTopBtn").onclick=()=>alignStudioObject("top");
  if($("studioAlignVCenterBtn"))$("studioAlignVCenterBtn").onclick=()=>alignStudioObject("vcenter");
  if($("studioAlignBottomBtn"))$("studioAlignBottomBtn").onclick=()=>alignStudioObject("bottom");`
);

// 2. exportStudioJson
const exportReplacement = `function exportStudioJson(){
  const enrichedStudio = JSON.parse(JSON.stringify(state.studio));
  if(enrichedStudio.pages) {
    enrichedStudio.pages.forEach(p => {
      if(p.objects) {
        p.objects.forEach(obj => {
          obj.metadata = {
            layerName: obj.name || obj.type,
            locked: !!obj.locked,
            hidden: !!obj.hidden,
            createdAt: obj.createdAt || Date.now()
          };
          obj.effects = obj.effects || {
            brightness: 100, contrast: 100, saturate: 100, grayscale: 0, sepia: 0, blur: 0, hue: 0,
            shadow: false, shadowX: 8, shadowY: 10, shadowBlur: 16, shadowColor: "#273540",
            border: false, borderWidth: 4, borderColor: "#273540"
          };
        });
      }
    });
  }
  download("studio-projet-v26.json",JSON.stringify({version:"26.0",studio:enrichedStudio, metadata: { exportedAt: new Date().toISOString() }},null,2),"application/json");
}`;
content = content.replace(
  'function exportStudioJson(){\n  download("studio-projet-v26.json",JSON.stringify({version:"26.0",studio:state.studio},null,2),"application/json");\n}',
  exportReplacement
);

// 3. renderStudioHistory -> add onclick
content = content.replace(
  `    return \`<div class="studio-history-item" data-history-index="\${historyLog.length - 1 - i}">
      <span>\${esc(h.label)}</span>
      <span class="time">\${timeStr}</span>
    </div>\`;
  }).join("");
}`,
  `    return \`<div class="studio-history-item hover:bg-slate-100 cursor-pointer p-1 rounded transition-colors" data-history-index="\${historyLog.length - 1 - i}">
      <span class="text-xs font-medium text-slate-700">\${esc(h.label)}</span>
      <span class="time text-[10px] text-slate-400 ml-auto">\${timeStr}</span>
    </div>\`;
  }).join("");
  container.querySelectorAll("[data-history-index]").forEach(item => {
    item.onclick = () => {
      const idx = +item.dataset.historyIndex;
      const logItem = historyLog[idx];
      if(!logItem || !logItem.state || !logItem.state.studio) return;
      apply(() => {
        state.studio = JSON.parse(JSON.stringify(logItem.state.studio));
      }, true, "Restauration: " + logItem.label);
      toast("Canvas restauré: " + logItem.label);
    };
  });
}`
);

// 4. Ghost image logic for studio library assets dragging
// renderStudioLibrary
content = content.replace(
  `    el.ondragstart=e=>{e.dataTransfer.setData("text/studio-asset",el.dataset.libAsset);};`,
  `    el.ondragstart=e=>{
      e.dataTransfer.setData("text/studio-asset",el.dataset.libAsset);
      window.__draggedStudioId = el.dataset.libAsset;
    };
    el.ondragend=e=>{ window.__draggedStudioId = null; };`
);

// bindStudioDropLibrary
content = content.replace(
  `  canvas.ondragover=e=>{e.preventDefault();canvas.classList.add("studio-drop-ready");};
  canvas.ondragleave=()=>canvas.classList.remove("studio-drop-ready");
  canvas.ondrop=e=>{
    e.preventDefault();canvas.classList.remove("studio-drop-ready");`,
  `  canvas.ondragover=e=>{
    e.preventDefault();canvas.classList.add("studio-drop-ready");
    let ghost = document.getElementById("studioGhostImage");
    if(!ghost) {
      ghost = document.createElement("img");
      ghost.id = "studioGhostImage";
      ghost.className = "fixed pointer-events-none opacity-50 z-[100000] drop-shadow-xl rounded object-contain";
      document.body.appendChild(ghost);
    }
    ghost.style.display = "block";
    let src = "";
    if (window.__draggedStudioId) {
      const a = allStudioLibraryAssets().find(x=>x.id===window.__draggedStudioId);
      if (a && a.src) src = a.src;
    }
    if (src) {
      ghost.src = src;
      ghost.style.width = "200px";
      ghost.style.height = "150px";
      ghost.style.left = (e.clientX - 100) + "px";
      ghost.style.top = (e.clientY - 75) + "px";
    } else {
      ghost.style.display = "none";
    }
  };
  canvas.ondragleave=()=>{
    canvas.classList.remove("studio-drop-ready");
    let ghost = document.getElementById("studioGhostImage");
    if(ghost) ghost.style.display = "none";
  };
  canvas.ondrop=e=>{
    e.preventDefault();canvas.classList.remove("studio-drop-ready");
    let ghost = document.getElementById("studioGhostImage");
    if(ghost) ghost.style.display = "none";`
);

fs.writeFileSync("app.js", content);
console.log("Patched app.js successfully.");
