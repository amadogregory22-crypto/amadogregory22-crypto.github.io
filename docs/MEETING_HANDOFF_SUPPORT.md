# Support de Réunion - Passation V1 ➡️ V2

Ce document est conçu pour être lu à haute voix ou projeté lors du comité de pilotage (COPIL) ou de la réunion de lancement technique de la V2.

## 📌 Résumé Exécutif (10 lignes)
La **V1 du RAGT Communication Studio** est un "Walking Skeleton" : une coquille fonctionnelle, testée, documentée et prête à être industrialisée. L'interface (frontend), l'architecture réseau (Docker), et le contrat de données (Swagger API) sont définis et opérationnels avec des données factices (mocks). L'objectif de cette réunion est d'organiser la **V2**, qui consiste à retirer le "cerveau fictif" actuel et à y brancher le système d'information réel de RAGT (Base de données, Azure AD, Stockage). La priorité est de statuer sur l'hébergement et la sécurité avant le premier jour de développement.

---

## 🎯 Points Clés à Présenter
1. **L'Interface est terminée** : L'équipe Frontend a établi le Design System, les routes et la mécanique interne (Zustand).
2. **Le Contrat est clair** : Les développeurs Backend ont un `swagger.yaml` précis à respecter. S'ils le respectent, le Frontend fonctionnera tout seul.
3. **La Qualité est verrouillée** : 7 tests de non-régression (Playwright) vérifieront à chaque mise à jour que rien n'a été cassé.

---

## ❓ Questions à poser à la DSI / Équipes Techniques

### Au Backend / Architecte
- Allons-nous utiliser PostgreSQL, SQL Server, ou une autre technologie pour la base de données de ce projet ?
- L'équipe a-t-elle une préférence d'ORM côté Node.js (Prisma, TypeORM) ?

### Au DevOps / SysAdmin
- Le projet sera-t-il hébergé dans le Cloud (Azure/AWS) ou On-Premise sur une VM RAGT ?
- Quel est l'outil CI/CD officiel ? GitLab CI ? Si oui, avons-nous des Runners disponibles ?
- Quelle solution pour le stockage des images de la bibliothèque (S3, dossier réseau monté, Azure Blob) ?

### Au Réseau / Sécurité
- Comment allons-nous gérer l'authentification des collaborateurs ? Azure AD / Microsoft Entra ID ?
- Quels sont les processus pour valider l'ouverture du port (443 / SSL) en interne ?

### Au Service Communication (Sponsor)
- Est-il acceptable que pour la V2 (MVP final), les utilisateurs fassent un "Copier/Coller" manuel de la signature vers Outlook, plutôt que de forcer la signature sans leur accord (API Exchange complexe) ?
- Quels sont les 3 modèles de signature prioritaires à intégrer dès le lancement ?

---

## ⚖️ Décisions à Obtenir (Ordre du jour)
- [ ] Choix de la technologie de Base de Données.
- [ ] Protocole d'authentification retenu (SSO).
- [ ] Désignation du chef de projet technique Backend.
- [ ] Validation du périmètre du "Must Have" du backlog V2.

---

## ⚠️ Risques à Arbitrer
1. **Dette de sécurité** : Commencer le développement de la base de données sans avoir validé le système de connexion SSO risque d'engendrer un re-développement coûteux de l'association User/Signature.
2. **Déploiement Exchange** : La tentative de déploiement "automatique" via l'API Microsoft 365 est la fonctionnalité la plus risquée (droits globaux requis). Elle devrait être repoussée au Lot 3 (Could Have).

---

## 🚀 Prochaines Étapes Recommandées
1. Affecter les accès GitLab/Dépôt aux développeurs Backend V2.
2. Installer et lancer l'environnement local de la V1 par l'équipe Back (`npm run dev`).
3. DSI : Créer l'application "RAGT Studio" dans le portail d'authentification Azure AD (récupérer ClientID / TenantID).
