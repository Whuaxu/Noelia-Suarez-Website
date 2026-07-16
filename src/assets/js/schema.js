/*
 * Builds the ImageGallery JSON-LD for a portfolio page from the images that
 * are already in the DOM, so the structured data is generated in one place
 * instead of being duplicated (one <ImageObject> per photo) across every
 * gallery HTML file. No-ops on pages without a gallery.
 *
 * The site-wide Person/WebSite entity lives statically in partials/head.html;
 * here we only reference it by @id.
 */
(function () {
	// Local-preview fallback (all pages): Vercel's image optimizer
	// (/_vercel/image) only exists on the deployed site. Under
	// `python -m http.server` / file:// those URLs 404, so on localhost we drop
	// the srcset/sizes from every optimized <img> (grid + banner) and let the
	// browser load the full-size `src`. On the deployed host srcset is untouched.
	var isLocal = location.hostname === 'localhost'
		|| location.hostname === '127.0.0.1'
		|| location.protocol === 'file:';
	if (isLocal) {
		var opt = document.querySelectorAll('img[srcset*="_vercel/image"]');
		for (var k = 0; k < opt.length; k++) {
			opt[k].removeAttribute('srcset');
			opt[k].removeAttribute('sizes');
		}
	}

	var imgs = document.querySelectorAll('.galleryPort img');
	if (!imgs.length) return;

	var media = [];
	for (var i = 0; i < imgs.length; i++) {
		var img = imgs[i];
		var item = { '@type': 'ImageObject', contentUrl: img.src };
		if (img.alt) item.name = img.alt;
		media.push(item);
	}

	var canonical = document.querySelector('link[rel="canonical"]');
	var desc = document.querySelector('meta[name="description"]');

	var data = {
		'@context': 'https://schema.org',
		'@type': 'ImageGallery',
		name: document.title,
		url: canonical ? canonical.href : location.href,
		inLanguage: 'es',
		author: { '@id': 'https://noeliasuarez.vercel.app/#person' },
		associatedMedia: media
	};
	if (desc) data.description = desc.content;

	var s = document.createElement('script');
	s.type = 'application/ld+json';
	s.textContent = JSON.stringify(data);
	document.head.appendChild(s);

	// Breadcrumbs (Inicio > galería) — eligible for rich results, invisible.
	var crumbName = document.title.split(' | ')[0].split(' · ')[0].trim();
	var crumbs = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://noeliasuarez.vercel.app/' },
			{ '@type': 'ListItem', position: 2, name: crumbName, item: canonical ? canonical.href : location.href }
		]
	};
	var b = document.createElement('script');
	b.type = 'application/ld+json';
	b.textContent = JSON.stringify(crumbs);
	document.head.appendChild(b);
})();
