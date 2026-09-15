const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

const oldFilterLogic = `return (f==="all" || (f==="favorite"?a.favorite:kind===f)) && formatOk && tagOk && (!q || text.includes(q));`;
const newFilterLogic = `
    let catOk = true;
    if (f.startsWith("cat_")) {
      catOk = (a.customCategoryId === f.replace("cat_", ""));
    } else {
      catOk = (f==="all" || (f==="favorite"?a.favorite:kind===f));
    }
    return catOk && formatOk && tagOk && (!q || text.includes(q));`;

js = js.replace(oldFilterLogic, newFilterLogic);
fs.writeFileSync('app.js', js);
