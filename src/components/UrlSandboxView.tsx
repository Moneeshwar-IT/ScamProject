import React, { useState } from 'react';
import { UrlRiskAnalysis, RiskLevel } from '../types/scamshield';
import { analyzeUrlStatic } from '../services/heuristicScamEngine';
import { ShieldCheck, ShieldAlert, AlertTriangle, ShieldX, Globe, ArrowRight, Lock, CheckCircle2, XCircle } from 'lucide-react';

interface UrlSandboxViewProps {
  initialUrl?: string;
}

export const UrlSandboxView: React.FC<UrlSandboxViewProps> = ({ initialUrl = '' }) => {
  const [urlInput, setUrlInput] = useState<string>(initialUrl);
  const [result, setResult] = useState<UrlRiskAnalysis | null>(() => {
    if (initialUrl) return analyzeUrlStatic(initialUrl);
    return null;
  });

  const handleInspect = (targetUrl?: string) => {
    const toCheck = targetUrl || urlInput;
    if (!toCheck.trim()) return;
    const res = analyzeUrlStatic(toCheck.trim());
    setResult(res);
  };

  const getSeverityBadge = (level: RiskLevel) => {
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

  const sampleUrls = [
    'https://chase-security-restore-auth99.com/verify?id=9201',
    'https://usps-track-parcel-portal.top/redeliver',
    'https://irs-direct-deposit-portal.org/refund-claim',
    'https://bit.ly/claim-amazon-prize-now',
    'https://192.168.1.1/admin/login',
    'https://www.chase.com/personal/banking'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Static URL Risk Sandbox (Engine 07)
            </h2>
            <p className="text-xs text-slate-400">
              Safe, non-interactive URL structure analysis. Never connects to, executes, or downloads content from the target host.
            </p>
          </div>
        </div>

        {/* Input box */}
        <div className="mt-5 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter suspicious URL or domain (e.g. chase-security-restore-auth99.com/verify)..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
            />
            <button
              onClick={() => handleInspect()}
              className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 shadow-lg shadow-cyan-950/40"
            >
              <span>Inspect URL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sample quick test links */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 pt-1">
            <span className="text-slate-500">Test Samples:</span>
            {sampleUrls.map((sUrl, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setUrlInput(sUrl);
                  handleInspect(sUrl);
                }}
                className="px-2 py-0.5 rounded bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px] truncate max-w-xs transition-colors cursor-pointer"
              >
                {sUrl.replace('https://', '')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inspection Results */}
      {result && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono uppercase text-slate-500">Evaluated Hostname</div>
              <div className="text-lg font-bold font-mono text-cyan-300 mt-0.5 break-all">
                {result.domain}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-mono break-all">
                Full URL: {result.url}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Risk Assessment:</span>
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded border ${getSeverityBadge(result.riskLevel)}`}>
                {result.riskLevel}
              </span>
            </div>
          </div>

          {/* Detected indicators */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-2">Structural Red Flags:</h4>
            {result.suspiciousIndicators.length > 0 ? (
              <div className="space-y-2">
                {result.suspiciousIndicators.map((ind, idx) => (
                  <div key={idx} className="bg-rose-950/20 border border-rose-800/40 rounded-lg p-3 text-xs text-rose-200 flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{ind}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-lg p-3 text-xs text-emerald-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>No common deceptive structures (typosquatting, URL shortening, excessive subdomains) detected in URL syntax.</span>
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-slate-200 block mb-1">Analysis Rationale:</span>
            {result.explanation}
          </div>

          {/* Safety rule reminder */}
          <div className="bg-amber-950/20 border border-amber-900/40 rounded-lg p-4 text-xs text-amber-200 flex items-start gap-3">
            <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Golden Safety Rule:</span>
              <p className="text-slate-300">
                Never click links sent in SMS or unsolicited messages to resolve account issues. Open your browser, type the verified official address yourself, or use the official mobile app.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
