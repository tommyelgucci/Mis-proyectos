import { useEffect, useState } from 'react';
import Study from './pages/Study';
import { startStorageBridge } from './utils/storage-bridge';
import './App.css';

type Tab = 'inicio' | 'estudiar' | 'tutor' | 'progreso';

const TABS: { id: Tab; label: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'estudiar', label: '⚡ Estudiar' },
  { id: 'tutor', label: '🤖 Tutor IA' },
  { id: 'progreso', label: '📊 Progreso' },
];

function App() {
  const [tab, setTab] = useState<Tab>('inicio');

  useEffect(() => {
    startStorageBridge();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>🧠 BrainBit</h1>
        <p>Multicheck® ICT Study Suite · Informatiker/in EFZ Applikationsentwicklung</p>
      </header>

      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="main">
        {tab === 'inicio' && (
          <section className="hero">
            <h2>Bienvenido a BrainBit</h2>
            <p>Tu plataforma unificada para preparar el examen Multicheck® ICT</p>

            <div className="features">
              <button className="feature" onClick={() => setTab('estudiar')}>
                <h3>⚡ Entrenamiento</h3>
                <p>Las 6 categorías del examen con ejercicios infinitos verificados</p>
              </button>
              <button className="feature" onClick={() => setTab('tutor')}>
                <h3>🤖 Tutor IA</h3>
                <p>Chat inteligente que explica conceptos en español</p>
              </button>
              <button className="feature" onClick={() => setTab('progreso')}>
                <h3>📊 Progreso</h3>
                <p>Precisión por tipo y detección de puntos débiles</p>
              </button>
              <div className="feature">
                <h3>🔍 Búsqueda</h3>
                <p>Búsqueda en internet integrada (próximamente)</p>
              </div>
            </div>
          </section>
        )}

        {tab === 'estudiar' && <Study />}

        {tab === 'tutor' && (
          <section className="placeholder">
            <h2>🤖 Tutor IA</h2>
            <p>En construcción — Fase 4: chat con Claude especializado en el examen.</p>
          </section>
        )}

        {tab === 'progreso' && (
          <section className="placeholder">
            <h2>📊 Dashboard de progreso</h2>
            <p>
              En construcción — mientras tanto, cada categoría muestra su resumen de
              progreso en la pestaña ⚡ Estudiar.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
