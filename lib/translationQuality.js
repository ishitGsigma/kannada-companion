import { allPhrases } from './packs.js';

export function normalizeText(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getKeywordTokens(value = '') {
  return normalizeText(value)
    .split(' ')
    .filter(Boolean)
    .filter(token => token.length > 2);
}

export function chooseBestFallbackPhrase(input, context = 'auto driver') {
  const q = normalizeText(input);
  if (!q) return null;

  const qTokens = getKeywordTokens(q);
  if (!qTokens.length) return null;

  const scored = allPhrases()
    .map(phrase => {
      const en = normalizeText(phrase.en);
      const phraseTokens = getKeywordTokens(en);
      const overlap = qTokens.filter(token => phraseTokens.includes(token)).length;
      const exact = en === q ? 20 : 0;
      const longerMatch = phraseTokens.filter(token => q.includes(token)).length;
      const contextBoost = context && phrase.en.toLowerCase().includes(context.toLowerCase().split(' ')[0]) ? 4 : 0;
      const score = overlap * 10 + longerMatch * 3 + exact + contextBoost;

      return { phrase, score, tokenCount: phraseTokens.length };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.tokenCount - b.tokenCount);

  return scored[0]?.phrase || null;
}

export function validateTranslationPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, reason: 'empty payload' };
  }

  if (!payload.kannada_script || typeof payload.kannada_script !== 'string') {
    return { valid: false, reason: 'missing kannada_script' };
  }

  if (!payload.transliteration || typeof payload.transliteration !== 'string') {
    return { valid: false, reason: 'missing transliteration' };
  }

  if (!payload.confidence || !['high', 'low'].includes(payload.confidence)) {
    return { valid: false, reason: 'missing confidence' };
  }

  if (payload.kannada_script.trim().length < 2) {
    return { valid: false, reason: 'kannada_script too short' };
  }

  if (payload.transliteration.trim().length < 2) {
    return { valid: false, reason: 'transliteration too short' };
  }

  if (payload.likely_reply && typeof payload.likely_reply === 'object') {
    const reply = payload.likely_reply;
    if (!reply.kn || !reply.translit || !reply.en) {
      return { valid: false, reason: 'likely_reply incomplete' };
    }
  }

  return { valid: true, reason: 'ok' };
}
