# Packaging Signature Studio

## Objectif

Garder une seule application front et proposer deux distributions :
- PWA installable depuis Chrome ou Edge ;
- application Windows `.exe` via Electron.

## PWA locale

```bash
npm install
npm start
```

Ouvrir `http://localhost:4173`, puis utiliser le bouton `Installer` du navigateur ou de l'application.

Avantages :
- leger ;
- mise a jour simple ;
- fonctionne offline grace au service worker ;
- pas d'installateur lourd.

Inconvenients :
- depend du navigateur ;
- installation PWA moins familiere pour certains utilisateurs ;
- HTTPS requis hors localhost pour une vraie installation.

## Application Windows

Lancer en mode bureau :

```bash
npm install
npm run electron
```

Generer l'installateur et la version portable :

```bash
npm run build:win
```

Les sorties sont creees dans `dist/`.

Avantages :
- experience plus proche d'un logiciel classique ;
- raccourcis bureau et menu Demarrer ;
- distribution portable possible.

Inconvenients :
- plus lourd qu'une PWA ;
- build a maintenir ;
- signature de code recommandee pour eviter les alertes Windows SmartScreen.

## Priorite conseillee

1. Stabiliser la PWA et l'interface responsive.
2. Utiliser Electron pour les tests internes Windows.
3. Ajouter ensuite signature de code, auto-update et installateur final.
