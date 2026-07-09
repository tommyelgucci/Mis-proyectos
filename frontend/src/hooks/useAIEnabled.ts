import { useEffect, useState } from 'react';
import { checkAIEnabled } from '../lib/ai';

/** true una vez que el backend confirma que la IA está configurada (GROQ_API_KEY). */
export function useAIEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let alive = true;
    checkAIEnabled().then((v) => {
      if (alive) setEnabled(v);
    });
    return () => {
      alive = false;
    };
  }, []);

  return enabled;
}
