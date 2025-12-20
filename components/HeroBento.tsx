import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Battery, Smartphone, Brain, Move, Quote, Layers, Kanban, X, ChevronRight, ChevronLeft, Grip, BookOpen, Heart, Activity, TrendingUp, RefreshCcw, Bell, ShoppingCart, Clock, PieChart, Map, Plane, Ticket, Coffee, Mic, Plus, ArrowDown, Edit2, Save } from 'lucide-react';
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
    case 'cyber': return { accent: 'bg-gradient-to-r from-tahx-secondary to-tahx-accent', icon: 'text-tahx-accent', text: 'text-white', subBg: 'bg-white/5', border: 'border-white/10' };
    case 'panyuliang': return { accent: 'bg-gradient-to-r from-panyuliang-secondary to-panyuliang-accent', icon: 'text-panyuliang-accent', text: 'text-panyuliang-text', subBg: 'bg-white/10', border: 'border-white/10' };
    case 'pancanvas': return { accent: 'bg-gradient-to-r from-pancanvas-secondary to-pancanvas-accent', icon: 'text-pancanvas-accent', text: 'text-pancanvas-text', subBg: 'bg-black/5', border: 'border-black/10' };
    case 'panjade': return { accent: 'bg-gradient-to-r from-panjade-secondary to-panjade-accent', icon: 'text-panjade-accent', text: 'text-panjade-text', subBg: 'bg-black/5', border: 'border-black/10' };
    default: return { accent: 'bg-gray-500', icon: 'text-gray-500', text: 'text-black', subBg: 'bg-gray-100', border: 'border-gray-200' };
  }
};

const playNote = (index: number) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
    const freq = notes[index % notes.length];

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 1);
  } catch (e) {
  }
};

// --- Visualization Components ---

const SimpleRadarChart: React.FC<{ data: number[], labels: string[], theme: string }> = ({ data, labels, theme }) => {
    const isLight = theme === 'pancanvas' || theme === 'panjade';
    const stroke = isLight ? '#000' : '#fff';
    const fill = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
    const size = 100;
    const center = size / 2;
    const radius = size * 0.4;
    
    const points = data.map((val, i) => {
        const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
        const r = (val / 100) * radius;
        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    }).join(' ');

    const axes = labels.map((_, i) => {
        const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
        return {
            x1: center,
            y1: center,
            x2: center + radius * Math.cos(angle),
            y2: center + radius * Math.sin(angle)
        };
    });

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full p-2">
                <polygon points={points} fill={fill} stroke={stroke} strokeWidth="1.5" />
                {axes.map((axis, i) => (
                     <line key={i} x1={axis.x1} y1={axis.y1} x2={axis.x2} y2={axis.y2} stroke={stroke} strokeOpacity="0.1" strokeWidth="0.5" />
                ))}
                <circle cx={center} cy={center} r={radius} fill="none" stroke={stroke} strokeOpacity="0.1" strokeWidth="0.5" />
                <circle cx={center} cy={center} r={radius * 0.6} fill="none" stroke={stroke} strokeOpacity="0.1" strokeWidth="0.5" />
            </svg>
             {labels.map((label, i) => {
                 const style: React.CSSProperties = {};
                 if (i === 0) { style.top = '5%'; style.left = '50%'; style.transform = 'translateX(-50%)'; }
                 else if (i === 1) { style.top = '30%'; style.right = '5%'; }
                 else if (i === 2) { style.bottom = '20%'; style.right = '10%'; }
                 else if (i === 3) { style.bottom = '20%'; style.left = '10%'; }
                 else if (i === 4) { style.top = '30%'; style.left = '5%'; }
                 
                 return (
                     <span key={i} className="absolute text-[8px] font-mono opacity-60 uppercase" style={style}>
                         {label}
                     </span>
                 )
             })}
        </div>
    )
}

// --- Specific Widget Components ---

const EntryWidget: React.FC = () => {
  const { theme, language } = useApp();
  const t = useT();
  const palette = getThemePalette(theme);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setIndex(prev => (prev + 1) % t.aiExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [t.aiExamples]);

  const isLight = theme === 'pancanvas' || theme === 'panjade';

  return (
    <div className="h-full flex flex-col justify-center items-center gap-3 p-4 relative overflow-hidden">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-transform hover:scale-110 ${isLight ? 'bg-gray-100 border-gray-200' : 'bg-white/5 border-white/10'}`}>
            <Smartphone className={palette.icon} size={20} />
        </div>
        <div className="w-full h-16 flex items-center justify-center relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute w-full text-center"
                >
                    <p className={`text-xs md:text-sm italic font-medium opacity-80 ${palette.text}`}>"{t.aiExamples[index]}"</p>
                </motion.div>
            </AnimatePresence>
        </div>
        <p className={`text-[10px] uppercase tracking-widest opacity-50 absolute bottom-4 ${palette.text}`}>{t.cardEntryDesc}</p>
    </div>
  );
};

const LifeFuelWidget: React.FC<{ theme: string }> = ({ theme }) => {
    // Mock Data: 65% consumed
    const percentage = 65;
    
    // Color Logic based on "Life Fuel" concept
    // < 50% = Teal (Calm), > 50% & < 80% = Amber (Warning), > 80% = Red (Danger)
    let colorStart, colorEnd;
    if (percentage < 50) {
        colorStart = '#20c997'; colorEnd = '#0dcaf0';
    } else if (percentage < 80) {
        colorStart = '#ffc107'; colorEnd = '#fd7e14';
    } else {
        colorStart = '#dc3545'; colorEnd = '#6610f2';
    }

    return (
        <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center">
             {/* Liquid Wave Effect */}
             <div className="absolute inset-0 z-0">
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute -left-[50%] -bottom-[140%] w-[200%] h-[200%] rounded-[40%] opacity-40"
                    style={{ background: colorStart, bottom: `-${200 - percentage * 1.5}%` }}
                 />
                 <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="absolute -left-[50%] -bottom-[140%] w-[200%] h-[200%] rounded-[45%] opacity-30"
                    style={{ background: colorEnd, bottom: `-${205 - percentage * 1.5}%` }}
                 />
             </div>
             
             {/* Content */}
             <div className="relative z-10 text-center">
                 <span className="text-3xl font-bold block drop-shadow-md">{percentage}%</span>
                 <span className="text-[9px] uppercase tracking-widest opacity-70 drop-shadow-md">Daily Fuel Burned</span>
             </div>
        </div>
    );
};

const BudgetHorizon: React.FC<{ theme: string }> = ({ theme }) => {
    const isLight = theme === 'pancanvas' || theme === 'panjade';
    const trackColor = isLight ? 'bg-black/10' : 'bg-white/10';
    
    return (
        <div className="w-full h-full flex flex-col justify-center gap-2">
            <div className="flex justify-between text-[10px] opacity-60 font-mono">
                <span>Spent: $1,240</span>
                <span>Limit: $2,000</span>
            </div>
            <div className={`w-full h-1 relative ${trackColor} rounded-full overflow-hidden`}>
                {/* Glow Effect */}
                <div className="absolute top-0 left-0 h-full w-[62%] bg-gradient-to-r from-blue-400 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </div>
            <div className="text-[9px] text-right opacity-50 italic">
                Horizon: 12 days left
            </div>
        </div>
    );
};

const AssetBubbleUniverse: React.FC<{ theme: string }> = ({ theme }) => {
    // Mock Bubbles: Size = Value, Solid = Entity, Transparent = Virtual
    const bubbles = [
        { id: 1, label: 'Camera', size: 60, type: 'entity', color: 'bg-blue-500', x: '10%', y: '10%' },
        { id: 2, label: 'Steam', size: 40, type: 'virtual', color: 'bg-purple-500', x: '60%', y: '20%' },
        { id: 3, label: 'Coffee', size: 30, type: 'entity', color: 'bg-amber-700', x: '30%', y: '60%' },
        { id: 4, label: 'Crypto', size: 50, type: 'virtual', color: 'bg-green-500', x: '70%', y: '60%' },
    ];

    return (
        <div className="w-full h-full relative overflow-hidden">
            {bubbles.map(b => (
                <motion.div
                    key={b.id}
                    className={`absolute rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-lg backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform ${b.color} ${b.type === 'virtual' ? 'bg-opacity-30 border border-white/20' : ''}`}
                    style={{ 
                        width: b.size, 
                        height: b.size, 
                        left: b.x, 
                        top: b.y 
                    }}
                    animate={{ 
                        y: [0, -5, 0],
                        x: [0, 2, 0]
                    }}
                    transition={{ 
                        duration: 3 + Math.random() * 2, 
                        repeat: Infinity,
                        delay: Math.random() 
                    }}
                >
                    {b.label}
                </motion.div>
            ))}
        </div>
    );
};

const HabitHeatmap: React.FC<{ theme: string }> = ({ theme }) => {
    const isLight = theme === 'pancanvas' || theme === 'panjade';
    const activeColor = isLight ? 'bg-black' : 'bg-white';
    const inactiveColor = isLight ? 'bg-black/5' : 'bg-white/5';
    
    // Mock Heatmap Data (4 weeks x 7 days)
    // 0 = inactive, 1 = low, 2 = high
    const data = Array.from({ length: 28 }, () => Math.random() > 0.6 ? (Math.random() > 0.5 ? 2 : 1) : 0);

    return (
        <div className="w-full h-full flex flex-col justify-center gap-1">
             <div className="flex justify-between items-end mb-1">
                 <span className="text-[10px] font-bold">Fender Stratocaster</span>
                 <span className="text-[8px] opacity-50">Usage: Low</span>
             </div>
             <div className="grid grid-cols-7 gap-1.5">
                 {data.map((val, i) => (
                     <div 
                        key={i} 
                        className={`w-full pt-[100%] rounded-full transition-all ${val === 0 ? inactiveColor : (val === 1 ? 'bg-green-500/50' : 'bg-green-500')}`}
                        style={{ opacity: val === 0 ? 1 : 0.8 }}
                     />
                 ))}
             </div>
        </div>
    );
};

const TicketWall: React.FC<{ theme: string }> = ({ theme }) => {
    const tickets = [
        { id: 1, title: 'Oppenheimer', date: 'Jul 21', type: 'Movie', color: 'bg-orange-500' },
        { id: 2, title: 'Coldplay', date: 'Jan 24', type: 'Music', color: 'bg-purple-500' },
        { id: 3, title: 'MOMA', date: 'Oct 12', type: 'Art', color: 'bg-blue-500' },
    ];

    return (
        <div className="w-full h-full flex items-center overflow-x-auto gap-[-10px] px-2 scrollbar-hide perspective-[500px]">
            {tickets.map((t, i) => (
                <motion.div 
                    key={t.id}
                    className="flex-shrink-0 w-20 h-28 bg-white text-black rounded-lg shadow-xl border-l-4 relative overflow-hidden flex flex-col"
                    style={{ 
                        borderColor: t.color,
                        zIndex: tickets.length - i,
                        marginRight: -20,
                        rotateY: 10,
                        scale: 0.9 + (i * 0.05)
                    }}
                    whileHover={{ scale: 1.1, zIndex: 50, rotateY: 0, marginRight: 10 }}
                >
                     <div className={`h-1.5 w-full ${t.color}`} />
                     <div className="p-2 flex-1 flex flex-col">
                         <span className="text-[8px] uppercase opacity-50 border-b border-black/10 pb-1 mb-1">{t.type}</span>
                         <span className="font-bold text-[10px] leading-tight">{t.title}</span>
                         <span className="mt-auto text-[8px] opacity-60">{t.date}</span>
                     </div>
                     {/* Perforation */}
                     <div className="absolute -left-1 top-1/2 w-2 h-2 bg-black rounded-full" />
                     <div className="absolute -right-1 top-1/2 w-2 h-2 bg-black rounded-full" />
                </motion.div>
            ))}
        </div>
    );
};

const LifeRadarWidget: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const { theme } = useApp();
    const t = useT();
    const palette = getThemePalette(theme);
    
    // Mock Data
    const data = [80, 60, 90, 40, 70]; 
    const labels = ["Body", "Mind", "Soul", "Wealth", "System"];

    return (
        <div onClick={onClick} className="h-full flex flex-col p-4 cursor-pointer hover:bg-black/5 transition-colors">
            <div className="flex justify-between items-center mb-2 pointer-events-none">
                <div className="flex items-center gap-2">
                    <Activity size={16} className={palette.icon} />
                    <span className={`text-xs font-bold ${palette.text}`}>{t.cardBody}</span>
                </div>
            </div>
            <div className="flex-1 pointer-events-none">
                <SimpleRadarChart data={data} labels={labels} theme={theme} />
            </div>
        </div>
    )
};

const NegativeOneScreenList: React.FC = () => {
    const { theme } = useApp();
    const palette = getThemePalette(theme);
    const isLight = theme === 'pancanvas' || theme === 'panjade';
    
    // Sub-widget component helper
    const SubWidget: React.FC<{ title: string; size: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, size, children, icon }) => (
        <div className={`rounded-xl border p-3 flex flex-col overflow-hidden relative ${size} ${palette.subBg} ${palette.border}`}>
            <div className="flex justify-between items-center mb-2 opacity-60 z-10">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${palette.text}`}>{title}</span>
                {icon && React.cloneElement(icon as any, { size: 12, className: palette.text })}
            </div>
            <div className={`flex-1 flex flex-col justify-center relative z-0 ${palette.text}`}>
                {children}
            </div>
        </div>
    );

    return (
        <div className="w-full h-full overflow-y-auto overflow-x-hidden p-4 scrollbar-hide relative">
            <div className="grid grid-cols-4 auto-rows-[80px] gap-2 pb-8">
                
                {/* 1. Life Fuel (Liquid Wave) */}
                <SubWidget title="Life Fuel" size="col-span-2 row-span-2" icon={<Battery />}>
                    <LifeFuelWidget theme={theme} />
                </SubWidget>

                {/* 2. Budget Horizon */}
                <SubWidget title="Budget Horizon" size="col-span-2 row-span-1" icon={<TrendingUp />}>
                    <BudgetHorizon theme={theme} />
                </SubWidget>

                {/* 3. Major Expense Ticker */}
                <SubWidget title="Pain Points" size="col-span-2 row-span-1" icon={<ArrowDown />}>
                    <div className="flex items-center h-full overflow-hidden">
                        <motion.div 
                            animate={{ x: ["100%", "-100%"] }} 
                            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                            className="whitespace-nowrap flex gap-4 text-xs font-bold text-red-500"
                        >
                             <span>Apple Watch -$399</span>
                             <span>•</span>
                             <span>Car Repair -$800</span>
                             <span>•</span>
                             <span>Flight -$450</span>
                        </motion.div>
                    </div>
                </SubWidget>

                {/* 4. Asset Bubble Universe */}
                <SubWidget title="Asset Universe" size="col-span-2 row-span-2" icon={<PieChart />}>
                    <AssetBubbleUniverse theme={theme} />
                </SubWidget>

                {/* 5. Habit Heatmap */}
                <SubWidget title="Habit Tracker" size="col-span-2 row-span-2" icon={<Brain />}>
                    <HabitHeatmap theme={theme} />
                </SubWidget>

                {/* 6. Ticket Wall */}
                <SubWidget title="Memory Lane" size="col-span-4 row-span-2" icon={<Ticket />}>
                    <TicketWall theme={theme} />
                </SubWidget>

            </div>
            
            {/* Fade at bottom to indicate scroll */}
            <div className={`absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t pointer-events-none ${isLight ? 'from-white via-white/80 to-transparent' : 'from-black via-black/80 to-transparent'}`} />
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
      dragSnapToOrigin={true}
      whileDrag={{ scale: 1.02, opacity: 0.95, zIndex: 100, cursor: 'grabbing' }}
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

const DimensionModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { theme } = useApp();
    const isLight = theme === 'pancanvas' || theme === 'panjade';
    const bg = isLight ? 'bg-white' : 'bg-[#1a1a1a]';
    const text = isLight ? 'text-black' : 'text-white';
    const palette = getThemePalette(theme);

    const data = [80, 60, 90, 40, 70]; 
    const labels = ["Body", "Mind", "Soul", "Wealth", "System"];
    const descriptions = [
        "Physical Health, Energy, Appearance",
        "Knowledge, Skills, Career Capital",
        "Emotions, Experiences, Relationships",
        "Liquidity, Investments, Net Worth",
        "Infrastructure, Digital Assets, Tools"
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
             <div className={`relative w-full max-w-2xl h-[500px] ${bg} rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row`}>
                <button onClick={onClose} className={`absolute top-4 right-4 z-20 hover:opacity-100 opacity-50 ${text}`}><X /></button>
                
                {/* Left: Chart */}
                <div className={`w-full md:w-1/2 p-8 flex flex-col items-center justify-center ${isLight ? 'bg-gray-50' : 'bg-black/20'}`}>
                    <h3 className={`text-xl font-bold mb-6 ${text}`}>Life Dimensions</h3>
                    <div className="w-64 h-64">
                         <SimpleRadarChart data={data} labels={labels} theme={theme} />
                    </div>
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                    <h4 className={`text-sm uppercase tracking-widest opacity-50 mb-4 ${text}`}>Status Report</h4>
                    <div className="space-y-4">
                        {labels.map((label, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                    <span className={`font-bold ${text}`}>{label}</span>
                                    <span className={`font-mono ${text}`}>{data[i]}%</span>
                                </div>
                                <div className={`w-full h-1.5 rounded-full ${isLight ? 'bg-black/10' : 'bg-white/10'}`}>
                                    <div className={`h-full rounded-full ${palette.accent}`} style={{ width: `${data[i]}%` }} />
                                </div>
                                <p className={`text-[10px] opacity-60 ${text}`}>{descriptions[i]}</p>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
        </motion.div>
    );
};

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
    const borderColor = isLight ? 'border-gray-200' : 'border-white/10';

    const [isEditing, setIsEditing] = useState(false);
    
    // State for columns
    const [columns, setColumns] = useState<{id: string, name: string, color: string, items: {id: string, content: string}[]}[]>([]);

    useEffect(() => {
        // Initialize
         setColumns([
            { 
                id: 'todo', 
                name: t.roadmapCol1, 
                color: "border-red-500", 
                items: [t.roadmapItem1, t.roadmapItem2, t.roadmapItem3].map((content, i) => ({ id: `c1-${i}-${Date.now()}`, content })) 
            },
            { 
                id: 'doing', 
                name: t.roadmapCol2, 
                color: "border-yellow-500", 
                items: [t.roadmapItem4, t.roadmapItem5, t.roadmapItem6].map((content, i) => ({ id: `c2-${i}-${Date.now()}`, content }))
            },
            { 
                id: 'done', 
                name: t.roadmapCol3, 
                color: "border-green-500", 
                items: [t.roadmapItem7, t.roadmapItem8, t.roadmapItem9].map((content, i) => ({ id: `c3-${i}-${Date.now()}`, content }))
            }
        ]);
    }, []); // Only on mount to preserve edits during session

    // Drag and Drop Logic
    const [draggedItem, setDraggedItem] = useState<{ colIndex: number, itemIndex: number } | null>(null);

    const handleDragStart = (colIndex: number, itemIndex: number) => {
        setDraggedItem({ colIndex, itemIndex });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (targetColIndex: number) => {
        if (!draggedItem) return;
        const { colIndex: sourceColIndex, itemIndex: sourceItemIndex } = draggedItem;

        if (sourceColIndex === targetColIndex) return;

        const newCols = [...columns];
        const [movedItem] = newCols[sourceColIndex].items.splice(sourceItemIndex, 1);
        newCols[targetColIndex].items.push(movedItem);
        
        setColumns(newCols);
        setDraggedItem(null);
    };

    const updateItemContent = (colIndex: number, itemIndex: number, newContent: string) => {
        const newCols = [...columns];
        newCols[colIndex].items[itemIndex].content = newContent;
        setColumns(newCols);
    };

    const addItem = (colIndex: number) => {
        const newCols = [...columns];
        newCols[colIndex].items.push({ id: `new-${Date.now()}`, content: "New Item" });
        setColumns(newCols);
    };

    const deleteItem = (colIndex: number, itemIndex: number) => {
        const newCols = [...columns];
        newCols[colIndex].items.splice(itemIndex, 1);
        setColumns(newCols);
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
             <div className={`relative w-full max-w-4xl h-[600px] ${bg} rounded-xl shadow-2xl overflow-hidden flex flex-col`}>
                <div className={`p-6 border-b flex justify-between items-center ${borderColor}`}>
                    <h3 className={`text-xl font-bold flex items-center gap-2 ${text}`}><Kanban size={20}/> {t.roadmapTitle}</h3>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className={`p-2 rounded-full transition-colors ${isLight ? 'hover:bg-black/5' : 'hover:bg-white/10'} ${text}`}
                            title={isEditing ? "Save" : "Edit"}
                        >
                            {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
                        </button>
                        <button onClick={onClose} className={`${text} opacity-50 hover:opacity-100 p-2`}><X size={20} /></button>
                    </div>
                </div>
                <div className="flex-1 overflow-x-auto p-6 flex gap-4">
                    {columns.map((col, colIndex) => (
                        <div 
                            key={col.id} 
                            className={`min-w-[280px] ${colBg} rounded-lg p-4 flex flex-col gap-3 h-full transition-colors ${isEditing ? 'border-2 border-dashed border-transparent hover:border-blue-500/30' : ''}`}
                            onDragOver={isEditing ? handleDragOver : undefined}
                            onDrop={isEditing ? () => handleDrop(colIndex) : undefined}
                        >
                            <div className={`border-b-2 ${col.color} pb-2 font-bold ${text} text-sm uppercase tracking-wider flex justify-between`}>
                                {col.name}
                                <span className="opacity-40 text-xs">{col.items.length}</span>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 overflow-y-auto min-h-[50px]">
                                {col.items.map((item, itemIndex) => (
                                    <motion.div 
                                        layout
                                        key={item.id} 
                                        draggable={isEditing}
                                        onDragStart={() => handleDragStart(colIndex, itemIndex)}
                                        className={`p-3 rounded border text-sm transition-colors group relative ${isLight ? 'bg-white border-gray-200 text-gray-800' : 'bg-white/5 border-white/5 text-white/80'} ${isEditing ? 'cursor-grab active:cursor-grabbing hover:shadow-md' : 'cursor-default'}`}
                                    >
                                        {isEditing ? (
                                            <>
                                                <textarea 
                                                    value={item.content}
                                                    onChange={(e) => updateItemContent(colIndex, itemIndex, e.target.value)}
                                                    className="w-full bg-transparent resize-none outline-none min-h-[40px]"
                                                />
                                                <button 
                                                    onClick={() => deleteItem(colIndex, itemIndex)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </>
                                        ) : (
                                            item.content
                                        )}
                                    </motion.div>
                                ))}
                                {isEditing && (
                                    <button 
                                        onClick={() => addItem(colIndex)}
                                        className={`p-2 rounded border border-dashed flex items-center justify-center gap-2 text-xs opacity-50 hover:opacity-100 ${isLight ? 'border-black/20 text-black' : 'border-white/20 text-white'}`}
                                    >
                                        <Plus size={14} /> Add Item
                                    </button>
                                )}
                            </div>
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
  const [activeModal, setActiveModal] = useState<'arch' | 'roadmap' | 'dimension' | null>(null);

  // Widget Configuration State - Removed 'entry' widget
  const [widgets, setWidgets] = useState<WidgetConfig[]>([
    { id: 'main', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
    { id: 'entry', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { id: 'body', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { id: 'quote', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-1' },
    { id: 'arch', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { id: 'roadmap', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { id: 'philosophy', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { id: 'battery', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
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
                    <NegativeOneScreenList />
                </BentoItem>
            );
        case 'entry':
            return (
                 <BentoItem key={widget.id} widget={widget} index={index} onMove={handleMove} className={`${getCardStyle(true)}`} theme={theme}>
                    <EntryWidget />
                </BentoItem>
            );
        case 'body':
             return (
                 <BentoItem key={widget.id} widget={widget} index={index} onMove={handleMove} onClick={() => setActiveModal('dimension')} className={`${getCardStyle(true)}`} theme={theme}>
                    <LifeRadarWidget onClick={() => setActiveModal('dimension')} />
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
        case 'battery':
             // Simple Clock/Date Widget
             return (
                 <BentoItem key={widget.id} widget={widget} index={index} onMove={handleMove} className={`flex flex-col justify-center ${getCardStyle()} hover:bg-black/5`} theme={theme}>
                    <div className="p-6 text-center pointer-events-none">
                        <span className={`text-4xl font-bold font-mono ${s.title}`}>{new Date().getDate()}</span>
                        <span className={`text-xs block uppercase tracking-widest ${s.muted}`}>{new Date().toLocaleString('default', { month: 'short' })}</span>
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
        {activeModal === 'dimension' && <DimensionModal onClose={() => setActiveModal(null)} />}
      </AnimatePresence>

    </section>
  );
};

export default HeroBento;