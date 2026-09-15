const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// The bad block:
const badBlock = `  renderStudioEffects();
  if (o && (o.type === "image" || o.type === "icon")) {
    if ($("studioCropTool")) $("studioCropTool").style.display = "block";
    const crop = o.crop || { t: 0, r: 0, b: 0, l: 0 };
    if ($("studioCropTop")) $("studioCropTop").value = crop.t;
    if ($("studioCropRight")) $("studioCropRight").value = crop.r;
    if ($("studioCropBottom")) $("studioCropBottom").value = crop.b;
    if ($("studioCropLeft")) $("studioCropLeft").value = crop.l;
  } else {
    if ($("studioCropTool")) $("studioCropTool").style.display = "none";
  }`;

app = app.replace(badBlock, '  renderStudioEffects();');

// Now we need to insert the crop logic into renderStudioProps.
// Let's find renderStudioProps
app = app.replace(
  'function renderStudioProps(){\n  const o=studioObject();\n  if($("studioSelectedInfo")) $("studioSelectedInfo").textContent=o?`${o.type} · ${o.w}×${o.h}`:"Aucun objet";\n  renderStudioEffects();',
  `function renderStudioProps(){
  const o=studioObject();
  if($("studioSelectedInfo")) $("studioSelectedInfo").textContent=o?\`\${o.type} · \${o.w}×\${o.h}\`:"Aucun objet";
  renderStudioEffects();
  if (o && (o.type === "image" || o.type === "icon")) {
    if ($("studioCropTool")) $("studioCropTool").style.display = "block";
    const crop = o.crop || { t: 0, r: 0, b: 0, l: 0 };
    if ($("studioCropTop")) $("studioCropTop").value = crop.t;
    if ($("studioCropRight")) $("studioCropRight").value = crop.r;
    if ($("studioCropBottom")) $("studioCropBottom").value = crop.b;
    if ($("studioCropLeft")) $("studioCropLeft").value = crop.l;
  } else {
    if ($("studioCropTool")) $("studioCropTool").style.display = "none";
  }`
);

fs.writeFileSync('app.js', app);
console.log('Fixed crop js');
