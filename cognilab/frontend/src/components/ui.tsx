import type { CSSProperties, ReactNode } from "react";

export function Card({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: "linear-gradient(135deg, #1e1e32, #16213e)",
        borderRadius: 16,
        border: "1px solid #2d2d4e",
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Chip({
  label,
  active,
  color = "#8b5cf6",
  onClick,
}: {
  label: string;
  active?: boolean;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        border: `1px solid ${active ? color : "#2d2d4e"}`,
        background: active ? color + "22" : "transparent",
        color: active ? color : "#64748b",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      {label}
    </button>
  );
}

export function BigButton({
  children,
  onClick,
  color = "#6366f1",
  disabled,
  style,
}: {
  children: ReactNode;
  onClick?: () => void;
  color?: string;
  disabled?: boolean;
  style?: CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "14px 22px",
        borderRadius: 12,
        border: "none",
        background: disabled ? "#2d2d4e" : `linear-gradient(135deg, ${color}, ${color}cc)`,
        color: disabled ? "#64748b" : "#fff",
        fontSize: 15,
        fontWeight: 700,
        cursor: disabled ? "default" : "pointer",
        boxShadow: disabled ? "none" : `0 4px 18px ${color}44`,
        transition: "all 0.2s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/** Texto del banco con los `code spans` de markdown renderizados.
 *
 * Los .md de origen marcan identificadores con backticks y 209 de las 452
 * preguntas los traen; sin esto se leían literales en pantalla
 * (`response.output_text` en vez de response.output_text destacado). */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/g).map((part, i) =>
        part.length > 2 && part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={i}
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "0.92em",
              background: "#0f0f1a",
              border: "1px solid #2d2d4e",
              borderRadius: 5,
              padding: "1px 5px",
              color: "#93c5fd",
              // Los identificadores largos deben poder cortarse en iPad.
              wordBreak: "break-word",
            }}
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Bar({ pct, color, height = 6 }: { pct: number; color: string; height?: number }) {
  return (
    <div style={{ height, background: "#1e293b", borderRadius: height / 2, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${Math.max(0, Math.min(100, pct))}%`,
          background: color,
          borderRadius: height / 2,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

export function StatPill({ icon, value, label, color = "#818cf8" }: { icon: string; value: ReactNode; label: string; color?: string }) {
  return (
    <div style={{ textAlign: "center", padding: "8px 4px" }}>
      <div style={{ fontSize: 20 }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
    </div>
  );
}
