import React from 'react';
import { motion } from 'motion/react';
import { X, Search, User, Phone, Calendar, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PatientsListModalProps {
  onClose: () => void;
  onSelectPatient: (patient: any) => void;
}

const ALL_PATIENTS = [
  { id: 1, name: "Amira Rahmani", week: 12, phone: "0555 12 34 56", lastVisit: "2 days ago" },
  { id: 2, name: "Fatima Zahra", week: 24, phone: "0661 98 76 54", lastVisit: "1 week ago" },
  { id: 3, name: "Meriem Ben", week: 8, phone: "0770 44 55 66", lastVisit: "Today" },
  { id: 4, name: "Sara Khelil", week: 32, phone: "0550 11 22 33", lastVisit: "3 weeks ago" },
  { id: 5, name: "Lina Mansour", week: 16, phone: "0662 33 44 55", lastVisit: "1 month ago" },
];

export default function PatientsListModal({ onClose, onSelectPatient }: PatientsListModalProps) {
  const { t, dir } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-[130] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {dir === 'rtl' ? 'قائمة المريضات' : 'Patients List'}
            </h3>
            <p className="text-sm text-gray-500">{ALL_PATIENTS.length} {dir === 'rtl' ? 'مريضة مسجلة' : 'patients registered'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder={dir === 'rtl' ? 'البحث عن مريضة...' : 'Search patient...'}
              className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3">
          {ALL_PATIENTS.map((patient) => (
            <motion.div 
              key={patient.id}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{patient.name}</h4>
                  <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {t('week')} {patient.week}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {patient.phone}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
