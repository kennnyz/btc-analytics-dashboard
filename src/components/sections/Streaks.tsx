import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { FONT_MONO, getColors, getAxisStyle, getGridStyle, getTooltipStyle } from '../shared/charts/theme';

export default function Streaks() {
  const { analytics } = useData();
  const [idx, setIdx] = useState(0);

  if (!analytics?.win_loss_streaks) return <div>No data.</div>;
  const strategies = analytics.win_loss_streaks.strategies;
  if (strategies.length === 0) return <div>No data.</div>;

  const strat = strategies[idx];
  const c = getColors();
  const axis = getAxisStyle();
  const grid = getGridStyle();
  const tip = getTooltipStyle();

  const selectStyle: React.CSSProperties = {
    padding: '6px 12px', background: 'var(--card-bg)',
    border: '1px solid var(--border-light)', borderRadius: 6,
    color: 'var(--text)', fontSize: 13, fontFamily: FONT_MONO, outline: 'none',
  };

  return (
    <div>
      <h2>Win/Loss Streaks</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
        <select value={idx} onChange={e => setIdx(Number(e.target.value))} style={selectStyle}>
          {strategies.map((s, i) => (
            <option key={i} value={i}>{s.name} ({s.period})</option>
          ))}
        </select>
      </div>

      <StatGrid>
        <StatCard value={strat.max_win_streak} label="Max Win Streak" variant="positive" />
        <StatCard value={strat.avg_win_streak.toFixed(1)} label="Avg Win Streak" variant="positive" />
        <StatCard value={strat.max_loss_streak} label="Max Loss Streak" variant="negative" />
        <StatCard value={strat.avg_loss_streak.toFixed(1)} label="Avg Loss Streak" variant="negative" />
      </StatGrid>

      <Card title="Streak Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={strat.streak_distribution} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid {...grid} />
            <XAxis dataKey="streak" {...axis} />
            <YAxis {...axis} />
            <Tooltip {...tip} />
            <Bar dataKey="wins" name="Wins" fill={c.positive} radius={[2, 2, 0, 0]} />
            <Bar dataKey="losses" name="Losses" fill={c.negative} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
