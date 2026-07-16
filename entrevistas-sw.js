/* Service worker del Bewerbungs-Simulator.
   Estrategia: network-first para el HTML (las actualizaciones y el login
   siempre ganan cuando hay red), cache-first para manifest e iconos.
   Nunca se cachean respuestas no-ok (p. ej. el login 401). */
const CACHE = 'bewerbsim-v1';
const SHELL = [
  '/entrevistas.html',
  '/entrevistas.webmanifest',
  '/entrevistas-icon-192.png',
  '/entrevistas-icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      // Precache tolerante: un 401 (gate de contraseña) no debe romper el install
      Promise.allSettled(
        SHELL.map((url) =>
          fetch(url).then((res) => {
            if (res.ok) return cache.put(url, res);
          })
        )
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin || e.request.method !== 'GET') return;

  const isHtml = e.request.mode === 'navigate' || url.pathname === '/entrevistas.html';
  if (isHtml) {
    // network-first con fallback offline a la cache
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res.ok && url.pathname === '/entrevistas.html') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put('/entrevistas.html', copy));
          }
          return res;
        })
        .catch(() => caches.match('/entrevistas.html'))
    );
    return;
  }

  if (SHELL.includes(url.pathname)) {
    // cache-first para assets estáticos
    e.respondWith(
      caches.match(e.request).then(
        (hit) =>
          hit ||
          fetch(e.request).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(e.request, copy));
            }
            return res;
          })
      )
    );
  }
});
