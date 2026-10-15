'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PACKS } from '../../../lib/packs';
import PhraseCard from '../../../components/PhraseCard';

export default function PackPage() {
  const { id } = useParams();
  const pack = PACKS.find(p => p.id === id);
  if (!pack) return <p>Pack not found. <Link href="/">Back</Link></p>;
  const phraseCount = pack.scenarios.reduce((total, scenario) => total + scenario.phrases.length, 0);
  return (
    <>
      <Link className="back-link" href="/">← All situations</Link>
      <header className="pack-heading"><p className="eyebrow">{pack.scenarios.length} scenarios · {phraseCount} phrases</p><h1>{pack.icon} {pack.title}</h1><p className="sub">{pack.blurb}</p></header>
      <nav className="scenario-nav" aria-label="Jump to scenario">{pack.scenarios.map(s => <a key={s.id} href={`#${s.id}`}>{s.title}</a>)}</nav>
      {pack.scenarios.map(s => (
        <section key={s.id} id={s.id} className="scenario-section">
          <div className="scenario-title"><h2>{s.title}</h2><span>{s.phrases.length} phrases</span></div>
          {s.phrases.map(ph => <PhraseCard key={ph.kn} phrase={ph} />)}
        </section>
      ))}
      {pack.id === 'healthcare' && <p className="warn">This app does not give medical advice. In an emergency call 108.</p>}
    </>
  );
}
