import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { SimpleLine } from '../shared/charts/SimpleLine';
import { COLORS } from '../shared/charts/theme';

export default function Hourly() {
  const { analytics } = useData();
  if (!analytics) return null;
  const data = analytics.hourly.map(h => ({ ...h, label: `${h.hour}:00` }));

  return (
    <div>
      <h2>Hourly Analysis</h2>
      <Card><SimpleBar data={data} xKey="label" bars={[{ key: 'count', color: COLORS.accent }]} title="Sweep Count by Hour (UTC)" height={350} /></Card>
      <Card><SimpleLine data={data} xKey="label" lines={[{ key: 'reversal_rate', color: COLORS.positive, name: 'Reversal Rate %' }]} title="Reversal Rate by Hour" height={300} /></Card>
    </div>
  );
}
