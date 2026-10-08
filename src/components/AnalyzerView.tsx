import React, { useState, useEffect } from 'react';
import { PRESET_SCENARIOS } from '../data/presetScenarios.ts';
import { ScamScenarioPreset } from '../types/scamshield.ts';
import {
  Sparkles,
  Clipboard,
  Trash2,
  ArrowRight,
  Zap,
  Brain,
  Link,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface AnalyzerViewProps {
  inputMessage: string;
  setInputMessage: (val: string) => void;
  inputUrl: string;
  setInputUrl: (val: string) => void;
  onAnalyze: (msgToAnalyze?: string, urlToAnalyze?: string, mode?: 'ai' | 'turbo') => void;
  isLoading: boolean;
  error: string | null;
  engineMode: 'ai' | 'turbo';
  setEngineMode: (mode: 'ai' | 'turbo') => void;
}

export const AnalyzerView: React.FC<AnalyzerViewProps> = ({
  inputMessage,
  setInputMessage,
  inputUrl,
  setInputUrl,
  onAnalyze,
  isLoading,
  error,
  engineMode,
  setEngineMode,
}) => {
  const [selectedExampleId, setSelectedExampleId] = useState<string>('');
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  const engineSteps = [
    'Engine 02: Extracting message metadata, channels & actions...',
    'Engine 03: Auditing phishing & credential harvesting triggers...',
    'Engine 04: Evaluating psychological manipulation & urgency cues...',
    'Engine 05: Checking advance-fee, crypto & payment fraud vectors...',
    'Engine 06: Detecting bank, courier & government impersonation...',
    'Engine 07: Statically inspecting URL structure (Zero network interaction)...',
    'Engine 09: Computing weighted ScamShield composite risk score...',
    'Engine 14: Running multi-agent QA safety audit (PASS/REVIEW)...',
    'Engine 13: Formatting standardized explainable report...',
  ];

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setLoadingStepIndex(0);
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1) % engineSteps.length);
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputMessage(text);
        setSelectedExampleId('');
      }
    } catch {
      // ignore
    }
  };

  const handleSelectExample = (preset: ScamScenarioPreset) => {
    setSelectedExampleId(preset.id);
    setInputMessage(preset.messageText);
    setInputUrl(preset.optionalUrl || '');
  };

  const handleClear = () => {
    setInputMessage('');
    setInputUrl('');
    setSelectedExampleId('');
  };

  const quickExamples = [
    { label: 'Bank Scam', id: 'bank-scam' },
    { label: 'OTP Scam', id: 'otp-scam' },
    { label: 'Fake Prize', id: 'prize-scam' },
    { label: 'Fake Job', id: 'fake-job' },
    { label: 'Safe Message', id: 'safe-message' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              ScamShield Message Analyzer
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Paste suspicious communications for instant, evidence-grounded threat assessment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePaste}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Paste from clipboard"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>Paste</span>
            </button>
            {(inputMessage || inputUrl) && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-rose-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Clear input fields"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Example Buttons */}
        <div>
          <div className="text-xs font-medium text-slate-400 mb-2 flex items-center justify-between">
            <span>Try Predefined Examples:</span>
            <span className="text-[11px] text-slate-500 font-mono">1-Click Population</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {quickExamples.map((ex) => {
              const matchedPreset = PRESET_SCENARIOS.find((p) => p.id === ex.id);
              const isSelected = selectedExampleId === ex.id;
              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => {
                    if (matchedPreset) handleSelectExample(matchedPreset);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
                    isSelected
                      ? 'bg-blue-600/30 border-blue-500 text-blue-200'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span>{ex.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Large Text Area */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            Message Content:
          </label>
          <textarea
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              if (selectedExampleId) setSelectedExampleId('');
            }}
            placeholder="Paste a suspicious SMS, WhatsApp message, email, social-media message, or payment request here..."
            rows={6}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono resize-y leading-relaxed"
          />
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Safety Rule: Do not enter active passwords or sensitive private PINs.</span>
            <span className="font-mono tabular-nums">{inputMessage.length} characters</span>
          </div>
        </div>

        {/* Optional URL Field */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Link className="w-3.5 h-3.5 text-blue-400" />
            <span>Optional URL / Website Link:</span>
          </label>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Optional: paste accompanying link or website URL (analyzed as text only, never opened)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
          />
        </div>

        {/* Live Loading Progress */}
        {isLoading && (
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/60 flex items-center gap-3 animate-in fade-in duration-200">
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-mono text-blue-300 font-medium">
                {engineSteps[loadingStepIndex]}
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-300"
                  style={{ width: `${((loadingStepIndex + 1) / engineSteps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Bar */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Speed Mode Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Engine Mode:</span>
            <div className="inline-flex rounded-lg p-0.5 bg-slate-950 border border-slate-800">
              <button
                type="button"
                onClick={() => setEngineMode('turbo')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  engineMode === 'turbo'
                    ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Instant heuristic assessment in under 50ms"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Turbo (&lt;50ms)</span>
              </button>
              <button
                type="button"
                onClick={() => setEngineMode('ai')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  engineMode === 'ai'
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Gemini 3.8 Flash Neural Deep Analysis"
              >
                <Brain className="w-3 h-3 text-blue-400" />
                <span>Deep Gemini AI (~2s)</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              disabled={isLoading || (!inputMessage.trim() && !inputUrl.trim())}
              onClick={handleClear}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition-colors cursor-pointer"
            >
              Clear
            </button>

            <button
              type="button"
              disabled={isLoading || !inputMessage.trim()}
              onClick={() => onAnalyze(inputMessage, inputUrl, engineMode)}
              className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isLoading || !inputMessage.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>{isLoading ? 'Analyzing...' : 'Analyze Message'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
