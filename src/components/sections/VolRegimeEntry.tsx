import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { COLORS, FONT_MONO } from '../shared/charts/theme';

export default function VolRegimeEntry() {
  const { analytics } = useData();
  const vr = analytics?.vol_regime_entry;
  if (!vr) return <div>No data.</div>;

  return (
    <div>
      <h2>Post-Squeeze Direction</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '-8px 0 16px', fontFamily: FONT_MONO }}>
        After a Bollinger Band squeeze ends, does BTC break up or down? Based on BB width falling below 20th percentile.
      </p>

      <StatGrid>
        <StatCard value={vr.total_squeezes} label="Total Squeezes" variant="accent" />
        <StatCard value={`${vr.bullish_pct.toFixed(1)}%`} label="Bullish Breakout" variant="positive" />
        <StatCard value={`${vr.bearish_pct.toFixed(1)}%`} label="Bearish Breakout" variant="negative" />
        <StatCard value={`${vr.avg_bull_return_5d > 0 ? '+' : ''}${vr.avg_bull_return_5d.toFixed(2)}%`} label="Avg Bull 5d Return" variant="positive" />
        <StatCard value={`${vr.avg_bear_return_5d > 0 ? '+' : ''}${vr.avg_bear_return_5d.toFixed(2)}%`} label="Avg Bear 5d Return" variant="negative" />
      </StatGrid>
    </div>
  );
}
