# Signature Studio (v2.0 Clean Architecture)

> **Signature Studio** est un studio professionnel modulaire de détection, rétro-ingénierie et composition de signatures e-mail d'entreprise haute fidélité compatibles avec **Microsoft Outlook** (New Outlook, OWA et Outlook classique Word-Engine).

---

## 🏗️ Architecture du Projet

Le projet a été intégralement reconstruit selon une séparation stricte des responsabilités :

```text
signature-studio/
├── frontend/                     # Application SPA React 18 + TypeScript + Vite + Zustand + Konva.js
│   ├── src/
│   │   ├── app/                  # Composant racine et orchestration des vues
│   │   ├── canvas/               # Moteur graphique Konva (multi-layers, transformers, zoom/pan)
│   │   ├── components/           # Composants atomiques (Header, boutons, alertes)
│   │   ├── features/             # Modules organisés par domaine métier
│   │   │   ├── import/           # Étape 1 : Upload immuable & sécurisé de l'image source
│   │   │   ├── analysis/         # Étape 2 : Suivi temps réel des détecteurs spécialisés
│   │   │   ├── review/           # Étape 3 : Revue non destructive & ajustement des boîtes
│   │   │   ├── editor/           # Étape 4 : Atelier PAO (Contenu, Couleurs, Objets, Ressources, Format)
│   │   │   ├── preview/          # Étape 5 : Simulateurs e-mail Outlook (New Outlook, OWA, Classique)
│   │   │   └── export/           # Étape 6 : Génération de packages ZIP & export HTML
│   │   ├── services/             # Client API REST
│   │   ├── store/                # Gestion d'état centralisé & Single Source of Truth (fieldBinding)
│   │   └── types/                # Types TypeScript stricts
│   └── package.json
│
├── backend/                      # API REST Python 3.11 + FastAPI + Computer Vision & OCR
│   ├── app/
│   │   ├── api/                  # Contrôleurs REST FastAPI (v1/images, v1/projects, v1/documents, v1/render)
│   │   ├── core/                 # Configuration Pydantic Settings & logging JSON
│   │   ├── models/               # Modèles relationnels SQLAlchemy 2.0 (SQLite / PostgreSQL)
│   │   ├── repositories/         # Couche d'accès aux données découplée (Repository Pattern)
│   │   ├── schemas/              # Schémas de validation Pydantic V2
│   │   └── services/             # Logique métier pure
│   │       ├── image_processing/ # Extraction de palette dominante K-Means & OpenCV
│   │       ├── ocr/              # Moteur Tesseract avec boîtes et confiances
│   │       ├── qr/               # Décodeur physique de QR Code OpenCV
│   │       ├── classification/   # Heuristiques sémantiques & filtrage anti-slogans (RAGT, CULTIVONS, etc.)
│   │       ├── logos/            # Détection de zones graphiques
│   │       ├── icons/            # Analyse spatiale de proximité des pictogrammes
│   │       ├── social/           # Détection d'alignements de réseaux sociaux
│   │       ├── fusion/           # Dédoublonnage géométrique IoU
│   │       └── outlook/          # Renderers HTML purs (Modern & Classic Outlook)
│   ├── tests/                    # Tests unitaires Pytest
│   └── requirements.txt
│
├── shared/                       # Schémas JSON partagés
├── tests/e2e/                    # Tests End-to-End Playwright
└── docker-compose.yml            # Déploiement conteneurisé
```

---

## 🚀 Démarrage Rapide

### 1. Démarrer le Backend Python FastAPI
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
*L'API est accessible sur `http://127.0.0.1:8000/docs` (Swagger UI).*

### 2. Démarrer le Frontend React / Vite
```bash
cd frontend
npm install
npm run dev
```
*L'application web démarre sur `http://127.0.0.1:3000`.*

---

## 🧪 Exécution des Tests Automatisés

### Tests Unitaires Backend (Pytest)
```bash
cd backend
.\.venv\Scripts\pytest tests/ -v
```

### Tests End-to-End (Playwright)
```bash
cd tests/e2e
npx playwright test
```

---

## 🛡️ Règles Métier & Garanties Clés
1. **Source Immuable** : L'image source originale n'est jamais modifiée, ni étirée, ni injectée en arrière-plan du document exporté.
2. **Single Source of Truth (`fieldBinding`)** : Les données textuelles (nom, email, téléphone, etc.) sont centralisées dans `document.fields` ; toute modification se propage instantanément à travers l'inspecteur, le formulaire, le canevas et les moteurs de rendu.
3. **Pure Outlook HTML** : Génération sans CSS Grid, sans Flexbox bloquant et sans position absolue pour garantir un affichage irréprochable sur tous les clients Microsoft Outlook (Web, macOS, Windows 2013-2021).
