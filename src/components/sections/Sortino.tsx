import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';

export default function Sortino() {
  const { analytics } = useData();
  if (!analytics?.sortino_ratio) return <div>No data.</div>;

  const strategies = analytics.sortino_ratio.strategies;

  return (
    <div>
      <h2>Sortino Ratio</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
        Sortino focuses on downside risk only. Higher is better.
      </p>
      <Card>
        <DataTable
          columns={[
            { key: 'name', label: 'Strategy' },
            { key: 'period', label: 'Period' },
            { key: 'sortino', label: 'Sortino', align: 'right', colorize: true, format: (v: number) => v?.toFixed(2) },
            { key: 'sharpe', label: 'Sharpe', align: 'right', colorize: true, format: (v: number) => v?.toFixed(2) },
            { key: 'downside_dev', label: 'Down Dev', align: 'right', format: (v: number) => `${v}%` },
            { key: 'mean_return', label: 'Mean Return', align: 'right', colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v}%` },
          ]}
          data={strategies}
          maxHeight="500px"
        />
      </Card>
    </div>
  );
}
