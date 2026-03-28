import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { DataTable } from '../shared/DataTable';
import { COLORS } from '../shared/charts/theme';

export default function Liquidity() {
  const { analytics } = useData();
  if (!analytics) return null;

  return (
    <div>
      <h2>Liquidity Levels</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card><SimpleBar data={analytics.level_types} xKey="level_type" bars={[{ key: 'reversal_rate', color: COLORS.positive }]} title="Reversal Rate by Level Type %" /></Card>
        <Card><SimpleBar data={analytics.level_types} xKey="level_type" bars={[{ key: 'avg_4h_return' }]} title="Avg 4H Return by Level" colorByValue /></Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card><SimpleBar data={analytics.depth_buckets} xKey="bucket" bars={[{ key: 'reversal_rate', color: COLORS.accent }]} title="Reversal Rate by Sweep Depth" /></Card>
        <Card><SimpleBar data={analytics.depth_buckets} xKey="bucket" bars={[{ key: 'avg_return_4H' }]} title="Avg 4H Return by Sweep Depth" colorByValue /></Card>
      </div>
      <Card title="Level Types Details">
        <DataTable columns={[
          { key: 'level_type', label: 'Level' },
          { key: 'side', label: 'Side' },
          { key: 'count', label: 'Count', align: 'right' },
          { key: 'reversal_rate', label: 'Rev Rate', align: 'right', format: (v: number) => `${v.toFixed(1)}%` },
          { key: 'avg_4h_return', label: '4H Return', align: 'right', colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
          { key: 'avg_depth', label: 'Depth', align: 'right', format: (v: number) => `${v.toFixed(2)}%` },
        ]} data={analytics.level_types} />
      </Card>
    </div>
  );
}
