import { useEffect, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { chatWithClaude } from '../lib/claude';
import { supabase, supabaseEnabled } from '../lib/supabase';
import '../styles/tutor.css';

type Category =
  | 'general'
  | 'mathematik'
  | 'zahlenreihen'
  | 'analyse'
  | 'konzentration'
  | 'vernetztes-denken';

interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const CATEGORIES: Record<Category, string> = {
  general: 'General',
  mathematik: '🧮 Matemáticas',
  zahlenreihen: '🔢 Series Numéricas',
  analyse: '💻 Análisis & Programación',
  konzentration: '👁️ Concentración & Memoria',
  'vernetztes-denken': '🕸️ Razonamiento en Red',
};

export default function Tutor({ user }: { user: User | null }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Category>('general');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (supabaseEnabled && user) {
      loadChatHistory();
    }
  }, [user, category]);

  async function loadChatHistory() {
    if (!supabase || !user) return;
    try {
      const { data, error: err } = await supabase
        .from('chat_history')
        .select('id, role, content, created_at')
        .eq('user_id', user.id)
        .eq('category', category)
        .order('created_at', { ascending: true })
        .limit(50);

      if (err) throw err;
      setMessages(
        data?.map((m) => ({
          id: m.id,
          role: m.role as 'user' | 'assistant',
          content: m.content,
          timestamp: new Date(m.created_at).getTime(),
        })) || []
      );
    } catch (err) {
      console.error('Error loading chat history:', err);
    }
  }

  async function saveChatMessage(
    role: 'user' | 'assistant',
    content: string
  ) {
    if (!supabaseEnabled || !user || !supabase) return;
    try {
      await supabase.from('chat_history').insert({
        user_id: user.id,
        role,
        content,
        category,
      });
    } catch (err) {
      console.error('Error saving chat message:', err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      // Save user message to Supabase
      await saveChatMessage('user', input);

      // Build conversation history for Claude
      const conversationHistory = messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));
      conversationHistory.push({ role: 'user', content: input });

      // Get response from Claude
      const response = await chatWithClaude(conversationHistory, category);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Save assistant message to Supabase
      await saveChatMessage('assistant', response);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMsg);
      console.error('Error in chat:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tutor-container">
      <div className="tutor-sidebar">
        <h3>Categoría de enfoque</h3>
        <div className="category-list">
          {(Object.entries(CATEGORIES) as [Category, string][]).map(
            ([key, label]) => (
              <button
                key={key}
                className={`category-btn ${category === key ? 'active' : ''}`}
                onClick={() => setCategory(key)}
              >
                {label}
              </button>
            )
          )}
        </div>
        {user && (
          <div className="tutor-info">
            <p className="session-user">Sesión: {user.email}</p>
            <p className="session-status">
              {supabaseEnabled ? '✓ Historial sincronizado' : '⚠️ Modo local'}
            </p>
          </div>
        )}
      </div>

      <div className="tutor-main">
        <div className="tutor-header">
          <h2>🤖 Tutor IA — {CATEGORIES[category]}</h2>
          <p className="tutor-subtitle">
            Haz preguntas sobre {CATEGORIES[category].toLowerCase()}
          </p>
        </div>

        {!user && (
          <div className="tutor-note">
            <strong>Nota:</strong> Inicia sesión para guardar el historial del
            chat entre sesiones.
          </div>
        )}

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="chat-empty">
              <p>¿Cómo te puedo ayudar con {CATEGORIES[category].toLowerCase()}?</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                Escribe tu pregunta abajo para empezar.
              </p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.role}`}>
              <div className="message-badge">
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}

          {loading && (
            <div className="chat-message assistant">
              <div className="message-badge">🤖</div>
              <div className="message-content">
                <span className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="chat-error">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            placeholder="Escribe tu pregunta…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button
            className="chat-send"
            type="submit"
            disabled={loading || !input.trim()}
          >
            {loading ? '…' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}
