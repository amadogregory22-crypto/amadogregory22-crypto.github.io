# Guide rapide connecteurs v34

## Lancer le backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

## Endpoints utiles
- `GET /api/connectors/catalog`
- `GET /api/connectors/status`
- `POST /api/connectors/test/sharepoint`
- `POST /api/connectors/drive/search`
- `POST /api/connectors/sharepoint/files`
- `POST /api/connectors/glpi/tickets`
- `POST /api/connectors/directory/search`

## Production
1. Configurer HTTPS.
2. Configurer SSO/OIDC.
3. Créer les applications OAuth Google/Microsoft.
4. Limiter les scopes.
5. Stocker les secrets en variables d’environnement.
6. Activer logs, quotas et supervision.
