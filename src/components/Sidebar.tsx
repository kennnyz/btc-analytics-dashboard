import { COLORS, FONT_MONO } from './shared/charts/theme';
import { useTheme } from '../context/ThemeContext';

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
  { group: 'Backtests', items: [
    { id: 'backtests', label: 'Backtest Results' },
    { id: 'mfemae', label: 'MFE / MAE' },
    { id: 'streaks', label: 'Win/Loss Streaks' },
    { id: 'riskruin', label: 'Risk of Ruin' },
    { id: 'kelly', label: 'Kelly Criterion' },
    { id: 'drawdown', label: 'Drawdown Duration' },
    { id: 'sortino', label: 'Sortino Ratio' },
  ]},
];

interface SidebarProps {
  active: string;
  onChange: (id: string) => void;
}

export function Sidebar({ active, onChange }: SidebarProps) {
  const { theme, toggle } = useTheme();

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

      <div style={{
        padding: '12px 16px', borderTop: `1px solid ${COLORS.border}`,
        fontSize: 10, color: COLORS.textDim, fontFamily: FONT_MONO,
      }}>Python + React + Recharts</div>
    </aside>
  );
}
