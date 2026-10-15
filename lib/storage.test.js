import test from 'node:test';
import assert from 'node:assert/strict';

const store = {};
global.localStorage = {
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
  },
  setItem(key, value) {
    store[key] = String(value);
  },
  removeItem(key) {
    delete store[key];
  },
};

const storage = await import('./storage.js');

test('recent phrases are tracked in newest-first order', () => {
  global.localStorage.removeItem('kc_recent');

  const phraseA = { kn: 'ಹಲೋ', en: 'Hello', translit: 'hallo' };
  const phraseB = { kn: 'ಧನ್ಯವಾದ', en: 'Thank you', translit: 'dhanyavaadagalu' };

  storage.addRecent(phraseA);
  storage.addRecent(phraseB);
  storage.addRecent(phraseA);

  const recent = storage.getRecent();
  assert.equal(recent.length, 2);
  assert.equal(recent[0].kn, 'ಹಲೋ');
  assert.equal(recent[1].kn, 'ಧನ್ಯವಾದ');
});

test('saved phrases keep a stable list', () => {
  global.localStorage.removeItem('kc_saved');
  global.localStorage.removeItem('kc_saved_deleted');

  const phrase = { kn: 'ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ', en: 'Stop here', translit: 'illi nillisi' };
  const saved = storage.toggleSave(phrase);

  assert.equal(saved.length, 1);
  assert.equal(storage.isSaved(phrase.kn), true);
  assert.equal(storage.toggleSave(phrase).length, 0);
  assert.deepEqual(storage.getStorageSnapshot().deletedSaved, [phrase.kn]);
  assert.equal(storage.toggleSave(phrase).length, 1);
  assert.deepEqual(storage.getStorageSnapshot().deletedSaved, []);
});

test('learning status persists by phrase', () => {
  global.localStorage.removeItem('kc_learning');

  const phrase = { kn: 'ನಮಸ್ಕಾರ', en: 'Hello' };
  storage.setLearningStatus(phrase, 'review');
  assert.equal(storage.getLearning()[phrase.kn], 'review');

  storage.setLearningStatus(phrase, 'known');
  assert.equal(storage.getLearning()[phrase.kn], 'known');
});

test('study streak counts consecutive calendar days', () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const key = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  assert.equal(storage.getStudyStreak([key(yesterday), key(today)]), 2);
  assert.equal(storage.getStudyStreak([key(today)]), 1);
});

test('signed-in storage is isolated from guest storage', () => {
  global.localStorage.removeItem('kc_saved');
  global.localStorage.removeItem('kc_saved:user-a');
  const guestPhrase = { kn: 'ಹಲೋ', en: 'Hello' };
  const accountPhrase = { kn: 'ನಮಸ್ಕಾರ', en: 'Greetings' };

  storage.setStorageUser(null);
  storage.toggleSave(guestPhrase);
  storage.setStorageUser('user-a');
  storage.toggleSave(accountPhrase);

  assert.equal(storage.getSaved()[0].en, 'Greetings');
  assert.equal(storage.getGuestSnapshot().saved[0].en, 'Hello');
  storage.setStorageUser(null);
  assert.equal(storage.getSaved()[0].en, 'Hello');
});

test('emergency card is stored locally and can be cleared', () => {
  storage.setStorageUser(null);
  const emergencyCard = { name: 'Asha', allergies: 'Peanuts' };

  storage.saveEmergencyCard(emergencyCard);
  assert.deepEqual(storage.getEmergencyCard(), emergencyCard);

  storage.clearEmergencyCard();
  assert.deepEqual(storage.getEmergencyCard(), {});
});
