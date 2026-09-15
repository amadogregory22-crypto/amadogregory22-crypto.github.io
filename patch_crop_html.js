const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const cropHtml = `
                <div id="studioCropTool" style="display:none;" class="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong class="block text-xs mb-2">Rognage (Crop %)</strong>
                  <div class="grid grid-cols-2 gap-2">
                    <label class="text-[10px]">Haut <input type="number" id="studioCropTop" min="0" max="100" value="0"></label>
                    <label class="text-[10px]">Bas <input type="number" id="studioCropBottom" min="0" max="100" value="0"></label>
                    <label class="text-[10px]">Gauche <input type="number" id="studioCropLeft" min="0" max="100" value="0"></label>
                    <label class="text-[10px]">Droite <input type="number" id="studioCropRight" min="0" max="100" value="0"></label>
                  </div>
                </div>
`;

html = html.replace('</select>\n                </label>', '</select>\n                </label>' + cropHtml);
fs.writeFileSync('index.html', html);
console.log('Patched crop html');
