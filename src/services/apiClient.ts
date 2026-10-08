import { ScamShieldFullAssessment, UrlRiskAnalysis } from '../types/scamshield';
import { executeHeuristicScamAssessment, analyzeUrlStatic } from './heuristicScamEngine';

export async function analyzeMessageApi(message: string, mode: 'ai' | 'turbo' = 'ai'): Promise<ScamShieldFullAssessment> {
  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, mode }),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('API call failed, running client-side ScamShield heuristic engine:', error);
    // Instant seamless client-side execution guarantee
    return executeHeuristicScamAssessment(message);
  }
}

export async function inspectUrlApi(url: string): Promise<UrlRiskAnalysis> {
  try {
    const res = await fetch('/api/url-inspect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn('URL inspection API call failed, running client-side URL inspector:', error);
    return analyzeUrlStatic(url);
  }
}
