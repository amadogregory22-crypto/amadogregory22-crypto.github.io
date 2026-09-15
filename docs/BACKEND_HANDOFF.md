# Handoff Backend (V3 - Persistance et Prisma)

Ce document dÃ©crit l'architecture du backend suite au Lot 3, qui a introduit une vraie base de donnÃ©es PostgreSQL via l'ORM Prisma.

## Architecture Actuelle

Le backend est une application Node.js / Express Ã©crite en TypeScript, avec Prisma comme ORM.
- **Port** : 3001
- **Base de donnÃ©es** : PostgreSQL 15 (via Docker)
- **Permissions**: Verify READ_ONLY cannot upload. Verify USER cannot validate.

## Lot 7 - GÃ©nÃ©ration Massive (Import CSV)
- **Routes** : `POST /api/imports` pour parser le CSV, `POST /api/imports/:id/validate` pour valider, `POST /api/imports/:id/generate` pour gÃ©nÃ©rer, `GET /api/imports/:id/export` pour tÃ©lÃ©charger le ZIP.
- **Base de donnÃ©es** : ModÃ¨les `CollaboratorImportBatch`, `CollaboratorImportRow`, `SignatureGenerationBatch`, `SignatureGenerationItem`, `GenerationReport` ajoutÃ©s.
- **SÃ©curitÃ©** : Validation d'encodage (UTF-8 prioritaire avec fallback Latin-1), limite max de 5 Mo et 5000 lignes.
- **Export** : CrÃ©ation d'un fichier ZIP avec les HTML, un manifest.json et un rapport des erreurs. TÃ©lÃ©chargement via endpoint protÃ©gÃ© sans fuite de chemins systÃ¨me.nt gÃ©nÃ©rÃ©

## Endpoints API

### Configuration & Health
- `GET /api/health` : Ã‰tat des services (DB, IA, Connecteurs).
- `GET /api/config/public` : Feature flags et config UI.
- `GET /api/auth/me` : Profil de l'utilisateur courant (Mock Marie Dubois pour l'instant).
- `GET /api/stats/dashboard` : Stats consolidÃ©es (MockÃ©es pour l'instant).

### Signatures (CRUD Complet)
- `GET /api/signatures` : Liste des signatures (triÃ©es par updatedAt desc).
- `POST /api/signatures` : CrÃ©ation d'une nouvelle signature (liÃ©e au premier utilisateur en base).
- `GET /api/signatures/:id` : RÃ©cupÃ¨re une signature via ID UUID.
- `PUT /api/signatures/:id` : Met Ã  jour une signature existante.
- `DELETE /api/signatures/:id` : Supprime dÃ©finitivement la signature.

### Audit
- `GET /api/audit-logs` : 50 derniÃ¨res actions effectuÃ©es (seed, etc.).

## ModÃ¨les Prisma
- **User** : ModÃ¨le collaborateur Ã©tendu (`permissions`, `department`, etc.).
- **Signature** : Contient tous les champs gÃ©nÃ©rÃ©s par le Frontend (`firstName`, `templateId`, `themeColor`, etc.).
- **AuditLog** : Pour la traÃ§abilitÃ©.

> [!WARNING]
> La DB cible est PostgreSQL. Vous devez impÃ©rativement disposer de Docker pour exÃ©cuter le service en local, via la commande `docker compose up -d postgres`.

## Lot 6 - Assets Library
- **Routes**: Added /api/assets endpoints with strict Multer upload logic.
- **DB**: Added Asset, AssetVersion, AssetUsage, AssetTag models in Prisma.
- **Security**: Strict extension checking. SVG is blocked. Storage path is hidden from responses. Archiving replaces physical deletion.

## Validation réelle PostgreSQL / Docker (Phase 4.3)
Cette section atteste des commandes et de l'état de l'infrastructure Docker/PostgreSQL.

- **Commandes exactes pour démarrer localement** :
  1. docker compose config (Vérification de la syntaxe et des volumes)
  2. docker compose up -d postgres (Démarrage du conteneur en arrière-plan)
  3. cd backend && npx prisma migrate dev (Création des tables)
- **Statut réel actuel** : L'environnement Docker / PostgreSQL est parfaitement configuré (voir docker-compose.yml), mais le lancement physique du conteneur doit être fait sur le poste hôte final.
- **Fallback Mémoire** : En développement, si PostgreSQL est absent, l'application peut fonctionner en mémoire si ENABLE_MEMORY_FALLBACK=true est passé en variable d'environnement. **Ce fallback est strictement interdit et bloqué en production.**
- **Limites** : Les données mockées via le fallback disparaissent au redémarrage.
- **Comment vérifier la persistance réelle** :
  1. Lancez PostgreSQL (docker compose up -d postgres).
  2. Allez dans le Studio graphique (via le navigateur) et sauvegardez un projet.
  3. Redémarrez le backend (Ctrl+C puis 
pm run dev).
  4. Rechargez la page : le projet doit être intact.
- **Comment redémarrer proprement** : docker compose restart postgres puis redémarrage du backend.
- **Comment diagnostiquer une erreur DATABASE_URL** : Si l'API renvoie une erreur 500 ou si Prisma échoue à se connecter, vérifiez que DATABASE_URL dans le fichier .env du backend correspond exactement à : postgresql://ragt_admin:ragt_password@localhost:5432/ragt_studio?schema=public (Remplacez postgres par localhost si exécuté en dehors de Docker).
