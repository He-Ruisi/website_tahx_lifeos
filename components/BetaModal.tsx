
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, QrCode, MessageCircle } from 'lucide-react';
import { useApp, useT } from '../context.tsx';

const BetaModal: React.FC = () => {
  const { theme, isBetaOpen, setBetaOpen } = useApp();
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

  return (
    <AnimatePresence>
      {isBetaOpen && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setBetaOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full md:w-[80%] h-[85%] rounded-3xl shadow-2xl overflow-hidden flex flex-col border ${s.bg} ${s.border}`}
          >
             {/* Header */}
             <div className={`p-6 md:p-8 flex justify-between items-center border-b ${s.border}`}>
                <div>
                    <h2 className={`text-3xl font-bold ${s.text} ${theme === 'cyber' ? 'font-sans' : 'font-serif'}`}>{t.betaModalTitle}</h2>
                    <p className={`text-sm mt-1 ${s.muted}`}>{t.betaModalSubtitle}</p>
                </div>
                <button 
                    onClick={() => setBetaOpen(false)}
                    className={`p-2 rounded-full transition-colors ${theme.includes('pan') ? 'hover:bg-black/5' : 'hover:bg-white/10'} ${s.text}`}
                >
                    <X size={24} />
                </button>
             </div>

             {/* Content */}
             <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center">
                 <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    
                    {/* WeChat Column */}
                    <div className={`p-8 rounded-3xl flex flex-col items-center text-center border ${s.card} ${s.border}`}>
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${isLight ? 'bg-green-100 text-green-600' : 'bg-green-900/30 text-green-400'}`}>
                            <MessageCircle size={32} />
                        </div>
                        <h3 className={`text-xl font-bold mb-2 ${s.text}`}>{t.wechatLabel}</h3>
                        <div className={`w-48 h-48 my-6 rounded-xl flex items-center justify-center overflow-hidden border ${isLight ? 'bg-white border-black/5' : 'bg-white border-white/5'}`}>
                            {/* Placeholder QR Code */}
                            <QrCode size={100} className="text-black/20" />
                        </div>
                        <p className={`text-sm ${s.muted}`}>{t.wechatScan}</p>
                    </div>

                    {/* Discord Column */}
                    <div className={`p-8 rounded-3xl flex flex-col items-center text-center border ${s.card} ${s.border}`}>
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${isLight ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-900/30 text-indigo-400'}`}>
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.43 13.43 0 0 0-1.044 2.135 18.52 18.52 0 0 0-4.606 0 13.43 13.43 0 0 0-1.044-2.135.074.074 0 0 0-.079-.037A19.791 19.791 0 0 0 3.673 4.37a.072.072 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.072.072 0 0 0-.032-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.956 2.42-2.157 2.42z" />
                            </svg>
                        </div>
                        <h3 className={`text-xl font-bold mb-2 ${s.text}`}>{t.discordLabel}</h3>
                        <div className="my-6 flex-1 flex items-center justify-center">
                            <p className={`${s.muted} max-w-xs`}>Join the discussion, get support, and share your setup.</p>
                        </div>
                        <a 
                            href="#"
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all w-full justify-center ${isLight ? 'bg-[#5865F2] text-white hover:bg-[#4752C4]' : 'bg-[#5865F2] text-white hover:bg-[#4752C4]'}`}
                        >
                            <span>{t.discordBtn}</span>
                            <ExternalLink size={18} />
                        </a>
                    </div>
                 </div>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BetaModal;
