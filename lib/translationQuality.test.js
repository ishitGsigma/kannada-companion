import test from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('./translationQuality.js');

test('best fallback phrase matches common requests closely', () => {
  const phrase = mod.chooseBestFallbackPhrase('How much is this?', 'shopkeeper');
  assert.ok(phrase);
  assert.equal(phrase.en.toLowerCase(), 'how much is this?');
});

test('fallback prefers the concise phrase when matches tie', () => {
  const phrase = mod.chooseBestFallbackPhrase('hi how much is daal');
  assert.equal(phrase.en, 'How much is this?');
});

test('invalid translation payloads are rejected', () => {
  const result = mod.validateTranslationPayload({
    kannada_script: '',
    transliteration: '',
    confidence: 'low',
    likely_reply: null,
  });

  assert.equal(result.valid, false);
  assert.ok(result.reason);
});

test('valid translation payloads pass validation', () => {
  const result = mod.validateTranslationPayload({
    kannada_script: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?',
    transliteration: 'idara bele eshtu',
    likely_reply: { kn: 'ನೀವು ಅಂಗಡಿ ಪಾಳಿಮಾಡುತ್ತೀರಾ?', translit: 'neevu angadi paalimaaDutteera', en: 'Would you like a discount?' },
    cultural_tip: 'Bargaining is common in local markets.',
    confidence: 'high',
  });

  assert.equal(result.valid, true);
  assert.equal(result.reason, 'ok');
});
