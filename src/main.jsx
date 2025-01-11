import React from 'react';
import { createRoot } from 'react-dom/client'; // Ensure React 18+ for `createRoot`
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // Use react-router-dom for BrowserRouter
import './i18n'; // Import i18n setup


// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js').then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     }).catch((error) => {
//       console.error('Service Worker registration failed:', error);
//     });
//   });
// }

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
 );
// // Register Service Worker
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(registration => {
//         console.log('Service Worker registered with scope:', registration.scope);
//       })
//       .catch(error => {
//         console.error('Service Worker registration failed:', error);
//       });
//   });
// }


