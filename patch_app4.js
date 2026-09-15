const fs = require("fs");
let content = fs.readFileSync("app.js", "utf8");

const distributeStr = `
const distributeStudioGroup = (direction) => {
  const o = studioObject();
  if (!o) return;
  let group = [];
  if (o.groupId) {
    group = studioObjects().filter(x => x.groupId === o.groupId);
  }
  if (group.length < 3) return toast("Groupez au moins 3 objets pour les distribuer.");
  
  apply(() => {
    if (direction === 'horizontal') {
      group.sort((a, b) => a.x - b.x);
      const minX = group[0].x;
      const maxX = group[group.length - 1].x;
      const step = (maxX - minX) / (group.length - 1);
      for (let i = 1; i < group.length - 1; i++) {
        group[i].x = Math.round(minX + i * step);
      }
    } else {
      group.sort((a, b) => a.y - b.y);
      const minY = group[0].y;
      const maxY = group[group.length - 1].y;
      const step = (maxY - minY) / (group.length - 1);
      for (let i = 1; i < group.length - 1; i++) {
        group[i].y = Math.round(minY + i * step);
      }
    }
  }, true, "Distribution " + direction);
};
`;

const svgExportStr = `
function exportStudioSvg() {
  const p = studioPage();
  if (!p) return;
  let svg = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${p.w}" height="\${p.h}" viewBox="0 0 \${p.w} \${p.h}">\`;
  svg += \`<rect width="\${p.w}" height="\${p.h}" fill="\${p.bg || '#ffffff'}" />\`;
  
  const sorted = [...(p.objects||[])].sort((a,b)=>(a.z||0)-(b.z||0));
  sorted.forEach(o => {
    if (o.hidden) return;
    const isImage = (o.type === 'image' || o.type === 'icon');
    let transform = \`translate(\${o.x}, \${o.y})\`;
    if (o.rotate) {
      transform += \` rotate(\${o.rotate} \${o.w/2} \${o.h/2})\`;
    }
    const opacity = o.opacity !== undefined ? o.opacity : 1;
    
    if (isImage) {
      svg += \`<image href="\${o.src}" x="0" y="0" width="\${o.w}" height="\${o.h}" transform="\${transform}" opacity="\${opacity}" preserveAspectRatio="\${o.fit==='cover'?'xMidYMid slice':'xMidYMid meet'}" />\`;
    } else if (o.type === 'text') {
      const fill = o.fill || '#000000';
      const fontSize = o.fontSize || 28;
      let textContent = o.text || '';
      textContent = textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
  download("studio-export.svg", svg, "image/svg+xml");
}
`;

content = distributeStr + svgExportStr + content;

// Bindings
content = content.replace(
  'if($("studioExportPdfBtn")) $("studioExportPdfBtn").onclick=()=>exportStudioPdf();',
  `if($("studioExportPdfBtn")) $("studioExportPdfBtn").onclick=()=>exportStudioPdf();
  if($("studioExportSvgBtn")) $("studioExportSvgBtn").onclick=exportStudioSvg;
  if($("studioFocusBtn")) $("studioFocusBtn").onclick=() => { document.body.classList.toggle("studio-focus-mode"); setTimeout(() => fitStudioZoom && fitStudioZoom(), 100); };
  if($("studioRulerBtn")) $("studioRulerBtn").onclick=() => { document.body.classList.toggle("studio-rulers-active"); };
  if($("studioDistributeHBtn")) $("studioDistributeHBtn").onclick=()=>distributeStudioGroup('horizontal');
  if($("studioDistributeVBtn")) $("studioDistributeVBtn").onclick=()=>distributeStudioGroup('vertical');`
);

fs.writeFileSync("app.js", content);
console.log("Patched JS");
