# Backlog V3 - Connecteurs Réels et IA

Maintenant que le cœur de métier (Signature, UI) et l'infrastructure de base de données (PostgreSQL, Prisma) sont en place, le Lot 3 prépare le terrain pour la V3.

## Épic 1 : Authentification et SSO (Priorité Haute)
- [ ] Remplacer l'authentification mockée par OAuth2 / OIDC.
- [ ] Connecter l'application à un annuaire d'entreprise (Azure AD, LDAP, ou Keycloak).
- [ ] Récupérer automatiquement le `firstName`, `lastName`, `title` et `department` via les claims du token JWT.

## Épic 2 : Connecteurs Métiers (Priorité Moyenne)
- [ ] **GLPI / ITSM** : Création de tickets automatisée en cas d'anomalie de signature.
- [ ] **SharePoint / OneDrive** : Import direct d'assets dans la bibliothèque au lieu d'URL simples.
- [ ] **Exchange / Outlook Web** : API d'installation automatique de la signature générée sur le poste de l'utilisateur (via Graph API).

## Épic 3 : IA Souveraine (Priorité Basse)
- [ ] **Ollama / Llama** : Permettre à l'IA d'analyser le "Tone of voice" des e-mails avant de recommander une bannière spécifique.
- [ ] **Reformulation** : Traduction automatique des mentions légales selon la langue cible.

## Épic 4 : Dashboard Avancé
- [ ] Remplacer les données mockées de `/api/stats/dashboard` par de vraies agrégations Prisma `prisma.signature.count()`.
- [ ] Afficher des graphiques d'utilisation réels.
