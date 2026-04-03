import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES } from '../constants/pregnancyData';

type Language = keyof typeof LANGUAGES;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  appName: { en: "MamaCare", ar: "ماما كير", fr: "MamaCare" },
  dashboard: { en: "Dashboard", ar: "لوحة التحكم", fr: "Tableau de bord" },
  appointments: { en: "Appointments", ar: "المواعيد", fr: "Rendez-vous" },
  transport: { en: "Transport", ar: "النقل", fr: "Transport" },
  aiAssistant: { en: "AI Assistant", ar: "المساعد الذكي", fr: "Assistant IA" },
  profile: { en: "Profile", ar: "الملف الشخصي", fr: "Profil" },
  emergency: { en: "Emergency", ar: "طوارئ", fr: "Urgence" },
  week: { en: "Week", ar: "أسبوع", fr: "Semaine" },
  askAI: { en: "Ask MamaCare AI...", ar: "اسأل المساعد الذكي...", fr: "Demandez à l'IA..." },
  welcome: { en: "Welcome back!", ar: "أهلاً بكِ مجددًا!", fr: "Bon retour !" },
  pregnancyProgress: { en: "Pregnancy Progress", ar: "تطور الحمل", fr: "Progression de la grossesse" },
  bookDoctor: { en: "Book a Doctor", ar: "حجز طبيب", fr: "Réserver un médecin" },
  requestTransport: { en: "Request Transport", ar: "طلب نقل", fr: "Demander un transport" },
  tips: { en: "Weekly Tips", ar: "نصائح الأسبوع", fr: "Conseils de la semaine" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  const dir = LANGUAGES[language].dir as 'ltr' | 'rtl';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      <div className={dir}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
