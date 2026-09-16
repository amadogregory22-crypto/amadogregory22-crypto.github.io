# Système de conception — carte professionnelle RAGT

**Statut :** référentiel de conception pour le Studio Signature RAGT 3.0.0.  
**But :** générer des signatures-cartes cohérentes, modifiables et compatibles avec le HTML e-mail. Ce document précède tout ajout de nouveau modèle visuel.

## 1. Cadrage du besoin

| Sujet | Décision de conception |
|---|---|
| Entreprise / marque | RAGT Semences, identité bleu profond et jaune RAGT. |
| Utilisateur | Collaborateur RAGT dont les coordonnées doivent pouvoir être mises à jour sans changer le système visuel. |
| Destinataire | Contact professionnel qui lit la carte dans un e-mail, majoritairement sur Outlook ou webmail. |
| Objectif principal | Identifier la personne et permettre un contact immédiat. |
| Objectifs complémentaires | Valoriser la marque, rediriger vers le site et les réseaux, partager une vCard et afficher une campagne temporaire. |
| Contexte | Aperçu Studio, collage Outlook, fichier HTML et portail collaborateur hors connexion. |

La donnée prime sur la décoration : le nom, la fonction et les moyens de contact restent du texte HTML, jamais du texte incrusté dans une image.

## 2. Inventaire et règles de contenu

| Famille | Éléments | Règle par défaut | Paramètres disponibles |
|---|---|---|---|
| Identité | Civilité, prénom, nom, fonction, département, service | Nom, fonction et entreprise visibles ; le reste est facultatif | Texte, libellé, affichage |
| Contact | Fixe, mobile, direct, standard, fax, e-mail, adresse, site | E-mail et au moins un téléphone requis pour une carte complète | Texte, libellé, affichage, lien |
| Marque | Logo principal, logo secondaire, certification, slogan | Logo principal verrouillé par le gabarit choisi ; les autres sont facultatifs | Taille, alignement, lien, affichage |
| Réseaux | Site, LinkedIn, Facebook, Instagram, YouTube, X, TikTok | Réseaux actifs uniquement | URL, icône, couleur, style, affichage |
| QR | vCard, URL, e-mail, téléphone ou contenu personnalisé | Facultatif ; vCard recommandée | Contenu, contraste, correction, taille, position, affichage |
| Image carte | Photo, illustration, modèle visuel importé, campagne | Facultatif ; ne masque jamais les blocs éditables | Import, texte alternatif, lien, dates, taille, proportions, position |

Les éléments fournis par la charte (logo et couleurs RAGT) sont proposés par défaut. Les données collaborateur restent modifiables ; aucun modèle importé ne doit désactiver logo, QR ou réseaux sans action explicite.

## 3. Hiérarchie de l’information

| Niveau | Contenu | Traitement |
|---:|---|---|
| 1 | Logo, prénom, nom, fonction | Zone immédiatement visible ; nom en gras, 15–16 px. |
| 2 | Téléphone, mobile, e-mail, site | Bloc contact compact, liens cliquables, 10–12 px. |
| 3 | Adresse, réseaux sociaux, QR | Après les coordonnées ; QR isolé avec marge blanche. |
| 4 | Slogan, image ou campagne | Zone séparée, optionnelle et datée. |

Une variante ne doit jamais faire passer une campagne avant le nom ou l’e-mail.

## 4. Mini design system RAGT

| Jeton | Valeur | Usage |
|---|---|---|
| Bleu principal | `#0C3866` | Titres, liens, logo, texte fort |
| Jaune RAGT | `#F7BD00` | Séparateur et accent |
| Bleu/vert secondaire | `#004B87` / `#285D63` | Ton secondaire contrôlé |
| Texte | `#2D3748` | Coordonnées sur fond clair |
| Texte atténué | `#718096` | Fonction et informations secondaires |
| Fond | `#FFFFFF` | Signature standard |
| Police | Arial / Helvetica par défaut | Police web-safe compatible Outlook |
| Échelle | 9, 11, 12, 15, 16 px | Texte légal, coordonnées, fonction, nom |
| Espaces | 4, 8, 12, 16, 24 px | Échelle unique entre lignes et blocs |
| Bordure | 1 px, rayon 0–10 px | Utilisée avec parcimonie |

La vérification de contraste du Studio doit rester à au moins 4,5:1 pour le texte principal sur le fond choisi. Les logos conservent leur ratio et une zone de respiration au moins égale à 8 px.

## 5. Support et contraintes HTML e-mail

- **Largeur de référence :** 540 px ; carte compacte : 360–460 px ; carte avec QR : 520 px.
- **Orientation :** horizontale par défaut ; la variante mobile empile les blocs.
- **Grille :** tableaux HTML, largeurs en pixels, styles en ligne, séparateurs simples, aucune dépendance à Flexbox ou Grid dans le HTML exporté.
- **Images :** texte alternatif et dimensions explicites ; le portail tente de les embarquer afin de fonctionner hors connexion.
- **Effets exclus :** animations, positionnement absolu critique, texte dans une image, filtres et ombres nécessaires à la compréhension.
- **Environnements :** aperçu clair, sombre, Outlook, mobile et images bloquées dans le Studio. La validation client réelle reste consignée dans `RECETTE_OUTLOOK.md`.

## 6. Grille et wireframes

La grille a des marges internes de 12–16 px et des gouttières de 12–16 px. Tous les blocs suivent son axe haut, médian ou bas.

| Modèle | Wireframe | Cas d’usage |
|---|---|---|
| A | `[ Logo ] │ [ Identité + contact ]` | Corporate classique, Outlook sûr |
| B | `[ Identité + contact ] │ [ Logo ]` | Signature inversée |
| C | `[ Logo ] / [ Identité + contact + QR ]` | Logo haut, contenu sous-jacent |
| D | `[ blocs ordonnés ]` | Carte centrée libre : l’ordre logo, identité, coordonnées, réseaux, QR, slogan et image est réglable |
| E | `[ Logo ] │ [ Identité + contact ] │ [ QR ]` | Carte de visite et prise de contact |
| F | `[ Logo · Nom · contact essentiel ]` | Réponse rapide / Outlook minimal |
| G | `[ Logo ] / [ Identité ] / [ Contact ]` | Mobile empilé |
| H | `[ Logo + identité + contact ] / [ Campagne ]` | Communication temporaire |
| I | `[ Logo ] [ image + identité ] [ réseaux + QR ]` | Carte RAGT institutionnelle |

Les modèles A à F sont les wireframes de base demandés. G à I couvrent l’empilement mobile, la zone promotionnelle et la carte RAGT complète. Le bouton **Voir en noir & blanc** du Studio retire la charte des miniatures afin de comparer uniquement les zones et les alignements avant l’application des couleurs ou des images.

## 7. Composants modulaires et personnalisation

| Composant | Rôle | Paramètres principaux |
|---|---|---|
| `LogoComponent` | Logo principal, secondaire ou badge | URL, texte alternatif, largeur, alignement, lien, visible |
| `IdentityComponent` | Nom, fonction, service, entreprise | Texte, police, taille, graisse, couleur, visible |
| `ContactComponent` | Téléphones, e-mail, site, adresse | Libellé, valeur, lien, icône, visible |
| `SocialComponent` | Réseaux sociaux | URL, couleur, style, taille, espacement, alignement, actif |
| `QRCodeComponent` | QR fonctionnel | Type, contenu, taille, position, couleurs, marge, visible |
| `BannerComponent` | Photo, bannière ou campagne | Image, alt, lien, dates, taille, proportions, position, visible |
| `SloganComponent` | Baseline ou message | Texte, taille, couleur, alignement, position, visible |
| `SeparatorComponent` | Rythme entre les zones | Type, couleur, épaisseur, style, marge |
| `BackgroundComponent` | Fond, motif ou bordure | Couleur/image, opacité, taille, bordure, rayon |

Les paramètres sont regroupés dans cinq espaces de l’interface : **Choisir un gabarit**, **Renseigner mes coordonnées**, **Ajouter mes visuels**, **Mettre en forme**, **Vérifier et installer**. Les sous-sections restent dans le panneau de la rubrique active.

## 8. Variantes validées par le système

1. Corporate classique (A) ; 2. inversée (B) ; 3. logo haut (C) ; 4. centrée libre (D) ; 5. carte QR (E) ; 6. minimale (F) ; 7. mobile (G) ; 8. campagne (H) ; 9. carte RAGT (I) ; 10. Premium RAGT (E avec QR, badge et cadre bleu).

Les préréglages nommés complètent ces structures : Corporate officiel, Carte RAGT, Carte de visite RAGT, Commercial, Salon, Minimaliste, RH et Mobile. Un modèle visuel importé ajoute une image à la composition et laisse tous les composants modifiables.

## 9. Règles clair, sombre et responsive

- Le HTML de signature reste sur des couleurs explicites et lisibles dans les clients e-mail ; le mode sombre du Studio est un environnement de contrôle, pas une promesse de forçage de couleur dans Outlook.
- À 390 et 768 px, le Studio priorise l’édition et l’aperçu sans rendre inaccessible un réglage. À partir de 1 024 px, les panneaux sont affichés conjointement.
- La signature exportée reste à largeur fixe compatible ; le modèle G est recommandé lorsqu’une présentation très étroite est attendue.
- QR, logos et pictogrammes doivent être lisibles en images bloquées grâce aux textes, liens et libellés HTML voisins.

## 10. Cas de test et critères d’acceptation

| Cas | Résultat attendu |
|---|---|
| Nom ou fonction très longue | Aucune valeur perdue, structure HTML toujours valide et lisible dans la largeur du modèle. |
| Un ou deux téléphones | Les lignes absentes sont retirées sans trou visuel. |
| Adresse longue | Retour dans le bloc adresse sans chevauchement. |
| QR activé/désactivé | QR réel, contrasté et avec marge ; aucune colonne vide si masqué. |
| Réseaux nombreux | Icônes homogènes, liens présents uniquement pour les réseaux actifs. |
| Campagne active/planifiée/expirée | Seulement les nouvelles sorties reflètent les dates. |
| Images bloquées | Nom, fonction et contacts restent exploitables. |
| A–I, clair/sombre/mobile | Aucune image critique ni bloc manquant. |
| Outlook Windows, New Outlook, Outlook Web | Recette manuelle datée et consignée avant toute mention « validé ». |

Les contrôles automatisés sont exécutés avec `npm test`, `npm run lint` et `npm run build`. Les tests de compatibilité réels et les dimensions d’écran sont tracés dans `RECETTE_OUTLOOK.md` et `RECETTE_RESPONSIVE.md`.

Le panneau **Vérifier** signale aussi une fonction manquante, un logo dont les proportions ne sont pas conservées, un QR inférieur à 60 px ou peu contrasté, un réseau actif sans URL et une image sans texte alternatif.

## 11. Revue avant ajout d’une carte

Avant de créer ou publier un nouveau visuel, confirmer dans cet ordre :

1. son objectif et ses destinataires ;
2. son inventaire de contenu et les éléments facultatifs ;
3. sa hiérarchie ;
4. le modèle A–I qui sert de grille ;
5. les contrastes, espaces et proportions du logo ;
6. les variantes avec/sans QR, réseaux et campagne ;
7. les données longues ;
8. la sortie HTML et le portail hors connexion ;
9. la recette Outlook documentée.

Cette séquence empêche qu’une image complète remplace les informations éditables ou qu’un décor prenne la place d’un moyen de contact.
