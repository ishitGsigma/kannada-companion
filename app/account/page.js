'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSupabaseSession } from '../../components/SupabaseSession';

export default function AccountPage() {
  const { configured, client, user, ready, syncStatus, syncNow } = useSupabaseSession();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function sendSignInLink(event) {
    event.preventDefault();
    if (!client || !email.trim()) return;
    setBusy(true);
    setMessage('');
    try {
      const redirectUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || window.location.origin);
      if (redirectUrl.hostname === '0.0.0.0') redirectUrl.hostname = 'localhost';
      const { error } = await client.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: `${redirectUrl.origin}/auth/callback` },
      });
      setMessage(error ? error.message : 'Check your email for a sign-in link.');
    } catch (error) {
      setMessage(error.message || 'Could not send a sign-in link. Try again later.');
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    setBusy(true);
    try {
      await syncNow();
      const { error } = await client.auth.signOut();
      setMessage(error ? error.message : 'Signed out. Guest data is still on this device.');
    } catch (error) {
      setMessage(error.message || 'Could not sign out. Try again.');
    } finally {
      setBusy(false);
    }
  }

  if (!ready) return <div className="session-loading" role="status">Loading account…</div>;

  return (
    <section className="account-page">
      <p className="eyebrow">Optional account</p>
      <h1>{user ? 'Your account' : 'Sync your Kannada'}</h1>
      <p className="sub">Guest mode stays available. Sign in to sync saved phrases and learning progress across devices.</p>

      {!configured ? (
        <div className="card">
          <h2>Supabase connection needed</h2>
          <p>Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to <code>.env.local</code>, then restart the app.</p>
        </div>
      ) : user ? (
        <div className="card account-card">
          <p><strong>Signed in as</strong><br />{user.email}</p>
          <p className={syncStatus.type === 'error' ? 'warn' : 'account-sync-status'} role="status">{syncStatus.message || 'Your account is ready.'}</p>
          <div className="row">
            <button onClick={syncNow} disabled={busy || syncStatus.type === 'syncing'}>Sync now</button>
            <button onClick={signOut} disabled={busy}>Sign out</button>
          </div>
        </div>
      ) : (
        <form className="card account-form" onSubmit={sendSignInLink}>
          {searchParams.get('auth_error') && <p className="warn" role="alert">That link expired or could not be completed. Allow http://localhost:3001/auth/callback in Supabase Redirect URLs, then request a fresh link.</p>}
          <label htmlFor="account-email">Email address</label>
          <input id="account-email" type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" required placeholder="you@example.com" />
          <button className="primary" type="submit" disabled={busy}>{busy ? 'Sending link…' : 'Email me a sign-in link'}</button>
          <p className="warn">Your saved phrases stay private to your account. Conversation text isn’t synced.</p>
        </form>
      )}

      {message && <p className="account-message" role="status">{message}</p>}
      <Link className="back-link" href="/">← Back to phrases</Link>
    </section>
  );
}