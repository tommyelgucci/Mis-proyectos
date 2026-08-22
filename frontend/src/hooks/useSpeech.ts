import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook de narración por voz sobre Web Speech API (gratis, nativa del
 * navegador). Portado y adaptado de cognilab/frontend/src/modes/Audio.tsx
 * (ya probado en producción ahí) — encadena una lista de segmentos de texto
 * con pausas entre ellos, expone controles de reproducción y velocidad.
 *
 * Por qué useRef para las banderas de control: SpeechSynthesis es una API
 * basada en callbacks (onend/onerror), no en promesas — sin una bandera
 * mutable de "sigo reproduciendo" el encadenado recursivo de segmentos no
 * se puede cancelar de forma fiable a mitad de camino (closures viejos
 * seguirían disparando el siguiente segmento tras un stop()).
 *
 * Por qué voz y velocidad TAMBIÉN van en refs: play() se expone como callback
 * estable (deps []) para que quien lo llame desde un useCallback propio no
 * capture una versión vieja. Si leyera `voice`/`rate` del estado por closure,
 * un llamante así narraría siempre con los valores del primer render — que es
 * justo el bug que tenía Clase.tsx (mover el slider no afectaba al pulsar
 * "Siguiente ejercicio"). Leyéndolos del ref, además, un cambio de velocidad a
 * mitad de clase se aplica desde el segmento siguiente.
 */

export interface SpeechCallbacks {
  onSegmentStart?: (index: number) => void;
  onDone?: () => void;
}

/** null si el navegador no soporta síntesis de voz (algunos móviles, modos privados). */
const synth: SpeechSynthesis | null =
  typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [segmentIndex, setSegmentIndex] = useState(0);

  const playingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const rateRef = useRef(1.0);
  // Mantener viva la utterance en curso: si el recolector de basura se la lleva
  // a mitad de reproducción (bug conocido de Chrome/Safari), onend nunca
  // dispara y la cadena de segmentos se queda colgada para siempre.
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    voiceRef.current = voice;
  }, [voice]);

  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  useEffect(() => {
    if (!synth) return;
    const load = () => {
      const v = synth.getVoices();
      setVoices(v);
      setVoice(
        (prev) =>
          prev ??
          v.find((x) => x.lang === 'es-MX') ??
          v.find((x) => x.lang.startsWith('es')) ??
          v[0] ??
          null
      );
    };
    load();
    synth.addEventListener('voiceschanged', load);
    return () => synth.removeEventListener('voiceschanged', load);
  }, []);

  const stop = useCallback(() => {
    playingRef.current = false;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    utterRef.current = null;
    synth?.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  useEffect(() => () => stop(), [stop]);

  /** Pausa real (se puede reanudar donde quedó), a diferencia de stop(). */
  const pause = useCallback(() => {
    if (!synth || !playingRef.current) return;
    synth.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (!synth || !playingRef.current) return;
    synth.resume();
    setIsPaused(false);
  }, []);

  const play = useCallback(
    (
      segments: string[],
      // Función en vez de número fijo: permite que quien llama alargue la
      // pausa antes de un segmento puntual (p.ej. antes de la solución, para
      // que se sienta como un silencio antes del reveal y no como un salto).
      pauseMs: number | ((completedIndex: number) => number),
      cb?: SpeechCallbacks
    ) => {
    if (!synth || segments.length === 0) return;
    synth.cancel();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    playingRef.current = true;
    setIsPlaying(true);
    setIsPaused(false);
    setSegmentIndex(0);

    const speakSegment = (i: number) => {
      if (!playingRef.current) return;
      setSegmentIndex(i);
      cb?.onSegmentStart?.(i);

      const utter = new SpeechSynthesisUtterance(segments[i]);
      const v = voiceRef.current;
      if (v) utter.voice = v;
      utter.lang = v?.lang ?? 'es-MX';
      utter.rate = rateRef.current;

      utter.onend = () => {
        if (!playingRef.current) return;
        if (i + 1 < segments.length) {
          const delay = typeof pauseMs === 'function' ? pauseMs(i) : pauseMs;
          timeoutRef.current = setTimeout(() => speakSegment(i + 1), delay);
        } else {
          playingRef.current = false;
          utterRef.current = null;
          setIsPlaying(false);
          setIsPaused(false);
          cb?.onDone?.();
        }
      };
      utter.onerror = () => {
        // cancel() dispara onerror('canceled'/'interrupted') en varios
        // navegadores; si ya paramos nosotros, no hay nada que reportar.
        if (!playingRef.current) return;
        playingRef.current = false;
        utterRef.current = null;
        setIsPlaying(false);
        setIsPaused(false);
      };

      utterRef.current = utter;
      synth.speak(utter);
    };

    speakSegment(0);
  }, []);

  return {
    supported: synth !== null,
    voices,
    voice,
    setVoice,
    rate,
    setRate,
    isPlaying,
    isPaused,
    segmentIndex,
    play,
    pause,
    resume,
    stop,
  };
}
