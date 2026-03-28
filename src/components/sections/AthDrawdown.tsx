import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { COLORS, FONT_MONO, getColors } from '../shared/charts/theme';

export default function AthDrawdown() {
  const { analytics } = useData();
  const ad = analytics?.ath_drawdown;
  if (!ad) return <div>No data.</div>;

  const c = getColors();

  return (
    <div>
      <h2>Distance from All-Time High</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '-8px 0 16px', fontFamily: FONT_MONO }}>
        How much time BTC spends at various distances from its ATH. Helps calibrate drawdown expectations.
      </p>

      <StatGrid>
        <StatCard value={`${ad.current_dd_pct.toFixed(1)}%`} label="Current Drawdown" variant="negative" />
        <StatCard value={`$${ad.current_ath.toLocaleString()}`} label="Current ATH" variant="accent" />
      </StatGrid>

      <Card title="Time Spent at Each Distance">
        <SimpleBar
          data={ad.distribution}
          xKey="bucket"
          bars={[{ key: 'pct', color: c.accent, name: 'Time %' }]}
          height={300}
          yLabel="%"
        />
      </Card>

      <Card title="Details">
        <DataTable
          columns={[
            { key: 'bucket', label: 'Distance from ATH' },
            { key: 'days', label: 'Days', align: 'right' as const },
            { key: 'pct', label: '% of Time', align: 'right' as const, format: (v: number) => `${v.toFixed(1)}%` },
          ]}
          data={ad.distribution}
        />
      </Card>
    </div>
  );
}
