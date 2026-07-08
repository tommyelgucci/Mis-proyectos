import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="header">
        <h1>🧠 BrainBit</h1>
        <p>Multicheck® ICT Study Suite</p>
      </header>

      <main className="main">
        <section className="hero">
          <h2>Welcome to BrainBit</h2>
          <p>A comprehensive study platform for the Multicheck ICT exam</p>

          <div className="features">
            <div className="feature">
              <h3>⚡ Sprint Training</h3>
              <p>Fast-paced exercises from 6 categories</p>
            </div>
            <div className="feature">
              <h3>🤖 AI Tutor</h3>
              <p>Chat with an intelligent study assistant</p>
            </div>
            <div className="feature">
              <h3>🔍 Smart Search</h3>
              <p>Real-time internet search integration</p>
            </div>
            <div className="feature">
              <h3>📊 Progress Tracking</h3>
              <p>Sync your progress across devices</p>
            </div>
          </div>
        </section>

        <section className="status">
          <p>Status: {count} components loaded</p>
          <button onClick={() => setCount(count + 1)}>
            Increment
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
