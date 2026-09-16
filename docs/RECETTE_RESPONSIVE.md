# Recette responsive et accessibilité — Signature RAGT

**Version à tester :** 3.0.0  
**Date d’exécution :** …  
**Navigateur, version et système :** …  
**Exécutant :** …

Cette fiche complète les vérifications automatiques. Elle doit être renseignée avant de qualifier l’interface pour une diffusion interne.

## Préparation

1. Lancer `npm run dev` puis ouvrir le Studio.
2. Tester les deux thèmes avec une signature contenant une bannière, un logo personnalisé, un slogan et un QR.
3. Ouvrir les outils de développement du navigateur et choisir successivement les largeurs indiquées, sans zoom navigateur.

## Matrice des écrans

| Largeur | Hauteur conseillée | Clair | Sombre | Points à consigner |
|---:|---:|---|---|---|
| 390 px | 844 px | ☐ | ☐ | Bascule Modifier / Aperçu, menu mobile, champs et export accessibles. |
| 768 px | 1 024 px | ☐ | ☐ | Navigation, panneau de réglages et aperçu consultables. |
| 1 024 px | 768 px | ☐ | ☐ | En-tête, signature et commandes de diffusion sans troncature. |
| 1 280 px | 720 px | ☐ | ☐ | Trois zones du Studio lisibles, aucune commande essentielle hors fenêtre. |
| 1 440 px | 900 px | ☐ | ☐ | Composition large, défilement raisonnable et aperçu stable. |

Pour chaque case, inscrire **OK**, **anomalie** ou **non testé**, puis décrire précisément les anomalies sous la matrice.

## Parcours essentiels

Valider, à chaque largeur où ils sont proposés, que les besoins suivants demandent au plus deux choix :

| Besoin | Chemin attendu | Résultat |
|---|---|---|
| Modifier l’e-mail | Renseigner mes coordonnées → Infos → champ E-mail, ou recherche « e-mail » | ☐ |
| Changer le logo | Ajouter mes visuels → Logos, ou recherche « logo » | ☐ |
| Modifier la police | Mettre en forme → Typographie, ou recherche « police » | ☐ |
| Ajouter une image ou une campagne | Ajouter mes visuels → Images carte, ou recherche « image carte » | ☐ |
| Configurer le QR | Renseigner mes coordonnées → QR, ou recherche « QR » | ☐ |
| Sauvegarder une version | Choisir un gabarit → Versions | ☐ |
| Installer ou exporter | Vérifier et installer → Installer | ☐ |

## Clavier et lecteur d’écran

1. Recharger la page puis utiliser uniquement `Tab`, `Maj+Tab`, `Entrée`, `Espace` et `Échap`.
2. Vérifier que le focus reste visible, atteint le menu, les champs, les boutons de visibilité, l’aperçu et les exports.
3. Ouvrir la recherche, choisir « e-mail », « logo », « police », « bannière » puis « QR » : le contrôle demandé doit devenir visible et recevoir le focus.
4. Avec un lecteur d’écran, vérifier qu’un champ sans libellé visuel est annoncé avec un nom compréhensible et que les commandes actives indiquent leur état.

| Contrôle | Résultat | Observation |
|---|---|---|
| Ordre de tabulation | ☐ | |
| Focus visible | ☐ | |
| Fermeture des fenêtres et retour du focus | ☐ | |
| Libellés des champs | ☐ | |
| États actifs et erreurs | ☐ | |
| Contraste dans les deux thèmes | ☐ | |

## Anomalies

| Référence | Largeur / thème | Étapes pour reproduire | Gravité (P0/P1/P2) | Décision |
|---|---|---|---|---|
| | | | | |

## Décision de recette

- [ ] Conforme pour diffusion interne
- [ ] Conforme avec limites documentées
- [ ] À corriger avant diffusion

Nom et date de validation : …
