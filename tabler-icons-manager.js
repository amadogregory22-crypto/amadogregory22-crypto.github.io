/**
 * Gestionnaire des Icônes Tabler Icons
 *
 * Ce module facilite l'utilisation des icônes Tabler dans l'application
 * Les icônes sont stockées dans: icons/SVG/tabler-icons/
 */

class TablerIconManager {
  /**
   * Initialise le gestionnaire des icônes Tabler
   */
  constructor() {
    this.iconPath = 'icons/SVG/tabler-icons';
    this.defaultSize = 24;
    this.defaultColor = 'currentColor';
  }

  /**
   * Crée un élément img pour afficher une icône Tabler
   * @param {string} iconName - Nom de l'icône (sans extension .svg)
   * @param {object} options - Options (size, color, alt, classes)
   * @returns {HTMLImageElement}
   */
  createImage(iconName, options = {}) {
    const {
      size = this.defaultSize,
      color = this.defaultColor,
      alt = iconName,
      classes = ''
    } = options;

    const img = document.createElement('img');
    img.src = `${this.iconPath}/${iconName}.svg`;
    img.alt = alt;
    img.width = size;
    img.height = size;

    if (classes) {
      img.className = classes;
    }

    if (color !== 'currentColor') {
      img.style.filter = `drop-shadow(0 0 0 ${color})`;
    }

    return img;
  }

  /**
   * Crée un élément SVG pour afficher une icône Tabler (inline)
   * @param {string} iconName - Nom de l'icône
   * @param {object} options - Options (size, stroke, strokeWidth, fill)
   * @returns {SVGSVGElement}
   */
  createSVG(iconName, options = {}) {
    const {
      size = this.defaultSize,
      stroke = 'currentColor',
      strokeWidth = 2,
      fill = 'none'
    } = options;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', fill);
    svg.setAttribute('stroke', stroke);
    svg.setAttribute('stroke-width', strokeWidth);
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    // Créer un use element pour charger l'icône
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${this.iconPath}/${iconName}.svg#icon`);
    svg.appendChild(use);

    return svg;
  }

  /**
   * Injecte une icône dans un élément parent
   * @param {HTMLElement} parent - Élément parent où injecter l'icône
   * @param {string} iconName - Nom de l'icône
   * @param {object} options - Options d'affichage
   */
  inject(parent, iconName, options = {}) {
    if (!parent) {
      console.error('Parent element not found');
      return;
    }

    const img = this.createImage(iconName, options);
    parent.appendChild(img);
  }

  /**
   * Retourne une liste d'icônes Tabler populaires
   * @returns {array}
   */
  getPopularIcons() {
    return [
      'home',
      'plus',
      'minus',
      'x',
      'check',
      'edit',
      'trash',
      'download',
      'upload',
      'search',
      'settings',
      'menu',
      'folder',
      'file',
      'document',
      'link',
      'share',
      'user',
      'lock',
      'unlock',
      'eye',
      'eye-off',
      'calendar',
      'clock',
      'bell',
      'message',
      'phone',
      'mail'
    ];
  }
}

// Instance globale du gestionnaire
const tablerIcons = new TablerIconManager();

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TablerIconManager;
}

// Exemples d'utilisation:
/*

// Utilisation 1: Injection d'icône simple
const homeButton = document.getElementById('home-btn');
tablerIcons.inject(homeButton, 'home', { size: 24 });

// Utilisation 2: Créer une icône et l'ajouter
const plusIcon = tablerIcons.createImage('plus', {
  size: 32,
  classes: 'icon-button'
});
document.body.appendChild(plusIcon);

// Utilisation 3: Créer une icône SVG
const settingsIcon = tablerIcons.createSVG('settings', {
  size: 24,
  stroke: '#0066cc',
  strokeWidth: 2
});
document.getElementById('settings-container').appendChild(settingsIcon);

// Utilisation 4: Lister les icônes populaires
const popularIcons = tablerIcons.getPopularIcons();
console.log('Icônes populaires disponibles:', popularIcons);

*/

