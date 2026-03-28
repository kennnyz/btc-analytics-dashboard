import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { COLORS, FONT_MONO } from '../shared/charts/theme';

export default function DcaOptimizer() {
  const { analytics } = useData();
  const dca = analytics?.dca_optimizer;
  if (!dca) return <div>No data.</div>;

  return (
    <div>
      <h2>DCA Timing Optimizer</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '-8px 0 16px', fontFamily: FONT_MONO }}>
        Historical best time to place buy orders. "Avg low from open" = how much discount you get on average
        if you place a limit order at the intraday low instead of market-buying at open.
      </p>

      <Card title="Best Day of Week to Buy">
        <SimpleBar data={dca.by_dow} xKey="day" bars={[{ key: 'avg_low_from_open', name: 'Avg Discount from Open %' }]} colorByValue height={280} />
        <DataTable
          columns={[
            { key: 'day', label: 'Day' },
            { key: 'avg_return', label: 'Avg Day Return', align: 'right' as const, colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(3)}%` },
            { key: 'avg_low_from_open', label: 'Avg Low from Open', align: 'right' as const, format: (v: number) => `${v.toFixed(3)}%` },
            { key: 'positive_pct', label: 'Positive Days %', align: 'right' as const, format: (v: number) => `${v}%` },
          ]}
          data={dca.by_dow}
        />
      </Card>

      <Card title="Best Hour to Buy (UTC)">
        <SimpleBar
          data={dca.by_hour.map(h => ({ ...h, label: `${h.hour}:00` }))}
          xKey="label"
          bars={[{ key: 'avg_low_from_open', name: 'Avg Discount from Open %' }]}
          colorByValue
          height={300}
        />
      </Card>
    </div>
  );
}
