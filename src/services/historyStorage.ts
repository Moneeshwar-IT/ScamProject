import { AnalysisHistoryItem, ScamShieldAssessment } from '../types/scamshield.ts';

const STORAGE_KEY = 'scamshield_history_v1';

export function loadHistoryFromStorage(): AnalysisHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn('Failed to load history from localStorage:', err);
    return [];
  }
}

export function saveAssessmentToHistory(assessment: ScamShieldAssessment): AnalysisHistoryItem[] {
  try {
    const existing = loadHistoryFromStorage();
    // Sanitize message preview (max 100 chars, no sensitive data)
    const preview = assessment.originalMessage.length > 100
      ? assessment.originalMessage.substring(0, 100) + '...'
      : assessment.originalMessage;

    const newItem: AnalysisHistoryItem = {
      id: assessment.id,
      timestamp: assessment.timestamp,
      messagePreview: preview,
      optionalUrl: assessment.optionalUrl,
      riskScore: assessment.riskScore,
      riskLevel: assessment.riskLevel,
      primaryCategory: assessment.primaryCategory,
      scamProbability: assessment.scamProbability,
      assessment: assessment,
    };

    // Filter out if duplicate ID exists, insert at front, limit to 30 items
    const updated = [newItem, ...existing.filter((item) => item.id !== assessment.id)].slice(0, 30);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn('Failed to save assessment to localStorage:', err);
    return loadHistoryFromStorage();
  }
}

export function deleteHistoryItem(id: string): AnalysisHistoryItem[] {
  try {
    const existing = loadHistoryFromStorage();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn('Failed to delete history item:', err);
    return [];
  }
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear history from localStorage:', err);
  }
}
