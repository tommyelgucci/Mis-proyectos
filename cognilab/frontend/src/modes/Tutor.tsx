import { useRef, useState } from "react";
import { aiChat } from "../api";
import { Card, BigButton } from "../components/ui";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export default function Tutor() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    const reply = await aiChat(next);
    setMessages(m => [...m, {
      role: "assistant",
      content: reply ?? "⚠️ El tutor IA no está disponible ahora (sin conexión al backend o sin créditos de HF). Los demás modos funcionan sin internet.",
    }]);
    setBusy(false);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const SUGGESTIONS = [
    "¿Cuándo uso RAG y cuándo Fine-Tuning?",
    "Explícame function_calling con una analogía",
    "¿Cuáles son las 4 capas de mitigación?",
    "Dame 3 trampas típicas del examen",
  ];

  return (
    <div className="slide-up" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Card style={{ padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>🤖</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>Tutor IA</div>
            <div style={{ fontSize: 11.5, color: "#94a3b8" }}>Pregúntame lo que sea del temario AI-103. Respondo con el contexto del examen.</div>
          </div>
        </div>
      </Card>

      <Card style={{ minHeight: 300, maxHeight: 420, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "auto 0" }}>
            <div style={{ textAlign: "center", fontSize: 12, color: "#64748b", marginBottom: 4 }}>Prueba con:</div>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => setInput(s)} style={{
                padding: "10px 14px", borderRadius: 10, border: "1px solid #2d2d4e",
                background: "#0f0f1a", color: "#94a3b8", fontSize: 12.5, cursor: "pointer", textAlign: "left",
              }}>💬 {s}</button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "85%", padding: "10px 14px", borderRadius: 14, fontSize: 13.5, lineHeight: 1.6,
            background: m.role === "user" ? "#6366f130" : "#0f0f1a",
            border: `1px solid ${m.role === "user" ? "#6366f155" : "#2d2d4e"}`,
            color: "#e2e8f0", whiteSpace: "pre-wrap",
          }}>
            {m.content}
          </div>
        ))}
        {busy && <div className="pulse" style={{ fontSize: 13, color: "#818cf8" }}>🤖 pensando…</div>}
        <div ref={endRef} />
      </Card>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Escribe tu pregunta…"
          style={{
            flex: 1, padding: "12px 14px", borderRadius: 12, border: "1px solid #2d2d4e",
            background: "#0f0f1a", color: "#e2e8f0", fontSize: 14, outline: "none",
          }}
        />
        <BigButton onClick={send} disabled={busy || !input.trim()}>Enviar</BigButton>
      </div>
    </div>
  );
}
