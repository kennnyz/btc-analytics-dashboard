import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { FONT_MONO, getColors, getAxisStyle, getGridStyle, getTooltipStyle } from '../shared/charts/theme';

export default function KillZones() {
  const { analytics } = useData();
  if (!analytics?.kill_zones) return <div>No data.</div>;

  const kz = analytics.kill_zones;
  const c = getColors();
  const axis = getAxisStyle();
  const grid = getGridStyle();
  const tip = getTooltipStyle();

  const topTimes = useMemo(() => new Set(kz.top_5.map(t => t.time)), [kz.top_5]);

  const chartData = useMemo(() =>
    kz.windows.map(w => ({ ...w, isTop: topTimes.has(w.time) })),
    [kz.windows, topTimes],
  );

  return (
    <div>
      <h2>Kill Zones</h2>
      <StatGrid>
        {kz.top_5.map(t => (
          <StatCard key={t.time} value={`${t.avg_move.toFixed(3)}%`} label={t.time} variant="accent" />
        ))}
      </StatGrid>
      <Card title="Avg Move by 30-min Window">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 50, left: 5 }}>
            <CartesianGrid {...grid} />
            <XAxis dataKey="time" {...axis} angle={-90} textAnchor="end" interval={1} height={70} />
            <YAxis {...axis} label={{ value: '%', angle: -90, position: 'insideLeft', fill: c.textMuted, fontSize: 11, fontFamily: FONT_MONO }} />
            <Tooltip {...tip} />
            <Bar dataKey="avg_move" name="Avg Move %" radius={[2, 2, 0, 0]}>
              {chartData.map((entry, idx) => (
                <Cell key={idx} fill={entry.isTop ? c.accent : c.textDim} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
