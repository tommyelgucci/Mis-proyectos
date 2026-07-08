import { useState } from "react";
import questionsData from "../data/questions.json";
import type { Question } from "../types";
import { DOMAIN_COLORS, domainColor, domainLabel } from "../theme";
import { useGame } from "../game/GameContext";
import { today } from "../game/storage";
import { pickPractice, pickExam, pickTraps, pickDaily, pickBoss, failedQuestions, shuffle } from "../game/select";
import QuizEngine, { type QuizConfig } from "../components/QuizEngine";
import { Card, Chip, BigButton } from "../components/ui";

const ALL = questionsData as Question[];

const BOSS_META: Record<string, { name: string; icon: string }> = {
  "Domain 1": { name: "El Guardián del SDK", icon: "🤖" },
  "Domain 2": { name: "La Hidra de las Tools", icon: "🐉" },
  "Domain 3": { name: "El Alquimista del Prompt", icon: "🧙" },
  "Domain 4": { name: "El Juez Responsable", icon: "⚖️" },
};

const BOSS_DOMAINS = ["Domain 1", "Domain 2", "Domain 3", "Domain 4"];

export default function Quiz() {
  const { save } = useGame();
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [practiceDomain, setPracticeDomain] = useState<string | null>(null);

  if (config) {
    return <QuizEngine config={config} onExit={() => setConfig(null)} />;
  }

  const failed = failedQuestions(ALL, save);
  const dailyDone = save.dailyDoneOn === today();
  const trapCount = ALL.filter(q => q.isTrap).length;

  const start = (c: QuizConfig) => setConfig(c);

  return (
    <div className="slide-up" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Daily Challenge */}
      <ModeCard
        icon="🎯" color="#f472b6"
        title="Reto Diario"
        desc={dailyDone ? "✅ Completado hoy — vuelve mañana para mantener tu racha" : "10 preguntas del día (incluye tus falladas). ¡Mantén la racha!"}
        action={dailyDone ? undefined : () => start({
          modeId: "daily", title: "Reto Diario", icon: "🎯",
          questions: pickDaily(ALL, save, today()), feedback: "immediate",
        })}
        actionLabel="Jugar"
      />

      {/* Práctica */}
      <Card>
        <ModeHeader icon="📚" color="#6366f1" title="Práctica" desc="Feedback inmediato con explicación. Elige un domain o todos." />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "10px 0 14px" }}>
          <Chip label="Todos" active={practiceDomain === null} color="#8b5cf6" onClick={() => setPracticeDomain(null)} />
          {Object.keys(DOMAIN_COLORS).filter(d => d !== "Trampas").map(d => (
            <Chip key={d} label={domainLabel(d)} active={practiceDomain === d} color={domainColor(d)} onClick={() => setPracticeDomain(d)} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[10, 20, 40].map(n => (
            <BigButton key={n} color="#6366f1" style={{ flex: 1, padding: "10px 8px", fontSize: 13 }} onClick={() => start({
              modeId: "practice", title: `Práctica${practiceDomain ? " · " + domainLabel(practiceDomain) : ""}`, icon: "📚",
              questions: pickPractice(ALL, practiceDomain, n), feedback: "immediate",
            })}>
              {n} preguntas
            </BigButton>
          ))}
        </div>
      </Card>

      {/* Simulacro */}
      <ModeCard
        icon="🎓" color="#38bdf8"
        title="Simulacro de Examen"
        desc="60 preguntas cronometradas (90 min), mezcla ponderada como el examen real. Resultados al final."
        action={() => start({
          modeId: "exam", title: "Simulacro AI-103", icon: "🎓",
          questions: pickExam(ALL, 60), feedback: "end", totalTimeSec: 90 * 60,
        })}
        actionLabel="Comenzar simulacro"
      />

      {/* Lightning */}
      <ModeCard
        icon="⚡" color="#facc15"
        title="Lightning Round"
        desc={`60 segundos contrarreloj. Récord: ${save.bestLightning} correctas.`}
        action={() => start({
          modeId: "lightning", title: "Lightning Round", icon: "⚡",
          questions: shuffle(ALL).slice(0, 50), feedback: "immediate", totalTimeSec: 60,
        })}
        actionLabel="¡GO!"
      />

      {/* Survival */}
      <ModeCard
        icon="💀" color="#ef4444"
        title="Muerte Súbita"
        desc={`Una fallada y se acabó. Récord: ${save.bestSurvival} seguidas.`}
        action={() => start({
          modeId: "survival", title: "Muerte Súbita", icon: "💀",
          questions: shuffle(ALL).slice(0, 100), feedback: "immediate", lives: 1,
        })}
        actionLabel="Sobrevivir"
      />

      {/* Boss battles */}
      <Card>
        <ModeHeader icon="⚔️" color="#a855f7" title="Boss Battles" desc="15 preguntas del domain, 3 vidas. Derrota al jefe para ganar su insignia." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
          {BOSS_DOMAINS.map(d => {
            const beaten = save.bossesBeaten.includes(d);
            const meta = BOSS_META[d];
            return (
              <button key={d} onClick={() => start({
                modeId: "boss", title: `Boss · ${domainLabel(d)}`, icon: meta.icon,
                questions: pickBoss(ALL, d, 15), feedback: "immediate", lives: 3,
                boss: { name: meta.name, icon: meta.icon, color: domainColor(d) },
              })}
                style={{
                  padding: "12px 10px", borderRadius: 12, cursor: "pointer",
                  border: `1.5px solid ${beaten ? "#10b981" : domainColor(d) + "55"}`,
                  background: beaten ? "#10b98112" : "#0f0f1a", color: "#e2e8f0",
                  fontSize: 12, textAlign: "center",
                }}>
                <div style={{ fontSize: 24 }}>{meta.icon}</div>
                <div style={{ fontWeight: 700, margin: "4px 0 2px", color: domainColor(d) }}>{meta.name}</div>
                <div style={{ color: "#64748b" }}>{domainLabel(d)} {beaten && "· ✓ vencido"}</div>
              </button>
            );
          })}
        </div>
        {/* Jefe final: requiere vencer a los 4 */}
        <div style={{ marginTop: 10 }}>
          {BOSS_DOMAINS.every(d => save.bossesBeaten.includes(d)) ? (
            <BigButton color="#a855f7" style={{ width: "100%" }} onClick={() => start({
              modeId: "boss", title: "JEFE FINAL", icon: "👑",
              questions: pickExam(ALL, 60), feedback: "immediate", lives: 3, totalTimeSec: 90 * 60,
              boss: { name: "EL EXAMEN AI-103", icon: "👑", color: "#a855f7" },
            })}>
              👑 JEFE FINAL: El Examen {save.finalBossBeaten && "· ✓ vencido"}
            </BigButton>
          ) : (
            <div style={{ textAlign: "center", fontSize: 11, color: "#64748b", padding: 8 }}>
              🔒 Derrota a los 4 jefes para desbloquear al JEFE FINAL
            </div>
          )}
        </div>
      </Card>

      {/* Trampas */}
      <ModeCard
        icon="🪤" color="#ef4444"
        title="Modo Trampa"
        desc={`Solo las ${trapCount} preguntas-trampa del banco: las que deciden el examen.`}
        action={() => start({
          modeId: "traps", title: "Modo Trampa", icon: "🪤",
          questions: pickTraps(ALL, 30), feedback: "immediate",
        })}
        actionLabel="Entrenar trampas"
      />

      {/* Falladas */}
      <ModeCard
        icon="🔁" color="#fb923c"
        title="Repaso de Falladas"
        desc={failed.length ? `Tienes ${failed.length} preguntas pendientes de dominar.` : "Sin falladas pendientes. 🎉"}
        action={failed.length ? () => start({
          modeId: "failed", title: "Repaso de Falladas", icon: "🔁",
          questions: shuffle(failed).slice(0, 30), feedback: "immediate",
        }) : undefined}
        actionLabel="Repasar"
      />
    </div>
  );
}

function ModeHeader({ icon, color, title, desc }: { icon: string; color: string; title: string; desc: string }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <span style={{ fontWeight: 800, fontSize: 16, color }}>{title}</span>
      </div>
      <div style={{ fontSize: 12.5, color: "#94a3b8", marginTop: 4, lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}

function ModeCard({ icon, color, title, desc, action, actionLabel }: {
  icon: string; color: string; title: string; desc: string; action?: () => void; actionLabel: string;
}) {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <ModeHeader icon={icon} color={color} title={title} desc={desc} />
        {action && (
          <BigButton color={color} onClick={action} style={{ whiteSpace: "nowrap", padding: "10px 16px", fontSize: 13 }}>
            {actionLabel}
          </BigButton>
        )}
      </div>
    </Card>
  );
}
