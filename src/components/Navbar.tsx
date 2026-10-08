import React from 'react';
import { ShieldAlert, AlertTriangle, Globe, Compass, FileText, Sliders } from 'lucide-react';

interface NavbarProps {
  activeTab: 'scanner' | 'scenarios' | 'url-sandbox' | 'emergency' | 'architecture' | 'presentation';
  setActiveTab: (tab: 'scanner' | 'scenarios' | 'url-sandbox' | 'emergency' | 'architecture' | 'presentation') => void;
  onReset: () => void;
  hasAssessment: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onReset,
  hasAssessment,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <button
              onClick={() => { setActiveTab('scanner'); }}
              className="text-left group cursor-pointer"
            >
              <div className="text-base font-semibold tracking-tight text-white flex items-center gap-2">
                <span>ScamShield AI</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">v3.8</span>
              </div>
              <div className="text-xs text-slate-400 hidden sm:block">
                Digital Safety & Multi-Engine Scam Detection
              </div>
            </button>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'scanner'
                ? 'bg-slate-800 text-white font-semibold'
                : 'hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Detector & Scanner
          </button>
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'scenarios'
                ? 'bg-slate-800 text-white font-semibold'
                : 'hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Test Scenarios</span>
          </button>
          <button
            onClick={() => setActiveTab('url-sandbox')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'url-sandbox'
                ? 'bg-slate-800 text-white font-semibold'
                : 'hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>URL Sandbox</span>
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'emergency'
                ? 'bg-rose-950/50 text-rose-300 border border-rose-900/50 font-semibold'
                : 'text-rose-400 hover:text-rose-300 hover:bg-rose-950/30'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Emergency Playbook</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'bg-slate-800 text-white font-semibold'
                : 'hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>15 Engines</span>
          </button>
          <button
            onClick={() => setActiveTab('presentation')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'presentation'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'hover:text-slate-200 hover:bg-slate-900 text-blue-400'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Deck (6 Slides)</span>
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5">
          {hasAssessment && (
            <button
              onClick={onReset}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              New Scan
            </button>
          )}
          <button
            onClick={() => setActiveTab('emergency')}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm shadow-rose-950 flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Compromised?</span>
          </button>
        </div>
      </div>
    </header>
  );
};
