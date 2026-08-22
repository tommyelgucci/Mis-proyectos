import { useCallback, useEffect, useRef, useState } from "react";
import audioCardsData from "../data/audioCards.json";
import questionsData from "../data/questions.json";
import type { AudioCard, Question } from "../types";
import { domainColor, domainLabel } from "../theme";
import { Card, Chip, Bar } from "../components/ui";
import { shuffle } from "../game/select";

const CARDS = audioCardsData as AudioCard[];
const QUESTIONS = questionsData as Question[];

const CARD_DOMAINS = ["Todos", "Domain 1", "Domain 2", "Domain 3", "Domain 4", "Trampas"];
const Q_DOMAINS = ["Todos", "Domain 2", "Domain 3", "Cross", "Domain 1 (real)", "Domain 5", "Domain 3 (real)", "Domain 4 (real)"];

type Source = "cards" | "questions";

interface Narrable {
  id: string;
  domain: string;
  title: string;
  /** segmentos: se narran en orden con pausa entre ellos */
  segments: string[];
  keyPoint?: string;
}

function cardToNarrable(c: AudioCard): Narrable {
  return {
    id: `c${c.id}`,
    domain: c.domain,
    title: c.topic,
    segments: [`${c.topic}. ${c.content}. Punto clave: ${c.keyPoint}`],
    keyPoint: c.keyPoint,
  };
}

function questionToNarrable(q: Question): Narrable {
  const opts = (["A", "B", "C", "D"] as const).map(l => `Opción ${l}: ${q.options[l]}`).join(". ");
  return {
    id: `q${q.id}`,
    domain: q.domain,
    title: q.question.slice(0, 80) + (q.question.length > 80 ? "…" : ""),
    segments: [
      `Pregunta. ${q.question}. ${opts}`,
      `La respuesta correcta es la opción ${q.correct}: ${q.options[q.correct]}. ${q.explanation}`,
    ],
    keyPoint: `${q.correct}) ${q.options[q.correct]}`,
  };
}

export default function Audio() {
  const [source, setSource] = useState<Source>("cards");
  const [domain, setDomain] = useState("Todos");
  const [items, setItems] = useState<Narrable[]>(() => CARDS.map(cardToNarrable));
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [autoNext, setAutoNext] = useState(true);
  const [pauseSec, setPauseSec] = useState(4);
  const [showKey, setShowKey] = useState(false);
  const [listened, setListened] = useState<Set<string>>(new Set());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  const synth = window.speechSynthesis;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playingRef = useRef(false);
  const autoNextRef = useRef(autoNext);
  autoNextRef.current = autoNext;

  const current = items[index];

  // Cargar voces (es-MX prioritario)
  useEffect(() => {
    const load = () => {
      const v = synth.getVoices();
      setVoices(v);
      setVoice(prev => prev ?? v.find(x => x.lang === "es-MX") ?? v.find(x => x.lang.startsWith("es")) ?? v[0] ?? null);
    };
    load();
    synth.addEventListener("voiceschanged", load);
    return () => synth.removeEventListener("voiceschanged", load);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rebuildItems = useCallback((src: Source, dom: string) => {
    let list: Narrable[];
    if (src === "cards") {
      const pool = dom === "Todos" ? CARDS : CARDS.filter(c => c.domain === dom);
      list = pool.map(cardToNarrable);
    } else {
      const pool = dom === "Todos" ? QUESTIONS : QUESTIONS.filter(q => q.domain === dom);
      list = shuffle(pool).map(questionToNarrable);
    }
    setItems(list);
    setIndex(0);
  }, []);

  const stop = useCallback(() => {
    playingRef.current = false;
    synth.cancel();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsPlaying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => stop(), [stop]);

  const speakItem = useCallback((item: Narrable, itemIdx: number) => {
    synth.cancel();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    playingRef.current = true;
    setIsPlaying(true);

    const speakSegment = (segIdx: number) => {
      if (!playingRef.current) return;
      const utter = new SpeechSynthesisUtterance(item.segments[segIdx]);
      if (voice) utter.voice = voice;
      utter.lang = voice?.lang ?? "es-MX";
      utter.rate = speed;
      utter.onend = () => {
        if (!playingRef.current) return;
        if (segIdx + 1 < item.segments.length) {
          // pausa para pensar antes de la respuesta
          timeoutRef.current = setTimeout(() => speakSegment(segIdx + 1), pauseSec * 1000);
        } else {
          setListened(prev => new Set(prev).add(item.id));
          if (autoNextRef.current && itemIdx + 1 < items.length) {
            timeoutRef.current = setTimeout(() => {
              setIndex(itemIdx + 1);
              setShowKey(false);
              speakItem(items[itemIdx + 1], itemIdx + 1);
            }, 900);
          } else {
            setIsPlaying(false);
            playingRef.current = false;
          }
        }
      };
      utter.onerror = () => {
        playingRef.current = false;
        setIsPlaying(false);
      };
      synth.speak(utter);
    };
    speakSegment(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voice, speed, pauseSec, items]);

  const handlePlay = () => {
    if (isPlaying) stop();
    else if (current) speakItem(current, index);
  };

  const go = (delta: number) => {
    stop();
    setShowKey(false);
    setIndex(i => (i + delta + items.length) % items.length);
  };

  const color = current ? domainColor(current.domain) : "#6366f1";
  const listenedCount = items.filter(i => listened.has(i.id)).length;
  const domains = source === "cards" ? CARD_DOMAINS : Q_DOMAINS;

  return (
    <div className="slide-up" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Fuente: tarjetas o preguntas narradas */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <Chip label={`🎧 Tarjetas (${CARDS.length})`} active={source === "cards"} color="#6366f1"
          onClick={() => { stop(); setSource("cards"); setDomain("Todos"); rebuildItems("cards", "Todos"); }} />
        <Chip label={`❓ Preguntas narradas (${QUESTIONS.length})`} active={source === "questions"} color="#0ea5e9"
          onClick={() => { stop(); setSource("questions"); setDomain("Todos"); rebuildItems("questions", "Todos"); }} />
      </div>

      {/* Filtro domain */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        {domains.map(d => (
          <Chip key={d} label={d === "Todos" ? "Todos" : domainLabel(d)} active={domain === d}
            color={d === "Todos" ? "#8b5cf6" : domainColor(d)}
            onClick={() => { stop(); setDomain(d); rebuildItems(source, d); }} />
        ))}
      </div>

      {/* Progreso sesión */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b", marginBottom: 5 }}>
          <span>Progreso de sesión</span>
          <span>{listenedCount}/{items.length} escuchadas</span>
        </div>
        <Bar pct={items.length ? (listenedCount / items.length) * 100 : 0} color="#6366f1" height={4} />
      </div>

      {/* Tarjeta actual */}
      {current && (
        <Card style={{ border: `1px solid ${color}33`, boxShadow: `0 0 30px ${color}15` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ background: color + "22", color, padding: "3px 10px", borderRadius: 12, fontSize: 10, fontWeight: 700 }}>
              {domainLabel(current.domain)}
            </span>
            <span style={{ color: "#475569", fontSize: 11 }}>
              {index + 1} / {items.length} {listened.has(current.id) && <span style={{ color: "#10b981" }}>✓</span>}
            </span>
          </div>
          <h2 style={{ margin: "0 0 12px", fontSize: 16, lineHeight: 1.45, color: "#f1f5f9" }}>{current.title}</h2>
          {source === "questions" && (
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>
              🎧 Se narra la pregunta con opciones, pausa de {pauseSec}s para que pienses, y luego la respuesta con explicación.
            </div>
          )}
          <button onClick={() => setShowKey(k => !k)} style={{
            background: "transparent", border: `1px solid ${color}44`, borderRadius: 8,
            padding: "8px 14px", cursor: "pointer", color, fontSize: 12, fontWeight: 600, width: "100%", textAlign: "left",
          }}>
            {showKey ? "▾" : "▸"} {source === "questions" ? "Ver respuesta" : "Punto clave"}
          </button>
          {showKey && current.keyPoint && (
            <div style={{ marginTop: 10, padding: "12px 14px", background: color + "15", borderRadius: 8, borderLeft: `3px solid ${color}`, fontSize: 13, color: "#f1f5f9" }}>
              {current.keyPoint}
            </div>
          )}
        </Card>
      )}

      {/* Controles */}
      <Card>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <CircleBtn onClick={() => go(-1)}>‹</CircleBtn>
          <button onClick={handlePlay} style={{
            width: 64, height: 64, borderRadius: "50%", border: "none",
            background: isPlaying ? "#ef444420" : "linear-gradient(135deg, #6366f1, #818cf8)",
            color: isPlaying ? "#ef4444" : "#fff", cursor: "pointer", fontSize: 24,
            boxShadow: isPlaying ? "0 0 20px #ef444440" : "0 0 20px #6366f140",
          }}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <CircleBtn onClick={() => go(1)}>›</CircleBtn>
        </div>

        <SliderRow label="Velocidad" value={`${speed.toFixed(1)}×`}>
          <input type="range" min={0.5} max={2} step={0.1} value={speed}
            onChange={e => setSpeed(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#6366f1" }} />
        </SliderRow>

        {source === "questions" && (
          <SliderRow label="Pausa para pensar" value={`${pauseSec}s`}>
            <input type="range" min={0} max={15} step={1} value={pauseSec}
              onChange={e => setPauseSec(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "#0ea5e9" }} />
          </SliderRow>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>Avance automático</span>
          <Toggle on={autoNext} onClick={() => setAutoNext(a => !a)} />
        </div>
      </Card>

      {/* Selector de voz */}
      {voices.length > 0 && (
        <Card style={{ padding: 14 }}>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Voz del narrador</div>
          <select value={voice?.name ?? ""} onChange={e => setVoice(voices.find(v => v.name === e.target.value) ?? null)}
            style={{ width: "100%", background: "#0f0f1a", border: "1px solid #2d2d4e", color: "#e2e8f0", borderRadius: 8, padding: "10px", fontSize: 13 }}>
            {voices.filter(v => v.lang.startsWith("es")).map(v => (
              <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
            ))}
            {voices.filter(v => !v.lang.startsWith("es")).map(v => (
              <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
            ))}
          </select>
        </Card>
      )}

      {/* Índice */}
      <Card style={{ padding: 14 }}>
        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Índice</div>
        <div style={{ maxHeight: 220, overflowY: "auto" }}>
          {items.map((item, i) => (
            <div key={item.id} onClick={() => { stop(); setIndex(i); setShowKey(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", borderRadius: 8,
                cursor: "pointer", marginBottom: 2,
                background: i === index ? domainColor(item.domain) + "15" : "transparent",
                border: i === index ? `1px solid ${domainColor(item.domain)}33` : "1px solid transparent",
              }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: listened.has(item.id) ? "#10b981" : domainColor(item.domain) + "66" }} />
              <span style={{ fontSize: 12, color: i === index ? "#f1f5f9" : "#64748b", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function CircleBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: 44, height: 44, borderRadius: "50%", border: "1px solid #2d2d4e",
      background: "#0f0f1a", color: "#94a3b8", cursor: "pointer", fontSize: 18,
    }}>{children}</button>
  );
}

function SliderRow({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b", marginBottom: 5 }}>
        <span>{label}</span>
        <span style={{ color: "#818cf8", fontWeight: 700 }}>{value}</span>
      </div>
      {children}
    </div>
  );
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: 46, height: 26, borderRadius: 13, border: "none", cursor: "pointer",
      background: on ? "#6366f1" : "#2d2d4e", position: "relative", transition: "background 0.2s",
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 3, left: on ? 23 : 3, transition: "left 0.2s",
      }} />
    </button>
  );
}
