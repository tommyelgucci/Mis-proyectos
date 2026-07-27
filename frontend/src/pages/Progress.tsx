/**
 * Fase 6 — Dashboard de progreso.
 *
 * Toda la lógica de agregación vive en lib/progress-stats.ts (funciones puras,
 * verificadas por scripts/verify-progress.ts). Aquí solo se pinta.
 */
import { useProgressStore } from '../utils/storage-bridge';
import {
  MIN_ATTEMPTS,
  buildOverview,
  hasActivity,
  readAllCategories,
  suggestNextSession,
  weakestTypes,
  type CategoryStat,
  type TypeStat,
} from '../lib/progress-stats';
import '../styles/progress.css';

/** Verde ≥80, ámbar ≥50, rojo por debajo. Sin datos, gris. */
function accuracyClass(accuracy: number | null): string {
  if (accuracy === null) return 'none';
  if (accuracy >= 80) return 'good';
  if (accuracy >= 50) return 'mid';
  return 'bad';
}

function Bar({ accuracy }: { accuracy: number | null }) {
  return (
    <div className="pg-bar" role="presentation">
      <div
        className={`pg-bar-fill ${accuracyClass(accuracy)}`}
        style={{ width: `${accuracy ?? 0}%` }}
      />
    </div>
  );
}

function TypeRow({ type }: { type: TypeStat }) {
  return (
    <div className="pg-type">
      {/* title: los nombres más largos ("Asignaciones en cadena") se recortan
          con elipsis en tarjetas estrechas; al pasar el ratón se ven enteros. */}
      <span className="pg-type-label" title={type.label}>
        {type.label}
      </span>
      <Bar accuracy={type.accuracy} />
      <span className={`pg-type-acc ${accuracyClass(type.accuracy)}`}>
        {type.accuracy === null ? 'sin datos' : `${type.accuracy}%`}
      </span>
      <span className="pg-type-count">
        {type.total > 0 ? `${type.ok}/${type.total}` : '—'}
        {type.fewData && <span className="pg-few" title={`Menos de ${MIN_ATTEMPTS} intentos`}>·</span>}
      </span>
    </div>
  );
}

function CategoryCard({ cat }: { cat: CategoryStat }) {
  const started = hasActivity(cat);
  const { meta } = cat;

  return (
    <article className={started ? 'pg-card' : 'pg-card empty'}>
      <header className="pg-card-head">
        <span className="pg-card-emoji">{meta.emoji}</span>
        <div className="pg-card-title-wrap">
          <h3 className="pg-card-title">{meta.title}</h3>
          <div className="pg-card-badges">
            {cat.best !== null && cat.best > 0 && meta.sprintSize !== null && (
              <span className="pg-badge">
                🏅 Sprint {cat.best}/{meta.sprintSize}
              </span>
            )}
            {cat.memBest !== null && cat.memBest > 0 && meta.memBestTotal !== null && (
              <span className="pg-badge">
                🧠 Memoria {cat.memBest}/{meta.memBestTotal}
              </span>
            )}
            {cat.mastered !== null && meta.masteredTotal !== null && (
              <span className="pg-badge">
                ✓ {cat.mastered}/{meta.masteredTotal} dominados
              </span>
            )}
          </div>
        </div>
        <span className={`pg-card-acc ${accuracyClass(cat.accuracy)}`}>
          {cat.accuracy === null ? '—' : `${cat.accuracy}%`}
        </span>
      </header>

      {cat.types.length > 0 ? (
        <div className="pg-types">
          {cat.types.map((t) => (
            <TypeRow key={t.id} type={t} />
          ))}
        </div>
      ) : (
        <p className="pg-note">
          Esta categoría no lleva estadística por tipo: su progreso se mide por
          ejercicios dominados.
        </p>
      )}

      {cat.total > 0 && (
        <footer className="pg-card-foot">
          {cat.ok} aciertos de {cat.total} intentos
        </footer>
      )}
    </article>
  );
}

export default function Progress({ onGoToCategory }: { onGoToCategory?: () => void }) {
  const snapshot = useProgressStore((s) => s.progress);
  const cats = readAllCategories(snapshot);
  const overview = buildOverview(cats);
  const weak = weakestTypes(cats);
  const suggestion = suggestNextSession(cats);

  return (
    <section className="pg-page">
      <h2 className="pg-heading">📊 Tu progreso</h2>

      <div className="pg-tiles">
        <div className="pg-tile">
          <span className="pg-tile-num">{overview.answered}</span>
          <span className="pg-tile-label">ejercicios respondidos</span>
        </div>
        <div className="pg-tile">
          <span className={`pg-tile-num ${accuracyClass(overview.accuracy)}`}>
            {overview.accuracy === null ? '—' : `${overview.accuracy}%`}
          </span>
          <span className="pg-tile-label">precisión global</span>
        </div>
        <div className="pg-tile">
          <span className="pg-tile-num">
            {overview.categoriesStarted}/{overview.categoriesTotal}
          </span>
          <span className="pg-tile-label">categorías empezadas</span>
        </div>
        <div className="pg-tile">
          <span className="pg-tile-num">
            {overview.mastered}/{overview.masteredTotal}
          </span>
          <span className="pg-tile-label">ejercicios dominados</span>
        </div>
      </div>

      <div className="pg-suggestion">
        <span className="pg-suggestion-tag">Siguiente sesión</span>
        <h3 className="pg-suggestion-title">{suggestion.headline}</h3>
        <p className="pg-suggestion-reason">{suggestion.reason}</p>
        {onGoToCategory && (
          <button className="primary-btn" onClick={onGoToCategory}>
            Ir a entrenar →
          </button>
        )}
      </div>

      {weak.length > 0 && (
        <div className="pg-weak">
          <h3 className="pg-section-title">Puntos débiles</h3>
          <p className="pg-section-note">
            Tipos por debajo del 70 % con al menos {MIN_ATTEMPTS} intentos — con menos
            datos el porcentaje aún no dice nada.
          </p>
          <div className="pg-weak-list">
            {weak.map((w) => (
              <div key={`${w.categoryId}-${w.type.id}`} className="pg-weak-row">
                <span className="pg-weak-cat">
                  {w.emoji} {w.categoryTitle}
                </span>
                <span className="pg-weak-type">{w.type.label}</span>
                <Bar accuracy={w.type.accuracy} />
                <span className={`pg-type-acc ${accuracyClass(w.type.accuracy)}`}>
                  {w.type.accuracy}%
                </span>
                <span className="pg-type-count">
                  {w.type.ok}/{w.type.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 className="pg-section-title">Detalle por categoría</h3>
      <div className="pg-cards">
        {cats.map((cat) => (
          <CategoryCard key={cat.meta.id} cat={cat} />
        ))}
      </div>

      {overview.answered === 0 && (
        <p className="pg-empty-hint">
          El progreso se registra solo mientras entrenas en ⚡ Estudiar. Si ya
          entrenaste en otro dispositivo, inicia sesión en 🔐 Cuenta para
          sincronizarlo.
        </p>
      )}
    </section>
  );
}
