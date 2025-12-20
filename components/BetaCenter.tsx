import React from 'react';
import { Terminal, Download, Github } from 'lucide-react';
import { useApp, useT } from '../context';

const BetaCenter: React.FC = () => {
  const { theme } = useApp();
  const t = useT();

  const getStyles = () => {
    switch (theme) {
      case 'cyber': return { bg: 'bg-tahx-bg border-tahx-border', text: 'text-white', muted: 'text-tahx-muted', termBg: 'bg-[#111]', termBorder: 'border-tahx-border', termText: 'text-tahx-muted' };
      case 'panyuliang': return { bg: 'bg-panyuliang-bg border-panyuliang-border', text: 'text-panyuliang-text', muted: 'text-panyuliang-muted', termBg: 'bg-[#211b2b]', termBorder: 'border-panyuliang-border', termText: 'text-panyuliang-muted' };
      case 'pancanvas': return { bg: 'bg-pancanvas-bg border-pancanvas-border', text: 'text-pancanvas-text', muted: 'text-pancanvas-muted', termBg: 'bg-white', termBorder: 'border-pancanvas-border', termText: 'text-pancanvas-text' };
      case 'panjade': return { bg: 'bg-panjade-bg border-panjade-border', text: 'text-panjade-text', muted: 'text-panjade-muted', termBg: 'bg-white', termBorder: 'border-panjade-border', termText: 'text-panjade-text' };
      default: return { bg: 'bg-black border-white/10', text: 'text-white', muted: 'text-gray-500', termBg: 'bg-black', termBorder: 'border-white/10', termText: 'text-gray-500' };
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

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors w-full md:w-auto">
                <Download size={20} />
                <span>{t.betaBtnDown}</span>
            </button>
            <button className={`flex items-center gap-3 px-8 py-4 rounded-lg font-medium transition-colors w-full md:w-auto border ${isLight ? 'bg-white/50 border-black/10 text-black hover:bg-white' : 'glass-panel border-white/10 text-white hover:bg-white/5'}`}>
                <Github size={20} />
                <span>{t.betaBtnSource}</span>
            </button>
        </div>

        <div className={`mt-16 p-6 rounded-xl border font-mono text-left text-sm overflow-x-auto ${s.termBg} ${s.termBorder} ${s.termText}`}>
            <div className={`flex gap-2 mb-4 border-b pb-2 ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                <Terminal size={16} />
                <span>{t.betaLogFile}</span>
            </div>
            <p className="text-green-500">$ {t.betaLog1}</p>
            <p>{t.betaLog2}</p>
            <p className="text-yellow-500">{t.betaLog3}</p>
            <p className="text-green-500">{t.betaLog4}</p>
            <p className="animate-pulse">_</p>
        </div>
      </div>
    </section>
  );
};

export default BetaCenter;