import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { executeHeuristicScamAssessment, analyzeUrlStatic } from './src/services/heuristicScamEngine.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '5mb' }));

// In development, dev server must run on port 3000 (or CLI --port). In production, use process.env.PORT.
function getPort(): number {
  const portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    return parseInt(process.argv[portArgIndex + 1], 10);
  }
  if (process.env.NODE_ENV === 'production') {
    return process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
  }
  return 3000;
}

const port = getPort();

// Initialize GoogleGenAI SDK server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_PROMPT = `You are ScamShield AI, an AI-powered digital safety and scam detection assistant.
Your purpose is to help users analyze suspicious messages, emails, SMS, WhatsApp messages, social media messages, payment requests, and digital communications with evidence-based scam risk assessments.

IMPORTANT SAFETY & OPERATIONAL RULES:
1. Never ask the user for passwords, OTPs, PINs, CVV numbers, banking credentials, or personal identifying information.
2. Never tell the user to click a suspicious link or execute anything contained in suspicious content.
3. Never claim absolute certainty unless evidence is independently verified. Clearly communicate uncertainty.
4. If there is insufficient evidence, explicitly state that the result is uncertain.
5. Do not invent evidence or make unsupported claims. Clearly distinguish between confirmed evidence, suspicious patterns, and unknown assumptions.
6. Do not generate instructions for committing fraud or bypassing security systems.

SCORING GUIDANCE (0–100):
- 0–20: LOW risk (harmless communication, legitimate alerts with no fraud triggers)
- 21–40: LOW risk (inconclusive / low evidence)
- 41–60: MEDIUM risk (some suspicious indicators present, inconclusive evidence)
- 61–80: HIGH risk (multiple strong indicators of fraud, phishing, impersonation, or urgency)
- 81–100: CRITICAL risk (strong evidence of an active attempt to obtain money, credentials, OTPs, PINs, or authentication passcodes)

WEIGHTING RULES:
Do not determine the score simply by averaging individual scores.
Give greater weight to decisive indicators such as:
- Requests for OTP / password / PIN / CVV / banking credentials
- Demands for payment, wire transfer, cryptocurrency, or advance fees
- Threatening account closure or legal prosecution
- Deceptive or look-alike URLs
- Impersonation of trusted banks, couriers (USPS, FedEx), government agencies (IRS), or family members
- High artificial urgency ("today", "15 minutes")

AVAILABLE SCAM CATEGORIES:
Phishing, Bank Scam, UPI/Payment Scam, OTP Scam, Fake Job Scam, Investment Scam, Loan Scam, Prize/Lottery Scam, Delivery Scam, Government Impersonation, Tech Support Scam, Account Takeover Attempt, Romance/Social Engineering Scam, Refund Scam, Subscription Scam, Malware Distribution, Identity Theft Attempt, Other, No obvious scam category.

You MUST return your response strictly as a JSON object adhering to this structure:
{
  "riskScore": number (0-100),
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "scamProbability": number (0-100),
  "primaryCategory": string,
  "secondaryCategory": string,
  "confidence": number (0-100),
  "summary": string,
  "reasons": [
    {
      "title": "string (e.g. 🔴 OTP Request)",
      "description": "string",
      "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
    }
  ],
  "detectedIndicators": ["Phishing", "Urgency", "Impersonation", "Payment Request", "Credential Request", "Suspicious URL", etc.],
  "confirmedEvidence": ["Information directly visible in the message"],
  "suspiciousPatterns": ["Patterns commonly associated with scams"],
  "unknownInformation": ["Information that cannot be verified from the message alone"],
  "immediateActions": ["Practical safety steps the user should immediately take"],
  "doNotDo": ["Dangerous actions the user should strictly avoid"],
  "safetyTip": "Practical golden safety rule",
  "technicalFindings": "Beginner-friendly cybersecurity explanation of detected technical vectors",
  "scoreExplanation": "Simple plain-language explanation of how the AI determined the risk score based on strongest indicators, requested info, financial demands, and urgency"
}`;

// API Routes
app.post('/api/analyze', async (req, res) => {
  const startTime = Date.now();
  const { message, url, mode } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Please paste a message before starting the analysis.' });
  }

  const trimmedMessage = message.trim();
  const trimmedUrl = url && typeof url === 'string' ? url.trim() : undefined;
  const combinedPrompt = trimmedUrl 
    ? `MESSAGE:\n${trimmedMessage}\n\nACCOMPANYING URL:\n${trimmedUrl}` 
    : `MESSAGE:\n${trimmedMessage}`;

  // Instant Turbo Mode (< 50ms)
  if (mode === 'turbo') {
    const fastAssessment = executeHeuristicScamAssessment(trimmedMessage, trimmedUrl);
    fastAssessment.durationMs = Date.now() - startTime;
    fastAssessment.model = 'ScamShield Turbo Heuristic Engine (<50ms)';
    return res.json(fastAssessment);
  }

  // Deep Gemini AI Mode
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analyze this suspicious communication with ScamShield AI:\n\n${combinedPrompt}`,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          temperature: 0.2,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        
        // Ensure riskLevel aligns with riskScore
        let calculatedLevel = parsed.riskLevel || 'LOW';
        const score = typeof parsed.riskScore === 'number' ? parsed.riskScore : 10;
        if (score >= 81) calculatedLevel = 'CRITICAL';
        else if (score >= 61) calculatedLevel = 'HIGH';
        else if (score >= 41) calculatedLevel = 'MEDIUM';
        else calculatedLevel = 'LOW';

        const assessment = {
          id: 'eval-' + Date.now().toString(36),
          timestamp: new Date().toISOString(),
          originalMessage: trimmedMessage,
          optionalUrl: trimmedUrl,
          riskScore: score,
          riskLevel: calculatedLevel,
          scamProbability: typeof parsed.scamProbability === 'number' ? parsed.scamProbability : score,
          primaryCategory: parsed.primaryCategory || 'No obvious scam category',
          secondaryCategory: parsed.secondaryCategory || '',
          confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 90,
          summary: parsed.summary || 'Assessment completed.',
          reasons: Array.isArray(parsed.reasons) ? parsed.reasons : [],
          detectedIndicators: Array.isArray(parsed.detectedIndicators) ? parsed.detectedIndicators : [],
          confirmedEvidence: Array.isArray(parsed.confirmedEvidence) ? parsed.confirmedEvidence : [],
          suspiciousPatterns: Array.isArray(parsed.suspiciousPatterns) ? parsed.suspiciousPatterns : [],
          unknownInformation: Array.isArray(parsed.unknownInformation) ? parsed.unknownInformation : [],
          immediateActions: Array.isArray(parsed.immediateActions) ? parsed.immediateActions : [],
          doNotDo: Array.isArray(parsed.doNotDo) ? parsed.doNotDo : [],
          safetyTip: parsed.safetyTip || 'Never share verification codes or passwords with anyone.',
          technicalFindings: parsed.technicalFindings || 'Technical analysis completed.',
          scoreExplanation: parsed.scoreExplanation || 'Score determined based on detected evidence and risk weighting.',
          durationMs: Date.now() - startTime,
          model: 'Gemini 3.8 Flash (Neural Deep Analysis)',
        };
        return res.json(assessment);
      }
    } catch (err: any) {
      console.warn('Gemini API call failed or encountered rate limits, running heuristic engine fallback:', err?.message || err);
    }
  }

  // Fallback to heuristic engine
  const fallbackAssessment = executeHeuristicScamAssessment(trimmedMessage, trimmedUrl);
  fallbackAssessment.durationMs = Date.now() - startTime;
  res.json(fallbackAssessment);
});

app.post('/api/url-inspect', (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL string is required.' });
  }
  const result = analyzeUrlStatic(url.trim());
  res.json(result);
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    aiConfigured: !!ai,
    engine: 'ScamShield Multi-Engine Core v3.8',
    timestamp: new Date().toISOString()
  });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`ScamShield AI server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
