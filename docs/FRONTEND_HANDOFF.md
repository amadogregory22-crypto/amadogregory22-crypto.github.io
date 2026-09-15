# Handoff Frontend

## Architecture
- **Framework** : React 18 avec Vite.
- **Typage** : TypeScript strict.
- **Styles** : Tailwind CSS avec des variables de couleurs personnalisées définies dans `tailwind.config.ts` (ex: `ragt-forest`, `ragt-champagne`, `ragt-ivory`).
- **Gestion d'État** : Zustand. Les stores sont séparés par domaine (`appStore.ts`, `libraryStore.ts`, `signatureStore.ts`, `layoutStore.ts`).
- **Routage** : React Router v6.

## Pages Principales
L'application est découpée selon un menu de navigation exhaustif (14 routes mockées), dont :
- `/` : Tableau de bord (DashboardPage.tsx).
- `/create` : Module de création pointant vers l'éditeur de signature.
- `/create/signature` : Éditeur complet V2.
  - `IdentityForm`, `AppearanceForm` (saisie)
  - `QualityControl` (analyse en temps réel du score et poids)
  - `SignaturePreview` (avec 3 templates: Standard, Compact, Banner)
- `/library` : Bibliothèque d'assets (LibraryPage.tsx).
- `/connectors` : Panneau des connecteurs métiers (ConnectorsPage.tsx).

## Conventions de Nommage
- Composants : PascalCase (ex: `SignatureEditor.tsx`).
- Stores Zustand : camelCase avec préfixe `use` (ex: `useAppStore`).
- Data Test IDs : kebab-case (ex: `data-testid="btn-export-html"`).

## Utilisation des data-testid
Un grand effort a été mis pour ne pas rendre les tests Playwright fragiles face aux changements de texte. Tous les éléments interactifs majeurs possèdent un attribut `data-testid` :
- Navigation : `nav-home`, `nav-create`, etc.
- Actions : `btn-export-html`, `btn-upload-asset`.
- Blocs clés : `signature-preview-table`.

> Toujours utiliser `getByTestId` dans Playwright plutôt que `getByRole('button', { name: 'Texte qui peut changer' })`.

## Logique des Mocks & Prochaines Étapes
La V1 s'appuie beaucoup sur Zustand pour feindre une base de données locale (ex: `libraryStore` garde en mémoire vive un tableau d'assets).
- **Amélioration UX / Dette Technique** : Remplacer l'état initial fixe de Zustand par des appels de récupération `useEffect` utilisant l'API `fetch` (ou React Query / SWR) vers le vrai backend V2.
- **Logique d'erreur** : Gérer de vraies erreurs HTTP via l'UI (le store Toaster est prêt pour ça). Actuellement, aucune requête n'échoue.

## Lot 6 - Assets Library
- **Views**: Added dual view (grid/table) in LibraryPage.tsx.
- **Components**: Created AssetPickerModal.tsx and integrated it with AppearanceForm.tsx.
- **API**: Configured ssetsApi.ts for file uploads (FormData) and downloads.

## Lot 7 - G�n�ration Massive (Import CSV)
- **Views**: Ajout de BulkImportPage.tsx pour le processus en �tapes (Upload, Mapping, Validation, G�n�ration, Export).
- **Store**: ulkStore.ts pour la gestion du batch import, des lignes valid�es, et de la g�n�ration.
