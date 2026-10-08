import { ScamScenarioPreset } from '../types/scamshield.ts';

export const PRESET_SCENARIOS: ScamScenarioPreset[] = [
  {
    id: 'bank-scam',
    title: 'Bank Scam',
    category: 'Bank Scam / Phishing',
    riskLevel: 'CRITICAL',
    channel: 'SMS',
    senderPreview: '+1 (800) 555-0199 [BANK ALERT]',
    description: 'Threatens immediate account blockage to force victim into clicking and entering banking OTP.',
    messageText: 'URGENT! Your bank account will be blocked today. Verify your account immediately by clicking this link and entering your OTP: https://chase-security-verify99.com/restore',
    optionalUrl: 'https://chase-security-verify99.com/restore'
  },
  {
    id: 'otp-scam',
    title: 'OTP Scam',
    category: 'OTP Scam / Account Takeover',
    riskLevel: 'CRITICAL',
    channel: 'SMS',
    senderPreview: 'VK-SBIBNK',
    description: 'Solicits 6-digit authentication one-time passcode to bypass multi-factor authentication.',
    messageText: 'Dear Customer, your bank account requires an immediate KYC security update. An OTP has been sent to your mobile. Enter the 6-digit passcode at https://sbi-kyc-verify-portal.top or share with executive to avoid suspension.',
    optionalUrl: 'https://sbi-kyc-verify-portal.top'
  },
  {
    id: 'prize-scam',
    title: 'Fake Prize',
    category: 'Prize/Lottery Scam',
    riskLevel: 'CRITICAL',
    channel: 'WhatsApp',
    senderPreview: 'Festive Rewards Desk',
    description: 'Lures victim with unearned jackpot and demands upfront advance processing fee.',
    messageText: 'Congratulations! You have won ₹50,000 in the Amazon Festive Lucky Draw. Pay ₹999 processing fee to claim your prize immediately: https://amazon-festive-rewards-claim.xyz/pay',
    optionalUrl: 'https://amazon-festive-rewards-claim.xyz/pay'
  },
  {
    id: 'fake-job',
    title: 'Fake Job',
    category: 'Fake Job Scam',
    riskLevel: 'HIGH',
    channel: 'Social Media',
    senderPreview: 'Global Talent HR',
    description: 'Promises lucrative daily pay but requires candidate to pay upfront registration bond.',
    messageText: 'You have been selected for an online remote job paying $450/day. Pay ₹2,000 registration fee to activate your employee portal and receive your workstation bond.',
    optionalUrl: 'https://telegram.me/GlobalTalentHR_Recruiter'
  },
  {
    id: 'safe-message',
    title: 'Safe Message',
    category: 'No obvious scam category',
    riskLevel: 'LOW',
    channel: 'WhatsApp',
    senderPreview: 'College Colleague (Moneeshwar)',
    description: 'Routine legitimate communication regarding college project meeting with zero fraud vectors.',
    messageText: "Hi Moneeshwar, tomorrow's college project meeting is at 10 AM. Please bring your project report.",
    optionalUrl: ''
  },
  {
    id: 'whatsapp-family',
    title: '"Hi Mum" Emergency',
    category: 'Romance/Social Engineering Scam',
    riskLevel: 'CRITICAL',
    channel: 'WhatsApp',
    senderPreview: 'Unknown Number (+44 7911 123456)',
    description: 'Pretends to be child with broken phone in panic needing urgent rent wire transfer.',
    messageText: "Hi Mum! Dropped my phone in the sink, had to borrow this number. I'm in a huge panic, apartment rent is due today and banking app won't let me sign in. Could you please wire £850 to my landlord right now? Repay you tomorrow morning! Sort: 40-47-84 Acc: 98124501",
    optionalUrl: ''
  },
  {
    id: 'usps-customs',
    title: 'Delivery Customs Fee',
    category: 'Delivery Scam',
    riskLevel: 'HIGH',
    channel: 'SMS',
    senderPreview: 'USPS-PostDesk',
    description: 'Demands nominal $2.65 customs redelivery surcharge via phishing link.',
    messageText: 'USPS: Package #US-98214-B is on hold due to missing street number and an unpaid $2.65 customs surcharge. Update parcel info & settle fee within 24h at: https://usps-track-parcel-portal.top/redeliver',
    optionalUrl: 'https://usps-track-parcel-portal.top/redeliver'
  }
];
