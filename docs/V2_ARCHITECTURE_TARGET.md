# Architecture Cible (V2)

Ce document décrit l'architecture visée pour le passage en production du projet (V2).

## Schéma Conceptuel Global

```
[Navigateurs Employés RAGT]
          | (HTTPS)
          v
[ Reverse Proxy / Ingress (Traefik ou Nginx) ]
          |
          +---> [ Frontend React (Vite) Serveur statique ]
          |
          +---> [ Backend Node.js (Express) ] 
                     |
                     +---> [ PostgreSQL (Données relationnelles) ]
                     |
                     +---> [ Azure AD / OIDC (Authentification) ]
                     |
                     +---> [ Stockage Objet (S3 ou Azure Blob pour les images) ]
                     |
                     +---> [ (Optionnel) Microsoft Graph API (Exchange / AD) ]
```

## Composants Techniques

### 1. Frontend
- **Hébergement** : Conteneur Nginx (alpine).
- **Sécurité** : Aucun jeton sensible (clé secrète API) ne réside dans le navigateur. Le JWT de session est stocké en mémoire ou via un cookie `HttpOnly`.

### 2. Backend
- **Hébergement** : Conteneur Node.js (PM2 pour la gestion des processus).
- **API** : RESTful, documentée via Swagger/OpenAPI.
- **Contrôle d'accès** : Middleware de vérification JWT sur toute route commençant par `/api/`, à l'exception de `/api/health`.

### 3. Base de Données
- **Technologie** : PostgreSQL 15+.
- **Hébergement** : Base de données managée (AWS RDS, Azure Database for PostgreSQL) OU base virtualisée on-premise sauvegardée quotidiennement.
- **ORM** : Prisma (fortement recommandé pour profiter à 100% du typage TypeScript) ou TypeORM.

### 4. Authentification (SSO)
- **Protocole** : OIDC (OpenID Connect) ou SAML 2.0 avec l'Active Directory de l'entreprise (Entra ID).
- **Flux** : "Authorization Code Flow". Le backend RAGT Studio gère l'échange de token et retourne une session à l'application.

### 5. Stockage des Fichiers (Assets, Logos)
- Les médias manipulés ne **doivent pas** être stockés dans le conteneur Docker du Backend (risque de perte à chaque mise à jour).
- **Cible** : Utilisation d'un SDK pour pousser/lire depuis un Bucket S3 (MinIO si on-premise) ou Azure Blob Storage.

### 6. IA Locale / Souveraine (Optionnelle)
- Si implémentée, ne pas utiliser d'API tierce publique (pas de ChatGPT grand public) pour des raisons de RGPD et secret industriel RAGT.
- Préférer une API Cloud Souveraine (ex: Mistral AI La Plateforme, Azure OpenAI en Europe avec exclusion d'apprentissage).

### 7. Logs & Audit
- Le backend utilisera une librairie comme `winston` ou `pino`.
- Format de log ciblé : **JSON** (stdout).
- La supervision (ex: ELK, Datadog ou Grafana Loki) aspirera les logs des conteneurs.

### 8. Déploiement & Intégration Continue
- Utilisation de **GitLab CI/CD**.
- Validation de chaque Merge Request par l'exécution automatique des tests Playwright (déjà existants en V1).
- Déploiement automatisé (via Ansible ou Helm/Kubernetes) sur les serveurs Staging et Production.
