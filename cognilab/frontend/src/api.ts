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
    if (res.status === 401) return false;
  } catch {
    // Ni siquiera hubo respuesta.
  }
  // Llegar acá significa que el backend falló o no está. En el build de
  // producción eso se rechaza sin más: antes cualquier estado que no fuera 401
  // caía a la contraseña de abajo, así que bastaba un 500 del backend para
  // entrar con "cognilab2026" teniendo APP_PASSWORD puesto en otra cosa.
  //
  // En desarrollo sí se acepta, que es el flujo del README (frontend suelto con
  // `npm run dev`): ahí el proxy de vite traduce "no hay backend" a un 500, no
  // a un error de red, así que no alcanza con mirar si el fetch tiró excepción.
  //
  // import.meta.env.DEV es false en el build, y el minificador borra la rama
  // entera: la contraseña por defecto ni siquiera viaja en el bundle publicado.
  if (import.meta.env.DEV && password === "cognilab2026") {
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
