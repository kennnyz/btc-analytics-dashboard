import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';

export default function Volatility() {
  const { analytics } = useData();
  if (!analytics) return null;
  const v = analytics.volatility;

  return (
    <div>
      <h2>Volatility</h2>
      <StatGrid>
        <StatCard value={`${v.bb_squeeze.total_squeezes}`} label="BB Squeezes Detected" variant="accent" />
        <StatCard value={`${v.bb_squeeze.avg_move_24h.toFixed(2)}%`} label="Avg Move After Squeeze (24h)" />
        <StatCard value={`${v.bb_squeeze.pct_big_move.toFixed(1)}%`} label="Big Move After Squeeze" variant="positive" />
        <StatCard value={`${v.vol_clustering.big_move_days}`} label="Big Move Days" />
      </StatGrid>
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
    </div>
  );
}
