import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
}

interface ChatModalProps {
  doctor: { name: string };
  onClose: () => void;
}

export default function ChatModal({ doctor, onClose }: ChatModalProps) {
  const { t, dir } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: dir === 'rtl' ? `مرحباً، كيف يمكنني مساعدتك اليوم؟` : `Hello, how can I help you today?`, sender: 'doctor' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock doctor response
    setTimeout(() => {
      const doctorMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text: dir === 'rtl' ? 'سأقوم بمراجعة حالتك والرد عليك قريباً.' : 'I will review your case and get back to you soon.', 
        sender: 'doctor' 
      };
      setMessages(prev => [...prev, doctorMsg]);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-[110] flex flex-col"
    >
      <div className="bg-primary p-4 text-white flex items-center gap-3">
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
          <ChevronLeft className={cn("w-6 h-6", dir === 'rtl' && "rotate-180")} />
        </button>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold">{doctor.name}</h2>
          <p className="text-xs opacity-80">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
              }`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={dir === 'rtl' ? 'اكتب رسالة...' : 'Type a message...'}
          className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-primary text-white p-2 rounded-full"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
