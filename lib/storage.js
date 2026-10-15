const KEY = 'kc_saved';
const DELETED_SAVED_KEY = 'kc_saved_deleted';
const RECENT_KEY = 'kc_recent';
const LEARNING_KEY = 'kc_learning';
const STUDY_DAYS_KEY = 'kc_study_days';
const EMERGENCY_CARD_KEY = 'kc_emergency_card';
const MAX_RECENT = 8;
let activeUserScope = null;

function scopedKey(key, scope = activeUserScope) {
  return scope ? `${key}:${scope}` : key;
}

function getStorage() {
  if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  if (typeof globalThis !== 'undefined' && globalThis.localStorage) return globalThis.localStorage;
  return null;
}

function readJson(key, fallback, scope = activeUserScope) {
  const storage = getStorage();
  if (!storage) return fallback;
  try {
    return JSON.parse(storage.getItem(scopedKey(key, scope)) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function writeJson(key, value, scope = activeUserScope, notify = true) {
  const storage = getStorage();
  if (!storage) return value;
  storage.setItem(scopedKey(key, scope), JSON.stringify(value));
  if (notify && typeof window !== 'undefined' && scope === activeUserScope && (key === KEY || key === LEARNING_KEY)) {
    window.dispatchEvent(new Event('kc-storage-changed'));
  }
  return value;
}

export function setStorageUser(userId) {
  activeUserScope = userId || null;
}

export function getGuestSnapshot() {
  return {
    saved: readJson(KEY, [], null),
    deletedSaved: readJson(DELETED_SAVED_KEY, [], null),
    learning: readJson(LEARNING_KEY, {}, null),
  };
}

export function getStorageSnapshot(scope = activeUserScope) {
  return {
    saved: readJson(KEY, [], scope),
    deletedSaved: readJson(DELETED_SAVED_KEY, [], scope),
    learning: readJson(LEARNING_KEY, {}, scope),
  };
}

export function replaceSaved(phrases, scope = activeUserScope, notify = true) {
  return writeJson(KEY, Array.isArray(phrases) ? phrases : [], scope, notify);
}

export function replaceLearning(learning, scope = activeUserScope, notify = true) {
  return writeJson(LEARNING_KEY, learning && typeof learning === 'object' ? learning : {}, scope, notify);
}

export function replaceDeletedSaved(phraseKeys, scope = activeUserScope) {
  return writeJson(DELETED_SAVED_KEY, Array.isArray(phraseKeys) ? phraseKeys : [], scope, false);
}

export function getEmergencyCard() {
  return readJson(EMERGENCY_CARD_KEY, {});
}

export function saveEmergencyCard(card) {
  return writeJson(EMERGENCY_CARD_KEY, card && typeof card === 'object' ? card : {});
}

export function clearEmergencyCard() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(scopedKey(EMERGENCY_CARD_KEY));
}

export function getSaved() {
  return readJson(KEY, []);
}

export function getRecent() {
  return readJson(RECENT_KEY, []);
}

export function addRecent(phrase) {
  if (!phrase || !phrase.kn) return getRecent();
  const recent = getRecent();
  const next = [phrase, ...recent.filter(p => p.kn !== phrase.kn)].slice(0, MAX_RECENT);
  return writeJson(RECENT_KEY, next);
}

export function clearRecent() {
  const storage = getStorage();
  if (!storage) return [];
  storage.removeItem(scopedKey(RECENT_KEY));
  return [];
}

export function isSaved(kn) { return getSaved().some(p => p.kn === kn); }
export function toggleSave(phrase) {
  const list = getSaved();
  const exists = list.some(p => p.kn === phrase.kn);
  const next = exists ? list.filter(p => p.kn !== phrase.kn) : [...list, phrase];
  const deleted = new Set(readJson(DELETED_SAVED_KEY, []));
  if (exists) deleted.add(phrase.kn);
  else deleted.delete(phrase.kn);
  replaceDeletedSaved([...deleted]);
  writeJson(KEY, next);
  return next;
}

export function getLearning() { return readJson(LEARNING_KEY, {}); }

export function setLearningStatus(phrase, status) {
  if (!phrase?.kn) return getLearning();
  const learning = getLearning();
  learning[phrase.kn] = status;
  return writeJson(LEARNING_KEY, learning);
}

export function recordStudyDay() {
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const days = [...new Set([...readJson(STUDY_DAYS_KEY, []), dateKey])].sort().slice(-45);
  writeJson(STUDY_DAYS_KEY, days);
  return getStudyStreak(days);
}

export function getStudyStreak(days = readJson(STUDY_DAYS_KEY, [])) {
  if (!days.length) return 0;
  const cursor = new Date();
  const todayKey = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`;
  if (!days.includes(todayKey)) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (true) {
    const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`;
    if (!days.includes(key)) return streak;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
}

export function speak(text) {
  if (!text || typeof window === 'undefined') return;

  const fallbackBrowserSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'kn-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1;

    const voices = synth.getVoices();
    const preferred =
      voices.find(v => v.lang && v.lang.toLowerCase().startsWith('kn')) ||
      voices.find(v => v.lang && v.lang.toLowerCase().startsWith('hi')) ||
      voices.find(v => v.default) ||
      voices[0];

    if (preferred) utterance.voice = preferred;

    synth.cancel();
    synth.speak(utterance);
  };

  fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'TTS request failed');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => URL.revokeObjectURL(url);
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        fallbackBrowserSpeech();
      };

      audio.play().catch(() => {
        URL.revokeObjectURL(url);
        fallbackBrowserSpeech();
      });
    })
    .catch(() => {
      fallbackBrowserSpeech();
    });
}
