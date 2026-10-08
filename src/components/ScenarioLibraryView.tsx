import React from 'react';
import { PRESET_SCENARIOS } from '../data/presetScenarios';
import { ScamScenarioPreset, RiskLevel } from '../types/scamshield';
import { Compass, ArrowRight, ShieldCheck, ShieldAlert, AlertTriangle, ShieldX } from 'lucide-react';

interface ScenarioLibraryViewProps {
  onSelectScenario: (scenario: ScamScenarioPreset) => void;
}

export const ScenarioLibraryView: React.FC<ScenarioLibraryViewProps> = ({
  onSelectScenario,
}) => {
  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/80';
      case 'HIGH':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/80';
      case 'MEDIUM':
        return 'text-yellow-400 bg-yellow-950/60 border-yellow-800/80';
      case 'LOW':
      default:
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Scam & Threat Scenario Library
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore realistic threat vectors curated to test the ScamShield multi-engine detection pipeline.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRESET_SCENARIOS.map((scen) => (
          <div
            key={scen.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${getRiskBadge(scen.riskLevel)}`}>
                  {scen.riskLevel} RISK
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {scen.channel}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                {scen.title}
              </h3>

              <div className="text-xs text-slate-400 mt-1 mb-3">
                <span>Category: </span>
                <strong className="text-slate-300 font-medium">{scen.category}</strong>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                {scen.description}
              </p>

              {/* Message text preview */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                {scen.messageText}
              </div>
            </div>

            <button
              onClick={() => onSelectScenario(scen)}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg border border-slate-700 hover:border-blue-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Load into Scanner & Analyze</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
