
import React from 'react';
import NavBar from './components/NavBar.jsx';
import HeroBento from './components/HeroBento.jsx';
import PhilosophyModal from './components/Philosophy.jsx';
import BetaCenter from './components/BetaCenter.jsx';
import BetaModal from './components/BetaModal.jsx';
import AIChatBot from './components/AIChatBot.jsx';
import FloatingOrb from './components/FloatingOrb.jsx';
import { AppProvider } from './context.jsx';

const Footer: React.FC = () => (
  <footer className="py-12 bg-black border-t border-white/10 text-center text-gray-500 text-sm">
    <div className="flex justify-center gap-6 mb-4">
        <a href="#" className="hover:text-white">Twitter</a>
        <a href="#" className="hover:text-white">Discord</a>
        <a href="#" className="hover:text-white">Email</a>
    </div>
    <p>&copy; {new Date().getFullYear()} Tahx Labs. Manage Assets, Not Just Expenses.</p>
  </footer>
);

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen text-tahx-text font-sans selection:bg-tahx-accent selection:text-black">
      <NavBar />
      <main>
        <HeroBento />
        <BetaCenter />
      </main>
      <Footer />
      <PhilosophyModal />
      <BetaModal />
      <AIChatBot />
      <FloatingOrb />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
