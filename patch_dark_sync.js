const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

js = js.replace(
  /if\(\$\("globalDarkMode"\)\) \$\("globalDarkMode"\)\.onchange=\(\)=>apply\(\(\)=>\{\n\s*state\.preferences\.globalDarkMode=\$\("globalDarkMode"\)\.checked;\n\s*document\.documentElement\.classList\.toggle\("dark-mode", !!state\.preferences\.globalDarkMode\);\n\s*\},true,"Theme sombre global"\);/,
  `if($("globalDarkMode")) $("globalDarkMode").onchange=()=>apply(()=>{
    const isDark = $("globalDarkMode").checked;
    state.preferences.globalDarkMode=isDark;
    document.documentElement.classList.toggle("dark-mode", isDark);
    localStorage.setItem("signaturePwaDarkMode", isDark ? "true" : "false");
    if($("darkModeToggle")) $("darkModeToggle").checked = isDark;
  },true,"Theme sombre global");`
);

js = js.replace(
  /toggle\.addEventListener\("change", \(e\) => \{\n\s*if \(e\.target\.checked\) \{\n\s*document\.documentElement\.classList\.add\("dark-mode"\);\n\s*localStorage\.setItem\("signaturePwaDarkMode", "true"\);\n\s*toast\("Mode sombre activé"\);\n\s*\} else \{\n\s*document\.documentElement\.classList\.remove\("dark-mode"\);\n\s*localStorage\.setItem\("signaturePwaDarkMode", "false"\);\n\s*toast\("Mode sombre désactivé"\);\n\s*\}\n\s*\}\);/,
  `toggle.addEventListener("change", (e) => {
      const isDark = e.target.checked;
      if (isDark) {
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem("signaturePwaDarkMode", "true");
        toast("Mode sombre activé");
      } else {
        document.documentElement.classList.remove("dark-mode");
        localStorage.setItem("signaturePwaDarkMode", "false");
        toast("Mode sombre désactivé");
      }
      if ($("globalDarkMode")) $("globalDarkMode").checked = isDark;
      apply(() => { state.preferences.globalDarkMode = isDark; }, false);
    });`
);

fs.writeFileSync('app.js', js);
console.log('App JS patched for dark mode sync');
