# Guide de DÃ©veloppement - RAGT Communication Studio

### Module CrÃ©ation (Signature V2)
Le module d'Ã©dition de signature est pleinement fonctionnel (V2.0) :
- Champs d'identitÃ© complets et rÃ©seaux sociaux.
- 3 Templates HTML (Standard, Compact, BanniÃ¨re).
- Rendu compatible Microsoft Outlook (tableaux HTML bruts avec styles inline).
- Audit de qualitÃ© en temps rÃ©el (dÃ©tection d'erreurs, calcul du poids).
- Export HTML.

Ce document rassemble les instructions pour installer, lancer et tester l'application en environnement de dÃ©veloppement local.

## PrÃ©requis
- **Node.js** v20+
- **Docker** & **Docker Compose** (optionnel pour le dev local, requis pour la prod)

## ğŸ“¦ Installation
L'application utilise un monorepo simplifiÃ©. L'installation Ã  la racine installe automatiquement les dÃ©pendances du frontend et du backend.
```bash
npm install
```

## 1. PrÃ©requis
- Node.js >= 18.0
- NPM >= 9.0
- Docker et Docker Compose (pour PostgreSQL)

## 2. DÃ©marrer la Base de DonnÃ©es (Lot 3)

```bash
docker compose up -d postgres
```
*Ceci dÃ©marre l'instance PostgreSQL sur le port 5432.*

## 3. Installation et Lancement du Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```
*Le serveur API dÃ©marrera sur http://localhost:3001.*

## 4. Installation et Lancement du Frontend

```bash
cd frontend
npm install
npm run dev
```
*L'application s'ouvrira sur http://localhost:5173.*

## 5. Comment vÃ©rifier que PostgreSQL persiste rÃ©ellement les signatures

Pour prouver que la persistance est rÃ©elle (Lot 3.1) et que l'application ne repose pas sur le mode de secours (Fallback local), suivez ces Ã©tapes :

1. **DÃ©marrez PostgreSQL** : `docker compose up -d postgres`
2. **DÃ©marrez le Backend et Frontend** : `npm run dev` dans chaque dossier.
3. **CrÃ©ez une signature** dans l'application (http://localhost:5173/create/signature).
4. **VÃ©rifiez en base de donnÃ©es** :
   - Ouvrez Prisma Studio : `cd backend && npm run prisma:studio`.
   - Cliquez sur le modÃ¨le `Signature`. Vous devriez voir la ligne nouvellement crÃ©Ã©e.
   - Cliquez sur `AuditLog`. Vous devriez voir l'action `CREATE_SIGNATURE`.
5. **Simulez une panne** :
   - ArrÃªtez le conteneur Docker : `docker compose stop postgres`.
   - Modifiez la signature dans le navigateur et cliquez sur "Enregistrer".
   - Le Frontend basculera en mode Hors-ligne (Fallback) sans crasher, affichant un statut jaune.
   - Relancez le conteneur : `docker compose start postgres`. La prochaine sauvegarde sera de nouveau persistÃ©e.

## ğŸš€ Lancement Local
Pour lancer l'application en dÃ©veloppement avec *Hot Reloading* :
```bash
npm run dev
```
> Le backend sera lancÃ© sur `http://localhost:3001`
> Le frontend sera accessible sur `http://localhost:5173`

## ğŸ³ Lancement via Docker
Pour simuler l'environnement de production en local :
```bash
docker compose up --build -d
```
> L'application sera accessible sur `http://localhost` (Port 80 via Nginx).

## ğŸ§ª Lancement des Tests
L'application intÃ¨gre **Playwright** pour les tests End-to-End.
```bash
# Lancer les tests en arriÃ¨re-plan
npm run test:e2e

# Lancer les tests avec l'interface graphique Playwright (fortement recommandÃ©)
npm run test:e2e --prefix frontend -- --ui
```

## ğŸ“– Documentation API (Swagger)
Les spÃ©cifications de l'API sont disponibles Ã  la racine du projet dans le dossier `docs/` :
- `docs/swagger.yaml`

Vous pouvez visualiser ce fichier dans votre IDE via l'extension Swagger, ou l'importer dans Postman pour gÃ©nÃ©rer une collection complÃ¨te.

## ğŸ›  Commandes Utiles
- `npm run build` : Compile TypeScript et construit le frontend (dist) et le backend.
- `npm run lint` (dans le dossier `frontend`) : VÃ©rifie les erreurs de syntaxe React.

## âš ï¸ Erreurs frÃ©quentes
- **Timeout lors des tests Playwright** : Assurez-vous qu'aucun autre processus n'utilise les ports `3001` ou `5173`. Le script dÃ©marre le frontend et le backend en parallÃ¨le.
- **Proxy Error dans la console du navigateur** : Le frontend Vite a Ã©tÃ© lancÃ© manuellement mais le backend est Ã©teint. Utilisez toujours `npm run dev` Ã  la racine pour allumer les deux.

## Lot 6 - Assets Library
Lot 6 introduces a secure media library for logos, banners, and documents. See docs/ASSETS_LIBRARY_GUIDE.md for architectural decisions, security restrictions (like the ban on SVGs), and deployment prerequisites like the new UPLOAD_DIR.

## Validation post-migration Phase 4.2
Ce document et l'architecture ont été formellement validés en Phase 4.2 :
- **État de la copie** : Terminée. rontend/ et ackend/ sont déployés.
- **État des processus** : Propre. Les anciens serveurs ont été arrêtés.
- **État du dossier legacy** : _legacy_v34/ contient l'ancienne version.
- **Commandes validées** : 
pm run dev pour les deux environnements.
- **Limites restantes** : Export SVG natif à finaliser.
- **Ce qui doit être testé localement avec PostgreSQL/Docker** : Persistance réelle, intégration BD, connecteurs réels OIDC/SharePoint (actuellement en mode bouchon).

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
