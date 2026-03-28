import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { DataTable } from '../shared/DataTable';
import { COLORS } from '../shared/charts/theme';

export default function Volume() {
  const { analytics } = useData();
  if (!analytics) return null;
  const v = analytics.volume;
  const hourData = v.vol_by_hour.map(h => ({ ...h, label: `${h.hour}:00` }));

  return (
    <div>
      <h2>Volume Analysis</h2>
      <StatGrid>
        <StatCard value={v.vol_spikes.total} label="Volume Spikes (>2x avg)" variant="accent" />
      </StatGrid>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card><SimpleBar data={v.vol_by_session} xKey="session" bars={[{ key: 'avg_volume', color: COLORS.purple, name: 'Avg Volume' }]} title="Volume by Session" /></Card>
        <Card><SimpleBar data={hourData} xKey="label" bars={[{ key: 'avg_volume', color: COLORS.cyan }]} title="Volume by Hour" /></Card>
      </div>
      <Card title="Volume Spikes by Session">
        <DataTable columns={[
          { key: 'session', label: 'Session' },
          { key: 'count', label: 'Spikes', align: 'right' },
          { key: 'avg_ret_1h', label: '1H Return', align: 'right', colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
          { key: 'avg_ret_4h', label: '4H Return', align: 'right', colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
        ]} data={v.vol_spikes.by_session} />
      </Card>
    </div>
  );
}
