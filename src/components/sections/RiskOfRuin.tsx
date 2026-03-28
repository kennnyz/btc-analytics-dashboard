import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';

export default function RiskOfRuin() {
  const { analytics } = useData();
  if (!analytics?.risk_of_ruin) return <div>No data.</div>;

  const strategies = analytics.risk_of_ruin.strategies;

  return (
    <div>
      <h2>Risk of Ruin</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
        Monte Carlo simulation: 1000 runs of 100 trades each, using actual PnL distribution.
      </p>
      <Card>
        <DataTable
          columns={[
            { key: 'name', label: 'Strategy' },
            { key: 'period', label: 'Period' },
            { key: 'risk_of_ruin_50', label: 'Ruin 50%', align: 'right', colorize: true, format: (v: number) => `${v}%` },
            { key: 'risk_of_ruin_30', label: 'Ruin 30%', align: 'right', colorize: true, format: (v: number) => `${v}%` },
            { key: 'avg_max_dd', label: 'Avg Max DD', align: 'right', format: (v: number) => `${v}%` },
            { key: 'worst_dd', label: 'Worst DD', align: 'right', format: (v: number) => `${v}%` },
          ]}
          data={strategies}
          maxHeight="500px"
        />
      </Card>
    </div>
  );
}
