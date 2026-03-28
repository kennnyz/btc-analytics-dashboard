import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { getColors } from '../shared/charts/theme';

export default function MonthlyBias() {
  const { analytics } = useData();
  if (!analytics?.monthly_open_bias) return <div>No data.</div>;

  const mb = analytics.monthly_open_bias;
  const c = getColors();

  return (
    <div>
      <h2>Monthly Open Bias</h2>
      <StatGrid>
        <StatCard value={mb.total_months} label="Total Months" variant="accent" />
        <StatCard value={`${mb.bullish_pct}%`} label="Bullish Months" variant="positive" />
      </StatGrid>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SimpleBar
            data={mb.by_month}
            xKey="month"
            bars={[{ key: 'avg_return' }]}
            title="Avg Return by Month"
            colorByValue
            height={280}
          />
        </Card>
        <Card>
          <SimpleBar
            data={mb.by_month}
            xKey="month"
            bars={[{ key: 'bullish_pct', color: c.positive }]}
            title="Bullish % by Month"
            height={280}
          />
        </Card>
      </div>
    </div>
  );
}
