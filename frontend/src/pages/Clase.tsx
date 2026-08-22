import { useCallback, useEffect, useRef, useState } from 'react';
import type { Exercise } from '../engines/types';
import { ENGINES, pick } from '../engines';
import { generateLessonScript, type LessonStep } from '../lib/lesson';
import { useSpeech } from '../hooks/useSpeech';
import '../styles/clase.css';

const PAUSE_MS = 700;
// Pausa antes del último paso (la solución): un silencio más largo se lee
// como "acá viene el reveal", en vez de que la respuesta llegue pegada al
// paso anterior como uno más.
const DRAMATIC_PAUSE_MS = PAUSE_MS * 2.5;

/** completedIndex = segmento que acaba de terminar; el largo se decide para el que sigue. */
function pauseAfter(completedIndex: number, totalSteps: number) {
  return completedIndex === totalSteps - 2 ? DRAMATIC_PAUSE_MS : PAUSE_MS;
}

export default function Clase({ onBack }: { onBack: () => void }) {
  const speech = useSpeech();
  const [engineId, setEngineId] = useState('mathematik');
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [steps, setSteps] = useState<LessonStep[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Descarta cargas obsoletas: generateLessonScript() es async, así que dos
  // clicks seguidos en "Siguiente ejercicio" (o cambiar de motor mientras
  // carga) dejan dos peticiones en vuelo. Sin este token, la que resolviera
  // última narraría la clase de un ejercicio que ya no está en pantalla.
  const loadToken = useRef(0);
  const activeStepRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (speech.isPlaying) {
      activeStepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [speech.segmentIndex, speech.isPlaying]);

  const load = useCallback(
    async (engine: string) => {
      const token = ++loadToken.current;
      speech.stop();
      setLoading(true);
      setDone(false);
      setSteps(null);
      const ex = pick(Object.values(ENGINES[engine].generators)).fn();
      setExercise(ex);

      const script = await generateLessonScript(ex);
      if (token !== loadToken.current) return; // otra carga la adelantó

      setSteps(script);
      setLoading(false);
      speech.play(
        script.map((s) => s.narration),
        (i) => pauseAfter(i, script.length),
        { onDone: () => setDone(true) }
      );
    },
    // speech.play/stop son callbacks estables (deps [] en useSpeech) y leen
    // voz/velocidad desde refs, así que capturarlos una vez es correcto.
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
      (i) => pauseAfter(i, steps.length),
      { onDone: () => setDone(true) }
    );
  }

  // Si el navegador no trae voces en español, ofrecer todas antes que un
  // desplegable vacío (la narración cae al idioma por defecto del sistema).
  const spanishVoices = speech.voices.filter((v) => v.lang.startsWith('es'));
  const voiceOptions = spanishVoices.length > 0 ? spanishVoices : speech.voices;

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

        {voiceOptions.length > 0 && (
          <select
            className="clase-voice-select"
            value={speech.voice?.name ?? ''}
            onChange={(e) =>
              speech.setVoice(speech.voices.find((v) => v.name === e.target.value) ?? null)
            }
          >
            {voiceOptions.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        )}
      </div>

      {!speech.supported && (
        <p className="sprint-notice">
          Este navegador no soporta síntesis de voz, así que la clase no se puede
          narrar. Los pasos igual se muestran escritos abajo.
        </p>
      )}

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
                <div key={i} className={cls} ref={active ? activeStepRef : undefined}>
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
            {speech.isPlaying && !speech.isPaused && (
              <button className="secondary-btn" onClick={speech.pause}>
                ⏸ Pausar
              </button>
            )}
            {speech.isPlaying && speech.isPaused && (
              <button className="secondary-btn" onClick={speech.resume}>
                ▶ Reanudar
              </button>
            )}
            {!speech.isPlaying && (
              <button className="secondary-btn" onClick={replay} disabled={!speech.supported}>
                ▶ {done ? 'Repetir' : 'Reproducir'}
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
