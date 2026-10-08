import React, { useState, useEffect } from 'react';
import { Sparkles, Clipboard, Trash2, ArrowRight, Zap, Brain, CheckCircle2 } from 'lucide-react';
import { PRESET_SCENARIOS } from '../data/presetScenarios';

interface AnalysisInputProps {
  inputMessage: string;
  setInputMessage: (val: string) => void;
  onAnalyze: (msgToAnalyze?: string, mode?: 'ai' | 'turbo') => void;
  isLoading: boolean;
  engineMode: 'ai' | 'turbo';
  setEngineMode: (mode: 'ai' | 'turbo') => void;
}

export const AnalysisInput: React.FC<AnalysisInputProps> = ({
  inputMessage,
  setInputMessage,
  onAnalyze,
  isLoading,
  engineMode,
  setEngineMode,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  const engineSteps = [
    'Engine 02: Extracting message attributes, credentials & actions...',
    'Engine 03: Auditing phishing & fake login harvesting triggers...',
    'Engine 04: Evaluating psychological manipulation & urgency timers...',
    'Engine 05: Checking advance-fee, crypto & payment fraud vectors...',
    'Engine 06: Detecting bank, courier & government impersonation...',
    'Engine 07: Safely inspecting URL structure (Zero network interaction)...',
    'Engine 09: Computing weighted ScamShield composite risk score...',
    'Engine 14: Running multi-agent QA safety audit (PASS/REVIEW)...',
    'Engine 13: Formatting standardized executive safety report...',
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
        setSelectedPresetId('');
      }
    } catch {
      // fallback
    }
  };

  const handleSelectPreset = (presetId: string) => {
    const found = PRESET_SCENARIOS.find((p) => p.id === presetId);
    if (found) {
      setSelectedPresetId(presetId);
      setInputMessage(found.messageText);
    }
  };

  const handleClear = () => {
    setInputMessage('');
    setSelectedPresetId('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white tracking-tight">
            Analyze Suspicious Communication
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Paste text from SMS, WhatsApp, Email, social media DM, or banking alert for multi-engine evaluation.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePaste}
            className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-md border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Paste from clipboard"
          >
            <Clipboard className="w-3.5 h-3.5" />
            <span>Paste</span>
          </button>
          {inputMessage && (
            <button
              type="button"
              onClick={handleClear}
              className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-rose-300 bg-slate-800 hover:bg-slate-700/80 rounded-md border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Preset pills row */}
      <div className="mb-4">
        <div className="text-xs font-medium text-slate-400 mb-2 flex items-center justify-between">
          <span>Or load a common scam attack scenario:</span>
          <span className="text-[11px] text-slate-500 font-mono">8 presets available</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_SCENARIOS.slice(0, 5).map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset.id)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500 text-blue-200'
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span className="font-medium">{preset.title.split(':')[0]}</span>
                <span className="text-slate-400 text-[11px] ml-1">({preset.channel})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
            if (selectedPresetId) setSelectedPresetId('');
          }}
          placeholder="Paste the suspicious message content here... (e.g. 'Your Bank account is locked! Click http://... to verify OTP immediately')"
          rows={5}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono resize-y leading-relaxed transition-colors"
        />

        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Security Rule: ScamShield never executes or visits embedded links.</span>
          </div>
          <div className="font-mono tabular-nums">
            {inputMessage.length} characters
          </div>
        </div>
      </div>

      {/* Live Pipeline Execution Progress Box when loading */}
      {isLoading && (
        <div className="mt-4 p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/60 flex items-center gap-3 animate-in fade-in duration-200">
          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin shrink-0" />
          <div className="flex-1">
            <div className="text-xs font-mono text-blue-300 font-medium">
              {engineSteps[loadingStepIndex]}
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${((loadingStepIndex + 1) / engineSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mode Selection and Submit Bar */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
        {/* Execution Mode Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Speed Mode:</span>
          <div className="inline-flex rounded-lg p-0.5 bg-slate-950 border border-slate-800">
            <button
              type="button"
              onClick={() => setEngineMode('turbo')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                engineMode === 'turbo'
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
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
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                engineMode === 'ai'
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Full Neural Deep Analysis with Gemini 3.8 Flash (Optimized ~2-3s)"
            >
              <Brain className="w-3 h-3 text-blue-400" />
              <span>Deep Gemini AI (~2s)</span>
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="button"
          disabled={isLoading || !inputMessage.trim()}
          onClick={() => onAnalyze(undefined, engineMode)}
          className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isLoading || !inputMessage.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 border border-blue-400/30'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Evaluating 15 Engines...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Evaluate Threat Risk</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
