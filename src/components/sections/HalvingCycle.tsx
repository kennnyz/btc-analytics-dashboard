import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { getColors, getAxisStyle, getGridStyle, getTooltipStyle } from '../shared/charts/theme';

export default function HalvingCycle() {
  const { analytics } = useData();
  if (!analytics?.halving_cycle) return <div>No data.</div>;

  const hc = analytics.halving_cycle;
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
    </div>
  );
}
