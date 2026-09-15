# Note technique v32

La v32 ajoute un hub communication offline-first.

Modules :
- registre API ;
- hub applications ;
- Drive d’équipe ;
- file de synchronisation ;
- IndexedDB ;
- backup/restauration ;
- plein écran ;
- responsive resizing.

Limite importante :
Une API externe n’est pas disponible hors ligne.
Le logiciel conserve hors ligne :
- configuration ;
- catalogue ;
- index ;
- cache ;
- snapshots ;
- files sélectionnés si autorisés.

La synchronisation se fait quand le réseau et les droits sont disponibles.
