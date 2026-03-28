import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { FONT_MONO } from '../shared/charts/theme';

export default function DrawdownDuration() {
  const { analytics } = useData();
  const [idx, setIdx] = useState(0);

  if (!analytics?.drawdown_duration) return <div>No data.</div>;
  const strategies = analytics.drawdown_duration.strategies;
  if (strategies.length === 0) return <div>No data.</div>;

  const strat = strategies[idx];

  const selectStyle: React.CSSProperties = {
    padding: '6px 12px', background: 'var(--card-bg)',
    border: '1px solid var(--border-light)', borderRadius: 6,
    color: 'var(--text)', fontSize: 13, fontFamily: FONT_MONO, outline: 'none',
  };

  return (
    <div>
      <h2>Drawdown Duration</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
        <select value={idx} onChange={e => setIdx(Number(e.target.value))} style={selectStyle}>
          {strategies.map((s, i) => (
            <option key={i} value={i}>{s.name} ({s.period})</option>
          ))}
        </select>
      </div>

      <StatGrid>
        <StatCard value={`${strat.max_dd_duration_days}d`} label="Max DD Duration" variant="negative" />
        <StatCard value={`${strat.avg_dd_duration_days}d`} label="Avg DD Duration" />
      </StatGrid>

      <Card title="Top Drawdown Events">
        <DataTable
          columns={[
            { key: 'start', label: 'Start' },
            { key: 'end', label: 'End' },
            { key: 'depth', label: 'Depth %', align: 'right', format: (v: number) => `${v}%` },
            { key: 'duration_days', label: 'Duration (days)', align: 'right', format: (v: number) => `${v}` },
          ]}
          data={strat.dd_events}
          maxHeight="400px"
        />
      </Card>
    </div>
  );
}
