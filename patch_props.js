const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const originalProps = `
                <label>X<input id="studioObjX" type="number"></label>
                <label>Y<input id="studioObjY" type="number"></label>
                <label>Largeur<input id="studioObjW" type="number"></label>
                <label>Hauteur<input id="studioObjH" type="number"></label>
                <label>Rotation<input id="studioObjRotate" type="number"></label>
                <label>Opacité<input id="studioObjOpacity" type="range" min="0" max="1" step="0.05"></label>
                <label>Couleur<input id="studioObjFill" type="color"></label>
                <label>Texte<input id="studioObjText"></label>
                <label>Taille texte<input id="studioObjFontSize" type="number"></label>
                <label>Align. texte
                  <select id="studioObjTextAlign">
                    <option value="left">Gauche</option>
                    <option value="center">Centre</option>
                    <option value="right">Droite</option>
                  </select>
                </label>
`;

const newProps = `
                <div class="mb-4">
                  <div class="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2 pb-1 border-b border-slate-100 flex justify-between items-center">Position & Taille <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                  <div class="grid grid-cols-2 gap-2">
                    <label>X <input id="studioObjX" type="number"></label>
                    <label>Y <input id="studioObjY" type="number"></label>
                    <label>L <input id="studioObjW" type="number"></label>
                    <label>H <input id="studioObjH" type="number"></label>
                    <label class="col-span-2">Rotation <input id="studioObjRotate" type="number"></label>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2 pb-1 border-b border-slate-100 flex justify-between items-center">Apparence <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                  <label>Opacité <input id="studioObjOpacity" type="range" min="0" max="1" step="0.05"></label>
                  <label>Couleur <input id="studioObjFill" type="color"></label>
                </div>

                <div class="mb-4">
                  <div class="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2 pb-1 border-b border-slate-100 flex justify-between items-center">Typographie <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                  <label>Texte <input id="studioObjText"></label>
                  <label>Taille <input id="studioObjFontSize" type="number"></label>
                  <label>Alignement
                    <select id="studioObjTextAlign">
                      <option value="left">Gauche</option>
                      <option value="center">Centre</option>
                      <option value="right">Droite</option>
                    </select>
                  </label>
                </div>
`;

html = html.replace(originalProps.trim(), newProps.trim());

// Also style .studio-right
html = html.replace(
  '<div class="studio-layers">',
  '<div class="studio-layers mt-4 border-t border-slate-200 pt-3">'
);

fs.writeFileSync('index.html', html);
console.log('Patched props');
