'use strict';

chrome.webRequest.onBeforeRequest.addListener(function (details) {
	if (details.method === 'GET') {
		const isOpenQuery = 'q=is:open';
		const pjaxQueryStart = details.url.search(/\?_pjax=%23js-repo-pjax-container/);

		let newUrl;
		if (pjaxQueryStart !== -1) {
			newUrl = details.url.substr(0, pjaxQueryStart + 1) + isOpenQuery;
		} else {
			newUrl = details.url + '?' + isOpenQuery;
		}
			
		return {
			redirectUrl: newUrl
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
