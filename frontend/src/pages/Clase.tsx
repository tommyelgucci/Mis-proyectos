import { useCallback, useEffect, useState } from 'react';
import type { Exercise } from '../engines/types';
import { ENGINES, pick } from '../engines';
import { generateLessonScript, type LessonStep } from '../lib/lesson';
import { useSpeech } from '../hooks/useSpeech';
import '../styles/clase.css';

const PAUSE_MS = 700;

export default function Clase({ onBack }: { onBack: () => void }) {
  const speech = useSpeech();
  const [engineId, setEngineId] = useState('mathematik');
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [steps, setSteps] = useState<LessonStep[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const load = useCallback(
    async (engine: string) => {
      speech.stop();
      setLoading(true);
      setDone(false);
      setSteps(null);
      const ex = pick(Object.values(ENGINES[engine].generators)).fn();
      setExercise(ex);
      const script = await generateLessonScript(ex);
      setSteps(script);
      setLoading(false);
      speech.play(
        script.map((s) => s.narration),
        PAUSE_MS,
        { onDone: () => setDone(true) }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    void load(engineId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function switchEngine(id: string) {
    setEngineId(id);
    void load(id);
  }

  function replay() {
    if (!steps) return;
    setDone(false);
    speech.play(
      steps.map((s) => s.narration),
      PAUSE_MS,
      { onDone: () => setDone(true) }
    );
  }

  return (
    <div className="clase-page">
      <div className="study-viewer-bar">
        <button className="back-btn" onClick={onBack}>
          ← Volver a categorías
        </button>
        <span className="study-viewer-title">🎧 Clase con IA</span>
      </div>

      <div className="clase-controls">
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

        <div className="clase-speed">
          <span>Velocidad {speech.rate.toFixed(1)}×</span>
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={speech.rate}
            onChange={(e) => speech.setRate(parseFloat(e.target.value))}
          />
        </div>

        {speech.voices.length > 0 && (
          <select
            className="clase-voice-select"
            value={speech.voice?.name ?? ''}
            onChange={(e) =>
              speech.setVoice(speech.voices.find((v) => v.name === e.target.value) ?? null)
            }
          >
            {speech.voices
              .filter((v) => v.lang.startsWith('es'))
              .map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
          </select>
        )}
      </div>

      {loading && <div className="sprint-loading">🎧 Preparando la clase…</div>}

      {!loading && exercise && (
        <div className="clase-board">
          <div className="clase-exercise">
            <div className="quiz-type">{exercise.typeLabel}</div>
            {exercise.context && <p className="quiz-context">{exercise.context}</p>}
            {typeof exercise.meta?.html === 'string' && (
              <div className="quiz-visual" dangerouslySetInnerHTML={{ __html: exercise.meta.html }} />
            )}
            {typeof exercise.meta?.code === 'string' && (
              <pre className="quiz-code">{exercise.meta.code}</pre>
            )}
            <p className="quiz-text">{exercise.text}</p>
          </div>

          <div className="clase-steps">
            {steps?.map((step, i) => {
              const active = i === speech.segmentIndex && speech.isPlaying;
              const past = i < speech.segmentIndex || (!speech.isPlaying && done);
              let cls = 'clase-step';
              if (active) cls += ' active';
              else if (past) cls += ' past';
              else cls += ' future';
              return (
                <div key={i} className={cls}>
                  <span className="clase-step-num">{i + 1}</span>
                  <div>
                    <div className="clase-step-title">{step.title}</div>
                    <div className="clase-step-narration">{step.narration}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="clase-actions">
            {speech.isPlaying ? (
              <button className="secondary-btn" onClick={speech.stop}>
                ⏸ Pausar
              </button>
            ) : (
              <button className="secondary-btn" onClick={replay}>
                ▶ {done ? 'Repetir' : 'Reanudar'}
              </button>
            )}
            <button className="primary-btn" onClick={() => load(engineId)}>
              Siguiente ejercicio →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
