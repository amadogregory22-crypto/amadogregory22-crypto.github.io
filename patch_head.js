const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const scriptStr = `
  <script>
    (function() {
      try {
        const isDark = localStorage.getItem("signaturePwaDarkMode") === "true";
        if (isDark) document.documentElement.classList.add("dark-mode");
        
        let savedState = null;
        for (let i = 34; i >= 16; i--) {
          const s = localStorage.getItem("signaturePwaV" + i);
          if (s) { savedState = JSON.parse(s); break; }
        }
        if (savedState && savedState.preferences && savedState.preferences.appTheme) {
          document.documentElement.setAttribute("data-theme", savedState.preferences.appTheme);
        } else {
          document.documentElement.setAttribute("data-theme", "ragt");
        }
      } catch(e) {}
    })();
  </script>
</head>
`;

html = html.replace('</head>', scriptStr);
fs.writeFileSync('index.html', html);
console.log('index.html patched with early theme script');
