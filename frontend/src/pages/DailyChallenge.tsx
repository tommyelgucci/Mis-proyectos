/**
 * Desafío diario con racha (Fase 7). Ver lib/daily-challenge.ts para el
 * diseño de la selección determinista por fecha y de la racha.
 */
import { useMemo, useState } from 'react';
import Quiz from '../components/Quiz';
import type { Exercise } from '../engines/types';
import { ENGINES } from '../engines';
import { engineTracks, type TrackId } from '../lib/tracks';
import {
  DAILY_KEY,
  DAILY_SIZE,
  currentStreak,
  isCompletedToday,
  parseDailyState,
  pickDaily,
  recordCompletion,
  todayKey,
  type DailyChallengeState,
} from '../lib/daily-challenge';
import '../styles/daily-challenge.css';

function loadState(): DailyChallengeState {
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    return parseDailyState(raw ? JSON.parse(raw) : null);
  } catch {
    return parseDailyState(null);
  }
}

function saveState(state: DailyChallengeState): void {
  try {
    localStorage.setItem(DAILY_KEY, JSON.stringify(state));
  } catch {
    /* localStorage puede fallar en modo privado; la racha solo vive en memoria esta sesión */
  }
}

export default function DailyChallenge({ track, onBack }: { track: TrackId; onBack: () => void }) {
  const dateKey = useMemo(() => todayKey(), []);
  const [state, setState] = useState<DailyChallengeState>(loadState);
  const [items, setItems] = useState<Exercise[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const streak = currentStreak(state, dateKey);
  const doneToday = isCompletedToday(state, dateKey);
  const todayResult = state.history[dateKey] ?? null;

  function begin(): void {
    const engines = Object.entries(ENGINES).filter(([id]) => engineTracks(id).includes(track));
    const pool: Array<{ engineId: string; typeId: string }> = [];
    for (const [engineId, e] of engines) {
      for (const typeId of Object.keys(e.generators)) pool.push({ engineId, typeId });
    }
    const picks = pickDaily(pool, dateKey, DAILY_SIZE);
    const exercises = picks.map((p) => ENGINES[p.engineId].generators[p.typeId].fn());
    setItems(exercises);
    setIdx(0);
    setCorrect(0);
    setFinished(false);
  }

  function handleNext(): void {
    if (!items) return;
    if (idx + 1 < items.length) {
      setIdx(idx + 1);
      return;
    }
    const next = recordCompletion(state, dateKey, correct, items.length);
    setState(next);
    saveState(next);
    setFinished(true);
  }

  if (finished && items) {
    const finalStreak = currentStreak(state, dateKey);
    return (
      <div className="dc-page">
        <div className="study-viewer-bar">
          <button className="back-btn" onClick={onBack}>
            ← Volver a categorías
          </button>
          <span className="study-viewer-title">📅 Desafío diario</span>
        </div>
        <div className="dc-result">
          <div className="dc-result-score">
            {correct} / {items.length}
          </div>
          <div className="dc-result-streak">🔥 Racha: {finalStreak} {finalStreak === 1 ? 'día' : 'días'}</div>
          {state.longestStreak > finalStreak && (
            <p className="dc-note">Tu racha más larga sigue siendo {state.longestStreak} días.</p>
          )}
          <button className="primary-btn" onClick={begin}>
            Repetir por práctica (no cambia la racha de hoy)
          </button>
        </div>
      </div>
    );
  }

  if (items) {
    return (
      <div className="dc-page">
        <div className="study-viewer-bar">
          <button className="back-btn" onClick={onBack}>
            ← Volver a categorías
          </button>
          <span className="study-viewer-title">
            📅 Desafío diario — {idx + 1} / {items.length}
          </span>
        </div>
        <Quiz
          key={idx}
          exercise={items[idx]}
          onAnswered={(ok) => setCorrect((c) => c + (ok ? 1 : 0))}
          onNext={handleNext}
          nextLabel={idx + 1 < items.length ? undefined : 'Ver resultado →'}
        />
      </div>
    );
  }

  return (
    <div className="dc-page">
      <div className="study-viewer-bar">
        <button className="back-btn" onClick={onBack}>
          ← Volver a categorías
        </button>
        <span className="study-viewer-title">📅 Desafío diario</span>
      </div>
      <div className="dc-landing">
        <div className="dc-streak-hero">🔥 {streak}</div>
        <p className="dc-streak-label">{streak === 1 ? 'día seguido' : 'días seguidos'}</p>
        {state.longestStreak > 0 && (
          <p className="dc-note">Racha más larga: {state.longestStreak} {state.longestStreak === 1 ? 'día' : 'días'}</p>
        )}
        {doneToday && todayResult && (
          <p className="dc-note">
            Ya hiciste el de hoy: {todayResult.score}/{todayResult.total}. Podés repetirlo por
            práctica, no cambia la racha.
          </p>
        )}
        <p className="dc-explain">
          {DAILY_SIZE} ejercicios mixtos, los mismos para todos hoy. Completalo una vez al día
          para mantener la racha — se corta si te salteás un día entero.
        </p>
        <button className="primary-btn" onClick={begin}>
          {doneToday ? 'Repetir por práctica' : 'Empezar el desafío de hoy'}
        </button>
      </div>
    </div>
  );
}
