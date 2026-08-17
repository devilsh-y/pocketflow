const CACHE_NAME = 'pocketflow-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'sw.js',
  'https://jsdelivr.net'
];

// Installs and saves the application files onto the local device storage
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Forces the app to instantly update if you make code changes in the future
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Serves the application directly from the phone cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
