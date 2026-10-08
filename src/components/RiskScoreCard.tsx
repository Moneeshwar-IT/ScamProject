import React from 'react';
import { RiskLevel } from '../types/scamshield';
import { ShieldCheck, ShieldAlert, AlertTriangle, ShieldX, Clock, Cpu } from 'lucide-react';

interface RiskScoreCardProps {
  riskScore: number;
  riskLevel: RiskLevel;
  scamCategory: string;
  secondaryCategory?: string;
  communicationType: string;
  confidence: number;
  durationMs: number;
  model: string;
}

export const RiskScoreCard: React.FC<RiskScoreCardProps> = ({
  riskScore,
  riskLevel,
  scamCategory,
  secondaryCategory,
  communicationType,
  confidence,
  durationMs,
  model,
}) => {
  const getRiskTheme = () => {
    switch (riskLevel) {
      case 'CRITICAL':
        return {
          border: 'border-rose-600/60',
          bg: 'bg-rose-950/20',
          text: 'text-rose-400',
          subtext: 'text-rose-200',
          badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
          icon: ShieldX,
          label: 'CRITICAL THREAT DETECTED',
          description: 'High-probability fraudulent attack targeting funds, credentials, or authentication tokens.',
        };
      case 'HIGH':
        return {
          border: 'border-amber-600/60',
          bg: 'bg-amber-950/20',
          text: 'text-amber-400',
          subtext: 'text-amber-200',
          badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          icon: AlertTriangle,
          label: 'HIGH RISK DETECTED',
          description: 'Multiple strong indicators of phishing, psychological coercion, or brand impersonation present.',
        };
      case 'MEDIUM':
        return {
          border: 'border-yellow-600/50',
          bg: 'bg-yellow-950/20',
          text: 'text-yellow-400',
          subtext: 'text-yellow-200',
          badgeBg: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
          icon: ShieldAlert,
          label: 'SUSPICIOUS / MEDIUM RISK',
          description: 'Suspicious linguistic patterns or unverified sender indicators present; exercise heightened vigilance.',
        };
      case 'LOW':
      default:
        return {
          border: 'border-emerald-600/50',
          bg: 'bg-emerald-950/20',
          text: 'text-emerald-400',
          subtext: 'text-emerald-200',
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          icon: ShieldCheck,
          label: 'LOW EVIDENCE OF FRAUD',
          description: 'Little or no evidence of malicious activity found in the analyzed text body.',
        };
    }
  };

  const theme = getRiskTheme();
  const IconComponent = theme.icon;

  return (
    <div className={`border ${theme.border} ${theme.bg} rounded-xl p-5 sm:p-6 shadow-xl relative overflow-hidden backdrop-blur-sm`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Score & Icon */}
        <div className="flex items-start sm:items-center gap-5">
          <div className={`w-16 h-16 rounded-xl border flex items-center justify-center shrink-0 ${theme.badgeBg}`}>
            <IconComponent className="w-8 h-8" />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-mono font-bold tracking-wider uppercase ${theme.text}`}>
                {theme.label}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">
                Confidence: <strong className="font-mono tabular-nums text-slate-200">{confidence}%</strong>
              </span>
            </div>

            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight tabular-nums text-white">
                {riskScore}
                <span className="text-2xl font-normal text-slate-400">%</span>
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-200">
                  {scamCategory}
                </span>
                {secondaryCategory && (
                  <span className="text-xs text-slate-400">
                    Secondary: {secondaryCategory}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-300 mt-2 max-w-xl leading-relaxed">
              {theme.description}
            </p>
          </div>
        </div>

        {/* Right: Telemetry metadata */}
        <div className="lg:border-l lg:border-slate-800 lg:pl-6 flex flex-wrap lg:flex-col gap-3 justify-between text-xs text-slate-400">
          <div>
            <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Channel Detected</span>
            <span className="font-semibold text-slate-200">{communicationType}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Analysis Engine</span>
            <span className="font-mono text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>{model}</span>
            </span>
          </div>

          <div>
            <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Processing Latency</span>
            <span className="font-mono tabular-nums text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{durationMs}ms (15 Engines)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
