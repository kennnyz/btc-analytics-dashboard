import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { SimpleLine } from '../shared/charts/SimpleLine';
import { COLORS } from '../shared/charts/theme';

export default function Hourly() {
  const { analytics } = useData();
  if (!analytics) return null;
  const data = analytics.hourly.map(h => ({ ...h, label: `${h.hour}:00` }));
  const hr = analytics.hourly_returns;

  const returnData = hr?.map(h => ({
    label: `${h.hour}:00`,
    avg_return: h.avg_return,
    positive_pct: h.positive_pct,
  }));

  return (
    <div>
      <h2>Hourly Analysis</h2>
      <Card><SimpleBar data={data} xKey="label" bars={[{ key: 'count', color: COLORS.accent }]} title="Sweep Count by Hour (UTC)" height={350} /></Card>
      <Card><SimpleLine data={data} xKey="label" lines={[{ key: 'reversal_rate', color: COLORS.positive, name: 'Reversal Rate %' }]} title="Reversal Rate by Hour" height={300} /></Card>

      {returnData && (
        <>
          <Card>
            <SimpleBar data={returnData} xKey="label" bars={[{ key: 'avg_return' }]} title="Avg Hourly Return % (7Y)" colorByValue height={320} />
          </Card>
          <Card title="Hourly Return Details">
            <DataTable
              columns={[
                { key: 'hour', label: 'Hour (UTC)', format: (v: number) => `${v}:00` },
                { key: 'avg_return', label: 'Avg Return %', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(4)}%` },
                { key: 'median_return', label: 'Median %', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(4)}%` },
                { key: 'positive_pct', label: 'Positive %', align: 'right' as const, format: (v: number) => `${v}%` },
                { key: 'count', label: 'Samples', align: 'right' as const },
              ]}
              data={hr ?? []}
            />
          </Card>
        </>
      )}
    </div>
  );
}
