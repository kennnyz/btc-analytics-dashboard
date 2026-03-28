import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { COLORS, FONT_MONO, getColors } from '../shared/charts/theme';

export default function TimeInProfit() {
  const { analytics } = useData();
  const tip = analytics?.time_in_profit;
  if (!tip || tip.length === 0) return <div>No data.</div>;

  const c = getColors();

  return (
    <div>
      <h2>Time in Profit</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '-8px 0 16px', fontFamily: FONT_MONO }}>
        If you bought BTC at a random point in the last 7 years, what is the probability of being in profit after N days?
      </p>
      <StatGrid>
        {tip.filter(t => [1, 30, 180, 365].includes(t.days)).map(t => (
          <StatCard key={t.days} value={`${t.win_pct}%`} label={`Profitable after ${t.label}`} variant={t.win_pct > 55 ? 'positive' : 'default'} />
        ))}
      </StatGrid>

      <Card title="Win Rate by Holding Period">
        <SimpleBar data={tip} xKey="label" bars={[{ key: 'win_pct', color: c.positive, name: 'Win %' }]} title="" height={300} />
      </Card>

      <Card title="Detailed Statistics">
        <DataTable
          columns={[
            { key: 'label', label: 'Hold Period' },
            { key: 'win_pct', label: 'Win %', align: 'right' as const, format: (v: number) => `${v}%` },
            { key: 'avg_return', label: 'Avg Return', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v}%` },
            { key: 'median_return', label: 'Median', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v}%` },
            { key: 'worst', label: 'Worst', align: 'right' as const, format: (v: number) => `${v}%` },
            { key: 'best', label: 'Best', align: 'right' as const, format: (v: number) => `+${v}%` },
            { key: 'samples', label: 'Samples', align: 'right' as const },
          ]}
          data={tip}
        />
      </Card>
    </div>
  );
}
