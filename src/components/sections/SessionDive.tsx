import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';

export default function SessionDive() {
  const { analytics } = useData();
  if (!analytics) return null;
  const s = analytics.session_dive;

  return (
    <div>
      <h2>Session Deep Dive</h2>
      <StatGrid>
        <StatCard value={`${s.asia_range.avg_range_pct.toFixed(2)}%`} label="Asia Range (avg)" variant="accent" />
        <StatCard value={`${s.asia_range.london_break_high_pct.toFixed(1)}%`} label="London Breaks Asia High" variant="positive" />
        <StatCard value={`${s.asia_range.london_break_low_pct.toFixed(1)}%`} label="London Breaks Asia Low" variant="negative" />
        <StatCard value={`${s.london_open_predict.correct_pct.toFixed(1)}%`} label="London Predicts Day" />
      </StatGrid>
      <Card title="Session Overlap">
        <StatGrid columns={2}>
          <StatCard value={`${s.overlap.overlap_avg_range.toFixed(2)}%`} label="Overlap Avg Range" small />
          <StatCard value={`${s.overlap.rest_avg_range.toFixed(2)}%`} label="Non-Overlap Avg Range" small />
        </StatGrid>
      </Card>
      <Card title="Opening Range Breakout (ORB)">
        <DataTable columns={[
          { key: 'session', label: 'Session' },
          { key: 'total', label: 'Days', align: 'right' },
          { key: 'break_up_pct', label: 'Break Up %', align: 'right', format: (v: number) => `${v.toFixed(1)}%` },
          { key: 'break_down_pct', label: 'Break Down %', align: 'right', format: (v: number) => `${v.toFixed(1)}%` },
        ]} data={s.orb} />
      </Card>
    </div>
  );
}
