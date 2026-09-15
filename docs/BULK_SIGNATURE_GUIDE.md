# Guide du Module de Publipostage (Génération Massive) - Lot 7

Ce document décrit le fonctionnement et les règles du module d'import CSV et de génération massive de signatures.

## Objectif
Permettre aux profils `COMMUNICATION` et `ADMIN_DSI` d'importer un annuaire au format CSV pour générer automatiquement des milliers de signatures en une seule passe, avec un export au format ZIP prêt à l'emploi.

## Formats Supportés
- Fichier `.csv` avec mimetype `text/csv`.
- Encodage : UTF-8 (recommandé). Une tentative de conversion depuis Latin-1 / Windows-1252 est effectuée avec un avertissement si un mauvais encodage est détecté.
- Séparateurs : Auto-détection entre la virgule `,`, le point-virgule `;`, et la tabulation `\t`.
- Taille limite : 5 Mo maximum par fichier.
- Lignes : 5 000 lignes maximum par fichier (limite définie pour des raisons de performance applicative dans le Lot 7, qui peut être étendue dans un futur lot avec des files d'attente asynchrones comme RabbitMQ ou Redis/Bull).

## Processus d'import (Wizard)

1. **Upload** : Le fichier est téléversé en mémoire temporaire. S'il respecte les tailles, il est converti en tableau de données JSON. Chaque ligne (même brute) est enregistrée dans `CollaboratorImportRow` associée à un `CollaboratorImportBatch`.
2. **Mapping** : L'interface permet d'associer automatiquement ou manuellement les entêtes du CSV (ex: "E-mail pro") vers les champs canoniques ("email").
3. **Validation et Correction** : Le backend vérifie le format des emails, des téléphones, et la présence des champs requis (Prénom, Nom, Fonction). Il signale les doublons dans le même fichier. Les statuts attribués sont : `valid`, `warning` ou `invalid`. En cas d'erreur (`invalid` ou `warning`), l'utilisateur peut corriger manuellement une cellule directement dans l'interface via un appel à `PUT /api/imports/:id/rows/:rowId`. Cela relance la validation sur cette ligne.
4. **Génération** : Seules les lignes avec `valid` et `warning` sont converties en signature HTML.
   - **Garde-fou synchrone** : Afin d'éviter les crashs de l'API Node.js, une limite de sécurité `BULK_GENERATION_MAX_SYNC_ROWS` (par défaut 1500) est appliquée. Si le nombre de lignes valides dépasse cette limite, l'API refusera la génération synchrone avec une erreur 400.
   - Les signatures générées sont enregistrées en base avec le statut `draft`.
   - **Règle absolue** : L'import CSV ne crée **aucun compte applicatif** (`User`). Il génère uniquement des entités `Signature`.
5. **Export** : Un fichier `.zip` est assemblé en mémoire avec `archiver` et sauvegardé dans le dossier `uploads/exports`. Il contient les HTML individuels, un fichier de résumé (`errors.txt`), et un manifeste.

## Modèles de Données

Les données liées à un import sont hautement structurées pour une traçabilité (AuditLog) parfaite et persistante :
- `CollaboratorImportBatch` : Historise l'envoi d'un fichier CSV.
- `CollaboratorImportRow` : Stocke le JSON brut et le statut pour chaque ligne.
- `SignatureGenerationBatch` : L'opération de génération finale.
- `SignatureGenerationItem` : Lie la ligne CSV à l'ID de la `Signature` générée en base.
- `GenerationReport` : Résumé et chemin d'accès au `.zip` exporté.

## Permissions

Le module d'import de masse est strictement réservé aux rôles avancés pour éviter des modifications non désirées dans les bases.
- Accès total : `ADMIN_DSI`, `COMMUNICATION`
- Droit de Regard : `VALIDATOR` (peut exporter, consulter les historiques, mais ne peut pas uploader un nouveau CSV).
- Interdit : `USER`, `READ_ONLY`.

## Sécurité des Fichiers Exportés

La route d'export (`GET /api/imports/:id/export`) est protégée. Le téléchargement s'effectue en streaming sans jamais exposer le vrai nom du chemin (storagePath) dans le corps JSON ou au frontend. L'export déclenche également un AuditLog.
