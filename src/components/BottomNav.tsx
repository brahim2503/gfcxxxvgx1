import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Car, Bot, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

export default function BottomNav() {
  const { t } = useLanguage();

  const navItems = [
    { to: '/', icon: <LayoutDashboard className="w-6 h-6" />, label: t('dashboard') },
    { to: '/appointments', icon: <Calendar className="w-6 h-6" />, label: t('appointments') },
    { to: '/ai', icon: <Bot className="w-6 h-6" />, label: t('aiAssistant') },
    { to: '/transport', icon: <Car className="w-6 h-6" />, label: t('transport') },
    { to: '/profile', icon: <User className="w-6 h-6" />, label: t('profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-3 flex justify-around items-center z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => cn(
            "flex flex-col items-center gap-1 transition-colors",
            isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
          )}
        >
          {item.icon}
          <span className="text-[10px] font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
