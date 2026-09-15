# Note technique v31

La v31 ajoute une couche connecteur IA/API optionnelle.

Architecture :
- mode local par défaut ;
- mode proxy recommandé ;
- mode direct navigateur uniquement pour test ;
- mode webhook pour workflow externe.

La requête normalisée contient :
- version ;
- mode ;
- provider ;
- model ;
- prompt ;
- contexte Studio ;
- contexte document ;
- règles charte ;
- état collaboration ;
- réponse attendue.

Sécurité :
Une clé API saisie dans le navigateur est visible côté client.
Pour la production, il faut utiliser un proxy backend qui stocke la clé côté serveur.

La réponse API peut contenir :
- summary ;
- page Studio JSON ;
- objects ;
- warnings ;
- actions.

Si une page Studio JSON est retournée, elle peut être appliquée directement dans le Studio.
