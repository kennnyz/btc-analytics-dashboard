import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';

export default function Trends() {
  const { analytics } = useData();
  if (!analytics) return null;
  const t = analytics.trend;

  return (
    <div>
      <h2>Trend Analytics</h2>
      <StatGrid>
        <StatCard value={`${t.ema_stats.pct_above_ema200.toFixed(1)}%`} label="Days Above EMA200" variant="accent" />
        <StatCard value={`${t.ema_stats.pct_above_ema50.toFixed(1)}%`} label="Days Above EMA50" />
        <StatCard value={`${t.drawdown.max_drawdown.toFixed(1)}%`} label="Max Drawdown" variant="negative" />
        <StatCard value={`${t.drawdown.avg_recovery_days.toFixed(0)}d`} label="Avg Recovery Days" />
      </StatGrid>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card title="Trend Duration (EMA50)">
          <StatGrid columns={2}>
            <StatCard value={`${t.trend_length.avg_above_ema50.toFixed(0)}d`} label="Avg Bull Run" variant="positive" small />
            <StatCard value={`${t.trend_length.max_above_ema50}d`} label="Max Bull Run" variant="positive" small />
            <StatCard value={`${t.trend_length.avg_below_ema50.toFixed(0)}d`} label="Avg Bear Run" variant="negative" small />
            <StatCard value={`${t.trend_length.max_below_ema50}d`} label="Max Bear Run" variant="negative" small />
          </StatGrid>
        </Card>
        <Card title="Consecutive Candle Streaks">
          <StatGrid columns={2}>
            <StatCard value={t.streaks.max_green} label="Max Green Streak" variant="positive" small />
            <StatCard value={t.streaks.max_red} label="Max Red Streak" variant="negative" small />
            <StatCard value={`${t.streaks.after_3_green_avg_ret.toFixed(3)}%`} label="After 3 Green Avg" variant={t.streaks.after_3_green_avg_ret > 0 ? 'positive' : 'negative'} small />
            <StatCard value={`${t.streaks.after_3_red_avg_ret.toFixed(3)}%`} label="After 3 Red Avg" variant={t.streaks.after_3_red_avg_ret > 0 ? 'positive' : 'negative'} small />
          </StatGrid>
        </Card>
      </div>
      <Card title="Drawdown Analysis">
        <StatGrid columns={3}>
          <StatCard value={`${t.drawdown.max_drawdown.toFixed(1)}%`} label="Max Drawdown" variant="negative" small />
          <StatCard value={`${t.drawdown.avg_drawdown.toFixed(1)}%`} label="Avg Drawdown" small />
          <StatCard value={t.drawdown.count_10pct_drawdowns} label="10%+ Drawdowns" small />
        </StatGrid>
      </Card>
    </div>
  );
}
