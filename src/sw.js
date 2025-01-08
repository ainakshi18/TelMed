// // src/sw.js

// // This is the install event, where you can pre-cache static assets.
// self.addEventListener('install', (event) => {
//     console.log('Service Worker: Installed');
    
//     // Pre-cache static assets (if any).
//     event.waitUntil(
//       caches.open('static-cache').then((cache) => {
//         return cache.addAll([
//           '/', // Home page
//           '/index.html', // Main HTML file
//           '/style.css', // CSS file (if any)
//           '/app.js', // Main JS file (if any)
//           '/images/logo.png', // Add your images or other assets to cache
//           // Add any other assets you want to pre-cache here
//         ]);
//       })
//     );
//   });
  
//   // Activate the service worker and clean up old caches (optional).
//   self.addEventListener('activate', (event) => {
//     console.log('Service Worker: Activated');
    
//     // Clean up old caches if necessary
//     const cacheWhitelist = ['static-cache'];
//     event.waitUntil(
//       caches.keys().then((cacheNames) => {
//         return Promise.all(
//           cacheNames.map((cacheName) => {
//             if (!cacheWhitelist.includes(cacheName)) {
//               console.log('Service Worker: Deleting old cache', cacheName);
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       })
//     );
//   });
  
//   // Fetch event to serve cached content or fetch from the network
//   self.addEventListener('fetch', (event) => {
//     // Check if the request is for a specific route to cache
//     const url = event.request.url;
  
//     if (url.includes('/')) {
//       // Cache the home page and its assets
//       event.respondWith(
//         caches.match(event.request).then((cachedResponse) => {
//           if (cachedResponse) {
//             return cachedResponse; // Return cached response if available
//           }
  
//           return fetch(event.request).then((response) => {
//             // Cache the response for future use
//             return caches.open('static-cache').then((cache) => {
//               cache.put(event.request, response.clone());
//               return response;
//             });
//           });
//         })
//       );
//     }
  
//     // Add more conditions here if you want to cache other routes or resources
//     // For example, you can cache specific routes like AwarenessPatient or others.
//   });
  
//   // Fallback mechanism for offline scenarios (optional)
//   self.addEventListener('fetch', (event) => {
//     event.respondWith(
//       caches.match(event.request).then((cachedResponse) => {
//         return cachedResponse || fetch(event.request).catch(() => {
//           // Serve an offline page or fallback if the network request fails
//           return caches.match('/offline.html'); // Optional: define an offline page
//         });
//       })
//     );
//   });
  