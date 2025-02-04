const CACHE_NAME = "BOARDLY-V1.0.0";
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/src/main.jsx",
  "/styles.css",
  "/favicon.ico",
  "/manifest.json",
  "/icons/icon-16x16.png",
  "/icons/icon-32x32.png",
  "/icons/icon-48x48.png",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-192x192.png",
  "/icons/icon-256x256.png",
  "/icons/icon-512x512.png",
  "/src/assets/banner.svg"
];

async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(CORE_ASSETS);
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheCoreAssets());
  self.skipWaiting();
});

async function clearOldCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name) => caches.delete(name))
  );
}

self.addEventListener("activate", (event) => {
  event.waitUntil(clearOldCaches());
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
