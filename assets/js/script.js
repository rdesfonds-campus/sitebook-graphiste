/* ============================================================
   Book graphiste — galerie filtrée + flipbook + fiche produit
   ------------------------------------------------------------
   

/* --- Générateur de placeholder (SVG en data-URI) — à supprimer
       quand toutes les images seront remplacées --- */
function ph(label, color, w = 800, h = 800) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
    `<rect width="100%" height="100%" fill="${color}"/>` +
    `<rect x="12" y="12" width="${w - 24}" height="${h - 24}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="2" stroke-dasharray="8 6"/>` +
    `<text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.round(w / 18)}" fill="#fff" text-anchor="middle" dominant-baseline="middle">${label}</text>` +
    `</svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
/* Pages de catalogue placeholder (format portrait) */
function phPages(name, color, n) {
  const pages = [];
  for (let i = 1; i <= n; i++)
    pages.push(ph(`${name} — p.${i}`, color, 600, 800));
  return pages;
}

/* --- Pages RÉELLES d'un catalogue  --- */
function catPages(dir, n) {
  const pages = [];
  for (let i = 1; i <= n; i++) {
    pages.push(`${dir}/page_${String(i).padStart(2, "0")}.webp`);
  }
  return pages;
}

/* ============================================================
   FILTRES — ordre d'affichage des chips
   ============================================================ */
const FILTERS = [
  { tag: "*", label: "Tous" },
  { tag: "nature-cos", label: "Nature.cos" },
  { tag: "siroco", label: "Siroco" },
  { tag: "catalogue", label: "Catalogues" },
  { tag: "plv", label: "PLV" },
  { tag: "presentoir", label: "Présentoirs" },
  { tag: "packaging", label: "Packaging" },
  { tag: "photos", label: "Photos" },
  { tag: "eshop", label: "E-shop" },
  { tag: "cm", label: "Community management" },
  { tag: "newsletter", label: "Newsletters" },
  { tag: "print", label: "Print" },
  { tag: "web", label: "Web" },
  { tag: "tableaux", label: "Tableaux" },
];

const TAG_LABELS = Object.fromEntries(FILTERS.map((f) => [f.tag, f.label]));

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
    id: "cat-naturecos-cc",
    type: "catalogue",
    title: "Catalogue Nature.cos CC",
    société: "Nature.cos",
    tags: ["nature-cos", "catalogue", "print"],
    description:
      "Catalogue produits 14 pages — direction artistique, mise en page, retouche photo, fichier HD certifié imprimeur.",
    cover: "assets/catalogue/naturecos-CC/page_cover.webp",
    pages: [
      "assets/catalogue/naturecos-CC/page_cover.webp",
      ...catPages("assets/catalogue/naturecos-CC", 14),
    ],
    ratio: 1,
  },
  {
    id: "cat-naturecos-add",
    type: "catalogue",
    title: "Catalogue Nature.cos ADD",
    société: "Nature.cos",
    tags: ["nature-cos", "catalogue", "print"],
    description:
      "Catalogue produits 7 pages — direction artistique, mise en page, retouche photo, fichier HD certifié imprimeur.",
    cover: "assets/catalogue/naturecos-ADD/page_cover.webp",
    pages: [
      "assets/catalogue/naturecos-ADD/page_cover.webp",
      ...catPages("assets/catalogue/naturecos-ADD", 6),
    ],
    ratio: 1,
  },
  {
    id: "cat-naturecos-mw",
    type: "catalogue",
    title: "Catalogue Nature.cos MW",
    société: "Nature.cos",
    tags: ["nature-cos", "catalogue", "print"],
    description:
      "Catalogue produits 7 pages — direction artistique, mise en page, retouche photo, fichier HD certifié imprimeur.",
    cover: "assets/catalogue/naturecos-MW/page_cover.webp",
    pages: [
      "assets/catalogue/naturecos-MW/page_cover.webp",
      ...catPages("assets/catalogue/naturecos-MW", 14),
    ],
    ratio: 1,
  },
  {
    id: "cat-naturecos-add_bible",
    type: "catalogue",
    title: "Bible ADD Nature.cos",
    société: "Nature.cos",
    tags: ["nature-cos", "catalogue", "print"],
    description:
      "Bible produits et soins Atelier des Délices 124 pages — mise en page, retouche photo, fichier HD certifié imprimeur.",
    cover: "assets/catalogue/naturecos-bibleADD/page_cover.webp",
    pages: [
      "assets/catalogue/naturecos-bibleADD/page_cover.webp",
      ...catPages("assets/catalogue/naturecos-bibleADD", 20),
    ],
    ratio: 1200 / 1691,
  },
  {
    id: "cat-siroco",
    type: "catalogue",
    title: "Catalogue Siroco 2024",
    société: "Siroco SAS",
    tags: ["siroco", "catalogue", "print"],
    description:
      "Catalogue des prestations Siroco 2024 — Branding, mise en page, retouche photo, fichier HD certifié imprimeur.",
    cover: "assets/catalogue/siroco-2024/page_cover.webp",
    pages: [
      "assets/catalogue/siroco-2024/page_cover.webp",
      ...catPages("assets/catalogue/siroco-2024", 12),
    ],
    ratio: 1200 / 1691,
  },
  {
    id: "plv-totem-triptyque",
    type: "produit",
    title: "PLV totem triptyque",
    société: "Nature.cos",
    tags: ["nature-cos", "plv", "print"],
    description: "PLV 154x154cm : porte affiche 50x154cm",
    images: [
      {
        src: "assets/totem/totem_triptyque-recto-01.webp",
        alt: "PLV totem triptyque Nature.cos 154×154 cm — vue de face",
      },
      {
        src: "assets/totem/totem_triptyque-verso-02.webp",
        alt: "Porte-affiche 50×154 cm du totem triptyque",
      },
      {
        src: "assets/totem/totem_triptyque-posters-03.webp",
        alt: "Totem triptyque en situation magasin",
      },
    ],
  },
  {
    id: "photo-pro",
    type: "produit",
    title: "Photos promotionnelles",
    société: "Nature.cos",
    tags: ["nature-cos", "photos", "print"],
    description:
      "Photos promotionnelles utilisées pour supports de communication",
    images: [
      {
        src: "assets/photo-promotionnelle/presentoir-produits-CC-01.webp",
        alt: "Photo de présentoir gamme Couleur Caramel à l'attention des dépositaires",
      },
      {
        src: "assets/photo-promotionnelle/presentoir-produits-CC-02.webp",
        alt: "Photo de présentoir gamme Couleur Caramel à l'attention des dépositaires",
      },
      {
        src: "assets/photo-promotionnelle/presentoir-produits-MW-03.webp",
        alt: "Photo de présentoir gamme miss W à l'attention des dépositaires",
      },
      {
        src: "assets/photo-promotionnelle/skinvision-01.webp",
        alt: "Photo promotionnelle de l'appareil à diagnostic peau Skin@vision à l'attention des dépositaires",
      },
      {
        src: "assets/photo-promotionnelle/skinvision-02.webp",
        alt: "Photo promotionnelle de l'appareil à diagnostic peau Skin@vision à l'attention des dépositaires",
      },
    ],
  },
  {
    id: "application-skinvision",
    type: "produit",
    title: "Application Skin@vision",
    société: "Nature.cos",
    tags: ["nature-cos", "application", "UI/UX"],
    description:
      "Design d'interface application pour appareil à diasgnostic peau Skin@Vision",
    images: [
      { src: "assets/appli-skinvision/skinvision-01.webp", alt: "Application diagnotstic peau Skin@vision" },
      { src: "assets/appli-skinvision/skinvision-02.webp", alt: "Application diagnotstic peau Skin@vision" },
      { src: "assets/appli-skinvision/skinvision-03.webp", alt: "Application diagnotstic peau Skin@vision" },
      { src: "assets/appli-skinvision/skinvision-04.webp", alt: "Application diagnotstic peau Skin@vision" },
      { src: "assets/appli-skinvision/skinvision-05.webp", alt: "Application diagnotstic peau Skin@vision" },
    ],
  },
  {
    id: "eshop-nature.cos",
    type: "eshop",
    title: "E-shop Nature.cos",
    société: "Nature.cos",
    tags: ["nature-cos", "eshop", "digital"],
    description:
      "E-shop des différentes marques Couleur Caramel, L'Atelier des Délices, Miss W avec Prestashop. Design, intégration, photos produits.",
    images: [
      { src: "assets/eshop-nc/eshop-mw.webp", alt: "E-shop de la gamme Miss W" },
      { src: "assets/eshop-nc/eshop-cc.webp", alt: "E-shop de la gamme Couleur Caramel" },
      { src: "assets/eshop-nc/eshop-add.webp", alt: "E-shop de la gamme L'atelier des Délices" },
    ],
  },
  {
    id: "reseaux-sociaux",
    type: "digital",
    title: "Réseaux sociaux",
    société: "Nature.cos",
    tags: ["nature-cos", "digital", "print"],
    description:
      "Community management et création de contenu Facebook - Parutions destinées aux clients B2B et B2C.",
    images: [
      { src: "assets/facebook/mise-en-avant-produit-CC02.webp", alt: "Parutions facebook B2B/B2C" },
      { src: "assets/facebook/mise-en-avant-produit-CC03.webp", alt: "Parutions facebook B2B/B2C" },
      { src: "assets/facebook/mise-en-avant-produit-CC04.webp", alt: "Parutions facebook B2B/B2C" },
      { src: "assets/facebook/mise-en-avant-produit-ADD.webp", alt: "Parutions facebook B2B/B2C" },
      { src: "assets/facebook/mise-en-avant-produit-MW05.webp", alt: "Parutions facebook B2B/B2C" },
    ],
  },
  {
    id: "newsletters-naturecos",
    type: "digital",
    title: "Newsletters e-shops",
    société: "Nature.cos",
    tags: ["nature-cos", "photos", "print"],
    description:
      "Photos promotionnelles utilisées pour supports de communication",
    images: [
      { src: "assets/newsletter/newsletter-nc-01.webp", alt: "Exemple newsletter e-shop Couleur Caramel" },
      { src: "assets/newsletter/newsletter-cc-01.webp", alt: "Exemple newsletter e-shop Couleur Caramel" },
      { src: "assets/newsletter/newsletter-add-01.webp", alt: "Exemple newsletter e-shop L'Atelier des Délices" },
      { src: "assets/newsletter/newsletter-mw-01.webp", alt: "Exemple newsletter e-shop Miss W" },
    ],
  },
  {
    id: "site-vitrine-siroco-box",
    type: "digital",
    title: "Siroco-box.fr",
    société: "Siroco SAS",
    tags: ["siroco", "photos", "print"],
    description: "Site vitrine siroco-box.fr",
    images: [
      { src: "assets/site-siroco/site-siroco.webp", alt: "Site vitrine siroco-box.fr" },
    ],
  },
  {
    id: "presentoirs-siroco",
    type: "produit",
    title: "Présentoirs Siroco",
    société: "Siroco SAS",
    tags: ["siroco", "photos", "print"],
    description: "Présentoirs carton, box de foire ave reprise d'invendus",
    images: [
      { src: "assets/presentoirs/presentoir-halloween.webp", alt: "Présentoir carton, box Halloween" },
      { src: "assets/presentoirs/presentoir-barbecue.webp", alt: "Présentoir carton, box BBQ Party" },
      { src: "assets/presentoirs/presentoir-boxelec.webp", alt: "Présentoir carton, box Box Elec" },
      { src: "assets/presentoirs/presentoir-chandeleur.webp", alt: "Présentoir carton, box Chandeleur" },
    ],
  },
];

/* ============================================================
   Galerie + filtres
   ============================================================ */
const grid = document.getElementById("grid");
const filtersEl = document.getElementById("filters");
const emptyMsg = document.getElementById("emptyMsg");
let activeFilter = "*";

function renderFilters() {
  filtersEl.innerHTML = "";
  FILTERS.forEach((f) => {
    if (f.tag !== "*" && !ITEMS.some((it) => it.tags.includes(f.tag))) return;
    const btn = document.createElement("button");
    btn.className = "chip" + (f.tag === activeFilter ? " active" : "");
    btn.textContent = f.label;
    btn.setAttribute("role", "tab");
    btn.addEventListener("click", () => {
      activeFilter = f.tag;
      renderFilters();
      renderGrid();
    });
    filtersEl.appendChild(btn);
  });
}

function renderGrid() {
  grid.innerHTML = "";
  const visible = ITEMS.filter(
    (it) => activeFilter === "*" || it.tags.includes(activeFilter),
  );
  emptyMsg.hidden = visible.length > 0;

  visible.forEach((it, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.style.animationDelay = `${i * 40}ms`;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", it.title);

    const img = document.createElement("img");
    const first = it.images && it.images[0];
    img.src =
      it.cover ||
      (typeof first === "string" ? first : first && first.src) ||
      "";
    img.alt = it.title;
    img.loading = "lazy";

    const badge = document.createElement("span");
    badge.className =
      "card-badge" + (it.type === "catalogue" ? " badge-book" : "");
    badge.textContent =
      it.type === "catalogue"
        ? "📖 Feuilleter"
        : TAG_LABELS[it.tags[1]] || TAG_LABELS[it.tags[0]] || "";

    const label = document.createElement("div");
    label.className = "card-label";
    label.innerHTML = `<h3></h3><p></p>`;
    label.querySelector("h3").textContent = it.title;
    label.querySelector("p").textContent = it.société;

    card.append(img, badge, label);
    const open = () =>
      it.type === "catalogue" ? openBook(it) : openProduct(it);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
    grid.appendChild(card);
  });
}

/* ============================================================
   Modale fiche produit (type Amazon)
   ============================================================ */
const productOverlay = document.getElementById("productOverlay");
const pmMainImg = document.getElementById("pmMainImg");
const pmMainBox = document.querySelector(".pm-main");
const pmThumbs = document.getElementById("pmThumbs");
const pmTitle = document.getElementById("pmTitle");
const pmSociete = document.getElementById("pmClient");
const pmDesc = document.getElementById("pmDesc");
const pmTags = document.getElementById("pmTags");

const pmDots = document.createElement("div");
pmDots.className = "pm-dots";
pmMainBox.after(pmDots);

let pmImgs = [];
let pmIndex = 0;

function showProductImage(i, instant = false) {
  if (!pmImgs.length) return;
  const next = (i + pmImgs.length) % pmImgs.length;
  if (!instant && next === pmIndex) return;
  pmIndex = next;
  const def = pmImgs[pmIndex];

  const apply = () => {
    pmMainImg.src = def.src;
    pmMainImg.alt = def.alt || "";
    pmMainImg.onload = () => {
      pmMainImg.style.opacity = "1";
    };
  };
  if (instant) {
    apply();
  } else {
    pmMainImg.style.opacity = "0";
    setTimeout(apply, 150);
  }

  pmThumbs
    .querySelectorAll("button")
    .forEach((b, k) => b.classList.toggle("active", k === pmIndex));
  pmDots
    .querySelectorAll("span")
    .forEach((d, k) => d.classList.toggle("active", k === pmIndex));
}

function openProduct(item) {
  pmImgs = item.images.map((im) =>
    typeof im === "string" ? { src: im, alt: item.title } : im,
  );

  pmTitle.textContent = item.title;
  pmSociete.textContent = item.société;
  pmDesc.textContent = item.description;

  pmTags.innerHTML = "";
  item.tags.forEach((t) => {
    const s = document.createElement("span");
    s.textContent = TAG_LABELS[t] || t;
    pmTags.appendChild(s);
  });

  pmThumbs.innerHTML = "";
  pmThumbs.hidden = pmImgs.length < 2;
  pmImgs.forEach((imgDef, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", imgDef.alt || `Visuel ${i + 1}`);
    const im = document.createElement("img");
    im.src = imgDef.src;
    im.alt = imgDef.alt || "";
    b.appendChild(im);
    b.addEventListener("click", () => showProductImage(i));
    b.addEventListener("mouseenter", () => showProductImage(i));
    pmThumbs.appendChild(b);
  });

  pmDots.innerHTML = "";
  if (pmImgs.length > 1) {
    pmImgs.forEach(() => pmDots.appendChild(document.createElement("span")));
  }

  showProductImage(0, true);
  openOverlay(productOverlay);
}

let pmTouchX = null;
pmMainBox.addEventListener(
  "touchstart",
  (e) => {
    pmTouchX = e.touches[0].clientX;
  },
  { passive: true },
);
pmMainBox.addEventListener("touchend", (e) => {
  if (pmTouchX === null || pmImgs.length < 2) return;
  const dx = e.changedTouches[0].clientX - pmTouchX;
  pmTouchX = null;
  if (Math.abs(dx) > 40) showProductImage(pmIndex + (dx < 0 ? 1 : -1));
});

/* ============================================================
   Viewer catalogue — flipbook (StPageFlip)
   ============================================================ */
const bookOverlay = document.getElementById("bookOverlay");
const bvStage = document.querySelector(".bv-stage");
const bvTitle = document.getElementById("bvTitle");
const bvPageInfo = document.getElementById("bvPageInfo");
let flipbookEl = null;
let pageFlip = null;

function openBook(item) {
  bvTitle.textContent = item.title;
  openOverlay(bookOverlay);

  bvStage.innerHTML = "";
  flipbookEl = document.createElement("div");
  flipbookEl.id = "flipbook";
  bvStage.appendChild(flipbookEl);

  item.pages.forEach((src) => {
    const page = document.createElement("div");
    page.className = "page";
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    page.appendChild(img);
    flipbookEl.appendChild(page);
  });

  const ratio = item.ratio || 0.75;
  const maxH = bvStage.clientHeight - 8;
  const maxW = bvStage.clientWidth - 8;
  const portrait = maxW < 640;
  let pageH = maxH;
  let pageW = pageH * ratio;
  const totalW = portrait ? pageW : pageW * 2;
  if (totalW > maxW) {
    pageW = portrait ? maxW : maxW / 2;
    pageH = pageW / ratio;
  }

  pageFlip = new St.PageFlip(flipbookEl, {
    width: Math.round(pageW),
    height: Math.round(pageH),
    size: "fixed",
    usePortrait: portrait,
    showCover: true,
    maxShadowOpacity: 0.4,
    mobileScrollSupport: false,
  });
  pageFlip.loadFromHTML(flipbookEl.querySelectorAll(".page"));

  const updateInfo = () => {
    bvPageInfo.textContent = `${pageFlip.getCurrentPageIndex() + 1} / ${item.pages.length}`;
  };
  pageFlip.on("flip", updateInfo);
  updateInfo();
}

document
  .getElementById("bvPrev")
  .addEventListener("click", () => pageFlip && pageFlip.flipPrev());
document
  .getElementById("bvNext")
  .addEventListener("click", () => pageFlip && pageFlip.flipNext());

function closeBook() {
  if (pageFlip) {
    try {
      pageFlip.destroy();
    } catch (e) {
      /* déjà détruit */
    }
    pageFlip = null;
  }
  bvStage.innerHTML = "";
  flipbookEl = null;
}

/* ============================================================
   Gestion générique des overlays
   ============================================================ */
function openOverlay(el) {
  el.hidden = false;
  document.body.classList.add("no-scroll");
}
function closeOverlay(el) {
  if (el === bookOverlay) closeBook();
  el.hidden = true;
  document.body.classList.remove("no-scroll");
}

[productOverlay, bookOverlay].forEach((ov) => {
  ov.addEventListener("click", (e) => {
    if (e.target === ov || e.target.closest("[data-close]")) closeOverlay(ov);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    [productOverlay, bookOverlay].forEach((ov) => {
      if (!ov.hidden) closeOverlay(ov);
    });
  }
  if (!bookOverlay.hidden && pageFlip) {
    if (e.key === "ArrowLeft") pageFlip.flipPrev();
    if (e.key === "ArrowRight") pageFlip.flipNext();
  }
});

/* ============================================================
   Coordonnées masquées — jamais en clair dans le HTML.
   Les bots scrapent le HTML brut ; email et téléphone sont
   assemblés en JS au clic seulement.
   ------------------------------------------------------------
   ✏️ CORRECTIF : le bouton, une fois révélé, devient un <a>
   auquel on redonne la classe .reveal-btn (+ .is-revealed).
   Avant, l'<a> de remplacement perdait tout style de bouton
   (plus de display:block/width:100%), ce qui décalait la mise
   en page et donnait l'impression que l'autre bouton disparaissait.
   ============================================================ */
function revealContact(btnId, parts, hrefPrefix) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener(
    "click",
    () => {
      const value = parts.join("");
      const a = document.createElement("a");
      a.href = hrefPrefix + value;
      a.textContent = value;
      a.className = "reveal-btn is-revealed";
      btn.replaceWith(a);
    },
    { once: true },
  );
}

// Email : [utilisateur, arobase, domaine]
revealContact("revealMail", ["romain.desfonds", "@", "gmail.com"], "mailto:");

// Téléphone : 06 78 11 64 30
revealContact("revealTel", ["06 ", "78 ", "11 ", "64 ", "30"], "tel:0678116430");

/* ===== Init ===== */
renderFilters();
renderGrid();