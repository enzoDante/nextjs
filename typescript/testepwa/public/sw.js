

const CACHE_NAME = "meu-app-v1";
const urlsToCache = [
    '/',
    '/favicon.ico',
    '/github-128x128.png',
    '/github-512x512.png'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache).catch(err => {
                console.warn('Falha ao adicionar URLs ao cache:', err);
            });
        })
    );
});

// Intercepta requisições e serve do cache quando offline
self.addEventListener('fetch', event => {
    // não intercepta requisições de API ou não-GET
    if(event.request.method !== 'GET' || event.request.url.includes('/api/') || event.request.url.includes('dominioapi.com')){
        return;
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            if(response){
                console.log('Servindo do cache:', event.request.url);
                return response;
            }

            // Clonar a requisição para usar depois
            const fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(response => {
                // verificar se a resposta é válida
                if(!response || response.status !== 200 || response.type !== 'basic'){
                    return response;
                }

                // clonar a resposta para guardar no cache ao navegador
                const responseToCache = response.clone();

                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                    console.log('Cacheando novo recurso: ', event.request.url);
                });

                return response;
            });
        })
    );
});

// Atualiza o cache quando o SW é atualizado
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(!cacheWhitelist.includes(cacheName)){
                        console.log('Limpando cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );    
});