/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HomeView } from './components/HomeView.tsx';
import { AnalyzerView } from './components/AnalyzerView.tsx';
import { ResultDashboard } from './components/ResultDashboard.tsx';
import { HistoryView } from './components/HistoryView.tsx';
import { PresentationView } from './components/PresentationView.tsx';
import { analyzeMessageApi } from './services/apiClient.ts';
import {
  loadHistoryFromStorage,
  saveAssessmentToHistory,
  deleteHistoryItem,
  clearAllHistory
} from './services/historyStorage.ts';
import {
  ScamShieldAssessment,
  AnalysisHistoryItem,
  ScamScenarioPreset
} from './types/scamshield.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'analyze' | 'history' | 'presentation'>('home');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [inputUrl, setInputUrl] = useState<string>('');
  const [currentAssessment, setCurrentAssessment] = useState<ScamShieldAssessment | null>(null);
  const [historyItems, setHistoryItems] = useState<AnalysisHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [engineMode, setEngineMode] = useState<'ai' | 'turbo'>('ai');

  // Load history from localStorage on startup
  useEffect(() => {
    const loaded = loadHistoryFromStorage();
    setHistoryItems(loaded);
  }, []);

  const handleRunAnalysis = async (
    msg?: string,
    url?: string,
    mode?: 'ai' | 'turbo'
  ) => {
    const messageToAnalyze = msg !== undefined ? msg : inputMessage;
    const urlToAnalyze = url !== undefined ? url : inputUrl;
    const modeToUse = mode || engineMode;

    if (!messageToAnalyze || !messageToAnalyze.trim()) {
      setError('Please paste a message before starting the analysis.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const assessment = await analyzeMessageApi(messageToAnalyze.trim(), urlToAnalyze?.trim(), modeToUse);
      setCurrentAssessment(assessment);
      
      // Save to localStorage history
      const updatedHistory = saveAssessmentToHistory(assessment);
      setHistoryItems(updatedHistory);
      
      setActiveTab('analyze');
    } catch (err: any) {
      setError(err?.message || 'Failed to complete message analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPresetFromHome = (preset: ScamScenarioPreset) => {
    setInputMessage(preset.messageText);
    setInputUrl(preset.optionalUrl || '');
    setActiveTab('analyze');
    handleRunAnalysis(preset.messageText, preset.optionalUrl, engineMode);
  };

  const handleViewHistoryResult = (assessment: ScamShieldAssessment) => {
    setCurrentAssessment(assessment);
    setInputMessage(assessment.originalMessage);
    setInputUrl(assessment.optionalUrl || '');
    setActiveTab('analyze');
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = deleteHistoryItem(id);
    setHistoryItems(updated);
  };

  const handleClearAllHistory = () => {
    clearAllHistory();
    setHistoryItems([]);
  };

  const handleNewAnalysis = () => {
    setCurrentAssessment(null);
    setInputMessage('');
    setInputUrl('');
    setError(null);
    setActiveTab('analyze');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewAnalysis={handleNewAnalysis}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* TAB 1: HOME LANDING */}
        {activeTab === 'home' && (
          <HomeView
            onStartAnalyzing={() => {
              setCurrentAssessment(null);
              setActiveTab('analyze');
            }}
            onSelectPreset={handleSelectPresetFromHome}
          />
        )}

        {/* TAB 2: ANALYZE / RESULT DASHBOARD */}
        {activeTab === 'analyze' && (
          <div>
            {currentAssessment ? (
              <ResultDashboard
                assessment={currentAssessment}
                onAnalyzeNew={() => {
                  setCurrentAssessment(null);
                  setError(null);
                }}
              />
            ) : (
              <AnalyzerView
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                inputUrl={inputUrl}
                setInputUrl={setInputUrl}
                onAnalyze={handleRunAnalysis}
                isLoading={isLoading}
                error={error}
                engineMode={engineMode}
                setEngineMode={setEngineMode}
              />
            )}
          </div>
        )}

        {/* TAB 3: HISTORY */}
        {activeTab === 'history' && (
          <HistoryView
            historyItems={historyItems}
            onViewResult={handleViewHistoryResult}
            onDeleteItem={handleDeleteHistoryItem}
            onClearAll={handleClearAllHistory}
            onGoToAnalyzer={() => {
              setCurrentAssessment(null);
              setActiveTab('analyze');
            }}
          />
        )}

        {/* TAB 4: PROJECT PRESENTATION DECK (6 SLIDES) */}
        {activeTab === 'presentation' && (
          <PresentationView />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">ScamShield AI</span>
            <span>·</span>
            <span>Detect. Analyze. Stay Safe.</span>
          </div>
          <div className="text-slate-500">
            <span>Evidence-based scam risk assessment • College Project Demo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
