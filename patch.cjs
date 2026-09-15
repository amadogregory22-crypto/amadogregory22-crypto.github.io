const fs = require('fs');
let code = fs.readFileSync('src/components/panels/InfoPanel.tsx', 'utf8');
code = code.replace(
  /<div>\s*<label className="text-\[11px\] text-slate-600 block mb-1">E-mail<\/label>[\s\S]*?<div className="col-span-2">\s*<label className="text-\[11px\] text-slate-600 block mb-1">Adresse<\/label>/,
`<div>
              <label className="text-[11px] text-slate-600 block mb-1">E-mail</label>
              <input
                type="text"
                value={labels.email}
                onChange={(e) => updateLabel('email', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-600 block mb-1">Standard</label>
              <input
                type="text"
                value={labels.standardPhone || ''}
                onChange={(e) => updateLabel('standardPhone', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-600 block mb-1">Direct</label>
              <input
                type="text"
                value={labels.directPhone || ''}
                onChange={(e) => updateLabel('directPhone', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-600 block mb-1">Fax</label>
              <input
                type="text"
                value={labels.fax || ''}
                onChange={(e) => updateLabel('fax', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-600 block mb-1">Site Web</label>
              <input
                type="text"
                value={labels.website}
                onChange={(e) => updateLabel('website', e.target.value)}
                className="w-full px-2 py-1 border rounded bg-slate-50"
              />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] text-slate-600 block mb-1">Adresse</label>`
);
fs.writeFileSync('src/components/panels/InfoPanel.tsx', code);
