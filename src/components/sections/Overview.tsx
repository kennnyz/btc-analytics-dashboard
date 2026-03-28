import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { SimplePie } from '../shared/charts/SimplePie';
import { DataTable } from '../shared/DataTable';
import { COLORS } from '../shared/charts/theme';

export default function Overview() {
  const { analytics } = useData();
  if (!analytics) return null;
  const o = analytics.overview;

  const levelData = Object.entries(o.by_level_type).map(([k, v]) => ({ name: k, count: v }));
  const returnData = Object.entries(o.avg_returns).map(([k, v]) => ({ tf: k, return: Number(v.toFixed(3)) }));

  return (
    <div>
      <h2>Overview</h2>
      <StatGrid>
        <StatCard value={o.total_sweeps.toLocaleString()} label="Total Sweeps (7Y)" variant="accent" />
        <StatCard value={`${o.reversal_rate.toFixed(1)}%`} label="Reversal Rate" variant="positive" />
        <StatCard value={o.ssl_count.toLocaleString()} label="SSL (Support) Sweeps" />
        <StatCard value={o.bsl_count.toLocaleString()} label="BSL (Resistance) Sweeps" />
      </StatGrid>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card><SimpleBar data={levelData} xKey="name" bars={[{ key: 'count', color: COLORS.accent }]} title="Sweeps by Level Type" /></Card>
        <Card><SimplePie data={[
          { name: 'SSL (Support)', value: o.ssl_count, color: COLORS.positive },
          { name: 'BSL (Resistance)', value: o.bsl_count, color: COLORS.negative },
        ]} title="SSL vs BSL" /></Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card><SimpleBar data={returnData} xKey="tf" bars={[{ key: 'return' }]} title="Avg Return After Sweep" colorByValue yLabel="Return %" /></Card>
        <Card title="Yearly Breakdown">
          <DataTable columns={[
            { key: 'year', label: 'Year' },
            { key: 'total_sweeps', label: 'Sweeps', align: 'right' },
            { key: 'reversal_rate', label: 'Rev. Rate', align: 'right', format: (v: number) => `${v.toFixed(1)}%` },
            { key: 'avg_4h_return', label: 'Avg 4H Ret', align: 'right', colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
          ]} data={analytics.yearly} />
        </Card>
      </div>
    </div>
  );
}
