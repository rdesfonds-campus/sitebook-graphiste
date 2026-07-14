/* ============================================================
   Book graphiste — galerie filtrée + flipbook + fiche produit
   ------------------------------------------------------------
   ✏️ POUR METTRE TES VRAIS VISUELS :
   Remplace les appels ph('Texte', '#couleur') par le chemin de
   ton image, ex :  cover: 'assets/catalogue-nature-cover.jpg'
   - cover  : vignette dans la grille
   - images : visuels de la fiche produit (1er = principal)
   - pages  : pages du catalogue, dans l'ordre (1 image = 1 page)
   ============================================================ */

/* --- Générateur de placeholder (SVG en data-URI) — à supprimer
       quand toutes les images seront remplacées --- */
function ph(label, color, w = 800, h = 800) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
    `<rect width="100%" height="100%" fill="${color}"/>` +
    `<rect x="12" y="12" width="${w - 24}" height="${h - 24}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="2" stroke-dasharray="8 6"/>` +
    `<text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.round(w / 18)}" fill="#fff" text-anchor="middle" dominant-baseline="middle">${label}</text>` +
    `</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
/* Pages de catalogue placeholder (format portrait) */
function phPages(name, color, n) {
  const pages = [];
  for (let i = 1; i <= n; i++) pages.push(ph(`${name} — p.${i}`, color, 600, 800));
  return pages;
}

/* --- Pages RÉELLES d'un catalogue : dossier + nombre de pages.
       Attend des fichiers nommés page_01.webp, page_02.webp, …
       (+ page_cover.webp pour la couverture, ajoutée à part) --- */
function catPages(dir, n) {
  const pages = [];
  for (let i = 1; i <= n; i++) {
    pages.push(`${dir}/page_${String(i).padStart(2, '0')}.webp`);
  }
  return pages;
}

/* ============================================================
   FILTRES — ordre d'affichage des chips
   ============================================================ */
const FILTERS = [
  { tag: '*',           label: 'Tous' },
  { tag: 'nature-cos',  label: 'Nature&cos' },
  { tag: 'siroco',      label: 'Siroco' },
  { tag: 'catalogue',   label: 'Catalogues' },
  { tag: 'plv',         label: 'PLV' },
  { tag: 'presentoir',  label: 'Présentoirs' },
  { tag: 'packaging',   label: 'Packaging' },
  { tag: 'eshop',       label: 'E-shop' },
  { tag: 'cm',          label: 'Community management' },
  { tag: 'newsletter',  label: 'Newsletters' },
  { tag: 'print',       label: 'Print' },
  { tag: 'web',         label: 'Web' },
  { tag: 'tableaux',    label: 'Tableaux' },
];

const TAG_LABELS = Object.fromEntries(FILTERS.map(f => [f.tag, f.label]));

/* ============================================================
   PROJETS
   type: 'catalogue' → viewer flipbook (pages qui tournent)
   type: 'produit'   → fiche produit avec vignettes (type Amazon)
                       (1 seule image = pas de vignettes, simple zoom)
   ratio (catalogues) : largeur/hauteur d'UNE page.
     1           → carré
     0.75        → 3:4 (1200×1600)
     1200 / 1691 → A4 réel (≈ 0.71)
   ============================================================ */
const ITEMS = [
  {
    id: 'cat-naturecos-cc',
    type: 'catalogue',
    title: 'Catalogue Nature.cos CC',
    société: 'Nature&cos',
    tags: ['nature-cos', 'catalogue', 'print'],
    description: 'Catalogue produits 14 pages — direction artistique, mise en page, retouche photo, fichier HD certifié imprimeur.',
    cover: 'assets/catalogue/naturecos-CC/page_cover.webp',
    pages: [
      'assets/catalogue/naturecos-CC/page_cover.webp', // couverture = 1re page du flipbook
      ...catPages('assets/catalogue/naturecos-CC', 14),
    ],
    ratio: 1, // pages carrées — ⚠️ vérifie que ce catalogue est bien carré
  },
  {
    id: 'cat-naturecos-add',
    type: 'catalogue',
    title: 'Catalogue Nature.cos ADD',
    société: 'Nature.cos',
    tags: ['nature-cos', 'catalogue', 'print'],
    description: 'Catalogue produits 7 pages — direction artistique, mise en page, retouche photo, fichier HD certifié imprimeur.',
    cover: 'assets/catalogue/naturecos-ADD/page_cover.webp',
    pages: [
      'assets/catalogue/naturecos-ADD/page_cover.webp',
      ...catPages('assets/catalogue/naturecos-ADD', 6),
    ],
    ratio: 1, // pages carrées — ⚠️ vérifie que ce catalogue est bien carré
  },
  {
    id: 'cat-naturecos-mw',
    type: 'catalogue',
    title: 'Catalogue Nature.cos MW',
    société: 'Nature.cos',
    tags: ['nature-cos', 'catalogue', 'print'],
    description: 'Catalogue produits 7 pages — direction artistique, mise en page, retouche photo, fichier HD certifié imprimeur.',
    cover: 'assets/catalogue/naturecos-MW/page_cover.webp',
    pages: [
      'assets/catalogue/naturecos-MW/page_cover.webp',
      ...catPages('assets/catalogue/naturecos-MW', 14),
    ],
    ratio: 1,
  },
  {
    id: 'cat-naturecos-add_bible',
    type: 'catalogue',
    title: 'Bible ADD Nature.cos',
    société: 'Nature.cos',
    tags: ['nature-cos', 'catalogue', 'print'],
    description: 'Bible produits et soins Atelier des Délices 124 pages — mise en page, retouche photo, fichier HD certifié imprimeur.',
    cover: 'assets/catalogue/naturecos-bibleADD/page_cover.webp',
    pages: [
      'assets/catalogue/naturecos-bibleADD/page_cover.webp',
      ...catPages('assets/catalogue/naturecos-bibleADD', 20),
    ],
    ratio: 1200 / 1691,
  },
  {
    id: 'cat-siroco',
    type: 'catalogue',
    title: 'Catalogue Siroco 2024',
    société: 'Siroco SAS',
    tags: ['siroco', 'catalogue', 'print'],
    description: 'Catalogue des prestations Siroco 2024 — Branding, mise en page, retouche photo, fichier HD certifié imprimeur.',
    cover: 'assets/catalogue/siroco-2024/page_cover.webp',
    pages: [
      'assets/catalogue/siroco-2024/page_cover.webp',
      ...catPages('assets/catalogue/siroco-2024', 12),
    ],
    ratio: 1200 / 1691,
  },
  {
    id: 'plv-totem-triptyque',
    type: 'produit',
    title: 'PLV totem triptyque',
    société: 'Nature.cos',
    tags: ['nature-cos', 'plv', 'print'],
    description: 'PLV 154x154cm : porte affiche 50x154cm',
    images: [
      { src: 'assets/totem/totem_triptyque-recto-01.webp',
        alt: 'PLV totem triptyque Nature.cos 154×154 cm — vue de face' },
      { src: 'assets/totem/totem_triptyque-verso-02.webp',
        alt: 'Porte-affiche 50×154 cm du totem triptyque' },
      { src: 'assets/totem/totem_triptyque-posters-03.webp',
        alt: 'Totem triptyque en situation magasin' },
    ],
  },
 {
    id: 'photo-pro',
    type: 'photos',
    title: 'Photos professionnelles',
    société: 'Nature.cos',
    tags: ['nature.cos', 'photos promotionnelles','refflex', 'print'],
    description: 'Photos promotionnelles utilisées pour supports de communication',
    images: [
      { src: 'assets/photo-promotionnelle/presentoir-produits-CC-01.webp',
        alt: 'Photo de présentoir gamme Couleur Caramel à l\'attention des dépositaires' },
      { src: 'assets/photo-promotionnelle/presentoir-produits-CC-02.webp',
        alt: 'Photo de présentoir gamme Couleur Caramel à l\'attention des dépositaires' },
      { src: 'assets/photo-promotionnelle/presentoir-produits-MW-03.webp',
        alt: 'Photo de présentoir gamme miss W à l\'attention des dépositaires' },
      { src: 'assets/photo-promotionnelle/skinvision-01.webp',
        alt: 'Photo promotionnelle de l\'appareil à diagnostic peau Skin@vision à l\'attention des dépositaires' },
            { src: 'assets/photo-promotionnelle/skinvision-02.webp',
        alt: 'Photo promotionnelle de l\'appareil à diagnostic peau Skin@vision à l\'attention des dépositaires' },  
    ],
  },
  {
    id: 'eshop-fiches',
    type: 'produit',
    title: 'Visuels fiches produit e-shop',
    société: 'Siroco',
    tags: ['siroco', 'eshop', 'web'],
    description: 'Pack de visuels normés marketplace : fond blanc, mises en situation, infographies produit.',
    images: [
      ph('Fond blanc', '#c98a4c'),
      ph('Mise en situation', '#d99a5c'),
      ph('Infographie', '#b97a3c'),
    ],
  },
  {
    id: 'eshop-bannieres',
    type: 'produit',
    title: 'Bannières e-shop & campagnes',
    société: 'Nature&cos',
    tags: ['nature-cos', 'eshop', 'web'],
    description: 'Slider homepage, bannières catégories et déclinaisons display.',
    images: [ph('Bannières e-shop', '#7a9a8a')],
  },
  {
    id: 'cm-instagram',
    type: 'produit',
    title: 'Community management Instagram',
    société: 'Nature&cos',
    tags: ['nature-cos', 'cm', 'web'],
    description: 'Charte feed, templates posts & stories, calendrier éditorial.',
    images: [
      ph('Feed Instagram', '#8a6a9a'),
      ph('Template post', '#9a7aaa'),
      ph('Template story', '#7a5a8a'),
    ],
  },
  {
    id: 'newsletter',
    type: 'produit',
    title: 'Newsletters mensuelles',
    société: 'Siroco',
    tags: ['siroco', 'newsletter', 'web'],
    description: 'Gabarit responsive, déclinaison mensuelle, intégration dans l\'outil d\'emailing.',
    images: [
      ph('Newsletter — desktop', '#4a7a9a'),
      ph('Newsletter — mobile', '#3a6a8a', 400, 700),
    ],
  },
  {
    id: 'affiche-print',
    type: 'produit',
    title: 'Affiche événementielle',
    société: 'Projet print',
    tags: ['print'],
    description: 'Affiche 40×60 — création typographique et illustration.',
    images: [ph('Affiche 40×60', '#a04a4a', 600, 800)],
  },
  {
    id: 'webdesign',
    type: 'produit',
    title: 'Webdesign landing page',
    société: 'Projet web',
    tags: ['web'],
    description: 'Maquette Figma responsive — desktop, tablette, mobile.',
    images: [
      ph('Maquette desktop', '#4a5a7a'),
      ph('Maquette mobile', '#3a4a6a', 400, 700),
    ],
  },
  {
    id: 'tableau-1',
    type: 'produit',
    title: 'Tableau — acrylique sur toile',
    société: 'Travail personnel',
    tags: ['tableaux'],
    description: 'Acrylique sur toile, 65×54 cm.',
    images: [ph('Tableau 1', '#6a4a6a', 700, 560)],
  },
  {
    id: 'tableau-2',
    type: 'produit',
    title: 'Tableau — technique mixte',
    société: 'Travail personnel',
    tags: ['tableaux'],
    description: 'Technique mixte sur toile, 80×60 cm.',
    images: [ph('Tableau 2', '#4a4a5a', 700, 560)],
  },
];

/* ============================================================
   Galerie + filtres
   ============================================================ */
const grid = document.getElementById('grid');
const filtersEl = document.getElementById('filters');
const emptyMsg = document.getElementById('emptyMsg');
let activeFilter = '*';

function renderFilters() {
  filtersEl.innerHTML = '';
  FILTERS.forEach(f => {
    // n'affiche une chip que si au moins un projet porte le tag
    if (f.tag !== '*' && !ITEMS.some(it => it.tags.includes(f.tag))) return;
    const btn = document.createElement('button');
    btn.className = 'chip' + (f.tag === activeFilter ? ' active' : '');
    btn.textContent = f.label;
    btn.setAttribute('role', 'tab');
    btn.addEventListener('click', () => {
      activeFilter = f.tag;
      renderFilters();
      renderGrid();
    });
    filtersEl.appendChild(btn);
  });
}

function renderGrid() {
  grid.innerHTML = '';
  const visible = ITEMS.filter(
    it => activeFilter === '*' || it.tags.includes(activeFilter)
  );
  emptyMsg.hidden = visible.length > 0;

  visible.forEach((it, i) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.style.animationDelay = `${i * 40}ms`;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', it.title);

    const img = document.createElement('img');
    // fallback vignette : 1re image du produit (chaîne OU objet {src, alt})
    const first = it.images && it.images[0];
    img.src = it.cover || (typeof first === 'string' ? first : first && first.src) || '';
    img.alt = it.title;
    img.loading = 'lazy';

    const badge = document.createElement('span');
    badge.className = 'card-badge' + (it.type === 'catalogue' ? ' badge-book' : '');
    badge.textContent = it.type === 'catalogue' ? '📖 Feuilleter' : TAG_LABELS[it.tags[1]] || TAG_LABELS[it.tags[0]] || '';

    const label = document.createElement('div');
    label.className = 'card-label';
    label.innerHTML = `<h3></h3><p></p>`;
    label.querySelector('h3').textContent = it.title;
    label.querySelector('p').textContent = it.société;

    card.append(img, badge, label);
    const open = () => it.type === 'catalogue' ? openBook(it) : openProduct(it);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
    grid.appendChild(card);
  });
}

/* ============================================================
   Modale fiche produit (type Amazon)
   ============================================================ */
const productOverlay = document.getElementById('productOverlay');
const pmMainImg = document.getElementById('pmMainImg');
const pmThumbs = document.getElementById('pmThumbs');
const pmTitle = document.getElementById('pmTitle');
/* ⚠️ l'id dans index.html reste 'pmClient' — seule la variable est renommée */
const pmSociete = document.getElementById('pmClient');
const pmDesc = document.getElementById('pmDesc');
const pmTags = document.getElementById('pmTags');

function openProduct(item) {
  /* images accepte 2 formats, mélangeables :
       'chemin.webp'                            → alt = titre du projet
       { src: 'chemin.webp', alt: 'texte SEO' } → alt personnalisé
     L'ordre d'affichage = l'ordre du tableau (1re = visuel principal). */
  const imgs = item.images.map(im =>
    typeof im === 'string' ? { src: im, alt: item.title } : im
  );

  pmTitle.textContent = item.title;
  pmSociete.textContent = item.société;
  pmDesc.textContent = item.description;

  pmTags.innerHTML = '';
  item.tags.forEach(t => {
    const s = document.createElement('span');
    s.textContent = TAG_LABELS[t] || t;
    pmTags.appendChild(s);
  });

  // vignettes : cliquer remplace le visuel principal
  pmThumbs.innerHTML = '';
  pmThumbs.hidden = imgs.length < 2;
  imgs.forEach((imgDef, i) => {
    const b = document.createElement('button');
    b.className = i === 0 ? 'active' : '';
    b.setAttribute('aria-label', imgDef.alt || `Visuel ${i + 1}`);
    const im = document.createElement('img');
    im.src = imgDef.src;
    im.alt = imgDef.alt || '';
    b.appendChild(im);
    const select = () => {
      if (pmMainImg.src === imgDef.src) return;
      // fondu doux lors du changement de visuel
      pmMainImg.style.opacity = '0';
      setTimeout(() => {
        pmMainImg.src = imgDef.src;
        pmMainImg.alt = imgDef.alt || item.title;
        pmMainImg.onload = () => { pmMainImg.style.opacity = '1'; };
      }, 150);
      pmThumbs.querySelectorAll('button').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    };
    b.addEventListener('click', select);
    b.addEventListener('mouseenter', select); // comme Amazon : survol = aperçu
    pmThumbs.appendChild(b);
  });

  pmMainImg.src = imgs[0].src;
  pmMainImg.alt = imgs[0].alt || item.title;
  openOverlay(productOverlay);
}

/* ============================================================
   Viewer catalogue — flipbook (StPageFlip)
   ============================================================ */
const bookOverlay = document.getElementById('bookOverlay');
const bvStage = document.querySelector('.bv-stage');
const bvTitle = document.getElementById('bvTitle');
const bvPageInfo = document.getElementById('bvPageInfo');
let flipbookEl = null;
let pageFlip = null;

function openBook(item) {
  bvTitle.textContent = item.title;
  openOverlay(bookOverlay);

  /* StPageFlip abîme son conteneur lors du destroy() : on recrée
     donc un conteneur neuf à chaque ouverture */
  bvStage.innerHTML = '';
  flipbookEl = document.createElement('div');
  flipbookEl.id = 'flipbook';
  bvStage.appendChild(flipbookEl);

  // construit les pages
  item.pages.forEach(src => {
    const page = document.createElement('div');
    page.className = 'page';
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    page.appendChild(img);
    flipbookEl.appendChild(page);
  });

  /* Dimensions : occupe le maximum de la scène.
     ⚠️ clientHeight / clientWidth : propriétés natives du DOM,
     à ne jamais renommer (le "client" n'a rien à voir avec un client !) */
  const ratio = item.ratio || 0.75;
  const maxH = bvStage.clientHeight - 8;
  const maxW = bvStage.clientWidth - 8;
  const portrait = maxW < 640; // mobile : 1 page ; desktop : double page
  let pageH = maxH;
  let pageW = pageH * ratio;
  const totalW = portrait ? pageW : pageW * 2;
  if (totalW > maxW) {
    pageW = (portrait ? maxW : maxW / 2);
    pageH = pageW / ratio;
  }

  pageFlip = new St.PageFlip(flipbookEl, {
    width: Math.round(pageW),
    height: Math.round(pageH),
    size: 'fixed',
    usePortrait: portrait,
    showCover: true,
    maxShadowOpacity: 0.4,
    mobileScrollSupport: false,
  });
  pageFlip.loadFromHTML(flipbookEl.querySelectorAll('.page'));

  const updateInfo = () => {
    bvPageInfo.textContent =
      `${pageFlip.getCurrentPageIndex() + 1} / ${item.pages.length}`;
  };
  pageFlip.on('flip', updateInfo);
  updateInfo();
}

document.getElementById('bvPrev').addEventListener('click', () => pageFlip && pageFlip.flipPrev());
document.getElementById('bvNext').addEventListener('click', () => pageFlip && pageFlip.flipNext());

function closeBook() {
  if (pageFlip) {
    try { pageFlip.destroy(); } catch (e) { /* déjà détruit */ }
    pageFlip = null;
  }
  bvStage.innerHTML = '';
  flipbookEl = null;
}

/* ============================================================
   Gestion générique des overlays
   ============================================================ */
function openOverlay(el) {
  el.hidden = false;
  document.body.classList.add('no-scroll');
}
function closeOverlay(el) {
  if (el === bookOverlay) closeBook();
  el.hidden = true;
  document.body.classList.remove('no-scroll');
}

[productOverlay, bookOverlay].forEach(ov => {
  // clic sur le fond ou sur ✕ → fermer
  ov.addEventListener('click', e => {
    if (e.target === ov || e.target.closest('[data-close]')) closeOverlay(ov);
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    [productOverlay, bookOverlay].forEach(ov => { if (!ov.hidden) closeOverlay(ov); });
  }
  // flèches clavier dans le flipbook
  if (!bookOverlay.hidden && pageFlip) {
    if (e.key === 'ArrowLeft') pageFlip.flipPrev();
    if (e.key === 'ArrowRight') pageFlip.flipNext();
  }
});

/* ============================================================
   Formulaire de contact (anti-bots)
   - L'adresse de destination vit dans contact.php, jamais dans
     le HTML → pas de scraping possible.
   - Honeypot (champ "website" invisible) + piège temporel (ts).
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
document.getElementById('formTs').value = Math.floor(Date.now() / 1000);

contactForm.addEventListener('submit', async e => {
  e.preventDefault();
  formStatus.className = 'form-status';

  if (!contactForm.checkValidity()) {
    formStatus.classList.add('err');
    formStatus.textContent = 'Merci de remplir les champs obligatoires (*).';
    return;
  }

  const btn = contactForm.querySelector('button[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Envoi…';

  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Erreur serveur');
    formStatus.classList.add('ok');
    formStatus.textContent = 'Message envoyé, merci ! Je vous réponds rapidement.';
    contactForm.reset();
    document.getElementById('formTs').value = Math.floor(Date.now() / 1000);
  } catch (err) {
    formStatus.classList.add('err');
    formStatus.textContent = location.protocol === 'file:'
      ? 'Le formulaire nécessite un serveur PHP (il fonctionnera une fois en ligne sur IONOS).'
      : 'Échec de l\'envoi. Réessayez ou utilisez le bouton email ci-contre.';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Envoyer';
  }
});

/* ============================================================
   Coordonnées masquées — jamais en clair dans le HTML.
   Les bots scrapent le HTML brut ; ici email et téléphone sont
   assemblés en JS au clic seulement. Même principe pour les deux.
   ✏️ Remplace les morceaux par les tiens.
   ============================================================ */
function revealContact(btnId, parts, hrefPrefix) {
  const btn = document.getElementById(btnId);
  btn.addEventListener('click', () => {
    const value = parts.join('');
    const a = document.createElement('a');
    a.href = hrefPrefix + value;
    a.textContent = value;
    btn.replaceWith(a);
  }, { once: true });
}

// Email : [utilisateur, arobase, domaine]
revealContact('revealMail',
  ['romain.desfonds', '@', 'gmail.com'], 'mailto:');

// Téléphone : ✏️ mets ton vrai numéro en morceaux
revealContact('revealTel',
  ['06', ' 12', ' 34', ' 56', ' 78'], 'tel:');

/* ===== Init ===== */
renderFilters();
renderGrid();