import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssetStage } from '../types';
import { Circle, ArrowRight, XCircle, CheckCircle, Package, Layers, MousePointer2, X } from 'lucide-react';
import { useApp, useT } from '../context';

const Stage: React.FC<{ stage: AssetStage; icon: React.ReactNode; index: number; theme: string }> = ({ stage, icon, index, theme }) => {
  const isLight = theme === 'pancanvas' || theme === 'panjade';
  const borderColor = isLight ? 'border-black/20 hover:border-black/50' : 'border-white/10 hover:border-white/50';
  const bgColor = isLight ? 'bg-white' : 'glass-panel';
  const textColor = isLight ? 'text-black' : 'text-white';
  
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="flex flex-col items-center gap-4 relative"
    >
      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border transition-colors duration-300 z-10 ${bgColor} ${borderColor} ${textColor}`}>
        {icon}
      </div>
      <span className={`text-xs md:text-sm font-mono opacity-50 uppercase tracking-widest ${textColor}`}>{stage}</span>
      
      {/* Connector Line (except for last) */}
      {stage !== AssetStage.EXIT && (
        <div className={`hidden md:block absolute top-6 md:top-8 left-1/2 w-full h-[1px] bg-gradient-to-r -z-0 to-transparent ${isLight ? 'from-black/10' : 'from-white/10'}`} />
      )}
    </motion.div>
  );
};

const FeatureCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; theme: string }> = ({ title, desc, icon, theme }) => {
    const isLight = theme === 'pancanvas' || theme === 'panjade';
    const cardClass = isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10';
    const textTitle = isLight ? 'text-black' : 'text-white';
    const textMuted = isLight ? 'text-black/60' : 'text-white/60';

    return (
        <div className={`p-6 rounded-2xl border flex flex-col items-start gap-4 ${cardClass}`}>
            <div className={`p-3 rounded-lg ${isLight ? 'bg-white text-black border border-black/10' : 'glass-panel text-white'}`}>
                {icon}
            </div>
            <div>
                <h4 className={`text-xl font-bold mb-2 ${textTitle}`}>{title}</h4>
                <p className={`text-sm leading-relaxed ${textMuted}`}>{desc}</p>
            </div>
        </div>
    )
}

const PhilosophyModal: React.FC = () => {
  const { theme, isPhilosophyOpen, setPhilosophyOpen } = useApp();
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

  return (
    <AnimatePresence>
      {isPhilosophyOpen && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setPhilosophyOpen(false)}
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
                    <h2 className={`text-3xl font-bold ${s.text} ${theme === 'cyber' ? 'font-sans' : 'font-serif'}`}>{t.philTitle}</h2>
                    <p className={`text-sm mt-1 ${s.muted}`}>{t.philSubtitle}</p>
                </div>
                <button 
                    onClick={() => setPhilosophyOpen(false)}
                    className={`p-2 rounded-full transition-colors ${theme.includes('pan') ? 'hover:bg-black/5' : 'hover:bg-white/10'} ${s.text}`}
                >
                    <X size={24} />
                </button>
             </div>

             {/* Scrollable Content */}
             <div className="flex-1 overflow-y-auto p-6 md:p-12">
                 <div className="max-w-5xl mx-auto">
                    
                    {/* Core Concepts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <FeatureCard 
                            title={t.philConceptTitle} 
                            desc={t.philConceptDesc} 
                            icon={<Circle size={24} />} 
                            theme={theme}
                        />
                        <FeatureCard 
                            title={t.philArchTitle} 
                            desc={t.philArchDesc} 
                            icon={<Layers size={24} />} 
                            theme={theme}
                        />
                        <FeatureCard 
                            title={t.philDashTitle} 
                            desc={t.philDashDesc} 
                            icon={<MousePointer2 size={24} />} 
                            theme={theme}
                        />
                    </div>

                    {/* Deep Dive Content (Based on prompt history) */}
                    <div className="mb-16 space-y-8">
                        <div>
                             <h3 className={`text-2xl font-bold mb-4 ${s.text} ${theme === 'cyber' ? 'font-mono' : 'font-serif'}`}>{t.philDeepTitle}</h3>
                             <p 
                                className={`leading-relaxed text-lg ${s.muted}`} 
                                dangerouslySetInnerHTML={{ __html: t.philDeepBody }}
                             />
                        </div>
                    </div>

                    {/* Interaction Revolution */}
                    <div className={`p-10 rounded-2xl text-center mb-16 ${s.card} border ${s.border}`}>
                        <h3 className={`text-2xl font-bold mb-4 ${s.text}`}>{t.philInteractTitle}</h3>
                        <p className={`text-xl italic font-serif ${s.muted}`}>"{t.philInteractDesc}"</p>
                    </div>

                    {/* Lifecycle Flow */}
                    <div className="mb-12">
                        <h3 className={`text-center mb-12 font-mono text-sm opacity-50 ${s.text}`}>{t.philLifeCycle}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                            <Stage stage={AssetStage.DESIRE} icon={<Circle size={24} />} index={0} theme={theme} />
                            <Stage stage={AssetStage.ENTRY} icon={<ArrowRight size={24} />} index={1} theme={theme} />
                            <Stage stage={AssetStage.SERVICE} icon={<CheckCircle size={24} />} index={2} theme={theme} />
                            <Stage stage={AssetStage.IDLE} icon={<Package size={24} />} index={3} theme={theme} />
                            <Stage stage={AssetStage.EXIT} icon={<XCircle size={24} />} index={4} theme={theme} />
                        </div>
                    </div>

                 </div>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhilosophyModal;