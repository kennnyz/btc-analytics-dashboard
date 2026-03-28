import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { COLORS, FONT_MONO } from '../shared/charts/theme';

export default function DrawdownRecovery() {
  const { analytics } = useData();
  const events = analytics?.drawdown_events;
  if (!events || events.length === 0) return <div>No data.</div>;

  const recovered = events.filter(e => e.recovery_days != null);
  const avgRecovery = recovered.length > 0 ? Math.round(recovered.reduce((s, e) => s + (e.recovery_days ?? 0), 0) / recovered.length) : 0;
  const maxDD = Math.min(...events.map(e => e.drawdown_pct));

  return (
    <div>
      <h2>Drawdown Recovery</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '-8px 0 16px', fontFamily: FONT_MONO }}>
        Every drawdown &gt;5% from local high: how deep, how long to recover. Key data for position sizing.
      </p>
      <StatGrid>
        <StatCard value={events.length} label="Drawdowns >5%" variant="accent" />
        <StatCard value={`${maxDD}%`} label="Worst Drawdown" variant="negative" />
        <StatCard value={`${avgRecovery}d`} label="Avg Recovery Time" />
        <StatCard value={recovered.length} label="Fully Recovered" variant="positive" />
      </StatGrid>

      <Card title="All Drawdown Events">
        <DataTable
          columns={[
            { key: 'start_date', label: 'Start' },
            { key: 'trough_date', label: 'Trough' },
            { key: 'peak_price', label: 'Peak', align: 'right' as const, format: (v: number) => `$${v?.toLocaleString()}` },
            { key: 'trough_price', label: 'Trough', align: 'right' as const, format: (v: number) => `$${v?.toLocaleString()}` },
            { key: 'drawdown_pct', label: 'Drawdown', align: 'right' as const, format: (v: number) => `${v}%` },
            { key: 'recovery_days', label: 'Recovery', align: 'right' as const, format: (v: number | null) => v != null ? `${v}d` : 'Ongoing' },
            { key: 'total_days', label: 'Total', align: 'right' as const, format: (v: number | null) => v != null ? `${v}d` : '-' },
            { key: 'recovery_date', label: 'Recovered', format: (v: string | null) => v ?? '-' },
          ]}
          data={events.slice().reverse()}
          maxHeight="600px"
        />
      </Card>
    </div>
  );
}
