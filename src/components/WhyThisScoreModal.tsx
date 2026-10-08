import React from 'react';
import { ScamShieldAssessment } from '../types/scamshield.ts';
import { HelpCircle, X, ShieldAlert, KeyRound, DollarSign, Globe, UserCheck, Clock, CheckCircle2 } from 'lucide-react';

interface WhyThisScoreModalProps {
  assessment: ScamShieldAssessment;
  onClose: () => void;
}

export const WhyThisScoreModal: React.FC<WhyThisScoreModalProps> = ({
  assessment,
  onClose,
}) => {
  const {
    riskScore,
    riskLevel,
    reasons,
    detectedIndicators,
    scoreExplanation,
    confirmedEvidence,
    suspiciousPatterns,
  } = assessment;

  const hasCredentials = detectedIndicators.includes('Credential Request');
  const hasPayment = detectedIndicators.includes('Payment Request');
  const hasUrgency = detectedIndicators.includes('Urgency');
  const hasUrl = detectedIndicators.includes('Suspicious URL');
  const hasImpersonation = detectedIndicators.includes('Impersonation');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Why This Score? ({riskScore} / 100)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Beginner-friendly explanation of how ScamShield calculated this risk rating.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Executive Summary of the score */}
        <div className="my-5 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
          <span className="font-semibold text-white block">Scoring Overview:</span>
          <p>{scoreExplanation}</p>
        </div>

        {/* 6 Key Explanatory Pillars */}
        <div className="space-y-3.5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Weighted Factor Breakdown:
          </h4>

          {/* 1. Requested Credentials (OTP / Passwords) */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className={`p-2 rounded-lg ${hasCredentials ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-400'}`}>
              <KeyRound className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="font-semibold text-slate-200">Requested Information & Credentials</div>
              <p className="text-slate-400 mt-0.5 leading-relaxed">
                {hasCredentials
                  ? 'Strongest Risk Indicator: Demanding a 6-digit OTP, passcode, or banking login credentials receives the highest algorithmic penalty (+35 pts). Legitimate organizations never request authentication keys via message.'
                  : 'No requests for passwords, one-time passcodes, PINs, or banking credentials detected.'}
              </p>
            </div>
          </div>

          {/* 2. Financial Demands */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className={`p-2 rounded-lg ${hasPayment ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-400'}`}>
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="font-semibold text-slate-200">Financial Demands & Upfront Fees</div>
              <p className="text-slate-400 mt-0.5 leading-relaxed">
                {hasPayment
                  ? 'Critical Risk: Demands upfront processing fees, registration bonds, wire transfers, or cryptocurrency payments (+28 pts). Legitimate employers and lotteries never charge advance fees.'
                  : 'No unexpected advance payments, money transfer demands, or registration fees detected.'}
              </p>
            </div>
          </div>

          {/* 3. Impersonation */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className={`p-2 rounded-lg ${hasImpersonation ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="font-semibold text-slate-200">Entity & Brand Impersonation</div>
              <p className="text-slate-400 mt-0.5 leading-relaxed">
                {hasImpersonation
                  ? 'High Risk: The sender claims to represent a trusted bank, delivery courier, or distressed family member without verified cryptographic origin (+20 pts).'
                  : 'No unverified brand claims or authority spoofing detected.'}
              </p>
            </div>
          </div>

          {/* 4. Artificial Urgency */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className={`p-2 rounded-lg ${hasUrgency ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="font-semibold text-slate-200">Artificial Urgency & Time Pressure</div>
              <p className="text-slate-400 mt-0.5 leading-relaxed">
                {hasUrgency
                  ? 'Psychological Coercion: Phrases like "today", "immediately", or "15 minutes" (+15 pts) are engineered to prevent you from taking time to consult family or bank officials.'
                  : 'No artificial panic countdowns or high-pressure deadlines detected.'}
              </p>
            </div>
          </div>

          {/* 5. URL Indicators */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className={`p-2 rounded-lg ${hasUrl ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
              <Globe className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="font-semibold text-slate-200">URL & Domain Integrity</div>
              <p className="text-slate-400 mt-0.5 leading-relaxed">
                {hasUrl
                  ? 'Look-Alike Routing: Embedded web address uses non-official domains, typosquatting, or high-abuse TLDs (.top, .xyz) masking destination servers (+25 pts).'
                  : 'No deceptive or unverified web links found in message text.'}
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Got it, thanks
          </button>
        </div>
      </div>
    </div>
  );
};
