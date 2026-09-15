# Guide IA Souveraine

Ce document explique le fonctionnement et la politique de l'Intelligence Artificielle au sein de RAGT Communication Studio.

## Politique de Sécurité & Confidentialité

L'IA intégrée dans cet outil suit une politique stricte :
- **Appels Externes bloqués par défaut** : La variable d'environnement `AI_EXTERNAL_ALLOWED=false` empêche tout appel à un fournisseur IA distant (ex: OpenAI).
- **Mode Bouchon** : Par défaut, le provider utilisé est `mock`.
- **Validation manuelle** : Aucune IA n'applique de modification de façon autonome sans la validation explicite de l'utilisateur (exemple: la "Baguette Magique" requiert de cliquer sur Appliquer).

## Commandes Docker

Pour lancer l'environnement, y compris la base de données :

```bash
docker compose up -d postgres
```

> [!WARNING]
> N'utilisez pas `docker compose up -d db`. Le service s'appelle `postgres`.

## Durcissement (Zéro Secret)

1. Les logs de requêtes IA (dans la BDD `AiRequestLog` et la console) masquent systématiquement les clés privées et autres secrets.
2. Si une erreur de type clé API manquante se produit, le backend lève une erreur générique `missing_secret` pour ne pas exposer de configuration sensible.
