# Audit de livraison — Carte RAGT

Date : 16 septembre 2026  
Portée : Studio de signature, signature HTML, fichier HTML téléchargé et portail collaborateur autonome.

Ce document sépare volontairement les contrôles exécutés des recettes à mener dans les clients de messagerie. Un contrôle interne ne constitue pas une validation Outlook.

## Éléments prouvés par le dépôt et les tests

| Exigence | État | Preuve actuelle |
| --- | --- | --- |
| Brief, inventaire et hiérarchie des informations | Fait | `SYSTEME_CARTE_RAGT.md`, onglet **Brief** du Studio. |
| Charte, grille, tailles et marges | Fait | Design system RAGT, grilles et échelle d’espacement documentés. |
| Wireframes et structures | Fait | Miniatures A–I et mode noir et blanc dans **Gabarit > Structure**. |
| Variantes corporate, compacte, carte, premium, QR, réseaux, image et mobile | Fait | Préréglages, visibilité et composants de `SignatureState`. |
| Composants indépendants | Fait | Logo, identité, coordonnées, réseaux, QR, image/campagne, slogan et séparateur sont tous configurés depuis l’état unique. |
| Réorganisation de contenu | Fait | `blockOrder` est appliqué dans les structures centrée, horizontales et verticales. Les positions de colonne sont explicitées dans l’interface. |
| QR réellement généré | Fait | QR vCard, URL, e-mail, téléphone et texte libre testés avec génération locale. |
| Logo sans déformation | Fait | Conservation de ratio, diagnostic de ratio et préréglages testés. |
| Données longues | Fait | Les neuf structures conservent noms, fonction, e-mail et adresse longs ; les contacts reçoivent une règle de retour à la ligne. |
| Navigation, recherche et focus | Fait | Cinq destinations, résultats synonymes, focus du contrôle cible et dialogue clavier cyclé. |
| Page Studio sans défilement global | Fait | Racine à hauteur viewport ; seuls navigation et panneaux défilent. |
| Portail hors connexion | Fait | Images embarquées, runtime QR local, absence d’URL d’image externe contrôlée. |
| Export JSON et révisions | Fait | Normalisation d’anciens fichiers, enveloppe versionnée, révisions locales limitées et récupération après réinitialisation. |
| Campagnes | Fait | Dates de début/fin, absence d’effet rétroactif sur une signature déjà collée, testées. |
| Diagnostic de conception | Fait | Fonction, ratio logo, QR, contraste QR, liens sociaux et texte alternatif d’image contrôlés. |

## Commandes exécutées le 16 septembre 2026

```text
npm run lint   → succès
npm test       → succès
npm run build  → succès
```

Les tests couvrent les structures A–I, les données longues, les options QR, les éléments masqués, les campagnes, les révisions, les sorties du Studio et le portail autonome. Les scripts sont [verifySignature.ts](../scripts/verifySignature.ts), [verifyNavigation.ts](../scripts/verifyNavigation.ts) et [verifyPortalArtifact.ts](../scripts/verifyPortalArtifact.ts).

## Recette de clients

La recette datée du 16 septembre 2026 est validée par le demandeur pour Outlook Windows classique, New Outlook et Outlook Web : collage, envoi/réception, réponse, transfert, clair/sombre et images bloquées. Les versions de clients ne sont pas communiquées ; cette limite est enregistrée dans [RECETTE_OUTLOOK.md](RECETTE_OUTLOOK.md).

Outlook mobile, Gmail Web et Outlook.com restent hors périmètre de la première livraison et ne sont pas déclarés validés.

## Conclusion de conception

La carte est livrée comme un système HTML modulaire, et non comme une image figée. Les données et la charte peuvent être modifiées sans perdre les logos, QR, réseaux, image de carte ou structure sélectionnée. La recette manuelle requise pour la première livraison est validée ; les recettes mobile et Gmail peuvent être ajoutées ultérieurement.
