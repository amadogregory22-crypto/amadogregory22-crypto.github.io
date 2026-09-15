# Backlog V2 - RAGT Communication Studio

Ce document répertorie et priorise les fonctionnalités cibles pour remplacer l'actuel Walking Skeleton par un produit final utilisable en production.

---

## 🟥 MUST HAVE (Priorité Haute - Bloquant pour la mise en prod)

### 1. Authentification SSO & Sécurité
- **Objectif** : Sécuriser l'accès à l'application.
- **Description** : Intégrer l'Azure AD ou le fournisseur d'identité RAGT (OIDC / SAML). Aucun accès public.
- **Complexité** : M
- **Dépendances** : Configuration côté DSI (App Registration).
- **Critères d'acceptation** : L'accès force une redirection Microsoft. Un JWT est envoyé à chaque requête API.
- **Risque principal** : Problèmes de configuration de flux réseau ou des CORS avec le proxy d'entreprise.

### 2. Base de données Backend
- **Objectif** : Persister les données de l'application.
- **Description** : Initialiser PostgreSQL, migrer le modèle de données (Utilisateurs, Signatures, Assets).
- **Complexité** : M
- **Dépendances** : Mise à disposition d'un serveur de BDD.
- **Critères d'acceptation** : Un rafraîchissement (F5) du front ne perd plus les données.
- **Risque principal** : Sous-estimer la complexité du modèle relationnel entre les templates et les utilisateurs.

### 3. Signature Email Complète (CRUD)
- **Objectif** : Les employés peuvent créer, modifier, enregistrer et appliquer leur signature.
- **Description** : [FAIT EN V2.0] Le générateur est opérationnel (3 templates, export HTML Outlook natif, download de fichier). Reste à enregistrer en BDD le résultat.
- **Complexité** : L
- **Dépendances** : Base de données (Item 2).
- **Critères d'acceptation** : La signature est sauvegardée sur le compte de l'utilisateur.
- **Risque principal** : Aucun, le HTML généré est déjà certifié Outlook.

### 4. Connecteur Annuaire (Active Directory)
- **Objectif** : Préremplir les données des employés.
- **Description** : Le formulaire de signature récupère Nom, Prénom, Fonction et Service directement depuis l'AD.
- **Complexité** : L
- **Dépendances** : Accès lecture LDAP / AD.
- **Critères d'acceptation** : L'utilisateur n'a presque rien à saisir.
- **Risque principal** : Formatage des numéros de téléphone souvent incohérent dans l'AD.

---

## 🟧 SHOULD HAVE (Priorité Moyenne - Valeur ajoutée majeure)

### 5. Bibliothèque d'Assets et Stockage (S3/SharePoint)
- **Objectif** : Centraliser les logos et bannières.
- **Description** : Relier la page "Bibliothèque" à un bucket objet. Permettre aux communicants d'uploader des bannières validées.
- **Complexité** : L
- **Dépendances** : Espace de stockage alloué (Azure Blob, S3, SharePoint).
- **Critères d'acceptation** : Une bannière uploadée apparaît instantanément pour tout le monde.
- **Risque principal** : Gestion des droits (qui peut uploader ? qui peut supprimer ?).

### 6. Export HTML Outlook Robuste
- **Objectif** : Déploiement natif côté client.
- **Description** : Permettre de télécharger un `.htm` ou copier-coller proprement le code avec un formatage CSS inline stricte compatible MS Word rendering engine (Outlook).
- **Complexité** : M
- **Dépendances** : Aucune.
- **Critères d'acceptation** : Le rendu Outlook Desktop est identique à l'aperçu Web.
- **Risque principal** : Limitations historiques du moteur HTML d'Outlook.

### 7. Administration et Rôles
- **Objectif** : Gouvernance.
- **Description** : Rôle Admin (peut changer les templates) vs Rôle User (peut générer sa signature).
- **Complexité** : S
- **Dépendances** : Authentification SSO (Item 1).
- **Critères d'acceptation** : Le menu "Administration" est invisible pour un User.
- **Risque principal** : Complexité si des rôles "Manager de département" sont ajoutés.

---

## 🟨 COULD HAVE (Priorité Basse - Confort)

### 8. Import CSV Collaborateurs
- **Objectif** : Génération de signatures en masse.
- **Description** : Le service RH importe un CSV, l'outil génère un zip avec 50 signatures HTML.
- **Complexité** : M
- **Dépendances** : Module d'export (Item 6).
- **Critères d'acceptation** : Zip téléchargeable, pas d'erreurs de parsing CSV.
- **Risque principal** : Fichiers CSV mal encodés (UTF-8 vs ANSI).

### 9. Connecteur Exchange / Office 365 (Déploiement auto)
- **Objectif** : Forcer la signature chez l'utilisateur sans aucune action de sa part.
- **Description** : Utiliser l'API Graph Microsoft pour injecter la signature côté serveur Exchange.
- **Complexité** : XL
- **Dépendances** : Autorisations administrateur lourdes sur le tenant Microsoft 365.
- **Critères d'acceptation** : La signature s'applique automatiquement sur les emails envoyés depuis le webmail ou le mobile.
- **Risque principal** : Complexe à débugger. Refus de sécurité potentiel de la DSI.

### 10. Audit et Logs
- **Objectif** : Tracer les modifications de la charte.
- **Description** : Historiser "Qui a modifié le template X à quelle heure".
- **Complexité** : S
- **Dépendances** : Base de données.
- **Critères d'acceptation** : Tableau consultable par l'admin.
- **Risque principal** : Volume de données si l'on trace chaque création de signature.

---

## 🟩 LATER (Vision future - Non planifié)

### 11. Connecteur GLPI
- **Objectif** : Assistance intégrée.
- **Description** : Ouvrir un ticket support depuis le studio.
- **Complexité** : M
- **Dépendances** : API REST GLPI activée.

### 12. IA Souveraine
- **Objectif** : Assistant de rédaction ou génération de bannières locales.
- **Description** : Branchement sur une API LLM hébergée en interne ou chez un cloud européen certifié (Mistral).
- **Complexité** : XL
- **Dépendances** : Contrat de service avec un provider IA.
- **Critères d'acceptation** : L'IA propose des formulations d'accroches sous la signature.
- **Risque principal** : Coût d'inférence, confidentialité des données.
