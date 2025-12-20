import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Battery, Smartphone, Brain, Move, Quote, Layers, Kanban, X, ChevronRight, ChevronLeft, Grip, BookOpen, Heart } from 'lucide-react';
import { useApp, useT } from '../context';

// --- Types ---

interface WidgetConfig {
  id: string;
  colSpan: string;
  rowSpan: string;
}

// --- Helpers ---

const getThemePalette = (theme: string) => {
  switch (theme) {
    case 'cyber': return { accent: 'bg-gradient-to-r from-tahx-secondary to-tahx-accent', icon: 'text-tahx-accent', text: 'text-white' };
    case 'panyuliang': return { accent: 'bg-gradient-to-r from-panyuliang-secondary to-panyuliang-accent', icon: 'text-panyuliang-accent', text: 'text-panyuliang-text' };
    case 'pancanvas': return { accent: 'bg-gradient-to-r from-pancanvas-secondary to-pancanvas-accent', icon: 'text-pancanvas-accent', text: 'text-pancanvas-text' };
    case 'panjade': return { accent: 'bg-gradient-to-r from-panjade-secondary to-panjade-accent', icon: 'text-panjade-accent', text: 'text-panjade-text' };
    default: return { accent: 'bg-gray-500', icon: 'text-gray-500', text: 'text-black' };
  }
};

const playNote = (index: number) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // C Major Scale: C4, D4, E4, F4, G4, A4, B4, C5
    const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
    // Map index to note, wrap around if more than 8 items
    const freq = notes[index % notes.length];

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Envelope for a soft piano-like pluck
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02); // Quick Attack
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1); // Long Decay

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 1);
  } catch (e) {
    // Fail silently if audio context is blocked
  }
};

// --- Sub Components ---

const LifeBattery: React.FC = () => {
  const [percentage, setPercentage] = useState(0);
  const { theme, language } = useApp();
  const palette = getThemePalette(theme);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    const pct = (day / 365) * 100;
    setPercentage(pct);
  }, []);

  const isLight = theme === 'pancanvas' || theme === 'panjade';
  const barBg = isLight ? 'bg-black/10' : 'bg-white/10';

  return (
    <div className="h-full flex flex-col justify-between p-6 pointer-events-none">
      <div className="flex justify-between items-start">
        <Battery className={`${palette.icon} animate-pulse-slow`} size={24} />
        <span className={`text-xs font-mono opacity-50 ${palette.text}`}>SYS.LIFECYCLE</span>
      </div>
      <div>
        <div className="flex justify-end items-end mb-2">
            <span className={`text-4xl font-mono font-bold ${palette.text}`}>{percentage.toFixed(1)}%</span>
        </div>
        <div className={`w-full ${barBg} h-2 rounded-full overflow-hidden`}>
          <div 
            className={`h-full ${palette.accent}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className={`text-xs opacity-50 mt-2 text-right ${palette.text}`}>{language === 'en' ? 'Year Progress' : '年度进度'}</p>
      </div>
    </div>
  );
};

const QuoteCard: React.FC = () => {
  const { theme } = useApp();
  const t = useT();
  const [index, setIndex] = useState(0);
  const palette = getThemePalette(theme);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % t.quotes.length);
    }, 5000); // 5 seconds per quote
    return () => clearInterval(interval);
  }, [t.quotes]);

  const isLight = theme === 'pancanvas' || theme === 'panjade';
  const font = (theme === 'cyber') ? 'font-sans' : 'font-serif';

  return (
    <div className="h-full flex flex-col justify-between p-6 relative overflow-hidden pointer-events-none">
        <Quote className={`absolute top-4 right-4 opacity-10 ${palette.text}`} size={64} />
        <div className="z-10 h-full flex items-center">
            <AnimatePresence mode="wait">
                <motion.p 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`text-lg md:text-xl font-light leading-snug italic ${palette.text} ${font}`}
                >
                    "{t.quotes[index]}"
                </motion.p>
            </AnimatePresence>
        </div>
        <div className="flex gap-1 mt-4">
            {t.quotes.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === index ? `w-4 ${isLight ? 'bg-black' : 'bg-white'}` : `w-1 ${isLight ? 'bg-black/20' : 'bg-white/20'}`}`} />
            ))}
        </div>
    </div>
  );
};

// --- Widget Wrapper with Drag Handle ---

interface BentoItemProps {
  widget: WidgetConfig;
  index: number;
  onMove: (dragId: string, hoverId: string) => void;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  theme: string;
}

const BentoItem: React.FC<BentoItemProps> = ({ widget, index, onMove, onClick, children, className, theme }) => {
  const controls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);
  const isLight = theme === 'pancanvas' || theme === 'panjade';
  const handleColor = isLight ? 'text-black' : 'text-white';

  const handleInteraction = () => {
    playNote(index);
    if (!isDragging && onClick) onClick();
  };

  return (
    <motion.div
      layout
      layoutId={widget.id}
      data-widget-id={widget.id}
      drag
      dragControls={controls}
      dragListener={false} 
      dragMomentum={false}
      dragElastic={0}
      whileDrag={{ scale: 1.02, opacity: 0.95, zIndex: 100 }}
      whileTap={{ scale: 0.98 }}
      style={{ 
        zIndex: isDragging ? 50 : 1, 
        position: 'relative' 
      }}
      transition={{ duration: 0.2 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        const point = info.point;
        const elements = document.elementsFromPoint(point.x, point.y);
        const target = elements.find(el => {
            const wid = el.getAttribute('data-widget-id');
            return wid && wid !== widget.id;
        });

        if (target) {
            const targetId = target.getAttribute('data-widget-id');
            if (targetId) onMove(widget.id, targetId);
        }
      }}
      onPointerDown={() => playNote(index)}
      onClick={handleInteraction}
      className={`relative rounded-3xl overflow-hidden ${widget.colSpan} ${widget.rowSpan} ${className}`}
    >
      {children}

      <div 
        className="absolute bottom-0 right-0 p-3 z-50 cursor-se-resize group hover:bg-black/5 transition-colors rounded-tl-xl"
        onPointerDown={(e) => {
            // Stop propagation so we don't trigger the click handler immediately for drag
            // but we still want the sound
            controls.start(e);
        }}
      >
        <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${handleColor}`}>
            <Grip size={20} />
        </div>
        <div className={`absolute bottom-2 right-2 w-2 h-2 border-r-2 border-b-2 ${isLight ? 'border-black/20' : 'border-white/20'} rounded-br-sm group-hover:opacity-0 transition-opacity`} />
      </div>
    </motion.div>
  );
};


// --- Modals ---

const ArchitectureModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [page, setPage] = useState(0);
    const { theme } = useApp();
    const t = useT();
    const isLight = theme === 'pancanvas' || theme === 'panjade';
    const bg = isLight ? 'bg-white' : 'bg-[#1a1a1a]';
    const text = isLight ? 'text-black' : 'text-white';

    const pages = [
        { title: t.archLayer1, icon: <Brain size={48} />, content: t.archLayer1Desc },
        { title: t.archLayer2, icon: <Layers size={48} />, content: t.archLayer2Desc },
        { title: t.archLayer3, icon: <Smartphone size={48} />, content: t.archLayer3Desc }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
            <div className={`relative w-full max-w-2xl aspect-[4/3] ${bg} rounded-xl shadow-2xl overflow-hidden flex flex-col`}>
                <button onClick={onClose} className={`absolute top-4 right-4 z-20 hover:opacity-100 opacity-50 ${text}`}><X /></button>
                
                <div className="flex-1 relative perspective-[1000px] flex items-center justify-center p-12">
                     <AnimatePresence mode="wait">
                        <motion.div
                            key={page}
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: -90, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-center"
                        >
                            <div className={`inline-flex p-6 rounded-full mb-6 bg-blue-500/20 text-blue-500`}>
                                {pages[page].icon}
                            </div>
                            <h3 className={`text-3xl font-bold mb-4 ${text}`}>{pages[page].title}</h3>
                            <p className={`${text} opacity-70 text-lg leading-relaxed`}>{pages[page].content}</p>
                        </motion.div>
                     </AnimatePresence>
                </div>

                <div className={`h-16 border-t flex items-center justify-between px-6 ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-black/20 border-white/10'}`}>
                    <button onClick={() => setPage(p => Math.max(0, p-1))} disabled={page === 0} className={`${text} disabled:opacity-30`}><ChevronLeft /></button>
                    <div className="flex gap-2">
                        {pages.map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i === page ? (isLight ? 'bg-black' : 'bg-white') : (isLight ? 'bg-black/20' : 'bg-white/20')}`} />
                        ))}
                    </div>
                    <button onClick={() => setPage(p => Math.min(2, p+1))} disabled={page === 2} className={`${text} disabled:opacity-30`}><ChevronRight /></button>
                </div>
            </div>
        </motion.div>
    );
};

const RoadmapModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { theme } = useApp();
    const t = useT();
    const isLight = theme === 'pancanvas' || theme === 'panjade';
    const bg = isLight ? 'bg-white' : 'bg-[#1a1a1a]';
    const text = isLight ? 'text-black' : 'text-white';
    const colBg = isLight ? 'bg-gray-100' : 'bg-black/40';

    const columns = [
        { name: t.roadmapCol1, color: "border-red-500", items: [t.roadmapItem1, t.roadmapItem2, t.roadmapItem3] },
        { name: t.roadmapCol2, color: "border-yellow-500", items: [t.roadmapItem4, t.roadmapItem5, t.roadmapItem6] },
        { name: t.roadmapCol3, color: "border-green-500", items: [t.roadmapItem7, t.roadmapItem8, t.roadmapItem9] }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
             <div className={`relative w-full max-w-4xl h-[600px] ${bg} rounded-xl shadow-2xl overflow-hidden flex flex-col`}>
                <div className={`p-6 border-b flex justify-between items-center ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                    <h3 className={`text-xl font-bold flex items-center gap-2 ${text}`}><Kanban size={20}/> {t.roadmapTitle}</h3>
                    <button onClick={onClose} className={`${text} opacity-50 hover:opacity-100`}><X /></button>
                </div>
                <div className="flex-1 overflow-x-auto p-6 flex gap-4">
                    {columns.map((col, i) => (
                        <div key={i} className={`min-w-[280px] ${colBg} rounded-lg p-4 flex flex-col gap-3 h-full`}>
                            <div className={`border-b-2 ${col.color} pb-2 font-bold ${text} text-sm uppercase tracking-wider`}>
                                {col.name}
                            </div>
                            {col.items.map((item, idx) => (
                                <div key={idx} className={`p-3 rounded border text-sm cursor-pointer transition-colors ${isLight ? 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50' : 'bg-white/5 border-white/5 text-white/80 hover:bg-white/10'}`}>
                                    {item}
                                </div>
                            ))}
                            <div className="mt-auto pt-4 text-center text-xs opacity-30 italic">+ Add Card</div>
                        </div>
                    ))}
                </div>
             </div>
        </motion.div>
    );
};

// --- Main Hero Bento ---

const HeroBento: React.FC = () => {
  const { theme, language, setPhilosophyOpen } = useApp();
  const t = useT();
  const [activeModal, setActiveModal] = useState<'arch' | 'roadmap' | null>(null);

  // Widget Configuration State
  const [widgets, setWidgets] = useState<WidgetConfig[]>([
    { id: 'main', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
    { id: 'battery', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { id: 'entry', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { id: 'quote', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-1' },
    { id: 'arch', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { id: 'roadmap', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { id: 'philosophy', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { id: 'body', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  ]);

  const handleMove = (dragId: string, targetId: string) => {
    const fromIndex = widgets.findIndex(w => w.id === dragId);
    const toIndex = widgets.findIndex(w => w.id === targetId);
    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;

    const newWidgets = [...widgets];
    const [moved] = newWidgets.splice(fromIndex, 1);
    newWidgets.splice(toIndex, 0, moved);
    setWidgets(newWidgets);
  };

  // Helper for container styles
  const getContainerStyle = () => {
    switch (theme) {
      case 'cyber': return { bg: 'bg-tahx-bg', glow1: 'bg-tahx-secondary/20', glow2: 'bg-tahx-accent/10', title: 'text-white', muted: 'text-tahx-muted', font: 'font-sans' };
      case 'panyuliang': return { bg: 'bg-panyuliang-bg', glow1: 'bg-panyuliang-secondary/20', glow2: 'bg-panyuliang-accent/10', title: 'text-panyuliang-text', muted: 'text-panyuliang-muted', font: 'font-serif' };
      case 'pancanvas': return { bg: 'bg-pancanvas-bg', glow1: 'bg-pancanvas-secondary/20', glow2: 'bg-pancanvas-accent/10', title: 'text-pancanvas-text', muted: 'text-pancanvas-muted', font: 'font-serif' };
      case 'panjade': return { bg: 'bg-panjade-bg', glow1: 'bg-panjade-secondary/20', glow2: 'bg-panjade-accent/10', title: 'text-panjade-text', muted: 'text-panjade-muted', font: 'font-serif' };
      default: return { bg: 'bg-black', glow1: 'bg-blue-500/20', glow2: 'bg-red-500/10', title: 'text-white', muted: 'text-gray-500', font: 'font-sans' };
    }
  };

  // Helper for Card styles
  const getCardStyle = (isHoverable = false) => {
     let base = "border shadow-lg transition-colors";
     if (isHoverable) base += " cursor-pointer group";

     switch (theme) {
       case 'cyber': return `${base} glass-panel hover:border-tahx-accent/50 text-white`;
       case 'panyuliang': return `${base} bg-panyuliang-card border-panyuliang-border hover:border-panyuliang-accent/50 text-panyuliang-text`;
       case 'pancanvas': return `${base} bg-pancanvas-card border-pancanvas-border hover:border-pancanvas-accent/50 text-pancanvas-text`;
       case 'panjade': return `${base} bg-panjade-card border-panjade-border hover:border-panjade-accent/50 text-panjade-text`;
       default: return base;
     }
  };

  const s = getContainerStyle();
  const isLight = theme === 'pancanvas' || theme === 'panjade';
  const palette = getThemePalette(theme);

  // Render Logic for individual widgets
  const renderWidget = (widget: WidgetConfig, index: number) => {
    switch (widget.id) {
        case 'main':
            return (
                <BentoItem key={widget.id} widget={widget} index={index} onMove={handleMove} className={`group ${getCardStyle()}`} theme={theme}>
                    <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/80 z-10 pointer-events-none" />
                    <img 
                        src={theme === 'cyber' ? "https://picsum.photos/800/600?grayscale&blur=2" : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Pan_Yuliang_Self-portrait.jpg/640px-Pan_Yuliang_Self-portrait.jpg"} 
                        alt="Visual" 
                        className={`w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${theme === 'cyber' ? 'opacity-60 grayscale' : 'opacity-80'}`}
                    />
                    <div className="absolute bottom-0 left-0 p-6 z-20 pointer-events-none">
                        <span className={`inline-block px-2 py-1 text-xs font-mono rounded mb-2 border ${theme === 'cyber' ? 'bg-tahx-accent/20 text-tahx-accent border-tahx-accent/30' : 'bg-white/20 text-white border-white/30'}`}>
                            BETA 0.9.0
                        </span>
                        <h3 className={`text-2xl font-bold text-white`}>{language === 'en' ? 'The Negative One Screen' : '负一屏交互'}</h3>
                        <p className="text-white/70 text-sm mt-1">{language === 'en' ? 'Drag widgets to customize your dashboard.' : '拖拽组件以自定义仪表盘。'}</p>
                    </div>
                </BentoItem>
            );
        case 'battery':
            return (
                <BentoItem key={widget.id} widget={widget} index={index} onMove={handleMove} className={getCardStyle()} theme={theme}>
                    <LifeBattery />
                </BentoItem>
            );
        case 'entry':
            return (
                 <BentoItem key={widget.id} widget={widget} index={index} onMove={handleMove} className={`flex flex-col justify-center items-center gap-3 ${getCardStyle(true)}`} theme={theme}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border group-hover:scale-110 transition-transform ${isLight ? 'bg-gray-100 border-gray-200' : 'bg-white/5 border-white/10'}`}>
                        <Smartphone className={palette.icon} size={20} />
                    </div>
                    <p className={`text-sm font-medium ${s.title}`}>{useT().cardEntry}</p>
                    <p className={`text-xs text-center ${s.muted}`}>{useT().cardEntryDesc}</p>
                </BentoItem>
            );
        case 'quote':
            return (
                <BentoItem key={widget.id} widget={widget} index={index} onMove={handleMove} className={getCardStyle()} theme={theme}>
                    <QuoteCard />
                </BentoItem>
            );
        case 'arch':
            return (
                <BentoItem 
                    key={widget.id} 
                    widget={widget} 
                    index={index}
                    onMove={handleMove} 
                    onClick={() => setActiveModal('arch')}
                    className={`flex flex-col justify-center ${getCardStyle(true)} hover:bg-black/5`}
                    theme={theme}
                >
                     <div className="p-6 pointer-events-none">
                        <Layers className={`${palette.icon} mb-3`} size={24} />
                        <h3 className={`font-bold ${s.title}`}>{useT().cardArch}</h3>
                        <p className={`text-xs ${s.muted} mt-1`}>{useT().cardArchDesc}</p>
                     </div>
                </BentoItem>
            );
        case 'roadmap':
            return (
                 <BentoItem 
                    key={widget.id} 
                    widget={widget} 
                    index={index}
                    onMove={handleMove} 
                    onClick={() => setActiveModal('roadmap')}
                    className={`flex flex-col justify-center ${getCardStyle(true)} hover:bg-black/5`}
                    theme={theme}
                >
                     <div className="p-6 pointer-events-none">
                        <Kanban className={`${palette.icon} mb-3`} size={24} />
                        <h3 className={`font-bold ${s.title}`}>{useT().cardMap}</h3>
                        <p className={`text-xs ${s.muted} mt-1`}>{useT().cardMapDesc}</p>
                     </div>
                </BentoItem>
            );
        case 'philosophy':
            return (
                 <BentoItem 
                    key={widget.id} 
                    widget={widget} 
                    index={index}
                    onMove={handleMove} 
                    onClick={() => setPhilosophyOpen(true)}
                    className={`flex flex-col justify-center ${getCardStyle(true)} hover:bg-black/5`}
                    theme={theme}
                >
                     <div className="p-6 pointer-events-none">
                        <BookOpen className={`${palette.icon} mb-3`} size={24} />
                        <h3 className={`font-bold ${s.title}`}>{useT().cardPhil}</h3>
                        <p className={`text-xs ${s.muted} mt-1`}>{useT().cardPhilDesc}</p>
                     </div>
                </BentoItem>
            );
        case 'body':
            return (
                 <BentoItem 
                    key={widget.id} 
                    widget={widget} 
                    index={index}
                    onMove={handleMove} 
                    className={`flex flex-col justify-center ${getCardStyle(true)} hover:bg-black/5`}
                    theme={theme}
                >
                     <div className="p-6 pointer-events-none">
                        <Heart className={`${palette.icon} mb-3`} size={24} />
                        <h3 className={`font-bold ${s.title}`}>{useT().cardBody}</h3>
                        <p className={`text-xs ${s.muted} mt-1`}>{useT().cardBodyDesc}</p>
                     </div>
                </BentoItem>
            );
        default:
            return null;
    }
  };

  return (
    <section className={`min-h-screen pt-24 pb-12 px-6 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${s.bg}`}>
        
        {/* Ambient Glow */}
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${s.glow1} rounded-full blur-[120px] -z-10 pointer-events-none transition-colors duration-500`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${s.glow2} rounded-full blur-[100px] -z-10 pointer-events-none transition-colors duration-500`} />

        {/* Text Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-5xl md:text-7xl font-bold mb-4 tracking-tighter ${s.title} ${s.font}`}
            >
                {useT().heroTitle}
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`text-xl font-light ${s.muted}`}
            >
                {language === 'en' ? 'Your Personal Asset Management OS.' : '你的个人资产管理操作系统。'} <br className="md:hidden" />
                <span className={`${s.title} font-medium`}>{useT().heroSubtitle}</span>
            </motion.p>
        </div>

      {/* The Bento Grid - Fixed layout logic using auto-rows for responsiveness without overlap */}
      <motion.div 
        layout
        className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-4 grid-flow-dense"
      >
        <AnimatePresence>
            {widgets.map((widget, i) => renderWidget(widget, i))}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 ${s.muted} text-xs font-mono animate-bounce`}
      >
        SCROLL TO EXPLORE
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'arch' && <ArchitectureModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'roadmap' && <RoadmapModal onClose={() => setActiveModal(null)} />}
      </AnimatePresence>

    </section>
  );
};

export default HeroBento;