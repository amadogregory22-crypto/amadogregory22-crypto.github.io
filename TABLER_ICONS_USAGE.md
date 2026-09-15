# Utilisation des Icônes Tabler Icons

## 📦 Installation

Les icônes Tabler ont été installées via npm :
```bash
npm install @tabler/icons
```

## 📁 Localisation

Les icônes SVG sont disponibles à :
- **Source npm** : `node_modules/@tabler/icons/icons/outline/` (5093 icônes)
- **Dossier application** : `icons/SVG/tabler-icons/` (copie locale pour utilisation facile)

## 🎯 Utilisation dans HTML

### Option 1 : Intégration directe avec `<img>`
```html
<img src="icons/SVG/tabler-icons/home.svg" alt="Home" width="24" height="24">
```

### Option 2 : Intégration avec `<svg>` (inline)
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <use xlink:href="icons/SVG/tabler-icons/home.svg#icon"></use>
</svg>
```

### Option 3 : Intégration avec CSS background-image
```css
.icon-home {
  background-image: url('icons/SVG/tabler-icons/home.svg');
  background-size: 24px 24px;
  width: 24px;
  height: 24px;
}
```

## 🎨 Exemples d'icônes disponibles

Voici quelques icônes Tabler populaires et leurs noms de fichiers :
- `home.svg` - Accueil
- `download.svg` - Télécharger
- `upload.svg` - Télécharger vers
- `edit.svg` - Éditer
- `trash.svg` - Supprimer
- `plus.svg` - Ajouter
- `minus.svg` - Retirer
- `search.svg` - Rechercher
- `settings.svg` - Paramètres
- `user.svg` - Utilisateur
- `menu.svg` - Menu
- `close.svg` - Fermer
- `check.svg` - Valider
- `x.svg` - Annuler
- `folder.svg` - Dossier
- `file.svg` - Fichier
- `document.svg` - Document
- `link.svg` - Lien
- `share.svg` - Partager
- `download-circle.svg` - Télécharger (cercle)

## 📚 Rechercher des icônes

Vous pouvez explorer toutes les icônes disponibles sur :
https://tabler-icons.io/

## 💡 Intégration JavaScript

Pour charger dynamiquement une icône :
```javascript
function loadIcon(iconName) {
  const img = document.createElement('img');
  img.src = `icons/SVG/tabler-icons/${iconName}.svg`;
  img.alt = iconName;
  img.width = 24;
  img.height = 24;
  return img;
}

// Utilisation
const homeIcon = loadIcon('home');
document.body.appendChild(homeIcon);
```

## ⚙️ Personnalisation des icônes

Les icônes SVG peuvent être personnalisées via CSS :
```css
.icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon.large {
  width: 48px;
  height: 48px;
}

.icon.text-primary {
  stroke: var(--primary-color);
}
```

## 📝 Mise à jour des icônes

Pour mettre à jour les icônes locales avec la dernière version depuis npm :
```bash
# Supprimer le dossier local
rm -r icons/SVG/tabler-icons

# Réinstaller depuis npm (voir script update-tabler-icons.ps1)
```

## ✨ Notes

- Les icônes Tabler sont au format **SVG** pour une meilleure qualité et flexibilité
- Elles sont **scalables** et **personnalisables** via CSS
- Le pack contient des variantes **outline** (contour) et **filled** (rempli)
- Compatible avec tous les navigateurs modernes

---

**Dernière mise à jour** : 2 juillet 2026
**Nombre total d'icônes** : 5093 (format outline)

