import { useState } from 'react';
import { Menu, X, Home, Coffee, BookOpen, Dumbbell, Wifi, WifiOff, Users, TrendingUp, Activity, Award, Star, Clock, Target, Zap } from 'lucide-react';

// Navbar Lateral Izquierda Permanente
function LeftNavbar({ currentView, onViewChange, isOnline }) {
  const menuItems = [
    { id: 'home', icon: Home },
    { id: 'products', icon: Dumbbell },
    { id: 'news', icon: BookOpen },
    { id: 'tasks', icon: Target },
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-20 bg-gray-900 flex flex-col items-center py-6 z-40 shadow-2xl">
      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-2xl flex items-center justify-center mb-8">
        <Activity size={26} className="text-white" />
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-emerald-400 to-cyan-600 shadow-lg scale-110'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <Icon size={22} className="text-white" />
            </button>
          );
        })}
      </div>
      
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        isOnline ? 'bg-emerald-500/20' : 'bg-red-500/20'
      }`}>
        {isOnline ? <Wifi size={20} className="text-emerald-400" /> : <WifiOff size={20} className="text-red-400" />}
      </div>
    </nav>
  );
}

// Top Bar
function TopBar({ onMenuToggle }) {
  return (
    <header className="fixed top-0 left-20 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-30 flex items-center justify-between px-8">
      <div>
        <h1 className="text-xl font-black text-gray-800">FitLife</h1>
        <p className="text-xs text-gray-500">Wellness Platform</p>
      </div>
      
      <button
        onClick={onMenuToggle}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu size={24} />
      </button>
    </header>
  );
}

// Mobile Menu Overlay
function MobileMenu({ isOpen, onClose, currentView, onViewChange }) {
  const menuItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'products', label: 'Programas', icon: Dumbbell },
    { id: 'news', label: 'Blog', icon: BookOpen },
    { id: 'tasks', label: 'Objetivos', icon: Target },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 z-50 p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white font-bold text-lg">Menú</h2>
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-600'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}

// Vista Home con diseño de tarjetas horizontales
function HomeView() {
  const stats = [
    { label: 'Entrenamientos', value: '24', icon: Zap, color: 'from-red-500 to-orange-500' },
    { label: 'Calorías', value: '8.5k', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
    { label: 'Objetivos', value: '12/15', icon: Target, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white">
        <h2 className="text-4xl font-black mb-3">¡Bienvenido de nuevo!</h2>
        <p className="text-lg opacity-90">Continúa tu progreso hacia una vida más saludable</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg`}>
              <Icon size={32} className="mb-3 opacity-80" />
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="text-sm opacity-90">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-800">Siguiente Sesión</h3>
          </div>
          <p className="text-gray-600 mb-2">HIIT Intensivo - Nivel Avanzado</p>
          <p className="text-sm text-gray-500">Hoy, 6:00 PM • 45 minutos</p>
          <button className="mt-4 w-full bg-emerald-500 text-white py-2 rounded-xl font-semibold hover:bg-emerald-600 transition">
            Iniciar Ahora
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star size={20} className="text-purple-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-800">Logro Reciente</h3>
          </div>
          <p className="text-gray-600 mb-2">¡7 días consecutivos de entrenamiento!</p>
          <p className="text-sm text-gray-500">Sigue así, estás en racha 🔥</p>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{width: '70%'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Vista de Programas con diseño de grid
function ProductsView() {
  const programs = [
    { 
      id: 1, 
      name: 'Quemar Grasa Express', 
      price: 39, 
      duration: '8 semanas',
      level: 'Intermedio',
      sessions: '5 días/semana',
      color: 'from-red-400 to-pink-500',
      rating: 4.8
    },
    { 
      id: 2, 
      name: 'Fuerza Total Body', 
      price: 59, 
      duration: '12 semanas',
      level: 'Avanzado',
      sessions: '6 días/semana',
      color: 'from-blue-400 to-purple-500',
      rating: 4.9
    },
    { 
      id: 3, 
      name: 'Yoga Restaurativo', 
      price: 29, 
      duration: '6 semanas',
      level: 'Principiante',
      sessions: '3 días/semana',
      color: 'from-green-400 to-teal-500',
      rating: 4.7
    },
    { 
      id: 4, 
      name: 'Resistencia Cardio', 
      price: 49, 
      duration: '10 semanas',
      level: 'Intermedio',
      sessions: '4 días/semana',
      color: 'from-orange-400 to-red-500',
      rating: 4.6
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-800">Programas Disponibles</h2>
          <p className="text-gray-600 mt-1">Elige el entrenamiento perfecto para ti</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {programs.map((program) => (
          <div key={program.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className={`bg-gradient-to-br ${program.color} h-32 flex items-center justify-center relative`}>
              <Dumbbell size={48} className="text-white/60" />
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                <span className="text-white text-sm font-semibold flex items-center gap-1">
                  <Star size={14} fill="white" />
                  {program.rating}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{program.name}</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Duración</p>
                  <p className="text-sm font-semibold text-gray-800">{program.duration}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Nivel</p>
                  <p className="text-sm font-semibold text-gray-800">{program.level}</p>
                </div>
              </div>
              
              <div className="bg-emerald-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-emerald-600">Frecuencia</p>
                <p className="text-sm font-semibold text-emerald-700">{program.sessions}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-black text-gray-800">${program.price}</p>
                  <p className="text-xs text-gray-500">por mes</p>
                </div>
                <button className="bg-gradient-to-r from-emerald-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                  Unirse
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Vista de Blog con diseño tipo timeline
function NewsView() {
  const articles = [
    { 
      id: 1, 
      title: 'Construye músculo con estos 7 ejercicios compuestos', 
      date: '2 días atrás', 
      excerpt: 'Los ejercicios compuestos son la clave para maximizar tus ganancias. Descubre cuáles debes incluir en tu rutina y cómo ejecutarlos correctamente para obtener resultados increíbles.',
      author: 'Dr. Carlos Fitness',
      readTime: '8 min',
      category: 'Fuerza'
    },
    { 
      id: 2, 
      title: 'Meal prep dominical: Organiza tu semana saludable', 
      date: '5 días atrás', 
      excerpt: 'Aprende a preparar todas tus comidas del domingo para la semana completa. Recetas balanceadas, fáciles de hacer y deliciosas que te ayudarán a mantener tu dieta sin esfuerzo.',
      author: 'Chef Nutrición',
      readTime: '12 min',
      category: 'Nutrición'
    },
    { 
      id: 3, 
      title: 'Técnicas de respiración para mejorar tu rendimiento', 
      date: '1 semana atrás', 
      excerpt: 'La respiración correcta puede marcar la diferencia entre un buen y un gran entrenamiento. Aprende estas técnicas probadas para llevar tu rendimiento al siguiente nivel.',
      author: 'Ana Wellness',
      readTime: '6 min',
      category: 'Técnica'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-black mb-2">Blog FitLife</h2>
        <p className="opacity-90">Consejos expertos para potenciar tu transformación</p>
      </div>
      
      <div className="space-y-4">
        {articles.map((article) => (
          <article key={article.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-emerald-500">
            <div className="flex items-start justify-between mb-3">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                {article.category}
              </span>
              <div className="text-right">
                <p className="text-xs text-gray-500">{article.date}</p>
                <p className="text-xs text-gray-400">{article.readTime} lectura</p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">{article.author}</span>
              </div>
              <button className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-1">
                Leer artículo
                <span>→</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// Vista de Objetivos con diseño de columnas
function TasksView() {
  const [goals, setGoals] = useState({
    morning: [
      { id: 1, title: 'Beber agua con limón en ayunas', completed: true, time: '7:00 AM' },
      { id: 2, title: 'Sesión de estiramientos', completed: true, time: '7:15 AM' },
    ],
    afternoon: [
      { id: 3, title: 'Almuerzo alto en proteínas', completed: false, time: '1:00 PM' },
      { id: 4, title: 'Entrenamiento de piernas', completed: false, time: '5:00 PM' },
      { id: 5, title: 'Snack saludable post-workout', completed: false, time: '6:00 PM' },
    ],
    evening: [
      { id: 6, title: 'Cena ligera y nutritiva', completed: false, time: '8:00 PM' },
      { id: 7, title: 'Meditación nocturna', completed: false, time: '10:00 PM' },
    ]
  });

  const toggleGoal = (period, id) => {
    setGoals({
      ...goals,
      [period]: goals[period].map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    });
  };

  const allGoals = [...goals.morning, ...goals.afternoon, ...goals.evening];
  const completedCount = allGoals.filter(g => g.completed).length;
  const totalCount = allGoals.length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-black">Mis Objetivos</h2>
            <p className="opacity-90 mt-1">Martes, 30 de Septiembre</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black">{Math.round((completedCount/totalCount)*100)}%</div>
            <p className="text-sm opacity-90">Completado</p>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-white h-full transition-all duration-500 rounded-full" 
            style={{width: `${(completedCount/totalCount)*100}%`}}
          ></div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Mañana */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">☀️</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Mañana</h3>
              <p className="text-xs text-gray-500">{goals.morning.filter(g => g.completed).length}/{goals.morning.length}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {goals.morning.map((goal) => (
              <div key={goal.id} className="flex gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleGoal('morning', goal.id)}
                  className="w-5 h-5 text-emerald-600 rounded cursor-pointer mt-1"
                />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${goal.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {goal.title}
                  </p>
                  <p className="text-xs text-gray-400">{goal.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tarde */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🌤️</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Tarde</h3>
              <p className="text-xs text-gray-500">{goals.afternoon.filter(g => g.completed).length}/{goals.afternoon.length}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {goals.afternoon.map((goal) => (
              <div key={goal.id} className="flex gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleGoal('afternoon', goal.id)}
                  className="w-5 h-5 text-emerald-600 rounded cursor-pointer mt-1"
                />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${goal.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {goal.title}
                  </p>
                  <p className="text-xs text-gray-400">{goal.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Noche */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🌙</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Noche</h3>
              <p className="text-xs text-gray-500">{goals.evening.filter(g => g.completed).length}/{goals.evening.length}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {goals.evening.map((goal) => (
              <div key={goal.id} className="flex gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleGoal('evening', goal.id)}
                  className="w-5 h-5 text-emerald-600 rounded cursor-pointer mt-1"
                />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${goal.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {goal.title}
                  </p>
                  <p className="text-xs text-gray-400">{goal.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar lateral izquierda - desktop */}
      <div className="hidden md:block">
        <LeftNavbar 
          currentView={currentView} 
          onViewChange={setCurrentView}
          isOnline={isOnline}
        />
      </div>
      
      {/* Top bar */}
      <TopBar onMenuToggle={() => setMenuOpen(true)} />
      
      {/* Mobile menu */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      {/* Main content */}
      <main className="md:ml-20 pt-20 px-6 pb-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
}