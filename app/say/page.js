'use client';
import { useEffect, useState } from 'react';
import PhraseCard from '../../components/PhraseCard';
import { allPhrases } from '../../lib/packs';
import { ADDRESS_OPTIONS } from '../../lib/addressing';
import { addRecent, getRecent, speak } from '../../lib/storage';

const norm = s => s.toLowerCase().replace(/[?.!,]/g, '').trim();
const words = s => (norm(s).match(/[a-z]+/g) || []).filter(w => w.length > 2);

function suggest(q) {
  const qw = words(q);
  if (!qw.length) return [];
  return allPhrases()
    .map(p => ({ p, score: words(p.en).filter(w => qw.includes(w)).length }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.p);
}

export default function SayIt() {
  const [text, setText] = useState('');
  const [context, setContext] = useState('auto driver');
  const [tone, setTone] = useState('polite');
  const [address, setAddress] = useState('none');
  const [result, setResult] = useState(null);
  const [label, setLabel] = useState('');
  const [conversation, setConversation] = useState([]);
  const [incomingText, setIncomingText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [bridgeLoading, setBridgeLoading] = useState(false);
  const [bridgeError, setBridgeError] = useState('');
  const [similar, setSimilar] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { setRecent(getRecent()); }, []);

  const saveRecent = phrase => {
    if (!phrase || !phrase.kn) return;
    addRecent(phrase);
    setRecent(getRecent());
  };

  async function go() {
    setError(''); setResult(null);
    setConversation([]); setBridgeError(''); setSimilar([]);
    const q = text.trim();
    if (!q) {
      setError('Enter a phrase to translate.');
      return;
    }
    const close = suggest(q);
    setSimilar(close);

    const hit = allPhrases().find(p => norm(p.en) === norm(q));
    if (hit && address === 'none') {
      setResult(hit);
      setLabel(hit.verified ? 'Verified' : 'Phrase bank');
      setConversation([{ speaker: 'you', phrase: hit, label: hit.verified ? 'Verified' : 'Phrase bank' }]);
      setSimilar([]);
      saveRecent(hit);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/say', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: q, context, tone, address }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      const aiPhrase = { en: q, kn: data.kannada_script, translit: data.transliteration, tip: data.cultural_tip, replies: data.likely_reply ? [data.likely_reply] : [], verified: false };
      const aiLabel = data.fallback_used ? 'Phrasebook suggestion' : data.provider === 'sarvam' ? 'Sarvam AI' : 'AI-generated';
      setResult(aiPhrase);
      setLabel(aiLabel);
      setConversation([{ speaker: 'you', phrase: aiPhrase, label: aiLabel }]);
      setSimilar([]);
      saveRecent(aiPhrase);
      if (data.fallback_used) setError('AI translation is unavailable right now. This is the closest phrasebook match, not a translation of your sentence.');
      else if (data.confidence === 'low') setError('Low confidence: please double-check this with a local.');
    } catch (e) {
      const reason = e.message ? ` (${e.message})` : '';
      setError(close.length
        ? `The AI could not answer right now${reason}. Here are the closest phrases from our phrasebook:`
        : `The AI could not answer right now${reason}. Please try again in a moment.`);
    }
    setLoading(false);
  }

  function useLikelyReply(reply) {
    const phrase = { en: reply.en, kn: reply.kn, translit: reply.translit, verified: false };
    setConversation(current => [...current, { speaker: 'them', phrase, label: 'Likely reply' }]);
    setBridgeError('');
  }

  async function interpretIncomingReply() {
    const heard = incomingText.trim();
    if (!heard || bridgeLoading) return;
    setBridgeLoading(true);
    setBridgeError('');
    try {
      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: heard }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not interpret that reply');
      const phrase = { en: data.english, kn: heard, translit: '', verified: false };
      setConversation(current => [...current, { speaker: 'them', phrase, label: 'Heard reply' }]);
      setIncomingText('');
    } catch (e) {
      setBridgeError(e.message || 'Could not interpret that reply. Try again.');
    } finally {
      setBridgeLoading(false);
    }
  }

  async function translateMyResponse() {
    const q = responseText.trim();
    if (!q || bridgeLoading) return;
    const phraseHit = allPhrases().find(phrase => norm(phrase.en) === norm(q));
    if (phraseHit && address === 'none') {
      const phraseLabel = phraseHit.verified ? 'Verified' : 'Phrase bank';
      setResult(phraseHit);
      setLabel(phraseLabel);
      setConversation(current => [...current, { speaker: 'you', phrase: phraseHit, label: phraseLabel }]);
      saveRecent(phraseHit);
      setResponseText('');
      setBridgeError('');
      return;
    }

    setBridgeLoading(true);
    setBridgeError('');
    try {
      const response = await fetch('/api/say', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: q, context, tone, address }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not translate your response');
      const phrase = { en: q, kn: data.kannada_script, translit: data.transliteration, tip: data.cultural_tip, replies: data.likely_reply ? [data.likely_reply] : [], verified: false };
      const responseLabel = data.fallback_used ? 'Phrasebook suggestion' : data.provider === 'sarvam' ? 'Sarvam AI' : 'AI-generated';
      setResult(phrase);
      setLabel(responseLabel);
      setConversation(current => [...current, { speaker: 'you', phrase, label: responseLabel }]);
      saveRecent(phrase);
      setResponseText('');
      if (data.fallback_used) setBridgeError('AI translation is unavailable; this is a phrasebook suggestion, not a translation of your response.');
    } catch (e) {
      setBridgeError(e.message || 'Could not translate your response. Try again.');
    } finally {
      setBridgeLoading(false);
    }
  }

  const lastTurn = conversation[conversation.length - 1];

  return (
    <>
      <div className="say-intro"><p className="eyebrow">English in, Kannada out</p><h1>Say what you need.</h1><p className="sub">Get a natural phrase for the person and moment you have in mind.</p></div>
      <div className="say-layout">
        <section className="say-form" aria-label="Translate a phrase">
          <label>What do you want to say?
            <textarea rows={4} placeholder="e.g. Does this bus go to Majestic?" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') go(); }} />
          </label>
          <div className="say-options">
            <label>Who are you speaking to?
              <select value={context} onChange={e => setContext(e.target.value)}>{['auto driver', 'shopkeeper', 'doctor / pharmacist', 'colleague', 'boss / senior', 'stranger'].map(c => <option key={c}>{c}</option>)}</select>
            </label>
            <label>Speaking style
              <select value={tone} onChange={e => setTone(e.target.value)}><option>polite</option><option>casual</option></select>
            </label>
            <label className="say-address">Optional address word
              <select value={address} onChange={e => setAddress(e.target.value)}>{ADDRESS_OPTIONS.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}</select>
              <small>Choose it yourself; age and gender are never inferred.</small>
            </label>
          </div>
          <button className="primary say-submit" onClick={go} disabled={loading}>{loading ? 'Finding your phrase…' : 'Translate phrase'} <span aria-hidden="true">↗</span></button>
          {error && <p className="warn" role="status">{error}</p>}
          {loading && <div className="skeleton" aria-label="Translation loading" />}
        </section>
        <section className="say-output" aria-live="polite">
          {result ? <>
            <h2>Your conversation</h2>
            <div className="conversation-thread" role="log" aria-label="Conversation turns">
              {conversation.map((turn, index) => (
                <div key={`${turn.speaker}-${index}`} className={`conversation-turn ${turn.speaker}`}>
                  <p className="conversation-speaker">{turn.speaker === 'you' ? 'You say' : 'They say'}{turn.speaker === 'them' && turn.label === 'Likely reply' ? ' · suggested' : ''}</p>
                  <PhraseCard phrase={turn.phrase} label={turn.label} onReplySelect={turn.speaker === 'you' && index === conversation.length - 1 ? useLikelyReply : undefined} />
                </div>
              ))}
            </div>
            {lastTurn?.speaker === 'you' && <section className="conversation-form" aria-label="Interpret their reply">
              <label>What did they say in Kannada?
                <textarea rows={2} value={incomingText} onChange={event => setIncomingText(event.target.value)} placeholder="Type the Kannada words you heard" />
              </label>
              <button onClick={interpretIncomingReply} disabled={bridgeLoading || !incomingText.trim()}>{bridgeLoading ? 'Interpreting…' : 'Translate their reply'}</button>
            </section>}
            {lastTurn?.speaker === 'them' && <section className="conversation-form" aria-label="Translate your next response">
              <label>What do you want to say next?
                <textarea rows={2} value={responseText} onChange={event => setResponseText(event.target.value)} placeholder="Type your next response in English" />
              </label>
              <button className="primary" onClick={translateMyResponse} disabled={bridgeLoading || !responseText.trim()}>{bridgeLoading ? 'Translating…' : 'Translate my response'}</button>
            </section>}
            {bridgeError && <p className="warn" role="status">{bridgeError}</p>}
          </> : <div className="empty-state"><h2>Ready when you are</h2><p>Your Kannada phrase will appear here.</p></div>}
          {similar.length > 0 && <><h2>Closest phrasebook matches</h2>{similar.map(p => <PhraseCard key={p.kn} phrase={p} />)}</>}
          {recent.length > 0 && <div className="card recent-list"><h2>Recently used</h2>{recent.slice(0, 4).map((p, idx) => <div key={`${p.kn}-${idx}`} className="recent-item"><div><strong>{p.kn}</strong><small>{p.en}</small></div><div className="recent-actions"><button onClick={() => setText(p.en)} aria-label={`Use phrase: ${p.en}`} title="Use phrase">↶</button><button onClick={() => speak(p.kn)} aria-label={`Play: ${p.en}`} title="Play audio">▶</button></div></div>)}</div>}
        </section>
      </div>
    </>
  );
}