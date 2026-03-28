import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { COLORS, FONT_MONO, getColors, getAxisStyle, getGridStyle, getTooltipStyle } from '../shared/charts/theme';

const MILESTONES = ['d30','d60','d90','d180','d270','d365','d540','d730'];
const MILESTONE_LABELS: Record<string, string> = { d30:'30d', d60:'60d', d90:'90d', d180:'180d', d270:'270d', d365:'1Y', d540:'1.5Y', d730:'2Y' };

export default function HalvingCycle() {
  const { analytics } = useData();
  if (!analytics?.halving_cycle) return <div>No data.</div>;

  const hc = analytics.halving_cycle;
  const cc = analytics.cycle_comparison;
  const c = getColors();
  const axis = getAxisStyle();
  const grid = getGridStyle();
  const tip = getTooltipStyle();

  return (
    <div>
      <h2>Halving Cycle</h2>
      <StatGrid>
        <StatCard value={hc.current_days_since_halving} label="Days Since Last Halving" variant="accent" />
        <StatCard value={hc.halvings.length} label="Halvings in Data" />
      </StatGrid>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card title="Halving Events">
          <DataTable
            columns={[
              { key: 'date', label: 'Date' },
              { key: 'price_at_halving', label: 'Price', align: 'right', format: (v: number) => `$${v?.toLocaleString()}` },
              { key: 'return_30d', label: '30d %', align: 'right', colorize: true, format: (v: number | null) => v != null ? `${v > 0 ? '+' : ''}${v}%` : '-' },
              { key: 'return_90d', label: '90d %', align: 'right', colorize: true, format: (v: number | null) => v != null ? `${v > 0 ? '+' : ''}${v}%` : '-' },
              { key: 'return_180d', label: '180d %', align: 'right', colorize: true, format: (v: number | null) => v != null ? `${v > 0 ? '+' : ''}${v}%` : '-' },
              { key: 'return_365d', label: '365d %', align: 'right', colorize: true, format: (v: number | null) => v != null ? `${v > 0 ? '+' : ''}${v}%` : '-' },
            ]}
            data={hc.halvings}
            maxHeight="300px"
          />
        </Card>

        <Card title="Avg Return by Days Since Halving">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={hc.cycle_returns} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <defs>
                <linearGradient id="halvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c.accent} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={c.accent} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid {...grid} />
              <XAxis dataKey="days_since" {...axis} />
              <YAxis {...axis} />
              <Tooltip {...tip} />
              <Area type="monotone" dataKey="avg_return" stroke={c.accent} strokeWidth={2} fill="url(#halvGrad)" name="Avg Return %" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {cc && cc.length > 0 && (
        <Card title="Cycle Comparison: Current vs Past Halvings">
          <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '0 0 12px', fontFamily: FONT_MONO }}>
            Return from halving price at each milestone. Last row = average of halvings 1-3.
          </p>
          <div style={{ overflow: 'auto', borderRadius: 6, border: `1px solid ${COLORS.border}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '8px 10px', fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textAlign: 'left', position: 'sticky', top: 0, background: COLORS.cardBg, borderBottom: `1px solid ${COLORS.border}` }}>Cycle</th>
                  <th style={{ padding: '8px 10px', fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textAlign: 'right', position: 'sticky', top: 0, background: COLORS.cardBg, borderBottom: `1px solid ${COLORS.border}` }}>Price</th>
                  {MILESTONES.map(m => (
                    <th key={m} style={{ padding: '8px 6px', fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textAlign: 'center', position: 'sticky', top: 0, background: COLORS.cardBg, borderBottom: `1px solid ${COLORS.border}` }}>{MILESTONE_LABELS[m]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cc.map((row, i) => {
                  const isAvg = row.name.startsWith('Avg');
                  return (
                    <tr key={i} style={{ background: isAvg ? 'rgba(88,166,255,0.06)' : i % 2 === 0 ? 'transparent' : COLORS.rowAlt }}>
                      <td style={{ padding: '6px 10px', fontSize: 12, fontFamily: FONT_MONO, fontWeight: isAvg ? 700 : 400, color: COLORS.text, borderBottom: `1px solid ${COLORS.border}` }}>{row.name}</td>
                      <td style={{ padding: '6px 10px', fontSize: 12, fontFamily: FONT_MONO, textAlign: 'right', color: COLORS.textMuted, borderBottom: `1px solid ${COLORS.border}` }}>{row.price != null ? `$${row.price.toLocaleString()}` : '-'}</td>
                      {MILESTONES.map(m => {
                        const v = (row as unknown as Record<string, unknown>)[m] as number | null;
                        const color = v == null ? COLORS.textDim : v > 0 ? c.positive : c.negative;
                        return (
                          <td key={m} style={{ padding: '6px 6px', fontSize: 12, fontFamily: FONT_MONO, textAlign: 'center', color, fontWeight: isAvg ? 700 : 400, borderBottom: `1px solid ${COLORS.border}` }}>
                            {v != null ? `${v > 0 ? '+' : ''}${v}%` : '-'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
