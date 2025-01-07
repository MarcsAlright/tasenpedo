const CACHE_NAME = 'tas-en-pedo-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/juego.js',
  '/frases.js',
  '/retos.js',
  '/logo.webp',
  '/fnd.webp',
  '/corazon.webp',
  '/suspenso.mp3',  // Nuevo archivo de audio
  '/alarma.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});