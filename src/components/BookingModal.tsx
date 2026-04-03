import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

interface BookingModalProps {
  doctor: { name: string; specialty: string };
  onClose: () => void;
}

export default function BookingModal({ doctor, onClose }: BookingModalProps) {
  const { t, dir } = useLanguage();
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = [
    { day: 'Mon', date: '12' },
    { day: 'Tue', date: '13' },
    { day: 'Wed', date: '14' },
    { day: 'Thu', date: '15' },
    { day: 'Fri', date: '16' },
  ];

  const times = ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM'];

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      setStep('success');
    }
  };

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
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        {step === 'details' ? (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{dir === 'rtl' ? 'حجز موعد' : 'Book Appointment'}</h3>
                <p className="text-sm text-gray-500">{doctor.name} • {doctor.specialty}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {dir === 'rtl' ? 'اختر التاريخ' : 'Select Date'}
              </h4>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {dates.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={cn(
                      "flex flex-col items-center min-w-[60px] p-3 rounded-2xl border transition-all",
                      selectedDate === d.date ? "bg-primary text-white border-primary" : "bg-gray-50 border-gray-100 text-gray-600"
                    )}
                  >
                    <span className="text-xs uppercase opacity-80">{d.day}</span>
                    <span className="text-lg font-bold">{d.date}</span>
                  </button>
                ))}
              </div>

              <h4 className="font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                {dir === 'rtl' ? 'اختر الوقت' : 'Select Time'}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "p-3 rounded-xl border text-sm font-medium transition-all",
                      selectedTime === time ? "bg-primary text-white border-primary" : "bg-gray-50 border-gray-100 text-gray-600"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleBook}
              disabled={!selectedDate || !selectedTime}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {dir === 'rtl' ? 'تأكيد الحجز' : 'Confirm Booking'}
            </button>
          </>
        ) : (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{dir === 'rtl' ? 'تم الحجز بنجاح!' : 'Booking Successful!'}</h3>
              <p className="text-gray-500 mt-2">
                {dir === 'rtl' 
                  ? `موعدك مع ${doctor.name} في 12 أبريل الساعة ${selectedTime}`
                  : `Your appointment with ${doctor.name} is set for April 12 at ${selectedTime}`}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold"
            >
              {dir === 'rtl' ? 'تم' : 'Done'}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
