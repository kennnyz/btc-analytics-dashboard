import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, Brush,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { COLORS, FONT_MONO, getColors, getAxisStyle, getGridStyle, getTooltipStyle } from '../shared/charts/theme';

function FillTimeDistribution({ data }: { data: { window: string; filled_pct: number }[] }) {
  const c = getColors();
  const axis = getAxisStyle();
  const grid = getGridStyle();
  const tip = getTooltipStyle();

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <CartesianGrid {...grid} />
        <XAxis dataKey="window" {...axis} />
        <YAxis {...axis} domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} />
        <Tooltip
          {...tip}
          formatter={(v) => [`${v}%`, 'Cumulative Fill Rate']}
        />
        <Bar dataKey="filled_pct" name="Filled %" radius={[2, 2, 0, 0]} fill={c.accent}>
          {data.map((_, i) => (
            <Cell key={i} fill={c.accent} opacity={0.6 + (i / data.length) * 0.4} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function PercentileTable({ percentiles }: { percentiles: Record<string, number> }) {
  const rows = Object.entries(percentiles).map(([key, hours]) => {
    const days = hours / 24;
    return {
      percentile: key.toUpperCase(),
      hours: `${hours}h`,
      days: days < 1 ? `${Math.round(hours * 60)}m` : `${days.toFixed(1)}d`,
    };
  });

  return (
    <DataTable
      columns={[
        { key: 'percentile', label: 'Percentile' },
        { key: 'hours', label: 'Hours', align: 'right' as const },
        { key: 'days', label: 'Days', align: 'right' as const },
      ]}
      data={rows}
    />
  );
}

export default function CmeGap() {
  const { analytics } = useData();
  if (!analytics?.cme_gap) return <div>No data.</div>;

  const cg = analytics.cme_gap;
  const c = getColors();
  const axis = getAxisStyle();
  const grid = getGridStyle();
  const tip = getTooltipStyle();

  const hasPercentiles = cg.fill_time_percentiles && Object.keys(cg.fill_time_percentiles).length > 0;
  const hasDistribution = cg.fill_time_distribution && cg.fill_time_distribution.length > 0;

  return (
    <div>
      <h2>CME Gap Analysis</h2>
      <StatGrid>
        <StatCard value={cg.total_gaps} label="Total Gaps" variant="accent" />
        <StatCard value={`${cg.avg_gap_pct.toFixed(3)}%`} label="Avg Gap Size" />
        <StatCard value={`${cg.gap_fill_rate}%`} label="Gap Fill Rate (30d)" variant="positive" />
        <StatCard value={`${cg.never_filled_pct}%`} label="Never Filled (30d)" variant="negative" />
        <StatCard value={`${cg.avg_fill_hours}h`} label="Avg Fill Time" />
        {hasPercentiles && (
          <StatCard value={`${cg.fill_time_percentiles.p50}h`} label="Median Fill Time (P50)" />
        )}
      </StatGrid>

      {hasDistribution && (
        <Card title="Cumulative Fill Time Distribution">
          <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '0 0 12px', fontFamily: FONT_MONO }}>
            % of all gaps filled within each time window
          </p>
          <FillTimeDistribution data={cg.fill_time_distribution} />
          <DataTable
            columns={[
              { key: 'window', label: 'Window' },
              { key: 'filled_count', label: 'Gaps Filled', align: 'right' as const },
              { key: 'filled_pct', label: 'Cumulative %', align: 'right' as const, format: (v: number) => `${v}%` },
            ]}
            data={cg.fill_time_distribution}
          />
        </Card>
      )}

      {hasPercentiles && (
        <Card title="Fill Time Percentiles (filled gaps only)">
          <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '0 0 12px', fontFamily: FONT_MONO }}>
            How quickly filled gaps close — e.g. P80 = 80% of filled gaps closed within this time
          </p>
          <PercentileTable percentiles={cg.fill_time_percentiles as unknown as Record<string, number>} />
        </Card>
      )}

      {cg.size_analysis && cg.size_analysis.length > 0 && (
        <Card title="Gap Size vs Fill Behavior">
          <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '0 0 12px', fontFamily: FONT_MONO }}>
            Larger gaps take longer to fill and are less likely to close at all
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 16 }}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={cg.size_analysis} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid {...grid} />
                <XAxis dataKey="bucket" {...axis} />
                <YAxis {...axis} domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} />
                <Tooltip {...tip} />
                <Bar dataKey="fill_rate" name="Fill Rate (30d)" fill={c.accent} radius={[2, 2, 0, 0]} />
                <Bar dataKey="monday_fill_pct" name="Monday Fill (<8h)" fill={c.cyan} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={cg.size_analysis} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid {...grid} />
                <XAxis dataKey="bucket" {...axis} />
                <YAxis {...axis} tickFormatter={(v: number) => v < 24 ? `${v}h` : `${(v/24).toFixed(0)}d`} />
                <Tooltip {...tip} formatter={(v) => [Number(v) < 24 ? `${v}h` : `${(Number(v)/24).toFixed(1)}d`, 'Median Fill Time']} />
                <Bar dataKey="median_fill_hours" name="Median Fill Time" fill={c.purple} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <DataTable
            columns={[
              { key: 'bucket', label: 'Gap Size' },
              { key: 'count', label: 'Count', align: 'right' as const },
              { key: 'fill_rate', label: 'Fill Rate (30d)', align: 'right' as const, format: (v: number) => `${v}%` },
              { key: 'monday_fill_pct', label: 'Monday Fill (<8h)', align: 'right' as const, format: (v: number) => `${v}%` },
              { key: 'median_fill_hours', label: 'Median Fill Time', align: 'right' as const, format: (v: number) => {
                if (v <= 0) return '-';
                if (v < 24) return `${v}h`;
                return `${(v / 24).toFixed(1)}d`;
              }},
            ]}
            data={cg.size_analysis}
          />
        </Card>
      )}

      {cg.direction_analysis && (
        <Card title="Gap Direction: UP vs DOWN">
          <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '0 0 12px', fontFamily: FONT_MONO }}>
            Does the direction of the gap (Sunday higher or lower than Friday) affect fill probability?
          </p>
          <DataTable
            columns={[
              { key: 'label', label: 'Direction' },
              { key: 'count', label: 'Count', align: 'right' as const },
              { key: 'fill_rate', label: 'Fill Rate (30d)', align: 'right' as const, format: (v: number) => `${v}%` },
              { key: 'monday_fill_pct', label: 'Monday Fill (<8h)', align: 'right' as const, format: (v: number) => `${v}%` },
              { key: 'median_fill_hours', label: 'Median Fill Time', align: 'right' as const, format: (v: number) => {
                if (v <= 0) return '-';
                if (v < 24) return `${v}h`;
                return `${(v / 24).toFixed(1)}d`;
              }},
              { key: 'avg_gap_pct', label: 'Avg Size', align: 'right' as const, format: (v: number) => `${v}%` },
            ]}
            data={[cg.direction_analysis.up, cg.direction_analysis.down]}
          />
        </Card>
      )}

      {cg.correlations && (
        <Card title="Correlations">
          <StatGrid>
            <StatCard
              value={cg.correlations.size_vs_fill_time.toFixed(3)}
              label="Size vs Fill Time (Pearson)"
              variant={cg.correlations.size_vs_fill_time > 0.3 ? 'accent' : 'default'}
              small
            />
            <StatCard
              value={cg.correlations.size_vs_filled.toFixed(3)}
              label="Size vs Filled (Pearson)"
              variant={cg.correlations.size_vs_filled < -0.2 ? 'negative' : 'default'}
              small
            />
          </StatGrid>
          <p style={{ fontSize: 11, color: COLORS.textMuted, margin: '8px 0 0', fontFamily: FONT_MONO }}>
            Positive size-vs-time = bigger gaps take longer. Negative size-vs-filled = bigger gaps less likely to fill.
          </p>
        </Card>
      )}

      <Card title="Gap Size Over Time">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={cg.gaps} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid {...grid} />
            <XAxis dataKey="date" {...axis} interval="preserveStartEnd" />
            <YAxis {...axis} />
            <Tooltip {...tip} />
            <Bar dataKey="gap_pct" name="Gap %" radius={[2, 2, 0, 0]}>
              {cg.gaps.map((entry, i) => (
                <Cell key={i} fill={entry.gap_pct >= 0 ? c.positive : c.negative} />
              ))}
            </Bar>
            {cg.gaps.length > 50 && (
              <Brush dataKey="date" height={25} stroke={c.borderLight} fill={c.cardBg} travellerWidth={8} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Gap Details">
        <DataTable
          columns={[
            { key: 'date', label: 'Date' },
            { key: 'friday_close', label: 'Fri Close', align: 'right' as const, format: (v: number) => `$${v?.toLocaleString()}` },
            { key: 'sunday_open', label: 'Sun Open', align: 'right' as const, format: (v: number) => `$${v?.toLocaleString()}` },
            { key: 'gap_pct', label: 'Gap %', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v?.toFixed(3)}%` },
            { key: 'filled', label: 'Filled', format: (v: boolean) => v ? 'Yes' : 'No' },
            { key: 'fill_hours', label: 'Fill Time', align: 'right' as const, format: (v: number) => {
              if (v <= 0) return '-';
              if (v < 24) return `${v}h`;
              return `${(v / 24).toFixed(1)}d`;
            }},
          ]}
          data={cg.gaps.slice().reverse()}
          maxHeight="500px"
        />
      </Card>
    </div>
  );
}
