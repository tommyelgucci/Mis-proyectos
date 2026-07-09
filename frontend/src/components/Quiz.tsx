import { useState } from 'react';
import type { Exercise } from '../engines/types';

interface QuizProps {
  exercise: Exercise;
  /** Etiqueta opcional junto al tipo (p.ej. "✨ IA"). */
  badge?: string;
  onAnswered?: (correct: boolean) => void;
  onNext: () => void;
  nextLabel?: string;
}

/**
 * Quiz de opción múltiple para cualquier Exercise (primer quiz nativo React).
 * Renderiza meta.html (konzentration) y meta.code (analyse) cuando existen.
 */
export default function Quiz({ exercise, badge, onAnswered, onNext, nextLabel }: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;

  function choose(option: string) {
    if (answered) return;
    setSelected(option);
    onAnswered?.(option === exercise.correct);
  }

  return (
    <div className="quiz">
      <div className="quiz-type">
        {exercise.typeLabel}
        {badge && <span className="quiz-badge">{badge}</span>}
      </div>

      {exercise.context && <p className="quiz-context">{exercise.context}</p>}
      {typeof exercise.meta?.html === 'string' && (
        <div
          className="quiz-visual"
          dangerouslySetInnerHTML={{ __html: exercise.meta.html }}
        />
      )}
      {typeof exercise.meta?.code === 'string' && (
        <pre className="quiz-code">{exercise.meta.code}</pre>
      )}

      <p className="quiz-text">{exercise.text}</p>

      <div className="quiz-options">
        {exercise.options.map((option) => {
          let cls = 'quiz-option';
          if (answered) {
            if (option === exercise.correct) cls += ' correct';
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
        <div className={selected === exercise.correct ? 'quiz-explain ok' : 'quiz-explain ko'}>
          <b>{selected === exercise.correct ? '✓ Correcto.' : `✗ Incorrecto — era ${exercise.correct}.`}</b>{' '}
          {exercise.explain}
        </div>
      )}

      {answered && (
        <button className="primary-btn quiz-next" onClick={onNext}>
          {nextLabel ?? 'Siguiente ejercicio →'}
        </button>
      )}
    </div>
  );
}
