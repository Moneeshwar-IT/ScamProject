import React from 'react';
import { PRESET_SCENARIOS } from '../data/presetScenarios.ts';
import { ScamScenarioPreset } from '../types/scamshield.ts';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  ArrowRight,
  Brain,
  Tag,
  Gauge,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';

interface HomeViewProps {
  onStartAnalyzing: () => void;
  onSelectPreset: (preset: ScamScenarioPreset) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartAnalyzing,
  onSelectPreset,
}) => {
  const features = [
    {
      title: 'Phishing Detection',
      desc: 'Detects fake security alerts, credential harvesting pages, and domain spoofing engineered to capture accounts.',
      icon: ShieldAlert,
      color: 'blue'
    },
    {
      title: 'Scam Classification',
      desc: 'Categorizes threats across 18 canonical taxonomies: Bank scams, OTP harvesting, delivery fees, and romance fraud.',
      icon: Tag,
      color: 'purple'
    },
    {
      title: 'Weighted Risk Scoring',
      desc: '0–100 score prioritizing decisive vectors: OTP/password requests, upfront payment demands, and severe threats.',
      icon: Gauge,
      color: 'rose'
    },
    {
      title: 'Explainable Results',
      desc: 'Separates evidence into Confirmed facts, Suspicious patterns, and Unknowns without unverified assumptions.',
      icon: HelpCircle,
      color: 'emerald'
    }
  ];

  return (
    <div className="space-y-12 py-2">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Detect. Analyze. Stay Safe.</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Think Before You Click.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            AI-powered scam detection that helps you understand suspicious digital messages before you respond.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartAnalyzing}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-900/40 hover:scale-[1.02]"
            >
              <span>Analyze a Message</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Statement */}
          <div className="pt-4 text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Evidence-based AI analysis • Privacy-focused • Explainable results</span>
          </div>
        </div>
      </section>

      {/* 2. Features / Statistics Section */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Multi-Engine Threat Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Engineered to analyze suspicious messages with evidence-grounded rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-colors shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Try Demo Section with Predefined Examples */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-400" />
              <span>Try Demo Scenarios</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any predefined attack vector to instantly test the ScamShield AI detection engine.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">1-Click Live Test</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESET_SCENARIOS.slice(0, 6).map((preset) => (
            <div
              key={preset.id}
              className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4.5 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-colors group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    preset.riskLevel === 'CRITICAL'
                      ? 'text-rose-400 bg-rose-950/60 border-rose-800'
                      : preset.riskLevel === 'HIGH'
                      ? 'text-amber-400 bg-amber-950/60 border-amber-800'
                      : 'text-emerald-400 bg-emerald-950/60 border-emerald-800'
                  }`}>
                    {preset.riskLevel}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">{preset.channel}</span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  {preset.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                  "{preset.messageText}"
                </p>
              </div>

              <button
                onClick={() => onSelectPreset(preset)}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-200 text-xs font-semibold border border-slate-700 hover:border-blue-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Analyze Example</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Privacy Section: "Your safety comes first." */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Your safety comes first.
            </h2>
            <p className="text-xs text-slate-400">
              ScamShield is engineered with strict digital safety and zero-knowledge privacy principles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-xs text-slate-300">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <strong className="text-slate-100 block">Text Analysis Only</strong>
            <p className="text-slate-400 leading-relaxed">
              ScamShield analyzes only the message text provided by the user to identify fraud patterns.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <strong className="text-slate-100 block">Never Asks for Passwords</strong>
            <p className="text-slate-400 leading-relaxed">
              The application never asks for passwords, OTPs, PINs, CVVs, or banking credentials.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <strong className="text-slate-100 block">Sanitize Before Submit</strong>
            <p className="text-slate-400 leading-relaxed">
              Users should remove sensitive personal information before submitting messages whenever possible.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <strong className="text-slate-100 block">Zero Link Execution</strong>
            <p className="text-slate-400 leading-relaxed">
              Suspicious URLs are analyzed as text only and are never opened, fetched, or executed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
