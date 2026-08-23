/**
 * Simulacro de examen con revisión final (Fase 7). Ver lib/exam.ts para el
 * armado del resultado y la lista de revisión.
 *
 * Alcance idéntico al de Sprint IA: solo los motores TS (mathematik,
 * zahlenreihen, konzentration, analyse-programmierung) — nada de las apps
 * HTML standalone. La "dificultad creciente" que proponía el roadmap
 * descartado se resuelve con el mismo modo adaptativo de Sprint IA: cada
 * pregunta pesa más hacia los tipos con menor precisión real, así que el
 * simulacro tiende solo a lo que más cuesta en vez de salir parejo.
 */
import { useEffect, useRef, useState } from 'react';
import { ENGINES, pick, pickWeighted } from '../engines';
import type { Exercise } from '../engines/types';
import { engineCategoryId, engineTracks, type TrackId } from '../lib/tracks';
import { CATEGORY_META, readCategory, weightsForTypes } from '../lib/progress-stats';
import { buildExamResult, type ExamAnswer } from '../lib/exam';
import { useProgressStore } from '../utils/storage-bridge';
import '../styles/sprint.css';
import '../styles/exam.css';

const EXAM_SIZE = 20;
const EXAM_SECONDS = 480;

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function ExamSimulation({ track, onBack }: { track: TrackId; onBack: () => void }) {
  const progress = useProgressStore((s) => s.progress);
  const [items, setItems] = useState<Exercise[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(EXAM_SECONDS);
  const [finished, setFinished] = useState(false);
  const answersRef = useRef<ExamAnswer[]>([]);

  useEffect(() => {
    if (!items || finished) return;
    if (remaining <= 0) {
      setFinished(true);
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [items, finished, remaining]);

  function begin(): void {
    const engines = Object.entries(ENGINES).filter(([id]) => engineTracks(id).includes(track));
    const out: Exercise[] = [];
    for (let i = 0; i < EXAM_SIZE; i++) {
      const [engineId, e] = pick(engines);
      const specs = Object.entries(e.generators);
      const catMeta = CATEGORY_META.find((c) => c.id === engineCategoryId(engineId));
      const catStat = catMeta ? readCategory(catMeta, progress[catMeta.storageKey]) : null;
      const weights = weightsForTypes(catStat, specs.map(([typeId]) => typeId));
      out.push(pickWeighted(specs.map(([, spec]) => spec), weights).fn());
    }
    answersRef.current = [];
    setItems(out);
    setIdx(0);
    setAnswers([]);
    setSelected(null);
    setRemaining(EXAM_SECONDS);
    setFinished(false);
  }

  function choose(option: string): void {
    if (selected !== null || !items) return;
    setSelected(option);
    const entry: ExamAnswer = {
      exercise: items[idx],
      selected: option,
      correct: option === items[idx].correct,
    };
    answersRef.current = [...answersRef.current, entry];
    setAnswers(answersRef.current);
  }

  function next(): void {
    if (!items) return;
    if (idx + 1 >= items.length) {
      setFinished(true);
      return;
    }
    setIdx(idx + 1);
    setSelected(null);
  }

  if (finished) {
    const result = buildExamResult(answers);
    return (
      <div className="exam-page">
        <div className="study-viewer-bar">
          <button className="back-btn" onClick={onBack}>
            ← Volver a categorías
          </button>
          <span className="study-viewer-title">📝 Simulacro de examen</span>
        </div>
        <div className="exam-result">
          <div className="exam-result-score">
            {result.correct} / {result.total}
          </div>
          <div className="exam-result-acc">
            {result.accuracy === null ? 'Sin preguntas respondidas' : `${result.accuracy}% de precisión`}
          </div>
          {result.total < EXAM_SIZE && (
            <p className="exam-note">
              Se acabó el tiempo antes de llegar a las {EXAM_SIZE} preguntas —
              respondiste {result.total}.
            </p>
          )}
          <button className="primary-btn" onClick={begin}>
            Repetir simulacro
          </button>
        </div>

        {result.review.length > 0 ? (
          <div className="exam-review">
            <h3 className="exam-review-title">Revisión: lo que falló ({result.review.length})</h3>
            {result.review.map((r, i) => (
              <article key={i} className="exam-card">
                <span className="exam-card-type">{r.exercise.typeLabel}</span>
                {r.exercise.context && <p className="exam-card-context">{r.exercise.context}</p>}
                {typeof r.exercise.meta?.html === 'string' && (
                  <div className="quiz-visual" dangerouslySetInnerHTML={{ __html: r.exercise.meta.html }} />
                )}
                {typeof r.exercise.meta?.code === 'string' && (
                  <pre className="quiz-code">{r.exercise.meta.code}</pre>
                )}
                <p className="exam-card-text">{r.exercise.text}</p>
                <div className="exam-card-answers">
                  <span className="exam-answer wrong">Tu respuesta: {r.selected}</span>
                  <span className="exam-answer right">Correcta: {r.exercise.correct}</span>
                </div>
                <p className="exam-card-explain">{r.exercise.explain}</p>
              </article>
            ))}
          </div>
        ) : (
          result.total > 0 && <p className="exam-note">Todo bien — no hay nada que revisar.</p>
        )}
      </div>
    );
  }

  if (items) {
    const q = items[idx];
    const answered = selected !== null;
    return (
      <div className="exam-page">
        <div className="study-viewer-bar">
          <button className="back-btn" onClick={onBack}>
            ← Volver a categorías
          </button>
          <span className="study-viewer-title">
            📝 Simulacro — {idx + 1} / {items.length}
          </span>
          <span className={remaining <= 60 ? 'exam-timer low' : 'exam-timer'}>⏱ {formatTime(remaining)}</span>
        </div>

        <div className="quiz">
          <div className="quiz-type">{q.typeLabel}</div>
          {q.context && <p className="quiz-context">{q.context}</p>}
          {typeof q.meta?.html === 'string' && (
            <div className="quiz-visual" dangerouslySetInnerHTML={{ __html: q.meta.html }} />
          )}
          {typeof q.meta?.code === 'string' && <pre className="quiz-code">{q.meta.code}</pre>}
          <p className="quiz-text">{q.text}</p>
          <div className="quiz-options">
            {q.options.map((option) => {
              let cls = 'quiz-option';
              if (answered) {
                if (option === q.correct) cls += ' correct';
                else if (option === selected) cls += ' wrong';
                else cls += ' disabled';
              }
              return (
                <button key={option} className={cls} onClick={() => choose(option)}>
                  {option}
                </button>
              );
            })}
          </div>
          {answered && (
            <div className={selected === q.correct ? 'quiz-explain ok' : 'quiz-explain ko'}>
              <b>{selected === q.correct ? '✓ Correcto.' : `✗ Incorrecto — era ${q.correct}.`}</b>{' '}
              {q.explain}
            </div>
          )}
          {answered && (
            <button className="primary-btn quiz-next" onClick={next}>
              {idx + 1 < items.length ? 'Siguiente →' : 'Ver revisión →'}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="exam-page">
      <div className="study-viewer-bar">
        <button className="back-btn" onClick={onBack}>
          ← Volver a categorías
        </button>
        <span className="study-viewer-title">📝 Simulacro de examen</span>
      </div>
      <div className="exam-landing">
        <h2>Simulacro de examen</h2>
        <p className="exam-explain">
          {EXAM_SIZE} preguntas mixtas de todos los motores disponibles para
          esta carrera, con {Math.round(EXAM_SECONDS / 60)} minutos en total.
          Prioriza tus tipos con menor precisión, igual que el modo adaptativo
          de Sprint IA. Al terminar (o cuando se acabe el tiempo) hay una
          revisión de todo lo que falló, con la explicación de cada una.
        </p>
        <button className="primary-btn" onClick={begin}>
          Empezar simulacro
        </button>
      </div>
    </div>
  );
}
