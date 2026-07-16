<h1 align="center">
Noelia Suárez Photography Website
</h1>

<p align="center">
Official website of Noelia Suárez — a passionate, creative photographer dedicated to
capturing timeless moments through her lens. The site is her portfolio, contact point,
and personal introduction. Built with plain HTML, CSS and JavaScript (jQuery), no build step.
</p>

---

## ✨ Features

- **🌟 Portfolio** — curated galleries by category (Retratos, Callejera, Paisaje, Deporte,
  Fiesta, Motor, Hogar, Conciertos, Mercado de Abastos), each with a full-screen lightbox.
- **👤 About** — background, inspiration and creative process of the photographer.
- **📱 Contact** — contact form plus email and social media links.

---

## 🧰 Tech stack

- **HTML + CSS + JavaScript** — no framework, no build step.
- **jQuery** + `skel` (responsive) — banner slideshow, sticky header, menu.
- **FontAwesome** — icons.
- **WebP** images — optimized for the web (see below).

---

## 📁 Project structure

The repository root holds only tooling/config. **The website itself lives in `src/`**, which
is the web root that gets served/deployed.

```
Noelia-Suarez-Website/
├── README.md
├── .gitignore
└── src/                        ← web root (serve / deploy THIS folder)
    ├── index.html              ← homepage (banner + portfolio grid)
    ├── aboutme.html
    ├── contact.html
    ├── portfolio/              ← one .html per gallery
    │   └── abastos.html · retratos.html · ...
    ├── partials/               ← shared fragments, edited once
    │   ├── head.html           ← favicon links
    │   ├── header.html         ← top nav
    │   └── footer.html         ← footer + copyright
    ├── assets/
    │   ├── css/
    │   │   ├── vendor/         ← third-party (font-awesome.min.css)
    │   │   ├── base/           ← global (main.css, hover.css)
    │   │   └── pages/          ← per-page (index.css, aboutme.css, portfolio.css)
    │   ├── js/
    │   │   ├── vendor/         ← third-party (jquery, jquery.scrollex, skel)
    │   │   ├── include.js      ← injects the partials (see below)
    │   │   ├── main.js         ← banner, header, menu
    │   │   └── util.js         ← sticky header + gallery lightbox
    │   ├── fonts/              ← FontAwesome webfonts
    │   └── favicon/            ← favicon.ico, PNG sizes, apple-touch-icon
    └── images/                 ← photos (WebP), one folder per gallery
```

---

## 🧩 How the shared layout works (no duplication)

The header, footer and favicon links are defined **once** in `src/partials/` and injected into
every page. A page references them like this:

```html
<head>
  <meta charset="utf-8">
  <base href="./">                                          <!-- "../" on pages inside /portfolio/ -->
  ...
  <template data-include="partials/head.html"></template>   <!-- favicon links -->
</head>
<body>
  <div data-include="partials/header.html"></div>
  ...page content...
  <div data-include="partials/footer.html"></div>

  <script src="assets/js/include.js"></script>              <!-- injects the partials, synchronously -->
  <script src="assets/js/vendor/jquery.min.js"></script>
  <script src="assets/js/vendor/jquery.scrollex.min.js"></script>
  <script src="assets/js/vendor/skel.min.js"></script>
  <script src="assets/js/util.js"></script>
  <script src="assets/js/main.js"></script>
</body>
```

- **`include.js`** runs first and synchronously replaces every `[data-include]` element with the
  contents of its partial, so the header/footer are already in the DOM before `jquery`/`util`/`main`
  run (and before the `load` event that starts the banner).
- **Relative paths + `<base>`** everywhere (no leading `/`). This makes the site work whether it is
  served from a domain root *or* from a subfolder.

> ⚠️ Because the partials are loaded over the network, the site **must be served over HTTP**, not
> opened as a `file://` page.

---

## ▶️ Run locally

Serve the `src/` folder over HTTP (any static server works):

```bash
cd src
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 🖼️ Working with photos

Images are **WebP**, resized to a max of **2560 px** on the long edge (full-screen quality at a
fraction of the size). Keep originals elsewhere.

- **Add photos to a gallery:** drop the optimized `.webp` files in `src/images/<gallery>/` and add an
  `<img src="images/<gallery>/<file>.webp" alt="...">` line inside that gallery's `galleryPort` block.
- **Add a new gallery:** create `src/images/<gallery>/`, a `src/portfolio/<gallery>.html` (copy an
  existing one as a template), and a card in the portfolio grid of `src/index.html`.

---

## 🚀 Deploy

The web root is **`src/`**. Point your host at that folder:

| Host | What to do |
|------|------------|
| **Netlify / Vercel** | Set the *publish directory* to `src`. |
| **GitHub Pages** | Pages can't serve from `src/` directly — rename `src` → `docs`, or publish `src/` via a GitHub Actions workflow. |
| **Own server** | Set the document root to `.../src`. |

---

<p align="center"><sub>Designed by Javi Peña</sub></p>
