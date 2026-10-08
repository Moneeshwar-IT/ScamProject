export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type CommunicationType = 'SMS' | 'WhatsApp' | 'Email' | 'Social Media' | 'Website' | 'Unknown';

export interface ScamReason {
  title: string;
  description: string;
  severity: RiskLevel;
}

export interface ScamShieldAssessment {
  id: string;
  timestamp: string;
  originalMessage: string;
  optionalUrl?: string;
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  scamProbability: number; // 0-100%
  primaryCategory: string;
  secondaryCategory?: string;
  confidence: number; // 0-100%
  summary: string;
  reasons: ScamReason[];
  detectedIndicators: string[];
  confirmedEvidence: string[];
  suspiciousPatterns: string[];
  unknownInformation: string[];
  immediateActions: string[];
  doNotDo: string[];
  safetyTip: string;
  technicalFindings: string;
  scoreExplanation: string;
  durationMs: number;
  model: string;
  // Extra detailed telemetry
  communicationType?: CommunicationType;
  claimedSender?: string;
  extractedUrls?: string[];
}

export interface AnalysisHistoryItem {
  id: string;
  timestamp: string;
  messagePreview: string;
  optionalUrl?: string;
  riskScore: number;
  riskLevel: RiskLevel;
  primaryCategory: string;
  scamProbability: number;
  assessment: ScamShieldAssessment;
}

export interface ScamScenarioPreset {
  id: string;
  title: string;
  category: string;
  riskLevel: RiskLevel;
  channel: CommunicationType;
  senderPreview: string;
  messageText: string;
  optionalUrl?: string;
  description: string;
}

export interface UrlRiskAnalysis {
  url: string;
  domain: string;
  suspiciousIndicators: string[];
  riskLevel: RiskLevel;
  explanation: string;
}
