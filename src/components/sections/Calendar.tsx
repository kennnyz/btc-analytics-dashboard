import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { DataTable } from '../shared/DataTable';
import { COLORS } from '../shared/charts/theme';

export default function Calendar() {
  const { analytics } = useData();
  if (!analytics) return null;

  return (
    <div>
      <h2>Calendar</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card><SimpleBar data={analytics.day_of_week} xKey="day" bars={[{ key: 'reversal_rate', color: COLORS.positive }]} title="Reversal Rate by Day of Week %" /></Card>
        <Card><SimpleBar data={analytics.day_of_week} xKey="day" bars={[{ key: 'avg_daily_return' }]} title="Avg Daily Return by DoW" colorByValue /></Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card><SimpleBar data={analytics.monthly} xKey="month" bars={[{ key: 'avg_return' }]} title="Avg Return by Month" colorByValue /></Card>
        <Card><SimpleBar data={analytics.quarters} xKey="quarter" bars={[{ key: 'reversal_rate', color: COLORS.accent }]} title="Reversal Rate by Quarter %" /></Card>
      </div>
      <Card title="Day of Week Details">
        <DataTable columns={[
          { key: 'day', label: 'Day' },
          { key: 'count', label: 'Sweeps', align: 'right' },
          { key: 'reversal_rate', label: 'Rev Rate', align: 'right', format: (v: number) => `${v.toFixed(1)}%` },
          { key: 'avg_daily_range', label: 'Avg Range', align: 'right', format: (v: number) => `${v.toFixed(2)}%` },
          { key: 'avg_daily_return', label: 'Avg Return', align: 'right', colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
        ]} data={analytics.day_of_week} />
      </Card>
    </div>
  );
}
