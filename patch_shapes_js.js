const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

const oldShapeLogic = `if($("importShapeBtn")) $("importShapeBtn").onclick=()=>$("shapeInput").click();`;
const newShapeLogic = `if($("importShapeBtn")) $("importShapeBtn").onclick=()=>$("addShapeModal").classList.remove('hidden');`;

js = js.replace(oldShapeLogic, newShapeLogic);

const addShapeFn = `
window.addStandardShape = function(type) {
  document.getElementById('addShapeModal').classList.add('hidden');
  let svg = '';
  let name = '';
  if (type === 'square') {
    svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="currentColor"/></svg>';
    name = 'Carré';
  } else if (type === 'circle') {
    svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="currentColor"/></svg>';
    name = 'Cercle';
  } else if (type === 'line') {
    svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10"><rect width="100" height="10" fill="currentColor"/></svg>';
    name = 'Ligne';
  }
  
  if (svg) {
    const src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    apply(() => {
      state.assets.push({
        src,
        name: name,
        type: 'shape',
        tags: ['Forme']
      });
    }, true, "Ajout forme");
    toast("Forme ajoutée à la bibliothèque.");
    renderAssets();
  }
};
`;

js = js + "\n" + addShapeFn;

fs.writeFileSync('app.js', js);
