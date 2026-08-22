import { useEffect, useState } from 'react';
import { DEFAULT_TRACK, isTrackId, type TrackId } from '../lib/tracks';

const STORAGE_KEY = 'brainbit-track';

function readStoredTrack(): TrackId {
  if (typeof window === 'undefined') return DEFAULT_TRACK;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return isTrackId(raw) ? raw : DEFAULT_TRACK;
}

/** Carrera activa, persistida en localStorage (misma clase de dato por
    dispositivo que el resto del progreso — no pasa por Supabase). */
export function useTrack() {
  const [track, setTrack] = useState<TrackId>(readStoredTrack);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, track);
  }, [track]);

  return [track, setTrack] as const;
}
