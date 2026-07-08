import { useEffect, useState } from "react";
import { GameProvider, useGame } from "./game/GameContext";
import { levelFor } from "./game/xp";
import { daysToExam } from "./theme";
import { getToken, login } from "./api";
import Quiz from "./modes/Quiz";
import Audio from "./modes/Audio";
import Flashcards from "./modes/Flashcards";
import Dashboard from "./modes/Dashboard";
import Tutor from "./modes/Tutor";
import { Card, BigButton } from "./components/ui";

type Tab = "quiz" | "audio" | "cards" | "tutor" | "dashboard";

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: "quiz", icon: "🎮", label: "Jugar" },
  { id: "audio", icon: "🎧", label: "Audio" },
  { id: "cards", icon: "🃏", label: "Cards" },
  { id: "tutor", icon: "🤖", label: "Tutor" },
  { id: "dashboard", icon: "📊", label: "Progreso" },
];

export default function App() {
  const [authed, setAuthed] = useState(() => !!getToken());
  if (!authed) return <Gate onOk={() => setAuthed(true)} />;
  return (
    <GameProvider>
      <Shell />
    </GameProvider>
  );
}

// ─────────────────────────── LOGIN ───────────────────────────
function Gate({ onOk }: { onOk: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const tryLogin = async () => {
    if (!pw || busy) return;
    setBusy(true);
    const ok = await login(pw);
    setBusy(false);
    if (ok) onOk();
    else { setError(true); setPw(""); }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <Card style={{ width: "100%", maxWidth: 380, textAlign: "center", padding: 30 }} className={error ? "shake" : "slide-up"}>
        <div style={{ fontSize: 52 }}>🧠</div>
        <h1 style={{ margin: "8px 0 2px", fontSize: 26, fontWeight: 900, background: "linear-gradient(90deg, #818cf8, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          CogniLab
        </h1>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 22, letterSpacing: 2, textTransform: "uppercase" }}>
          AI-103 · Laboratorio privado
        </div>
        <input
          type="password"
          value={pw}
          autoFocus
          onChange={e => { setPw(e.target.value); setError(false); }}
          onKeyDown={e => e.key === "Enter" && tryLogin()}
          placeholder="Contraseña"
          style={{
            width: "100%", padding: "13px 16px", borderRadius: 12, marginBottom: 12,
            border: `1.5px solid ${error ? "#ef4444" : "#2d2d4e"}`, background: "#0f0f1a",
            color: "#e2e8f0", fontSize: 15, outline: "none", textAlign: "center",
          }}
        />
        {error && <div style={{ color: "#ef4444", fontSize: 12, marginBottom: 10 }}>Contraseña incorrecta</div>}
        <BigButton onClick={tryLogin} disabled={!pw || busy} style={{ width: "100%" }}>
          {busy ? "Verificando…" : "Entrar al laboratorio"}
        </BigButton>
      </Card>
    </div>
  );
}

// ─────────────────────────── SHELL ───────────────────────────
function Shell() {
  const { save, newBadges, clearNewBadges } = useGame();
  const [tab, setTab] = useState<Tab>("quiz");
  const level = levelFor(save.xp);

  // Toast de logros nuevos
  useEffect(() => {
    if (newBadges.length) {
      const t = setTimeout(clearNewBadges, 4000);
      return () => clearTimeout(t);
    }
  }, [newBadges, clearNewBadges]);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 14px 90px" }}>

      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 19, fontWeight: 900, background: "linear-gradient(90deg, #818cf8, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            🧠 CogniLab
          </div>
          <div style={{ fontSize: 10.5, color: "#64748b" }}>{level.icon} {level.name}</div>
        </div>
        <div style={{ textAlign: "right", fontSize: 11.5 }}>
          <div style={{ color: "#f59e0b", fontWeight: 800 }}>⭐ {save.xp.toLocaleString()} XP</div>
          <div style={{ color: "#fb923c" }}>🔥 {save.dayStreak} días · ⏳ {daysToExam()}d al examen</div>
        </div>
      </header>

      {/* Contenido */}
      {tab === "quiz" && <Quiz />}
      {tab === "audio" && <Audio />}
      {tab === "cards" && <Flashcards />}
      {tab === "tutor" && <Tutor />}
      {tab === "dashboard" && <Dashboard />}

      {/* Toast logros */}
      {newBadges.length > 0 && (
        <div className="slide-up" style={{
          position: "fixed", top: 14, left: "50%", transform: "translateX(-50%)", zIndex: 1200,
          background: "linear-gradient(135deg, #1e1e32, #16213e)", border: "1px solid #f59e0b88",
          borderRadius: 14, padding: "12px 20px", boxShadow: "0 8px 30px #000a", textAlign: "center",
        }}>
          {newBadges.map(b => (
            <div key={b.id} style={{ fontSize: 13 }}>
              <span style={{ fontSize: 20 }}>{b.icon}</span>{" "}
              <b style={{ color: "#fbbf24" }}>¡Logro desbloqueado!</b> {b.name}
            </div>
          ))}
        </div>
      )}

      {/* Nav inferior fija (touch-first para iPad) */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "#13131fee", backdropFilter: "blur(12px)", borderTop: "1px solid #2d2d4e",
        display: "flex", justifyContent: "space-around", padding: "8px 6px calc(8px + env(safe-area-inset-bottom))",
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            color: tab === t.id ? "#818cf8" : "#64748b", padding: "4px 12px",
            fontWeight: tab === t.id ? 700 : 500, fontSize: 10.5,
          }}>
            <span style={{ fontSize: 21, filter: tab === t.id ? "none" : "grayscale(0.6)" }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
