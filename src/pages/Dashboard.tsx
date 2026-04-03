import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  ChevronRight, 
  Heart, 
  Baby, 
  Bell, 
  AlertCircle,
  Stethoscope,
  Car
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';
import TipModal from '../components/TipModal';
import { AnimatePresence } from 'motion/react';

export default function Dashboard() {
  const { t, dir } = useLanguage();
  const [selectedWeek, setSelectedWeek] = React.useState<number | null>(null);
  const week = 12; // Mock current week

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('welcome')}</h1>
          <p className="text-gray-500">{t('pregnancyProgress')}</p>
        </div>
        <button className="p-2 bg-secondary rounded-full text-primary relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
        </button>
      </div>

      {/* Pregnancy Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-primary to-accent p-6 rounded-3xl text-white shadow-lg relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Baby className="w-6 h-6" />
            <span className="font-medium">{t('week')} {week}</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {dir === 'rtl' ? 'طفلك بحجم الليمونة' : 'Your baby is the size of a lemon'}
          </h2>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-1000" 
              style={{ width: `${(week / 40) * 100}%` }} 
            />
          </div>
          <p className="mt-2 text-sm text-white/80">
            {dir === 'rtl' ? 'بقي 28 أسبوعاً' : '28 weeks to go'}
          </p>
        </div>
        <Sparkles className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12" />
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <QuickAction 
          icon={<Stethoscope className="w-6 h-6" />}
          title={t('bookDoctor')}
          color="bg-blue-50 text-blue-600"
        />
        <QuickAction 
          icon={<Car className="w-6 h-6" />}
          title={t('requestTransport')}
          color="bg-orange-50 text-orange-600"
        />
      </div>

      {/* Emergency Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md shadow-red-200"
      >
        <AlertCircle className="w-6 h-6" />
        {t('emergency')}
      </motion.button>

      {/* Weekly Tips */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">{t('tips')}</h3>
          <button className="text-primary text-sm font-medium">{dir === 'rtl' ? 'عرض الكل' : 'View All'}</button>
        </div>
        <div className="space-y-3">
          <div onClick={() => setSelectedWeek(week)}>
            <TipItem 
              title={dir === 'rtl' ? 'اشربي الكثير من الماء' : 'Stay Hydrated'}
              desc={dir === 'rtl' ? 'الماء ضروري جداً في هذه المرحلة' : 'Water is essential at this stage'}
            />
          </div>
          <div onClick={() => setSelectedWeek(week)}>
            <TipItem 
              title={dir === 'rtl' ? 'تمارين خفيفة' : 'Light Exercise'}
              desc={dir === 'rtl' ? 'المشي لمدة 15 دقيقة يومياً' : 'Walk for 15 minutes daily'}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedWeek && (
          <TipModal week={selectedWeek} onClose={() => setSelectedWeek(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function QuickAction({ icon, title, color }: { icon: React.ReactNode, title: string, color: string }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn("p-4 rounded-2xl flex flex-col items-center gap-2 text-center font-medium shadow-sm transition-all", color)}
    >
      {icon}
      <span className="text-sm">{title}</span>
    </motion.button>
  );
}

function TipItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-secondary rounded-lg text-primary">
          <Heart className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800">{title}</h4>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L14.5 9.5L23 12L14.5 14.5L12 23L9.5 14.5L1 12L9.5 9.5L12 1Z" />
    </svg>
  );
}
