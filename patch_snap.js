const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// replace studioSnap function
const snapFn = `
function studioSnap(v, isX = true, currentObjId = null) {
  if (!state.studio.smartGuides) return Math.round(v);
  const step = state.studio.gridSize || 12;
  const gridSnap = Math.round(v / step) * step;
  
  if (!currentObjId) return gridSnap;
  
  // check snapping to other elements
  const tolerance = 5;
  const objs = studioObjects();
  let bestSnap = gridSnap;
  let minDiff = Math.abs(v - gridSnap);
  
  for (const o of objs) {
    if (o.id === currentObjId || o.hidden) continue;
    const targetVal = isX ? o.x : o.y;
    if (Math.abs(v - targetVal) < tolerance && Math.abs(v - targetVal) < minDiff) {
      minDiff = Math.abs(v - targetVal);
      bestSnap = targetVal;
    }
    // Also snap to centers or edges if needed (simplified here to top/left)
  }
  
  return bestSnap;
}
`;

app = app.replace(/function studioSnap\(v\)\{\s*const step = state\.studio\.gridSize \|\| 12;\s*return state\.studio\.snap \? Math\.round\(v\/step\)\*step : Math\.round\(v\);\s*\}/, snapFn);

app = app.replace('o.x = studioSnap(newX);', 'o.x = studioSnap(newX, true, o.id);');
app = app.replace('o.y = studioSnap(newY);', 'o.y = studioSnap(newY, false, o.id);');

// update smartGuides button state
app = app.replace(
  'const smartGuidesBtn = $("studioSmartGuidesBtn");',
  'const smartGuidesBtn = $("studioSmartGuidesBtn");\n  if(smartGuidesBtn) smartGuidesBtn.classList.toggle("bg-slate-200", !!state.studio.smartGuides);'
);

fs.writeFileSync('app.js', app);
console.log('Patched snap');
