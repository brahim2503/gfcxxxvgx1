import React from 'react';
import { motion } from 'motion/react';
import { X, Heart, Info, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PREGNANCY_WEEKS } from '../constants/pregnancyData';

interface TipModalProps {
  week: number;
  onClose: () => void;
}

export default function TipModal({ week, onClose }: TipModalProps) {
  const { t, language, dir } = useLanguage();
  const weekData = PREGNANCY_WEEKS.find(w => w.week === week) || PREGNANCY_WEEKS[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-secondary rounded-xl text-primary">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">{t('week')} {week}: {weekData.title[language]}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 border border-blue-100">
            <Info className="w-6 h-6 text-blue-500 shrink-0" />
            <p className="text-sm text-blue-800 leading-relaxed">
              {weekData.description[language]}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-gray-800">{t('tips')}</h4>
            {weekData.tips.map((tip, i) => (
              <div key={i} className="flex gap-3 items-start p-3 bg-gray-50 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{tip[language]}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
            <h4 className="font-bold text-primary mb-2">
              {dir === 'rtl' ? 'تذكير صحي' : 'Health Reminder'}
            </h4>
            <p className="text-sm text-gray-600 italic">
              {dir === 'rtl' 
                ? 'تذكري دائماً استشارة طبيبك قبل إجراء أي تغييرات كبيرة في نظامك الغذائي أو روتين التمارين.' 
                : 'Always remember to consult your doctor before making major changes to your diet or exercise routine.'}
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20"
        >
          {dir === 'rtl' ? 'فهمت' : 'Got it'}
        </button>
      </motion.div>
    </motion.div>
  );
}
