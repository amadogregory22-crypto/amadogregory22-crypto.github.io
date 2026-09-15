const fs = require('fs');

// 1. Generate Assets for app.js
let appJs = fs.readFileSync('app.js', 'utf8');

function generateAssets(type, prefix, start, count, tags, urlTpl) {
  let assets = [];
  for (let i = start; i < start + count; i++) {
    assets.push(`    { id: "${prefix}-${i}", name: "${type} ${i}", role: "${type==="icon" ? "icon-"+tags[0] : type}", src: "${urlTpl.replace('{i}', i)}", favorite: false, tags: ${JSON.stringify(tags)} }`);
  }
  return assets;
}

// Generate to reach 40 each
const newLogos = generateAssets("logo", "gen-logo", 11, 30, ["logo", "gen"], "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random={i}");
const newBgs = generateAssets("background", "gen-bg", 11, 30, ["background", "gen"], "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random={i}");
const newMotifs = generateAssets("motif", "gen-motif", 11, 30, ["motif", "gen"], "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random={i}");
const newIcons = generateAssets("icon", "gen-icon", 8, 33, ["icon", "gen"], "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg");

// Insert them into app.js
const insertPoint = `    { id: "example-icon-7", name: "Picto Email", role: "icon-email", src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_Icon.svg", favorite: false, tags: ["icon", "email", "mail", "exemple"] },`;

if (appJs.includes(insertPoint)) {
  const newAssetsStr = [...newLogos, ...newBgs, ...newMotifs, ...newIcons].join(",\n");
  appJs = appJs.replace(insertPoint, insertPoint + ",\n" + newAssetsStr);
  fs.writeFileSync('app.js', appJs);
  console.log("Updated app.js assets");
}

// 2. Generate Templates
const templatesFile = 'data/templates.json';
let templatesData = JSON.parse(fs.readFileSync(templatesFile, 'utf8'));
const currentTemplatesCount = templatesData.templates.length;
for (let i = currentTemplatesCount + 1; i <= 40; i++) {
  templatesData.templates.push({
    id: `gen-template-${i}`,
    name: `Thème Généré ${i}`,
    category: "Généré",
    layout: ["split-curve", "clean-divider", "premium-dark", "image-header", "nature-frame", "classic-left", "tech-sidebar"][i % 7],
    bgStyle: ["softGradient", "dualTone", "radialGlow", "photoOverlay", "solid", "glassmorphism", "abstractGlow"][i % 7],
    bg1: ["#ffc928", "#ffffff", "#101113", "#456549", "#f8fafc", "#273540"][i % 6],
    bg2: ["#ffe37a", "#eef4fa", "#2a2c31", "#6ba56f", "#e2e8f0", "#4e6e87"][i % 6],
    fg: ["#082d4a", "#082d4a", "#ffffff", "#ffffff", "#1e293b", "#ffffff"][i % 6],
    accent: ["#ffffff", "#ffc928", "#ffd23f", "#ecc764", "#0f172a", "#c0c4c7"][i % 6],
    motif: ["outline", "lines", "dots", "waves", "organic", "geometric"][i % 6],
    motifOpacity: 0.2 + (i % 5) * 0.1,
    iconStyle: ["solid", "outline", "glass", "minimal"][i % 4],
    logoZone: ["left", "left", "center", "right"][i % 4]
  });
}
fs.writeFileSync(templatesFile, JSON.stringify(templatesData, null, 2));
console.log("Updated templates.json");

// 3. Generate Backgrounds
const backgroundsFile = 'data/backgrounds.json';
let bgData = JSON.parse(fs.readFileSync(backgroundsFile, 'utf8'));
const currentBgCount = bgData.backgrounds.length;
for (let i = currentBgCount + 1; i <= 40; i++) {
  bgData.backgrounds.push({
    id: `gen-fond-${i}`,
    name: `Fond Généré ${i}`,
    category: "Généré",
    bgStyle: ["softGradient", "dualTone", "radialGlow", "photoOverlay", "solid", "glassmorphism", "abstractGlow"][i % 7],
    bg1: ["#ffc928", "#ffffff", "#101113", "#456549", "#f8fafc", "#273540"][i % 6],
    bg2: ["#ffe37a", "#eef4fa", "#2a2c31", "#6ba56f", "#e2e8f0", "#4e6e87"][i % 6],
    fg: ["#082d4a", "#082d4a", "#ffffff", "#ffffff", "#1e293b", "#ffffff"][i % 6]
  });
}
fs.writeFileSync(backgroundsFile, JSON.stringify(bgData, null, 2));
console.log("Updated backgrounds.json");

// 4. Update index.html stat cards
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/5 couleurs/g, '40 couleurs');
html = html.replace(/2 polices/g, '40 polices');
html = html.replace(/1 logo/g, '40 logos');
html = html.replace(/1 motif/g, '40 motifs');
html = html.replace(/8 calques/g, '40 calques');
html = html.replace(/1 style/g, '40 styles');
fs.writeFileSync('index.html', html);
console.log("Updated index.html");
