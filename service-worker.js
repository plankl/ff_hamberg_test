
const CACHE_NAME = 'hydrantenkarte-v20250908';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Statische Assets die immer gecacht werden
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './icon-192.png',
  './icon-512.png',
  './icons/feuerwehr-helm.png',
  './icons/red-dot.png',
  './icons/blue-dot.png',
  './icons/green-dot.png',
  './icons/yellow-dot.png',
  './icons/purple-dot.png',
  './icons/blinker.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Map-Tiles die dynamisch gecacht werden
const TILE_CACHE_PATTERN = /https:\/\/.*\.(png|jpg|jpeg)$/;
const TILE_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 Tage

self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Installation...');
  
  event.waitUntil(
    Promise.all([
      // Statische Assets cachen
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Hydrantendaten cachen
      caches.open(DYNAMIC_CACHE).then(cache => {
        return cache.add('/hydrants-data.json');
      })
    ]).then(() => {
      console.log('✅ Service Worker: Installation abgeschlossen');
      self.skipWaiting();
    })
  );
});

self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Aktivierung...');
  
  event.waitUntil(
    // Alte Caches löschen
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('🗑️ Service Worker: Lösche alten Cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Aktivierung abgeschlossen');
      self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Map-Tiles intelligent cachen
  if (TILE_CACHE_PATTERN.test(request.url)) {
    event.respondWith(handleTileRequest(request));
    return;
  }
  
  // API-Requests mit Fallback
  if (url.pathname.includes('api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }
  
  // Statische Assets
  event.respondWith(handleStaticRequest(request));
});

async function handleTileRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    const cacheTime = new Date(cached.headers.get('sw-cache-time') || 0);
    const now = new Date();
    
    // Tile-Cache für 7 Tage gültig
    if (now - cacheTime < TILE_CACHE_DURATION) {
      return cached;
    }
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const responseClone = response.clone();
      responseClone.headers.append('sw-cache-time', new Date().toISOString());
      cache.put(request, responseClone);
    }
    return response;
  } catch (error) {
    return cached || new Response('Offline - Karte nicht verfügbar', { status: 503 });
  }
}

async function handleApiRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      // Offline-Header hinzufügen
      const offlineResponse = new Response(cached.body, {
        status: cached.status,
        statusText: cached.statusText,
        headers: { ...cached.headers, 'X-Offline': 'true' }
      });
      return offlineResponse;
    }
    
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'Daten nicht verfügbar - bitte Internetverbindung prüfen'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Offline', { status: 503 });
  }
}

// Background Sync für Daten-Updates
self.addEventListener('sync', event => {
  console.log('🔄 Service Worker: Background Sync:', event.tag);
  
  if (event.tag === 'hydrant-data-sync') {
    event.waitUntil(syncHydrantData());
  }
});

async function syncHydrantData() {
  try {
    const response = await fetch('/api/hydrants/latest');
    if (response.ok) {
      const data = await response.json();
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put('/hydrants-data.json', new Response(JSON.stringify(data)));
      
      // Clients über Update informieren
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({ type: 'DATA_UPDATED', data: data });
      });
      
      console.log('✅ Service Worker: Hydrantendaten aktualisiert');
    }
  } catch (error) {
    console.warn('⚠️ Service Worker: Sync fehlgeschlagen:', error);
  }
}
