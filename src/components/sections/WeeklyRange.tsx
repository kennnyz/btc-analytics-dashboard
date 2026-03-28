import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { getColors } from '../shared/charts/theme';

export default function WeeklyRange() {
  const { analytics } = useData();
  if (!analytics?.weekly_range) return <div>No data.</div>;

  const wr = analytics.weekly_range;
  const c = getColors();
  const cum = analytics.weekly_cumulative_range;

  const yearData = wr.by_year.map(y => ({
    year: String(y.year),
    avg_range: y.avg_range,
    max_range: y.max_range,
  }));

  return (
    <div>
      <h2>Weekly Range</h2>
      <StatGrid>
        <StatCard value={`${wr.avg_range}%`} label="Avg Weekly Range" variant="accent" />
      </StatGrid>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card>
          <SimpleBar data={yearData} xKey="year" bars={[{ key: 'avg_range', color: c.accent }, { key: 'max_range', color: c.purple }]} title="Range by Year" height={280} />
        </Card>
        <Card>
          <SimpleBar data={wr.by_quarter} xKey="quarter" bars={[{ key: 'avg_range', color: c.accent }]} title="Range by Quarter" height={280} />
        </Card>
      </div>

      <Card>
        <SimpleBar data={wr.distribution} xKey="bucket" bars={[{ key: 'count', color: c.purple }]} title="Range Distribution" height={250} />
      </Card>

      {cum && cum.length > 0 && (
        <Card title="Cumulative Range by Day of Week">
          <SimpleBar data={cum} xKey="day" bars={[{ key: 'avg_pct_of_weekly_range', color: c.accent, name: 'Avg % of Weekly Range' }]} title="How much of the weekly range is covered by end of each day?" height={280} />
          <DataTable
            columns={[
              { key: 'day', label: 'Day' },
              { key: 'avg_pct_of_weekly_range', label: 'Avg % of Weekly Range', align: 'right' as const, format: (v: number) => `${v}%` },
              { key: 'median_pct', label: 'Median %', align: 'right' as const, format: (v: number) => `${v}%` },
            ]}
            data={cum}
          />
        </Card>
      )}
    </div>
  );
}
