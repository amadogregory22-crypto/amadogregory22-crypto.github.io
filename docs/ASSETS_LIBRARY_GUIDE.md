# Guide de la Bibliothèque d'Assets (Lot 6)

Ce document décrit l'architecture, les choix de conception et les règles de sécurité mises en place pour la Bibliothèque d'Assets du RAGT Communication Studio.

## Objectif

Fournir un espace centralisé et sécurisé pour héberger les images (logos, bannières, pictos) et documents (PDF) utilisés par les différents modules (notamment le module Signature), avant d'éventuellement les lier à des sources externes comme SharePoint ou le DAM d'entreprise.

## Règles Métier et Sécurité

### 1. Types de fichiers autorisés
- **Images** : `image/png`, `image/jpeg`, `image/webp`. Taille max : 5 Mo.
- **Documents** : `application/pdf` uniquement. Taille max : 15 Mo.
- **SVG désactivé** : Par mesure de sécurité (prévention des attaques XSS via SVG), le format `image/svg+xml` est **totalement interdit** dans le Lot 6. Il ne pourra être réactivé que lorsqu'un moteur de sanitization robuste sera intégré et testé de bout en bout. Les tentatives d'upload de `.svg` retourneront l'erreur `invalid_file_type`.
- Les exécutables, scripts, archives, et documents Word/Excel sont bloqués.

### 2. Stockage Local et Masquage
- Les fichiers sont physiquement stockés dans le dossier `/app/uploads` monté via un volume Docker persistant.
- **Sécurité absolue** : Le chemin système (`storagePath`) n'est **jamais** exposé dans les réponses API. Les assets sont servis à travers un endpoint sécurisé (`GET /api/assets/:id/download`).
- Tous les noms de fichiers sont régénérés côté serveur avec un UUID sécurisé (crypto) pour éviter le Path Traversal et masquer les originaux.

### 3. Cycle de vie et Soft Delete (Archivage Logique)
- Pour garantir la pérennité des signatures existantes (un collaborateur ayant choisi un logo qui est ensuite supprimé ne doit pas avoir sa signature cassée), **la suppression physique n'est pas autorisée dans ce Lot**.
- Appeler `DELETE /api/assets/:id` bascule le statut de l'asset en `archived`.
- Un asset archivé :
  - N'est plus visible dans la bibliothèque pour les utilisateurs standards.
  - N'est plus sélectionnable dans l'éditeur de signature.
  - Peut toujours être servi via l'URL de téléchargement pour les signatures qui l'utilisaient déjà, évitant les erreurs 404 dans les emails existants.

### 4. Modèle de Permissions (RBAC)
- **USER / READ_ONLY** : Peuvent uniquement voir et utiliser les assets validés.
- **COMMUNICATION** : Peuvent ajouter de nouveaux assets (créés en statut `draft`).
- **VALIDATOR** : Peuvent valider les assets `draft` (les rendant publics pour les autres utilisateurs) et archiver des assets existants.
- **ADMIN_DSI** : Contrôle total, y compris l'accès aux assets archivés.

### 5. Traçabilité (AssetUsage & AuditLog)
- **AuditLog** : Chaque action (upload, modification, validation, archivage) génère une entrée d'audit.
- **AssetUsage** : Lorsqu'un utilisateur sélectionne un asset (logo ou bannière) dans sa signature, un lien `AssetUsage` est créé en base. Cela permet à l'équipe Communication de savoir quels assets sont les plus populaires ou s'ils sont activement utilisés avant une refonte graphique.

## Évolutions Futures
- Intégration d'un module de recadrage (crop) côté client avant upload.
- Outil de purge physique asynchrone des assets archivés et orphelins (sans AssetUsage).
- Connexion aux drivers distants (Azure Blob Storage, AWS S3) via le registry des connecteurs existant (Lot 5).
