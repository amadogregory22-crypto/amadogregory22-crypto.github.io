# Guide d'Authentification et de Sécurité (Lot 4.1)

## Architecture Globale

Le projet RAGT Communication Studio utilise une architecture sécurisée basée sur un backend Node.js (Express) qui gère l'authentification et distribue des sessions via des **cookies JWT `httpOnly`**. 
Cela empêche le frontend (React) d'avoir un accès direct au token, le protégeant contre les failles XSS (Cross-Site Scripting).

L'application supporte deux modes d'authentification définis par la variable d'environnement `AUTH_MODE` :
1. `mock` : Mode développement avec un sélecteur de "Personas". **Strictement interdit en production.**
2. `oidc` : Mode production connecté à Microsoft Entra ID (Azure AD).

> [!WARNING]
> Si `NODE_ENV=production` et `AUTH_MODE=mock`, le backend refuse de démarrer (erreur critique de sécurité). Le Frontend masque automatiquement le `PersonaSelector`.

## Variables d'Environnement (Backend)

```env
# Mode d'authentification (mock, oidc)
AUTH_MODE=oidc

# Clé de signature des JWT (Doit être longue et sécurisée)
SESSION_SECRET=ragt-super-secret-production-key

# Configuration des cookies
COOKIE_SECURE=true
COOKIE_SAMESITE=lax

# Configuration OIDC (Azure AD / Entra ID)
OIDC_ISSUER_URL=https://login.microsoftonline.com/TENANT_ID/v2.0
OIDC_CLIENT_ID=votre_client_id
OIDC_CLIENT_SECRET=votre_client_secret
OIDC_REDIRECT_URI=https://api.ragt-studio.fr/auth/callback/oidc

# Origine Frontend autorisée (CORS)
CORS_ORIGIN=https://ragt-studio.fr
```

## Stratégie de Protection CSRF

Nous utilisons une **défense en profondeur** contre le CSRF :
1. **Cookies SameSite** : Par défaut `SameSite=Lax` (ou `Strict` si configuré via `COOKIE_SAMESITE`).
2. **Double Submit Cookie** : 
   - Le Frontend appelle `GET /api/auth/csrf` pour obtenir un token (stocké en cookie lisible `csrf-token`).
   - Le Frontend renvoie ce token dans le header `x-csrf-token` pour les requêtes modifiantes (`POST`, `PUT`, `PATCH`, `DELETE`).
   - Le middleware CSRF du backend vérifie l'égalité entre le cookie et le header. En cas d'échec, un code `403` est retourné et une alerte `SECURITY_ALERT_CSRF` est loggée.
3. **Vérification Origin/Referer** : En production, les requêtes CSRF sont également vérifiées par rapport à `CORS_ORIGIN`.

## Rôles, Permissions et Propriété (RBAC Granulaire)

L'application utilise un système de permissions strictes au lieu de vérifier uniquement le nom du rôle.

| Rôle | Permissions associées | Restrictions de Propriété |
|---|---|---|
| **ADMIN_DSI** | `signature:create`, `signature:update`, `signature:delete`, `signature:read`, `signature:validate`, `signature:publish`, `audit:read`, `admin:access`, `settings:update` | Aucune |
| **COMMUNICATION** | `signature:create`, `signature:update`, `signature:delete`, `signature:read`, `settings:update` | Peut modifier les signatures d'autres utilisateurs |
| **VALIDATOR** | `signature:read`, `signature:validate`, `signature:publish` | N/A (Validation uniquement) |
| **USER** | `signature:create`, `signature:update`, `signature:read` | **Peut uniquement modifier ses propres signatures.** Le backend rejette un `PUT` sur la signature d'un autre (403). |
| **READ_ONLY** | `signature:read` | Lecture seule stricte. |

## Audit Logs (Traçabilité Totale)

Toutes les actions sensibles génèrent un `AuditLog` contenant systématiquement :
- L'`action` et l'`entityType`.
- L'`userId`, l'`userEmail`, le `userRole`.
- L'`ipAddress` et le `userAgent`.

Actions traçées :
- Déconnexion (`LOGOUT`)
- Génération de rapport qualité (`QUALITY_REPORT_GENERATED`)
- Ajout, modification, suppression de signature (`CREATE_SIGNATURE`, `UPDATE_SIGNATURE`, `DELETE_SIGNATURE`)
- Accès refusé CSRF (`SECURITY_ALERT_CSRF`)

## Configuration OIDC (Implémentation Cible à venir - Lot 5+)

Pour activer le SSO réel avec Entra ID :
1. Le backend devra extraire les claims (`email`, `name`, `roles`) via passport-azure-ad.
2. Une fonction de synchronisation fera la correspondance (mapping) entre le rôle Entra ID (ex: "App.Admin") et l'enum Prisma `Role` (`ADMIN_DSI`).
3. Le token applicatif interne (`SESSION_SECRET`) sera généré de la même façon qu'aujourd'hui, l'OIDC n'impactera que la phase de Login initiale.
