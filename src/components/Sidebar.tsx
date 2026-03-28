import { useState } from 'react';
import { COLORS, FONT_MONO } from './shared/charts/theme';
import { useTheme } from '../context/ThemeContext';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdj6Jmr-tlF8ZS4S4XNaGE1avy-a6zHwN2EpUairE0fY3vjcQ/formResponse';
const ENTRY_ID = 'entry.521991795';

const SECTIONS = [
  { group: 'Market', items: [
    { id: 'overview', label: 'Overview' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'hourly', label: 'Hourly' },
    { id: 'fomc', label: 'FOMC' },
  ]},
  { group: 'Liquidity', items: [
    { id: 'liquidity', label: 'Liquidity Levels' },
    { id: 'returns', label: 'Sweep Returns' },
  ]},
  { group: 'Patterns', items: [
    { id: 'volatility', label: 'Volatility' },
    { id: 'candles', label: 'Candle Structure' },
    { id: 'trends', label: 'Trends' },
    { id: 'volume', label: 'Volume' },
  ]},
  { group: 'Advanced', items: [
    { id: 'sessiondive', label: 'Session Dive' },
    { id: 'roundnums', label: 'Round Numbers' },
    { id: 'bigmoves', label: 'Big Moves' },
    { id: 'heatmap', label: 'DoW x Session' },
    { id: 'autocorr', label: 'Autocorrelation' },
    { id: 'killzones', label: 'Kill Zones' },
    { id: 'asianrange', label: 'Asian Range AMD' },
    { id: 'cmegap', label: 'CME Gap' },
    { id: 'halvingcycle', label: 'Halving Cycle' },
    { id: 'weeklyrange', label: 'Weekly Range' },
    { id: 'monthlybias', label: 'Monthly Bias' },
    { id: 'correlations', label: 'Correlations' },
  ]},
];

interface SidebarProps {
  active: string;
  onChange: (id: string) => void;
}

export function Sidebar({ active, onChange }: SidebarProps) {
  const { theme, toggle } = useTheme();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submitFeedback = () => {
    if (!feedbackText.trim()) return;
    setFeedbackStatus('sending');
    const body = new URLSearchParams({ [ENTRY_ID]: feedbackText.trim() });
    fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body }).then(() => {
      setFeedbackStatus('sent');
      setFeedbackText('');
      setTimeout(() => { setShowFeedback(false); setFeedbackStatus('idle'); }, 1500);
    }).catch(() => setFeedbackStatus('error'));
  };

  return (
    <aside style={{
      width: 220, minWidth: 220, height: '100vh',
      background: 'var(--bg-secondary)',
      borderRight: `1px solid ${COLORS.border}`,
      overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
      transition: 'background 0.2s, border-color 0.2s',
    }}>
      <div style={{
        padding: '20px 16px 12px',
        borderBottom: `1px solid ${COLORS.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 15, fontWeight: 700, color: COLORS.accent, letterSpacing: '-0.02em' }}>
            BTC Analytics
          </div>
          <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>7Y · 5min resolution</div>
        </div>
        <button
          onClick={toggle}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          style={{
            background: 'none', border: `1px solid ${COLORS.border}`,
            borderRadius: 6, padding: '4px 8px', cursor: 'pointer',
            fontSize: 16, lineHeight: 1, color: COLORS.text,
            transition: 'border-color 0.2s',
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      <nav style={{ flex: 1, padding: '8px 0' }}>
        {SECTIONS.map(({ group, items }) => (
          <div key={group} style={{ marginBottom: 4 }}>
            <div style={{
              padding: '10px 16px 4px', fontSize: 10, fontWeight: 700,
              color: COLORS.textDim, textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>{group}</div>
            {items.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <button key={id} onClick={() => onChange(id)} style={{
                  display: 'block', width: '100%',
                  padding: '6px 16px 6px 20px', border: 'none',
                  background: isActive ? 'rgba(88,166,255,0.1)' : 'transparent',
                  color: isActive ? COLORS.accent : COLORS.textMuted,
                  fontSize: 13, textAlign: 'left', cursor: 'pointer',
                  borderLeft: isActive ? `2px solid ${COLORS.accent}` : '2px solid transparent',
                  transition: 'all 0.15s', fontFamily: 'inherit',
                }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(128,128,128,0.08)'; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; }}}
                >{label}</button>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding: '8px 16px', borderTop: `1px solid ${COLORS.border}` }}>
        <button
          onClick={() => { setShowFeedback(true); setFeedbackStatus('idle'); }}
          style={{
            display: 'block', width: '100%', padding: '8px 0',
            textAlign: 'center', fontSize: 12, fontFamily: FONT_MONO,
            color: COLORS.accent, background: 'transparent',
            border: `1px solid ${COLORS.border}`, borderRadius: 6,
            cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(88,166,255,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          Feedback
        </button>
      </div>

      {showFeedback && (
        <div
          onClick={() => setShowFeedback(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--card-bg, #161b22)', border: `1px solid ${COLORS.border}`,
              borderRadius: 10, padding: 24, width: 400, maxWidth: '90vw',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>
              Feedback
            </div>
            <textarea
              value={feedbackText}
              onChange={e => setFeedbackText(e.target.value)}
              placeholder="Your suggestions, ideas, bug reports..."
              rows={5}
              style={{
                width: '100%', padding: 10, fontSize: 13, fontFamily: FONT_MONO,
                background: 'var(--bg, #0d1117)', color: COLORS.text,
                border: `1px solid ${COLORS.border}`, borderRadius: 6,
                resize: 'vertical', outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent, #58a6ff)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = ''; }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowFeedback(false)}
                style={{
                  padding: '8px 16px', fontSize: 12, fontFamily: FONT_MONO,
                  background: 'transparent', color: COLORS.textMuted,
                  border: `1px solid ${COLORS.border}`, borderRadius: 6, cursor: 'pointer',
                }}
              >Cancel</button>
              <button
                onClick={submitFeedback}
                disabled={feedbackStatus === 'sending' || !feedbackText.trim()}
                style={{
                  padding: '8px 16px', fontSize: 12, fontFamily: FONT_MONO,
                  background: feedbackStatus === 'sent' ? 'var(--positive, #3fb950)' : 'var(--accent, #58a6ff)',
                  color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer',
                  opacity: (!feedbackText.trim() || feedbackStatus === 'sending') ? 0.5 : 1,
                }}
              >
                {feedbackStatus === 'sending' ? 'Sending...' : feedbackStatus === 'sent' ? 'Sent!' : feedbackStatus === 'error' ? 'Error, retry' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{
        padding: '8px 16px 12px', fontSize: 10, color: COLORS.textDim, fontFamily: FONT_MONO,
      }}>Python + React + Recharts</div>
    </aside>
  );
}
