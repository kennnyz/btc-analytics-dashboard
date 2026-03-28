import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';

export default function RoundNumbers() {
  const { analytics } = useData();
  if (!analytics) return null;
  const r = analytics.round_numbers;

  return (
    <div>
      <h2>Round Numbers</h2>
      <StatGrid>
        <StatCard value={r.round_numbers.length} label="Levels Analyzed" variant="accent" />
        <StatCard value={`${r.magnetic_effect.from_below_avg_ret.toFixed(3)}%`} label="Approach From Below Avg Ret" variant={r.magnetic_effect.from_below_avg_ret > 0 ? 'positive' : 'negative'} />
        <StatCard value={`${r.magnetic_effect.from_above_avg_ret.toFixed(3)}%`} label="Approach From Above Avg Ret" variant={r.magnetic_effect.from_above_avg_ret > 0 ? 'positive' : 'negative'} />
      </StatGrid>
      <Card title="Round Number Levels">
        <DataTable columns={[
          { key: 'level', label: 'Level ($)', align: 'right', format: (v: number) => `$${v.toLocaleString()}` },
          { key: 'total_touches', label: 'Touches', align: 'right' },
          { key: 'bounce_pct', label: 'Bounce %', align: 'right', format: (v: number) => `${v.toFixed(1)}%` },
          { key: 'break_pct', label: 'Break %', align: 'right', format: (v: number) => `${v.toFixed(1)}%` },
          { key: 'avg_24h_ret', label: '24h Return', align: 'right', colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
        ]} data={r.round_numbers} maxHeight="600px" />
      </Card>
    </div>
  );
}
