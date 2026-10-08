import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Download,
  Printer,
  ShieldCheck,
  ShieldAlert,
  Cpu,
  Lock,
  Brain,
  AlertTriangle,
  Globe,
  Layers,
  FileText,
  Volume2,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  Sliders,
  Sparkles
} from 'lucide-react';

export const PresentationView: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPresenterNotes, setShowPresenterNotes] = useState(false);

  const slides = [
    {
      id: 1,
      tag: 'SLIDE 01 // EXECUTIVE VISION',
      title: 'ScamShield AI: Digital Safety & Scam Detection Assistant',
      subtitle: 'Next-Generation Multi-Engine AI Architecture Defending Users Against Phishing, Financial Fraud & Social Engineering',
      content: {
        highlights: [
          {
            title: '15-Engine Intelligence Pipeline',
            desc: 'Multi-agent modular design dividing extraction, phishing, social engineering, financial fraud, impersonation, and scoring into specialized modules.',
            icon: Cpu,
            color: 'blue'
          },
          {
            title: 'Zero-Execution Security Guardrails',
            desc: 'Statically inspects deceptive infrastructure and links without ever executing, downloading, or connecting to attacker servers.',
            icon: Lock,
            color: 'emerald'
          },
          {
            title: 'Calibrated Threat Scoring',
            desc: 'Combines multi-factor weighted scoring (0–100%) with 3-pillar explainability: Confirmed facts, Suspicious cues, and Unknown assumptions.',
            icon: ShieldCheck,
            color: 'purple'
          }
        ],
        badge: 'SCAMSHIELD CORE v3.8',
        meta: 'Prepared for AI Studio Build Showcase'
      },
      presenterNotes: 'Welcome everyone. ScamShield AI is an evidence-based digital safety assistant engineered to solve one of the most pervasive crises in technology: online scams and social engineering. Rather than relying on a generic chatbot, ScamShield executes a rigorous 15-engine pipeline that analyzes threats with surgical precision and clear, actionable advice.'
    },
    {
      id: 2,
      tag: 'SLIDE 02 // PROBLEM STATEMENT & FRAUD LANDSCAPE',
      title: 'The Anatomy of Modern Digital Deception',
      subtitle: 'Consumer losses exceed $1 Trillion annually as attackers weaponize multi-channel psychological manipulation.',
      content: {
        stats: [
          { value: '$1.02T', label: 'Global Fraud Losses', sub: 'Reported consumer & business scam losses worldwide' },
          { value: '74%', label: 'Mobile Attack Growth', sub: 'Surge in SMS smishing, WhatsApp, & DM spear-phishing' },
          { value: '15 Min', label: 'Average Panic Window', sub: 'Artificial urgency engineered to bypass rational thought' }
        ],
        vectors: [
          {
            name: 'Synthetic Urgency & Intimidation',
            desc: '"Account suspended in 15 minutes", "Fund forfeiture imminent" — creates immediate adrenaline to force compliance.'
          },
          {
            name: 'Authority & Brand Spoofing',
            desc: 'Falsifying Chase, USPS, IRS, Microsoft, or FedEx identities using look-alike typosquatted domains.'
          },
          {
            name: 'Authentication Artifact Harvesting',
            desc: 'Soliciting 6-digit 2FA SMS passcodes, banking logins, and PINs to facilitate complete account takeovers.'
          },
          {
            name: 'Irreversible Payment Exploitation',
            desc: 'Demanding payments via untraceable crypto, advance fees, Wire, Zelle, or gift cards with zero buyer protection.'
          }
        ]
      },
      presenterNotes: 'The fraud landscape has evolved far beyond obvious spam emails. Attackers now weaponize multi-channel communications—SMS smishing, WhatsApp family impersonation, and fraudulent delivery fees. The primary vulnerability is human psychology: urgency, fear, and brand trust. ScamShield acts as an objective, calm second pair of eyes.'
    },
    {
      id: 3,
      tag: 'SLIDE 03 // 15-ENGINE PIPELINE ARCHITECTURE',
      title: 'Separation of Concerns: 15 Modular AI Engines',
      subtitle: 'Eliminating hallucinations by isolating extraction, detection, scoring, and QA into discrete specialized agents.',
      content: {
        stages: [
          {
            stage: 'Phase 1: Feature Extraction',
            engines: 'Engine 02: Message Analysis',
            details: 'Extracts 15 parameters: channel, sender, claimed org, action, financial, credentials, urgency, threats, linguistic cues without reaching premature conclusions.'
          },
          {
            stage: 'Phase 2: Threat Vector Analysis',
            engines: 'Engines 03–07: Phishing, Social Eng, Financial, Impersonation, URL Risk',
            details: 'Parallel analysis of credential harvesting, psychological manipulation (0–100), financial risk (0–100), brand impersonation, and static domain syntax.'
          },
          {
            stage: 'Phase 3: Taxonomy & Risk Scoring',
            engines: 'Engines 08–09: Classification & Weighted Scoring',
            details: 'Maps threats across 18 canonical scam categories and computes a weighted composite risk score (0–100%) prioritizing OTP & payment demands.'
          },
          {
            stage: 'Phase 4: Explainability & Safety',
            engines: 'Engines 10–13: Explainability, Recommendations, Technical, Report',
            details: 'Structures 3-pillar explainability (Confirmed, Suspicious, Unknown), safe verification steps, emergency action, and standardized user report.'
          },
          {
            stage: 'Phase 5: Safety Governance',
            engines: 'Engines 01 & 14–15: Safety Guardian, Quality Assurance, Final Decision',
            details: 'Audits output against 8 safety standards: evidence basis, calibrated certainty, and zero sensitive data requests.'
          }
        ]
      },
      presenterNotes: 'This architectural slide illustrates ScamShield\'s secret weapon: separation of concerns. Most AI systems fail by asking a single prompt to do everything. ScamShield splits the pipeline into 15 discrete engines. Engine 2 only extracts facts; Engines 3 through 7 evaluate threat dimensions; Engine 9 computes weighted scores; and Engine 14 performs a QA audit to prevent false claims.'
    },
    {
      id: 4,
      tag: 'SLIDE 04 // ENGINEERING SECURITY & GUARDRAILS',
      title: 'Zero-Execution Security & Evidence Grounding',
      subtitle: 'Engineering strict ethical guardrails so users never take unsafe actions.',
      content: {
        rules: [
          {
            title: 'Rule 1: Zero Link Execution Sandbox',
            desc: 'Engine 07 safely inspects URL structure (typosquatting, high-risk TLDs like .top/.xyz, subdomain depth, URL shorteners) without connecting to or fetching from the destination server.',
            icon: Globe
          },
          {
            title: 'Rule 2: Absolute Credential Protection',
            desc: 'ScamShield strictly prohibits asking users for passwords, 2FA OTP codes, PINs, CVVs, or account numbers. We never act as a credential middleman.',
            icon: Lock
          },
          {
            title: 'Rule 3: Calibrated Uncertainty (No AI Hallucinations)',
            desc: 'Findings are categorized into Confirmed Facts (directly visible), Suspicious Patterns (common in fraud), and Unknowns (unverified assumptions).',
            icon: ShieldCheck
          },
          {
            title: 'Rule 4: Zero Confrontation & Retaliation Prohibitions',
            desc: 'Users are strictly instructed never to engage, confront, or attempt retaliatory attacks on suspected scammers, preventing escalation and secondary scams.',
            icon: AlertTriangle
          }
        ]
      },
      presenterNotes: 'Security is about what you choose NOT to do. In digital safety, clicking a link to see where it redirects is dangerous—it can trigger drive-by malware or confirm an active phone number. That is why ScamShield uses purely static structural analysis. Furthermore, we maintain calibrated uncertainty: we clearly distinguish between proven evidence and assumptions.'
    },
    {
      id: 5,
      tag: 'SLIDE 05 // USER EXPERIENCE & INTERACTIVE SUITE',
      title: 'Human-Centered Digital Defense in Action',
      subtitle: 'Designed for accessibility, calm crisis management, and rapid family sharing.',
      content: {
        features: [
          {
            title: 'Executive Safety Report (Prompt 13)',
            desc: 'Standardized 🛡️ SCAMSHIELD AI REPORT structure with 1-click clipboard copying for sharing on WhatsApp or SMS with at-risk relatives.',
            icon: FileText
          },
          {
            title: 'Audio Briefing (Text-to-Speech)',
            desc: 'Built-in speech synthesis reading immediate safe next steps aloud for elderly, stressed, or visually impaired users in high-pressure moments.',
            icon: Volume2
          },
          {
            title: 'Emergency Rapid Response Playbook',
            desc: 'Step-by-step triage for victims who already clicked, entered an OTP, or transferred money (bank freeze numbers, credential revocation, credit freezes).',
            icon: ShieldAlert
          },
          {
            title: '8 Preloaded Attack Scenarios',
            desc: 'Real-world presets including Chase SMS, USPS Customs, "Hi Mum" WhatsApp, Crypto Arbitrage, IRS Refund, Tech Support alert, and Legitimate OTP control.',
            icon: Compass
          }
        ]
      },
      presenterNotes: 'A security tool is useless if panicked users cannot understand it. ScamShield features an Executive Report format with high typographic hierarchy, a 1-click WhatsApp copy button to warn relatives, and a speech synthesizer that reads out immediate safety steps aloud. And for users who have already compromised credentials, our Emergency Playbook provides an immediate 5-step containment checklist.'
    },
    {
      id: 6,
      tag: 'SLIDE 06 // IMPACT, DEPLOYMENT & FUTURE ROADMAP',
      title: 'Scalable Defense: Protecting Users, Carriers & Platforms',
      subtitle: 'From personal safety companion to enterprise API and telecom-grade threat intelligence.',
      content: {
        pillars: [
          {
            title: 'Everyday Consumer Shield',
            desc: 'Empowers vulnerable demographics (seniors, first-time digital banking users) with an intuitive second opinion before taking high-risk actions.',
            metric: '100% Free & Private'
          },
          {
            title: 'Telecom & SMS Gateway Screening',
            desc: 'Low-latency API deployment at carrier and SMS aggregator level to flag smishing campaigns before inbox delivery.',
            metric: '<100ms Latency Engine'
          },
          {
            title: 'Fintech & Banking Pre-Transaction Checks',
            desc: 'Integrates into peer-to-peer payment apps (Zelle, UPI, Venmo) to warn users when recipient accounts exhibit fraud triggers.',
            metric: 'Pre-Payment Friction'
          }
        ],
        roadmap: [
          'Multimodal Screenshot & Image OCR Analysis for instant screenshot uploads',
          'Browser Extension for real-time overlay on webmail, WhatsApp Web, and social media DMs',
          'Cross-Jurisdictional Reporting Integration with FTC (IdentityTheft.gov), IC3, and Action Fraud'
        ]
      },
      presenterNotes: 'Looking forward, ScamShield AI represents a blueprint for proactive consumer protection. Beyond standalone web apps, this multi-engine architecture can be integrated into telecom gateways to filter spam SMS, and embedded into banking apps prior to wire authorizations. Our upcoming roadmap includes multimodal screenshot OCR and cross-jurisdictional automated reporting.'
    }
  ];

  const current = slides[currentSlide];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const handleDownloadMarkdown = () => {
    const md = slides.map((s) => {
      return `# ${s.title}\n\n**${s.tag}**\n*${s.subtitle}*\n\n## Speaker Notes:\n${s.presenterNotes}\n\n---\n`;
    }).join('\n');

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ScamShield-AI-Presentation-Deck-6Slides.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto' : ''}`}>
      {/* Presentation Top Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                ScamShield AI Presentation Deck
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                6 SLIDES
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive project overview, architectural breakdown, and strategic impact deck.
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPresenterNotes(!showPresenterNotes)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
              showPresenterNotes
                ? 'bg-purple-950/60 text-purple-300 border-purple-800'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <span>{showPresenterNotes ? 'Hide Speaker Notes' : 'Show Speaker Notes'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            title="Download presentation as Markdown"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Deck</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between p-6 sm:p-10 transition-all duration-300">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Header */}
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">
              {current.tag}
            </span>
            <span className="text-xs font-mono text-slate-500 tabular-nums">
              Slide {current.id} of {slides.length}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight pt-2">
            {current.title}
          </h3>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            {current.subtitle}
          </p>
        </div>

        {/* Slide Body Content (Polymorphic per slide) */}
        <div className="relative z-10 py-6 my-auto">
          {/* SLIDE 1: Vision & Core Features */}
          {current.id === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {current.content.highlights?.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2.5 shadow-lg">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white">{h.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{h.desc}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* SLIDE 2: Problem Space */}
          {current.id === 2 && (
            <div className="space-y-6">
              {/* Stat row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {current.content.stats?.map((st, i) => (
                  <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-black font-mono text-rose-400 tabular-nums">{st.value}</div>
                    <div className="text-xs font-bold text-white mt-1">{st.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{st.sub}</div>
                  </div>
                ))}
              </div>

              {/* Vectors grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.content.vectors?.map((v, i) => (
                  <div key={i} className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-3.5 space-y-1">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>{v.name}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 3: Architecture Pipeline */}
          {current.id === 3 && (
            <div className="space-y-3">
              {current.content.stages?.map((stg, i) => (
                <div key={i} className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="md:w-1/3">
                    <div className="text-xs font-mono font-bold text-blue-400 uppercase">{stg.stage}</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">{stg.engines}</div>
                  </div>
                  <div className="md:w-2/3 text-xs text-slate-300 leading-relaxed border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-4">
                    {stg.details}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 4: Security Guardrails */}
          {current.id === 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.content.rules?.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">{r.title}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-10.5">
                      {r.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* SLIDE 5: User Experience & Features */}
          {current.id === 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.content.features?.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">{f.title}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-10.5">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* SLIDE 6: Impact & Roadmap */}
          {current.id === 6 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {current.content.pillars?.map((p, i) => (
                  <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="text-xs font-mono text-emerald-400 font-bold uppercase">{p.metric}</div>
                    <h4 className="text-sm font-bold text-white">{p.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-mono uppercase text-blue-400 font-bold mb-2">Upcoming Technical Roadmap</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                  {current.content.roadmap?.map((rm, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-900 p-2.5 rounded border border-slate-800">
                      <span className="text-blue-400 font-bold shrink-0">{idx + 1}.</span>
                      <span>{rm}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Slide Footer / Navigation Bar */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">Use Keyboard: [←] Prev / [→] Next</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                currentSlide === 0
                  ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentSlide === slides.length - 1}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                currentSlide === slides.length - 1
                  ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
              }`}
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Presenter Talking Points Accordion */}
      {showPresenterNotes && (
        <div className="bg-purple-950/20 border border-purple-800/40 rounded-xl p-5 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Presenter Talking Points & Script (Slide {current.id})</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            {current.presenterNotes}
          </p>
        </div>
      )}

      {/* Slide Thumbnail Navigation Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
        {slides.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`p-2.5 rounded-lg text-left border transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-400'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-500">0{s.id}</div>
              <div className="text-xs font-bold truncate mt-0.5">
                {s.title.split(':')[0]}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
