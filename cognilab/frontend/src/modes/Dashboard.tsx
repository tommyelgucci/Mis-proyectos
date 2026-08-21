import { useMemo, useRef } from "react";
import questionsData from "../data/questions.json";
import type { Question } from "../types";
import { DOMAIN_WEIGHTS, VOUCHER_EXPIRES, daysToExam, domainColor, domainLabel } from "../theme";
import { useGame } from "../game/GameContext";
import { exportSave, importSave } from "../game/storage";
import { levelFor, nextLevel } from "../game/xp";
import { BADGES } from "../game/achievements";
import { Card, Bar, StatPill } from "../components/ui";

const ALL = questionsData as Question[];

export default function Dashboard() {
  const { save, update } = useGame();
  const fileRef = useRef<HTMLInputElement>(null);

  const level = levelFor(save.xp);
  const next = nextLevel(save.xp);
  const days = daysToExam(save.examDate);

  // % dominado por domain: preguntas con lastResult correct / total del domain
  const domainMastery = useMemo(() => {
    const out: { domain: string; mastered: number; total: number; accuracy: number }[] = [];
    for (const d of ["Domain 1", "Domain 2", "Domain 3", "Domain 4", "Cross", "Domain 1 (real)", "Domain 5", "Domain 3 (real)", "Domain 4 (real)"]) {
      const qs = ALL.filter(q => q.domain === d);
      let mastered = 0, seen = 0, correct = 0;
      for (const q of qs) {
        const st = save.stats[q.id];
        if (!st) continue;
        seen += st.seen;
        correct += st.correct;
        if (st.lastResult === "correct") mastered++;
      }
      out.push({ domain: d, mastered, total: qs.length, accuracy: seen ? correct / seen : 0 });
    }
    return out;
  }, [save.stats]);

  // Readiness: acierto ponderado por peso del examen, penalizado por cobertura
  const readiness = useMemo(() => {
    let score = 0;
    for (const m of domainMastery) {
      const w = DOMAIN_WEIGHTS[m.domain] ?? 0;
      const coverage = m.total ? Math.min(1, m.mastered / (m.total * 0.6)) : 0;
      score += w * (m.accuracy * 0.6 + coverage * 0.4);
    }
    return Math.round(score * 100);
  }, [domainMastery]);

  const globalAccuracy = save.totalAnswered ? Math.round((save.totalCorrect / save.totalAnswered) * 100) : 0;

  const topFailed = useMemo(() => {
    return ALL
      .map(q => ({ q, wrong: save.stats[q.id]?.wrong ?? 0, last: save.stats[q.id]?.lastResult }))
      .filter(x => x.wrong > 0)
      .sort((a, b) => b.wrong - a.wrong)
      .slice(0, 5);
  }, [save.stats]);

  const readinessColor = readiness >= 80 ? "#10b981" : readiness >= 55 ? "#f59e0b" : "#ef4444";
  const readinessMsg =
    readiness >= 80 ? "¡Listo para el examen! 🚀"
    : readiness >= 55 ? "Vas bien, sigue puliendo los domains débiles."
    : save.totalAnswered < 30 ? "Responde más preguntas para calibrar tu preparación."
    : "Aún en construcción — enfócate en práctica diaria.";

  const doExport = () => {
    const blob = new Blob([exportSave()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cognilab_progreso_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const doImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (importSave(String(reader.result))) window.location.reload();
      else alert("Archivo inválido");
    };
    reader.readAsText(file);
  };

  return (
    <div className="slide-up" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Countdown + nivel */}
      <Card style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#64748b", letterSpacing: 2, textTransform: "uppercase" }}>Examen AI-103</div>
        {days === null ? (
          <>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#64748b", margin: "6px 0" }}>Sin fecha</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10 }}>
              Agenda tu examen y te llevo la cuenta regresiva.
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 40, fontWeight: 900, background: "linear-gradient(90deg, #818cf8, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {days} días
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10 }}>
              {days > 21 ? "Hay tiempo — construye tu base 🧱" : days > 7 ? "Recta final — práctica intensiva 🔥" : "¡Última semana! Repasa trampas y falladas 🎯"}
            </div>
          </>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 14 }}>
          <input
            type="date"
            value={save.examDate}
            max={VOUCHER_EXPIRES}
            onChange={e => update(s => ({ ...s, examDate: e.target.value }))}
            style={{
              padding: "6px 10px", borderRadius: 8, border: "1px solid #2d2d4e",
              background: "#0f0f1a", color: "#cbd5e1", fontSize: 12, colorScheme: "dark",
            }}
          />
          {save.examDate && (
            <button onClick={() => update(s => ({ ...s, examDate: "" }))} style={{
              padding: "6px 10px", borderRadius: 8, border: "1px solid #2d2d4e",
              background: "transparent", color: "#64748b", fontSize: 11, cursor: "pointer",
            }}>Borrar</button>
          )}
        </div>
        <div style={{ fontSize: 10, color: "#475569", marginBottom: 14 }}>
          Tu voucher vence el 18 de octubre de 2026.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 26 }}>{level.icon}</span>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#f1f5f9" }}>{level.name}</span>
        </div>
        <div style={{ fontSize: 12, color: "#f59e0b", fontWeight: 700, marginBottom: 6 }}>{save.xp.toLocaleString()} XP</div>
        {next && (
          <>
            <Bar pct={((save.xp - level.minXp) / (next.minXp - level.minXp)) * 100} color="#f59e0b" />
            <div style={{ fontSize: 10, color: "#64748b", marginTop: 4 }}>{next.minXp - save.xp} XP para {next.icon} {next.name}</div>
          </>
        )}
      </Card>

      {/* Readiness */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>🎓 Readiness Score</span>
          <span style={{ fontSize: 26, fontWeight: 900, color: readinessColor }}>{readiness}%</span>
        </div>
        <Bar pct={readiness} color={readinessColor} height={10} />
        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>{readinessMsg}</div>
      </Card>

      {/* Stats rápidas */}
      <Card style={{ padding: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          <StatPill icon="🔥" value={save.dayStreak} label="racha días" color="#fb923c" />
          <StatPill icon="✅" value={`${globalAccuracy}%`} label="acierto" color="#10b981" />
          <StatPill icon="📝" value={save.totalAnswered} label="respondidas" />
          <StatPill icon="🏅" value={`${save.badges.length}/${BADGES.length}`} label="logros" color="#f59e0b" />
        </div>
      </Card>

      {/* Dominio por domain */}
      <Card>
        <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Dominio del temario</div>
        {domainMastery.map(m => (
          <div key={m.domain} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
              <span style={{ color: domainColor(m.domain), fontWeight: 600 }}>{domainLabel(m.domain)}</span>
              <span style={{ color: "#94a3b8" }}>
                {m.mastered}/{m.total} dominadas {m.accuracy > 0 && `· ${Math.round(m.accuracy * 100)}% acierto`}
              </span>
            </div>
            <Bar pct={m.total ? (m.mastered / m.total) * 100 : 0} color={domainColor(m.domain)} />
          </div>
        ))}
      </Card>

      {/* Logros */}
      <Card>
        <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Logros</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
          {BADGES.map(b => {
            const earned = save.badges.includes(b.id);
            return (
              <div key={b.id} style={{
                padding: "10px 8px", borderRadius: 10, textAlign: "center",
                border: `1px solid ${earned ? "#f59e0b55" : "#2d2d4e"}`,
                background: earned ? "#f59e0b10" : "#0f0f1a",
                opacity: earned ? 1 : 0.45,
              }}>
                <div style={{ fontSize: 22, filter: earned ? "none" : "grayscale(1)" }}>{b.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: earned ? "#fbbf24" : "#64748b", margin: "3px 0 2px" }}>{b.name}</div>
                <div style={{ fontSize: 9.5, color: "#64748b", lineHeight: 1.35 }}>{b.desc}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Top falladas */}
      {topFailed.length > 0 && (
        <Card>
          <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Tus 5 más falladas</div>
          {topFailed.map(({ q, wrong, last }) => (
            <div key={q.id} style={{ padding: "8px 10px", background: "#0f0f1a", borderRadius: 8, marginBottom: 6, fontSize: 12, lineHeight: 1.5 }}>
              <span style={{ color: domainColor(q.domain), fontWeight: 700 }}>[{domainLabel(q.domain)}]</span>{" "}
              <span style={{ color: "#cbd5e1" }}>{q.question.slice(0, 100)}{q.question.length > 100 ? "…" : ""}</span>
              <span style={{ color: "#ef4444", marginLeft: 6 }}>✗{wrong}</span>
              {last === "correct" && <span style={{ color: "#10b981", marginLeft: 4 }}>ya dominada ✓</span>}
            </div>
          ))}
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>→ Usa el modo "Repaso de Falladas" en Quiz para dominarlas.</div>
        </Card>
      )}

      {/* Ajustes + respaldo */}
      <Card>
        <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Ajustes y respaldo</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 13, color: "#cbd5e1" }}>🔊 Sonidos</span>
          <button onClick={() => update(s => ({ ...s, soundOn: !s.soundOn }))} style={{
            padding: "6px 14px", borderRadius: 8, border: "1px solid #2d2d4e", cursor: "pointer",
            background: save.soundOn ? "#6366f122" : "transparent", color: save.soundOn ? "#818cf8" : "#64748b", fontSize: 12, fontWeight: 700,
          }}>
            {save.soundOn ? "Activados" : "Desactivados"}
          </button>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={doExport} style={btnStyle}>⬇️ Exportar progreso</button>
          <button onClick={() => fileRef.current?.click()} style={btnStyle}>⬆️ Importar</button>
          <input ref={fileRef} type="file" accept=".json" hidden onChange={e => e.target.files?.[0] && doImport(e.target.files[0])} />
        </div>
        <div style={{ fontSize: 10.5, color: "#475569", marginTop: 8, lineHeight: 1.5 }}>
          Tu progreso vive en este navegador (localStorage). Exporta un respaldo de vez en cuando, sobre todo antes de limpiar el historial de Safari.
        </div>
      </Card>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  flex: 1, padding: "10px", borderRadius: 10, border: "1px solid #2d2d4e",
  background: "#0f0f1a", color: "#94a3b8", fontSize: 12, cursor: "pointer", fontWeight: 600,
};
