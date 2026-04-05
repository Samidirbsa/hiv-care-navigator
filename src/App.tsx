import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Settings, 
  BarChart3, 
  Menu, 
  X,
  LogOut,
  PlusCircle,
  Search,
  Bell,
  Activity,
  ClipboardPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

// Pages
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Facilities from './pages/Facilities';
import Registration from './pages/Registration';

const App = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'patients' | 'facilities' | 'registration'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', name: 'Patients', icon: Users },
    { id: 'facilities', name: 'Facilities', icon: Building2 },
    { id: 'registration', name: 'Client Registration', icon: ClipboardPlus },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Toaster position="top-right" expand={false} richColors />
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col z-50 transition-all duration-300 ease-in-out"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Activity className="text-white h-6 w-6" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl text-slate-800 tracking-tight"
            >
              LifeTrack
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  {item.name}
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search patient record..." 
                className="bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                DR
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Dashboard />
              </motion.div>
            )}
            {activeTab === 'patients' && (
              <motion.div
                key="patients"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Patients onRegisterClick={() => setActiveTab('registration')} />
              </motion.div>
            )}
            {activeTab === 'facilities' && (
              <motion.div
                key="facilities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Facilities />
              </motion.div>
            )}
            {activeTab === 'registration' && (
              <motion.div
                key="registration"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Registration onBack={() => setActiveTab('patients')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;