import { useCallback, useEffect, useState } from 'react';
import Quiz from '../components/Quiz';
import type { Exercise } from '../engines/types';
import { ENGINES, pick } from '../engines';
import { aiTypesFor, generateAIExercise } from '../lib/ai-exercises';
import { useAIEnabled } from '../hooks/useAIEnabled';
import '../styles/sprint.css';

interface Item {
  exercise: Exercise;
  ai: boolean;
}

interface Stats {
  answered: number;
  correct: number;
  aiVerified: number;
  aiRejected: number;
}

const ZERO: Stats = { answered: 0, correct: 0, aiVerified: 0, aiRejected: 0 };

/** Cada 3er ejercicio viene de la IA (si está activada y disponible). */
const AI_EVERY = 3;

export default function AISprint({ onBack }: { onBack: () => void }) {
  const aiEnabled = useAIEnabled();
  const [engineId, setEngineId] = useState('mathematik');
  const [useAI, setUseAI] = useState(true);
  const [item, setItem] = useState<Item | null>(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>(ZERO);

  const next = useCallback(
    async (n: number, engine: string, ai: boolean) => {
      setLoading(true);
      setNotice(null);
      const curated = (): Exercise => pick(Object.values(ENGINES[engine].generators)).fn();

      const wantAI = ai && aiEnabled && n % AI_EVERY === AI_EVERY - 1;
      if (wantAI) {
        try {
          const type = pick(aiTypesFor(engine));
          const res = await generateAIExercise(engine, type);
          setStats((s) => ({
            ...s,
            aiVerified: s.aiVerified + 1,
            aiRejected: s.aiRejected + res.rejected.length,
          }));
          setItem({ exercise: res.exercise, ai: true });
          setLoading(false);
          return;
        } catch (err) {
          // todos los candidatos IA fueron rechazados: caer a ejercicio curado
          setStats((s) => ({ ...s, aiRejected: s.aiRejected + 1 }));
          setNotice(
            `La IA no superó la verificación (${err instanceof Error ? err.message : 'error'}). Ejercicio curado en su lugar.`
          );
        }
      }
      setItem({ exercise: curated(), ai: false });
      setLoading(false);
    },
    [aiEnabled]
  );

  useEffect(() => {
    void next(0, engineId, useAI);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function switchEngine(id: string) {
    setEngineId(id);
    setCount(0);
    setStats(ZERO);
    void next(0, id, useAI);
  }

  function handleNext() {
    const n = count + 1;
    setCount(n);
    void next(n, engineId, useAI);
  }

  const accuracy = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : null;

  return (
    <div className="sprint-page">
      <div className="study-viewer-bar">
        <button className="back-btn" onClick={onBack}>
          ← Volver a categorías
        </button>
        <span className="study-viewer-title">✨ Sprint IA</span>
      </div>

      <div className="sprint-controls">
        <div className="sprint-engines">
          {Object.entries(ENGINES).map(([id, e]) => (
            <button
              key={id}
              className={id === engineId ? 'sprint-engine-btn active' : 'sprint-engine-btn'}
              onClick={() => switchEngine(id)}
            >
              {e.label}
            </button>
          ))}
        </div>

        <label className={aiEnabled ? 'sprint-ai-toggle' : 'sprint-ai-toggle disabled'}>
          <input
            type="checkbox"
            checked={useAI && aiEnabled}
            disabled={!aiEnabled}
            onChange={(e) => setUseAI(e.target.checked)}
          />
          Mezclar ejercicios generados por IA (1 de cada {AI_EVERY}, verificados por código)
        </label>
        {!aiEnabled && (
          <p className="sprint-ai-note">
            Sin <code>HF_API_KEY</code> configurada en el servidor, el sprint usa solo
            ejercicios curados. Configúrala en <code>backend/.env</code> para activar
            la generación con IA.
          </p>
        )}
      </div>

      <div className="sprint-stats">
        <span className="sprint-chip">Respondidos: {stats.answered}</span>
        <span className="sprint-chip">{accuracy !== null ? `Precisión: ${accuracy}%` : 'Precisión: —'}</span>
        <span className="sprint-chip ai">✨ IA verificados: {stats.aiVerified}</span>
        <span className="sprint-chip rej">Rechazados: {stats.aiRejected}</span>
      </div>

      {notice && <p className="sprint-notice">{notice}</p>}

      {loading && (
        <div className="sprint-loading">
          {'✨ Generando y verificando ejercicio…'}
        </div>
      )}

      {!loading && item && (
        <Quiz
          key={count}
          exercise={item.exercise}
          badge={item.ai ? '✨ IA' : undefined}
          onAnswered={(ok) =>
            setStats((s) => ({ ...s, answered: s.answered + 1, correct: s.correct + (ok ? 1 : 0) }))
          }
          onNext={handleNext}
        />
      )}
    </div>
  );
}
