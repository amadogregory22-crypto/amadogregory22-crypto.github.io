# Note technique v34 — Connecteurs métiers

La v34 ajoute une couche de connecteurs métiers au backend entreprise.

## Connecteurs préparés
- Google Drive API et Shared Drives ;
- SharePoint via Microsoft Graph ;
- OneDrive Entreprise via Microsoft Graph ;
- GLPI ;
- Exchange / Outlook ;
- Annuaire collaborateurs via Graph, LDAP ou CSV sécurisé.

## Principe de sécurité
Les secrets OAuth, tokens GLPI et mots de passe LDAP ne doivent jamais être stockés dans la PWA. La PWA appelle uniquement le backend `/api/connectors/*`.

## Statut
Les routes sont prêtes et testables, mais les appels fournisseurs sont volontairement en mode démonstration. Le branchement réel doit être fait côté serveur avec les librairies officielles et les scopes minimaux.
