import test from 'node:test';
import assert from 'node:assert/strict';

const values = {};
global.localStorage = {
  getItem(key) { return Object.hasOwn(values, key) ? values[key] : null; },
  setItem(key, value) { values[key] = String(value); },
  removeItem(key) { delete values[key]; },
};
global.window = { localStorage: global.localStorage };

const storage = await import('../storage.js');
const { syncAccountData } = await import('./sync.js');

test('sync deletes an unsaved cloud phrase instead of restoring it', async () => {
  const userId = 'sync-user';
  for (const key of ['kc_saved', 'kc_saved_deleted', 'kc_learning', `kc_guest_migrated:${userId}`]) {
    global.localStorage.removeItem(key);
  }
  global.localStorage.setItem('kc_saved_deleted', JSON.stringify(['phrase-kept']));
  storage.setStorageUser(userId);
  storage.replaceSaved([], userId, false);
  storage.replaceLearning({}, userId, false);
  storage.replaceDeletedSaved(['phrase-removed'], userId);

  const database = {
    saved_phrases: [
      { user_id: userId, phrase_key: 'phrase-removed', phrase: { kn: 'phrase-removed', en: 'Old phrase' } },
      { user_id: userId, phrase_key: 'phrase-kept', phrase: { kn: 'phrase-kept', en: 'Keep this' } },
    ],
    learning_progress: [],
  };
  const supabase = {
    from(table) {
      return {
        select() {
          return { eq: async () => ({ data: database[table], error: null }) };
        },
        upsert(rows) {
          for (const row of rows) {
            database[table] = database[table].filter(existing => existing.phrase_key !== row.phrase_key);
            database[table].push(row);
          }
          return Promise.resolve({ error: null });
        },
        delete() {
          return { eq: () => ({ in: async (_column, keys) => {
            database[table] = database[table].filter(row => !keys.includes(row.phrase_key));
            return { error: null };
          } }) };
        },
      };
    },
  };

  await syncAccountData(supabase, userId);

  assert.deepEqual(database.saved_phrases.map(row => row.phrase_key), ['phrase-kept']);
  assert.deepEqual(storage.getSaved().map(phrase => phrase.kn), ['phrase-kept']);
  assert.deepEqual(storage.getStorageSnapshot().deletedSaved, []);
});