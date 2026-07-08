import { useEffect, useMemo, useRef, useState } from "react";
import type { Question, QuizModeId } from "../types";
import { domainColor, domainLabel } from "../theme";
import { useGame } from "../game/GameContext";
import { xpForAnswer, comboMultiplier } from "../game/xp";
import { playCorrect, playWrong, playBossHit } from "../game/sound";
import { today } from "../game/storage";
import Confetti from "./Confetti";
import { Card, BigButton, Bar } from "./ui";
import { aiExplain } from "../api";

/** Botón "explícamelo diferente" — pide al tutor IA otra explicación. */
function AiExplainButton({ q }: { q: Question }) {
  const [text, setText] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const ask = async () => {
    setBusy(true);
    const reply = await aiExplain(q.question, `${q.correct}) ${q.options[q.correct]}`, q.explanation);
    setText(reply ?? "⚠️ Tutor IA no disponible ahora — revisa la explicación de arriba.");
    setBusy(false);
  };

  if (text) {
    return (
      <div className="slide-up" style={{ marginTop: 10, padding: "10px 12px", background: "#6366f112", borderLeft: "3px solid #6366f1", borderRadius: 8, color: "#c7d2fe" }}>
        🤖 {text}
      </div>
    );
  }
  return (
    <div style={{ marginTop: 10 }}>
      <button onClick={ask} disabled={busy} style={{
        background: "transparent", border: "1px solid #6366f155", borderRadius: 8,
        padding: "7px 12px", color: "#818cf8", fontSize: 12, cursor: "pointer", fontWeight: 600,
      }}>
        {busy ? "🤖 pensando…" : "🤖 Explícamelo diferente"}
      </button>
    </div>
  );
}

export interface QuizConfig {
  modeId: QuizModeId;
  title: string;
  icon: string;
  questions: Question[];
  feedback: "immediate" | "end";
  lives?: number; // survival: 1, boss: 3
  totalTimeSec?: number; // exam / lightning
  boss?: { name: string; icon: string; color: string };
}

interface Answer {
  q: Question;
  chosen: string | null;
  isCorrect: boolean;
  ms: number;
}

export default function QuizEngine({ config, onExit }: { config: QuizConfig; onExit: () => void }) {
  const { save, update } = useGame();
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [lives, setLives] = useState(config.lives ?? Infinity);
  const [finished, setFinished] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.totalTimeSec ?? 0);
  const qStartRef = useRef(Date.now());
  const finishedRef = useRef(false);

  const q = config.questions[idx];
  const total = config.questions.length;
  const isBoss = !!config.boss;
  const bossHp = total - answers.filter(a => a.isCorrect).length;

  // Timer global (examen / lightning)
  useEffect(() => {
    if (!config.totalTimeSec || finished) return;
    const iv = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(iv);
          finish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  useEffect(() => {
    qStartRef.current = Date.now();
  }, [idx]);

  function commitAnswer(letter: string | null) {
    if (!q || revealed || finishedRef.current) return;
    const ms = Date.now() - qStartRef.current;
    const isCorrect = letter === q.correct;
    const fast = ms < 10000;
    const newCombo = isCorrect ? combo + 1 : 0;
    const xp = isCorrect ? xpForAnswer({ isTrap: q.isTrap, combo: newCombo, fast }) : 0;

    setChosen(letter);
    setCombo(newCombo);
    setBestCombo(b => Math.max(b, newCombo));
    if (isCorrect) setSessionXp(s => s + xp);

    const answer: Answer = { q, chosen: letter, isCorrect, ms };
    const allAnswers = [...answers, answer];
    setAnswers(allAnswers);

    // Persistir progreso por pregunta
    update(s => {
      const t = today();
      const stat = s.stats[q.id] ?? { seen: 0, correct: 0, wrong: 0, lastResult: null };
      return {
        ...s,
        xp: s.xp + xp,
        totalAnswered: s.totalAnswered + 1,
        totalCorrect: s.totalCorrect + (isCorrect ? 1 : 0),
        answeredToday: s.answeredTodayDay === t ? s.answeredToday + 1 : 1,
        answeredTodayDay: t,
        trapsCorrect: s.trapsCorrect + (isCorrect && q.isTrap ? 1 : 0),
        fastCorrect: s.fastCorrect + (isCorrect && fast ? 1 : 0),
        stats: {
          ...s.stats,
          [q.id]: {
            seen: stat.seen + 1,
            correct: stat.correct + (isCorrect ? 1 : 0),
            wrong: stat.wrong + (isCorrect ? 0 : 1),
            lastResult: isCorrect ? "correct" : "wrong",
          },
        },
      };
    });

    let livesLeft = lives;
    if (!isCorrect && config.lives !== undefined) {
      livesLeft = lives - 1;
      setLives(livesLeft);
    }

    if (isCorrect) {
      if (isBoss) playBossHit(save.soundOn);
      else playCorrect(save.soundOn);
      if (newCombo > 0 && newCombo % 5 === 0) setConfetti(c => c + 1);
    } else {
      playWrong(save.soundOn);
      setShakeKey(k => k + 1);
    }

    if (config.feedback === "immediate") {
      setRevealed(true);
      // Muerte súbita / boss sin vidas → fin
      if (!isCorrect && config.lives !== undefined && livesLeft <= 0) {
        setTimeout(() => finish(allAnswers), 1400);
        return;
      }
      // Lightning: auto-avance rápido
      if (config.modeId === "lightning") {
        setTimeout(() => next(allAnswers), isCorrect ? 500 : 1100);
      }
    } else {
      // examen: avanza sin revelar
      setTimeout(() => next(allAnswers), 250);
    }
  }

  function next(allAnswers?: Answer[]) {
    const a = allAnswers ?? answers;
    if (idx + 1 >= total) {
      finish(a);
      return;
    }
    setIdx(i => i + 1);
    setChosen(null);
    setRevealed(false);
  }

  function finish(allAnswers?: Answer[]) {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const a = allAnswers ?? answers;
    const correct = a.filter(x => x.isCorrect).length;
    const win = isBoss ? correct >= total && (config.lives === undefined || lives > 0) : undefined;

    update(s => {
      let n = { ...s };
      if (config.modeId === "lightning") n.bestLightning = Math.max(n.bestLightning, correct);
      if (config.modeId === "survival") n.bestSurvival = Math.max(n.bestSurvival, correct);
      if (config.modeId === "daily") n.dailyDoneOn = today();
      if (config.modeId === "exam" && a.length === total && correct === total && total >= 20) {
        n.perfectExams += 1;
      }
      if (isBoss && win) {
        const d = config.questions[0]?.domain;
        if (config.modeId === "boss" && total >= 40) {
          n.finalBossBeaten = true;
        } else if (d && !n.bossesBeaten.includes(d)) {
          n.bossesBeaten = [...n.bossesBeaten, d];
        }
      }
      return n;
    });
    if ((correct / Math.max(1, a.length)) >= 0.8 || win) setConfetti(c => c + 1);
    setFinished(true);
  }

  if (!q && !finished) {
    return (
      <Card style={{ textAlign: "center" }}>
        <p>No hay preguntas disponibles para este modo todavía.</p>
        <BigButton onClick={onExit}>Volver</BigButton>
      </Card>
    );
  }

  if (finished) {
    return <Results config={config} answers={answers} sessionXp={sessionXp} bestCombo={bestCombo} lives={lives} onExit={onExit} confetti={confetti} />;
  }

  const color = domainColor(q.domain);
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const mult = comboMultiplier(combo);

  return (
    <div className="slide-up" key={`q-${idx}`}>
      <Confetti trigger={confetti} />

      {/* Barra superior: progreso + timer + vidas */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, fontSize: 12, color: "#94a3b8" }}>
        <span>{config.icon} {config.title}</span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {config.lives !== undefined && (
            <span style={{ fontSize: 14 }}>{"❤️".repeat(Math.max(0, lives))}{"🖤".repeat(Math.max(0, (config.lives ?? 0) - lives))}</span>
          )}
          {config.totalTimeSec ? (
            <span style={{ fontWeight: 700, color: timeLeft < 30 ? "#ef4444" : "#818cf8", fontVariantNumeric: "tabular-nums" }} className={timeLeft < 30 ? "pulse" : ""}>
              ⏱ {mins}:{String(secs).padStart(2, "0")}
            </span>
          ) : null}
          <span>{idx + 1}/{total}</span>
        </div>
      </div>
      <Bar pct={((idx) / total) * 100} color={color} />

      {/* Boss HP */}
      {isBoss && config.boss && (
        <div style={{ marginTop: 12, marginBottom: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
            <span style={{ fontWeight: 700, color: config.boss.color }}>{config.boss.icon} {config.boss.name}</span>
            <span style={{ color: "#94a3b8" }}>HP {bossHp}/{total}</span>
          </div>
          <Bar pct={(bossHp / total) * 100} color="#ef4444" height={10} />
        </div>
      )}

      {/* Combo */}
      {combo >= 3 && (
        <div className="pop" style={{ textAlign: "center", marginTop: 8, fontSize: 13, fontWeight: 800, color: "#f59e0b" }}>
          🔥 Combo ×{combo} — XP ×{mult}
        </div>
      )}

      {/* Pregunta */}
      <div key={shakeKey} className={shakeKey ? "shake" : ""}>
        <Card style={{ marginTop: 12, border: `1px solid ${color}33`, boxShadow: `0 0 30px ${color}12` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ background: color + "22", color, padding: "3px 10px", borderRadius: 12, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>
              {domainLabel(q.domain)}{q.isTrap ? " · 🪤 TRAMPA" : ""}
            </span>
          </div>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, lineHeight: 1.5, color: "#f1f5f9", fontWeight: 600 }}>{q.question}</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(["A", "B", "C", "D"] as const).map(letter => {
              const isChosen = chosen === letter;
              const isRight = q.correct === letter;
              let bg = "#0f0f1a";
              let border = "#2d2d4e";
              let clr = "#cbd5e1";
              if (revealed) {
                if (isRight) { bg = "#10b98122"; border = "#10b981"; clr = "#6ee7b7"; }
                else if (isChosen) { bg = "#ef444422"; border = "#ef4444"; clr = "#fca5a5"; }
              } else if (isChosen) { bg = color + "22"; border = color; }
              return (
                <button
                  key={letter}
                  onClick={() => commitAnswer(letter)}
                  disabled={revealed}
                  style={{
                    textAlign: "left", padding: "12px 14px", borderRadius: 10,
                    border: `1.5px solid ${border}`, background: bg, color: clr,
                    fontSize: 14, lineHeight: 1.45, cursor: revealed ? "default" : "pointer",
                    transition: "all 0.15s", display: "flex", gap: 10,
                  }}
                >
                  <span style={{ fontWeight: 800, color: revealed && isRight ? "#10b981" : "#64748b" }}>{letter}</span>
                  <span>{q.options[letter]}</span>
                  {revealed && isRight && <span style={{ marginLeft: "auto" }}>✓</span>}
                  {revealed && isChosen && !isRight && <span style={{ marginLeft: "auto" }}>✗</span>}
                </button>
              );
            })}
          </div>

          {/* Explicación tras responder */}
          {revealed && config.modeId !== "lightning" && (
            <div className="slide-up" style={{ marginTop: 14, padding: "12px 14px", background: chosen === q.correct ? "#10b98112" : "#ef444412", borderLeft: `3px solid ${chosen === q.correct ? "#10b981" : "#ef4444"}`, borderRadius: 8, fontSize: 13, lineHeight: 1.6, color: "#cbd5e1" }}>
              <b style={{ color: chosen === q.correct ? "#6ee7b7" : "#fca5a5" }}>
                {chosen === q.correct ? "¡Correcto! " : `La respuesta era ${q.correct}. `}
              </b>
              {q.explanation}
              {chosen !== q.correct && <AiExplainButton q={q} />}
            </div>
          )}
        </Card>
      </div>

      {/* Acciones */}
      <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "space-between" }}>
        <button onClick={onExit} style={{ background: "transparent", border: "1px solid #2d2d4e", color: "#64748b", borderRadius: 10, padding: "10px 16px", cursor: "pointer", fontSize: 13 }}>
          Salir
        </button>
        {revealed && config.modeId !== "lightning" && !(config.lives !== undefined && lives <= 0) && (
          <BigButton onClick={() => next()} color={color}>
            {idx + 1 >= total ? "Ver resultados" : "Siguiente →"}
          </BigButton>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────── RESULTADOS ───────────────────────────
function Results({ config, answers, sessionXp, bestCombo, lives, onExit, confetti }: {
  config: QuizConfig; answers: Answer[]; sessionXp: number; bestCombo: number; lives: number; onExit: () => void; confetti: number;
}) {
  const [showReview, setShowReview] = useState(false);
  const correct = answers.filter(a => a.isCorrect).length;
  const pct = answers.length ? Math.round((correct / answers.length) * 100) : 0;
  const wrong = answers.filter(a => !a.isCorrect);
  const isBoss = !!config.boss;
  const bossWin = isBoss && correct >= config.questions.length && (config.lives === undefined || lives > 0);

  const byDomain = useMemo(() => {
    const m: Record<string, { c: number; t: number }> = {};
    for (const a of answers) {
      m[a.q.domain] ??= { c: 0, t: 0 };
      m[a.q.domain].t++;
      if (a.isCorrect) m[a.q.domain].c++;
    }
    return m;
  }, [answers]);

  const headline = isBoss
    ? (bossWin ? "🏆 ¡JEFE DERROTADO!" : "💀 El jefe te venció…")
    : pct === 100 ? "💎 ¡PERFECTO!"
    : pct >= 80 ? "🎉 ¡Excelente!"
    : pct >= 60 ? "💪 Buen trabajo"
    : "📚 A seguir practicando";

  return (
    <div className="slide-up">
      <Confetti trigger={confetti} />
      <Card style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>{config.icon}</div>
        <h2 style={{ margin: "0 0 4px", fontSize: 20 }}>{headline}</h2>
        <div style={{ fontSize: 44, fontWeight: 900, background: "linear-gradient(90deg, #818cf8, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {correct}/{answers.length}
        </div>
        <div style={{ color: "#94a3b8", fontSize: 13 }}>{pct}% de aciertos</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 14, fontSize: 13 }}>
          <span style={{ color: "#f59e0b", fontWeight: 700 }}>+{sessionXp} XP</span>
          <span style={{ color: "#818cf8" }}>🔥 Mejor combo: ×{bestCombo}</span>
        </div>
      </Card>

      {/* Desglose por domain */}
      {Object.keys(byDomain).length > 1 && (
        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Por Domain</div>
          {Object.entries(byDomain).map(([d, { c, t }]) => (
            <div key={d} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: domainColor(d), fontWeight: 600 }}>{domainLabel(d)}</span>
                <span style={{ color: "#94a3b8" }}>{c}/{t}</span>
              </div>
              <Bar pct={(c / t) * 100} color={domainColor(d)} />
            </div>
          ))}
        </Card>
      )}

      {/* Revisión de falladas */}
      {wrong.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <button onClick={() => setShowReview(s => !s)} style={{ background: "transparent", border: "none", color: "#fca5a5", fontWeight: 700, fontSize: 14, cursor: "pointer", padding: 0 }}>
            {showReview ? "▾" : "▸"} Revisar {wrong.length} fallada{wrong.length > 1 ? "s" : ""}
          </button>
          {showReview && wrong.map((a, i) => (
            <div key={i} style={{ marginTop: 12, padding: 12, background: "#0f0f1a", borderRadius: 10, fontSize: 13, lineHeight: 1.55 }}>
              <div style={{ color: "#f1f5f9", marginBottom: 6 }}>{a.q.question}</div>
              <div style={{ color: "#fca5a5" }}>Tu respuesta: {a.chosen ?? "—"} · Correcta: <b style={{ color: "#6ee7b7" }}>{a.q.correct}) {a.q.options[a.q.correct]}</b></div>
              <div style={{ color: "#94a3b8", marginTop: 6 }}>{a.q.explanation}</div>
            </div>
          ))}
        </Card>
      )}

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <BigButton onClick={onExit}>Volver al menú</BigButton>
      </div>
    </div>
  );
}
