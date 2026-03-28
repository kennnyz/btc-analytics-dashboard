import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { Heatmap } from '../shared/charts/Heatmap';
import { COLORS, FONT_MONO, getColors, getAxisStyle, getGridStyle, getTooltipStyle } from '../shared/charts/theme';

export default function SessionPlaybook() {
  const { analytics } = useData();

  const c = getColors();
  const axis = getAxisStyle();
  const grid = getGridStyle();
  const tip = getTooltipStyle();

  const kz = analytics?.kill_zones;
  const topTimes = useMemo(() => new Set(kz?.top_5.map(t => t.time) ?? []), [kz?.top_5]);
  const chartData = useMemo(
    () => kz?.windows.map(w => ({ ...w, isTop: topTimes.has(w.time) })) ?? [],
    [kz?.windows, topTimes],
  );

  if (!analytics) return null;

  const s = analytics.session_dive;
  const d = analytics.dow_session;

  return (
    <div>
      <h2>Session Playbook</h2>
      <p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: -8, marginBottom: 16 }}>
        Comprehensive session analysis: ranges, breakouts, kill zones, and day-of-week patterns.
      </p>

      {/* 1. Session Overview */}
      <Card title="Session Overview">
        <StatGrid>
          <StatCard value={`${s.asia_range.avg_range_pct.toFixed(2)}%`} label="Asia Range (avg)" variant="accent" />
          <StatCard value={`${s.asia_range.london_break_high_pct.toFixed(1)}%`} label="London Breaks Asia High" variant="positive" />
          <StatCard value={`${s.asia_range.london_break_low_pct.toFixed(1)}%`} label="London Breaks Asia Low" variant="negative" />
          <StatCard value={`${s.london_open_predict.correct_pct.toFixed(1)}%`} label="London Predicts Day" />
        </StatGrid>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <SimpleBar data={analytics.sessions} xKey="session" bars={[{ key: 'count', color: COLORS.accent }]} title="Sweep Count by Session" />
          <SimpleBar data={analytics.sessions} xKey="session" bars={[{ key: 'reversal_rate', color: COLORS.positive }]} title="Reversal Rate by Session %" />
        </div>
        <SimpleBar data={analytics.sessions} xKey="session" bars={[{ key: 'avg_4h_return' }]} title="Avg 4H Return by Session" colorByValue yLabel="%" />
      </Card>

      {/* 2. Session Details */}
      <Card title="Session Details">
        <DataTable columns={[
          { key: 'session', label: 'Session' },
          { key: 'count', label: 'Sweeps', align: 'right' },
          { key: 'reversal_rate', label: 'Rev. Rate', align: 'right', format: (v: number) => `${v.toFixed(1)}%` },
          { key: 'avg_4h_return', label: 'Avg 4H Return', align: 'right', colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
          { key: 'avg_depth', label: 'Avg Depth', align: 'right', format: (v: number) => `${v.toFixed(2)}%` },
        ]} data={analytics.sessions} />
      </Card>

      {/* 3. Kill Zones */}
      {kz && (
        <Card title="Kill Zones">
          <StatGrid>
            {kz.top_5.map(t => (
              <StatCard key={t.time} value={`${t.avg_move.toFixed(3)}%`} label={t.time} variant="accent" />
            ))}
          </StatGrid>
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
      )}

      {/* 4. Day x Session Heatmap */}
      <Card title="Day x Session Heatmap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <Heatmap data={d.reversal_heatmap.values} rowLabels={d.reversal_heatmap.rows} colLabels={d.reversal_heatmap.cols} title="Reversal Rate %" format={v => `${v.toFixed(0)}%`} />
          <Heatmap data={d.return_heatmap.values} rowLabels={d.return_heatmap.rows} colLabels={d.return_heatmap.cols} title="Avg 4H Return %" format={v => `${v.toFixed(2)}%`} />
        </div>
        <StatGrid columns={4}>
          <StatCard value={`${d.best_worst.best_reversal.day} ${d.best_worst.best_reversal.session}`} label={`Best Rev: ${d.best_worst.best_reversal.value.toFixed(1)}%`} variant="positive" small />
          <StatCard value={`${d.best_worst.worst_reversal.day} ${d.best_worst.worst_reversal.session}`} label={`Worst Rev: ${d.best_worst.worst_reversal.value.toFixed(1)}%`} variant="negative" small />
          <StatCard value={`${d.best_worst.best_return.day} ${d.best_worst.best_return.session}`} label={`Best Ret: ${d.best_worst.best_return.value.toFixed(3)}%`} variant="positive" small />
          <StatCard value={`${d.best_worst.worst_return.day} ${d.best_worst.worst_return.session}`} label={`Worst Ret: ${d.best_worst.worst_return.value.toFixed(3)}%`} variant="negative" small />
        </StatGrid>
      </Card>

      {/* 5. Session Deep Dive */}
      <Card title="Session Deep Dive">
        <StatGrid columns={2}>
          <StatCard value={`${s.overlap.overlap_avg_range.toFixed(2)}%`} label="Overlap Avg Range" small />
          <StatCard value={`${s.overlap.rest_avg_range.toFixed(2)}%`} label="Non-Overlap Avg Range" small />
        </StatGrid>
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 8 }}>Opening Range Breakout (ORB)</div>
          <DataTable columns={[
            { key: 'session', label: 'Session' },
            { key: 'total', label: 'Days', align: 'right' },
            { key: 'break_up_pct', label: 'Break Up %', align: 'right', format: (v: number) => `${v.toFixed(1)}%` },
            { key: 'break_down_pct', label: 'Break Down %', align: 'right', format: (v: number) => `${v.toFixed(1)}%` },
          ]} data={s.orb} />
        </div>
      </Card>
    </div>
  );
}
