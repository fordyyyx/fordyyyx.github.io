/* Oche Training Plan service worker: the app shell is served from cache so it opens instantly and offline;
   each launch fetches a fresh copy in the background, so updates appear on the next launch. */
const VERSION = "oche-v13";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const font = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== location.origin && !font) return;
  if (req.mode === "navigate") {
    e.respondWith(caches.open(VERSION).then(async c => {
      const cached = await c.match("index.html");
      const fresh = fetch(req).then(r => { if (r.ok) c.put("index.html", r.clone()); return r; }).catch(() => null);
      return cached || (await fresh) || new Response("Offline", { status: 503 });
    }));
    return;
  }
  e.respondWith(caches.open(VERSION).then(async c => {
    const cached = await c.match(req);
    const fresh = fetch(req).then(r => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => null);
    return cached || (await fresh) || new Response("", { status: 504 });
  }));
});
