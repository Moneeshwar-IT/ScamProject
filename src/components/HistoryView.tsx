import React from 'react';
import { AnalysisHistoryItem, ScamShieldAssessment } from '../types/scamshield.ts';
import { History, Trash2, ArrowRight, ShieldCheck, ShieldAlert, AlertTriangle, ShieldX, Clock } from 'lucide-react';

interface HistoryViewProps {
  historyItems: AnalysisHistoryItem[];
  onViewResult: (assessment: ScamShieldAssessment) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  onGoToAnalyzer: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  historyItems,
  onViewResult,
  onDeleteItem,
  onClearAll,
  onGoToAnalyzer,
}) => {
  const getBadgeStyle = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-rose-400 bg-rose-950/60 border-rose-800';
      case 'HIGH':
        return 'text-amber-400 bg-amber-950/60 border-amber-800';
      case 'MEDIUM':
        return 'text-yellow-400 bg-yellow-950/60 border-yellow-800';
      case 'LOW':
      default:
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Analysis History
              </h2>
              <p className="text-xs text-slate-400">
                Locally saved message assessments on your browser. Zero sensitive credentials stored.
              </p>
            </div>
          </div>

          {historyItems.length > 0 && (
            <button
              onClick={onClearAll}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-400 border border-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All History</span>
            </button>
          )}
        </div>

        {/* List of items */}
        {historyItems.length > 0 ? (
          <div className="space-y-3.5 pt-5">
            {historyItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors shadow-sm group"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getBadgeStyle(item.riskLevel)}`}>
                      {item.riskLevel} ({item.riskScore}%)
                    </span>
                    <span className="text-xs font-bold text-white truncate">
                      {item.primaryCategory}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-mono line-clamp-2">
                    "{item.messagePreview}"
                  </p>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(item.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onViewResult(item.assessment)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>View Result</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/80 hover:text-rose-300 text-slate-400 border border-slate-700 transition-colors cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-slate-700 mx-auto flex items-center justify-center text-slate-400">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-200">No Previous Analyses Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Whenever you analyze a message, a privacy-safe summary is automatically saved here for your reference.
            </p>
            <button
              onClick={onGoToAnalyzer}
              className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Analyze Your First Message</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
