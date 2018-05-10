(function() {
	// Open the options when user clicks the extension icon
	chrome.browserAction.onClicked.addListener(function() {
		chrome.runtime.openOptionsPage();
	});

	// Set default assassination counter
	if (!localStorage.assassinations) {
		localStorage.assassinations = 0;
	}

	// Set default list of URLs to block
	if (!localStorage.targets || localStorage.targets === '') {
		localStorage.targets = JSON.stringify([
			'taboola.com',
			'disqus.com',
			'zergnet.com',
			'revcontent.com',
			'outbrain.com',
			'e-generator.com'
		]);
	}

	// Retrieve list of URLs to target
	var targets = JSON.parse(localStorage.targets);

	// Every time a web request is made
	chrome.webRequest.onBeforeRequest.addListener(
		function(details) {
			// Check if a targetted URL is being requested
			var assassinate = (targets.filter(url => (details.url.indexOf(url) > -1)).length > 0);

			if (assassinate) {
				// Track that we've made an assassination
				localStorage.assassinations = parseInt(localStorage.assassinations) + 1;
			}

			// Say whether or not to block this request
			return { cancel: assassinate };
		},
		{
			urls: ['<all_urls>']
		},
		['blocking']
	);
}());

/*
	yavli.com
	hexagram.com
	gravity.com
*/