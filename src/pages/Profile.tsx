import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, Bell, Shield, CreditCard, LogOut, ChevronRight, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

export default function Profile() {
  const { t, dir } = useLanguage();

  return (
    <div className="space-y-8 pb-20">
      {/* Profile Header */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full border-4 border-secondary overflow-hidden mx-auto">
            <img 
              src="https://picsum.photos/seed/user123/200/200" 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white">
            <Settings className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Amira Rahmani</h2>
          <p className="text-gray-500 text-sm">12 Weeks Pregnant • Due Sept 2024</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label={dir === 'rtl' ? 'الوزن' : 'Weight'} value="64 kg" />
        <StatCard label={dir === 'rtl' ? 'الضغط' : 'BP'} value="120/80" />
        <StatCard label={dir === 'rtl' ? 'النبض' : 'Pulse'} value="78 bpm" />
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        <MenuItem icon={<User className="w-5 h-5" />} label={dir === 'rtl' ? 'المعلومات الشخصية' : 'Personal Info'} />
        <MenuItem icon={<Bell className="w-5 h-5" />} label={dir === 'rtl' ? 'الإشعارات' : 'Notifications'} />
        <MenuItem icon={<CreditCard className="w-5 h-5" />} label={dir === 'rtl' ? 'طرق الدفع' : 'Payment Methods'} />
        <MenuItem icon={<Shield className="w-5 h-5" />} label={dir === 'rtl' ? 'الأمان والخصوصية' : 'Security & Privacy'} />
        <MenuItem icon={<Heart className="w-5 h-5" />} label={dir === 'rtl' ? 'المفضلة' : 'Favorites'} />
      </div>

      <button className="w-full flex items-center justify-center gap-2 text-red-500 font-bold py-4 rounded-2xl border border-red-100 hover:bg-red-50 transition-colors">
        <LogOut className="w-5 h-5" />
        {dir === 'rtl' ? 'تسجيل الخروج' : 'Logout'}
      </button>
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center">
      <p className="text-[10px] text-gray-400 uppercase font-bold">{label}</p>
      <p className="text-sm font-bold text-primary">{value}</p>
    </div>
  );
}

function MenuItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-100 rounded-xl text-gray-500 group-hover:bg-secondary group-hover:text-primary transition-colors">
          {icon}
        </div>
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300" />
    </button>
  );
}
