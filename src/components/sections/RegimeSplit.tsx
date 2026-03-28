import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { COLORS, FONT_MONO, getColors } from '../shared/charts/theme';

export default function RegimeSplit() {
  const { analytics } = useData();
  const rs = analytics?.regime_split;
  if (!rs) return <div>No data.</div>;

  const c = getColors();
  const bull = rs.summary.bull;
  const bear = rs.summary.bear;

  const hourlyData = rs.hourly.map(h => ({
    ...h,
    label: `${h.hour}:00`,
  }));

  return (
    <div>
      <h2>Bull vs Bear Regime</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '-8px 0 16px', fontFamily: FONT_MONO }}>
        All metrics split by market regime: bull (price &gt; EMA200) vs bear (price &lt; EMA200)
      </p>

      <StatGrid>
        <StatCard value={bull.days} label="Bull Days" variant="positive" />
        <StatCard value={`${bull.pct_of_total.toFixed(1)}%`} label="Bull % of Total" variant="positive" />
        <StatCard value={bear.days} label="Bear Days" variant="negative" />
        <StatCard value={`${bear.pct_of_total.toFixed(1)}%`} label="Bear % of Total" variant="negative" />
        <StatCard value={`${bull.avg_daily_return.toFixed(3)}%`} label="Bull Avg Return" variant="positive" />
        <StatCard value={`${bear.avg_daily_return.toFixed(3)}%`} label="Bear Avg Return" variant="negative" />
        <StatCard value={`${bull.positive_days_pct.toFixed(1)}%`} label="Bull Positive Days" variant="positive" />
        <StatCard value={`${bear.positive_days_pct.toFixed(1)}%`} label="Bear Positive Days" variant="negative" />
      </StatGrid>

      <Card title="Hourly Returns by Regime">
        <SimpleBar
          data={hourlyData}
          xKey="label"
          bars={[
            { key: 'bull_avg', color: c.positive, name: 'Bull Avg' },
            { key: 'bear_avg', color: c.negative, name: 'Bear Avg' },
          ]}
          height={300}
        />
      </Card>

      <Card title="Day of Week by Regime">
        <DataTable
          columns={[
            { key: 'day', label: 'Day' },
            { key: 'bull_avg', label: 'Bull Avg', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v?.toFixed(3)}%` },
            { key: 'bull_positive', label: 'Bull Win%', align: 'right' as const, format: (v: number) => `${v?.toFixed(1)}%` },
            { key: 'bear_avg', label: 'Bear Avg', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v?.toFixed(3)}%` },
            { key: 'bear_positive', label: 'Bear Win%', align: 'right' as const, format: (v: number) => `${v?.toFixed(1)}%` },
          ]}
          data={rs.dow}
        />
      </Card>
    </div>
  );
}
