# Handoff QA (Assurance Qualité)

## Stratégie de Tests
Le projet suit une stratégie E2E (End-to-End) prioritaire via **Playwright**.
L'objectif est de valider les flux utilisateurs clés du point de vue d'un navigateur réel (Chromium, Firefox, WebKit).

## Lancement des Tests
```bash
# À la racine du monorepo
npm run test:e2e          # Exécution silencieuse (idéal CI)
npm run test:e2e:ui       # Exécution avec l'interface Playwright (idéal débug)
npm run test:e2e:headed   # Exécution dans un navigateur visible
```

## Scénarios Couverts (V3.0)
9 fichiers couvrent les scénarios clés de l'application :
1. `01-home.spec.ts` : Affichage de l'accueil et absence d'erreur fatale.
2. `02-navigation.spec.ts` : Vérification du routage vers toutes les pages.
3. `03-signature.spec.ts` : Modification basique d'une signature.
4. `04-library.spec.ts` : Upload mock d'un fichier et filtrage par "Favoris".
5. `05-connectors.spec.ts` : Visualisation et action de test d'un connecteur.
6. `06-api.spec.ts` : Ping direct sur l'API sans passer par l'UI.
7. `07-mobile.spec.ts` : Test de lisibilité en affichage smartphone.
8. `08-signature-v2.spec.ts` : Fonctions avancées de la signature (Qualité, Templates, Preview).
9. `09-signature-fallback.spec.ts` : Résilience et mode Hors-ligne si le backend ou PostgreSQL est inaccessible.
10. `10-signature-real-db.spec.ts` : Preuve de persistance réelle, requérant le lancement effectif de PostgreSQL et du Backend.

## Définition d'un Test Réussi (Non-Fragilité)
Pour éviter un enfer de maintenance (tests fragiles ou *flaky tests*), respectez ces règles lors de l'ajout de nouveaux tests en V2 :
1. **Éviter les textes codés en dur** : Utilisez `getByTestId('...')` plutôt que `getByText('Valider')`.
2. **Pas de `waitForTimeout`** : Laissez Playwright attendre implicitement l'apparition d'un élément avec `await expect(...).toBeVisible()`.
3. **Isolation** : Un test ne doit pas dépendre de l'état laissé par le test précédent. L'API Playwright ouvre un nouveau contexte vierge par défaut.

## Tests Prioritaires à Ajouter en V2
Dès qu'une fonctionnalité réelle backend sera intégrée, les tests Playwright correspondants devront être adaptés ou ajoutés :
- **Connexion SSO** : Comment l'application réagit quand un utilisateur se logge via Azure AD (Playwright peut mocker le token ou automatiser une mire de test).
- **Upload Réel** : Test de l'input type file `page.setInputFiles(...)` vers la vraie API S3/SharePoint.
- **Rôles** : Valider qu'un utilisateur standard ne voit pas le menu Administration, contrairement à un admin.

## Lot 6 - Assets Library
- **Upload Testing**: Try uploading SVG, PNG, WebP, PDF. Ensure SVG fails with 400. Ensure file size limits work.
- **Security**: Inspect network responses. storagePath should never appear. DELETE should return 204 but keep file on disk.
- **Permissions**: Verify READ_ONLY cannot upload. Verify USER cannot validate.

## Lot 7 - Génération Massive (Import CSV)
- **Import CSV**: Tester le drag&drop avec différents encodages (UTF-8, Latin-1). Vérifier que les séparateurs sont bien détectés.
- **Validation**: Vérifier que les doublons d'email et les mauvais formats sont bloqués en invalid.
- **Permissions**: Vérifier que USER et READ_ONLY n'ont pas accès au Bulk Import.

## Validation r�elle PostgreSQL / Docker (Phase 4.3)
Cette section atteste des commandes et de l'�tat de l'infrastructure Docker/PostgreSQL.

- **Commandes exactes pour d�marrer localement** :
  1. docker compose config (V�rification de la syntaxe et des volumes)
  2. docker compose up -d postgres (D�marrage du conteneur en arri�re-plan)
  3. cd backend && npx prisma migrate dev (Cr�ation des tables)
- **Statut r�el actuel** : L'environnement Docker / PostgreSQL est parfaitement configur� (voir docker-compose.yml), mais le lancement physique du conteneur doit �tre fait sur le poste h�te final.
- **Fallback M�moire** : En d�veloppement, si PostgreSQL est absent, l'application peut fonctionner en m�moire si ENABLE_MEMORY_FALLBACK=true est pass� en variable d'environnement. **Ce fallback est strictement interdit et bloqu� en production.**
- **Limites** : Les donn�es mock�es via le fallback disparaissent au red�marrage.
- **Comment v�rifier la persistance r�elle** :
  1. Lancez PostgreSQL (docker compose up -d postgres).
  2. Allez dans le Studio graphique (via le navigateur) et sauvegardez un projet.
  3. Red�marrez le backend (Ctrl+C puis 
pm run dev).
  4. Rechargez la page : le projet doit �tre intact.
- **Comment red�marrer proprement** : docker compose restart postgres puis red�marrage du backend.
- **Comment diagnostiquer une erreur DATABASE_URL** : Si l'API renvoie une erreur 500 ou si Prisma �choue � se connecter, v�rifiez que DATABASE_URL dans le fichier .env du backend correspond exactement � : postgresql://ragt_admin:ragt_password@localhost:5432/ragt_studio?schema=public (Remplacez postgres par localhost si ex�cut� en dehors de Docker).
