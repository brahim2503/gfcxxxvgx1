import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Car, Navigation, CreditCard, Banknote, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

export default function Transport() {
  const { t, dir } = useLanguage();
  const [step, setStep] = useState<'request' | 'searching' | 'tracking' | 'payment'>('request');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'baridimob'>('cash');

  const handleRequest = () => {
    setStep('searching');
    setTimeout(() => setStep('tracking'), 3000);
  };

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-gray-800">{t('transport')}</h2>

      {step === 'request' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <MapPin className="text-primary w-5 h-5" />
              <input 
                type="text" 
                placeholder={dir === 'rtl' ? 'موقعك الحالي' : 'Current Location'} 
                className="bg-transparent border-none outline-none text-sm flex-1"
                defaultValue={dir === 'rtl' ? 'منزلي' : 'My Home'}
              />
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Navigation className="text-accent w-5 h-5" />
              <input 
                type="text" 
                placeholder={dir === 'rtl' ? 'إلى أين؟' : 'Where to?'} 
                className="bg-transparent border-none outline-none text-sm flex-1"
                defaultValue={dir === 'rtl' ? 'مستشفى التوليد' : 'Maternity Hospital'}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TransportOption 
              icon={<Car className="w-6 h-6" />}
              title={dir === 'rtl' ? 'نقل خاص' : 'Private'}
              price="500 DA"
              selected
            />
            <TransportOption 
              icon={<Car className="w-6 h-6 opacity-50" />}
              title={dir === 'rtl' ? 'نقل مشترك' : 'Shared'}
              price="200 DA"
            />
          </div>

          <button 
            onClick={handleRequest}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20"
          >
            {t('requestTransport')}
          </button>
        </motion.div>
      )}

      {step === 'searching' && (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <Car className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-primary" />
          </div>
          <p className="text-gray-500 font-medium animate-pulse">
            {dir === 'rtl' ? 'البحث عن أقرب سائق...' : 'Searching for nearby drivers...'}
          </p>
        </div>
      )}

      {step === 'tracking' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-gray-200 h-64 rounded-3xl relative overflow-hidden flex items-center justify-center">
             <p className="text-gray-400 font-medium">Map Simulation</p>
             <motion.div 
               animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
               transition={{ duration: 10, repeat: Infinity }}
               className="absolute top-1/2 left-1/2 bg-white p-2 rounded-full shadow-lg"
             >
               <Car className="w-6 h-6 text-primary" />
             </motion.div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold">Ahmed Benali</h4>
                <p className="text-xs text-gray-500">Toyota Corolla • 4.9 ★</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-primary font-bold">5 min</p>
              <p className="text-xs text-gray-400">Away</p>
            </div>
          </div>

          <button 
            onClick={() => setStep('payment')}
            className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold"
          >
            {dir === 'rtl' ? 'إلغاء الطلب' : 'Cancel Request'}
          </button>
        </motion.div>
      )}

      {step === 'payment' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 space-y-6 text-center"
        >
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{dir === 'rtl' ? 'وصلت لوجهتك!' : 'Arrived!'}</h3>
            <p className="text-gray-500">{dir === 'rtl' ? 'يرجى إتمام عملية الدفع' : 'Please complete the payment'}</p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => setPaymentMethod('cash')}
              className={cn(
                "w-full p-4 rounded-2xl border flex items-center justify-between transition-all",
                paymentMethod === 'cash' ? "border-primary bg-secondary/30" : "border-gray-100"
              )}
            >
              <div className="flex items-center gap-3">
                <Banknote className="w-6 h-6 text-green-600" />
                <span className="font-medium">{dir === 'rtl' ? 'دفع نقدي' : 'Cash Payment'}</span>
              </div>
              {paymentMethod === 'cash' && <CheckCircle2 className="w-5 h-5 text-primary" />}
            </button>

            <button 
              onClick={() => setPaymentMethod('baridimob')}
              className={cn(
                "w-full p-4 rounded-2xl border flex items-center justify-between transition-all",
                paymentMethod === 'baridimob' ? "border-primary bg-secondary/30" : "border-gray-100"
              )}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <span className="font-medium">BaridiMob</span>
              </div>
              {paymentMethod === 'baridimob' && <CheckCircle2 className="w-5 h-5 text-primary" />}
            </button>
          </div>

          <button 
            onClick={() => setStep('request')}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold"
          >
            {dir === 'rtl' ? 'تأكيد الدفع' : 'Confirm Payment'}
          </button>
        </motion.div>
      )}
    </div>
  );
}

function TransportOption({ icon, title, price, selected }: { icon: React.ReactNode, title: string, price: string, selected?: boolean }) {
  return (
    <div className={cn(
      "p-4 rounded-2xl border transition-all cursor-pointer",
      selected ? "border-primary bg-secondary/30" : "border-gray-100 bg-white"
    )}>
      {icon}
      <h4 className="font-bold mt-2">{title}</h4>
      <p className="text-sm text-primary font-medium">{price}</p>
    </div>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
