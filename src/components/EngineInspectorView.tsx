import React, { useState } from 'react';
import { ScamShieldFullAssessment, RiskLevel } from '../types/scamshield';
import {
  FileSearch,
  Fish,
  Brain,
  DollarSign,
  UserCheck,
  Link,
  Tag,
  Gauge,
  HelpCircle,
  LifeBuoy,
  Terminal,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Lock
} from 'lucide-react';

interface EngineInspectorViewProps {
  assessment: ScamShieldFullAssessment;
  onInspectUrl: (url: string) => void;
}

export const EngineInspectorView: React.FC<EngineInspectorViewProps> = ({
  assessment,
  onInspectUrl,
}) => {
  const [activeEngineTab, setActiveEngineTab] = useState<string>('msg-analysis');

  const {
    messageAnalysis,
    phishingAnalysis,
    socialEngineeringAnalysis,
    financialAnalysis,
    impersonationAnalysis,
    urlAnalysis,
    classification,
    riskScoring,
    explainability,
    recommendations,
    technicalAnalysis,
    qualityAssurance,
  } = assessment;

  const engines = [
    { id: 'msg-analysis', name: '02. Message Extraction', icon: FileSearch },
    { id: 'phishing', name: '03. Phishing Detection', icon: Fish },
    { id: 'social-eng', name: '04. Social Engineering', icon: Brain },
    { id: 'financial', name: '05. Financial Fraud', icon: DollarSign },
    { id: 'impersonation', name: '06. Impersonation', icon: UserCheck },
    { id: 'urls', name: '07. URL Risk Engine', icon: Link },
    { id: 'classification', name: '08. Scam Taxonomy', icon: Tag },
    { id: 'scoring', name: '09. Weighted Scoring', icon: Gauge },
    { id: 'explainability', name: '10. Explainability', icon: HelpCircle },
    { id: 'technical', name: '12. Technical Analysis', icon: Terminal },
    { id: 'qa-audit', name: '14. Quality Assurance', icon: CheckCircle },
  ];

  const getSeverityBadge = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/80';
      case 'HIGH':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/80';
      case 'MEDIUM':
        return 'text-yellow-400 bg-yellow-950/60 border-yellow-800/80';
      case 'LOW':
      default:
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Engine Selection Tab Bar */}
      <div className="border-b border-slate-800 bg-slate-950/60 px-4 py-2.5 overflow-x-auto scrollbar-none flex items-center gap-1.5">
        {engines.map((eng) => {
          const Icon = eng.icon;
          const isActive = activeEngineTab === eng.id;
          return (
            <button
              key={eng.id}
              onClick={() => setActiveEngineTab(eng.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{eng.name}</span>
            </button>
          );
        })}
      </div>

      {/* Engine Content Panel */}
      <div className="p-6">
        {/* ENGINE 2: MESSAGE EXTRACTION */}
        {activeEngineTab === 'msg-analysis' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <FileSearch className="w-5 h-5 text-blue-400" />
                  <span>Engine 02: Message Analysis & Extraction</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Extracted communication metadata, requested actions, and linguistic patterns.
                </p>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                15 Attributes Extracted
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500">Sender & Channel</div>
                <div className="text-sm text-slate-200">
                  <span className="text-slate-400">Communication Type:</span> <strong className="text-white">{messageAnalysis.communicationType}</strong>
                </div>
                <div className="text-sm text-slate-200">
                  <span className="text-slate-400">Claimed Sender:</span> <strong className="text-white">{messageAnalysis.senderIdentity}</strong>
                </div>
                <div className="text-sm text-slate-200">
                  <span className="text-slate-400">Claimed Organization:</span> <strong className="text-white">{messageAnalysis.claimedOrganization}</strong>
                </div>
                <div className="text-sm text-slate-200">
                  <span className="text-slate-400">Main Purpose:</span> <span className="text-slate-300">{messageAnalysis.mainPurpose}</span>
                </div>
                <div className="text-sm text-slate-200">
                  <span className="text-slate-400">Requested Action:</span> <span className="text-slate-300 font-semibold">{messageAnalysis.requestedAction}</span>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500">Financial & Credential Requests</div>
                <div className="text-sm flex items-center justify-between">
                  <span className="text-slate-400">Financial Transfer Demanded:</span>
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${messageAnalysis.financialRequest ? 'text-rose-400 bg-rose-950/60 border border-rose-900' : 'text-slate-400'}`}>
                    {messageAnalysis.financialRequest ? 'YES' : 'NO'}
                  </span>
                </div>
                {messageAnalysis.financialDetails && (
                  <p className="text-xs text-slate-300 bg-slate-900 p-2 rounded border border-slate-800">
                    {messageAnalysis.financialDetails}
                  </p>
                )}

                <div className="text-sm flex items-center justify-between pt-1">
                  <span className="text-slate-400">Personal Info Requested:</span>
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${messageAnalysis.personalInfoRequest ? 'text-rose-400 bg-rose-950/60 border border-rose-900' : 'text-slate-400'}`}>
                    {messageAnalysis.personalInfoRequest ? 'YES' : 'NO'}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <div className="text-xs text-slate-400 mb-1 font-medium">Targeted Credentials:</div>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {Object.entries(messageAnalysis.credentialRequest)
                      .filter(([k, v]) => k !== 'details' && v === true)
                      .map(([key]) => (
                        <span key={key} className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono">
                          {key.toUpperCase()}
                        </span>
                      ))}
                    {!Object.entries(messageAnalysis.credentialRequest).some(([k, v]) => k !== 'details' && v === true) && (
                      <span className="text-slate-500 text-xs italic">No explicit credentials targeted</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Psychological & Linguistic Vectors */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500">Linguistic & Behavioral Vectors</div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded bg-slate-900 border border-slate-800">
                  <div className="font-semibold text-amber-400 mb-1">Urgency Indicators</div>
                  {messageAnalysis.urgencyIndicators.length > 0 ? (
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      {messageAnalysis.urgencyIndicators.map((u, i) => <li key={i}>{u}</li>)}
                    </ul>
                  ) : <span className="text-slate-500 italic">None detected</span>}
                </div>

                <div className="p-3 rounded bg-slate-900 border border-slate-800">
                  <div className="font-semibold text-rose-400 mb-1">Threats & Coercion</div>
                  {messageAnalysis.threatIndicators.length > 0 ? (
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      {messageAnalysis.threatIndicators.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  ) : <span className="text-slate-500 italic">None detected</span>}
                </div>

                <div className="p-3 rounded bg-slate-900 border border-slate-800">
                  <div className="font-semibold text-emerald-400 mb-1">Reward & Lures</div>
                  {messageAnalysis.rewardIndicators.length > 0 ? (
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      {messageAnalysis.rewardIndicators.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  ) : <span className="text-slate-500 italic">None detected</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 3: PHISHING DETECTION */}
        {activeEngineTab === 'phishing' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Fish className="w-5 h-5 text-indigo-400" />
                  <span>Engine 03: Phishing Detection Engine</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Audits for credential harvesting, fake logins, domain look-alikes, and authentication capture.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">PHISHING_RISK:</span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getSeverityBadge(phishingAnalysis.phishingRisk)}`}>
                  {phishingAnalysis.phishingRisk}
                </span>
              </div>
            </div>

            {phishingAnalysis.indicators.length > 0 ? (
              <div className="space-y-3">
                {phishingAnalysis.indicators.map((ind, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                        <span>{ind.indicator}</span>
                      </div>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${getSeverityBadge(ind.severity)}`}>
                        {ind.severity}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300">
                      <span className="text-slate-500 font-mono">EVIDENCE:</span> <span className="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-amber-200">{ind.evidence}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-slate-300">Reason:</strong> {ind.reason}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm bg-slate-950/40 rounded-lg border border-slate-800">
                No active phishing or credential-harvesting indicators detected.
              </div>
            )}
          </div>
        )}

        {/* ENGINE 4: SOCIAL ENGINEERING */}
        {activeEngineTab === 'social-eng' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span>Engine 04: Social Engineering Engine</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Exposes psychological manipulation techniques (urgency, fear, greed, authority, relationship exploitation).
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">RISK SCORE:</span>
                <span className="text-sm font-mono font-bold text-purple-300 bg-purple-950/60 px-2.5 py-0.5 rounded border border-purple-800 tabular-nums">
                  {socialEngineeringAnalysis.socialEngineeringRiskScore}/100
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              {socialEngineeringAnalysis.summary}
            </div>

            {socialEngineeringAnalysis.techniques.length > 0 ? (
              <div className="space-y-3">
                {socialEngineeringAnalysis.techniques.map((tech, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-purple-300">
                        {tech.technique}
                      </div>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${getSeverityBadge(tech.severity)}`}>
                        {tech.severity}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300">
                      <span className="text-slate-500 font-mono">EVIDENCE:</span> <span className="text-slate-200">{tech.evidence}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {tech.explanation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm bg-slate-950/40 rounded-lg border border-slate-800">
                No significant social-engineering indicators detected.
              </div>
            )}
          </div>
        )}

        {/* ENGINE 5: FINANCIAL FRAUD */}
        {activeEngineTab === 'financial' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span>Engine 05: Financial Fraud Detection Engine</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Screens for advance-fee requests, wire transfers, crypto wallets, and fraudulent payment channels.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">FINANCIAL_FRAUD_RISK:</span>
                <span className="text-sm font-mono font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800 tabular-nums">
                  {financialAnalysis.financialFraudRiskScore}/100
                </span>
              </div>
            </div>

            {financialAnalysis.indicators.length > 0 ? (
              <div className="space-y-3">
                {financialAnalysis.indicators.map((ind, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-100">
                        {ind.indicator}
                      </div>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${getSeverityBadge(ind.severity)}`}>
                        {ind.severity}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300">
                      <span className="text-slate-500 font-mono">EVIDENCE:</span> <span className="text-slate-200">{ind.evidence}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {ind.explanation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm bg-slate-950/40 rounded-lg border border-slate-800">
                No financial fraud or unauthorized payment solicitation indicators detected.
              </div>
            )}
          </div>
        )}

        {/* ENGINE 6: IMPERSONATION */}
        {activeEngineTab === 'impersonation' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-amber-400" />
                  <span>Engine 06: Impersonation Detection Engine</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Detects spoofing of banks, government agencies, delivery couriers, employers, or family members.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">RISK:</span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getSeverityBadge(impersonationAnalysis.risk)}`}>
                  {impersonationAnalysis.risk}
                </span>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500">Claimed Entity</div>
                  <div className="text-sm font-bold text-white mt-1">{impersonationAnalysis.claimedEntity}</div>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500">Impersonation Detected</div>
                  <div className="text-sm font-bold mt-1 text-slate-200">
                    {impersonationAnalysis.impersonationDetected ? 'YES (Suspected Spoof)' : 'NO'}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500">Confidence</div>
                  <div className="text-sm font-bold font-mono text-slate-200 mt-1 tabular-nums">
                    {impersonationAnalysis.confidence}%
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="text-slate-400 font-mono">EVIDENCE:</span> {impersonationAnalysis.evidence}
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 7: URL RISK ENGINE */}
        {activeEngineTab === 'urls' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Link className="w-5 h-5 text-cyan-400" />
                  <span>Engine 07: URL Risk Analysis Engine</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Static structural inspection (domain misspelling, unusual TLDs, URL shorteners, subdomains). Zero network execution.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                Safe Static Inspection
              </span>
            </div>

            {urlAnalysis.length > 0 ? (
              <div className="space-y-4">
                {urlAnalysis.map((u, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded-lg p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="font-mono text-xs text-cyan-300 break-all bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                        {u.url}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${getSeverityBadge(u.riskLevel)}`}>
                          {u.riskLevel}
                        </span>
                        <button
                          onClick={() => onInspectUrl(u.url)}
                          className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Deep Inspect</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300">
                      <span className="text-slate-400 font-medium">Domain:</span> <strong className="font-mono text-slate-100">{u.domain}</strong>
                    </div>

                    {u.suspiciousIndicators.length > 0 ? (
                      <div className="space-y-1">
                        <div className="text-xs text-rose-400 font-medium">Detected Structural Red Flags:</div>
                        <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                          {u.suspiciousIndicators.map((ind, i) => (
                            <li key={i}>{ind}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-xs text-emerald-400">
                        No obvious structural red flags detected in domain syntax.
                      </p>
                    )}

                    <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-2 leading-relaxed">
                      {u.explanation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm bg-slate-950/40 rounded-lg border border-slate-800">
                No URLs or web hyperlinks detected in the message.
              </div>
            )}
          </div>
        )}

        {/* ENGINE 8: SCAM TAXONOMY CLASSIFICATION */}
        {activeEngineTab === 'classification' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-pink-400" />
                  <span>Engine 08: Scam Classification Engine</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Maps evidence against the 18 standardized scam threat taxonomies.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                Confidence: {classification.confidence}%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5">
                <div className="text-xs font-mono uppercase text-slate-500 mb-1">Primary Classification</div>
                <div className="text-xl font-bold text-white">{classification.primaryCategory}</div>
                {classification.secondaryCategory && (
                  <div className="text-xs text-slate-400 mt-2">
                    Secondary Category: <span className="text-slate-300 font-medium">{classification.secondaryCategory}</span>
                  </div>
                )}
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5">
                <div className="text-xs font-mono uppercase text-slate-500 mb-1">Classification Reason</div>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {classification.reason}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 9: WEIGHTED SCORING */}
        {activeEngineTab === 'scoring' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-blue-400" />
                  <span>Engine 09: ScamShield Risk Scoring Matrix</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Calculates a weighted multi-factor threat score (0-100) prioritizing credential harvesting and payment risks.
                </p>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getSeverityBadge(riskScoring.riskLevel)}`}>
                {riskScoring.riskLevel} ({riskScoring.riskScore}%)
              </span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5 space-y-4">
              <div className="text-xs text-slate-400 leading-relaxed">
                {riskScoring.scoreExplanation}
              </div>

              <div className="border-t border-slate-800 pt-3">
                <div className="text-xs font-semibold text-slate-200 mb-2">Key Decisive Factors:</div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {riskScoring.keyReasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 10: EXPLAINABILITY 3-PILLARS */}
        {activeEngineTab === 'explainability' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-400" />
                  <span>Engine 10: Explainability Engine</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Separates facts into CONFIRMED, SUSPICIOUS, and UNKNOWN to eliminate unsupported assumptions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Confirmed */}
              <div className="bg-slate-950/60 border border-emerald-900/40 rounded-lg p-4 space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>CONFIRMED FACTS</span>
                </div>
                <p className="text-[11px] text-slate-400">Directly visible and verifiable from the raw message.</p>

                <div className="space-y-3">
                  {explainability.confirmed.map((item, i) => (
                    <div key={i} className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1 text-xs">
                      <div className="font-semibold text-slate-200">{item.detected}</div>
                      <div className="text-slate-400 text-[11px]"><strong className="text-slate-300">Evidence:</strong> {item.evidence}</div>
                      <div className="text-slate-400 text-[11px]"><strong className="text-slate-300">Safe Action:</strong> {item.safeAction}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suspicious */}
              <div className="bg-slate-950/60 border border-amber-900/40 rounded-lg p-4 space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>SUSPICIOUS PATTERNS</span>
                </div>
                <p className="text-[11px] text-slate-400">Indicators frequently seen in active scam campaigns.</p>

                <div className="space-y-3">
                  {explainability.suspicious.length > 0 ? (
                    explainability.suspicious.map((item, i) => (
                      <div key={i} className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1 text-xs">
                        <div className="font-semibold text-amber-300">{item.detected}</div>
                        <div className="text-slate-400 text-[11px]"><strong className="text-slate-300">Why Risky:</strong> {item.whyRisky}</div>
                        <div className="text-slate-400 text-[11px]"><strong className="text-slate-300">Action:</strong> {item.safeAction}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 italic">No suspicious patterns detected</div>
                  )}
                </div>
              </div>

              {/* Unknown */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>UNKNOWN / UNVERIFIED</span>
                </div>
                <p className="text-[11px] text-slate-400">Cannot be proven or disproven without external out-of-band verification.</p>

                <div className="space-y-3">
                  {explainability.unknown.map((item, i) => (
                    <div key={i} className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1 text-xs">
                      <div className="font-semibold text-slate-300">{item.detected}</div>
                      <div className="text-slate-400 text-[11px]"><strong className="text-slate-300">Reason:</strong> {item.whyRisky}</div>
                      <div className="text-slate-400 text-[11px]"><strong className="text-slate-300">Verification:</strong> {item.safeAction}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 12: TECHNICAL ANALYSIS */}
        {activeEngineTab === 'technical' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <span>Engine 12: Technical Cybersecurity Breakdown</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Analysis explained in beginner-friendly cybersecurity terminology.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {technicalAnalysis.findings.map((item, i) => (
                <div key={i} className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-200">{item.area}</span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${getSeverityBadge(item.severity)}`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ENGINE 14: QUALITY ASSURANCE */}
        {activeEngineTab === 'qa-audit' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span>Engine 14: Quality Assurance & Safety Audit</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Evaluates the report against 8 safety standards: evidence basis, calibrated certainty, zero sensitive data requests.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">QA STATUS:</span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  {qualityAssurance.finalQualityStatus} ({qualityAssurance.analysisQualityScore}/100)
                </span>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <div className="font-semibold text-slate-200 mb-1">Safety Constraints Audited</div>
                  <ul className="space-y-1 text-slate-400">
                    <li>✓ No sensitive passwords/OTP requested from user</li>
                    <li>✓ No recommendations to click suspicious links</li>
                    <li>✓ No offensive retaliatory instructions</li>
                    <li>✓ Calibrated uncertainty communicated</li>
                  </ul>
                </div>

                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <div className="font-semibold text-slate-200 mb-1">Evidence Verification</div>
                  <ul className="space-y-1 text-slate-400">
                    <li>✓ Claims anchored strictly to extracted text</li>
                    <li>✓ Assumptions tagged as UNKNOWN</li>
                    <li>✓ Proportional risk score calibration</li>
                    <li>✓ Safe alternative verification channels provided</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
