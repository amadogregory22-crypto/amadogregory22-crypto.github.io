# Handoff DevOps & Infrastructure

## Infrastructure Docker Compose (V1)
Le projet repose sur un `docker-compose.yml` conçu pour une intégration facile sur un serveur on-premise ou une VM cloud.

### Services Disponibles
1. **Frontend (`frontend`)** :
   - Image : Nginx (alpine).
   - Port exposé : `80` (mapped sur le port 80 de l'hôte).
   - Rôle : Sert les fichiers statiques de l'application React buildée et proxifie `/api/` vers le backend via sa configuration `nginx.conf`.
2. **Backend (`backend`)** :
   - Image : Node.js (20-alpine).
   - Port interne : `3001` (exposé sur 3001 pour debug).
   - Rôle : API Express.js.

### Réseau Docker
Les services communiquent via un bridge network privé nommé `ragt-net`. Le frontend Nginx appelle le backend via le nom d'hôte Docker `http://backend:3001`.

### Build & Lancement
- **Lancement Local Dev (sans Docker)** : `npm run dev` à la racine lance Vite (5173) et tsx (3001).
- **Lancement Production (Docker)** : `docker-compose up -d --build`.

## Recommandations pour GitLab CI/CD (V2)
Le fichier `.gitlab-ci.yml` inclus est un squelette solide comprenant 4 étapes : `build`, `test`, `package` et `deploy`.
Pour la V2, il faudra :
1. Configurer un Runner GitLab avec un tag spécifique si l'architecture on-premise l'exige.
2. Ajouter le déploiement continu (`deploy`) en utilisant SSH ou un orchestrateur (ex: Portainer / Kubernetes) pour tirer les images sur le serveur cible.

## Prérequis Serveur (Cible V2)
- OS : Linux (Ubuntu/Debian ou RHEL).
- Docker Engine & Docker Compose V2 installés.
- Optionnel mais recommandé : Un Reverse Proxy frontal (Traefik ou Nginx-proxy) gérant le certificat SSL (HTTPS). Le `docker-compose.yml` actuel écoute sur le port 80 en clair.

## Points de Vigilance Sécurité
1. **Volumes** : La V1 n'utilise aucun volume. Dès qu'une base de données ou un stockage de fichiers sera ajouté en V2, des volumes Docker explicites (`volumes:`) devront être configurés pour garantir la persistance des données lors du recréation des conteneurs.
# Handoff DevOps & Infrastructure

## Infrastructure Docker Compose (V1)
Le projet repose sur un `docker-compose.yml` conçu pour une intégration facile sur un serveur on-premise ou une VM cloud.

### Services Disponibles
1. **Frontend (`frontend`)** :
   - Image : Nginx (alpine).
   - Port exposé : `80` (mapped sur le port 80 de l'hôte).
   - Rôle : Sert les fichiers statiques de l'application React buildée et proxifie `/api/` vers le backend via sa configuration `nginx.conf`.
2. **Backend (`backend`)** :
   - Image : Node.js (20-alpine).
   - Port interne : `3001` (exposé sur 3001 pour debug).
   - Rôle : API Express.js.

### Réseau Docker
Les services communiquent via un bridge network privé nommé `ragt-net`. Le frontend Nginx appelle le backend via le nom d'hôte Docker `http://backend:3001`.

### Build & Lancement
- **Lancement Local Dev (sans Docker)** : `npm run dev` à la racine lance Vite (5173) et tsx (3001).
- **Lancement Production (Docker)** : `docker-compose up -d --build`.

## Recommandations pour GitLab CI/CD (V2)
Le fichier `.gitlab-ci.yml` inclus est un squelette solide comprenant 4 étapes : `build`, `test`, `package` et `deploy`.
Pour la V2, il faudra :
1. Configurer un Runner GitLab avec un tag spécifique si l'architecture on-premise l'exige.
2. Ajouter le déploiement continu (`deploy`) en utilisant SSH ou un orchestrateur (ex: Portainer / Kubernetes) pour tirer les images sur le serveur cible.

## Prérequis Serveur (Cible V2)
- OS : Linux (Ubuntu/Debian ou RHEL).
- Docker Engine & Docker Compose V2 installés.
- Optionnel mais recommandé : Un Reverse Proxy frontal (Traefik ou Nginx-proxy) gérant le certificat SSL (HTTPS). Le `docker-compose.yml` actuel écoute sur le port 80 en clair.

## Points de Vigilance Sécurité
1. **Volumes** : La V1 n'utilise aucun volume. Dès qu'une base de données ou un stockage de fichiers sera ajouté en V2, des volumes Docker explicites (`volumes:`) devront être configurés pour garantir la persistance des données lors du recréation des conteneurs.
2. **SSL / HTTPS** : L'application n'inclut pas de certificat SSL en l'état. La terminaison SSL devra être faite en amont (Load Balancer, Pare-feu applicatif ou Traefik).
3. **Variables d'environnement** : Ne jamais versionner les secrets métier en V2 (clé API, mots de passe BDD). Il faudra utiliser un fichier `.env` non versionné, ou injecter les variables depuis les réglages CI/CD de GitLab.

## Lot 6 - Assets Library
- **Volumes**: Added ./backend/uploads:/app/uploads in docker-compose.yml.
- **Env Vars**: Added UPLOAD_DIR, MAX_IMAGE_UPLOAD_SIZE, MAX_PDF_UPLOAD_SIZE.
- **Security**: Uploaded files have regenerated UUID names. No physical delete.

## Lot 7 - Génération Massive (Import CSV)
- **Volumes** : Un nouveau sous-dossier `imports/` et `exports/` a été créé dans le dossier `/app/uploads`. Il faut vérifier les droits en écriture.
- **Node.js** : La dépendance `archiver` écrit de gros fichiers ZIP localement. Le disque doit avoir suffisamment d'espace (IOPS/Storage) pour les exports massifs.

## Validation r�elle PostgreSQL / Docker (Phase 4.3)
Cette section atteste des commandes et de l'�tat de l'infrastructure Docker/PostgreSQL.

- **Commandes exactes pour d�marrer localement** :
  1. docker compose config (V�rification de la syntaxe et des volumes)
  2. docker compose up -d postgres (D�marrage du conteneur en arri�re-plan)
  3. cd backend && npx prisma migrate dev (Cr�ation des tables)
- **Statut r�el actuel** : L'environnement Docker / PostgreSQL est parfaitement configur� (voir docker-compose.yml), mais le lancement physique du conteneur doit �tre fait sur le poste h�te final.
- **Fallback M�moire** : En d�veloppement, si PostgreSQL est absent, l'application peut fonctionner en m�moire si ENABLE_MEMORY_FALLBACK=true est pass� en variable d'environnement. **Ce fallback est strictement interdit et bloqu� en production.**
- **Limites** : Les donn�es mock�es via le fallback disparaissent au red�marrage.
- **Comment v�rifier la persistance r�elle** :
  1. Lancez PostgreSQL (docker compose up -d postgres).
  2. Allez dans le Studio graphique (via le navigateur) et sauvegardez un projet.
  3. Red�marrez le backend (Ctrl+C puis 
pm run dev).
  4. Rechargez la page : le projet doit �tre intact.
- **Comment red�marrer proprement** : docker compose restart postgres puis red�marrage du backend.
- **Comment diagnostiquer une erreur DATABASE_URL** : Si l'API renvoie une erreur 500 ou si Prisma �choue � se connecter, v�rifiez que DATABASE_URL dans le fichier .env du backend correspond exactement � : postgresql://ragt_admin:ragt_password@localhost:5432/ragt_studio?schema=public (Remplacez postgres par localhost si ex�cut� en dehors de Docker).
