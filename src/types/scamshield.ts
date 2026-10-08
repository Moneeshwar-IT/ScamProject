export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type CommunicationType = 'SMS' | 'WhatsApp' | 'Email' | 'Social Media' | 'Website' | 'Unknown';

export interface CredentialRequestFlags {
  password: boolean;
  otp: boolean;
  pin: boolean;
  cvv: boolean;
  accountNumber: boolean;
  loginCredentials: boolean;
  authCodes: boolean;
  details?: string;
}

export interface ExtractedUrlInfo {
  url: string;
  domain: string;
  isSuspicious: boolean;
  flags: string[];
}

export interface MessageAnalysis {
  communicationType: CommunicationType;
  senderIdentity: string;
  claimedOrganization: string;
  mainPurpose: string;
  requestedAction: string;
  financialRequest: boolean;
  financialDetails?: string;
  personalInfoRequest: boolean;
  personalInfoDetails?: string;
  credentialRequest: CredentialRequestFlags;
  linkInformation: ExtractedUrlInfo[];
  urgencyIndicators: string[];
  threatIndicators: string[];
  rewardIndicators: string[];
  emotionalManipulation: string[];
  impersonationIndicators: string[];
  suspiciousLinguisticPatterns: string[];
}

export interface PhishingIndicator {
  indicator: string;
  evidence: string;
  severity: RiskLevel;
  reason: string;
}

export interface PhishingAnalysis {
  indicators: PhishingIndicator[];
  phishingRisk: RiskLevel;
}

export interface SocialEngineeringTechnique {
  technique: string;
  evidence: string;
  severity: RiskLevel;
  explanation: string;
}

export interface SocialEngineeringAnalysis {
  techniques: SocialEngineeringTechnique[];
  socialEngineeringRiskScore: number; // 0-100
  summary: string;
}

export interface FinancialFraudIndicator {
  indicator: string;
  evidence: string;
  severity: RiskLevel;
  explanation: string;
}

export interface FinancialAnalysis {
  indicators: FinancialFraudIndicator[];
  financialFraudRiskScore: number; // 0-100
}

export interface ImpersonationAnalysis {
  claimedEntity: string;
  impersonationDetected: boolean;
  confidence: number; // 0-100
  evidence: string;
  risk: RiskLevel;
}

export interface UrlRiskAnalysis {
  url: string;
  domain: string;
  suspiciousIndicators: string[];
  riskLevel: RiskLevel;
  explanation: string;
}

export interface ScamClassification {
  primaryCategory: string;
  secondaryCategory?: string;
  confidence: number; // 0-100
  reason: string;
}

export interface RiskScoring {
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  keyReasons: string[];
  confidence: number; // 0-100
  scoreExplanation: string;
}

export interface ExplainabilityPillar {
  detected: string;
  evidence: string;
  whyRisky: string;
  safeAction: string;
}

export interface ExplainabilityAnalysis {
  confirmed: ExplainabilityPillar[];
  suspicious: ExplainabilityPillar[];
  unknown: ExplainabilityPillar[];
}

export interface SafetyRecommendations {
  immediateActions: string[];
  whatNotToDo: string[];
  safeVerificationMethod: string;
  emergencyAction?: string;
}

export interface TechnicalFinding {
  area: string;
  severity: RiskLevel;
  explanation: string;
}

export interface TechnicalAnalysis {
  findings: TechnicalFinding[];
}

export interface UserReportStructure {
  rawReportText: string;
  riskLevel: RiskLevel;
  riskScore: number;
  possibleScamType: string;
  whySuspicious: string[];
  whatDetected: string[];
  whatYouShouldDo: string[];
  whatYouShouldNotDo: string[];
  importantDisclaimer: string;
}

export interface QualityAssurance {
  analysisQualityScore: number; // 0-100
  missedIndicators: string[];
  unsupportedClaims: string[];
  safetyIssues: string[];
  corrections: string[];
  finalQualityStatus: 'PASS' | 'REVIEW';
}

export interface ScamShieldFullAssessment {
  id: string;
  timestamp: string;
  originalMessage: string;
  messageAnalysis: MessageAnalysis;
  phishingAnalysis: PhishingAnalysis;
  socialEngineeringAnalysis: SocialEngineeringAnalysis;
  financialAnalysis: FinancialAnalysis;
  impersonationAnalysis: ImpersonationAnalysis;
  urlAnalysis: UrlRiskAnalysis[];
  classification: ScamClassification;
  riskScoring: RiskScoring;
  explainability: ExplainabilityAnalysis;
  recommendations: SafetyRecommendations;
  technicalAnalysis: TechnicalAnalysis;
  userReport: UserReportStructure;
  qualityAssurance: QualityAssurance;
  finalDecisionReport: string;
  engineExecutionMeta: {
    durationMs: number;
    model: string;
    enginesExecuted: number;
  };
}

export interface ScamScenarioPreset {
  id: string;
  title: string;
  category: string;
  riskLevel: RiskLevel;
  channel: CommunicationType;
  senderPreview: string;
  messageText: string;
  description: string;
}
