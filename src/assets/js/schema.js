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
})();
