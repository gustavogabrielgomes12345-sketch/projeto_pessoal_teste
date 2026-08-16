/* ==========================================================================
   Service Worker — cache básico "cache-first" para assets estáticos.
   Registre em main.js com:
     if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
   Opcional: remova este arquivo se não quiser comportamento offline/PWA.
   ========================================================================== */

const CACHE_NAME = "blog-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/css/style.css",
  "/js/main.js",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200) return response;
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match("/404.html"));
    })
  );
});
