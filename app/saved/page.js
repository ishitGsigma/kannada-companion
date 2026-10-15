'use client';
import { useEffect, useState } from 'react';
import PhraseCard from '../../components/PhraseCard';
import { getLearning, getRecent, getSaved, getStudyStreak, recordStudyDay, setLearningStatus, speak } from '../../lib/storage';

export default function Saved() {
  const [list, setList] = useState([]);
  const [recent, setRecent] = useState([]);
  const [mode, setMode] = useState('list');
  const [filter, setFilter] = useState('all');
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const [learning, setLearning] = useState({});
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setList(getSaved());
    setRecent(getRecent());
    setLearning(getLearning());
    setStreak(getStudyStreak());
  }, []);

  const visibleList = list.filter(phrase => filter === 'all' || learning[phrase.kn] === filter);
  const reviewQueue = list.filter(phrase => learning[phrase.kn] === 'review');
  const knownCount = list.filter(phrase => learning[phrase.kn] === 'known').length;
  const reviewCount = reviewQueue.length;
  const cur = (mode === 'review' ? reviewQueue : list)[i % Math.max(mode === 'review' ? reviewQueue.length : list.length, 1)];

  const advanceCard = () => {
    setI((prev) => prev + 1);
    setShow(false);
  };

  const markKnown = () => {
    if (cur) setLearning(setLearningStatus(cur, 'known'));
    setStreak(recordStudyDay());
    if (mode === 'review') {
      setI(prev => Math.min(prev, Math.max(reviewQueue.length - 2, 0)));
      setShow(false);
    } else {
      advanceCard();
    }
  };

  const markReview = () => {
    if (cur) setLearning(setLearningStatus(cur, 'review'));
    setStreak(recordStudyDay());
    advanceCard();
  };

  const handleSaveChange = (phrase, isNowSaved) => {
    setList(current => isNowSaved
      ? current.some(item => item.kn === phrase.kn) ? current : [...current, phrase]
      : current.filter(item => item.kn !== phrase.kn));
  };

  return (
    <>
      <p className="eyebrow">Your personal phrasebook</p><h1>My Kannada</h1>
      <div className="stat-grid">
        <div className="mini-card"><strong>{list.length}</strong><span>Saved phrases</span></div>
        <div className="mini-card"><strong>{knownCount}</strong><span>Marked known</span></div>
        <div className="mini-card"><strong>{reviewCount}</strong><span>To review</span></div>
        <div className="mini-card"><strong>{streak} <small>days</small></strong><span>Study streak</span></div>
      </div>

      {list.length > 0 && <section className="next-step"><div><p className="eyebrow">Suggested next step</p><h2>{reviewCount ? `Review ${reviewCount} phrase${reviewCount === 1 ? '' : 's'}` : knownCount < list.length ? 'Practice your saved phrases' : 'Your saved phrases are all marked known'}</h2></div>{reviewCount ? <button className="primary" onClick={() => { setMode('review'); setI(0); setShow(false); }}>Start review</button> : knownCount < list.length ? <button className="primary" onClick={() => { setMode('practice'); setI(0); setShow(false); }}>Start practice</button> : <a className="btn" href="/">Find more phrases</a>}</section>}

      <div className="saved-toolbar">
        <div className="segmented" role="group" aria-label="Phrase view">
          <button className={mode === 'list' ? 'selected' : ''} aria-pressed={mode === 'list'} onClick={() => setMode('list')}>Phrasebook</button>
          <button className={mode === 'cards' ? 'selected' : ''} aria-pressed={mode === 'cards'} onClick={() => { setMode('cards'); setShow(false); }}>Flashcards</button>
          <button className={mode === 'practice' ? 'selected' : ''} aria-pressed={mode === 'practice'} onClick={() => { setMode('practice'); setShow(false); }}>Practice</button>
          <button className={mode === 'review' ? 'selected' : ''} aria-pressed={mode === 'review'} onClick={() => { setMode('review'); setI(0); setShow(false); }}>Review queue {reviewCount > 0 ? `· ${reviewCount}` : ''}</button>
        </div>
        {mode === 'list' && <div className="segmented" role="group" aria-label="Filter phrasebook">{[['all', 'All'], ['review', 'Review'], ['known', 'Known']].map(([id, label]) => <button key={id} className={filter === id ? 'selected' : ''} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}</div>}
      </div>

      {mode === 'list' && visibleList.map(p => <PhraseCard key={p.kn} phrase={p} onSaveChange={handleSaveChange} />)}
      {mode === 'list' && !visibleList.length && <div className="empty-state"><h2>{list.length ? 'Nothing in this filter yet' : 'Your phrasebook starts here'}</h2><p>{list.length ? 'Mark saved phrases as known or review them during practice.' : 'Save useful phrases from any situation or translation.'}</p><a className="btn primary" href="/">Explore phrases</a></div>}

      {mode === 'cards' && (
        list.length ? <div className="card flashcard"><p className="eyebrow">Flashcard {((i % list.length) + 1)} / {list.length}</p><p className="prompt">{cur?.en}</p>{show ? <><p className="kn">{cur?.kn}</p><p className="tr">{cur?.translit}</p></> : <button className="primary" onClick={() => setShow(true)}>Reveal Kannada</button>}<div className="row flashcard-actions"><button onClick={() => cur && speak(cur.kn)} aria-label="Play phrase">▶ Hear phrase</button><button onClick={advanceCard}>Next <span aria-hidden="true">→</span></button></div></div> : <div className="empty-state"><h2>No saved flashcards yet</h2><p>Save phrases to build a deck you can practice.</p><a className="btn primary" href="/">Explore phrases</a></div>
      )}

      {mode === 'practice' && (
        list.length ? <div className="card flashcard"><p className="eyebrow">Practice {((i % list.length) + 1)} / {list.length}</p><div className="progress-track" aria-label={`${Math.round(((i % list.length) + 1) / list.length * 100)} percent through practice phrases`}><span style={{ width: `${((i % list.length) + 1) / list.length * 100}%` }} /></div><p className="warn">Try saying it before revealing the answer.</p><p className="prompt">{cur?.en}</p>{show ? <><p className="kn">{cur?.kn}</p><p className="tr">{cur?.translit}</p></> : <button className="primary" onClick={() => setShow(true)}>Reveal answer</button>}<div className="row flashcard-actions"><button className="primary" onClick={markKnown}>✓ I know this</button><button onClick={markReview}>↺ Review later</button><button onClick={() => cur && speak(cur.kn)} aria-label="Play phrase">▶ Hear it</button></div></div> : <div className="empty-state"><h2>Ready for your first practice?</h2><p>Save a few phrases first, then review them here.</p><a className="btn primary" href="/">Explore phrases</a></div>
      )}

      {mode === 'review' && (
        reviewQueue.length ? <div className="card flashcard"><p className="eyebrow">Review queue {((i % reviewQueue.length) + 1)} / {reviewQueue.length}</p><div className="progress-track" aria-label={`${Math.round(((i % reviewQueue.length) + 1) / reviewQueue.length * 100)} percent through review phrases`}><span style={{ width: `${((i % reviewQueue.length) + 1) / reviewQueue.length * 100}%` }} /></div><p className="prompt">{cur?.en}</p>{show ? <><p className="kn">{cur?.kn}</p><p className="tr">{cur?.translit}</p></> : <button className="primary" onClick={() => setShow(true)}>Reveal answer</button>}<div className="row flashcard-actions"><button className="primary" onClick={markKnown}>✓ I know this</button><button onClick={markReview}>↺ Keep in review</button><button onClick={() => cur && speak(cur.kn)} aria-label="Play phrase">▶ Hear it</button></div></div> : <div className="empty-state"><h2>Review queue is clear</h2><p>Mark phrases for review while practicing and they will collect here.</p><button onClick={() => setMode('practice')}>Go to practice</button></div>
      )}

      {recent.length > 0 && <section className="section-block"><div className="section-heading"><h2>Recently translated</h2></div><div className="card">{recent.slice(0, 5).map((p, idx) => <div key={`${p.kn}-${idx}`} className="recent-item"><div><strong>{p.kn}</strong><small>{p.en}</small></div><button onClick={() => speak(p.kn)} aria-label={`Play: ${p.en}`} title="Play audio">▶</button></div>)}</div></section>}
    </>
  );
}
