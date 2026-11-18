import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/app.css';
import App from './App.jsx';

// Register Service Worker for PWA with auto-update
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        reg.update();
      })
      .catch((err) => {
        console.warn('Service worker registration failed:', err);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
