# Signature RAGT

Studio de composition de signatures e-mail RAGT Semences **v3.0.0**, avec un mode collaborateur, des configurations JSON et deux exports distincts.

## Démarrer

Prérequis : Node.js 22 ou version compatible.

```sh
npm install
npm run dev
```

L’application locale est servie sur l’adresse affichée par Vite. Aucun jeton d’IA n’est nécessaire aux fonctions de signature.

## Vérifier et construire

```sh
npm test      # gabarits A–I, QR, portail autonome, slogan, bannière, normalisation et campagnes
npm run lint  # contrôle TypeScript
npm run build # application, portail par défaut et serveur
```

## Exports

- **Signature HTML** : le HTML exact de l’aperçu actuel, avec les images qui peuvent être embarquées, prêt à copier ou ouvrir.
- **Portail collaborateur** : formulaire autonome. Les logos et bannières sont convertis en ressources embarquées lorsque le navigateur l’autorise ; un message signale toute image restée externe. Son moteur QR est embarqué et régénère le code après une modification des coordonnées.
- **Configuration JSON** : enveloppe versionnée compatible avec les exports précédents et les configurations brutes historiques.

Les signatures déjà collées dans une messagerie ne peuvent pas être modifiées à distance. Une campagne expirée est retirée seulement des nouvelles signatures générées.

## Compatibilité

Les vérifications affichées dans l’application sont automatiques. La recette manuelle de la première livraison est consignée pour Outlook Windows classique, New Outlook et Outlook Web ; les versions de client n’ont pas été communiquées. Outlook mobile, Gmail Web et Outlook.com restent à tester.

Le rapport de suivi fonctionnel est disponible dans [docs/ETAT_DES_LIEUX_INTERFACE_2026-09-15.md](docs/ETAT_DES_LIEUX_INTERFACE_2026-09-15.md). Les fiches à compléter lors des essais sont dans [docs/RECETTE_OUTLOOK.md](docs/RECETTE_OUTLOOK.md) et [docs/RECETTE_RESPONSIVE.md](docs/RECETTE_RESPONSIVE.md).

Le référentiel de conception (besoin, hiérarchie, grille, wireframes, composants, variantes et critères de recette) est dans [docs/SYSTEME_CARTE_RAGT.md](docs/SYSTEME_CARTE_RAGT.md).
L’état de preuve de chaque exigence de livraison est dans [docs/AUDIT_LIVRAISON_CARTE_RAGT_2026-09-16.md](docs/AUDIT_LIVRAISON_CARTE_RAGT_2026-09-16.md).
