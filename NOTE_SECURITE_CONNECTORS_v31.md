# Note sécurité v31

Ne pas utiliser de clé API brute dans le navigateur pour un usage entreprise.

Bon modèle :
Utilisateur → Signature Studio → Proxy DSI → Fournisseur IA

Le proxy :
- stocke la clé ;
- journalise les appels ;
- limite les usages ;
- applique les règles de sécurité ;
- masque les informations sensibles ;
- contrôle les coûts.

Le mode Direct navigateur existe pour tester uniquement.
