import { useCallback, useEffect, useState } from 'react';
import Quiz from '../components/Quiz';
import type { Exercise } from '../engines/types';
import { ENGINES, pick, pickWeighted } from '../engines';
import { aiTypesFor, generateAIExercise } from '../lib/ai-exercises';
import { useAIEnabled } from '../hooks/useAIEnabled';
import { engineTracks, type TrackId } from '../lib/tracks';
import { useProgressStore } from '../utils/storage-bridge';
import { CATEGORY_META, adaptiveWeight, readCategory } from '../lib/progress-stats';
import '../styles/sprint.css';

/** engineId (engines/index.ts) → id de categoría en progress-stats.ts: no
    siempre coinciden (p.ej. 'analyse' vs 'analyse-programmierung'), igual que
    ya documenta engineTracks() en lib/tracks.ts. */
const ENGINE_CATEGORY_ID: Record<string, string> = {
  mathematik: 'mathematik',
  zahlenreihen: 'zahlenreihen',
  konzentration: 'konzentration',
  analyse: 'analyse-programmierung',
};

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

export default function AISprint({ track, onBack }: { track: TrackId; onBack: () => void }) {
  const aiEnabled = useAIEnabled();
  const engines = Object.entries(ENGINES).filter(([id]) => engineTracks(id).includes(track));
  const [engineId, setEngineId] = useState('mathematik');
  const [useAI, setUseAI] = useState(true);
  const [adaptive, setAdaptive] = useState(false);
  const [item, setItem] = useState<Item | null>(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>(ZERO);
  const progress = useProgressStore((s) => s.progress);

  const next = useCallback(
    async (n: number, engine: string, ai: boolean, adaptiveOn: boolean) => {
      setLoading(true);
      setNotice(null);
      const curated = (): Exercise => {
        const specs = Object.entries(ENGINES[engine].generators);
        if (!adaptiveOn) return pick(specs.map(([, spec]) => spec)).fn();
        const catMeta = CATEGORY_META.find((c) => c.id === ENGINE_CATEGORY_ID[engine]);
        const catStat = catMeta ? readCategory(catMeta, progress[catMeta.storageKey]) : null;
        const weights = specs.map(([typeId]) => {
          const t = catStat?.types.find((ty) => ty.id === typeId);
          return adaptiveWeight(t?.accuracy ?? null, t?.fewData ?? false);
        });
        return pickWeighted(specs.map(([, spec]) => spec), weights).fn();
      };

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
    [aiEnabled, progress]
  );

  useEffect(() => {
    void next(0, engineId, useAI, adaptive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function switchEngine(id: string) {
    setEngineId(id);
    setCount(0);
    setStats(ZERO);
    void next(0, id, useAI, adaptive);
  }

  function handleNext() {
    const n = count + 1;
    setCount(n);
    void next(n, engineId, useAI, adaptive);
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
          {engines.map(([id, e]) => (
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
            Sin <code>GROQ_API_KEY</code> configurada en el servidor, el sprint usa
            solo ejercicios curados. Configúrala en <code>backend/.env</code> para
            activar la generación con IA.
          </p>
        )}

        <label className="sprint-ai-toggle">
          <input
            type="checkbox"
            checked={adaptive}
            onChange={(e) => setAdaptive(e.target.checked)}
          />
          Modo adaptativo (los ejercicios curados priorizan tus tipos con
          menor precisión, en vez de salir todos por igual)
        </label>
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
