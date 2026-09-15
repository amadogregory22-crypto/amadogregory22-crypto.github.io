/**
 * Script pour charger et intégrer les icônes Tabler Icons dans la grille d'icônes
 * Génère une liste de tous les fichiers SVG du dossier icons/SVG/tabler-icons/
 */

/**
 * Récupère la liste de tous les fichiers d'icônes Tabler
 * @returns {Promise<Array>} Liste des icônes avec leurs métadonnées
 */
async function loadTablerIcons() {
  try {
    const iconsPath = './icons/SVG/tabler-icons/';

    // Créer une liste des icônes les plus populaires/utiles pour l'email signature
    const popularTablerIcons = [
      // Communication
      'mail.svg', 'phone.svg', 'device-mobile.svg', 'message.svg',
      // Web & Social
      'link.svg', 'world.svg', 'globe.svg',
      'brand-facebook.svg', 'brand-twitter.svg', 'brand-linkedin.svg',
      'brand-instagram.svg', 'brand-youtube.svg',
      // Users & Team
      'user.svg', 'users.svg', 'building.svg', 'building-community.svg',
      // Documents & Files
      'file.svg', 'file-text.svg', 'pdf.svg', 'folder.svg',
      // Tools & Utilities
      'settings.svg', 'tools.svg', 'tool.svg', 'adjustments-horizontal.svg',
      // Business
      'briefcase.svg', 'building-store.svg', 'id-badge.svg', 'credit-card.svg',
      // Calendar & Time
      'calendar.svg', 'clock.svg', 'history.svg', 'clock-hour-12.svg',
      // Common
      'star.svg', 'heart.svg', 'check.svg', 'x.svg',
      'arrow-right.svg', 'arrow-down.svg', 'chevron-right.svg',
      'plus.svg', 'minus.svg', 'info-circle.svg', 'alert-triangle.svg',
      // Decorative
      'sparkles.svg', 'leaf.svg', 'flower.svg', 'tree.svg',
      // Industry specific
      'wheat.svg', 'plant.svg', 'building-factory.svg', 'tractor.svg'
    ];

    const icons = [];

    // Ajouter les icônes populaires de Tabler
    for (const iconName of popularTablerIcons) {
      const id = `tabler-${iconName.replace('.svg', '')}`;
      const name = iconName
        .replace('.svg', '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

      icons.push({
        id: id,
        name: `Tabler: ${name}`,
        role: `icon-tabler-${iconName.replace('.svg', '')}`,
        src: `${iconsPath}${iconName}`,
        favorite: false,
        tags: ["icon", "tabler", "svg", name.toLowerCase().replace(/\s+/g, '-')]
      });
    }

    console.log(`✓ Chargé ${icons.length} icônes Tabler populaires`);
    return icons;

  } catch (error) {
    console.error('❌ Erreur lors du chargement des icônes Tabler:', error);
    return [];
  }
}

/**
 * Intègre les icônes Tabler dans l'état global
 */
async function integrateTablerIcons() {
  try {
    // Charger les icônes Tabler
    const tablerIcons = await loadTablerIcons();

    // Ajouter à l'état global si disponible
    if (typeof state !== 'undefined' && state.assets) {
      state.assets.push(...tablerIcons);
      console.log(`✓ ${tablerIcons.length} icônes Tabler intégrées à state.assets`);
    }

    // Ajouter au DEFAULT_STATE si disponible
    if (typeof DEFAULT_STATE !== 'undefined' && DEFAULT_STATE.assets) {
      DEFAULT_STATE.assets.push(...tablerIcons);
      console.log(`✓ ${tablerIcons.length} icônes Tabler intégrées à DEFAULT_STATE.assets`);
    }

    return tablerIcons;

  } catch (error) {
    console.error('❌ Erreur lors de l\'intégration des icônes Tabler:', error);
    return [];
  }
}

/**
 * Génère du HTML pour afficher les icônes Tabler dans une grille
 * @param {number} limit Nombre d'icônes à afficher (par défaut: 50)
 * @returns {Promise<string>} HTML de la grille
 */
async function generateTablerIconsHTML(limit = 50) {
  try {
    const icons = await loadTablerIcons();
    const displayIcons = icons.slice(0, limit);

    let html = '<div class="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-3">';

    for (const icon of displayIcons) {
      html += `
        <div class="flex flex-col items-center gap-2 p-3 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-all cursor-pointer group" data-icon-id="${icon.id}">
          <div class="w-12 h-12 flex items-center justify-center">
            <img src="${icon.src}" alt="${icon.name}" class="w-full h-full object-contain" loading="lazy" />
          </div>
          <span class="text-[10px] font-medium text-center text-slate-600 group-hover:text-slate-800 line-clamp-2">${icon.name.replace('Tabler: ', '')}</span>
        </div>
      `;
    }

    html += '</div>';
    return html;

  } catch (error) {
    console.error('❌ Erreur lors de la génération du HTML:', error);
    return '<p class="text-red-500">Erreur lors du chargement des icônes</p>';
  }
}

/**
 * Initialise les icônes Tabler au chargement de la page
 */
document.addEventListener('DOMContentLoaded', async function() {
  console.log('🚀 Initialisation des icônes Tabler...');

  // Attendre que l'état global soit prêt
  if (typeof state !== 'undefined') {
    const tablerIcons = await integrateTablerIcons();
    console.log(`✓ Initialisation terminée: ${tablerIcons.length} icônes disponibles`);

    // Dispatcher un événement personnalisé pour signaler que les icônes sont chargées
    window.dispatchEvent(new CustomEvent('tabler-icons-loaded', { detail: { count: tablerIcons.length } }));
  }
});

// Export pour utilisation en modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadTablerIcons,
    integrateTablerIcons,
    generateTablerIconsHTML
  };
}

