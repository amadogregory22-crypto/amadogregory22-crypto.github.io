# Guide rapide backend v33

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Puis ouvrir :
- PWA : http://localhost:8787
- Health : http://localhost:8787/api/health

## Étapes production
1. Configurer HTTPS.
2. Configurer reverse proxy.
3. Brancher SSO.
4. Remplacer mémoire par base persistante.
5. Configurer stockage partagé.
6. Brancher les vrais connecteurs.
7. Activer logs et sauvegardes.
