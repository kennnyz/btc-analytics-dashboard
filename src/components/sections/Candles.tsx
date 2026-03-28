import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { COLORS } from '../shared/charts/theme';

export default function Candles() {
  const { analytics } = useData();
  if (!analytics) return null;
  const c = analytics.candle_structure;

  return (
    <div>
      <h2>Candle Structure</h2>
      <StatGrid>
        <StatCard value={c.engulfing.bullish_count} label="Bullish Engulfing" variant="positive" />
        <StatCard value={c.engulfing.bearish_count} label="Bearish Engulfing" variant="negative" />
        <StatCard value={c.hammer_star.hammer_count} label="Hammers" />
        <StatCard value={`${c.gaps.gap_fill_rate.toFixed(1)}%`} label="Gap Fill Rate" variant="accent" />
      </StatGrid>
      <Card><SimpleBar data={c.wick_by_session} xKey="session" bars={[
        { key: 'avg_upper_wick', color: COLORS.negative, name: 'Upper Wick %' },
        { key: 'avg_lower_wick', color: COLORS.positive, name: 'Lower Wick %' },
      ]} title="Avg Wick Size by Session" /></Card>
      <Card title="Pattern Performance">
        <StatGrid columns={4}>
          <StatCard value={`${c.engulfing.bullish_avg_4h.toFixed(3)}%`} label="Bullish Eng 4H Ret" variant={c.engulfing.bullish_avg_4h > 0 ? 'positive' : 'negative'} small />
          <StatCard value={`${c.engulfing.bearish_avg_4h.toFixed(3)}%`} label="Bearish Eng 4H Ret" variant={c.engulfing.bearish_avg_4h > 0 ? 'positive' : 'negative'} small />
          <StatCard value={`${c.hammer_star.hammer_avg_4h_ret.toFixed(3)}%`} label="Hammer 4H Ret" variant={c.hammer_star.hammer_avg_4h_ret > 0 ? 'positive' : 'negative'} small />
          <StatCard value={`${c.gaps.avg_gap_pct.toFixed(3)}%`} label="Avg Monday Gap" small />
        </StatGrid>
      </Card>
    </div>
  );
}
