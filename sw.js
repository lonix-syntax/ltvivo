const CACHE_NAME = 'ltvivo-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/ltvivo_logo.png'
];

// Installera Service Worker och spara filer i cachen
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Hämta från cache i första hand när appen körs
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Returnera från cache om det finns, annars hämta från nätet
        return response || fetch(event.request);
      })
  );
});
