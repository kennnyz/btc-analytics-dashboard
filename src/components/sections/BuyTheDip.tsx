import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { COLORS, FONT_MONO, getColors } from '../shared/charts/theme';

export default function BuyTheDip() {
  const { analytics } = useData();
  const dip = analytics?.buy_the_dip;
  if (!dip || dip.length === 0) return <div>No data.</div>;

  const c = getColors();

  const chartData = dip.map(d => ({
    label: `\u2264${d.threshold}%`,
    win_7d: d.win_7d,
    win_30d: d.win_30d,
    win_90d: d.win_90d,
  }));

  const fmtPct = (v: number | null) => v == null ? '-' : `${v > 0 ? '+' : ''}${v.toFixed(2)}%`;
  const fmtWin = (v: number | null) => v == null ? '-' : `${v.toFixed(1)}%`;

  return (
    <div>
      <h2>Buy the Dip</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '-8px 0 16px', fontFamily: FONT_MONO }}>
        Buy when BTC drops X% below EMA(20). Forward returns at 7d/30d/90d. Entries skip 7 days to avoid overlap.
      </p>

      <Card title="Dip Entry Results">
        <DataTable
          columns={[
            { key: 'threshold', label: 'Threshold', format: (v: number) => `\u2264${v}%` },
            { key: 'count', label: 'Count', align: 'right' as const },
            { key: 'avg_7d', label: 'Avg 7d', align: 'right' as const, colorize: true, format: fmtPct },
            { key: 'win_7d', label: 'Win 7d', align: 'right' as const, format: fmtWin },
            { key: 'avg_30d', label: 'Avg 30d', align: 'right' as const, colorize: true, format: fmtPct },
            { key: 'win_30d', label: 'Win 30d', align: 'right' as const, format: fmtWin },
            { key: 'avg_90d', label: 'Avg 90d', align: 'right' as const, colorize: true, format: fmtPct },
            { key: 'win_90d', label: 'Win 90d', align: 'right' as const, format: fmtWin },
          ]}
          data={dip}
        />
      </Card>

      <Card title="Win Rate by Threshold">
        <SimpleBar
          data={chartData}
          xKey="label"
          bars={[
            { key: 'win_7d', color: c.cyan, name: 'Win 7d' },
            { key: 'win_30d', color: c.positive, name: 'Win 30d' },
            { key: 'win_90d', color: c.purple, name: 'Win 90d' },
          ]}
          height={300}
        />
      </Card>
    </div>
  );
}
