'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { setStorageUser } from '../lib/storage';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '../lib/supabase/client';
import { syncAccountData } from '../lib/supabase/sync';

const SupabaseSessionContext = createContext(null);

export function useSupabaseSession() {
  return useContext(SupabaseSessionContext);
}

export default function SupabaseSession({ children }) {
  const [configured] = useState(isSupabaseConfigured);
  const [client, setClient] = useState(null);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [syncStatus, setSyncStatus] = useState({ type: 'idle', message: '' });
  const userRef = useRef(null);
  const clientRef = useRef(null);
  const syncingRef = useRef(false);
  const pendingSyncRef = useRef(false);

  async function syncUser(currentUser) {
    const supabase = clientRef.current;
    if (!supabase || !currentUser) return;
    if (syncingRef.current) {
      pendingSyncRef.current = true;
      return;
    }
    syncingRef.current = true;
    setSyncStatus({ type: 'syncing', message: 'Syncing saved phrases and progress…' });
    try {
      await syncAccountData(supabase, currentUser.id);
      if (userRef.current?.id === currentUser.id) {
        setSyncStatus({ type: 'synced', message: 'Your phrases and progress are synced.' });
      }
    } catch (error) {
      if (userRef.current?.id === currentUser.id) {
        setSyncStatus({ type: 'error', message: error.message || 'Sync failed. Check your Supabase tables and policies.' });
      }
    } finally {
      syncingRef.current = false;
      if (pendingSyncRef.current) {
        pendingSyncRef.current = false;
        const latestUser = userRef.current;
        if (latestUser) void syncUser(latestUser);
      }
    }
  }

  useEffect(() => {
    if (!configured) {
      setStorageUser(null);
      setReady(true);
      return undefined;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setReady(true);
      return undefined;
    }
    clientRef.current = supabase;
    setClient(supabase);

    let active = true;
    let syncTimer;
    const applySession = async session => {
      const nextUser = session?.user || null;
      userRef.current = nextUser;
      setStorageUser(nextUser?.id || null);
      setUser(nextUser);
      if (nextUser) await syncUser(nextUser);
      else setSyncStatus({ type: 'idle', message: '' });
      if (active) setReady(true);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => { void applySession(session); }, 0);
    });
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) setSyncStatus({ type: 'error', message: error.message });
      return applySession(data?.session);
    });

    const handleStorageChange = () => {
      if (!userRef.current) return;
      if (syncingRef.current) {
        pendingSyncRef.current = true;
        return;
      }
      window.clearTimeout(syncTimer);
      syncTimer = window.setTimeout(() => { void syncUser(userRef.current); }, 700);
    };
    window.addEventListener('kc-storage-changed', handleStorageChange);

    return () => {
      active = false;
      window.clearTimeout(syncTimer);
      window.removeEventListener('kc-storage-changed', handleStorageChange);
      subscription.unsubscribe();
      clientRef.current = null;
    };
  }, [configured]);

  const value = { configured, client, user, ready, syncStatus, syncNow: () => syncUser(userRef.current) };

  return (
    <SupabaseSessionContext.Provider value={value}>
      {ready ? children : <div className="session-loading" role="status">Loading your phrasebook…</div>}
    </SupabaseSessionContext.Provider>
  );
}