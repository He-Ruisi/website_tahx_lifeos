
import React, { useState, useEffect } from 'react';
import { Menu, X, Palette, Globe } from 'lucide-react';
import { useApp, useT } from '../context.tsx';
import { AppTheme } from '../types.ts';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme, language, setLanguage, setPhilosophyOpen, setBetaOpen } = useApp();
  const t = useT();

  const getThemeStyles = () => {
    switch (theme) {
      case 'cyber': return { navBg: 'bg-tahx-bg/80 border-tahx-border', text: 'text-tahx-muted', hover: 'group-hover:text-tahx-accent', grad: 'from-tahx-secondary to-tahx-accent' };
      case 'panyuliang': return { navBg: 'bg-panyuliang-bg/80 border-panyuliang-border', text: 'text-panyuliang-muted', hover: 'group-hover:text-panyuliang-accent', grad: 'from-panyuliang-secondary to-panyuliang-accent' };
      case 'pancanvas': return { navBg: 'bg-pancanvas-bg/80 border-pancanvas-border', text: 'text-pancanvas-muted', hover: 'group-hover:text-pancanvas-accent', grad: 'from-pancanvas-secondary to-pancanvas-accent' };
      case 'panjade': return { navBg: 'bg-panjade-bg/80 border-panjade-border', text: 'text-panjade-muted', hover: 'group-hover:text-panjade-accent', grad: 'from-panjade-secondary to-panjade-accent' };
    }
  };

  const s = getThemeStyles();
  const isLight = theme === 'pancanvas' || theme === 'panjade';
  const textColor = isLight ? 'text-black' : 'text-white';

  const cycleTheme = () => {
    const themes: AppTheme[] = ['cyber', 'panyuliang', 'pancanvas', 'panjade'];
    const currentIdx = themes.indexOf(theme);
    setTheme(themes[(currentIdx + 1) % themes.length]);
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'cyber': return 'Cyber';
      case 'panyuliang': return 'Pan Dark';
      case 'pancanvas': return 'Canvas';
      case 'panjade': return 'Jade';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? `py-3 backdrop-blur-md border-b ${s.navBg}` : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono bg-gradient-to-br ${s.grad} ${isLight ? 'text-white' : 'text-black'}`}>
            T
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors ${textColor} ${s.hover}`}>
            {t.heroTitle}
          </span>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${s.text}`}>
           {/* Toggles */}
           <div className={`flex items-center gap-4 border-r pr-6 mr-2 ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                <button 
                  onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                  className={`flex items-center gap-1 ${isLight ? 'hover:text-black' : 'hover:text-white'}`}
                >
                  <Globe size={16} />
                  {language === 'en' ? 'EN' : '中'}
                </button>
                <button 
                  onClick={cycleTheme}
                  className={`flex items-center gap-1 min-w-[80px] ${isLight ? 'hover:text-black' : 'hover:text-white'}`}
                >
                  <Palette size={16} />
                  {getThemeLabel()}
                </button>
           </div>
          
          <button 
            onClick={() => setBetaOpen(true)}
            className={`px-4 py-2 rounded-full border transition-all ${isLight ? 'border-black/20 hover:bg-black/5 text-black' : 'border-white/20 hover:bg-white/5 text-white'}`}
          >
            {t.navBeta}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${textColor}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`absolute top-full left-0 right-0 border-b p-6 md:hidden flex flex-col gap-4 ${isLight ? 'bg-white border-black/10' : 'bg-black/90 border-white/10'}`}>
           <div className="flex gap-4 mb-4">
              <button onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')} className={`border px-3 py-1 rounded ${isLight ? 'border-black/20 text-black' : 'border-white/20 text-white'}`}>
                 {language === 'en' ? 'English' : '中文'}
              </button>
              <button onClick={cycleTheme} className={`border px-3 py-1 rounded ${isLight ? 'border-black/20 text-black' : 'border-white/20 text-white'}`}>
                 {getThemeLabel()}
              </button>
           </div>
          <button 
            onClick={() => {
                setBetaOpen(true);
                setIsMenuOpen(false);
            }} 
            className={`font-medium text-left ${isLight ? 'text-black' : 'text-white'}`}
          >
            {t.navBeta}
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
