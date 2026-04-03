import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES } from '../constants/pregnancyData';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-500" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as any)}
        className="bg-transparent text-sm font-medium text-gray-600 outline-none cursor-pointer"
      >
        {Object.entries(LANGUAGES).map(([code, info]) => (
          <option key={code} value={code}>
            {info.name}
          </option>
        ))}
      </select>
    </div>
  );
}
