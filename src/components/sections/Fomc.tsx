import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';

export default function Fomc() {
  const { analytics } = useData();
  if (!analytics) return null;
  const f = analytics.fomc;

  const compareData = [
    { metric: 'Avg Range %', fomc: Number(f.fomc_avg_range.toFixed(2)), normal: Number(f.normal_avg_range.toFixed(2)) },
    { metric: 'Sweeps/Day', fomc: Number(f.fomc_sweep_per_day.toFixed(1)), normal: Number(f.normal_sweep_per_day.toFixed(1)) },
  ];
  const aroundFomc = [
    { period: 'Day Before', avg_return: Number(f.day_before_fomc_avg_return.toFixed(3)), avg_range: Number(f.day_before_fomc_avg_range.toFixed(2)) },
    { period: 'FOMC Day', avg_return: Number(f.fomc_avg_return.toFixed(3)), avg_range: Number(f.fomc_avg_range.toFixed(2)) },
    { period: 'Day After', avg_return: Number(f.day_after_fomc_avg_return.toFixed(3)), avg_range: Number(f.day_after_fomc_avg_range.toFixed(2)) },
  ];

  return (
    <div>
      <h2>FOMC Impact</h2>
      <StatGrid>
        <StatCard value={`${f.fomc_avg_range.toFixed(2)}%`} label="FOMC Day Avg Range" variant="accent" />
        <StatCard value={`${f.normal_avg_range.toFixed(2)}%`} label="Normal Day Avg Range" />
        <StatCard value={`${f.fomc_reversal_rate.toFixed(1)}%`} label="FOMC Reversal Rate" variant="positive" />
        <StatCard value={f.fomc_sweep_per_day.toFixed(1)} label="Sweeps per FOMC Day" />
      </StatGrid>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card><SimpleBar data={compareData} xKey="metric" bars={[{ key: 'fomc', name: 'FOMC Day', color: '#f85149' }, { key: 'normal', name: 'Normal Day', color: '#58a6ff' }]} title="FOMC vs Normal Days" /></Card>
        <Card><SimpleBar data={aroundFomc} xKey="period" bars={[{ key: 'avg_range', name: 'Avg Range %', color: '#bc8cff' }]} title="Range Around FOMC" /></Card>
      </div>
    </div>
  );
}
