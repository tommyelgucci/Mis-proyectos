/**
 * Catálogo de categorías de Estudio (las 11 apps HTML en public/apps/).
 * Vive en lib/ (no en pages/Study.tsx) para que otras páginas —como
 * ErrorNotebook.tsx— puedan importarlo sin crear una dependencia circular
 * con la página que lo consume primero.
 */
import type { TrackId } from './tracks';

export interface Category {
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
    tracks: ['ict', 'wirtschaft'],
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
  {
    id: 'deutsch',
    file: 'deutsch-app.html',
    storageKey: 'deutsch-progress',
    emoji: '🇩🇪',
    title: 'Deutsch',
    subtitle: 'Rechtschreibung, Grammatik, Wortschatz y Leseverstehen — banco de 24 preguntas',
    tracks: ['wirtschaft'],
  },
  {
    id: 'englisch',
    file: 'englisch-app.html',
    storageKey: 'englisch-progress',
    emoji: '🇬🇧',
    title: 'Englisch',
    subtitle: 'Spelling, grammar, vocabulary y reading — banco de 24 preguntas',
    tracks: ['wirtschaft'],
  },
];
