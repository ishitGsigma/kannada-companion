'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { PACKS } from '../lib/packs';

const CATEGORIES = [
  { id: 'all', label: 'All situations' },
  { id: 'travel', label: 'Travel' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'work', label: 'Work & study' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filteredPacks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PACKS.filter(pack => {
      const matchesCategory = category === 'all' || pack.id === category || (category === 'travel' && ['transport', 'travel'].includes(pack.id)) || (category === 'work' && ['work', 'education'].includes(pack.id));
      const text = [
        pack.title,
        pack.blurb,
        ...pack.scenarios.flatMap(s => [
          s.title,
          ...s.phrases.map(p => [p.en, p.kn, p.translit].join(' ')),
        ]),
      ].join(' ').toLowerCase();

      return matchesCategory && (!q || text.includes(q));
    });
  }, [category, query]);

  const scenarioCount = PACKS.reduce((total, pack) => total + pack.scenarios.length, 0);
  const phraseCount = PACKS.reduce((total, pack) => total + pack.scenarios.reduce((sum, scenario) => sum + scenario.phrases.length, 0), 0);

  return (
    <>
      <section className="home-hero">
        <div>
          <p className="eyebrow">Everyday Kannada, within reach</p>
          <h1>ಕನ್ನಡ for the moments that matter.</h1>
          <p className="sub">Find the words for getting around, ordering, asking, and connecting.</p>
          <div className="hero-actions">
            <Link className="btn primary" href="/say">Find a phrase <span aria-hidden="true">↗</span></Link>
            <Link className="btn secondary" href="#phrase-packs">Browse situations</Link>
            <Link className="btn secondary" href="/practice/numbers">Hear numbers</Link>
            <Link className="btn secondary" href="/card">Emergency card</Link>
          </div>
        </div>
        <div className="hero-note" aria-label="Hello in Kannada"><span>ನಮಸ್ಕಾರ</span><small>namaskaara · hello</small></div>
      </section>

      <div className="home-tools">
        <label className="search-wrap"><span aria-hidden="true">⌕</span><input className="search-box" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a phrase or situation" aria-label="Search phrases and situations" /></label>
        <div className="stats-inline" aria-label="Phrase library size"><span><b>{PACKS.length}</b> packs</span><span><b>{scenarioCount}</b> scenarios</span><span><b>{phraseCount}</b> phrases</span></div>
      </div>

      <section className="section-block" id="phrase-packs">
        <div className="section-heading"><h2>Choose a situation</h2><p>{filteredPacks.length} {filteredPacks.length === 1 ? 'collection' : 'collections'}</p></div>
        <div className="category-list" aria-label="Filter situations">
          {CATEGORIES.map(item => <button key={item.id} className={`category-chip ${category === item.id ? 'selected' : ''}`} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>)}
        </div>
        {filteredPacks.length ? <div className="grid">
          {filteredPacks.map(pk => <Link key={pk.id} href={`/pack/${pk.id}`} className="tile"><span className="tile-top"><span className="ic" aria-hidden="true">{pk.icon}</span><span className="tile-count">{pk.scenarios.length} scenarios</span></span><b>{pk.title}</b><small>{pk.blurb}</small></Link>)}
        </div> : <div className="empty-state"><h2>No phrases found</h2><p>Try another search or choose a different situation.</p><button onClick={() => { setQuery(''); setCategory('all'); }}>Clear filters</button></div>}
      </section>
    </>
  );
}
