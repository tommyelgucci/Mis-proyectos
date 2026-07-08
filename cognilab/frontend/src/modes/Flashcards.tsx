import { useMemo, useState } from "react";
import quickCardsData from "../data/quickCards.json";
import type { QuickCard } from "../types";
import { domainColor, domainLabel } from "../theme";
import { useGame } from "../game/GameContext";
import { today } from "../game/storage";
import { shuffle } from "../game/select";
import { Card, BigButton } from "../components/ui";

const CARDS = quickCardsData as QuickCard[];

// SM-2 simplificado: Again/Difícil/Bien/Fácil
const GRADES = [
  { id: "again", label: "Otra vez", color: "#ef4444", desc: "Hoy mismo" },
  { id: "hard", label: "Difícil", color: "#fb923c", desc: "" },
  { id: "good", label: "Bien", color: "#38bdf8", desc: "" },
  { id: "easy", label: "Fácil", color: "#10b981", desc: "" },
] as const;

function nextInterval(grade: string, prevInterval: number, ease: number): { interval: number; ease: number } {
  switch (grade) {
    case "again": return { interval: 0, ease: Math.max(1.3, ease - 0.2) };
    case "hard": return { interval: Math.max(1, Math.round(prevInterval * 1.2)) || 1, ease: Math.max(1.3, ease - 0.15) };
    case "good": return { interval: prevInterval ? Math.round(prevInterval * ease) : 1, ease };
    case "easy": return { interval: prevInterval ? Math.round(prevInterval * ease * 1.4) : 3, ease: ease + 0.1 };
    default: return { interval: 1, ease };
  }
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function Flashcards() {
  const { save, update } = useGame();
  const [queue, setQueue] = useState<QuickCard[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);
  const [started, setStarted] = useState(false);

  const t = today();
  const dueCards = useMemo(() => {
    return CARDS.filter(c => {
      const srs = save.srs[c.id];
      return !srs || srs.due <= t;
    });
  }, [save.srs, t]);

  const start = () => {
    setQueue(shuffle(dueCards).slice(0, 20));
    setDone(0);
    setFlipped(false);
    setStarted(true);
  };

  const grade = (g: string) => {
    const card = queue[0];
    const prev = save.srs[card.id] ?? { due: t, interval: 0, ease: 2.5 };
    const { interval, ease } = nextInterval(g, prev.interval, prev.ease);
    update(s => ({
      ...s,
      xp: s.xp + (g === "again" ? 1 : 3),
      srs: { ...s.srs, [card.id]: { due: addDays(t, interval), interval, ease } },
    }));
    setFlipped(false);
    setDone(d => d + 1);
    // "again" → reinsertar al final de la cola
    setQueue(q => (g === "again" ? [...q.slice(1), card] : q.slice(1)));
  };

  if (!started || queue.length === 0) {
    return (
      <div className="slide-up">
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>🃏</div>
          <h2 style={{ margin: "0 0 6px", fontSize: 18 }}>Flashcards con repetición espaciada</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
            {started && queue.length === 0
              ? `✅ Sesión completada (${done} tarjetas). `
              : ""}
            {dueCards.length
              ? `Tienes ${dueCards.length} tarjetas pendientes para hoy.`
              : "No hay tarjetas pendientes hoy. ¡Vuelve mañana! 🌙"}
          </p>
          {dueCards.length > 0 && (
            <BigButton onClick={start} color="#a855f7">
              {started ? "Otra ronda" : `Estudiar ${Math.min(20, dueCards.length)} tarjetas`}
            </BigButton>
          )}
        </Card>
      </div>
    );
  }

  const card = queue[0];
  const color = domainColor(card.domain);

  return (
    <div className="slide-up">
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 10 }}>
        <span>🃏 Flashcards</span>
        <span>{done} hechas · {queue.length} en cola</span>
      </div>

      <div key={`${card.id}-${flipped}`} className="flip-in">
        <Card
          style={{ border: `1px solid ${color}33`, minHeight: 260, display: "flex", flexDirection: "column", cursor: "pointer", boxShadow: `0 0 30px ${color}12` }}
        >
          <div onClick={() => setFlipped(f => !f)} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ background: color + "22", color, padding: "3px 10px", borderRadius: 12, fontSize: 10, fontWeight: 700 }}>
                {domainLabel(card.domain)}
              </span>
              <span style={{ fontSize: 10, color: "#475569" }}>{flipped ? "RESPUESTA" : "PREGUNTA"}</span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "10px 4px" }}>
              <span style={{ fontSize: flipped ? 15 : 17, lineHeight: 1.6, color: flipped ? "#a5f3fc" : "#f1f5f9", fontWeight: flipped ? 500 : 600 }}>
                {flipped ? card.back : card.front}
              </span>
            </div>
            {!flipped && <div style={{ textAlign: "center", fontSize: 11, color: "#475569" }}>toca para ver la respuesta</div>}
          </div>
        </Card>
      </div>

      {flipped && (
        <div className="slide-up" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 14 }}>
          {GRADES.map(g => (
            <button key={g.id} onClick={() => grade(g.id)} style={{
              padding: "12px 6px", borderRadius: 10, border: `1.5px solid ${g.color}55`,
              background: g.color + "15", color: g.color, fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>
              {g.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
