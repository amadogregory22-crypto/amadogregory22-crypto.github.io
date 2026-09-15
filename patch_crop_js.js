const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// In renderStudioProps
app = app.replace(
  'renderStudioEffects();',
  `renderStudioEffects();
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

// In bindStudio()
app = app.replace(
  '[["studioObjX","x","number"]',
  `["studioCropTop","studioCropRight","studioCropBottom","studioCropLeft"].forEach(id => {
    if ($(id)) $(id).oninput = () => {
      const o = studioObject();
      if (!o) return;
      apply(() => {
        if (!o.crop) o.crop = { t: 0, r: 0, b: 0, l: 0 };
        const val = Number($(id).value);
        if (id.includes("Top")) o.crop.t = val;
        if (id.includes("Right")) o.crop.r = val;
        if (id.includes("Bottom")) o.crop.b = val;
        if (id.includes("Left")) o.crop.l = val;
      }, true, "Rognage");
    };
  });
  [["studioObjX","x","number"]`
);

// In studioObjectHtml
app = app.replace(
  'const flip=`scale(${e.flipX?-1:1},${e.flipY?-1:1})`;',
  'const flip=`scale(${e.flipX?-1:1},${e.flipY?-1:1})`;\n  const crop = o.crop ? `clip-path:inset(${o.crop.t||0}% ${o.crop.r||0}% ${o.crop.b||0}% ${o.crop.l||0}%);` : "";'
);

app = app.replace(
  'text-align:${o.textAlign||"left"};`;',
  'text-align:${o.textAlign||"left"};${crop}`;'
);

fs.writeFileSync('app.js', app);
console.log('Patched crop js');
