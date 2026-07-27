// Cliente del backend (auth + tutor IA). Degrada con elegancia si no hay backend.

const TOKEN_KEY = "cognilab_token";

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export async function login(password: string): Promise<boolean> {
  try {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const { token } = await res.json();
      sessionStorage.setItem(TOKEN_KEY, token);
      return true;
    }
    // Si el backend contestó, su veredicto manda. Antes solo cortábamos en 401
    // y cualquier otro estado (un 500, un 502 del Space despertando) caía al
    // password por defecto de abajo: bastaba con que el backend fallara para
    // entrar con "cognilab2026" aunque APP_PASSWORD fuera otro.
    return false;
  } catch {
    // Sin backend que responda (npm run dev del frontend suelto): password por defecto.
  }
  if (password === "cognilab2026") {
    sessionStorage.setItem(TOKEN_KEY, "dev");
    return true;
  }
  return false;
}

async function aiCall(path: string, body: unknown): Promise<string | null> {
  try {
    const res = await fetch(`/api/ai/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken() ?? ""}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.text ?? null;
  } catch {
    return null;
  }
}

/** Pide al tutor IA que re-explique una pregunta con otra analogía. */
export function aiExplain(question: string, correct: string, explanation: string) {
  return aiCall("explain", { question, correct, explanation });
}

/** Chat libre con el tutor sobre el temario AI-103. */
export function aiChat(messages: { role: string; content: string }[]) {
  return aiCall("chat", { messages });
}
