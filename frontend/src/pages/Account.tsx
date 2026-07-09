import { useEffect, useState, type FormEvent } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, supabaseEnabled } from '../lib/supabase';
import { getSyncState, onSyncState, syncOnLogin, type SyncState } from '../utils/sync';

const SYNC_LABEL: Record<SyncState, string> = {
  idle: '—',
  syncing: 'Sincronizando…',
  synced: '✓ Sincronizado',
  error: '✗ Error de sincronización',
};

export default function Account({ user }: { user: User | null }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [sync, setSync] = useState<SyncState>(getSyncState());

  useEffect(() => onSyncState(setSync), []);

  if (!supabaseEnabled) {
    return (
      <section className="placeholder">
        <h2>🔐 Cuenta</h2>
        <p>
          Supabase no está configurado — la app funciona en <b>modo local</b>: tu
          progreso se guarda solo en este navegador.
        </p>
        <p>
          Para activar la sincronización entre dispositivos sigue la guía{' '}
          <code>docs/SUPABASE_SETUP.md</code> del repositorio (5 minutos).
        </p>
      </section>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage(null);
    try {
      if (mode === 'register') {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage(
          data.session
            ? '✓ Cuenta creada. ¡Sesión iniciada!'
            : '✓ Cuenta creada. Revisa tu email para confirmar el registro.'
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage('✓ Sesión iniciada. Importando tu progreso…');
      }
    } catch (err) {
      setMessage(`✗ ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      setBusy(false);
    }
  }

  if (user) {
    return (
      <section className="account-panel">
        <h2>🔐 Cuenta</h2>
        <p className="account-email">
          Sesión iniciada como <b>{user.email}</b>
        </p>
        <p className="account-sync">Estado: {SYNC_LABEL[sync]}</p>
        <p className="account-note">
          Tu progreso de las 6 categorías se guarda en la nube automáticamente y el
          historial local se fusionó al iniciar sesión (se conserva siempre el mejor
          récord y la unión de ejercicios dominados).
        </p>
        <div className="account-actions">
          <button
            className="secondary-btn"
            disabled={sync === 'syncing'}
            onClick={() => void syncOnLogin(user.id)}
          >
            Sincronizar ahora
          </button>
          <button className="danger-btn" onClick={() => void supabase?.auth.signOut()}>
            Cerrar sesión
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="account-panel">
      <h2>🔐 {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
      <p className="account-note">
        Con una cuenta tu progreso se sincroniza entre dispositivos. El historial que ya
        tienes en este navegador se importa automáticamente al iniciar sesión.
      </p>
      <form className="account-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
        </label>
        <button className="primary-btn" type="submit" disabled={busy}>
          {busy ? '…' : mode === 'login' ? 'Entrar' : 'Registrarme'}
        </button>
      </form>
      {message && <p className="account-message">{message}</p>}
      <button
        className="link-btn"
        onClick={() => {
          setMode(mode === 'login' ? 'register' : 'login');
          setMessage(null);
        }}
      >
        {mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </button>
    </section>
  );
}
