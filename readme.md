# Book graphiste — mode d'emploi

## Lancer
Ouvre `index.html` dans un navigateur (double-clic suffit). Aucun build. Pour IONOS : dépose le dossier tel quel via FTP.

## Mettre tes vrais visuels
Tout se passe dans `js/script.js`, tableau `ITEMS` :

1. Crée un dossier `assets/` à la racine et mets-y tes images.
2. Remplace chaque `ph('Texte', '#couleur')` par un chemin, ex. `'assets/catalogue-nature-p1.jpg'`.
   - `cover` : vignette dans la grille (privilégie ~800px de large)
   - `pages` : pages du catalogue dans l'ordre — exporte ton PDF en JPG page par page (InDesign ou Acrobat : Exporter → JPEG, ~1200px de haut)
   - `images` : visuels de la fiche produit, le 1er est le principal
3. Supprime les fonctions `ph()` et `phPages()` quand plus aucun placeholder ne reste.

## Ajouter / retirer un projet
Ajoute un objet dans `ITEMS` :
- `type: 'catalogue'` → ouvre le flipbook (nécessite `pages`)
- `type: 'produit'` → ouvre la fiche produit (nécessite `images` ; 1 seule image = pas de vignettes)

Les chips de filtre (`FILTERS`) ne s'affichent que si au moins un projet porte le tag.

## Textes à personnaliser
- `index.html` : hero, section Profil (texte + compétences), email de contact.

## Dépendance
Une seule : [StPageFlip](https://nodlik.github.io/StPageFlip/) chargée en CDN (effet pages qui tournent + swipe tactile). Pour du 100 % offline, télécharge `page-flip.browser.js` et pointe la balise `<script>` dessus.# sitebook-graphiste
