/**
 * Cuaderno de errores (Fase 7).
 *
 * Lee lo que las 9 apps de Sprint reportaron vía el bridge (utils/storage-bridge.ts,
 * type:'mistake') y lo agrupa por categoría. "Descartar" borra la entrada acá
 * mismo; si el ejercicio se vuelve a fallar, reaparece — y si se acierta en la
 * app, la propia app lo saca del cuaderno (window.resolveMistake). No hay
 * "practicar esta pregunta exacta" porque los generadores no la reproducen:
 * lo que hay es un atajo directo a la categoría para volver a entrenar el tipo.
 */
import { useProgressStore } from '../utils/storage-bridge';
import { mistakesByCategory } from '../lib/error-notebook';
import { CATEGORIES } from '../lib/categories';
import type { TrackId } from '../lib/tracks';
import '../styles/error-notebook.css';

export default function ErrorNotebook({
  track,
  onGoToCategory,
}: {
  track: TrackId;
  onGoToCategory: (categoryId: string) => void;
}) {
  const mistakes = useProgressStore((s) => s.mistakes);
  const removeMistakeEntry = useProgressStore((s) => s.removeMistakeEntry);

  const trackCategoryIds = new Set(
    CATEGORIES.filter((c) => c.tracks.includes(track)).map((c) => c.id)
  );
  const visible = mistakes.filter((m) => trackCategoryIds.has(m.categoryId));
  const grouped = mistakesByCategory(visible);

  if (visible.length === 0) {
    return (
      <section className="en-page">
        <h2 className="en-heading">📕 Cuaderno de errores</h2>
        <p className="en-empty">
          Todavía no fallaste nada en un Sprint de esta carrera — o ya
          corregiste todo lo que habías fallado. Cuando falles una pregunta
          de opción múltiple, aparece acá para que la repases.
        </p>
      </section>
    );
  }

  return (
    <section className="en-page">
      <h2 className="en-heading">📕 Cuaderno de errores</h2>
      <p className="en-note">
        {visible.length} {visible.length === 1 ? 'ejercicio fallado' : 'ejercicios fallados'} sin
        corregir. Se saca de acá solo cuando lo acertás en un Sprint de la
        misma categoría.
      </p>

      {[...grouped.entries()].map(([categoryId, entries]) => {
        const cat = CATEGORIES.find((c) => c.id === categoryId);
        return (
          <div key={categoryId} className="en-group">
            <header className="en-group-head">
              <h3 className="en-group-title">
                {cat?.emoji ?? '📌'} {cat?.title ?? categoryId}
              </h3>
              <button className="en-practice-btn" onClick={() => onGoToCategory(categoryId)}>
                Practicar →
              </button>
            </header>

            <div className="en-list">
              {entries.map((m) => (
                <article key={m.id} className="en-card">
                  {m.context && <p className="en-context">{m.context}</p>}
                  <p className="en-text">{m.text}</p>
                  <div className="en-answers">
                    <span className="en-answer wrong">Tu respuesta: {m.chosen}</span>
                    <span className="en-answer right">Correcta: {m.correct}</span>
                  </div>
                  {m.explain && <p className="en-explain">{m.explain}</p>}
                  <footer className="en-card-foot">
                    <span className="en-seen">
                      Fallado {m.seenCount} {m.seenCount === 1 ? 'vez' : 'veces'}
                    </span>
                    <button className="en-discard-btn" onClick={() => removeMistakeEntry(m.id)}>
                      Descartar
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
