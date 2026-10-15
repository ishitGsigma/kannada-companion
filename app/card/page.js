'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { clearEmergencyCard, getEmergencyCard, saveEmergencyCard } from '../../lib/storage';

const EMPTY_CARD = {
  name: '',
  nameKannada: '',
  bloodGroup: '',
  allergies: '',
  medicines: '',
  emergencyContact: '',
  emergencyPhone: '',
  address: '',
};

export default function EmergencyCardPage() {
  const [draft, setDraft] = useState(EMPTY_CARD);
  const [card, setCard] = useState(EMPTY_CARD);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getEmergencyCard();
    if (Object.keys(existing).length) {
      setDraft({ ...EMPTY_CARD, ...existing });
      setCard({ ...EMPTY_CARD, ...existing });
      setSaved(true);
    }
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setDraft(current => ({ ...current, [name]: value }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveEmergencyCard(draft);
    setCard(draft);
    setSaved(true);
  }

  function handleClear() {
    clearEmergencyCard();
    setDraft(EMPTY_CARD);
    setCard(EMPTY_CARD);
    setSaved(false);
  }

  return (
    <section className="emergency-page">
      <Link className="back-link" href="/">← Explore phrases</Link>
      <header className="emergency-heading">
        <p className="eyebrow">Private to this device</p>
        <h1>Emergency card</h1>
        <p className="sub">Keep essential details ready to show in an urgent situation.</p>
      </header>

      <form className="card emergency-form" onSubmit={handleSave}>
        <div className="emergency-fields">
          <label>Name in English<input name="name" value={draft.name} onChange={updateField} autoComplete="name" /></label>
          <label>Name in Kannada<input name="nameKannada" value={draft.nameKannada} onChange={updateField} /></label>
          <label>Blood group<select name="bloodGroup" value={draft.bloodGroup} onChange={updateField}><option value="">Select or leave blank</option>{['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => <option key={group}>{group}</option>)}</select></label>
          <label>Allergies<input name="allergies" value={draft.allergies} onChange={updateField} placeholder="None / list allergies" /></label>
          <label>Medicines<input name="medicines" value={draft.medicines} onChange={updateField} placeholder="Optional" /></label>
          <label>Emergency contact<input name="emergencyContact" value={draft.emergencyContact} onChange={updateField} /></label>
          <label>Contact phone<input name="emergencyPhone" type="tel" value={draft.emergencyPhone} onChange={updateField} autoComplete="tel" /></label>
          <label className="emergency-address">Address<input name="address" value={draft.address} onChange={updateField} placeholder="Enter in English or Kannada" /></label>
        </div>
        <p className="warn">Details are saved only in this browser on this device. They are not uploaded to Supabase.</p>
        <div className="row print-actions">
          <button className="primary" type="submit">Save card</button>
          <button type="button" onClick={() => window.print()} disabled={!saved}>Print / Save PDF</button>
          <button type="button" onClick={handleClear} disabled={!saved}>Clear details</button>
        </div>
      </form>

      {saved && <article className="card emergency-card" aria-label="Emergency information card">
        <p className="eyebrow">Emergency information · ತುರ್ತು ಮಾಹಿತಿ</p>
        <h2>{card.nameKannada || card.name || 'Name / ಹೆಸರು'}</h2>
        {card.nameKannada && card.name && <p className="emergency-secondary">{card.name}</p>}
        <div className="emergency-details">
          {card.bloodGroup && <div><b>ರಕ್ತದ ಗುಂಪು · Blood group</b><strong>{card.bloodGroup}</strong></div>}
          {card.allergies && <div><b>ಅಲರ್ಜಿ · Allergies</b><span>{card.allergies}</span></div>}
          {card.medicines && <div><b>ಔಷಧಿಗಳು · Medicines</b><span>{card.medicines}</span></div>}
          {(card.emergencyContact || card.emergencyPhone) && <div><b>ತುರ್ತು ಸಂಪರ್ಕ · Emergency contact</b><span>{[card.emergencyContact, card.emergencyPhone].filter(Boolean).join(' · ')}</span></div>}
          {card.address && <div><b>ವಿಳಾಸ · Address</b><span>{card.address}</span></div>}
        </div>
      </article>}
    </section>
  );
}