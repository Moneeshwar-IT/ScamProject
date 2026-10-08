import { ScamShieldAssessment, UrlRiskAnalysis } from '../types/scamshield.ts';
import { executeHeuristicScamAssessment, analyzeUrlStatic } from './heuristicScamEngine.ts';

export async function analyzeMessageApi(
  message: string,
  url?: string,
  mode: 'ai' | 'turbo' = 'ai'
): Promise<ScamShieldAssessment> {
  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, url, mode }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      throw new Error(errJson?.error || `Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.warn('API call encountered an issue, running client-side ScamShield heuristic engine:', error?.message || error);
    // Instant seamless fallback guarantee
    return executeHeuristicScamAssessment(message, url);
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
