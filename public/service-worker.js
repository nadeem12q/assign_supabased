// ============================================
// AssignPortal Service Worker v3
// Cache Strategy: Hybrid (Network First for APIs, Cache First for static)
// ============================================

const CACHE_NAME = 'assign-portal-v3';
const STATIC_CACHE_NAME = 'assign-portal-static-v3';
const API_CACHE_NAME = 'assign-portal-api-v3';
const APP_SHELL_CACHE_NAME = 'assign-portal-shell-v3';

// Static assets to pre-cache during install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// ============================================
// URL PATTERN MATCHERS
// ============================================

// Supabase API data — NETWORK FIRST (must be fresh)
const isSupabaseAPI = (url) => {
  return url.hostname.includes('supabase.co');
};

// CDN static assets — CACHE FIRST (TailwindCSS, Fonts, esm.sh)
const isCDNAsset = (url) => {
  return url.hostname === 'cdn.tailwindcss.com' ||
         url.hostname === 'fonts.googleapis.com' ||
         url.hostname === 'fonts.gstatic.com' ||
         url.hostname === 'esm.sh';
};

const isAppShellRequest = (request, url) => {
  if (request.mode === 'navigate') {
    return true;
  }

  if (url.origin !== self.location.origin) {
    return false;
  }

  if (url.pathname === '/service-worker.js') {
    return false;
  }

  const staticPaths = new Set([
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192x192.png',
    '/icon-512x512.png'
  ]);

  if (staticPaths.has(url.pathname)) {
    return true;
  }

  if (url.pathname.startsWith('/assets/')) {
    return ['script', 'style', 'image', 'font'].includes(request.destination);
  }

  return false;
};

// ============================================
// INSTALL EVENT — Pre-cache static assets
// ============================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker v3...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching static assets');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Activate immediately, don't wait for old SW to finish
  self.skipWaiting();
});

// ============================================
// ACTIVATE EVENT — Clean up old caches
// ============================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker v3...');
  const currentCaches = [CACHE_NAME, STATIC_CACHE_NAME, API_CACHE_NAME, APP_SHELL_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// ============================================
// FETCH EVENT — Route requests to proper strategy
// ============================================
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests (POST uploads, etc.)
  if (event.request.method !== 'GET') {
    return;
  }

  // 1. Supabase API — NETWORK FIRST (fresh data, cache fallback)
  if (isSupabaseAPI(url)) {
    event.respondWith(networkFirst(event.request, API_CACHE_NAME));
    return;
  }

  // 2. CDN assets (Tailwind, Fonts, esm.sh) — CACHE FIRST
  if (isCDNAsset(url)) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE_NAME));
    return;
  }

  // 3. App shell + hashed build assets
  if (isAppShellRequest(event.request, url)) {
    if (event.request.mode === 'navigate') {
      event.respondWith(networkFirst(event.request, APP_SHELL_CACHE_NAME));
      return;
    }

    event.respondWith(cacheFirst(event.request, STATIC_CACHE_NAME));
    return;
  }
});

// ============================================
// CACHE STRATEGIES
// ============================================

/**
 * NETWORK FIRST Strategy
 * Try network → if fails, fallback to cache
 */
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    // Only cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      // Clone response because we need to read it AND cache it
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache for:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // If nothing in cache either, return a basic offline response
    return new Response(
      JSON.stringify({ error: 'You are offline and no cached data is available.' }),
      { 
        status: 503, 
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * CACHE FIRST Strategy
 * Try cache → if miss, fetch from network → cache it
 */
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineCache = await caches.match('/');
      if (offlineCache) return offlineCache;
    }
    return new Response('Offline', { status: 503 });
  }
}

// ============================================
// MESSAGE EVENT — Handle skip waiting from app
// ============================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
