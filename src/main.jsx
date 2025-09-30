// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerServiceWorker } from './registerServiceWorker'

// Renderizar la aplicación
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Registrar Service Worker después de que la app esté montada
registerServiceWorker().then((registration) => {
  if (registration) {
    console.log('✅ PWA lista para funcionar offline');
  } else {
    console.log('⚠️ PWA funcionando sin Service Worker');
  }
});

// Detectar cambios en el estado de conexión
window.addEventListener('online', () => {
  console.log('🌐 Conexión restaurada');
  document.body.classList.remove('offline');
  document.body.classList.add('online');
});

window.addEventListener('offline', () => {
  console.log('📡 Sin conexión - Modo offline activado');
  document.body.classList.remove('online');
  document.body.classList.add('offline');
});