const CACHE_NAME = "nutrition-app-cache-v1";
const urlsToCache = [
  "./",
  "./nutrition.html",
  "./manifest.json",
  // אם יש לך קבצים נוספים (כמו תמונות, קבצי CSS חיצוניים וכו'), הוסף אותם כאן
];

// בעת התקנת ה-Service Worker – שמירת משאבים במטמון
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// בעת בקשת משאב, נסה להחזיר מהמטמון (cache) או מהאינטרנט (network)
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// בעת עדכון ה-Service Worker – מחיקת מטמונים ישנים
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
