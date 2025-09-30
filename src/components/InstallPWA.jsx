// src/components/InstallPWA.jsx
import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPWA() {
  const [installable, setInstallable] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Verificar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Escuchar evento de instalabilidad
    const handleInstallable = () => {
      setInstallable(true);
      
      // Mostrar el prompt automáticamente después de 10 segundos
      setTimeout(() => {
        setShowPrompt(true);
      }, 10000);
    };

    window.addEventListener('pwa-installable', handleInstallable);

    // Verificar si ya se puede instalar
    if (window.deferredPrompt) {
      setInstallable(true);
    }

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
    };
  }, []);

  const handleInstall = async () => {
    if (window.installPWA) {
      const accepted = await window.installPWA();
      if (accepted) {
        setShowPrompt(false);
        setInstallable(false);
        setIsInstalled(true);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Volver a mostrar en 24 horas
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  // No mostrar si ya está instalada o no es instalable
  if (isInstalled || !installable) {
    return null;
  }

  // Banner de instalación
  if (showPrompt) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl z-50 animate-slide-up">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block bg-white p-2 rounded-lg">
                <img 
                  src="/pwa-64x64.png" 
                  alt="PWA Shop" 
                  className="w-12 h-12"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Instala PWA Shop</h3>
                <p className="text-sm text-blue-100">
                  Acceso rápido, funciona offline y ocupa poco espacio
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex items-center gap-2 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <Download size={20} />
                <span className="hidden sm:inline">Instalar</span>
              </button>
              <button
                onClick={handleDismiss}
                className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
                aria-label="Cerrar"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Botón flotante (cuando no se muestra el banner)
  return (
    <button
      onClick={() => setShowPrompt(true)}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-40"
      aria-label="Instalar aplicación"
      title="Instalar PWA Shop"
    >
      <Download size={24} />
    </button>
  );
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
  @keyframes slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.4s ease-out;
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}