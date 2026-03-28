import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { COLORS, FONT_MONO, getColors } from '../shared/charts/theme';

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function MonthlyGrid({ grid }: { grid: Record<string, unknown>[] }) {
  const c = getColors();
  const cellColor = (v: number | null) => {
    if (v == null) return c.textDim;
    if (v > 10) return c.positive;
    if (v > 0) return `color-mix(in srgb, ${c.positive} 60%, ${c.text})`;
    if (v > -10) return `color-mix(in srgb, ${c.negative} 60%, ${c.text})`;
    return c.negative;
  };

  return (
    <div style={{ overflow: 'auto', borderRadius: 6, border: `1px solid ${COLORS.border}` }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px 10px', fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textAlign: 'left', position: 'sticky', top: 0, background: COLORS.cardBg, borderBottom: `1px solid ${COLORS.border}` }}>Year</th>
            {MONTH_LABELS.map(m => (
              <th key={m} style={{ padding: '8px 6px', fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textAlign: 'center', position: 'sticky', top: 0, background: COLORS.cardBg, borderBottom: `1px solid ${COLORS.border}` }}>{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map((row, i) => (
            <tr key={row.year} style={{ background: i % 2 === 0 ? 'transparent' : COLORS.rowAlt }}>
              <td style={{ padding: '6px 10px', fontSize: 12, fontFamily: FONT_MONO, fontWeight: 600, color: COLORS.text, borderBottom: `1px solid ${COLORS.border}` }}>{row.year}</td>
              {MONTH_LABELS.map((_, mi) => {
                const v = row[`m${mi + 1}`] as number | null;
                return (
                  <td key={mi} style={{
                    padding: '6px 6px', fontSize: 12, fontFamily: FONT_MONO,
                    textAlign: 'center', borderBottom: `1px solid ${COLORS.border}`,
                    color: cellColor(v),
                    fontWeight: v != null && Math.abs(v) > 10 ? 700 : 400,
                  }}>
                    {v != null ? `${v > 0 ? '+' : ''}${v.toFixed(1)}%` : '-'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MonthlyBias() {
  const { analytics } = useData();
  if (!analytics?.monthly_open_bias) return <div>No data.</div>;

  const mb = analytics.monthly_open_bias;
  const c = getColors();
  const grid = analytics.monthly_grid;

  return (
    <div>
      <h2>Monthly Open Bias</h2>
      <StatGrid>
        <StatCard value={mb.total_months} label="Total Months" variant="accent" />
        <StatCard value={`${mb.bullish_pct}%`} label="Bullish Months" variant="positive" />
      </StatGrid>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SimpleBar data={mb.by_month} xKey="month" bars={[{ key: 'avg_return' }]} title="Avg Return by Month" colorByValue height={280} />
        </Card>
        <Card>
          <SimpleBar data={mb.by_month} xKey="month" bars={[{ key: 'bullish_pct', color: c.positive }]} title="Bullish % by Month" height={280} />
        </Card>
      </div>

      {grid && grid.length > 0 && (
        <Card title="Monthly Returns by Year">
          <MonthlyGrid grid={grid as unknown as Record<string, unknown>[]} />
        </Card>
      )}
    </div>
  );
}
