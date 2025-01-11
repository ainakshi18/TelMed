import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // registerType: 'autoUpdate', // Automatically update the service worker
      devOptions: {
        enabled: true, // Enables PWA in development mode
      },
      manifest: {
        name: 'My PWA App',
        short_name: 'PWAApp',
        description: 'A simple PWA built with React and Vite',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/patient-profile/,
            handler: 'CacheFirst', // Cache the patient profile page
            options: {
              cacheName: 'patient-profile-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
              },
            },
          },
          {
            urlPattern: /\/awareness/,
            handler: 'CacheFirst', // Cache the awareness page
            options: {
              cacheName: 'awareness-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
              },
            },
          },
          {
            urlPattern: /\/first-aid/,
            handler: 'CacheFirst', // Cache the first-aid page
            options: {
              cacheName: 'first-aid-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
              },
            },
          },
          {
            urlPattern: /\/doctor-dashboard/,
            handler: 'CacheFirst', // Cache the doctor dashboard page
            options: {
              cacheName: 'doctor-dashboard-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' ||
              request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            },
          },
        ],
      },
    }),
  ],
});
