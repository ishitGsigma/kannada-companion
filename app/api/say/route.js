import { NextResponse } from 'next/server';
import { chooseBestFallbackPhrase, validateTranslationPayload } from '../../../lib/translationQuality';
import { applySelectedAddress } from '../../../lib/addressing';

const SYSTEM = `You are a Kannada language assistant for a newcomer in Karnataka.
Translate the user's sentence into natural, SPOKEN Kannada as a local would say it, not stiff textbook Kannada.
Respect the listener and tone given. Use simple phonetic English letters for transliteration (e.g. "idara bele eshtu").
Return ONLY a JSON object with keys:
kannada_script, transliteration,
likely_reply (object: kn, translit, en),
cultural_tip (one short line or empty string),
confidence ("high" or "low"; use "low" if unsure).

Examples of the style wanted:
English: How much is this? -> ಇದರ ಬೆಲೆ ಎಷ್ಟು? (idara bele eshtu?)
English: Please use the meter -> ಮೀಟರ್ ಹಾಕಿ (meetar haaki)
English: I have a headache -> ನನಗೆ ತಲೆನೋವು ಇದೆ (nanage thale novu ide)`;

const cache = new Map();
function getModel() {
  return process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
}

function getFallbackModels() {
  const configured = (process.env.GEMINI_MODEL_FALLBACKS || 'gemini-3.6-flash,gemini-3.7-flash,gemini-3.8-flash,gemini-2.5-flash-lite')
    .split(',')
    .map(model => model.trim())
    .filter(Boolean);
  return [...new Set([getModel(), ...configured])].slice(0, 5);
}

function parseModelOutput(raw) {
  const cleaned = String(raw || '').replace(/```json|```/gi, '').trim();
  const parsed = JSON.parse(cleaned);
  return parsed;
}

async function tryModel(model, key, body) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(12000),
  });
  const data = await r.json();
  if (!r.ok) {
    const err = new Error(data?.error?.message || 'Gemini error');
    err.status = r.status;
    console.log(`[say] ${model} -> ${r.status}: ${err.message}`);
    throw err;
  }
  const raw = data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '';
  if (!raw) throw new Error(`Empty response from ${model}`);
  return parseModelOutput(raw);
}

async function trySarvamTranslation(text, tone, key) {
  const response = await fetch('https://api.sarvam.ai/translate', {
    method: 'POST',
    headers: { 'api-subscription-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: text,
      source_language_code: 'en-IN',
      target_language_code: 'kn-IN',
      model: 'mayura:v1',
      mode: tone === 'casual' ? 'modern-colloquial' : 'formal',
    }),
    signal: AbortSignal.timeout(12000),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || `Sarvam returned ${response.status}`);
  if (!data.translated_text) throw new Error('Sarvam returned an empty translation');

  return {
    kannada_script: data.translated_text,
    transliteration: '',
    likely_reply: null,
    cultural_tip: 'Translated by Sarvam AI.',
    confidence: 'low',
    provider: 'sarvam',
  };
}

function buildFallbackResponse(text, context) {
  const phrase = chooseBestFallbackPhrase(text, context);
  if (!phrase) {
    return {
      kannada_script: 'ನನಗೆ ಸಹಾಯ ಬೇಕು',
      transliteration: 'nanage sahaaya beku',
      likely_reply: { kn: 'ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಹೇಳಿ', translit: 'dayavittu nidhaanavaagi heli', en: 'Please say it more slowly' },
      cultural_tip: 'A clear, polite phrase usually works best.',
      confidence: 'low',
      fallback_used: true,
    };
  }

  return {
    kannada_script: phrase.kn,
    transliteration: phrase.translit,
    likely_reply: phrase.replies?.[0] || { kn: 'ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಹೇಳಿ', translit: 'dayavittu nidhaanavaagi heli', en: 'Please say it more slowly' },
    cultural_tip: 'This is the closest supported phrase for your situation.',
    confidence: 'low',
    fallback_used: true,
  };
}

export async function POST(req) {
  let request = {};
  try {
    request = await req.json();
    const { text, context, tone, address } = request;
    const q = String(text || '').trim();
    if (!q) return NextResponse.json({ error: 'No text provided.' }, { status: 400 });
    if (q.length > 1000) return NextResponse.json({ error: 'Keep the sentence under 1,000 characters.' }, { status: 400 });

    const key = process.env.GEMINI_API_KEY;
    const sarvamKey = process.env.SARVAM_API_KEY;
    if (!key && !sarvamKey) return NextResponse.json({ error: 'Configure a Gemini or Sarvam API key.' }, { status: 500 });

    const ck = `${context}|${tone}|${address || 'none'}|${q.toLowerCase()}`;
    if (cache.has(ck)) return NextResponse.json(cache.get(ck));

    let parsed;
    if (key) {
      const body = {
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: 'user', parts: [{ text: `Listener: ${context}\nTone: ${tone}\nSentence: ${q}` }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.2 },
      };

      const models = getFallbackModels();
      for (let index = 0; index < models.length; index += 1) {
        try {
          parsed = await tryModel(models[index], key, body);
          break;
        } catch (error) {
          const canFailOver = [404, 429, 500, 502, 503, 504].includes(error.status);
          if (canFailOver && index < models.length - 1) continue;
          break;
        }
      }
    }

    if (parsed) {
      const validation = validateTranslationPayload(parsed);
      if (validation.valid) {
        const result = applySelectedAddress(parsed, address);
        cache.set(ck, result);
        return NextResponse.json(result);
      }
      console.warn(`[say] invalid Gemini output: ${validation.reason}`);
    }

    if (sarvamKey && q.length <= 1000) {
      try {
        const sarvamResult = applySelectedAddress(await trySarvamTranslation(q, tone, sarvamKey), address);
        cache.set(ck, sarvamResult);
        return NextResponse.json(sarvamResult);
      } catch (error) {
        console.warn(`[say] Sarvam fallback failed: ${error.message}`);
      }
    }

    return NextResponse.json(applySelectedAddress(buildFallbackResponse(q, context), address));
  } catch (e) {
    const fallback = applySelectedAddress(buildFallbackResponse(String(request.text || ''), String(request.context || 'auto driver')), request.address);
    return NextResponse.json(fallback, { status: 200 });
  }
}