import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, User, Phone, Calendar, Droplets, Hash, Save, Weight, Activity, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AddPatientModalProps {
  onClose: () => void;
  onAdd: (patient: any) => void;
}

export default function AddPatientModal({ onClose, onAdd }: AddPatientModalProps) {
  const { dir } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    week: '',
    phone: '',
    bloodType: 'A+',
    weight: '',
    bloodPressure: '',
    isSpecialCase: false,
    specialCaseDetails: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Date.now(),
      lastVisit: 'Just added',
    });
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-[140] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-primary text-white shrink-0">
          <h3 className="text-xl font-bold">
            {dir === 'rtl' ? 'إضافة مريضة جديدة' : 'Add New Patient'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">
              {dir === 'rtl' ? 'الاسم الكامل' : 'Full Name'}
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder={dir === 'rtl' ? 'اسم المريضة' : 'Patient Name'}
                className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                {dir === 'rtl' ? 'العمر' : 'Age'}
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="number" 
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                  placeholder="25"
                  className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                {dir === 'rtl' ? 'أسبوع الحمل' : 'Pregnancy Week'}
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="number" 
                  value={formData.week}
                  onChange={e => setFormData({...formData, week: e.target.value})}
                  placeholder="12"
                  className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                {dir === 'rtl' ? 'الوزن (كغ)' : 'Weight (kg)'}
              </label>
              <div className="relative">
                <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={formData.weight}
                  onChange={e => setFormData({...formData, weight: e.target.value})}
                  placeholder="65"
                  className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                {dir === 'rtl' ? 'ضغط الدم' : 'Blood Pressure'}
              </label>
              <div className="relative">
                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={formData.bloodPressure}
                  onChange={e => setFormData({...formData, bloodPressure: e.target.value})}
                  placeholder="120/80"
                  className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                {dir === 'rtl' ? 'رقم الهاتف' : 'Phone Number'}
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="0555 00 00 00"
                  className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                {dir === 'rtl' ? 'فصيلة الدم' : 'Blood Type'}
              </label>
              <div className="relative">
                <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select 
                  value={formData.bloodType}
                  onChange={e => setFormData({...formData, bloodType: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                >
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={formData.isSpecialCase}
                  onChange={e => setFormData({...formData, isSpecialCase: e.target.checked})}
                  className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-gray-200 transition-all checked:border-primary checked:bg-primary"
                />
                <AlertCircle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm font-bold text-gray-700">
                {dir === 'rtl' ? 'حالة خاصة؟' : 'Special Case?'}
              </span>
            </label>

            {formData.isSpecialCase && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-1"
              >
                <textarea 
                  value={formData.specialCaseDetails}
                  onChange={e => setFormData({...formData, specialCaseDetails: e.target.value})}
                  placeholder={dir === 'rtl' ? 'تفاصيل الحالة الخاصة...' : 'Special case details...'}
                  className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm min-h-[80px]"
                />
              </motion.div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2 hover:bg-primary/90 transition-colors shrink-0"
          >
            <Save className="w-5 h-5" />
            {dir === 'rtl' ? 'حفظ البيانات' : 'Save Patient'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
