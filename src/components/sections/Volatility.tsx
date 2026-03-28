import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { SimpleBar } from '../shared/charts/SimpleBar';

export default function Volatility() {
  const { analytics } = useData();
  if (!analytics) return null;
  const v = analytics.volatility;
  const vp = analytics.vol_percentiles;
  const vy = analytics.vol_yearly;

  return (
    <div>
      <h2>Volatility</h2>
      <StatGrid>
        <StatCard value={`${v.bb_squeeze.total_squeezes}`} label="BB Squeezes Detected" variant="accent" />
        <StatCard value={`${v.bb_squeeze.avg_move_24h.toFixed(2)}%`} label="Avg Move After Squeeze (24h)" />
        <StatCard value={`${v.bb_squeeze.pct_big_move.toFixed(1)}%`} label="Big Move After Squeeze" variant="positive" />
        <StatCard value={`${v.vol_clustering.big_move_days}`} label="Big Move Days" />
      </StatGrid>

      {vp && (
        <Card title="Current Volatility Percentile">
          <StatGrid columns={4}>
            <StatCard value={`${vp.current_atr14.toFixed(2)}%`} label="ATR(14) Current" variant="accent" small />
            <StatCard value={`${vp.percentile_90d}%`} label="Percentile (90d)" small />
            <StatCard value={`${vp.percentile_365d}%`} label="Percentile (1Y)" small />
            <StatCard value={`${vp.percentile_all}%`} label="Percentile (All Time)" small />
          </StatGrid>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card><SimpleBar data={v.atr_by_month} xKey="month" bars={[{ key: 'avg_range', color: '#bc8cff', name: 'Avg Range %' }]} title="Avg Range by Month" /></Card>
        <Card><SimpleBar data={v.atr_by_session} xKey="session" bars={[{ key: 'avg_range', color: '#e3b341', name: 'Avg Range %' }]} title="Avg Range by Session" /></Card>
      </div>

      <Card title="Volatility Clustering">
        <StatGrid columns={4}>
          <StatCard value={`${v.vol_clustering.avg_range_day1.toFixed(2)}%`} label="Day 1 After Big Move" small />
          <StatCard value={`${v.vol_clustering.avg_range_day2.toFixed(2)}%`} label="Day 2 After Big Move" small />
          <StatCard value={`${v.vol_clustering.avg_range_day3.toFixed(2)}%`} label="Day 3 After Big Move" small />
          <StatCard value={`${v.vol_clustering.avg_normal_range.toFixed(2)}%`} label="Normal Day Range" small />
        </StatGrid>
      </Card>

      {vy && vy.length > 0 && (
        <Card title="Volatility by Year">
          <DataTable
            columns={[
              { key: 'year', label: 'Year' },
              { key: 'avg_range', label: 'Avg Daily Range', align: 'right' as const, format: (v: number) => `${v.toFixed(2)}%` },
              { key: 'max_range', label: 'Max Range', align: 'right' as const, format: (v: number) => `${v.toFixed(1)}%` },
              { key: 'avg_atr14', label: 'Avg ATR(14)', align: 'right' as const, format: (v: number) => `${v.toFixed(2)}%` },
              { key: 'days_above_5pct', label: '>5% Days', align: 'right' as const },
              { key: 'days_above_10pct', label: '>10% Days', align: 'right' as const },
            ]}
            data={vy}
          />
        </Card>
      )}
    </div>
  );
}
