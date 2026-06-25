/*
 * Build-less HTML includes. Synchronously injects the partials marked with
 * <div data-include="/partials/xxx.html"></div> so the header/footer are
 * already in the DOM before the page scripts (jquery, util, main) run and
 * before the window 'load' event fires. Keeping the original script timing
 * matters: main.js inits the banner slideshow inside $(window).on('load').
 *
 */
(function () {
	var nodes = document.querySelectorAll('[data-include]');
	for (var i = 0; i < nodes.length; i++) {
		var el = nodes[i];
		var url = el.getAttribute('data-include');
		try {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, false); // synchronous on purpose
			xhr.send();
			if (xhr.status >= 200 && xhr.status < 300) {
				el.outerHTML = xhr.responseText;
			} else {
				console.error('Failed to include', url, xhr.status);
			}
		} catch (e) {
			console.error('Failed to include', url, e);
		}
	}
})();
