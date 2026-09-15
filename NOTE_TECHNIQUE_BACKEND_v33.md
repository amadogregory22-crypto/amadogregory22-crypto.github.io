# Note technique v33

La v33 ajoute une architecture backend entreprise.

La PWA peut toujours fonctionner seule.
Le backend ajoute :
- authentification ;
- proxy API ;
- stockage partagé ;
- bibliothèque centralisée ;
- logs serveur ;
- synchronisation ;
- routes Drive/SharePoint/IA.

Le dossier server inclus est un squelette Node/Express.
Il est prêt pour développement, pas durci production.

Production recommandée :
- HTTPS ;
- SSO/OIDC/SAML ;
- PostgreSQL ou SQL Server ;
- stockage partagé sécurisé ;
- logs serveur ;
- sauvegardes ;
- reverse proxy ;
- droits réels.
