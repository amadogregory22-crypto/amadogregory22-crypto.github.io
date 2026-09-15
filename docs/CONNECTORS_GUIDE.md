# Guide des Connecteurs

Ce document explique comment gérer, tester et intégrer les connecteurs dans RAGT Communication Studio.

## Architecture

Le module des connecteurs repose sur une architecture en registre (`ConnectorRegistry`) qui synchronise l'état du code avec la base de données. 
- Tous les secrets (tokens, clés API, mots de passe) doivent être stockés dans des variables d'environnement backend. 
- **La base de données ne stocke aucune information sensible**, seulement des références (`secretRef`).

## Commandes Docker

Pour démarrer la base de données PostgreSQL, utilisez :

```bash
docker compose up -d postgres
```

> [!WARNING]
> N'utilisez pas `docker compose up -d db`. Le service s'appelle `postgres`.

## Durcissement (Zéro Secret)

1. Aucun token ou mot de passe n'est renvoyé dans les réponses API.
2. Les logs applicatifs masquent automatiquement les clés contenant `token`, `secret`, `password`, etc.
3. Les erreurs comme `missing_secret` sont gérées proprement et renvoyées à l'interface sans détails techniques fuyant les variables d'environnement.
