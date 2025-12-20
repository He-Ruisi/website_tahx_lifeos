import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { useApp, useT } from '../context';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const { theme } = useApp();
  const t = useT();

  const toggleChat = () => setIsOpen(!isOpen);

  const handleStart = () => {
    setStep(1);
    setTimeout(() => {
        const betaSection = document.getElementById('beta');
        if (betaSection) betaSection.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };

  const getStyles = () => {
      switch (theme) {
          case 'cyber': return { grad: 'bg-gradient-to-br from-tahx-secondary to-tahx-accent', card: 'bg-tahx-card border-tahx-border' };
          case 'panyuliang': return { grad: 'bg-gradient-to-br from-panyuliang-secondary to-panyuliang-accent', card: 'bg-panyuliang-card border-panyuliang-border' };
          case 'pancanvas': return { grad: 'bg-gradient-to-br from-pancanvas-secondary to-pancanvas-accent', card: 'bg-pancanvas-card border-pancanvas-border' };
          case 'panjade': return { grad: 'bg-gradient-to-br from-panjade-secondary to-panjade-accent', card: 'bg-panjade-card border-panjade-border' };
          default: return { grad: 'bg-blue-500', card: 'bg-gray-900' };
      }
  };

  const s = getStyles();
  const isLight = theme === 'pancanvas' || theme === 'panjade';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`mb-4 w-80 border rounded-2xl shadow-2xl overflow-hidden ${s.card}`}
          >
            <div className={`p-4 flex justify-between items-center ${s.grad}`}>
                <span className={`font-bold text-sm ${isLight ? 'text-white' : 'text-black'}`}>{t.aiTitle}</span>
                <button onClick={toggleChat} className={`${isLight ? 'text-white/70 hover:text-white' : 'text-black/50 hover:text-black'}`}>
                    <X size={16} />
                </button>
            </div>
            <div className="p-4 h-64 flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="flex gap-2 items-start">
                         <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs ${isLight ? 'bg-black/5 border-black/10 text-black' : 'bg-white/5 border-white/10 text-white'}`}>AI</div>
                         <div className={`border p-3 rounded-lg rounded-tl-none text-sm ${isLight ? 'bg-black/5 border-black/10 text-black/80' : 'bg-white/5 border-white/10 text-white/80'}`}>
                             {t.aiGreeting}
                         </div>
                    </div>
                    {step >= 1 && (
                         <div className="flex gap-2 items-start justify-end">
                            <div className={`border p-3 rounded-lg rounded-tr-none text-sm ${isLight ? 'bg-black/10 border-black/20 text-black' : 'bg-white/20 border-white/30 text-white'}`}>
                                {t.aiYes}
                            </div>
                       </div>
                    )}
                </div>

                {step === 0 && (
                    <button 
                        onClick={handleStart}
                        className={`w-full py-2 rounded transition-colors text-sm font-medium flex items-center justify-center gap-2 ${isLight ? 'bg-black text-white hover:bg-black/80' : 'bg-white text-black hover:bg-gray-200'}`}
                    >
                        <span>{t.aiBtn}</span>
                        <Send size={14} />
                    </button>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95 ${s.grad} ${isLight ? 'text-white' : 'text-black'}`}
      >
        <MessageSquare size={24} fill="currentColor" />
      </button>
    </div>
  );
};

export default AIChatBot;