import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { FONT_MONO, getColors } from '../shared/charts/theme';

export default function MfeMae() {
  const { analytics } = useData();
  const [idx, setIdx] = useState(0);

  if (!analytics?.mfe_mae) return <div>No data.</div>;
  const strategies = analytics.mfe_mae.strategies;
  if (strategies.length === 0) return <div>No data.</div>;

  const strat = strategies[idx];
  const c = getColors();

  const selectStyle: React.CSSProperties = {
    padding: '6px 12px', background: 'var(--card-bg)',
    border: '1px solid var(--border-light)', borderRadius: 6,
    color: 'var(--text)', fontSize: 13, fontFamily: FONT_MONO, outline: 'none',
  };

  return (
    <div>
      <h2>MFE / MAE</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
        <select value={idx} onChange={e => setIdx(Number(e.target.value))} style={selectStyle}>
          {strategies.map((s, i) => (
            <option key={i} value={i}>{s.name} ({s.period})</option>
          ))}
        </select>
      </div>

      <StatGrid>
        <StatCard value={`${strat.avg_mfe}%`} label="Avg MFE" variant="positive" />
        <StatCard value={`${strat.avg_mae}%`} label="Avg MAE" variant="negative" />
        <StatCard value={strat.mfe_mae_ratio.toFixed(2)} label="MFE/MAE Ratio" variant={strat.mfe_mae_ratio > 1 ? 'positive' : 'negative'} />
      </StatGrid>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SimpleBar data={strat.mfe_distribution} xKey="bucket" bars={[{ key: 'count', color: c.positive }]} title="MFE Distribution" height={250} />
        </Card>
        <Card>
          <SimpleBar data={strat.mae_distribution} xKey="bucket" bars={[{ key: 'count', color: c.negative }]} title="MAE Distribution" height={250} />
        </Card>
      </div>
    </div>
  );
}
