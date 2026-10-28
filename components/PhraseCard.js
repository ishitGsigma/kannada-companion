'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { isSaved, toggleSave, speak } from '../lib/storage';

export default function PhraseCard({ phrase, label, onReplySelect, onSaveChange }) {
  const [saved, setSaved] = useState(false);
  const [big, setBig] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => { setSaved(isSaved(phrase.kn)); }, [phrase.kn]);

  useEffect(() => {
    if (!big) return undefined;
    const closeOnEscape = event => {
      if (event.key === 'Escape') setBig(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [big]);

  const badge = label || (phrase.verified ? 'Verified' : 'Needs review');
  const cls = ['AI-generated', 'Sarvam AI'].includes(badge) ? 'ai' : phrase.verified ? '' : 'un';

  async function copyPhrase() {
    const text = [phrase.kn, phrase.translit, phrase.en].filter(Boolean).join(' — ');
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setFeedback('Phrase copied');
      setTimeout(() => setCopied(false), 1200);
      setTimeout(() => setFeedback(''), 1600);
    } catch {
      setCopied(false);
    }
  }

  function changeSavedState() {
    const next = toggleSave(phrase);
    const isNowSaved = next.some(item => item.kn === phrase.kn);
    setSaved(isNowSaved);
    onSaveChange?.(phrase, isNowSaved);
    setFeedback(isNowSaved ? 'Saved to My Kannada' : 'Removed from My Kannada');
    setTimeout(() => setFeedback(''), 1600);
  }

  return (
    <article className="card phrase-card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className={`badge ${cls}`}>{badge}</span>
      </div>
      <p className="kn">{phrase.kn}</p>
      {phrase.translit && <p className="tr">{phrase.translit}</p>}
      <p className="en">{phrase.en}</p>
      <div className="row phrase-actions" aria-label="Phrase actions">
        <button className="primary" onClick={() => speak(phrase.kn)} aria-label="Play Kannada audio" title="Play audio">▶ <span>Play</span></button>
        <button onClick={() => setBig(true)} aria-label="Show phrase full screen" title="Show full screen">▣ <span>Show</span></button>
        <button className="icon-button" onClick={copyPhrase} aria-label={copied ? 'Phrase copied' : 'Copy phrase'} title={copied ? 'Copied' : 'Copy'}>{copied ? '✓' : '⧉'}</button>
        <button className="icon-button" onClick={changeSavedState} aria-label={saved ? 'Remove from saved phrases' : 'Save phrase'} title={saved ? 'Unsave phrase' : 'Save phrase'}>{saved ? '★' : '☆'}</button>
      </div>
      {feedback && <span className="action-feedback" role="status" aria-live="polite">{feedback}</span>}
      {phrase.tip && <div className="tip">💡 {phrase.tip}</div>}
      {phrase.replies?.length > 0 && (
        <div className="replies"><b>They may reply:</b>
          {phrase.replies.map((r, i) => (
            <div key={i} className="reply-row"><p><b>{r.kn}</b><br /><i>{r.translit}</i> · {r.en}</p><div className="reply-actions"><button onClick={() => speak(r.kn)} aria-label={`Play reply: ${r.en}`} title="Play reply">▶</button>{onReplySelect && <button onClick={() => onReplySelect(r)} aria-label={`Continue with reply: ${r.en}`} title="Continue conversation">Use reply</button>}</div></div>
          ))}
        </div>
      )}
      {big && typeof document !== 'undefined' && createPortal(
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Kannada phrase to show" onClick={() => setBig(false)}>
          <button className="overlay-close" onClick={() => setBig(false)} aria-label="Close full-screen phrase">×</button>
          <div className="big">{phrase.kn}</div>
          {phrase.translit && <div className="tr2">{phrase.translit}</div>}
          <p className="warn">Tap anywhere or press Escape to close</p>
        </div>,
        document.body,
      )}
    </article>
  );
}
