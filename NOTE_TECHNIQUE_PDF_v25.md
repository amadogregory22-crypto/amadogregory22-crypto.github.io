# Note technique v25

La v25 génère un PDF final réel à partir du canvas.

Méthode :
1. Le document, les annotations, la signature, le filigrane et la numérotation sont rendus dans un canvas.
2. Le canvas est converti en image JPEG.
3. L’image JPEG est encapsulée dans un fichier PDF.
4. Le navigateur télécharge le PDF final.

Avantages :
- rendu fidèle ;
- PDF réellement téléchargeable ;
- compatible avec les lecteurs PDF ;
- fonctionne sans backend.

Limites :
- PDF image-based ;
- texte non sélectionnable ;
- pas de modification vectorielle du PDF source ;
- pas de conservation des calques PDF d’origine.

La suite logique est un moteur PDF vectoriel ou une librairie spécialisée.
