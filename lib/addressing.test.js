import test from 'node:test';
import assert from 'node:assert/strict';
import { applySelectedAddress } from './addressing.js';

test('explicit address choice prefixes the Kannada and transliteration', () => {
  const result = applySelectedAddress({
    kannada_script: 'ಮೀಟರ್ ಹಾಕಿ',
    transliteration: 'meetar haaki',
    cultural_tip: 'Use a polite tone.',
  }, 'anna');

  assert.equal(result.kannada_script, 'ಅಣ್ಣ, ಮೀಟರ್ ಹಾಕಿ');
  assert.equal(result.transliteration, 'anna, meetar haaki');
  assert.match(result.cultural_tip, /older man/);
});

test('address choice is opt-in and does not duplicate an existing title', () => {
  const payload = { kannada_script: 'ಅಕ್ಕ, ದಯವಿಟ್ಟು ಬನ್ನಿ', transliteration: 'akka, dayavittu banni' };
  assert.equal(applySelectedAddress(payload, 'none'), payload);
  assert.equal(applySelectedAddress(payload, 'akka'), payload);
  assert.equal(applySelectedAddress(payload, 'toString'), payload);
});