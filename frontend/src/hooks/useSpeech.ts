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
 */

export interface SpeechCallbacks {
  onSegmentStart?: (index: number) => void;
  onDone?: () => void;
}

export function useSpeech() {
  const synth = window.speechSynthesis;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [segmentIndex, setSegmentIndex] = useState(0);

  const playingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stop = useCallback(() => {
    playingRef.current = false;
    synth.cancel();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsPlaying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => stop(), [stop]);

  const play = useCallback(
    (segments: string[], pauseMs: number, cb?: SpeechCallbacks) => {
      synth.cancel();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      playingRef.current = true;
      setIsPlaying(true);
      setSegmentIndex(0);

      const speakSegment = (i: number) => {
        if (!playingRef.current) return;
        setSegmentIndex(i);
        cb?.onSegmentStart?.(i);
        const utter = new SpeechSynthesisUtterance(segments[i]);
        if (voice) utter.voice = voice;
        utter.lang = voice?.lang ?? 'es-MX';
        utter.rate = rate;
        utter.onend = () => {
          if (!playingRef.current) return;
          if (i + 1 < segments.length) {
            timeoutRef.current = setTimeout(() => speakSegment(i + 1), pauseMs);
          } else {
            playingRef.current = false;
            setIsPlaying(false);
            cb?.onDone?.();
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
    },
    [voice, rate]
  );

  return { voices, voice, setVoice, rate, setRate, isPlaying, segmentIndex, play, stop };
}
