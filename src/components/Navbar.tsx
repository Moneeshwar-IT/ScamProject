import React from 'react';
import { ShieldAlert, History, Search, Home, Sliders } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'analyze' | 'history' | 'presentation';
  setActiveTab: (tab: 'home' | 'analyze' | 'history' | 'presentation') => void;
  onNewAnalysis: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNewAnalysis,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>SCAMSHIELD AI</span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Digital Safety & Scam Detection
              </div>
            </div>
          </button>
        </div>

        {/* Main Navigation Links: Home | Analyze | History (+ Deck) */}
        <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold text-slate-400">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'bg-slate-800 text-white font-bold'
                : 'hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Home className="w-4 h-4 hidden sm:inline" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('analyze')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'analyze'
                ? 'bg-slate-800 text-white font-bold'
                : 'hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Search className="w-4 h-4 hidden sm:inline" />
            <span>Analyze</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-slate-800 text-white font-bold'
                : 'hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <History className="w-4 h-4 hidden sm:inline" />
            <span>History</span>
          </button>

          <button
            onClick={() => setActiveTab('presentation')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs font-mono ${
              activeTab === 'presentation'
                ? 'bg-blue-600 text-white font-bold'
                : 'hover:text-slate-200 hover:bg-slate-900 text-slate-400'
            }`}
            title="6-Slide Project Presentation Deck"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Project Deck</span>
          </button>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onNewAnalysis}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-md shadow-blue-950 flex items-center gap-1.5"
          >
            <span>+ Analyze</span>
          </button>
        </div>
      </div>
    </header>
  );
};
