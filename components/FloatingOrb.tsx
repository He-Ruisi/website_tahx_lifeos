
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Mic, Send, X, Sparkles } from 'lucide-react';
import { useApp, useT } from '../context.tsx';

const FloatingOrb: React.FC = () => {
  const { theme } = useApp();
  const t = useT();
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState('');
  const constraintsRef = useRef(null);

  // Physics springs for organic movement
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const scale = useSpring(1, springConfig);

  const isLight = theme === 'pancanvas' || theme === 'panjade';
  
  const getStyles = () => {
      switch (theme) {
          case 'cyber': return { orb: 'bg-tahx-accent shadow-[0_0_30px_rgba(0,240,255,0.4)]', text: 'text-black' };
          case 'panyuliang': return { orb: 'bg-panyuliang-accent shadow-[0_0_30px_rgba(212,163,115,0.3)]', text: 'text-panyuliang-bg' };
          case 'pancanvas': return { orb: 'bg-pancanvas-accent shadow-[0_0_30px_rgba(200,85,61,0.3)]', text: 'text-white' };
          case 'panjade': return { orb: 'bg-panjade-secondary shadow-[0_0_30px_rgba(0,109,119,0.3)]', text: 'text-white' };
          default: return { orb: 'bg-white', text: 'text-black' };
      }
  };

  const s = getStyles();

  return (
    <>
      <motion.div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[60]" />
      
      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {isExpanded && (
            <motion.div 
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                className="fixed inset-0 z-[70] bg-black/40 flex flex-col items-center justify-center p-6"
            >
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl relative overflow-hidden ${isLight ? 'bg-white' : 'bg-black/80 border border-white/10'}`}
                >
                    <button 
                        onClick={() => setIsExpanded(false)}
                        className={`absolute top-4 right-4 p-2 rounded-full ${isLight ? 'hover:bg-black/5 text-black' : 'hover:bg-white/10 text-white'}`}
                    >
                        <X size={24} />
                    </button>

                    <div className="flex flex-col gap-6 pt-4">
                        <div className="text-center">
                            <h3 className={`text-2xl font-bold mb-2 ${isLight ? 'text-black' : 'text-white'}`}>Record Asset</h3>
                            <p className={`text-sm ${isLight ? 'text-black/50' : 'text-white/50'}`}>"Bought a MacBook Pro for $2400 #System"</p>
                        </div>

                        <div className={`relative rounded-2xl p-4 min-h-[120px] flex flex-col ${isLight ? 'bg-gray-50' : 'bg-white/5'}`}>
                            <textarea 
                                autoFocus
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type or speak..."
                                className={`w-full bg-transparent resize-none outline-none text-lg ${isLight ? 'text-black placeholder:text-black/20' : 'text-white placeholder:text-white/20'}`}
                                rows={3}
                            />
                            <div className="mt-auto flex justify-between items-center">
                                <button className={`p-2 rounded-full transition-colors ${isLight ? 'hover:bg-black/10 text-black/50' : 'hover:bg-white/10 text-white/50'}`}>
                                    <Mic size={20} />
                                </button>
                                <button 
                                    onClick={() => {
                                        setInputText('');
                                        setIsExpanded(false);
                                    }}
                                    className={`px-4 py-2 rounded-full font-bold flex items-center gap-2 text-sm transition-transform active:scale-95 ${s.orb} ${s.text}`}
                                >
                                    <span>Process</span>
                                    <Sparkles size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* The Floating Orb */}
      {!isExpanded && (
          <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
            whileHover={{ scale: 1.05 }}
            onTap={() => setIsExpanded(true)}
            initial={{ x: window.innerWidth - 100, y: window.innerHeight - 100 }}
            animate={{ 
                y: [0, -10, 0], // Breathing animation
            }}
            transition={{
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            style={{ scale }}
            className={`fixed z-[60] w-16 h-16 rounded-full cursor-grab flex items-center justify-center backdrop-blur-md ${s.orb}`}
          >
             <div className={`absolute inset-0 rounded-full bg-white/20 animate-pulse`} />
             <Mic size={24} className={s.text} />
          </motion.div>
      )}
    </>
  );
};

export default FloatingOrb;
