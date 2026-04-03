import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import BottomNav from './components/BottomNav';
import LanguageSelector from './components/LanguageSelector';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import Appointments from './pages/Appointments';
import Transport from './pages/Transport';
import Profile from './pages/Profile';
import DoctorDashboard from './pages/DoctorDashboard';
import { useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto relative shadow-2xl shadow-gray-200">
      {/* Top Bar */}
      <div className="p-4 flex justify-between items-center bg-white sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="font-bold text-lg text-primary">{t('appName')}</span>
        </div>
        <LanguageSelector />
      </div>

      {/* Main Content */}
      <main className="p-4 min-h-[calc(100vh-140px)]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ai" element={<AIAssistant />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
        </Routes>
      </main>

      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}
