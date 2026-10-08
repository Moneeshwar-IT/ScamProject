import React from 'react';
import { AlertOctagon, PhoneCall, ShieldAlert, KeyRound, MonitorOff, FileCheck2, CreditCard } from 'lucide-react';

export const EmergencyPlaybookView: React.FC = () => {
  const steps = [
    {
      stage: 'Step 1: Immediate Financial Freeze (0–15 Minutes)',
      icon: PhoneCall,
      color: 'rose',
      title: 'Halt all fund movements and freeze compromised cards',
      actions: [
        'Call the official fraud department of your bank or credit card company immediately (use the number printed on the back of your physical card, NOT a number from the text/email).',
        'Request an immediate temporary freeze on cards, checking accounts, and online banking credentials.',
        'If payment was made via Wire, Zelle, Venmo, PayPal, or UPI, notify the platform fraud hotline immediately to request a recall or flag the recipient account.',
      ]
    },
    {
      stage: 'Step 2: Credential Lockdown & Session Eviction (15–30 Minutes)',
      icon: KeyRound,
      color: 'amber',
      title: 'Sever unauthorized attacker access to your primary email & bank',
      actions: [
        'From a SEPARATE, clean device (not the phone or laptop where the incident occurred), log into your primary email account.',
        'Change your password immediately to a strong, unique passphrase (at least 16 characters).',
        'In account settings, click "Sign out of all other sessions / devices" to evict persistent attacker cookies.',
        'Enable 2FA using an Authenticator App (Google Authenticator, Microsoft Authenticator) or security key. Avoid SMS-based 2FA if SIM-swap is suspected.',
      ]
    },
    {
      stage: 'Step 3: Device Containment & Malware Purge (30–60 Minutes)',
      icon: MonitorOff,
      color: 'blue',
      title: 'Disconnect compromised device if remote software was downloaded',
      actions: [
        'If you installed any tool (e.g. AnyDesk, TeamViewer, QuickAssist, ScreenConnect) at the caller\'s request, disconnect Wi-Fi / Ethernet immediately.',
        'Uninstall the remote assistance software completely.',
        'Restart the computer in Safe Mode and run a full antivirus / antimalware scan with Windows Defender or a verified security suite.',
      ]
    },
    {
      stage: 'Step 4: Credit Bureau Freeze & Identity Defense',
      icon: CreditCard,
      color: 'purple',
      title: 'Prevent fraudulent loans or new lines of credit',
      actions: [
        'Place a free credit freeze with the major credit bureaus (in the US: Equifax, Experian, TransUnion).',
        'A credit freeze stops anyone from opening new accounts or taking out credit cards in your name.',
        'Monitor credit reports closely for inquiries you did not authorize.',
      ]
    },
    {
      stage: 'Step 5: File Official Law Enforcement Reports',
      icon: FileCheck2,
      color: 'emerald',
      title: 'Establish a legal record of fraud for dispute resolution',
      actions: [
        'In the US: File an official report at IdentityTheft.gov (FTC) and IC3.gov (FBI Internet Crime Complaint Center).',
        'In the UK: Report to Action Fraud (actionfraud.police.uk or 0300 123 2040).',
        'In Australia: Report to ReportCyber / Scamwatch (scamwatch.gov.au).',
        'In Canada: Report to the Canadian Anti-Fraud Centre (antifraudcentre-centreantifraude.ca).',
        'Save copies of all report reference numbers to provide to your bank\'s fraud dispute unit.',
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Warning */}
      <div className="bg-rose-950/40 border border-rose-600/60 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 text-rose-400">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
              Emergency Rapid Response Protocol
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Did you already share an OTP, click a link, or send money?
            </h2>
            <p className="text-sm text-rose-200 mt-2 max-w-3xl leading-relaxed">
              Do not panic. Scammers rely on confusion and delay. Taking decisive containment actions in the first hour significantly increases the likelihood of freezing stolen funds and halting unauthorized account takeovers.
            </p>
          </div>
        </div>
      </div>

      {/* Step by step cards */}
      <div className="space-y-4">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-white">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    {st.stage}
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {st.title}
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-300">
                    {st.actions.map((act, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-blue-400 font-bold shrink-0">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* What NOT to do during emergency */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wide mb-3 flex items-center gap-2">
          <span>❌ Critical Rules During Incident Handling:</span>
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-rose-500 font-bold">•</span>
            <span><strong>Never call back the number on the suspicious message.</strong> Always look up official bank phone numbers from your physical card or monthly statement.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-500 font-bold">•</span>
            <span><strong>Do not hire "recovery hackers" on Instagram, Telegram, or Twitter.</strong> Anyone promising to "hack back your funds for a fee" is running a secondary recovery scam targeting past victims.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-500 font-bold">•</span>
            <span><strong>Do not delete the messages or emails yet.</strong> Take screenshots as evidence for your bank's fraud investigation and police report.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
