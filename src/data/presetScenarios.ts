import { ScamScenarioPreset } from '../types/scamshield';

export const PRESET_SCENARIOS: ScamScenarioPreset[] = [
  {
    id: 'bank-freeze-sms',
    title: 'Bank Security Alert: Immediate Suspension SMS',
    category: 'Bank Scam / Phishing',
    riskLevel: 'CRITICAL',
    channel: 'SMS',
    senderPreview: '+1 (800) 555-0199 [ALERT]',
    description: 'Classic banking credential phishing pretext using artificial urgency and threats of permanent account freeze.',
    messageText: `[CHASE-ALERT] Your Online Banking access has been locked due to unauthorized sign-in attempts from IP 192.168.1.1. To restore your checking privileges and avoid permanent closure, verify your identity immediately: https://chase-security-restore-auth99.com/verify?id=9201. Failure to respond within 15 minutes will result in total fund forfeiture.`
  },
  {
    id: 'delivery-customs-sms',
    title: 'Delivery Service: Unpaid Customs Surcharge',
    category: 'Delivery Scam',
    riskLevel: 'HIGH',
    channel: 'SMS',
    senderPreview: 'USPS-PostDesk',
    description: 'Impersonates courier/postal logistics demanding small nominal payments via disguised link to capture credit card numbers.',
    messageText: `USPS: Package #US-98214-B arrived at distribution hub but is on hold due to missing street number and an unpaid $2.65 customs redelivery surcharge. Update parcel info & settle fee within 24h at: https://usps-track-parcel-portal.top/redeliver or package will be returned to sender.`
  },
  {
    id: 'whatsapp-family-emergency',
    title: 'WhatsApp: "Hi Mum" Broken Phone Emergency',
    category: 'Romance/Social Engineering Scam',
    riskLevel: 'CRITICAL',
    channel: 'WhatsApp',
    senderPreview: '+44 7911 123456 (Unknown)',
    description: 'Emotional manipulation and relationship exploitation claiming a family member lost their phone and desperately needs urgent bill payments.',
    messageText: `Hi Mum! Dropped my phone in the sink and had to borrow this temporary work number. Can you save it? Also I'm in a huge panic, my apartment rent is due today and my banking app won't let me sign in on this new handset until tomorrow. Could you please wire £850 to my landlord's account right now? I will repay you first thing tomorrow morning!! Sort: 40-47-84 Acc: 98124501.`
  },
  {
    id: 'crypto-guaranteed-returns',
    title: 'Social Media: Guaranteed 400% Crypto Arbitrage',
    category: 'Investment Scam',
    riskLevel: 'CRITICAL',
    channel: 'Social Media',
    senderPreview: '@ApexAlphaTrader_VIP',
    description: 'Advance-fee investment fraud using greed, artificial scarcity, and promises of zero-risk guaranteed profits.',
    messageText: `EXCLUSIVE OPPORTUNITY: Join the Goldman-backed automated BTC/USDT flash-arbitrage algorithm. Verified 450% return in 48 hours guaranteed with zero downside risk. Only 3 investor slots remaining for this trading cycle. Send minimum 0.05 BTC ($3,200) to our audited smart contract vault at bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh to initiate automatic trading profits.`
  },
  {
    id: 'government-tax-refund',
    title: 'Tax Authority: Unclaimed Rebate OTP Request',
    category: 'Government Impersonation / OTP Scam',
    riskLevel: 'CRITICAL',
    channel: 'Email',
    senderPreview: 'refunds@internal-revenue-service-portal.net',
    description: 'Government impersonation attempting to steal banking credentials and 2FA authentication codes under the guise of an unclaimed refund.',
    messageText: `INTERNAL REVENUE SERVICE NOTICE: You have an unclaimed federal tax rebate of $1,428.50 pending for fiscal year 2024. Due to direct deposit mismatch, processing is pending. Sign in to your authorized banking portal via https://irs-direct-deposit-portal.org/refund-claim to confirm your routing details and submit the 6-digit authentication passcode received on your mobile device.`
  },
  {
    id: 'remote-job-recruiter',
    title: 'WhatsApp Job Offer: $450/day Remote Data Reviewer',
    category: 'Fake Job Scam',
    riskLevel: 'HIGH',
    channel: 'WhatsApp',
    senderPreview: 'Global HR Talent Recruiter',
    description: 'Fake employment scam requiring candidate to deposit advance equipment fees or cryptocurrency for "task validation".',
    messageText: `Greetings! I am Sarah from Amazon Global Recruitment. We reviewed your CV and selected you for our Remote App Review Specialist position ($45–$80/hour, flexible 2 hours/day). No experience needed. Daily payout via USDT or direct wire. To receive your initial starter training package and corporate laptop dispatch, contact our supervisor on Telegram: @AmazonRecruitTask_Official and deposit the $150 refundable workstation registration bond.`
  },
  {
    id: 'tech-support-popup',
    title: 'Tech Support: "Trojan Virus Detected" Critical Alert',
    category: 'Tech Support Scam',
    riskLevel: 'HIGH',
    channel: 'Website',
    senderPreview: 'SYSTEM ALERT // MICROSOFT SECURITY CENTER',
    description: 'Fear-inducing scareware claiming device infection, demanding direct telephone call to fraudulent call center.',
    messageText: `CRITICAL ALERT: Windows Defender has detected Trojan:Win32/Spyware.MalwareX infected on your workstation. Financial credentials, passwords, and webcam streams are actively leaking. DO NOT RESTART YOUR COMPUTER OR CLOSE THIS WINDOW. Call Microsoft Certified Network Engineers immediately at 1-888-910-3321 (Toll-Free) to run diagnostic tools and purge the malicious payload.`
  },
  {
    id: 'legitimate-bank-alert',
    title: 'Genuine Transaction OTP (Control / Non-Scam Sample)',
    category: 'No obvious scam category',
    riskLevel: 'LOW',
    channel: 'SMS',
    senderPreview: 'Chase Bank (Verified Shortcode 24273)',
    description: 'Legitimate bank notification providing verification code with standard warning not to share the OTP.',
    messageText: `Chase: 849201 is your one-time verification code for an online purchase of $42.15 at Target. Do NOT share this code with anyone. Chase will NEVER call, text, or email asking for this code. If you did not make this request, call the number on the back of your card immediately.`
  }
];
