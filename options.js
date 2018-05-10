(function() {
	document.getElementById('assassinations').innerHTML = localStorage.assassinations;

	var targets = JSON.parse(localStorage.targets);

	function renderTargets() {
		var targetsHTML = targets.map(item => '<li><span class="url">' + item + '</span><button class="remove-url" data-url="' + item + '">Remove</button></li>').join('');
		document.getElementById('targets').innerHTML = targetsHTML;
	}

	function updateTargets() {
		localStorage.targets = JSON.stringify(targets);
	}

	renderTargets();

	document.getElementById('add-form').addEventListener('submit', (event) => {
		var value = document.getElementById('new-url').value.trim();

		if (value && !targets.includes(value)) {
			targets.push(value);
			updateTargets();
			renderTargets();
		}

		event.preventDefault();
	});

	document.getElementById('reset').addEventListener('click', (event) => {
		targets = [
			'taboola.com',
			'disqus.com',
			'zergnet.com',
			'revcontent.com',
			'outbrain.com',
			'e-generator.com'
		];
		updateTargets();
		renderTargets();

		event.preventDefault();
	});

	document.getElementById('targets').addEventListener('click', (event) => {
		if (event.target && event.target.matches('.remove-url')) {
			targets = targets.filter(function (a) { return (a !== event.target.dataset.url); });
			updateTargets();
			renderTargets();
		}
	});
}());