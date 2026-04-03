import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, Clock, Star, MessageCircle, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';
import BookingModal from '../components/BookingModal';
import ChatModal from '../components/ChatModal';
import { AnimatePresence } from 'motion/react';

const DOCTORS = [
  { id: 1, name: "Dr. Sarah Mansouri", specialty: "OB/GYN", rating: 4.9, reviews: 124, image: "https://picsum.photos/seed/doc1/200/200" },
  { id: 2, name: "Dr. Amine Khelil", specialty: "Pediatrician", rating: 4.8, reviews: 89, image: "https://picsum.photos/seed/doc2/200/200" },
  { id: 3, name: "Dr. Leila Brahimi", specialty: "OB/GYN", rating: 5.0, reviews: 210, image: "https://picsum.photos/seed/doc3/200/200" },
];

export default function Appointments() {
  const { t, dir } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<typeof DOCTORS[0] | null>(null);
  const [chatDoctor, setChatDoctor] = useState<typeof DOCTORS[0] | null>(null);

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-gray-800">{t('appointments')}</h2>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={dir === 'rtl' ? 'ابحث عن طبيب...' : 'Search for a doctor...'}
          className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        <CategoryChip label={dir === 'rtl' ? 'الكل' : 'All'} active />
        <CategoryChip label={dir === 'rtl' ? 'نساء وتوليد' : 'OB/GYN'} />
        <CategoryChip label={dir === 'rtl' ? 'أطفال' : 'Pediatrics'} />
        <CategoryChip label={dir === 'rtl' ? 'تغذية' : 'Nutrition'} />
      </div>

      {/* Doctors List */}
      <div className="space-y-4">
        {DOCTORS.map((doc) => (
          <motion.div 
            key={doc.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-4 rounded-3xl border border-gray-100 flex gap-4 items-center group cursor-pointer hover:border-primary/30 transition-colors"
          >
            <img 
              src={doc.image} 
              alt={doc.name} 
              className="w-20 h-20 rounded-2xl object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{doc.name}</h4>
              <p className="text-xs text-gray-500 mb-2">{doc.specialty}</p>
              <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                <Star className="w-3 h-3 fill-current" />
                <span>{doc.rating}</span>
                <span className="text-gray-400 font-normal">({doc.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setChatDoctor(doc)}
                className="p-2 bg-secondary text-primary rounded-xl hover:bg-primary hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setSelectedDoctor(doc)}
                className="p-2 bg-primary text-white rounded-xl shadow-sm"
              >
                <Calendar className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedDoctor && (
          <BookingModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
        )}
        {chatDoctor && (
          <ChatModal doctor={chatDoctor} onClose={() => setChatDoctor(null)} />
        )}
      </AnimatePresence>

      {/* Upcoming Appointments */}
      <div className="space-y-4 mt-8">
        <h3 className="font-bold text-lg">{dir === 'rtl' ? 'المواعيد القادمة' : 'Upcoming'}</h3>
        <div className="bg-gradient-to-r from-accent to-purple-600 p-4 rounded-3xl text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl text-center min-w-[60px]">
              <p className="text-xs uppercase opacity-80">Apr</p>
              <p className="text-xl font-bold">12</p>
            </div>
            <div>
              <h4 className="font-bold">Dr. Sarah Mansouri</h4>
              <div className="flex items-center gap-2 text-xs opacity-80 mt-1">
                <Clock className="w-3 h-3" />
                <span>10:30 AM</span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 opacity-50" />
        </div>
      </div>
    </div>
  );
}

function CategoryChip({ label, active }: { label: string, active?: boolean }) {
  return (
    <button className={cn(
      "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
      active ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    )}>
      {label}
    </button>
  );
}
