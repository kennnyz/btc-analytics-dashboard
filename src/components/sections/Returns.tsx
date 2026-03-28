import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';

export default function Returns() {
  const { analytics } = useData();
  if (!analytics) return null;
  const sr = analytics.sweep_returns;

  const makeRows = (side: string, data: Record<string, any>) =>
    Object.entries(data).map(([tf, d]) => ({ tf, side, ...d }));

  // const rows = [...makeRows('SSL', sr.SSL), ...makeRows('BSL', sr.BSL)];

  return (
    <div>
      <h2>Sweep Returns Distribution</h2>
      <Card title="SSL (Support Sweep Lows)">
        <DataTable columns={[
          { key: 'tf', label: 'Timeframe' },
          { key: 'mean', label: 'Mean', align: 'right', colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
          { key: 'median', label: 'Median', align: 'right', colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
          { key: 'q25', label: 'Q25', align: 'right', format: (v: number) => `${v.toFixed(3)}%` },
          { key: 'q75', label: 'Q75', align: 'right', format: (v: number) => `${v.toFixed(3)}%` },
          { key: 'std', label: 'Std Dev', align: 'right', format: (v: number) => `${v.toFixed(3)}%` },
        ]} data={makeRows('SSL', sr.SSL)} sortable={false} />
      </Card>
      <Card title="BSL (Buy-Side Liquidity)">
        <DataTable columns={[
          { key: 'tf', label: 'Timeframe' },
          { key: 'mean', label: 'Mean', align: 'right', colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
          { key: 'median', label: 'Median', align: 'right', colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
          { key: 'q25', label: 'Q25', align: 'right', format: (v: number) => `${v.toFixed(3)}%` },
          { key: 'q75', label: 'Q75', align: 'right', format: (v: number) => `${v.toFixed(3)}%` },
          { key: 'std', label: 'Std Dev', align: 'right', format: (v: number) => `${v.toFixed(3)}%` },
        ]} data={makeRows('BSL', sr.BSL)} sortable={false} />
      </Card>
    </div>
  );
}
