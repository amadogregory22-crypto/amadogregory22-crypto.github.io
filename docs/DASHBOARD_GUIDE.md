# Mon Compagnon by RAGT — Guide du Tableau de Bord (Dashboard)

Ce document décrit l'architecture et le fonctionnement du tableau de bord principal de l'application (Lot 5.1).

## 1. Objectif du Dashboard

Le Tableau de Bord (accessible à la racine `/`) sert de **repère numérique au quotidien** pour l'utilisateur.
Contrairement à une interface statique, son contenu est **généré dynamiquement** par le Backend en fonction du rôle de l'utilisateur (RBAC).

## 2. Architecture

### Backend (`/api/dashboard`)
La route `GET /api/dashboard` dans `backend/src/routes/dashboard.ts` est responsable de l'agrégation des données.

**Filtrage de Sécurité & RBAC :**
- **SUPERADMIN_APP** & **ADMIN_DSI** : Accès complet aux statistiques système (PostgreSQL, Fallback, Connecteurs, NODE_ENV) et à l'activité récente (AuditLogs).
- **COMMUNICATION** : Accès aux statistiques métier (Signatures, Assets, Imports).
- **USER** / **MANAGER** : Accès limité aux "Actions Rapides" et aux widgets de base.

> [!WARNING]
> **Sécurité absolue :** La route ne doit **jamais** exposer de secrets (ex: `DATABASE_URL`, clés API, mots de passe). Les statuts système doivent être normalisés sous forme de booléens ou de strings sans données brutes (`postgresConnected: true`).

### Données Mockées
Pendant la phase de transition, certains modules non encore développés (ex: Mon Onboarding, Mes Demandes) sont renvoyés sous forme de "Mocks".
- Backend : Le bloc contient explicitement `isMock: true`.
- Frontend : Un bandeau "MODULE EN CONSTRUCTION" est affiché pour éviter toute confusion.

### Frontend (`DashboardPage.tsx`)
Le frontend n'embarque **aucune** logique décisionnelle complexe sur les rôles. Il se contente d'afficher les blocs retournés par le Backend.
Il s'appuie sur des composants CSS purs (Tailwind) sans librairie graphique lourde (ex: pas de Recharts) pour maximiser les performances de ce premier lot.

## 3. Composants Front-end

- `WelcomeWidget` : Message d'accueil et date.
- `QuickActionsWidget` : Grille de raccourcis cliquables (dynamique).
- `StatsWidget` : Chiffres clés (Signatures, Assets...).
- `SystemStatusWidget` : Indicateurs de santé de l'infrastructure (BDD, Connecteurs).
- `RecentActivityWidget` : Flux chronologique des dernières actions tracées (AuditLog).
- `PlaceholderWidget` : Composant stylisé pour les blocs fictifs (`isMock`).

## 4. Évolutions Futures
Lors de l'implémentation des Lots 6, 7 et 8, les compteurs mockés dans le Backend seront remplacés au fur et à mesure par des appels `prisma.model.count()` réels, sans nécessiter de modification côté Frontend.
L'ajout de bibliothèques de graphiques interactives (Recharts, Chart.js) est repoussé à une version ultérieure.
