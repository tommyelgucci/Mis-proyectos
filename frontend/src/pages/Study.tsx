import { useState } from 'react';
import { useProgressStore } from '../utils/storage-bridge';
import type { TrackId } from '../lib/tracks';
import { CATEGORIES, type Category } from '../lib/categories';
import AISprint from './AISprint';
import Clase from './Clase';
import ErrorNotebook from './ErrorNotebook';

export { CATEGORIES } from '../lib/categories';
export type { Category } from '../lib/categories';

function progressSummary(data: unknown): string | null {
  if (typeof data !== 'object' || data === null) return null;
  const d = data as Record<string, unknown>;
  const parts: string[] = [];
  if (typeof d.best === 'number' && d.best > 0) parts.push(`récord ${d.best}`);
  if (typeof d.memBest === 'number' && d.memBest > 0) parts.push(`memoria ${d.memBest}`);
  if (d.mastered && typeof d.mastered === 'object') {
    const n = Object.values(d.mastered as Record<string, unknown>).filter(Boolean).length;
    if (n > 0) parts.push(`${n} dominados`);
  }
  if (d.stats && typeof d.stats === 'object') {
    let ok = 0;
    let total = 0;
    for (const s of Object.values(d.stats as Record<string, { ok?: number; total?: number }>)) {
      ok += s?.ok ?? 0;
      total += s?.total ?? 0;
    }
    if (total > 0) parts.push(`${Math.round((ok / total) * 100)}% precisión`);
  }
  return parts.length ? parts.join(' · ') : null;
}

export default function Study({ track }: { track: TrackId }) {
  const [active, setActive] = useState<Category | null>(null);
  const [sprint, setSprint] = useState(false);
  const [clase, setClase] = useState(false);
  const [notebook, setNotebook] = useState(false);
  const progress = useProgressStore((s) => s.progress);
  const mistakes = useProgressStore((s) => s.mistakes);
  const categories = CATEGORIES.filter((cat) => cat.tracks.includes(track));
  const trackCategoryIds = new Set(categories.map((c) => c.id));
  const mistakeCount = mistakes.filter((m) => trackCategoryIds.has(m.categoryId)).length;

  if (sprint) {
    return <AISprint track={track} onBack={() => setSprint(false)} />;
  }

  if (clase) {
    return <Clase track={track} onBack={() => setClase(false)} />;
  }

  if (notebook) {
    return (
      <div className="study-viewer">
        <div className="study-viewer-bar">
          <button className="back-btn" onClick={() => setNotebook(false)}>
            ← Volver a categorías
          </button>
          <span className="study-viewer-title">📕 Cuaderno de errores</span>
        </div>
        <ErrorNotebook
          track={track}
          onGoToCategory={(categoryId) => {
            const cat = categories.find((c) => c.id === categoryId);
            if (cat) {
              setNotebook(false);
              setActive(cat);
            }
          }}
        />
      </div>
    );
  }

  if (active) {
    return (
      <div className="study-viewer">
        <div className="study-viewer-bar">
          <button className="back-btn" onClick={() => setActive(null)}>
            ← Volver a categorías
          </button>
          <span className="study-viewer-title">
            {active.emoji} {active.title}
          </span>
        </div>
        <iframe
          className="study-frame"
          src={`/apps/${active.file}`}
          title={active.title}
        />
      </div>
    );
  }

  return (
    <div className="study-grid-page">
      <h2 className="study-heading">Elige tu categoría de entrenamiento</h2>
      <div className="study-grid">
        <button className="category-card sprint-card" onClick={() => setSprint(true)}>
          <span className="category-emoji">✨</span>
          <span className="category-title">Sprint IA</span>
          <span className="category-subtitle">
            Ejercicios mixtos de las 4 categorías con motor TS + generación por IA,
            todos verificados por código antes de mostrarse
          </span>
          <span className="category-progress">Nuevo · Fase 5</span>
        </button>
        <button className="category-card sprint-card" onClick={() => setClase(true)}>
          <span className="category-emoji">🎧</span>
          <span className="category-title">Clase con IA</span>
          <span className="category-subtitle">
            Un ejercicio real explicado paso a paso, narrado en voz — como una
            clase corta y bien explicada
          </span>
          <span className="category-progress">Nuevo</span>
        </button>
        <button className="category-card sprint-card" onClick={() => setNotebook(true)}>
          <span className="category-emoji">📕</span>
          <span className="category-title">Cuaderno de errores</span>
          <span className="category-subtitle">
            Todo lo que fallaste en un Sprint, agrupado por categoría, para
            repasarlo antes de seguir sumando ejercicios nuevos
          </span>
          <span className={mistakeCount > 0 ? 'category-progress' : 'category-progress empty'}>
            {mistakeCount > 0 ? `${mistakeCount} sin corregir` : 'Sin errores pendientes'}
          </span>
        </button>
        {categories.map((cat) => {
          const summary = progressSummary(progress[cat.storageKey]);
          return (
            <button
              key={cat.id}
              className="category-card"
              onClick={() => setActive(cat)}
            >
              <span className="category-emoji">{cat.emoji}</span>
              <span className="category-title">{cat.title}</span>
              <span className="category-subtitle">{cat.subtitle}</span>
              <span className={summary ? 'category-progress' : 'category-progress empty'}>
                {summary ?? 'Sin progreso aún'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
