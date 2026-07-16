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
- **SEO** — per-page meta (title, description, canonical, Open Graph), JSON-LD structured data, plus `robots.txt` / `sitemap.xml` / `llms.txt` (see [SEO & structured data](#-seo--structured-data)).
- **Vercel Image Optimization** — responsive `srcset` generated on the fly via `/_vercel/image`; no resized copies stored in the repo.

---

## 📁 Project structure

The repository root holds only tooling/config. **The website itself lives in `src/`**, which
is the web root that gets served/deployed.

```
Noelia-Suarez-Website/
├── README.md
├── .gitignore
├── vercel.json                 ← Vercel image-optimization config (sizes, formats)
└── src/                        ← web root (serve / deploy THIS folder)
    ├── index.html              ← homepage (banner + portfolio grid)
    ├── aboutme.html
    ├── contact.html
    ├── portfolio/              ← one .html per gallery
    │   └── abastos.html · retratos.html · ...
    ├── robots.txt              ← SEO: crawl rules + sitemap reference
    ├── sitemap.xml             ← SEO: all 12 URLs
    ├── llms.txt                ← SEO: summary for AI search engines
    ├── site.webmanifest        ← PWA manifest (name, icons, theme colour)
    ├── og-image.jpg            ← 1200×630 social-share image
    ├── partials/               ← shared fragments, edited once
    │   ├── head.html           ← favicons, fonts, theme.css, site-wide JSON-LD, manifest
    │   ├── header.html         ← top nav
    │   └── footer.html         ← footer + copyright (social links with aria-label)
    ├── assets/
    │   ├── css/
    │   │   ├── vendor/         ← third-party (font-awesome.min.css)
    │   │   ├── base/           ← global (main.css, hover.css, theme.css)
    │   │   └── pages/          ← per-page (index.css, aboutme.css, portfolio.css)
    │   ├── js/
    │   │   ├── vendor/         ← third-party (jquery, jquery.scrollex, skel)
    │   │   ├── include.js      ← injects the partials (see below)
    │   │   ├── main.js         ← banner, header, menu
    │   │   ├── util.js         ← sticky header + gallery lightbox
    │   │   └── schema.js       ← gallery JSON-LD (ImageGallery + Breadcrumb) + local srcset fallback
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
  <template data-include="partials/head.html"></template>   <!-- favicons, fonts, theme, site-wide JSON-LD, manifest -->
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

Images are **WebP**, max **2560 px** on the long edge — this original is what the lightbox shows.
Vercel serves smaller responsive copies on the fly (see below), so you never store resized files.

- **Add photos to a gallery:** drop the `.webp` in `src/images/<gallery>/` and add an `<img>` inside
  that gallery's `galleryPort` block, copying the existing pattern (responsive `srcset` via Vercel and
  a **descriptive `alt`** — good for accessibility and Google Images):

  ```html
  <img src="images/<gallery>/<file>.webp"
       srcset="/_vercel/image?url=%2Fimages%2F<gallery>%2F<file>.webp&w=640&q=80 640w,
               /_vercel/image?url=%2Fimages%2F<gallery>%2F<file>.webp&w=1280&q=80 1280w"
       sizes="(max-width: 540px) 92vw, (max-width: 900px) 46vw, (max-width: 1280px) 31vw, 342px"
       width="<W>" height="<H>" alt="What the photo actually shows" loading="lazy" decoding="async">
  ```
- **Add a new gallery:** create `src/images/<gallery>/`, a `src/portfolio/<gallery>.html` (copy an
  existing one — it already has the JSON-LD hook + lightbox), a card in the grid of `src/index.html`,
  and a `<url>` in `src/sitemap.xml`.

---

## 🔍 SEO & structured data

Every page ships with:

- **`lang="es"`**, a unique **`<title>`** and **`<meta name="description">`**, and a self-referencing
  **`<link rel="canonical">`**.
- **Open Graph + Twitter Card** for social previews. The homepage points to a dedicated **1200×630
  `og-image.jpg`**; gallery pages use their own hero image. OG tags live in the **static** `<head>` so
  non-JS scrapers (Facebook, WhatsApp…) always read them.
- **One `<h1>` per page** (the banner title), then `<h2>`/`<h3>` for sections and categories.
- **Descriptive `alt`** on every image; social/footer icon links carry `aria-label`.
- **JSON-LD structured data:**
  - `Person` + `WebSite` — site-wide, written once in `partials/head.html`.
  - `ImageGallery` + `BreadcrumbList` — built at runtime from the DOM by `assets/js/schema.js` on each
    gallery page, so there is no per-image structured-data markup to maintain.
- Web-root files: **`robots.txt`**, **`sitemap.xml`**, **`llms.txt`** (AI search), **`site.webmanifest`**
  + `theme-color`.

> ⚠️ Partials and JSON-LD are injected by JavaScript (`include.js` / `schema.js`). Google renders JS and
> reads them, but **"View source" and JS-less validators won't show the injected parts** — use tools that
> render JS (see below). Open Graph tags are the exception: they are static in each page's `<head>`.

## 🖼️ Responsive images (Vercel)

Gallery and banner images use **Vercel Image Optimization**: the `src` is the full 2560 px original (used
by the lightbox) and `srcset` points to `/_vercel/image?url=…&w=…`, so Vercel resizes + compresses on the
fly and caches on its CDN. **No resized copies are committed to the repo.** Allowed sizes and output
formats (AVIF/WebP) are set in **`vercel.json`** (repo root).

- Locally (`python -m http.server`) the `/_vercel/image` endpoint doesn't exist, so `schema.js` **strips
  `srcset` on `localhost`/`file://`** and the browser loads the full-size `src`. To preview the *optimized*
  images exactly as in production, use `vercel dev`.

## ✅ Verifying SEO (after deploy)

- **Google Search Console** — verify the property (HTML file at the web root), submit `sitemap.xml`,
  request indexing on key pages.
- **Rich Results Test** (`search.google.com/test/rich-results`) — test a **gallery** URL; it should detect
  **Breadcrumbs**. The homepage's `Person`/`WebSite` are valid but not rich-result types, so it reports
  "none detected" there — that's expected, not an error.
- **Schema Markup Validator** (`validator.schema.org`) — lists all structured data (Person, WebSite,
  ImageGallery, Breadcrumb).
- **Facebook Sharing Debugger** — confirm the OG preview; use "Scrape Again" to refresh the cache.
- **PageSpeed Insights** — LCP / CLS / performance.
- **Image optimization sanity check** — open
  `…/_vercel/image?url=%2Fimages%2Fretratos%2Fret01.webp&w=640&q=80`; it must return an optimized image
  (HTTP 200), not 400/404.

## 🚀 Deploy

The web root is **`src/`**. Point your host at that folder:

| Host | What to do |
|------|------------|
| **Vercel** (current) | Serve `src/` as the web root. Keep **`vercel.json`** where Vercel reads it for your *Root Directory* so image optimization stays enabled. |
| **Netlify / GitHub Pages / own server** | Works, **but `/_vercel/image` is Vercel-only.** On another host those `srcset` URLs 404 and gallery images break (the browser doesn't fall back to `src`). To move off Vercel you'd need to drop the `srcset` (serve the originals) or swap it for that host's image service. GitHub Pages also can't serve from `src/` directly — rename it to `docs/` or publish via Actions. |

---

<p align="center"><sub>Designed by Javi Pena</sub></p>
