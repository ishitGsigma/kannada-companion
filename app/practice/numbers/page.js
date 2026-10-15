'use client';
import Link from 'next/link';
import { useState } from 'react';
import { speak } from '../../../lib/storage';

const NUMBERS = [
  { value: 1, kn: 'ಒಂದು', translit: 'ondu' },
  { value: 2, kn: 'ಎರಡು', translit: 'eradu' },
  { value: 3, kn: 'ಮೂರು', translit: 'mooru' },
  { value: 4, kn: 'ನಾಲ್ಕು', translit: 'naalku' },
  { value: 5, kn: 'ಐದು', translit: 'aidu' },
  { value: 10, kn: 'ಹತ್ತು', translit: 'hattu' },
  { value: 20, kn: 'ಇಪ್ಪತ್ತು', translit: 'ippattu' },
  { value: 50, kn: 'ಐವತ್ತು', translit: 'aivattu' },
  { value: 100, kn: 'ನೂರು', translit: 'nooru' },
  { value: 200, kn: 'ಎರಡು ನೂರು', translit: 'eradu nooru' },
  { value: 500, kn: 'ಐದು ನೂರು', translit: 'aidu nooru' },
  { value: 1000, kn: 'ಸಾವಿರ', translit: 'saavira' },
];

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function NumberPractice() {
  const [mode, setMode] = useState('prices');
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  function changeMode(nextMode) {
    setMode(nextMode);
    setQuestion(null);
    setSelected(null);
    setScore(0);
    setAnswered(0);
  }

  function nextQuestion() {
    const target = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
    const choices = shuffle([target, ...shuffle(NUMBERS.filter(item => item.value !== target.value)).slice(0, 3)]);
    const amount = mode === 'prices'
      ? { ...target, kn: `${target.kn} ರೂಪಾಯಿ`, translit: `${target.translit} roopaayi` }
      : target;
    setQuestion({ ...amount, choices });
    setSelected(null);
  }

  function chooseAnswer(value) {
    if (selected !== null) return;
    setSelected(value);
    setAnswered(current => current + 1);
    if (value === question.value) setScore(current => current + 1);
  }

  const isCorrect = selected === question?.value;

  return (
    <>
      <Link className="back-link" href="/">← Explore phrases</Link>
      <header className="number-heading">
        <p className="eyebrow">Listen, then choose the digits</p>
        <h1>Hear Kannada numbers</h1>
        <p className="sub">Practice the numbers you’ll hear when asking about prices, tickets, and change.</p>
      </header>

      <section className="number-practice" aria-label="Number listening practice">
        <div className="segmented" role="group" aria-label="Practice type">
          <button className={mode === 'prices' ? 'selected' : ''} aria-pressed={mode === 'prices'} onClick={() => changeMode('prices')}>Prices</button>
          <button className={mode === 'numbers' ? 'selected' : ''} aria-pressed={mode === 'numbers'} onClick={() => changeMode('numbers')}>Numbers</button>
        </div>

        <div className="number-score"><span>Correct: <b>{score}</b> / {answered}</span><span>{mode === 'prices' ? 'Rupees' : 'Number words'}</span></div>

        {question ? (
          <>
            <div className="number-prompt">
              <p>{mode === 'prices' ? 'What price did you hear?' : 'Which number did you hear?'}</p>
              <button className="listen-number" onClick={() => speak(question.kn)} aria-label="Play Kannada audio" title="Play audio">▶ <span>Listen</span></button>
            </div>
            <div className="number-options" aria-label="Choose the digits">
              {question.choices.map(option => <button key={option.value} className={selected !== null && option.value === question.value ? 'correct' : selected === option.value ? 'incorrect' : ''} onClick={() => chooseAnswer(option.value)} disabled={selected !== null}>{mode === 'prices' ? `₹${option.value}` : option.value}</button>)}
            </div>
            {selected !== null && <div className={`number-feedback ${isCorrect ? 'success' : 'retry'}`} role="status">
              <strong>{isCorrect ? 'Correct' : `It was ${mode === 'prices' ? `₹${question.value}` : question.value}`}</strong>
              <span className="kn">{question.kn}</span>
              <span>{question.translit}</span>
            </div>}
            <button className="primary number-next" onClick={nextQuestion} disabled={selected === null}>Next</button>
          </>
        ) : (
          <div className="number-start"><p>Listen to a Kannada number or price and pick the digits you heard.</p><button className="primary" onClick={nextQuestion}>Start listening</button></div>
        )}
      </section>
    </>
  );
}