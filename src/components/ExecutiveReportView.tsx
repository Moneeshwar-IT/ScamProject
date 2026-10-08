import React, { useState } from 'react';
import { UserReportStructure, SafetyRecommendations } from '../types/scamshield';
import { Copy, Check, Volume2, VolumeX, Download, AlertOctagon, Share2, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

interface ExecutiveReportViewProps {
  userReport: UserReportStructure;
  recommendations: SafetyRecommendations;
  originalMessage: string;
}

export const ExecutiveReportView: React.FC<ExecutiveReportViewProps> = ({
  userReport,
  recommendations,
  originalMessage,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userReport.rawReportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([userReport.rawReportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ScamShield-Report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAudioReadout = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak = `ScamShield AI Report. Risk level: ${userReport.riskLevel}. Risk score: ${userReport.riskScore} percent. Possible scam type: ${userReport.possibleScamType}. Immediate recommendations: ${userReport.whatYouShouldDo.join('. ')}. What not to do: ${userReport.whatYouShouldNotDo.join('. ')}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Emergency Alert Callout if user was targeted for funds or credentials */}
      {recommendations.emergencyAction && (
        <div className="bg-rose-950/40 border border-rose-600/50 rounded-xl p-4 sm:p-5 flex items-start gap-4 shadow-lg shadow-rose-950/20">
          <div className="w-10 h-10 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 text-rose-400">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-rose-300 uppercase tracking-wide flex items-center gap-2">
              <span>Emergency Containment Protocol</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-200 mt-1 leading-relaxed">
              {recommendations.emergencyAction}
            </p>
          </div>
        </div>
      )}

      {/* Main Standardized Report Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl relative">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>🛡️ SCAMSHIELD AI REPORT</span>
              </h3>
              <p className="text-xs text-slate-400">
                Official Multi-Engine Assessment Summary
              </p>
            </div>
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAudioReadout}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-600/20 border-amber-500 text-amber-200'
                  : 'bg-slate-800 hover:bg-slate-700/80 text-slate-300 border-slate-700'
              }`}
              title="Listen to safety advice"
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
              className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy formatted text to share on WhatsApp or SMS"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Report</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadTxt}
              className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              title="Download text file"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Report Key Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 border-b border-slate-800">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-slate-500">Risk Level</div>
            <div className="text-lg font-bold text-white mt-0.5">{userReport.riskLevel}</div>
          </div>
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-slate-500">Risk Score</div>
            <div className="text-lg font-bold font-mono tabular-nums text-white mt-0.5">{userReport.riskScore}%</div>
          </div>
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-slate-500">Possible Scam Type</div>
            <div className="text-lg font-bold text-white mt-0.5">{userReport.possibleScamType}</div>
          </div>
        </div>

        {/* Section 1: Why it is suspicious */}
        <div className="py-5 border-b border-slate-800">
          <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-3">
            <span>🚨 Why it is suspicious:</span>
          </h4>
          <ul className="space-y-2 text-sm text-slate-300">
            {userReport.whySuspicious.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2: What we detected */}
        <div className="py-5 border-b border-slate-800">
          <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2 mb-3">
            <span>🔍 What we detected:</span>
          </h4>
          <ul className="space-y-2 text-sm text-slate-300">
            {userReport.whatDetected.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-blue-500 font-bold shrink-0">•</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: What you should do */}
        <div className="py-5 border-b border-slate-800">
          <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4" />
            <span>What you should do:</span>
          </h4>
          <ul className="space-y-2 text-sm text-slate-200">
            {userReport.whatYouShouldDo.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-bold shrink-0">•</span>
                <span className="leading-relaxed font-medium">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: What you should NOT do */}
        <div className="py-5 border-b border-slate-800">
          <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4" />
            <span>What you should NOT do:</span>
          </h4>
          <ul className="space-y-2 text-sm text-slate-300">
            {userReport.whatYouShouldNotDo.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0">•</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 5: Safe Verification Method */}
        {recommendations.safeVerificationMethod && (
          <div className="py-5 border-b border-slate-800">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-1.5">
              Verified Safe Channel Check:
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
              {recommendations.safeVerificationMethod}
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="pt-5 text-xs text-slate-400 leading-relaxed flex items-start gap-2">
          <span className="text-amber-400 font-bold">⚠️ Important:</span>
          <span>{userReport.importantDisclaimer}</span>
        </div>
      </div>
    </div>
  );
};
