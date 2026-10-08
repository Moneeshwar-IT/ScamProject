/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AnalysisInput } from './components/AnalysisInput';
import { RiskScoreCard } from './components/RiskScoreCard';
import { ExecutiveReportView } from './components/ExecutiveReportView';
import { EngineInspectorView } from './components/EngineInspectorView';
import { UrlSandboxView } from './components/UrlSandboxView';
import { EmergencyPlaybookView } from './components/EmergencyPlaybookView';
import { ScenarioLibraryView } from './components/ScenarioLibraryView';
import { EngineArchitectureView } from './components/EngineArchitectureView';
import { PresentationView } from './components/PresentationView';
import { analyzeMessageApi } from './services/apiClient';
import { ScamShieldFullAssessment, ScamScenarioPreset } from './types/scamshield';
import { PRESET_SCENARIOS } from './data/presetScenarios';
import { ShieldCheck, ShieldAlert, Cpu, Sparkles, AlertTriangle, ArrowRight, Layers, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'scenarios' | 'url-sandbox' | 'emergency' | 'architecture' | 'presentation'>('scanner');
  const [viewMode, setViewMode] = useState<'executive' | 'engine-inspector'>('executive');
  
  // Default to the first preset for immediate interactivity if desired, or empty
  const [inputMessage, setInputMessage] = useState<string>(PRESET_SCENARIOS[0].messageText);
  const [assessment, setAssessment] = useState<ScamShieldFullAssessment | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inspectedUrl, setInspectedUrl] = useState<string>('');
  const [engineMode, setEngineMode] = useState<'ai' | 'turbo'>('ai');

  const runAnalysis = async (msgToAnalyze?: string, modeToUse?: 'ai' | 'turbo') => {
    const text = msgToAnalyze !== undefined ? msgToAnalyze : inputMessage;
    if (!text || !text.trim()) return;

    const mode = modeToUse || engineMode;
    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeMessageApi(text.trim(), mode);
      setAssessment(result);
    } catch (err: any) {
      setError(err?.message || 'Failed to complete message assessment.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectScenario = (scenario: ScamScenarioPreset) => {
    setInputMessage(scenario.messageText);
    setActiveTab('scanner');
    runAnalysis(scenario.messageText);
  };

  const handleInspectUrlFromReport = (url: string) => {
    setInspectedUrl(url);
    setActiveTab('url-sandbox');
  };

  const handleReset = () => {
    setInputMessage('');
    setAssessment(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navbar with 3-Zone top bar contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={handleReset}
        hasAssessment={!!assessment}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* TAB 1: SCANNER & DETECTOR */}
        {activeTab === 'scanner' && (
          <div className="space-y-8">
            {/* Hero Banner when no assessment is displayed */}
            {!assessment && (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 p-6 sm:p-8 shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="max-w-2xl space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>EVIDENCE-BASED DIGITAL SAFETY AUDIT</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400">15 Modular AI Engines</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      Detect Phishing, Fraud & Social Engineering with Precision
                    </h1>

                    <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                      Analyze suspicious SMS, WhatsApp messages, emails, urgent payment demands, and fraudulent look-alike URLs before clicking or sharing sensitive credentials.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>Zero Link Interaction Guarantee</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span>Multi-Agent QA Verification</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                        <span>Calibrated Uncertainty</span>
                      </div>
                    </div>
                  </div>

                  {/* Emblem visual slot with styled fallback container */}
                  <div className="shrink-0 relative flex items-center justify-center">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 relative group">
                      <img
                        src="/src/assets/images/scamshield_security_emblem_1791340356966.jpg"
                        alt="ScamShield AI Security Shield Emblem"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          // Resilient fallback container if image asset fails to render in sandbox
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Input Component */}
            <AnalysisInput
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              onAnalyze={runAnalysis}
              isLoading={isLoading}
              engineMode={engineMode}
              setEngineMode={setEngineMode}
            />

            {/* Error display if any */}
            {error && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Results Section */}
            {assessment && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Primary Risk Overview Card */}
                <RiskScoreCard
                  riskScore={assessment.riskScoring.riskScore}
                  riskLevel={assessment.riskScoring.riskLevel}
                  scamCategory={assessment.classification.primaryCategory}
                  secondaryCategory={assessment.classification.secondaryCategory}
                  communicationType={assessment.messageAnalysis.communicationType}
                  confidence={assessment.riskScoring.confidence}
                  durationMs={assessment.engineExecutionMeta.durationMs}
                  model={assessment.engineExecutionMeta.model}
                />

                {/* View Switcher: Executive Report vs 15-Engine Deep Inspector */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setViewMode('executive')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                        viewMode === 'executive'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Executive Safety Report (Prompt 13)</span>
                    </button>
                    <button
                      onClick={() => setViewMode('engine-inspector')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                        viewMode === 'engine-inspector'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>15-Engine Inspector & Telemetry</span>
                    </button>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>Assessed:</span>
                    <span className="font-mono tabular-nums text-slate-300">
                      {new Date(assessment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Main View Mode Rendering */}
                {viewMode === 'executive' ? (
                  <ExecutiveReportView
                    userReport={assessment.userReport}
                    recommendations={assessment.recommendations}
                    originalMessage={assessment.originalMessage}
                  />
                ) : (
                  <EngineInspectorView
                    assessment={assessment}
                    onInspectUrl={handleInspectUrlFromReport}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SCENARIOS LIBRARY */}
        {activeTab === 'scenarios' && (
          <ScenarioLibraryView onSelectScenario={handleSelectScenario} />
        )}

        {/* TAB 3: URL STATIC SANDBOX */}
        {activeTab === 'url-sandbox' && (
          <UrlSandboxView initialUrl={inspectedUrl} />
        )}

        {/* TAB 4: EMERGENCY PLAYBOOK */}
        {activeTab === 'emergency' && (
          <EmergencyPlaybookView />
        )}

        {/* TAB 5: 15-ENGINE ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <EngineArchitectureView />
        )}

        {/* TAB 6: 6-SLIDE PRESENTATION DECK */}
        {activeTab === 'presentation' && (
          <PresentationView />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">ScamShield AI</span>
            <span>·</span>
            <span>Digital Safety & Fraud Threat Intelligence</span>
          </div>
          <div>
            <span>Never share OTPs, passwords, or banking PINs with unverified third parties.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
