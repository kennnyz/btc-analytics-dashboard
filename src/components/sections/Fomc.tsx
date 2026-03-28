import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { COLORS, FONT_MONO } from '../shared/charts/theme';

const fmtPct = (v: number | null) => v != null ? `${v > 0 ? '+' : ''}${v.toFixed(2)}%` : '-';

export default function Fomc() {
  const { analytics } = useData();
  if (!analytics) return null;
  const f = analytics.fomc;
  const meetings = f.meetings ?? [];

  return (
    <div>
      <h2>FOMC Impact</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '-8px 0 16px', fontFamily: FONT_MONO }}>
        BTC price behavior around FOMC meetings: week before, event day, and week after. Extremes show max rally/drawdown within each window.
      </p>
      <StatGrid>
        <StatCard value={`${f.fomc_avg_range.toFixed(2)}%`} label="FOMC Day Avg Range" variant="accent" />
        <StatCard value={`${f.normal_avg_range.toFixed(2)}%`} label="Normal Day Avg Range" />
        <StatCard value={`${f.avg_wb_return ?? '-'}%`} label="Avg Week Before Return" />
        <StatCard value={`${f.avg_wa_return ?? '-'}%`} label="Avg Week After Return" />
        <StatCard value={`${f.avg_wa_max_rally ?? '-'}%`} label="Avg Max Rally (7d after)" variant="positive" />
        <StatCard value={`${f.avg_wa_max_dd ?? '-'}%`} label="Avg Max Drawdown (7d after)" variant="negative" />
      </StatGrid>

      {meetings.length > 0 && (
        <Card title="FOMC Meeting Results">
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
            data={meetings.slice().reverse()}
            maxHeight="600px"
          />
        </Card>
      )}
    </div>
  );
}
