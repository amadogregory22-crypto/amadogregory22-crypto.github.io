const fs = require("fs");
const content = fs.readFileSync("app.js", "utf8");

// find maxStudioZ
const lines = content.split('\n');
const minZIndex = lines.findIndex(l => l.includes('function minStudioZ()'));
// find the next function
const nextFuncIndex = lines.findIndex((l, i) => i > minZIndex && l.startsWith('function '));

if(minZIndex !== -1 && nextFuncIndex !== -1) {
  const fullRenderStudioHistory = `
function renderStudioHistory(){
  const container = document.getElementById("studioHistoryList");
  if (!container) return;
  const list = historyLog.slice().reverse().slice(0, 10);
  if (list.length === 0) {
    container.innerHTML = '<div class="text-[10px] text-slate-400 italic">Aucune action</div>';
    return;
  }
  container.innerHTML = list.map((h, i) => {
    const d = new Date(h.time);
    const timeStr = \`\${d.getHours()}:\${String(d.getMinutes()).padStart(2, '0')}:\${String(d.getSeconds()).padStart(2, '0')}\`;
    return \`<div class="studio-history-item hover:bg-slate-100 cursor-pointer p-1 rounded transition-colors flex items-center justify-between" data-history-index="\${historyLog.length - 1 - i}">
      <span class="text-xs font-medium text-slate-700 truncate mr-2" style="max-width: 150px;" title="\${esc(h.label)}">\${esc(h.label)}</span>
      <span class="time text-[10px] text-slate-400 whitespace-nowrap">\${timeStr}</span>
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
}
`;
  lines.splice(minZIndex + 3, nextFuncIndex - (minZIndex + 3), fullRenderStudioHistory);
  fs.writeFileSync("app.js", lines.join('\n'));
  console.log("Patched renderStudioHistory successfully.");
} else {
  console.log("Could not find insertion point.", minZIndex, nextFuncIndex);
}
