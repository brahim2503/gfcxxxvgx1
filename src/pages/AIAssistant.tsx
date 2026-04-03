import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { askMamaCareAI } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export default function AIAssistant() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: t('welcome'), sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await askMamaCareAI(input, 12); // Mock week 12
    const aiMsg: Message = { id: (Date.now() + 1).toString(), text: response || '', sender: 'ai' };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-gray-50 rounded-t-3xl overflow-hidden">
      <div className="bg-primary p-4 text-white flex items-center gap-2">
        <Bot className="w-6 h-6" />
        <h2 className="font-bold text-lg">{t('aiAssistant')}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                <div className="markdown-body text-sm leading-relaxed">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl border border-gray-100 flex gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t('askAI')}
          className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-primary text-white p-2 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
