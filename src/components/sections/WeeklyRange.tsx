import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { getColors } from '../shared/charts/theme';

export default function WeeklyRange() {
  const { analytics } = useData();
  if (!analytics?.weekly_range) return <div>No data.</div>;

  const wr = analytics.weekly_range;
  const c = getColors();

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
          <SimpleBar
            data={yearData}
            xKey="year"
            bars={[
              { key: 'avg_range', color: c.accent },
              { key: 'max_range', color: c.purple },
            ]}
            title="Range by Year"
            height={280}
          />
        </Card>
        <Card>
          <SimpleBar
            data={wr.by_quarter}
            xKey="quarter"
            bars={[{ key: 'avg_range', color: c.accent }]}
            title="Range by Quarter"
            height={280}
          />
        </Card>
      </div>

      <Card>
        <SimpleBar
          data={wr.distribution}
          xKey="bucket"
          bars={[{ key: 'count', color: c.purple }]}
          title="Range Distribution"
          height={250}
        />
      </Card>
    </div>
  );
}
