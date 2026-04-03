import React from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  User, 
  Activity, 
  FileText, 
  AlertTriangle, 
  Calendar,
  Heart,
  Weight,
  Droplets
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

interface PatientRecordModalProps {
  patient: {
    name: string;
    age: number;
    week: number;
    bloodType: string;
    dueDate: string;
    history: string[];
    vitals: {
      weight: string;
      bp: string;
      pulse: string;
    };
    notes: string[];
  };
  onClose: () => void;
}

export default function PatientRecordModal({ patient, onClose }: PatientRecordModalProps) {
  const { t, dir } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-[120] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-primary p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{patient.name}</h3>
              <p className="opacity-80">{patient.age} {dir === 'rtl' ? 'سنة' : 'years old'} • {t('week')} {patient.week}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <RecordStat icon={<Droplets className="w-4 h-4" />} label={dir === 'rtl' ? 'فصيلة الدم' : 'Blood'} value={patient.bloodType} />
            <RecordStat icon={<Weight className="w-4 h-4" />} label={dir === 'rtl' ? 'الوزن' : 'Weight'} value={patient.vitals.weight} />
            <RecordStat icon={<Activity className="w-4 h-4" />} label={dir === 'rtl' ? 'الضغط' : 'BP'} value={patient.vitals.bp} />
          </div>

          {/* Pregnancy Info */}
          <section className="space-y-3">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {dir === 'rtl' ? 'معلومات الحمل' : 'Pregnancy Info'}
            </h4>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">{dir === 'rtl' ? 'تاريخ الولادة المتوقع' : 'Expected Due Date'}</span>
                <span className="font-bold text-primary">{patient.dueDate}</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: `${(patient.week / 40) * 100}%` }} />
              </div>
            </div>
          </section>

          {/* Medical History */}
          <section className="space-y-3">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              {dir === 'rtl' ? 'السجل الطبي' : 'Medical History'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {patient.history.map((item, i) => (
                <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium border border-orange-100">
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* Clinical Notes */}
          <section className="space-y-3">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              {dir === 'rtl' ? 'ملاحظات طبية' : 'Clinical Notes'}
            </h4>
            <div className="space-y-3">
              {patient.notes.map((note, i) => (
                <div key={i} className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800 italic">
                  "{note}"
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-2xl font-bold hover:bg-gray-100 transition-colors">
            {dir === 'rtl' ? 'تعديل السجل' : 'Edit Record'}
          </button>
          <button className="flex-1 bg-primary text-white py-3 rounded-2xl font-bold shadow-lg shadow-primary/20">
            {dir === 'rtl' ? 'إضافة ملاحظة' : 'Add Note'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function RecordStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center shadow-sm">
      <div className="flex justify-center text-primary mb-1">{icon}</div>
      <p className="text-[10px] text-gray-400 uppercase font-bold">{label}</p>
      <p className="text-sm font-bold text-gray-800">{value}</p>
    </div>
  );
}
