import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';

export default function Kelly() {
  const { analytics } = useData();
  if (!analytics?.kelly_criterion) return <div>No data.</div>;

  const strategies = analytics.kelly_criterion.strategies;

  return (
    <div>
      <h2>Kelly Criterion</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
        Kelly % = W - (1-W)/R. Half-Kelly is the recommended conservative position size.
      </p>
      <Card>
        <DataTable
          columns={[
            { key: 'name', label: 'Strategy' },
            { key: 'period', label: 'Period' },
            { key: 'kelly_pct', label: 'Kelly %', align: 'right', colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v}%` },
            { key: 'half_kelly', label: 'Half Kelly %', align: 'right', colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v}%` },
            { key: 'win_rate', label: 'Win Rate', align: 'right', format: (v: number) => `${v}%` },
            { key: 'avg_win', label: 'Avg Win', align: 'right', format: (v: number) => `${v}%` },
            { key: 'avg_loss', label: 'Avg Loss', align: 'right', format: (v: number) => `${v}%` },
            { key: 'risk_reward', label: 'R:R', align: 'right', format: (v: number) => v?.toFixed(2) },
          ]}
          data={strategies}
          maxHeight="500px"
        />
      </Card>
    </div>
  );
}
