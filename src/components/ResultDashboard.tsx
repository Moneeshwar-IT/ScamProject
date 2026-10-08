import React, { useState } from 'react';
import { ScamShieldAssessment, RiskLevel } from '../types/scamshield.ts';
import { WhyThisScoreModal } from './WhyThisScoreModal.tsx';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ShieldX,
  HelpCircle,
  Copy,
  Check,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Terminal,
  Clock,
  ArrowRight,
  Lock,
  Tag,
  Share2
} from 'lucide-react';

interface ResultDashboardProps {
  assessment: ScamShieldAssessment;
  onAnalyzeNew: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({
  assessment,
  onAnalyzeNew,
}) => {
  const [showWhyScoreModal, setShowWhyScoreModal] = useState(false);
  const [showTechnicalAnalysis, setShowTechnicalAnalysis] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const {
    riskScore,
    riskLevel,
    scamProbability,
    primaryCategory,
    secondaryCategory,
    confidence,
    summary,
    reasons,
    detectedIndicators,
    confirmedEvidence,
    suspiciousPatterns,
    unknownInformation,
    immediateActions,
    doNotDo,
    safetyTip,
    technicalFindings,
    durationMs,
    model,
    originalMessage,
    optionalUrl
  } = assessment;

  const getRiskTheme = () => {
    switch (riskLevel) {
      case 'CRITICAL':
        return {
          border: 'border-rose-600/60',
          bg: 'bg-rose-950/20',
          text: 'text-rose-400',
          badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
          icon: ShieldX,
          label: 'CRITICAL',
          subLabel: 'Strong evidence of active scam targeting money, passwords, or authentication codes.',
        };
      case 'HIGH':
        return {
          border: 'border-amber-600/60',
          bg: 'bg-amber-950/20',
          text: 'text-amber-400',
          badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          icon: AlertTriangle,
          label: 'HIGH',
          subLabel: 'Multiple strong indicators of fraud, phishing, impersonation, or urgency present.',
        };
      case 'MEDIUM':
        return {
          border: 'border-yellow-600/50',
          bg: 'bg-yellow-950/20',
          text: 'text-yellow-400',
          badgeBg: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
          icon: ShieldAlert,
          label: 'MEDIUM',
          subLabel: 'Some suspicious indicators present; evidence is inconclusive. Exercise heightened caution.',
        };
      case 'LOW':
      default:
        return {
          border: 'border-emerald-600/50',
          bg: 'bg-emerald-950/20',
          text: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          icon: ShieldCheck,
          label: 'LOW',
          subLabel: 'Little or no evidence of malicious fraud activity detected in the message.',
        };
    }
  };

  const theme = getRiskTheme();
  const IconComponent = theme.icon;

  const handleCopy = async () => {
    const formatted = `🛡️ SCAMSHIELD AI ASSESSMENT
Risk Score: ${riskScore}/100 [${riskLevel}]
Scam Type: ${primaryCategory}
Probability: ${scamProbability}%

🚨 WHY IT IS SUSPICIOUS:
${reasons.map((r) => `• ${r.title}: ${r.description}`).join('\n')}

✅ RECOMMENDED ACTIONS:
${immediateActions.map((a) => `• ${a}`).join('\n')}

❌ WHAT NOT TO DO:
${doNotDo.map((d) => `• ${d}`).join('\n')}

💡 SAFETY TIP:
${safetyTip}

Verify via official trusted channels.`;

    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  const handleAudioBriefing = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const text = `ScamShield AI Assessment. Risk score is ${riskScore} out of 100, which is ${riskLevel} risk. Possible scam category is ${primaryCategory}. Summary: ${summary}. Immediate advice: ${immediateActions.join('. ')}. Remember: ${safetyTip}`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Risk Overview Prominent Card */}
      <div className={`border ${theme.border} ${theme.bg} rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Score & Badges */}
          <div className="flex items-start sm:items-center gap-5">
            <div className={`w-18 h-18 rounded-2xl border flex items-center justify-center shrink-0 ${theme.badgeBg}`}>
              <IconComponent className="w-9 h-9" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-400">
                  🛡️ SCAMSHIELD RISK SCORE
                </span>
                <span className="text-slate-600">·</span>
                <span className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded border ${theme.badgeBg}`}>
                  {theme.label}
                </span>
              </div>

              <div className="flex items-baseline gap-3 mt-1.5">
                <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight tabular-nums text-white">
                  {riskScore}
                  <span className="text-2xl font-normal text-slate-400"> / 100</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                {theme.subLabel}
              </p>
            </div>
          </div>

          {/* Right: Metrics & "Why this score?" Action */}
          <div className="lg:border-l lg:border-slate-800 lg:pl-8 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 uppercase text-[10px] tracking-wider block">Primary Scam Type</span>
                <span className="font-bold text-white text-sm">{primaryCategory}</span>
                {secondaryCategory && (
                  <span className="text-[11px] text-slate-400 block truncate">{secondaryCategory}</span>
                )}
              </div>

              <div>
                <span className="text-slate-500 uppercase text-[10px] tracking-wider block">Scam Probability</span>
                <span className="font-mono text-sm font-bold text-slate-200 tabular-nums">{scamProbability}%</span>
              </div>

              <div>
                <span className="text-slate-500 uppercase text-[10px] tracking-wider block">Confidence</span>
                <span className="font-mono text-sm font-bold text-slate-200 tabular-nums">{confidence}%</span>
              </div>

              <div>
                <span className="text-slate-500 uppercase text-[10px] tracking-wider block">Engine Telemetry</span>
                <span className="text-[11px] text-slate-400 font-mono tabular-nums">{durationMs}ms</span>
              </div>
            </div>

            {/* "Why this score?" Button */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowWhyScoreModal(true)}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-950/40"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>🔍 Why this score?</span>
              </button>

              <button
                onClick={handleAudioBriefing}
                className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Stop Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Audio Brief</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopy}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy report for WhatsApp or SMS"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Report'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Message preview snippet */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Analyzed Message: </span>
          <span className="italic font-mono text-slate-300">
            "{originalMessage.length > 180 ? originalMessage.substring(0, 180) + '...' : originalMessage}"
          </span>
          {optionalUrl && (
            <div className="mt-1 font-mono text-cyan-400">
              Accompanying URL: {optionalUrl}
            </div>
          )}
        </div>
      </div>

      {/* 2. Detected Indicators */}
      {detectedIndicators.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-blue-400" />
            <span>Detected Threat Indicators:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {detectedIndicators.map((ind, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                <span>{ind}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 3. Why It May Be Suspicious (Key Reason Cards) */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>🚨 Why It May Be Suspicious:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  {reason.title}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  reason.severity === 'CRITICAL'
                    ? 'text-rose-400 bg-rose-950/60 border-rose-800'
                    : reason.severity === 'HIGH'
                    ? 'text-amber-400 bg-amber-950/60 border-amber-800'
                    : 'text-slate-300 bg-slate-800 border-slate-700'
                }`}>
                  {reason.severity}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Three Evidence Pillars: CONFIRMED, SUSPICIOUS, UNKNOWN */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>🔍 Evidence & Epistemic Analysis:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* CONFIRMED */}
          <div className="bg-slate-900 border border-emerald-900/40 rounded-xl p-4.5 space-y-2.5">
            <div className="font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CONFIRMED</span>
            </div>
            <p className="text-[11px] text-slate-500">Information directly visible in the message body:</p>
            <ul className="space-y-1.5 text-slate-300">
              {confirmedEvidence.map((ev, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SUSPICIOUS */}
          <div className="bg-slate-900 border border-amber-900/40 rounded-xl p-4.5 space-y-2.5">
            <div className="font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>SUSPICIOUS</span>
            </div>
            <p className="text-[11px] text-slate-500">Patterns commonly associated with active fraud:</p>
            <ul className="space-y-1.5 text-slate-300">
              {suspiciousPatterns.map((pat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{pat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* UNKNOWN */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-2.5">
            <div className="font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>UNKNOWN</span>
            </div>
            <p className="text-[11px] text-slate-500">Information that cannot be verified from message alone:</p>
            <ul className="space-y-1.5 text-slate-300">
              {unknownInformation.map((unk, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-500 font-bold">•</span>
                  <span>{unk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Recommended Actions & What NOT To Do */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recommended Actions */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Recommended Actions:</span>
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
            {immediateActions.map((act, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-emerald-500 font-bold shrink-0">•</span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What NOT To Do */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            <span>What you should NOT do:</span>
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
            {doNotDo.map((act, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-rose-500 font-bold shrink-0">•</span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 6. Practical Safety Tip Banner */}
      {safetyTip && (
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3 text-xs sm:text-sm text-slate-300">
          <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Golden Safety Rule: </strong>
            <span>{safetyTip}</span>
          </div>
        </div>
      )}

      {/* 7. Collapsible Technical Cybersecurity Explanation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <button
          onClick={() => setShowTechnicalAnalysis(!showTechnicalAnalysis)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer bg-slate-950/40"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Technical Cybersecurity Findings</span>
          </div>
          {showTechnicalAnalysis ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showTechnicalAnalysis && (
          <div className="p-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800 bg-slate-950/60 font-mono">
            {technicalFindings}
          </div>
        )}
      </div>

      {/* Bottom CTA to test another message */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={onAnalyzeNew}
          className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span>Analyze Another Message</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* "Why this score?" Modal */}
      {showWhyScoreModal && (
        <WhyThisScoreModal
          assessment={assessment}
          onClose={() => setShowWhyScoreModal(false)}
        />
      )}
    </div>
  );
};
