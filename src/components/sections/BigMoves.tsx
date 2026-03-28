import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';

export default function BigMoves() {
  const { analytics } = useData();
  if (!analytics) return null;
  const b = analytics.post_big_move;

  return (
    <div>
      <h2>Post Big Move Analysis</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card title={`After Big Up Days (${b.after_big_up.count} events)`}>
          <StatGrid columns={3}>
            <StatCard value={`${b.after_big_up.returns['1d']?.toFixed(3) ?? 0}%`} label="Next 1D" variant={Number(b.after_big_up.returns['1d']) > 0 ? 'positive' : 'negative'} small />
            <StatCard value={`${b.after_big_up.returns['3d']?.toFixed(3) ?? 0}%`} label="Next 3D" variant={Number(b.after_big_up.returns['3d']) > 0 ? 'positive' : 'negative'} small />
            <StatCard value={`${b.after_big_up.returns['7d']?.toFixed(3) ?? 0}%`} label="Next 7D" variant={Number(b.after_big_up.returns['7d']) > 0 ? 'positive' : 'negative'} small />
          </StatGrid>
        </Card>
        <Card title={`After Big Down Days (${b.after_big_down.count} events)`}>
          <StatGrid columns={3}>
            <StatCard value={`${b.after_big_down.returns['1d']?.toFixed(3) ?? 0}%`} label="Next 1D" variant={Number(b.after_big_down.returns['1d']) > 0 ? 'positive' : 'negative'} small />
            <StatCard value={`${b.after_big_down.returns['3d']?.toFixed(3) ?? 0}%`} label="Next 3D" variant={Number(b.after_big_down.returns['3d']) > 0 ? 'positive' : 'negative'} small />
            <StatCard value={`${b.after_big_down.returns['7d']?.toFixed(3) ?? 0}%`} label="Next 7D" variant={Number(b.after_big_down.returns['7d']) > 0 ? 'positive' : 'negative'} small />
          </StatGrid>
        </Card>
      </div>
      <Card title="Mean Reversion (RSI extremes)">
        <StatGrid columns={4}>
          <StatCard value={b.mean_reversion.oversold_events} label="Oversold Events" variant="positive" small />
          <StatCard value={`${b.mean_reversion.avg_recovery_days_oversold.toFixed(1)}d`} label="Avg Recovery (OS)" small />
          <StatCard value={b.mean_reversion.overbought_events} label="Overbought Events" variant="negative" small />
          <StatCard value={`${b.mean_reversion.avg_recovery_days_overbought.toFixed(1)}d`} label="Avg Recovery (OB)" small />
        </StatGrid>
      </Card>
      <Card title={`Big 4H Moves (${b.after_big_4h.count} events)`}>
        <StatGrid columns={2}>
          <StatCard value={`${b.after_big_4h.avg_ret_4h.toFixed(3)}%`} label="Avg Next 4H Return" variant={b.after_big_4h.avg_ret_4h > 0 ? 'positive' : 'negative'} small />
          <StatCard value={`${b.after_big_4h.avg_ret_12h.toFixed(3)}%`} label="Avg Next 12H Return" variant={b.after_big_4h.avg_ret_12h > 0 ? 'positive' : 'negative'} small />
        </StatGrid>
      </Card>
    </div>
  );
}
