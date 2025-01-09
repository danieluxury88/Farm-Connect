const CACHE_NAME = "farmmanager-pwa-v1";
const ASSETS_TO_CACHE = [
    '/',
    '/index.php',
    '/manifest.json',
    '/bundle.js',
    '/sql-wasm.wasm',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});


self.addEventListener('sync', async (event) => {
    if (event.tag === 'sync-weight-records') {
        console.log('Syncing records with server...');
        const { syncRecordsToServer } = await import('/src/syncService.js');
        event.waitUntil(syncRecordsToServer());
    }
});
