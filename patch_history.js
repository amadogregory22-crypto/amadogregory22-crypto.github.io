const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

const snapshotFn = `
function generateStudioSnapshotSvg(p) {
  if (!p) return "";
  let svg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \${p.w} \${p.h}" width="100%" height="100%">\`;
  svg += \`<rect width="\${p.w}" height="\${p.h}" fill="\${p.bg || '#ffffff'}" />\`;
  const sorted = [...(p.objects||[])].sort((a,b)=>(a.z||0)-(b.z||0));
  sorted.forEach(o => {
    if (o.hidden) return;
    const isImage = (o.type === 'image' || o.type === 'icon');
    let transform = \`translate(\${o.x}, \${o.y})\`;
    if (o.rotate) transform += \` rotate(\${o.rotate} \${o.w/2} \${o.h/2})\`;
    const opacity = o.opacity !== undefined ? o.opacity : 1;
    if (isImage) {
      svg += \`<image href="\${o.src}" x="0" y="0" width="\${o.w}" height="\${o.h}" transform="\${transform}" opacity="\${opacity}" preserveAspectRatio="\${o.fit==='cover'?'xMidYMid slice':'xMidYMid meet'}" />\`;
    } else if (o.type === 'text') {
      const fill = o.fill || '#000000';
      const fontSize = o.fontSize || 28;
      let textContent = (o.text || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      svg += \`<text x="\${o.w/2}" y="\${o.h/2 + fontSize/3}" font-family="sans-serif" font-size="\${fontSize}" fill="\${fill}" text-anchor="middle" transform="\${transform}" opacity="\${opacity}">\${textContent}</text>\`;
    } else if (o.type === 'shape') {
      const fill = o.fill || '#000000';
      if (o.shape === 'circle') {
        svg += \`<ellipse cx="\${o.w/2}" cy="\${o.h/2}" rx="\${o.w/2}" ry="\${o.h/2}" fill="\${fill}" transform="\${transform}" opacity="\${opacity}" />\`;
      } else {
        svg += \`<rect width="\${o.w}" height="\${o.h}" rx="\${o.shape==='rounded'?16:0}" fill="\${fill}" transform="\${transform}" opacity="\${opacity}" />\`;
      }
    }
  });
  svg += \`</svg>\`;
  return svg;
}
`;

content = content.replace('function pushHistory(label = "Action"){', snapshotFn + '\nfunction pushHistory(label = "Action"){');

content = content.replace(
  'historyLog.push({label: enrichedLabel, time: Date.now(), state: snap});',
  `const p = snap.studio && snap.studio.pages ? snap.studio.pages[snap.studio.selectedPage || 0] : null;
  const snapshotSvg = generateStudioSnapshotSvg(p);
  historyLog.push({label: enrichedLabel, time: Date.now(), state: snap, svg: snapshotSvg});`
);

content = content.replace(
  'return `<div class="studio-history-item hover:bg-slate-100 cursor-pointer p-1 rounded transition-colors flex items-center justify-between" data-history-index="${historyLog.length - 1 - i}">',
  `return \`<div class="studio-history-item hover:bg-slate-100 cursor-pointer p-2 border border-transparent hover:border-slate-200 rounded transition-all flex flex-col gap-1 mb-2" data-history-index="\${historyLog.length - 1 - i}">
      \${h.svg ? \`<div class="w-full h-12 bg-white border border-slate-200 rounded overflow-hidden shadow-sm flex items-center justify-center">\${h.svg}</div>\` : ''}
      <div class="flex items-center justify-between w-full">`
);

content = content.replace(
  '<span class="time text-[10px] text-slate-400 whitespace-nowrap">${timeStr}</span>\n    </div>`;',
  '<span class="time text-[10px] text-slate-400 whitespace-nowrap">${timeStr}</span>\n      </div>\n    </div>`;'
);

fs.writeFileSync('app.js', content);
console.log('Patched history visually');
