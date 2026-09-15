const fs = require("fs");
let content = fs.readFileSync("app.js", "utf8");

content = content.replace(/function renderStudioHistory\(\)\{[\s\S]*?\}\)/, '');

const fullRenderStudioHistory = `function renderStudioHistory(){
  const container = document.getElementById("studioHistoryList");
  if (!container) return;
  const list = historyLog.slice().reverse().slice(0, 10);
  container.innerHTML = list.map((h, i) => {
    const d = new Date(h.time);
    const timeStr = \`\${d.getHours()}:\${String(d.getMinutes()).padStart(2, '0')}:\${String(d.getSeconds()).padStart(2, '0')}\`;
    return \`<div class="studio-history-item hover:bg-slate-100 cursor-pointer p-1 rounded transition-colors" data-history-index="\${historyLog.length - 1 - i}">
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
}`;

content = content.replace(/function renderStudioHistory\(\)\{[\s\S]*?\n\}/, fullRenderStudioHistory);

fs.writeFileSync("app.js", content);
console.log("Patched renderStudioHistory successfully.");
