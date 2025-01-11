// import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
// import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
// import { cacheNames } from 'workbox-core';
// import { ExpirationPlugin } from 'workbox-expiration';

// // Pre-cache static assets (like HTML, JS, and CSS)
// precacheAndRoute(self.__WB_MANIFEST);

// // Cache GET requests for dynamic content (API calls)
// self.addEventListener('install', (event) => {
//   // Skip waiting and activate immediately
//   event.waitUntil(self.skipWaiting());
// });

// self.addEventListener('activate', (event) => {
//   // Take control of all pages immediately
//   event.waitUntil(self.clients.claim());
// });

// self.addEventListener('fetch', (event) => {
//   // Only handle GET requests for caching
//   if (event.request.method === 'GET') {

//     // Example of caching API responses with NetworkFirst strategy
//     if (event.request.url.includes('/api/data')) {
//       event.respondWith(
//         new NetworkFirst({
//           cacheName: 'api-data-cache',
//           plugins: [
//             new ExpirationPlugin({
//               maxEntries: 10, // Cache up to 10 responses
//               maxAgeSeconds: 60 * 60 * 24, // Cache for 24 hours
//             }),
//           ],
//         }).handle(event.request)
//       );
//       return;
//     }

//     // Example of caching other GET requests (images, for example) with CacheFirst strategy
//     if (event.request.destination === 'image') {
//       event.respondWith(
//         new CacheFirst({
//           cacheName: 'image-cache',
//           plugins: [
//             new ExpirationPlugin({
//               maxEntries: 20,
//               maxAgeSeconds: 60 * 60 * 24 * 7, // Cache images for a week
//             }),
//           ],
//         }).handle(event.request)
//       );
//       return;
//     }

//     // Use StaleWhileRevalidate for other static resources like styles and scripts
//     if (event.request.destination === 'script' || event.request.destination === 'style') {
//       event.respondWith(
//         new StaleWhileRevalidate({
//           cacheName: 'static-resources-cache',
//         }).handle(event.request)
//       );
//       return;
//     }

//     // Cache HTML pages (e.g., /doctor-dashboard, /awareness, etc.)
//     if (event.request.url.includes('/doctor-dashboard') || event.request.url.includes('/awareness')) {
//       event.respondWith(
//         new CacheFirst({
//           cacheName: 'pages-cache',
//           plugins: [
//             new ExpirationPlugin({
//               maxEntries: 10, // Limit to 10 cached pages
//               maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for 7 days
//             }),
//           ],
//         }).handle(event.request)
//       );
//       return;
//     }
//   }
// });
