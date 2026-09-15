const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

appJs = appJs.replace(
  /const prompt=\$\("aiAssetPrompt"\)\?\.value\|\|"";const type=\$\("aiAssetType"\)\?\.value\|\|"logo";toast\("Génération par IA en cours\.\.\."\);\$\("aiAssetGeneratorModal"\)\.classList\.add\("hidden"\);/,
  `const type=$("aiAssetType")?.value||"logo";const prompt=$("aiAssetPrompt-" + type)?.value||"";toast("Génération par IA en cours...");$("aiAssetGeneratorModal").classList.add("hidden");`
);
fs.writeFileSync('app.js', appJs);
