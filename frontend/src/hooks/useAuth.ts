import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { syncOnLogin, startAutoSync, stopAutoSync } from '../utils/sync';

/** Sesión de Supabase + arranque/parada de la sincronización. */
export function useAuth(): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        void syncOnLogin(u.id);
        startAutoSync(u.id);
      } else {
        stopAutoSync();
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return { user, loading };
}
