// service-worker.js - VERSIÓN CORREGIDA
// Service Worker para PWA App Shell - Sin errores de clone()

const CACHE_NAME = 'pwa-app-shell-v1';
const RUNTIME_CACHE = 'pwa-runtime-v1';

// Recursos del App Shell que siempre deben estar en caché
const APP_SHELL_ASSETS = [
  '/',
  '/index.html'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Almacenando App Shell en caché');
        return cache.addAll(APP_SHELL_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] App Shell almacenado correctamente');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Error al cachear:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[Service Worker] Eliminando caché antigua:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activado correctamente');
        return self.clients.claim();
      })
  );
});

// Interceptar peticiones (Fetch)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Ignorar peticiones que no sean HTTP/HTTPS
  if (!request.url.startsWith('http')) {
    return;
  }

  // Ignorar peticiones de Chrome extensions
  if (request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(handleFetch(request));
});

// Función principal para manejar peticiones
async function handleFetch(request) {
  const url = new URL(request.url);
  
  // Para navegación (páginas HTML)
  if (request.mode === 'navigate') {
    return handleNavigate(request);
  }
  
  // Para assets estáticos (JS, CSS, imágenes)
  if (isStaticAsset(url)) {
    return cacheFirst(request);
  }
  
  // Para todo lo demás, intentar red primero
  return networkFirst(request);
}

// Manejar navegación (SPA)
async function handleNavigate(request) {
  try {
    // Intentar obtener de la red
    const networkResponse = await fetch(request);
    
    // Si es exitoso, cachear y retornar
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    return networkResponse;
  } catch (error) {
    // Si falla, devolver index.html del caché (para SPA)
    console.log('[SW] Red falló para navegación, usando caché');
    const cachedResponse = await caches.match('/index.html');
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si no hay caché, devolver error
    return new Response('Offline - Página no disponible', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Estrategia Cache First (para assets estáticos)
async function cacheFirst(request) {
  try {
    // Buscar en caché primero
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Sirviendo desde caché:', request.url);
      return cachedResponse;
    }

    // Si no está en caché, obtener de red
    console.log('[SW] No en caché, obteniendo de red:', request.url);
    const networkResponse = await fetch(request);
    
    // Si es exitoso, cachear para el futuro
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      // IMPORTANTE: Clonar ANTES de usar
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Error en cache first:', error);
    
    // Intentar obtener de caché como último recurso
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si nada funciona, devolver error
    return new Response('Offline - Recurso no disponible', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Estrategia Network First (para contenido dinámico)
async function networkFirst(request) {
  try {
    // Intentar red primero
    const networkResponse = await fetch(request);
    
    // Si es exitoso, cachear
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      // IMPORTANTE: Clonar ANTES de usar
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Red falló, intentando caché:', request.url);
    
    // Si falla, buscar en caché
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si tampoco hay caché, devolver error
    return new Response('Offline - Sin conexión', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Detectar si es un asset estático
function isStaticAsset(url) {
  const staticExtensions = [
    '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', 
    '.webp', '.woff', '.woff2', '.ttf', '.eot', '.ico'
  ];
  
  return staticExtensions.some(ext => url.pathname.endsWith(ext));
}

// Escuchar mensajes del cliente
self.addEventListener('message', (event) => {
  console.log('[SW] Mensaje recibido:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(RUNTIME_CACHE)
        .then((cache) => cache.addAll(event.data.urls))
        .catch((error) => console.error('[SW] Error cacheando URLs:', error))
    );
  }
});

// Sincronización en segundo plano (opcional)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Evento de sincronización:', event.tag);
  
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  console.log('[Service Worker] Sincronizando datos...');
  try {
    // Aquí puedes implementar lógica de sincronización
    console.log('[Service Worker] Sincronización exitosa');
  } catch (error) {
    console.error('[Service Worker] Error en sincronización:', error);
    throw error;
  }
}

// Notificación Push (opcional)
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push recibido');
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización disponible',
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    vibrate: [200, 100, 200]
  };
  
  event.waitUntil(
    self.registration.showNotification('PWA Shop', options)
  );
});

// Click en notificación
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notificación clickeada');
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});