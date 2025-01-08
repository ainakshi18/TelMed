import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // Define caching strategies for specific routes
        runtimeCaching: [
          {
            urlPattern: /^\/$/, // Home page route
            handler: 'CacheFirst', // Cache first strategy
            options: {
              cacheName: 'home-page-cache',
              expiration: {
                maxEntries: 10, // Limit to 10 entries in the cache
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
          {
            urlPattern: /\/awareness/, // Awareness page route
            handler: 'CacheFirst',
            options: {
              cacheName: 'awareness-page-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
          {
            urlPattern: /\.(?:js|css|html)$/, // Cache JavaScript, CSS, and HTML files
            handler: 'StaleWhileRevalidate', // Cache but check network for newer content
            options: {
              cacheName: 'static-assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for 1 week
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Healthcare App',
        short_name: 'HealthApp',
        description: 'A healthcare application with offline capabilities',
        theme_color: '#ffffff',
        icons: [
          // {
          //   src: '/pwa-192x192.png', // Ensure these paths are correct
          //   sizes: '192x192',
          //   type: 'image/png',
          // },
          // {
          //   src: '/pwa-512x512.png', // Ensure these paths are correct
          //   sizes: '512x512',
          //   type: 'image/png',
          // },
        ],
      },
      // You can also define the `start_url` and `display` mode here
      start_url: '/',
      display: 'standalone', // Show as a standalone app
    }),
  ],
});
