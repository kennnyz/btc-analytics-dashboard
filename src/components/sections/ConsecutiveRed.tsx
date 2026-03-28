import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { COLORS, FONT_MONO, getColors } from '../shared/charts/theme';

export default function ConsecutiveRed() {
  const { analytics } = useData();
  const crd = analytics?.consecutive_red_days;
  if (!crd || crd.length === 0) return <div>No data.</div>;

  const c = getColors();
  const chartData = crd.map(r => ({
    label: `${r.streak} days`,
    win_1d: r.win_1d ?? 0,
    win_7d: r.win_7d ?? 0,
    count: r.count,
  }));

  return (
    <div>
      <h2>Buy After Red Streak</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '-8px 0 16px', fontFamily: FONT_MONO }}>
        After N consecutive red (negative) days, what is the probability and average return of buying?
        A dip-buying signal framework from 7 years of data.
      </p>

      <Card title="Win Rate After Red Streak">
        <SimpleBar
          data={chartData}
          xKey="label"
          bars={[
            { key: 'win_1d', color: c.accent, name: 'Win % (1d)' },
            { key: 'win_7d', color: c.purple, name: 'Win % (7d)' },
          ]}
          title=""
          height={280}
        />
      </Card>

      <Card title="Full Statistics">
        <DataTable
          columns={[
            { key: 'streak', label: 'Red Days', format: (v: number) => `${v} days` },
            { key: 'count', label: 'Occurrences', align: 'right' as const },
            { key: 'avg_1d', label: 'Avg 1d Return', align: 'right' as const, colorize: true, format: (v: number | null) => v != null ? `${v > 0 ? '+' : ''}${v}%` : '-' },
            { key: 'win_1d', label: 'Win % 1d', align: 'right' as const, format: (v: number | null) => v != null ? `${v}%` : '-' },
            { key: 'avg_7d', label: 'Avg 7d Return', align: 'right' as const, colorize: true, format: (v: number | null) => v != null ? `${v > 0 ? '+' : ''}${v}%` : '-' },
            { key: 'win_7d', label: 'Win % 7d', align: 'right' as const, format: (v: number | null) => v != null ? `${v}%` : '-' },
            { key: 'avg_30d', label: 'Avg 30d Return', align: 'right' as const, colorize: true, format: (v: number | null) => v != null ? `${v > 0 ? '+' : ''}${v}%` : '-' },
            { key: 'win_30d', label: 'Win % 30d', align: 'right' as const, format: (v: number | null) => v != null ? `${v}%` : '-' },
          ]}
          data={crd}
        />
      </Card>
    </div>
  );
}
