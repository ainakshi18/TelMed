import React from 'react';
import { createRoot } from 'react-dom/client'; // Ensure React 18+ for `createRoot`
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // Use react-router-dom for BrowserRouter

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
