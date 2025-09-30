import { useState } from 'react';
import { Menu, X, Home, ShoppingCart, Newspaper, CheckSquare, Wifi, WifiOff, Package, TrendingUp, ListTodo, Sparkles } from 'lucide-react';

// Header con diseño moderno y minimalista
function Header({ onMenuToggle, isOnline }) {
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white shadow-2xl fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">ShopHub</h1>
                <p className="text-xs text-purple-200">Progressive Store</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
              isOnline ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
            }`}>
              {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
              <span className="text-xs font-semibold">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            
            <button
              onClick={onMenuToggle}
              className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105"
              aria-label="Toggle menu"
            >
              <Menu size={26} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Sidebar con diseño lateral derecho y estilo moderno
function Sidebar({ isOpen, onClose, currentView, onViewChange }) {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home, color: 'text-blue-500' },
    { id: 'products', label: 'Catálogo', icon: Package, color: 'text-purple-500' },
    { id: 'news', label: 'Actualizaciones', icon: TrendingUp, color: 'text-pink-500' },
    { id: 'tasks', label: 'Pendientes', icon: ListTodo, color: 'text-indigo-500' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-all duration-500 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Navegación</h2>
                <p className="text-sm text-gray-500 mt-1">Explora la tienda</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white rounded-xl transition-all"
                aria-label="Close menu"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
          </div>
          
          <nav className="flex-1 p-6 overflow-y-auto">
            <ul className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onViewChange(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Icon size={22} className={isActive ? 'text-white' : item.color} />
                      <span className="font-semibold text-lg">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">ShopHub v2.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}

// Footer con diseño degradado
function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              ShopHub
            </p>
            <p className="text-sm text-gray-300 mt-1">Experiencia de compra progresiva</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-300">© 2025 ShopHub Inc.</p>
            <p className="text-xs text-gray-400 mt-1">Potenciado por tecnología PWA</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Vista Home rediseñada
function HomeView() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-black text-gray-800 mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Bienvenido a ShopHub
        </h2>
        <p className="text-gray-600 text-lg">Tu experiencia de compra del futuro</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-3xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
            <WifiOff size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-3">Sin Conexión</h3>
          <p className="text-blue-100">Accede a todo tu contenido aunque no tengas internet</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-3xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
            <Sparkles size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-3">Ultra Rápida</h3>
          <p className="text-purple-100">Carga instantánea con tecnología de caché avanzada</p>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
            <Package size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-3">App Nativa</h3>
          <p className="text-indigo-100">Instala en cualquier dispositivo como app nativa</p>
        </div>
      </div>
    </div>
  );
}

// Vista de Productos rediseñada
function ProductsView() {
  const products = [
    { id: 1, name: 'MacBook Pro', price: 1299, category: 'Electrónica', color: 'from-blue-400 to-blue-600' },
    { id: 2, name: 'Iphone 18', price: 899, category: 'Electrónica', color: 'from-purple-400 to-purple-600' },
    { id: 3, name: 'Air Pods 3 Pro ', price: 199, category: 'Audio', color: 'from-pink-400 to-pink-600' },
    { id: 4, name: 'Ipad Mini', price: 599, category: 'Electrónica', color: 'from-indigo-400 to-indigo-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-black text-gray-800 mb-2">Catálogo</h2>
        <p className="text-gray-600">Descubre nuestros productos destacados</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className={`bg-gradient-to-br ${product.color} h-48 flex items-center justify-center`}>
              <ShoppingCart size={64} className="text-white/80" />
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{product.category}</span>
              <h3 className="text-2xl font-bold text-gray-800 mt-2 mb-4">{product.name}</h3>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ${product.price}
                </p>
                <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Vista de Noticias rediseñada
function NewsView() {
  const news = [
    { id: 1, title: 'Nueva versión de PWA disponible', date: '28 Sep 2025', excerpt: 'Mejoras en rendimiento y nuevas características...', tag: 'Actualización' },
    { id: 2, title: 'Service Workers: Mejores prácticas', date: '25 Sep 2025', excerpt: 'Aprende a optimizar el caché de tu aplicación...', tag: 'Tutorial' },
    { id: 3, title: 'React 19 ya está aquí', date: '20 Sep 2025', excerpt: 'Conoce las nuevas características del framework...', tag: 'Tecnología' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-black text-gray-800 mb-2">Actualizaciones</h2>
        <p className="text-gray-600">Mantente al día con las últimas noticias</p>
      </div>
      
      <div className="space-y-5">
        {news.map((item, index) => (
          <article key={item.id} className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-l-4 border-gradient-to-b from-indigo-500 to-purple-500">
            <div className="flex items-start justify-between mb-4">
              <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-xs font-bold">
                {item.tag}
              </span>
              <span className="text-sm text-gray-500 font-medium">{item.date}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.excerpt}</p>
            <button className="mt-4 text-indigo-600 font-semibold hover:text-purple-600 transition-colors">
              Leer más →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

// Vista de Tareas rediseñada
function TasksView() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Implementar Service Worker', completed: true },
    { id: 2, title: 'Crear manifest.json', completed: true },
    { id: 3, title: 'Configurar caché offline', completed: false },
    { id: 4, title: 'Testear modo offline', completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-black text-gray-800 mb-2">Pendientes</h2>
        <p className="text-gray-600">Gestiona tus tareas diarias</p>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Progreso</p>
            <p className="text-3xl font-black mt-1">{completedCount} de {totalCount}</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black">{Math.round((completedCount/totalCount)*100)}%</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center gap-4 p-5 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-2xl transition-all duration-300">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-6 h-6 text-indigo-600 rounded-lg cursor-pointer border-2 border-gray-300"
              />
              <span className={`flex-1 text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800 font-medium'}`}>
                {task.title}
              </span>
              {task.completed && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                  ✓ Hecho
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// App Principal
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useState(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return <ProductsView />;
      case 'news':
        return <NewsView />;
      case 'tasks':
        return <TasksView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 flex flex-col">
      <Header 
        onMenuToggle={() => setMenuOpen(true)} 
        isOnline={isOnline}
      />
      
      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="flex-1 container mx-auto px-6 py-8 mt-20">
        {renderView()}
      </main>
      
      <Footer />
    </div>
  );
}