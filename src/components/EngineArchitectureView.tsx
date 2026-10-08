import React from 'react';
import { ShieldCheck, Cpu, Code2, CheckCircle2, Lock, AlertTriangle } from 'lucide-react';

export const EngineArchitectureView: React.FC = () => {
  const engineList = [
    {
      num: '01',
      name: 'System Role & Safety Guardian',
      purpose: 'Enforces non-negotiable safety rules: zero credential solicitation, no link clicking, calibrated uncertainty, no retaliation advice.',
      inputs: 'User inquiry & safety boundary conditions',
      output: 'Safety policy constraints & ethical enforcement',
    },
    {
      num: '02',
      name: 'Message Analysis Engine',
      purpose: 'Deep structural extraction of 15 message parameters without reaching premature fraud conclusions.',
      inputs: 'Raw text message',
      output: 'Channel, claimed sender, organization, requested action, financial request, credential request, extracted URLs, urgency/threat/reward cues.',
    },
    {
      num: '03',
      name: 'Phishing Detection Engine',
      purpose: 'Checks for credential harvesting, fake login requests, OTP harvesting, domain impersonation, and fake security alerts.',
      inputs: 'Extracted message attributes',
      output: 'Detailed phishing indicators with evidence, severity, and overall PHISHING_RISK (LOW to CRITICAL).',
    },
    {
      num: '04',
      name: 'Social Engineering Detection Engine',
      purpose: 'Audits psychological manipulation techniques including artificial urgency, fear, authority spoofing, greed, and emotional blackmail.',
      inputs: 'Extracted message attributes',
      output: 'Technique inventory with severity & SOCIAL_ENGINEERING_RISK score (0–100).',
    },
    {
      num: '05',
      name: 'Financial Fraud Detection Engine',
      purpose: 'Scrutinizes unexpected payment requests, advance fees, cryptocurrency demands, and fake investment promises.',
      inputs: 'Extracted financial parameters',
      output: 'Fraud indicator breakdown & FINANCIAL_FRAUD_RISK score (0–100).',
    },
    {
      num: '06',
      name: 'Impersonation Detection Engine',
      purpose: 'Identifies spoofing of trusted banks, postal couriers, law enforcement, tax authorities, or distressed relatives.',
      inputs: 'Claimed entity & branding references',
      output: 'Claimed identity, impersonation detected boolean, confidence %, and risk tier.',
    },
    {
      num: '07',
      name: 'URL Risk Analysis Engine',
      purpose: 'Static inspection of domain syntax, typosquatting, look-alikes, excessive subdomains, and URL shorteners without remote connection.',
      inputs: 'Extracted URLs',
      output: 'Domain risk level, suspicious structural indicators, and technical explanation.',
    },
    {
      num: '08',
      name: 'Scam Classification Engine',
      purpose: 'Maps evidence against 18 canonical scam categories (Phishing, Bank Scam, Delivery Scam, Fake Job, OTP Scam, etc.).',
      inputs: 'Synthesis from Engines 02–07',
      output: 'PRIMARY_CATEGORY, SECONDARY_CATEGORY, confidence %, and classification rationale.',
    },
    {
      num: '09',
      name: 'ScamShield Risk Scoring Engine',
      purpose: 'Computes a non-linear weighted composite risk score (0–100) giving greatest weight to OTP/credential harvesting and financial coercion.',
      inputs: 'Multi-engine risk outputs',
      output: 'RISK_SCORE (0–100), RISK_LEVEL (LOW / MEDIUM / HIGH / CRITICAL), key decisive reasons.',
    },
    {
      num: '10',
      name: 'Explainability Engine',
      purpose: 'Translates complex threat patterns into simple prose across three distinct pillars: CONFIRMED, SUSPICIOUS, and UNKNOWN.',
      inputs: 'Detected indicators & message text',
      output: 'Clear plain-language explanations distinguishing verifiable facts from suspicious patterns and unverified assumptions.',
    },
    {
      num: '11',
      name: 'Safety Recommendation Engine',
      purpose: 'Formulates safe next steps: immediate actions, what NOT to do, independent verification methods, and emergency containment.',
      inputs: 'Risk level, scam category, message action',
      output: 'Step-by-step immediate guidance, prohibitions, and emergency protocol if victim already compromised.',
    },
    {
      num: '12',
      name: 'Technical Analysis Engine',
      purpose: 'Explains technical indicators using beginner-friendly cybersecurity terminology (social engineering vectors, credential harvesting).',
      inputs: 'Full technical findings telemetry',
      output: 'Cybersecurity area breakdown with severity & plain-English explanation.',
    },
    {
      num: '13',
      name: 'User Report Generator',
      purpose: 'Formats findings into the standardized, scannable 🛡️ SCAMSHIELD AI REPORT structure for rapid reading and sharing.',
      inputs: 'Score, level, category, reasons, recommendations',
      output: 'Standardized user report with risk metrics, reasons, detection notes, and actions.',
    },
    {
      num: '14',
      name: 'Quality Assurance Engine',
      purpose: 'Audits the generated assessment against 8 safety standards: evidence grounding, absence of over-certainty, and safety rules.',
      inputs: 'Raw message & generated output',
      output: 'QA score (0–100), missed indicators, unsupported claims check, and FINAL_QUALITY_STATUS (PASS / REVIEW).',
    },
    {
      num: '15',
      name: 'Final Decision Engine',
      purpose: 'Synthesizes all multi-agent engine outputs into a cohesive, concise, authoritative user-facing assessment.',
      inputs: 'All previous 14 module states',
      output: 'Final executive decision report ready for user presentation.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              ScamShield AI: 15-Engine Architecture & Pipeline
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive overview of the specialized modular engines orchestrating each digital safety assessment.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
            <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Strict Safety Rules</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Never solicits credentials, never clicks links, calibrated uncertainty, no retaliation advice.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
            <div className="font-semibold text-blue-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>Multi-Agent Modularization</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Separates extraction, phishing detection, psychological cues, and QA into dedicated specialized modules.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
            <div className="font-semibold text-purple-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Evidence-Grounding</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Every flagged risk must cite specific text evidence; assumptions are explicitly tagged as UNKNOWN.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {engineList.map((eng) => (
          <div
            key={eng.num}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  Engine {eng.num}
                </span>
                <h3 className="text-sm font-bold text-white">
                  {eng.name}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {eng.purpose}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-slate-950 p-2.5 rounded border border-slate-800/80">
              <div>
                <span className="text-slate-500 font-mono">INPUT:</span>{' '}
                <span className="text-slate-300">{eng.inputs}</span>
              </div>
              <div>
                <span className="text-slate-500 font-mono">OUTPUT:</span>{' '}
                <span className="text-slate-300">{eng.output}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
