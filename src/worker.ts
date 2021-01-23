const doCache =  process.env.NODE_ENV === 'production' ? true : false;
const CACHE_NAME = 'my-pwa-cache-v1';

self.addEventListener('activate', (event: any) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        }))
      )
  );
});

self.addEventListener('install', (event: any) => {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          fetch('asset-manifest.json')
            .then(response => {
              response.json()
            })
            .then((assets: any) => {
              const urlsToCache = [
                '/',
                assets['build.js']
              ]

              cache.addAll(urlsToCache);
            })
        })
    );
  }
});

self.addEventListener('fetch', function(event: any) {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});

export const registerSw = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(() => {
        console.log('SW registered');
      }).catch(registrationError => {
        console.log('SW registration failed', registrationError);
      });
    });
  }
};