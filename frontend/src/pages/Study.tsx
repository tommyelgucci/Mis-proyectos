import { useState } from 'react';
import { useProgressStore } from '../utils/storage-bridge';
import AISprint from './AISprint';

interface Category {
  id: string;
  file: string;
  storageKey: string;
  emoji: string;
  title: string;
  subtitle: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'vernetztes-denken',
    file: 'vernetztes-denken-app.html',
    storageKey: 'vernetztes-denken-progress',
    emoji: '🔗',
    title: 'Vernetztes Denken',
    subtitle: 'Pensamiento sistémico: cadenas causales, bucles y retrasos',
  },
  {
    id: 'analyse-programmierung',
    file: 'analyse-programmierung-app.html',
    storageKey: 'analyse-programmierung-progress',
    emoji: '💻',
    title: 'Analyse & Programmierung',
    subtitle: 'Trazado de código con trace-table stepper interactivo',
  },
  {
    id: 'konzentration',
    file: 'konzentration-merkfaehigkeit-app.html',
    storageKey: 'konzentration-merkfaehigkeit-progress',
    emoji: '🎯',
    title: 'Konzentration & Merkfähigkeit',
    subtitle: 'Concentración, comparación de bloques y memoria diferida',
  },
  {
    id: 'mathematik',
    file: 'mathematik-app.html',
    storageKey: 'mathematik-progress',
    emoji: '🧮',
    title: 'Mathematik',
    subtitle: 'Porcentajes, fracciones, proporcionalidad y redondeo suizo',
  },
  {
    id: 'zahlenreihen',
    file: 'zahlenreihen-app.html',
    storageKey: 'zahlenreihen-progress',
    emoji: '🔢',
    title: 'Zahlenreihen',
    subtitle: 'Series numéricas: 9 familias con revelación de estructura',
  },
  {
    id: 'vorstellungsvermoegen',
    file: 'vorstellungsvermoegen-app.html',
    storageKey: 'vorstellungsvermoegen-progress',
    emoji: '🧊',
    title: 'Vorstellungsvermögen',
    subtitle: 'Visualización espacial: redes de cubo con plegado 3D real',
  },
];

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

export default function Study() {
  const [active, setActive] = useState<Category | null>(null);
  const [sprint, setSprint] = useState(false);
  const progress = useProgressStore((s) => s.progress);

  if (sprint) {
    return <AISprint onBack={() => setSprint(false)} />;
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
        {CATEGORIES.map((cat) => {
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
