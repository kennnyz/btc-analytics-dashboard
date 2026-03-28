import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { DataTable } from '../shared/DataTable';
import { COLORS, FONT_MONO } from '../shared/charts/theme';

export default function Liquidity() {
  const { analytics } = useData();
  if (!analytics) return null;

  const anyData = analytics as unknown as Record<string, unknown>;

  const le = anyData.liquidity_enriched as {
    total_ssl_sweeps: number;
    returns: Record<string, { avg: number; median: number; positive_pct: number }>;
    avg_max_rally_24h: number; avg_max_dd_24h: number;
    median_max_rally_24h: number; median_max_dd_24h: number;
    session_breakdown: { session: string; count: number; avg_1H: number; avg_4H: number; avg_24H: number; positive_1H: number; positive_4H: number; positive_24H: number; avg_max_rally: number; avg_max_dd: number }[];
  } | undefined;

  type EnrichedLT = { level_type: string; side: string; count: number; reversal_rate: number; avg_depth: number; avg_1h: number; win_1h: number; avg_4h: number; win_4h: number; avg_12h: number; win_12h: number; avg_24h: number; win_24h: number; avg_max_rally_24h: number; avg_max_dd_24h: number };
  const lte = anyData.level_types_enriched as EnrichedLT[] | undefined;

  return (
    <div>
      <h2>Liquidity Levels</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '-8px 0 16px', fontFamily: FONT_MONO }}>
        Reversal = price moved &gt;1% in opposite direction within 24h after sweep.
        Returns = close-to-close at each timeframe. Max Rally/Drop = extreme high/low within 24h.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card><SimpleBar data={analytics.level_types} xKey="level_type" bars={[{ key: 'reversal_rate', color: COLORS.positive }]} title="Reversal Rate by Level Type %" /></Card>
        <Card><SimpleBar data={analytics.level_types} xKey="level_type" bars={[{ key: 'avg_4h_return' }]} title="Avg 4H Return by Level" colorByValue /></Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card><SimpleBar data={analytics.depth_buckets} xKey="bucket" bars={[{ key: 'reversal_rate', color: COLORS.accent }]} title="Reversal Rate by Sweep Depth" /></Card>
        <Card><SimpleBar data={analytics.depth_buckets} xKey="bucket" bars={[{ key: 'avg_return_4H' }]} title="Avg 4H Return by Sweep Depth" colorByValue /></Card>
      </div>

      <Card title="Level Types Details">
        <DataTable columns={[
          { key: 'level_type', label: 'Level' },
          { key: 'side', label: 'Side' },
          { key: 'count', label: 'Count', align: 'right' as const },
          { key: 'reversal_rate', label: 'Reversal Rate', align: 'right' as const, format: (v: number) => `${v.toFixed(1)}%` },
          ...(lte ? [
            { key: 'avg_1h', label: 'Avg 1H', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(3)}%` },
            { key: 'avg_4h', label: 'Avg 4H', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(3)}%` },
            { key: 'avg_24h', label: 'Avg 24H', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(3)}%` },
            { key: 'win_4h', label: 'Win % 4H', align: 'right' as const, format: (v: number) => `${v}%` },
            { key: 'avg_max_rally_24h', label: 'Max Rally 24h', align: 'right' as const, format: (v: number) => `+${v.toFixed(2)}%` },
            { key: 'avg_max_dd_24h', label: 'Max Drop 24h', align: 'right' as const, format: (v: number) => `${v.toFixed(2)}%` },
          ] : [
            { key: 'avg_4h_return', label: '4H Return', align: 'right' as const, colorize: true, format: (v: number) => `${v.toFixed(3)}%` },
          ]),
          { key: 'avg_depth', label: 'Sweep Depth', align: 'right' as const, format: (v: number) => `${v.toFixed(2)}%` },
        ]} data={lte ?? analytics.level_types} />
      </Card>

      {le && (
        <>
          <Card title="SSL Sweep — Post-Sweep Returns (all timeframes)">
            <StatGrid>
              <StatCard value={le.total_ssl_sweeps} label="Total SSL Sweeps" variant="accent" />
              <StatCard value={`+${le.avg_max_rally_24h}%`} label="Avg Max Rally (24h)" variant="positive" />
              <StatCard value={`${le.avg_max_dd_24h}%`} label="Avg Max Drop (24h)" variant="negative" />
            </StatGrid>
            <DataTable columns={[
              { key: 'tf', label: 'Timeframe' },
              { key: 'avg', label: 'Avg Return', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(3)}%` },
              { key: 'median', label: 'Median Return', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(3)}%` },
              { key: 'positive_pct', label: 'Positive %', align: 'right' as const, format: (v: number) => `${v}%` },
            ]} data={Object.entries(le.returns).map(([tf, d]) => ({ tf, ...d }))} />
          </Card>

          <Card title="SSL Sweep — Post-Sweep by Session">
            <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '0 0 12px', fontFamily: FONT_MONO }}>
              Which trading session gives the best bounce after an SSL sweep?
            </p>
            <DataTable columns={[
              { key: 'session', label: 'Session' },
              { key: 'count', label: 'Sweeps', align: 'right' as const },
              { key: 'avg_1H', label: 'Avg 1H', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(3)}%` },
              { key: 'positive_1H', label: 'Win 1H', align: 'right' as const, format: (v: number) => `${v}%` },
              { key: 'avg_4H', label: 'Avg 4H', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(3)}%` },
              { key: 'positive_4H', label: 'Win 4H', align: 'right' as const, format: (v: number) => `${v}%` },
              { key: 'avg_24H', label: 'Avg 24H', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(3)}%` },
              { key: 'positive_24H', label: 'Win 24H', align: 'right' as const, format: (v: number) => `${v}%` },
              { key: 'avg_max_rally', label: 'Max Rally 24h', align: 'right' as const, format: (v: number) => `+${v.toFixed(2)}%` },
              { key: 'avg_max_dd', label: 'Max Drop 24h', align: 'right' as const, format: (v: number) => `${v.toFixed(2)}%` },
            ]} data={le.session_breakdown} />
          </Card>
        </>
      )}
    </div>
  );
}
