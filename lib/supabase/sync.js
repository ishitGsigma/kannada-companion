import { getGuestSnapshot, getStorageSnapshot, replaceDeletedSaved, replaceLearning, replaceSaved } from '../storage.js';

function phraseKey(phrase) {
  return typeof phrase?.kn === 'string' ? phrase.kn : '';
}

export async function syncAccountData(supabase, userId) {
  if (!supabase || !userId) return;

  const storage = window.localStorage;
  const migrationKey = `kc_guest_migrated:${userId}`;
  const includeGuest = storage.getItem(migrationKey) !== 'true';
  const guest = includeGuest ? getGuestSnapshot() : { saved: [], deletedSaved: [], learning: {} };
  const local = getStorageSnapshot(userId);

  const [savedResponse, progressResponse] = await Promise.all([
    supabase.from('saved_phrases').select('phrase_key, phrase').eq('user_id', userId),
    supabase.from('learning_progress').select('phrase_key, status').eq('user_id', userId),
  ]);
  if (savedResponse.error) throw savedResponse.error;
  if (progressResponse.error) throw progressResponse.error;

  const saved = new Map();
  for (const row of savedResponse.data || []) {
    if (row.phrase?.kn) saved.set(row.phrase_key, row.phrase);
  }
  for (const phrase of [...(local.saved || []), ...(guest.saved || [])]) {
    const key = phraseKey(phrase);
    if (key) saved.set(key, phrase);
  }
  const deletedSaved = new Set([...(local.deletedSaved || []), ...(guest.deletedSaved || [])]);
  for (const key of deletedSaved) saved.delete(key);

  const learning = Object.fromEntries((progressResponse.data || []).map(row => [row.phrase_key, row.status]));
  Object.assign(learning, local.learning || {}, guest.learning || {});

  const savedRows = [...saved.entries()].map(([key, phrase]) => ({
    user_id: userId,
    phrase_key: key,
    phrase,
  }));
  const progressRows = Object.entries(learning).map(([key, status]) => ({
    user_id: userId,
    phrase_key: key,
    status,
    updated_at: new Date().toISOString(),
  }));

  if (savedRows.length) {
    const { error } = await supabase.from('saved_phrases').upsert(savedRows, { onConflict: 'user_id,phrase_key' });
    if (error) throw error;
  }
  if (deletedSaved.size) {
    const { error } = await supabase.from('saved_phrases').delete().eq('user_id', userId).in('phrase_key', [...deletedSaved]);
    if (error) throw error;
  }
  if (progressRows.length) {
    const { error } = await supabase.from('learning_progress').upsert(progressRows, { onConflict: 'user_id,phrase_key' });
    if (error) throw error;
  }

  replaceSaved([...saved.values()], userId, false);
  replaceDeletedSaved([], userId);
  replaceLearning(learning, userId, false);
  if (includeGuest) replaceDeletedSaved([], null);
  storage.setItem(migrationKey, 'true');
}