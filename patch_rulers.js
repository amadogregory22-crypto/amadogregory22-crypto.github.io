const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// replace the CSS for rulers with just space reserved
html = html.replace(/\.studio-rulers-active \.studio-canvas-wrap \{[\s\S]*?z-index: 10;\s*\}/g, `
      .studio-rulers-active .studio-canvas-wrap {
        border-top: 20px solid #e2e8f0;
        border-left: 20px solid #e2e8f0;
        position: relative;
      }
      .studio-ruler-canvas {
        position: absolute;
        pointer-events: none;
        z-index: 10;
        display: none;
      }
      .studio-rulers-active .studio-ruler-canvas { display: block; }
`);

fs.writeFileSync('index.html', html);
console.log('Patched index.html for rulers');

let app = fs.readFileSync('app.js', 'utf8');

const rulerFn = `
function updateRulers() {
  const wrap = document.getElementById("studioCanvasWrap");
  if (!wrap || !document.body.classList.contains("studio-rulers-active")) return;
  
  let topRuler = document.getElementById("studioRulerTop");
  let leftRuler = document.getElementById("studioRulerLeft");
  
  if (!topRuler) {
    topRuler = document.createElement("canvas");
    topRuler.id = "studioRulerTop";
    topRuler.className = "studio-ruler-canvas";
    topRuler.style.top = "-20px";
    topRuler.style.left = "0";
    topRuler.height = 20;
    wrap.appendChild(topRuler);
  }
  if (!leftRuler) {
    leftRuler = document.createElement("canvas");
    leftRuler.id = "studioRulerLeft";
    leftRuler.className = "studio-ruler-canvas";
    leftRuler.style.top = "0";
    leftRuler.style.left = "-20px";
    leftRuler.width = 20;
    wrap.appendChild(leftRuler);
  }
  
  const w = wrap.clientWidth;
  const h = wrap.clientHeight;
  const zoom = state.preferences.zoom || 1;
  const cw = state.canvas.width;
  const ch = state.canvas.height;
  
  // Calculate canvas offset relative to wrap
  const canvasEl = document.getElementById("studioCanvas");
  let offsetX = 0;
  let offsetY = 0;
  if (canvasEl) {
    offsetX = canvasEl.offsetLeft;
    offsetY = canvasEl.offsetTop;
  }
  
  topRuler.width = w;
  const ctxTop = topRuler.getContext("2d");
  ctxTop.clearRect(0, 0, w, 20);
  ctxTop.fillStyle = "#64748b";
  ctxTop.font = "9px sans-serif";
  ctxTop.textAlign = "center";
  ctxTop.textBaseline = "top";
  
  for(let i=0; i<cw; i+=100) {
    const screenX = offsetX + i * zoom;
    if (screenX >= 0 && screenX <= w) {
      ctxTop.fillRect(screenX, 10, 1, 10);
      ctxTop.fillText(i.toString(), screenX, 0);
    }
  }
  for(let i=50; i<cw; i+=100) {
    const screenX = offsetX + i * zoom;
    if (screenX >= 0 && screenX <= w) {
      ctxTop.fillRect(screenX, 15, 1, 5);
    }
  }

  leftRuler.height = h;
  const ctxLeft = leftRuler.getContext("2d");
  ctxLeft.clearRect(0, 0, 20, h);
  ctxLeft.fillStyle = "#64748b";
  ctxLeft.font = "9px sans-serif";
  ctxLeft.textAlign = "right";
  ctxLeft.textBaseline = "middle";
  
  for(let i=0; i<ch; i+=100) {
    const screenY = offsetY + i * zoom;
    if (screenY >= 0 && screenY <= h) {
      ctxLeft.fillRect(10, screenY, 10, 1);
      ctxLeft.save();
      ctxLeft.translate(8, screenY);
      ctxLeft.rotate(-Math.PI/2);
      ctxLeft.fillText(i.toString(), 0, 0);
      ctxLeft.restore();
    }
  }
  for(let i=50; i<ch; i+=100) {
    const screenY = offsetY + i * zoom;
    if (screenY >= 0 && screenY <= h) {
      ctxLeft.fillRect(15, screenY, 5, 1);
    }
  }
}
`;

app = app.replace('function renderStudio() {', rulerFn + '\nfunction renderStudio() {');

// Call updateRulers inside fitStudioZoom and renderStudio
app = app.replace('function fitStudioZoom() {', 'function fitStudioZoom() {\n  setTimeout(updateRulers, 50);');
app = app.replace('$("studioZoomLevel").textContent = Math.round(state.preferences.zoom * 100) + "%";', '$("studioZoomLevel").textContent = Math.round(state.preferences.zoom * 100) + "%";\n  updateRulers();');

fs.writeFileSync('app.js', app);
console.log('Patched app.js for rulers');
