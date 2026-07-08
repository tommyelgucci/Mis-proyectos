// Sonidos sintetizados con WebAudio (sin archivos, $0).
let ctx: AudioContext | null = null;

function audioCtx(): AudioContext {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return ctx;
}

function beep(freq: number, duration: number, type: OscillatorType, gain = 0.08, when = 0) {
  const ac = audioCtx();
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + when + duration);
  osc.connect(g).connect(ac.destination);
  osc.start(ac.currentTime + when);
  osc.stop(ac.currentTime + when + duration);
}

export function playCorrect(enabled: boolean) {
  if (!enabled) return;
  try {
    beep(523, 0.12, "sine");
    beep(784, 0.18, "sine", 0.08, 0.1);
  } catch { /* audio no disponible */ }
}

export function playWrong(enabled: boolean) {
  if (!enabled) return;
  try {
    beep(220, 0.2, "sawtooth", 0.05);
    beep(180, 0.25, "sawtooth", 0.05, 0.12);
  } catch { /* audio no disponible */ }
}

export function playLevelUp(enabled: boolean) {
  if (!enabled) return;
  try {
    [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.15, "triangle", 0.08, i * 0.1));
  } catch { /* audio no disponible */ }
}

export function playBossHit(enabled: boolean) {
  if (!enabled) return;
  try {
    beep(110, 0.15, "square", 0.06);
  } catch { /* audio no disponible */ }
}
