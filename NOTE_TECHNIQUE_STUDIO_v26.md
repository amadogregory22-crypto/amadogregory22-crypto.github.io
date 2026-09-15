# Note technique v26

La v26 introduit un Studio Créatif Canva-like.

Architecture :
- une page Studio contient des objets ;
- chaque objet a x, y, w, h, rotation, opacité, couleur, z-index ;
- les objets sont rendus en HTML pour l’édition ;
- les exports PNG/JPEG/PDF passent par un canvas ;
- le PDF Studio utilise le moteur PDF image-based v25.

Ce n’est pas Canva complet.
C’est le socle :
- canvas universel ;
- formats ;
- objets ;
- texte ;
- images ;
- pages ;
- calques ;
- export.

Les lots suivants ajoutent la vraie puissance :
- v27 bibliothèque Canva-like ;
- v28 effets/filtres ;
- v29 IA créative ;
- v30 collaboration entreprise.
