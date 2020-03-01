'use strict';

chrome.webRequest.onBeforeRequest.addListener(function (details) {
	if (details.method === 'GET') {
		const searchParams = new URLSearchParams(details.url.searchParams);
		searchParams.set('q', 'is:open');
		const newUrl = new URL(details.url + '?' + searchParams.toString());

		return {
			redirectUrl: newUrl.href
		};
	}
}, {
	urls: [
		'https://github.com/*/*/issues',
		'https://github.com/*/*/issues?_pjax=%23js-repo-pjax-container',
	],
	types: [
		'main_frame',
		'xmlhttprequest'
	]
}, [
	'blocking'
]);
