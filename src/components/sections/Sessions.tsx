import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { COLORS } from '../shared/charts/theme';

export default function Sessions() {
  const { analytics } = useData();
  if (!analytics) return null;

  return (
    <div>
      <h2>Sessions</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card><SimpleBar data={analytics.sessions} xKey="session" bars={[{ key: 'count', color: COLORS.accent }]} title="Sweep Count by Session" /></Card>
        <Card><SimpleBar data={analytics.sessions} xKey="session" bars={[{ key: 'reversal_rate', color: COLORS.positive }]} title="Reversal Rate by Session %" /></Card>
      </div>
      <Card><SimpleBar data={analytics.sessions} xKey="session" bars={[{ key: 'avg_4h_return' }]} title="Avg 4H Return by Session" colorByValue yLabel="%" /></Card>
      <Card title="Session Details">
        <DataTable columns={[
          { key: 'session', label: 'Session' },
          { key: 'count', label: 'Sweeps', align: 'right' },
          { key: 'reversal_rate', label: 'Rev. Rate', align: 'right', format: (v: number) => `${v.toFixed(1)}%` },
          { key: 'avg_4h_return', label: 'Avg 4H Return', align: 'right', colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
          { key: 'avg_depth', label: 'Avg Depth', align: 'right', format: (v: number) => `${v.toFixed(2)}%` },
        ]} data={analytics.sessions} />
      </Card>
    </div>
  );
}
