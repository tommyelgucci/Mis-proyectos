import { useState } from 'react';
import { useProgressStore } from '../utils/storage-bridge';
import type { TrackId } from '../lib/tracks';
import AISprint from './AISprint';
import Clase from './Clase';

interface Category {
  id: string;
  file: string;
  storageKey: string;
  emoji: string;
  title: string;
  subtitle: string;
  /** Carrera(s) que incluyen esta categoría en su temario (lib/tracks.ts). */
  tracks: TrackId[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'vernetztes-denken',
    file: 'vernetztes-denken-app.html',
    storageKey: 'vernetztes-denken-progress',
    emoji: '🔗',
    title: 'Vernetztes Denken',
    subtitle: 'Pensamiento sistémico: cadenas causales, bucles y retrasos',
    tracks: ['ict', 'wirtschaft'],
  },
  {
    id: 'analyse-programmierung',
    file: 'analyse-programmierung-app.html',
    storageKey: 'analyse-programmierung-progress',
    emoji: '💻',
    title: 'Analyse & Programmierung',
    subtitle: 'Trazado de código con trace-table stepper interactivo',
    tracks: ['ict'],
  },
  {
    id: 'konzentration',
    file: 'konzentration-merkfaehigkeit-app.html',
    storageKey: 'konzentration-merkfaehigkeit-progress',
    emoji: '🎯',
    title: 'Konzentration & Merkfähigkeit',
    subtitle: 'Concentración, comparación de bloques y memoria diferida',
    tracks: ['ict', 'wirtschaft'],
  },
  {
    id: 'mathematik',
    file: 'mathematik-app.html',
    storageKey: 'mathematik-progress',
    emoji: '🧮',
    title: 'Mathematik',
    subtitle: 'Porcentajes, fracciones, proporcionalidad y redondeo suizo',
    tracks: ['ict', 'wirtschaft'],
  },
  {
    id: 'zahlenreihen',
    file: 'zahlenreihen-app.html',
    storageKey: 'zahlenreihen-progress',
    emoji: '🔢',
    title: 'Zahlenreihen',
    subtitle: 'Series numéricas: 9 familias con revelación de estructura',
    tracks: ['ict'],
  },
  {
    id: 'vorstellungsvermoegen',
    file: 'vorstellungsvermoegen-app.html',
    storageKey: 'vorstellungsvermoegen-progress',
    emoji: '🧊',
    title: 'Vorstellungsvermögen',
    subtitle: 'Visualización espacial: redes de cubo con plegado 3D real',
    tracks: ['ict'],
  },
  {
    id: 'logik',
    file: 'logik-app.html',
    storageKey: 'logik-progress',
    emoji: '🧩',
    title: 'Logik',
    subtitle: 'Analogías verbales y figurales: encuentra la relación oculta',
    tracks: ['wirtschaft'],
  },
  {
    id: 'coordenadas',
    file: 'coordenadas-app.html',
    storageKey: 'coordenadas-progress',
    emoji: '📍',
    title: 'Coordenadas',
    subtitle: 'Leer y ubicar puntos en un plano x/y, cuadrantes incluidos',
    tracks: ['wirtschaft'],
  },
  {
    id: 'competencias-digitales',
    file: 'competencias-digitales-app.html',
    storageKey: 'competencias-digitales-progress',
    emoji: '💻',
    title: 'Competencias digitales',
    subtitle: 'Seguridad básica, archivos, correo y ofimática — banco de 24 preguntas',
    tracks: ['wirtschaft'],
  },
  {
    id: 'escenarios-trabajo',
    file: 'escenarios-trabajo-app.html',
    storageKey: 'escenarios-trabajo-progress',
    emoji: '🤝',
    title: 'Escenarios de trabajo',
    subtitle: 'Atención al cliente, equipo, errores y organización — criterio profesional',
    tracks: ['wirtschaft'],
  },
  {
    id: 'redaccion',
    file: 'redaccion-app.html',
    storageKey: 'redaccion-progress',
    emoji: '✍️',
    title: 'Redacción',
    subtitle: 'Consignas cortas con feedback de IA — sin respuesta única para comparar',
    tracks: ['wirtschaft'],
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

export default function Study({ track }: { track: TrackId }) {
  const [active, setActive] = useState<Category | null>(null);
  const [sprint, setSprint] = useState(false);
  const [clase, setClase] = useState(false);
  const progress = useProgressStore((s) => s.progress);
  const categories = CATEGORIES.filter((cat) => cat.tracks.includes(track));

  if (sprint) {
    return <AISprint track={track} onBack={() => setSprint(false)} />;
  }

  if (clase) {
    return <Clase track={track} onBack={() => setClase(false)} />;
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
