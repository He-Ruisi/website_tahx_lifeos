
import React from 'react';
import { Download } from 'lucide-react';
import { useApp, useT } from '../context.tsx';

const BetaCenter: React.FC = () => {
  const { theme } = useApp();
  const t = useT();

  const getStyles = () => {
    switch (theme) {
      case 'cyber': return { bg: 'bg-tahx-bg border-tahx-border', text: 'text-white', muted: 'text-tahx-muted' };
      case 'panyuliang': return { bg: 'bg-panyuliang-bg border-panyuliang-border', text: 'text-panyuliang-text', muted: 'text-panyuliang-muted' };
      case 'pancanvas': return { bg: 'bg-pancanvas-bg border-pancanvas-border', text: 'text-pancanvas-text', muted: 'text-pancanvas-muted' };
      case 'panjade': return { bg: 'bg-panjade-bg border-panjade-border', text: 'text-panjade-text', muted: 'text-panjade-muted' };
      default: return { bg: 'bg-black border-white/10', text: 'text-white', muted: 'text-gray-500' };
    }
  };

  const s = getStyles();
  const isLight = theme === 'pancanvas' || theme === 'panjade';

  return (
    <section id="beta" className={`py-24 px-6 border-t relative overflow-hidden transition-colors duration-500 ${s.bg}`}>
        {/* Matrix-like background effect */}
        <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none ${isLight ? 'opacity-5' : 'opacity-20'}`}></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            CONFIDENTIAL // BETA LAB
        </div>

        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${s.text} ${theme === 'cyber' ? 'font-mono' : 'font-serif'}`}>
            {t.betaTitle}
        </h2>
        <p className={`max-w-lg mx-auto mb-10 ${s.muted}`}>
            {t.betaDesc}
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
            <a 
              href="/tahx-latest.apk" 
              download 
              className="flex items-center gap-3 px-12 py-4 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 w-full md:w-auto shadow-xl"
            >
                <Download size={20} />
                <span>{t.betaBtnDown}</span>
            </a>
            <p className={`text-[10px] font-mono mt-4 opacity-40 ${s.text}`}>
              v0.1.2-alpha // build_20240520
            </p>
        </div>
      </div>
    </section>
  );
};

export default BetaCenter;
