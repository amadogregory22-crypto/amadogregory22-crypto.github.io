# Handoff V1 - Résumé et État des Lieux

## Résumé de la V1
La V1 (Walking Skeleton) de **RAGT Communication Studio** est une maquette fonctionnelle avancée et automatisée. Elle valide l'architecture front-to-back, la charte graphique premium (Atelier Signature), et le pipeline de tests. L'interface est navigable et démontre l'expérience utilisateur cible sans pour autant être branchée sur les véritables bases de données de production de RAGT.

## Objectif du Projet
Créer un outil centralisé, premium et simple d'utilisation pour gérer les signatures email, les documents de marque, et la gouvernance de l'identité RAGT, tout en offrant une interface de qualité "studio créatif".

## Architecture Générale
- **Frontend** : React 18 (Vite), TypeScript, Tailwind CSS, Zustand, React Router.
- **Backend (Mock)** : Node.js (Express.js), TypeScript. Il simule les appels réseau pour le frontend.
- **Proxy/Serveur Web** : Nginx (via Docker en prod) ou Vite Dev Server (en local) assurant le routage des appels `/api` vers le backend.
- **Orchestration** : Docker Compose (backend + frontend nginx).

## État Réel des Composants
- **Frontend** : **Opérationnel.** Toutes les routes sont définies, le layout avec Sidebar et Header est fonctionnel (responsive), et les 14 pages principales existent (certaines à l'état de stub métier).
- **Backend** : **Mocké.** Le backend répond en `200 OK` avec des données fixes, mais ne possède ni base de données (pas de PostgreSQL/MongoDB), ni authentification réelle, ni logique métier complexe.
- **Docker** : **Opérationnel.** Les `Dockerfile` frontend et backend ainsi que le `docker-compose.yml` sont valides et permettent un lancement propre via `docker-compose up --build`.
- **Swagger** : **Aligné.** Le fichier `docs/swagger.yaml` documente précisément les routes actuellement servies par le backend mock.
- **Tests (Playwright)** : **Opérationnels.** 7 tests automatisés de non-régression couvrent l'UI, la navigation, les formulaires et les requêtes backend.
- **Connecteurs** : **Mockés.** L'UI affiche Active Directory, SharePoint, GLPI et Exchange, mais cliquer sur "Tester" ne déclenche qu'un `setTimeout` en mémoire.

## Ce qui est Fonctionnel (Solide)
- Build TypeScript strict (zéro erreur).
- Design System (Tokens de couleurs, typographie, composants réutilisables).
- Génération d'une table HTML pour la signature email à partir d'un formulaire.
- Responsive design et tiroir mobile.
- Les tests Playwright (Headless & Headed).

## Ce qui est Volontairement Non Branché
- Authentification et gestion des droits (SSO / Azure AD).
- Base de données pour sauvegarder les modèles et utilisateurs.
- Upload réel de médias vers un bucket (S3, SharePoint).
- Injection réelle dans Microsoft Exchange.

## Limites Connues
- Rafraîchir la page annule toute modification en cours (l'état Zustand est en RAM).
- Toute modification d'un mock disparaît à la fermeture du navigateur.

## Prérequis Techniques pour la Reprise
- Node.js 20+
- Docker & Docker Compose
- NPM (inclus avec Node.js)

## Commandes Utiles
- Installation : `npm install` (à la racine)
- Lancement local dev : `npm run dev`
- Lancer les tests : `npm run test:e2e`
- Lancer Docker : `docker-compose up -d --build`

## Ordre Conseillé pour Reprendre le Projet (V2)
1. Lire la documentation (ce pack).
2. Lancer l'environnement de dev local (`npm run dev`).
3. Modifier le backend pour remplacer une route mock (ex: `/api/auth/me`) par un appel vers une base de données locale ou un SSO de dev.
4. Supprimer l'état mock de Zustand côté frontend pour consommer le vrai backend.
