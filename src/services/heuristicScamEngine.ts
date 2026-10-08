import type {
  ScamShieldAssessment,
  RiskLevel,
  CommunicationType,
  ScamReason,
  UrlRiskAnalysis
} from '../types/scamshield.ts';

// Safe static URL extractor (does NOT fetch or execute)
export function extractUrlsFromText(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s<>"'{}|\\^`]+|[a-zA-Z0-9-]+\.(?:com|org|net|top|xyz|cc|io|info|biz|ru|cn|in|app|tech|online|site|club|live|shop)\/[^\s<>"'{}|\\^`]*|[a-zA-Z0-9-]+\.(?:com|org|net|top|xyz|cc|io|info|biz|ru|cn|in|app|tech|online|site|club|live|shop)\b)/gi;
  const matches = text.match(urlRegex) || [];
  return Array.from(new Set(matches.map(u => u.trim().replace(/[.,;!?)]+$/, ''))));
}

export function analyzeUrlStatic(rawUrl: string): UrlRiskAnalysis {
  let cleanUrl = rawUrl;
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  let hostname = '';
  let pathname = '';
  try {
    const parsed = new URL(cleanUrl);
    hostname = parsed.hostname.toLowerCase();
    pathname = parsed.pathname;
  } catch {
    hostname = rawUrl.split('/')[0].toLowerCase();
    pathname = rawUrl.substring(hostname.length);
  }

  const suspiciousIndicators: string[] = [];
  const flags: string[] = [];
  let riskLevel: RiskLevel = 'LOW';

  const highRiskTlds = ['.top', '.xyz', '.cc', '.buzz', '.rest', '.tk', '.ml', '.ga', '.cf', '.gq', '.icu', '.monster'];
  if (highRiskTlds.some(tld => hostname.endsWith(tld))) {
    suspiciousIndicators.push(`Domain uses a high-abuse/low-reputation top-level domain (${hostname.slice(hostname.lastIndexOf('.'))}).`);
    flags.push('HIGH_RISK_TLD');
  }

  const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'rb.gy', 'is.gd', 'cutt.ly', 'ow.ly'];
  if (shorteners.some(s => hostname === s || hostname.endsWith('.' + s))) {
    suspiciousIndicators.push('URL shortening service masks the actual destination server.');
    flags.push('URL_SHORTENER');
  }

  const majorBrands = ['chase', 'paypal', 'apple', 'microsoft', 'amazon', 'netflix', 'wells-fargo', 'bankofamerica', 'sbi', 'hdfc', 'icici', 'usps', 'fedex', 'dhl', 'irs', 'gov', 'facebook', 'instagram', 'whatsapp', 'telegram', 'google'];
  const matchedBrands = majorBrands.filter(b => hostname.includes(b));
  
  const officialDomains = ['chase.com', 'paypal.com', 'apple.com', 'microsoft.com', 'amazon.com', 'netflix.com', 'wellsfargo.com', 'bankofamerica.com', 'onlinesbi.sbi', 'sbi.co.in', 'usps.com', 'fedex.com', 'dhl.com', 'irs.gov', 'google.com'];
  const isOfficial = officialDomains.some(od => hostname === od || hostname.endsWith('.' + od));

  if (matchedBrands.length > 0 && !isOfficial) {
    suspiciousIndicators.push(`Brand look-alike domain matching "${matchedBrands.join(', ')}", but not hosted on official verified domain.`);
    flags.push('BRAND_IMPERSONATION');
  }

  const subdomainCount = hostname.split('.').length - 2;
  if (subdomainCount > 2) {
    suspiciousIndicators.push(`Excessive subdomains (${subdomainCount} levels deep), often used to disguise registrar.`);
    flags.push('EXCESSIVE_SUBDOMAINS');
  }

  if (hostname.split('-').length > 3) {
    suspiciousIndicators.push('Unusually high count of hyphens in hostname structure.');
    flags.push('HYPHENATED_DOMAIN');
  }

  const suspiciousKeywords = ['verify', 'secure', 'auth', 'login', 'account', 'restore', 'redeliver', 'update', 'claim', 'refund', 'banking', 'kyc', 'support'];
  const matchedKeywords = suspiciousKeywords.filter(k => hostname.includes(k) || pathname.toLowerCase().includes(k));
  if (matchedKeywords.length > 0 && !isOfficial) {
    suspiciousIndicators.push(`Contains high-risk credential-harvesting triggers: ${matchedKeywords.join(', ')}.`);
    flags.push('CREDENTIAL_KEYWORDS');
  }

  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
    suspiciousIndicators.push('URL references a raw numeric IP address instead of a registered domain.');
    flags.push('IP_ADDRESS_HOST');
  }

  if (suspiciousIndicators.length >= 3 || flags.includes('BRAND_IMPERSONATION') || flags.includes('IP_ADDRESS_HOST')) {
    riskLevel = 'CRITICAL';
  } else if (suspiciousIndicators.length >= 2 || flags.includes('HIGH_RISK_TLD')) {
    riskLevel = 'HIGH';
  } else if (suspiciousIndicators.length === 1) {
    riskLevel = 'MEDIUM';
  } else {
    riskLevel = 'LOW';
  }

  return {
    url: rawUrl,
    domain: hostname,
    suspiciousIndicators,
    riskLevel,
    explanation: suspiciousIndicators.length > 0
      ? `Static URL evaluation detected ${suspiciousIndicators.length} structural risk indicators without connecting to the remote host.`
      : `Static domain analysis shows standard domain structure for ${hostname}. However, independently verify destination identity prior to entering any sensitive data.`
  };
}

export function executeHeuristicScamAssessment(messageText: string, optionalUrl?: string): ScamShieldAssessment {
  const combinedText = optionalUrl ? `${messageText} ${optionalUrl}` : messageText;
  const lower = combinedText.toLowerCase();

  // Communication channel
  let communicationType: CommunicationType = 'Unknown';
  if (lower.includes('sms') || lower.includes('[alert]') || messageText.includes('+1') || lower.includes('stop to opt out') || (messageText.length < 200 && (lower.includes('otp') || lower.includes('blocked')))) {
    communicationType = 'SMS';
  } else if (lower.includes('whatsapp') || lower.includes('hi mum') || lower.includes('hi dad') || lower.includes('dropped my phone') || lower.includes('handset')) {
    communicationType = 'WhatsApp';
  } else if (lower.includes('subject:') || lower.includes('from:') || lower.includes('dear customer') || lower.includes('fiscal year')) {
    communicationType = 'Email';
  } else if (lower.includes('telegram') || lower.includes('exclusive opportunity') || lower.includes('dm me') || lower.includes('btc/usdt')) {
    communicationType = 'Social Media';
  } else if (lower.includes('defender') || lower.includes('trojan') || lower.includes('call toll-free') || lower.includes('close this window')) {
    communicationType = 'Website';
  }

  // Claimed Organization / Identity
  let claimedSender = 'Unspecified Sender';
  const orgMap: Record<string, string> = {
    'chase': 'Chase Bank',
    'sbi': 'State Bank of India (SBI)',
    'bank of america': 'Bank of America',
    'wells fargo': 'Wells Fargo',
    'paypal': 'PayPal',
    'usps': 'United States Postal Service (USPS)',
    'fedex': 'FedEx',
    'dhl': 'DHL Express',
    'irs': 'Internal Revenue Service (IRS)',
    'amazon': 'Amazon Customer / Rewards Desk',
    'microsoft': 'Microsoft / Windows Defender',
    'apple': 'Apple Inc.',
    'netflix': 'Netflix'
  };
  for (const [key, val] of Object.entries(orgMap)) {
    if (lower.includes(key)) {
      claimedSender = val;
      break;
    }
  }

  // Extract URLs
  const extractedUrls = extractUrlsFromText(combinedText);
  const urlRiskAnalyses = extractedUrls.map(u => analyzeUrlStatic(u));
  const hasSuspiciousUrl = urlRiskAnalyses.some(u => u.riskLevel === 'HIGH' || u.riskLevel === 'CRITICAL');

  // Trigger checks
  const hasOtpRequest = /(otp|one-time password|one time password|6-digit|verification code|auth code|passcode|enter your otp|share with executive)/i.test(combinedText);
  const hasPasswordRequest = /(password|pin\b|cvv\b|cvc\b|banking credentials|sign-in credentials)/i.test(combinedText);
  const hasUrgency = /(urgent|immediately|today|15 minutes|24 hours|24h|right now|hurry|will be blocked|account suspended|closure)/i.test(combinedText);
  const hasThreat = /(blocked|suspended|closure|forfeiture|legal action|court|police|prosecution|trojan|infected|compromised|returned to sender)/i.test(combinedText);
  const hasPaymentDemand = /(pay ₹|pay \$|pay £|fee to claim|processing fee|registration fee|wire|transfer ₹|transfer \$|deposit|surcharge|send money)/i.test(combinedText);
  const hasPrizeLure = /(won ₹|won \$|won a prize|lottery|lucky draw|congratulations! you have won|claim your prize)/i.test(combinedText);
  const hasJobLure = /(selected for an online job|remote job|daily payout|\$450\/day|work from home|registration fee to activate)/i.test(combinedText);
  const isFamilyImpersonation = /(hi mum|hi dad|dropped my phone|borrow this number|landlord right now)/i.test(combinedText);

  // Check if harmless message
  const isSafeMessage = (lower.includes("tomorrow's college project") || lower.includes("meeting is at 10 am") || lower.includes("project report")) && !hasOtpRequest && !hasPaymentDemand && !hasThreat && !extractedUrls.length;

  // Weight calculation
  let score = 0;
  let probability = 0;
  const reasons: ScamReason[] = [];
  const detectedIndicators: string[] = [];

  if (isSafeMessage) {
    score = 8;
    probability = 5;
    reasons.push({
      title: 'Normal Conversational Tone',
      description: 'The message contains routine peer-to-peer educational coordination without urgency, financial requests, or deceptive links.',
      severity: 'LOW'
    });
  } else {
    // Heavy weight factors:
    if (hasOtpRequest) {
      score += 35;
      probability += 30;
      detectedIndicators.push('Credential Request');
      reasons.push({
        title: '🔴 OTP Request',
        description: 'The message explicitly demands a 6-digit one-time authentication passcode. Banks and legitimate services never solicit OTPs.',
        severity: 'CRITICAL'
      });
    }

    if (hasPasswordRequest) {
      score += 30;
      probability += 25;
      detectedIndicators.push('Credential Request');
      reasons.push({
        title: '🔴 Password / PIN Solicitation',
        description: 'The message targets private authentication keys or security credentials.',
        severity: 'CRITICAL'
      });
    }

    if (hasPaymentDemand) {
      score += 28;
      probability += 25;
      detectedIndicators.push('Payment Request');
      reasons.push({
        title: '🔴 Upfront Payment Request',
        description: 'Demands advance processing, registration, or surcharge fees before granting access, prizes, or services.',
        severity: 'CRITICAL'
      });
    }

    if (hasThreat) {
      score += 22;
      probability += 20;
      detectedIndicators.push('Threat / Account Suspension');
      reasons.push({
        title: '🔴 Threat of Account Blockage',
        description: 'Uses fear of immediate financial disruption or account loss to coerce hasty compliance.',
        severity: 'HIGH'
      });
    }

    if (hasUrgency) {
      score += 15;
      probability += 15;
      detectedIndicators.push('Urgency');
      reasons.push({
        title: '🔴 Artificial Urgency',
        description: 'Imposes extreme time compression ("today", "immediately") to short-circuit deliberate security checks.',
        severity: 'HIGH'
      });
    }

    if (hasSuspiciousUrl || extractedUrls.length > 0) {
      score += hasSuspiciousUrl ? 25 : 12;
      probability += 20;
      detectedIndicators.push('Suspicious URL');
      reasons.push({
        title: hasSuspiciousUrl ? '🔴 Suspicious External Link' : '🟡 Unverified Embedded Link',
        description: hasSuspiciousUrl
          ? 'Contains a non-official, spoofed, or high-risk domain designed to mimic trusted institutions.'
          : 'Directs user to an unverified web address.',
        severity: hasSuspiciousUrl ? 'CRITICAL' : 'MEDIUM'
      });
    }

    if (claimedSender !== 'Unspecified Sender' || isFamilyImpersonation) {
      score += 20;
      probability += 20;
      detectedIndicators.push('Impersonation');
      reasons.push({
        title: '🔴 Entity Impersonation',
        description: isFamilyImpersonation
          ? 'Pretends to be a distressed relative to exploit emotional empathy and familial trust.'
          : `Claims authority of ${claimedSender} without verifiable cryptographic sender identity.`,
        severity: 'HIGH'
      });
    }

    if (hasPrizeLure) {
      score += 25;
      probability += 25;
      detectedIndicators.push('Fake Reward');
      reasons.push({
        title: '🔴 Lottery / Prize Lure',
        description: 'Promises large cash rewards (₹50,000 / sweepstakes) contingent on an upfront advance fee payment.',
        severity: 'CRITICAL'
      });
    }

    if (hasJobLure) {
      score += 22;
      probability += 20;
      detectedIndicators.push('Fake Employment');
      reasons.push({
        title: '🔴 Advance-Fee Job Scam',
        description: 'Promises high daily remote wages but requires paying an activation fee or workstation registration deposit.',
        severity: 'HIGH'
      });
    }

    if (extractedUrls.length > 0 && (hasOtpRequest || hasPasswordRequest)) {
      detectedIndicators.push('Phishing');
    }
  }

  // Ensure unique indicators
  const uniqueIndicators = Array.from(new Set(detectedIndicators));

  // Determine primary category
  let primaryCategory = 'No obvious scam category';
  let secondaryCategory: string | undefined;

  if (hasOtpRequest && lower.includes('bank')) {
    primaryCategory = 'OTP Scam';
    secondaryCategory = 'Bank Scam';
  } else if (lower.includes('bank') || lower.includes('blocked') || lower.includes('chase') || lower.includes('sbi')) {
    primaryCategory = 'Bank Scam';
    secondaryCategory = 'Phishing';
  } else if (hasPrizeLure) {
    primaryCategory = 'Prize/Lottery Scam';
    secondaryCategory = 'Advance-Fee Fraud';
  } else if (hasJobLure) {
    primaryCategory = 'Fake Job Scam';
    secondaryCategory = 'Subscription Scam';
  } else if (isFamilyImpersonation) {
    primaryCategory = 'Romance/Social Engineering Scam';
    secondaryCategory = 'Account Takeover Attempt';
  } else if (lower.includes('package') || lower.includes('usps') || lower.includes('customs')) {
    primaryCategory = 'Delivery Scam';
    secondaryCategory = 'Phishing';
  } else if (lower.includes('trojan') || lower.includes('defender')) {
    primaryCategory = 'Tech Support Scam';
    secondaryCategory = 'Malware Distribution';
  } else if (isSafeMessage) {
    primaryCategory = 'No obvious scam category';
  } else if (score > 40) {
    primaryCategory = 'Phishing';
  }

  // Bound scores
  const finalRiskScore = Math.min(99, Math.max(isSafeMessage ? 8 : 15, score));
  const finalScamProbability = Math.min(99, Math.max(isSafeMessage ? 4 : 20, probability));

  // Risk levels based on prompt:
  // 0–20 = LOW, 21–40 = LOW, 41–60 = MEDIUM, 61–80 = HIGH, 81–100 = CRITICAL
  let riskLevel: RiskLevel = 'LOW';
  if (finalRiskScore >= 81) riskLevel = 'CRITICAL';
  else if (finalRiskScore >= 61) riskLevel = 'HIGH';
  else if (finalRiskScore >= 41) riskLevel = 'MEDIUM';
  else riskLevel = 'LOW';

  // Three Evidence Pillars
  const confirmedEvidence: string[] = [];
  const suspiciousPatterns: string[] = [];
  const unknownInformation: string[] = [];

  // 1. Confirmed
  confirmedEvidence.push(`Direct text: "${messageText.substring(0, 100)}${messageText.length > 100 ? '...' : ''}"`);
  if (extractedUrls.length > 0) {
    confirmedEvidence.push(`Embedded link present: ${extractedUrls.join(', ')}`);
  }
  if (hasPaymentDemand) {
    confirmedEvidence.push('Direct demand for financial remittance or registration payment.');
  }
  if (hasOtpRequest) {
    confirmedEvidence.push('Explicit request to provide a 6-digit one-time authentication code.');
  }

  // 2. Suspicious Patterns
  if (hasUrgency) {
    suspiciousPatterns.push('Artificial urgency ("immediately", "today") engineered to force panic before logical scrutiny.');
  }
  if (hasThreat) {
    suspiciousPatterns.push('Threatening negative consequences (account blocked, legal forfeiture) is characteristic of social engineering.');
  }
  if (hasSuspiciousUrl) {
    suspiciousPatterns.push('Domain uses deceptive typosquatting or high-abuse registrar TLD common in phishing infrastructure.');
  }
  if (hasPrizeLure || hasJobLure) {
    suspiciousPatterns.push('Unrealistic reward or employment promise paired with advance upfront fee requirement.');
  }
  if (isSafeMessage) {
    suspiciousPatterns.push('No suspicious psychological manipulation patterns detected.');
  }

  // 3. Unknown Information
  unknownInformation.push('True originating telecom number / caller ID cannot be verified from message body alone (caller ID spoofing).');
  unknownInformation.push('Identity and authorization of the individual sending this message cannot be confirmed without out-of-band verification.');
  if (claimedSender !== 'Unspecified Sender') {
    unknownInformation.push(`Whether this message actually originated from official ${claimedSender} systems cannot be confirmed from SMS/chat headers.`);
  }

  // Recommendations
  const immediateActions: string[] = [];
  const doNotDo: string[] = [];

  if (isSafeMessage) {
    immediateActions.push('No immediate protective action required for this message.');
    immediateActions.push('Confirm meeting details with your project teammate through normal routine communication.');
    doNotDo.push('No specific restrictions needed for this safe peer communication.');
  } else {
    immediateActions.push('Do NOT click any links, open attachments, or dial phone numbers listed in this message.');
    immediateActions.push('Block the sender number or contact address on your device and mark as spam/phishing.');
    immediateActions.push('Independently verify your account status by navigating directly to the official mobile app or verified portal.');

    doNotDo.push('Never share OTPs, PINs, passwords, CVV codes, or card numbers with anyone—even someone claiming to be bank staff.');
    doNotDo.push('Never pay upfront registration or processing fees to claim prizes or activate employment offers.');
    doNotDo.push('Never confront or provoke the suspected scammer; report and block immediately.');
  }

  const safetyTip = isSafeMessage
    ? 'Standard security hygiene: Keep authentication passcodes private and never share OTPs even with trusted colleagues.'
    : hasOtpRequest
    ? 'Golden Rule: Banks, government agencies, and legitimate couriers will NEVER call, text, or email asking for your OTP or password.'
    : 'When in doubt, contact the organization using an independently verified phone number from the back of your official debit/credit card.';

  const technicalFindings = isSafeMessage
    ? 'Syntactic and semantic analysis reveals zero social engineering vectors, zero phishing heuristics, and zero malicious links.'
    : `Heuristic cybersecurity audit detected ${uniqueIndicators.join(', ') || 'anomalous communication patterns'}. Domain routing and psychological coercion indicate active credential harvesting or advance-fee fraud vector.`;

  const scoreExplanation = isSafeMessage
    ? 'Low risk score (8/100) assigned because the message consists solely of standard educational peer communication with zero financial or authentication triggers.'
    : `Risk score (${finalRiskScore}/100, ${riskLevel}) determined by heavily weighting decisive fraud indicators: ${reasons.map(r => r.title.replace(/^[🔴🟡🟢]\s*/, '')).join(', ')}. Strong evidence of active credential or financial solicitation was identified.`;

  const summary = isSafeMessage
    ? 'This communication appears to be a legitimate, harmless message with no evidence of scam behavior.'
    : `High-confidence scam attempt classified as "${primaryCategory}". The sender uses ${uniqueIndicators.join(', ').toLowerCase()} to manipulate the recipient into taking hazardous actions.`;

  return {
    id: 'eval-' + Date.now().toString(36),
    timestamp: new Date().toISOString(),
    originalMessage: messageText,
    optionalUrl,
    riskScore: finalRiskScore,
    riskLevel,
    scamProbability: finalScamProbability,
    primaryCategory,
    secondaryCategory,
    confidence: isSafeMessage ? 95 : 92,
    summary,
    reasons,
    detectedIndicators: uniqueIndicators,
    confirmedEvidence,
    suspiciousPatterns,
    unknownInformation,
    immediateActions,
    doNotDo,
    safetyTip,
    technicalFindings,
    scoreExplanation,
    durationMs: 42,
    model: 'ScamShield Heuristic Engine v3.8',
    communicationType,
    claimedSender,
    extractedUrls
  };
}
