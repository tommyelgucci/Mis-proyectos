import { useEffect, useState } from 'react';
import Study from './pages/Study';
import Account from './pages/Account';
import Tutor from './pages/Tutor';
import Progress from './pages/Progress';
import { startStorageBridge } from './utils/storage-bridge';
import { useAuth } from './hooks/useAuth';
import './App.css';

type Tab = 'inicio' | 'estudiar' | 'tutor' | 'progreso' | 'cuenta';

const TABS: { id: Tab; label: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'estudiar', label: '⚡ Estudiar' },
  { id: 'tutor', label: '🤖 Tutor IA' },
  { id: 'progreso', label: '📊 Progreso' },
  { id: 'cuenta', label: '🔐 Cuenta' },
];

function App() {
  const [tab, setTab] = useState<Tab>('inicio');
  const { user } = useAuth();

  useEffect(() => {
    startStorageBridge();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>🧠 BrainBit</h1>
        <p>ICT-Eignungstest Study Suite · Informatiker/in EFZ Applikationsentwicklung</p>
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
            <p>Tu plataforma unificada para preparar el examen ICT-Eignungstest</p>

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

        {tab === 'tutor' && <Tutor user={user} />}

        {tab === 'progreso' && <Progress onGoToCategory={() => setTab('estudiar')} />}

        {tab === 'cuenta' && <Account user={user} />}
      </main>
    </div>
  );
}

export default App;
