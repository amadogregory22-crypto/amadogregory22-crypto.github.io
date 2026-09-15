const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newLogo = `<button id="fullscreenAppBtn" class="brand-logo flex items-center justify-center relative overflow-hidden" title="Plein écran" aria-label="Plein écran">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A96B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2l7.5 4.5v7L12 22l-7.5-4.5v-7L12 2z"></path>
            <path d="M12 5.5l-2.5 7.5L11 16l1 1.5 1-1.5 1.5-3z" fill="#C8A96B"></path>
            <line x1="12" y1="12" x2="12" y2="15" stroke="#0F2F26" stroke-width="1.5"></line>
            <circle cx="12" cy="15.5" r="0.75" fill="#0F2F26" stroke="none"></circle>
          </svg>
        </button>`;

html = html.replace(/<button id="fullscreenAppBtn" class="brand-logo fullscreen-logo-btn"[^>]*>.*?<\/button>/, newLogo);

fs.writeFileSync('index.html', html);
console.log('Patched logo in index.html');
