import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { COLORS, FONT_MONO, getColors, getAxisStyle, getGridStyle, getTooltipStyle } from '../shared/charts/theme';

export default function ReturnDist() {
  const { analytics } = useData();
  const rd = analytics?.return_distribution;
  if (!rd) return <div>No data.</div>;

  const c = getColors();
  const axis = getAxisStyle();
  const grid = getGridStyle();
  const tip = getTooltipStyle();
  const s = rd.stats;

  return (
    <div>
      <h2>Return Distribution</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '-8px 0 16px', fontFamily: FONT_MONO }}>
        Daily return distribution over 7 years. Fat tails = extreme moves happen more often than normal distribution predicts.
      </p>

      <StatGrid>
        <StatCard value={`${s.mean.toFixed(3)}%`} label="Mean" variant={s.mean >= 0 ? 'positive' : 'negative'} />
        <StatCard value={`${s.std.toFixed(3)}%`} label="Std Dev" />
        <StatCard value={s.skewness.toFixed(3)} label="Skewness" />
        <StatCard value={s.kurtosis.toFixed(2)} label="Kurtosis" />
        <StatCard value={`${s.var_95.toFixed(2)}%`} label="VaR 95%" variant="negative" />
        <StatCard value={`${s.var_99.toFixed(2)}%`} label="VaR 99%" variant="negative" />
        <StatCard value={`${s.cvar_95.toFixed(2)}%`} label="CVaR 95%" variant="negative" />
      </StatGrid>

      <Card title="Distribution">
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={rd.histogram} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid {...grid} />
            <XAxis dataKey="bin" {...axis} tickFormatter={(v: number) => `${v}%`} />
            <YAxis {...axis} />
            <Tooltip
              {...tip}
              formatter={(v) => [v, 'Days']}
              labelFormatter={(l) => `${l}%`}
            />
            <Bar dataKey="count" name="Days" radius={[2, 2, 0, 0]}>
              {rd.histogram.map((entry, i) => (
                <Cell key={i} fill={entry.bin >= 0 ? c.positive : c.negative} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
