# Note technique v28

La v28 ajoute des effets à chaque objet Studio.

Chaque objet peut avoir :
- brightness ;
- contrast ;
- saturate ;
- grayscale ;
- sepia ;
- blur ;
- hue ;
- shadow ;
- border ;
- radius ;
- fit ;
- flipX / flipY.

Rendu :
- dans l’éditeur HTML : via CSS filter, box-shadow, border-radius ;
- dans les exports : via CanvasRenderingContext2D.filter et rendu manuel des bordures/ombres.

Limites :
- les effets sont appliqués à l’objet entier ;
- le recadrage avancé par masque précis est prévu pour une suite ;
- les effets très complexes peuvent varier légèrement entre DOM et Canvas selon navigateur.
