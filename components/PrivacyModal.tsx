import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Server, CloudOff } from 'lucide-react';
import { useApp, useT } from '../context';

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useApp();
  const t = useT();
  
  const getStyles = () => {
     switch(theme) {
         case 'cyber': return { 
            bg: 'bg-[#0a0a0a]', 
            text: 'text-white', 
            muted: 'text-gray-400',
            border: 'border-tahx-border',
            card: 'bg-tahx-card'
         };
         case 'panyuliang': return { 
            bg: 'bg-[#3b2e4d]', 
            text: 'text-[#F2E9E4]', 
            muted: 'text-[#A899B5]',
            border: 'border-[#5E4B70]',
            card: 'bg-[#453655]'
         };
         case 'pancanvas': return { 
            bg: 'bg-[#F9F4EF]', 
            text: 'text-[#222222]', 
            muted: 'text-[#666666]',
            border: 'border-[#E0D5C9]',
            card: 'bg-white'
         };
         case 'panjade': return { 
            bg: 'bg-[#EAF2ED]', 
            text: 'text-[#264653]', 
            muted: 'text-[#5C6B73]',
            border: 'border-[#B8C6BF]',
            card: 'bg-[#F3F6F4]'
         };
         default: return { bg: 'bg-black', text: 'text-white', muted: 'text-gray-500', border: 'border-white/10', card: 'bg-gray-800' };
     }
  };

  const s = getStyles();
  const isLight = theme === 'pancanvas' || theme === 'panjade';

  const sections = [
      { title: t.legalSection1Title, content: t.legalSection1Desc, icon: <Lock size={20} /> },
      { title: t.legalSection2Title, content: t.legalSection2Desc, icon: <Server size={20} /> },
      { title: t.legalSection3Title, content: t.legalSection3Desc, icon: <Shield size={20} /> },
      { title: t.legalSection4Title, content: t.legalSection4Desc, icon: <CloudOff size={20} /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-3xl h-[85%] md:h-auto md:max-h-[85%] rounded-3xl shadow-2xl overflow-hidden flex flex-col border ${s.bg} ${s.border}`}
          >
             {/* Header */}
             <div className={`p-6 border-b flex justify-between items-center ${s.border}`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isLight ? 'bg-black/5' : 'bg-white/10'}`}>
                        <Shield className={s.text} size={24} />
                    </div>
                    <div>
                        <h2 className={`text-xl md:text-2xl font-bold ${s.text}`}>{t.legalTitle}</h2>
                        <p className={`text-xs md:text-sm mt-1 ${s.muted}`}>{t.legalSubtitle}</p>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className={`p-2 rounded-full transition-colors ${theme.includes('pan') ? 'hover:bg-black/5' : 'hover:bg-white/10'} ${s.text}`}
                >
                    <X size={24} />
                </button>
             </div>

             {/* Content */}
             <div className="flex-1 overflow-y-auto p-6 md:p-8">
                 <p className={`mb-8 text-sm md:text-base leading-relaxed font-medium ${s.text} opacity-90`}>
                     {t.legalIntro}
                 </p>

                 <div className="space-y-6">
                     {sections.map((section, idx) => (
                         <div key={idx} className={`p-4 rounded-xl border ${s.card} ${s.border}`}>
                             <div className="flex items-center gap-2 mb-2">
                                 <span className={isLight ? 'text-black/60' : 'text-white/60'}>{section.icon}</span>
                                 <h3 className={`font-bold text-sm md:text-base ${s.text}`}>{section.title}</h3>
                             </div>
                             <p className={`text-xs md:text-sm leading-relaxed whitespace-pre-line ${s.muted}`}>
                                 {section.content}
                             </p>
                         </div>
                     ))}
                 </div>

                 <div className={`mt-8 pt-6 border-t text-xs text-center ${s.border} ${s.muted}`}>
                     {t.legalContact}
                 </div>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyModal;