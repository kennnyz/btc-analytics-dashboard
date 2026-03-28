import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { COLORS, FONT_MONO } from '../shared/charts/theme';

const fmtPct = (v: number | null) => v != null ? `${v > 0 ? '+' : ''}${v.toFixed(2)}%` : '-';

export default function MacroEvents() {
  const { analytics } = useData();
  const events = analytics?.macro_events;
  if (!events || events.length === 0) return <div>No data.</div>;

  return (
    <div>
      <h2>Macro Events Impact</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '-8px 0 16px', fontFamily: FONT_MONO }}>
        BTC around CPI and NFP releases: week before, event day, week after. Extremes show max intra-period rally/drawdown.
      </p>

      {events.map(evt => (
          <div key={evt.name}>
            <StatGrid>
              <StatCard value={evt.count} label={`${evt.name} Events`} variant="accent" />
              <StatCard value={`${evt.avg_event_range.toFixed(2)}%`} label="Avg Range (Event Day)" />
              <StatCard value={`${evt.avg_wa_return?.toFixed(2) ?? '-'}%`} label="Avg Week After Return" />
              <StatCard value={`${evt.avg_wa_max_rally?.toFixed(2) ?? '-'}%`} label="Avg Max Rally (7d)" variant="positive" />
              <StatCard value={`${evt.avg_wa_max_dd?.toFixed(2) ?? '-'}%`} label="Avg Max DD (7d)" variant="negative" />
              <StatCard value={`${evt.positive_wa_pct?.toFixed(1) ?? '-'}%`} label="Positive Week After %" variant={(evt.positive_wa_pct ?? 0) >= 50 ? 'positive' : 'negative'} />
            </StatGrid>

            <Card title={`${evt.name} Events`}>
              <DataTable
                columns={[
                  { key: 'date', label: 'Date' },
                  { key: 'wb_return', label: '7d Before Return', align: 'right' as const, colorize: true, format: fmtPct },
                  { key: 'wb_max_rally', label: '7d Before Max Rally', align: 'right' as const, format: (v: number | null) => v != null ? `+${v.toFixed(1)}%` : '-' },
                  { key: 'wb_max_dd', label: '7d Before Max Drop', align: 'right' as const, format: (v: number | null) => v != null ? `${v.toFixed(1)}%` : '-' },
                  { key: 'event_range', label: 'Event Day Range', align: 'right' as const, format: (v: number) => `${v?.toFixed(2)}%` },
                  { key: 'event_return', label: 'Event Day Return', align: 'right' as const, colorize: true, format: fmtPct },
                  { key: 'wa_return', label: '7d After Return', align: 'right' as const, colorize: true, format: fmtPct },
                  { key: 'wa_max_rally', label: '7d After Max Rally', align: 'right' as const, format: (v: number | null) => v != null ? `+${v.toFixed(1)}%` : '-' },
                  { key: 'wa_max_dd', label: '7d After Max Drop', align: 'right' as const, format: (v: number | null) => v != null ? `${v.toFixed(1)}%` : '-' },
                ]}
                data={[...evt.meetings].reverse()}
                maxHeight="500px"
              />
            </Card>
          </div>
      ))}
    </div>
  );
}
