import { useState } from "react";
import type { CaseStudy } from "../types";
import { domainColor, domainLabel } from "../theme";
import { useGame } from "../game/GameContext";
import { today } from "../game/storage";
import { Card, BigButton, Bar, RichText } from "./ui";

interface Answer {
  questionId: string;
  chosen: string;
  isCorrect: boolean;
}

/** Motor de "estudio de caso" al estilo del examen real: el escenario se
 * mantiene visible/consultable en todo momento (colapsable), pero una vez
 * respondida una pregunta no hay forma de regresar a cambiarla — solo se
 * avanza. El resultado (correcto/incorrecto) no se revela pregunta por
 * pregunta, solo al terminar todo el bloque, igual que en el examen real. */
export default function CaseStudyEngine({ caseStudy, onExit }: { caseStudy: CaseStudy; onExit: () => void }) {
  const { update } = useGame();
  const [stage, setStage] = useState<"intro" | "question" | "results">("intro");
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showScenario, setShowScenario] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const color = domainColor(caseStudy.domain);
  const total = caseStudy.questions.length;
  const q = caseStudy.questions[idx];

  function confirmAndAdvance() {
    if (!chosen) return;
    const isCorrect = chosen === q.correct;
    const nextAnswers = [...answers, { questionId: q.id, chosen, isCorrect }];
    setAnswers(nextAnswers);
    setChosen(null);
    if (idx + 1 >= total) {
      finish(nextAnswers);
    } else {
      setIdx(i => i + 1);
    }
  }

  function finish(finalAnswers: Answer[]) {
    const correct = finalAnswers.filter(a => a.isCorrect).length;
    const xp = correct * 15 + 20; // 15 XP por acierto + bono de 20 por completar el caso
    update(s => ({
      ...s,
      xp: s.xp + xp,
      totalAnswered: s.totalAnswered + finalAnswers.length,
      totalCorrect: s.totalCorrect + correct,
      answeredToday: s.answeredTodayDay === today() ? s.answeredToday + finalAnswers.length : finalAnswers.length,
      answeredTodayDay: today(),
    }));
    setStage("results");
  }

  if (stage === "intro") {
    return (
      <div className="slide-up">
        <Card style={{ border: `1px solid ${color}55` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 26 }}>{caseStudy.icon}</span>
            <span style={{ fontWeight: 800, fontSize: 17, color }}>{caseStudy.title}</span>
          </div>
          <span style={{ background: color + "22", color, padding: "3px 10px", borderRadius: 12, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>
            {domainLabel(caseStudy.domain)} · ESTUDIO DE CASO
          </span>
          <div style={{ marginTop: 14, fontSize: 13.5, lineHeight: 1.7, color: "#cbd5e1", whiteSpace: "pre-wrap" }}>
            <RichText text={caseStudy.scenario} />
          </div>
          <div style={{ marginTop: 16, padding: "10px 12px", background: "#f59e0b12", borderLeft: "3px solid #f59e0b", borderRadius: 8, fontSize: 12.5, color: "#fbbf24", lineHeight: 1.6 }}>
            ⚠️ Como en el examen real: una vez que empieces, podrás volver a leer el escenario en cualquier momento, pero <b>no podrás regresar a una pregunta ya contestada</b>. Las {total} preguntas se responden en orden.
          </div>
        </Card>
        <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "space-between" }}>
          <button onClick={onExit} style={{ background: "transparent", border: "1px solid #2d2d4e", color: "#64748b", borderRadius: 10, padding: "10px 16px", cursor: "pointer", fontSize: 13 }}>
            Volver
          </button>
          <BigButton color={color} onClick={() => setStage("question")}>
            Comenzar caso ({total} preguntas)
          </BigButton>
        </div>
      </div>
    );
  }

  if (stage === "results") {
    const correct = answers.filter(a => a.isCorrect).length;
    const pct = Math.round((correct / total) * 100);
    const wrong = answers.filter(a => !a.isCorrect);
    const headline = pct === 100 ? "💎 ¡PERFECTO!" : pct >= 80 ? "🎉 ¡Excelente!" : pct >= 60 ? "💪 Buen trabajo" : "📚 A seguir practicando";
    return (
      <div className="slide-up">
        <Card style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>{caseStudy.icon}</div>
          <h2 style={{ margin: "0 0 4px", fontSize: 20 }}>{headline}</h2>
          <div style={{ fontSize: 44, fontWeight: 900, background: "linear-gradient(90deg, #818cf8, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {correct}/{total}
          </div>
          <div style={{ color: "#94a3b8", fontSize: 13 }}>{pct}% de aciertos · {caseStudy.title}</div>
        </Card>

        {wrong.length > 0 && (
          <Card style={{ marginBottom: 14 }}>
            <button onClick={() => setShowReview(s => !s)} style={{ background: "transparent", border: "none", color: "#fca5a5", fontWeight: 700, fontSize: 14, cursor: "pointer", padding: 0 }}>
              {showReview ? "▾" : "▸"} Revisar {wrong.length} fallada{wrong.length > 1 ? "s" : ""}
            </button>
            {showReview && wrong.map(a => {
              const wq = caseStudy.questions.find(x => x.id === a.questionId)!;
              return (
                <div key={a.questionId} style={{ marginTop: 12, padding: 12, background: "#0f0f1a", borderRadius: 10, fontSize: 13, lineHeight: 1.55 }}>
                  <div style={{ color: "#f1f5f9", marginBottom: 6 }}><RichText text={wq.question} /></div>
                  <div style={{ color: "#fca5a5" }}>Tu respuesta: {a.chosen} · Correcta: <b style={{ color: "#6ee7b7" }}>{wq.correct}) <RichText text={wq.options[wq.correct]} /></b></div>
                  <div style={{ color: "#94a3b8", marginTop: 6 }}><RichText text={wq.explanation} /></div>
                </div>
              );
            })}
          </Card>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <BigButton onClick={onExit}>Volver al menú</BigButton>
        </div>
      </div>
    );
  }

  // stage === "question"
  return (
    <div className="slide-up" key={`cs-q-${idx}`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, fontSize: 12, color: "#94a3b8" }}>
        <span>{caseStudy.icon} {caseStudy.title}</span>
        <span>{idx + 1}/{total}</span>
      </div>
      <Bar pct={(idx / total) * 100} color={color} />

      <Card style={{ marginTop: 12 }}>
        <button onClick={() => setShowScenario(s => !s)} style={{ background: "transparent", border: "1px solid #2d2d4e", color: "#94a3b8", borderRadius: 8, padding: "6px 10px", fontSize: 11.5, cursor: "pointer", marginBottom: showScenario ? 12 : 0 }}>
          {showScenario ? "▾ Ocultar escenario" : "▸ 📄 Ver escenario"}
        </button>
        {showScenario && (
          <div style={{ padding: "10px 12px", background: "#0f0f1a", borderRadius: 8, fontSize: 12.5, lineHeight: 1.65, color: "#94a3b8", whiteSpace: "pre-wrap", marginBottom: 4 }}>
            <RichText text={caseStudy.scenario} />
          </div>
        )}
      </Card>

      <Card style={{ marginTop: 12, border: `1px solid ${color}33`, boxShadow: `0 0 30px ${color}12` }}>
        <span style={{ background: color + "22", color, padding: "3px 10px", borderRadius: 12, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>
          Pregunta {idx + 1} de {total} · sin vuelta atrás
        </span>
        <h2 style={{ margin: "14px 0 16px", fontSize: 16, lineHeight: 1.5, color: "#f1f5f9", fontWeight: 600 }}><RichText text={q.question} /></h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(["A", "B", "C", "D"] as const).map(letter => {
            const isChosen = chosen === letter;
            return (
              <button
                key={letter}
                onClick={() => setChosen(letter)}
                style={{
                  textAlign: "left", padding: "12px 14px", borderRadius: 10,
                  border: `1.5px solid ${isChosen ? color : "#2d2d4e"}`,
                  background: isChosen ? color + "22" : "#0f0f1a",
                  color: "#cbd5e1", fontSize: 14, lineHeight: 1.45, cursor: "pointer",
                  transition: "all 0.15s", display: "flex", gap: 10,
                }}
              >
                <span style={{ fontWeight: 800, color: "#64748b" }}>{letter}</span>
                <span><RichText text={q.options[letter]} /></span>
              </button>
            );
          })}
        </div>
      </Card>

      <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "space-between" }}>
        <button onClick={onExit} style={{ background: "transparent", border: "1px solid #2d2d4e", color: "#64748b", borderRadius: 10, padding: "10px 16px", cursor: "pointer", fontSize: 13 }}>
          Salir
        </button>
        <BigButton color={color} onClick={confirmAndAdvance} disabled={!chosen}>
          {idx + 1 >= total ? "Finalizar caso" : "Confirmar y siguiente →"}
        </BigButton>
      </div>
    </div>
  );
}
