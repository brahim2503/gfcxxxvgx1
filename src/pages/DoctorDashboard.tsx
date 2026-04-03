import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Clock, 
  ChevronRight, 
  Search,
  Bell,
  MoreVertical,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';
import ChatModal from '../components/ChatModal';
import PatientRecordModal from '../components/PatientRecordModal';
import PatientsListModal from '../components/PatientsListModal';
import AddPatientModal from '../components/AddPatientModal';
import { Plus } from 'lucide-react';

const APPOINTMENTS = [
  { 
    id: 1, 
    patient: "Amira Rahmani", 
    time: "10:30 AM", 
    type: "Regular Checkup", 
    status: "confirmed", 
    week: 12,
    record: {
      name: "Amira Rahmani",
      age: 28,
      week: 12,
      bloodType: "A+",
      dueDate: "15 Sept 2024",
      history: ["Anemia", "First Pregnancy"],
      vitals: { weight: "64 kg", bp: "120/80", pulse: "78 bpm" },
      notes: ["Patient reports mild morning sickness.", "Iron supplements prescribed."]
    }
  },
  { 
    id: 2, 
    patient: "Fatima Zahra", 
    time: "11:15 AM", 
    type: "Ultrasound", 
    status: "waiting", 
    week: 24,
    record: {
      name: "Fatima Zahra",
      age: 32,
      week: 24,
      bloodType: "O-",
      dueDate: "10 June 2024",
      history: ["Gestational Diabetes risk", "Second Pregnancy"],
      vitals: { weight: "72 kg", bp: "130/85", pulse: "82 bpm" },
      notes: ["Glucose test scheduled.", "Fetal movement normal."]
    }
  },
  { 
    id: 3, 
    patient: "Meriem Ben", 
    time: "12:00 PM", 
    type: "First Visit", 
    status: "confirmed", 
    week: 8,
    record: {
      name: "Meriem Ben",
      age: 25,
      week: 8,
      bloodType: "B+",
      dueDate: "20 Oct 2024",
      history: ["No significant issues"],
      vitals: { weight: "58 kg", bp: "115/75", pulse: "75 bpm" },
      notes: ["Initial blood work ordered.", "Prenatal vitamins started."]
    }
  },
];

const CHATS = [
  { id: 1, patient: "Amira Rahmani", lastMsg: "Thank you doctor!", time: "2m ago", unread: true },
  { id: 2, patient: "Sara Khelil", lastMsg: "Can I take paracetamol?", time: "1h ago", unread: false },
];

export default function DoctorDashboard() {
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<'appointments' | 'chats'>('appointments');
  const [selectedChatPatient, setSelectedChatPatient] = useState<any>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showPatientsList, setShowPatientsList] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddPatient = (patient: any) => {
    console.log("New Patient:", patient);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-white px-6 py-3 rounded-full shadow-xl font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            {dir === 'rtl' ? 'تمت إضافة المريضة بنجاح!' : 'Patient added successfully!'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {dir === 'rtl' ? 'لوحة تحكم الطبيب' : 'Doctor Dashboard'}
          </h1>
          <p className="text-gray-500">
            {dir === 'rtl' ? 'مرحباً د. سارة منصور' : 'Welcome Dr. Sarah Mansouri'}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddPatient(true)}
            className="p-2 bg-primary text-white rounded-full shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-100 rounded-full text-gray-600">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 bg-secondary rounded-full text-primary relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setActiveTab('appointments')}
          className="text-left"
        >
          <StatCard 
            icon={<CalendarIcon className="w-5 h-5" />} 
            label={dir === 'rtl' ? 'مواعيد اليوم' : 'Today\'s Appts'} 
            value="12" 
            color="bg-blue-50 text-blue-600"
            active={activeTab === 'appointments'}
          />
        </button>
        <button 
          onClick={() => setShowPatientsList(true)}
          className="text-left"
        >
          <StatCard 
            icon={<Users className="w-5 h-5" />} 
            label={dir === 'rtl' ? 'إجمالي المريضات' : 'Total Patients'} 
            value="148" 
            color="bg-primary/10 text-primary"
          />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-2xl">
        <button 
          onClick={() => setActiveTab('appointments')}
          className={cn(
            "flex-1 py-2 rounded-xl text-sm font-bold transition-all",
            activeTab === 'appointments' ? "bg-white text-primary shadow-sm" : "text-gray-500"
          )}
        >
          {dir === 'rtl' ? 'المواعيد' : 'Appointments'}
        </button>
        <button 
          onClick={() => setActiveTab('chats')}
          className={cn(
            "flex-1 py-2 rounded-xl text-sm font-bold transition-all",
            activeTab === 'chats' ? "bg-white text-primary shadow-sm" : "text-gray-500"
          )}
        >
          {dir === 'rtl' ? 'المحادثات' : 'Chats'}
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'appointments' ? (
          APPOINTMENTS.map((appt) => (
            <motion.div 
              key={appt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedRecord(appt.record)}
              className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{appt.patient}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{appt.time} • {appt.type}</span>
                  </div>
                  <span className="text-[10px] bg-secondary text-primary px-2 py-0.5 rounded-full font-bold mt-1 inline-block">
                    {t('week')} {appt.week}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-green-500 hover:bg-green-50 rounded-xl transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-300 hover:bg-gray-50 rounded-xl transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          CHATS.map((chat) => (
            <motion.div 
              key={chat.id}
              onClick={() => setSelectedChatPatient({ name: chat.patient })}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center justify-between cursor-pointer hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <CorporateIcon className="w-6 h-6" />
                  </div>
                  {chat.unread && <span className="absolute top-0 right-0 w-3 h-3 bg-primary border-2 border-white rounded-full" />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{chat.patient}</h4>
                  <p className="text-xs text-gray-500 truncate max-w-[150px]">{chat.lastMsg}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400">{chat.time}</p>
                {chat.unread && <span className="inline-block w-2 h-2 bg-primary rounded-full mt-1" />}
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {selectedChatPatient && (
          <ChatModal doctor={{ name: "Dr. Sarah Mansouri" }} onClose={() => setSelectedChatPatient(null)} />
        )}
        {selectedRecord && (
          <PatientRecordModal patient={selectedRecord} onClose={() => setSelectedRecord(null)} />
        )}
        {showPatientsList && (
          <PatientsListModal onClose={() => setShowPatientsList(false)} onSelectPatient={() => {}} />
        )}
        {showAddPatient && (
          <AddPatientModal onClose={() => setShowAddPatient(false)} onAdd={handleAddPatient} />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ icon, label, value, color, active }: { icon: React.ReactNode, label: string, value: string, color: string, active?: boolean }) {
  return (
    <div className={cn(
      "p-4 rounded-3xl flex flex-col gap-1 w-full transition-all border-2",
      color,
      active ? "border-current" : "border-transparent"
    )}>
      <div className="flex justify-between items-start">
        {icon}
        <ChevronRight className="w-4 h-4 opacity-30" />
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-xs font-medium opacity-80">{label}</p>
    </div>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function CorporateIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
