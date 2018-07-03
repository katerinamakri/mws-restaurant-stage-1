 // Set a name for the current cache
var cacheName = 'v1'; 

// Default files to always cache
var cacheFiles = [
	'./',
	'./index.html',
	'./js/main.js',
	'./js/restaurant_info.js',
	'./js/dbhelper.js',
	'./data/restaurants.json',
	'./css/styles.css',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
]


self.addEventListener('install', function(e) {
    console.log('ServiceWorker Installed');

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(

    	// Open the cache
	    caches.open(cacheName).then(function(cache) {

	    	// Add all the default files to the cache
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	); // end e.waitUntil
});

self.addEventListener('fetch', function(e) {
	console.log('ServiceWorker Fetch', e.request.url);

	// e.respondWidth Responds to the fetch event
	e.respondWith(
		// Check in cache for the request being made
		caches.match(e.request).then(function(response) {
				// If the request is in the cache
				if ( response ) {
					console.log("ServiceWorker Found in Cache", e.request.url, response);
					// Return the cached version
					return response;
				}
				// If the request is NOT in the cache, fetch
				return fetch(e.request);
			}) // end caches.match(e.request)
	); // end e.respondWith
});

