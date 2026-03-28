import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { DataTable } from '../shared/DataTable';

export default function AsianRange() {
  const { analytics } = useData();
  if (!analytics?.asian_range_amd) return <div>No data.</div>;

  const ar = analytics.asian_range_amd;

  return (
    <div>
      <h2>Asian Range AMD</h2>
      <StatGrid>
        <StatCard value={ar.total_days} label="Total Days" variant="accent" />
        <StatCard value={`${ar.london_break_high_pct}%`} label="London Break High" variant="positive" />
        <StatCard value={`${ar.london_break_low_pct}%`} label="London Break Low" variant="negative" />
        <StatCard value={`${ar.ny_break_high_pct}%`} label="NY Break High" variant="positive" />
        <StatCard value={`${ar.ny_break_low_pct}%`} label="NY Break Low" variant="negative" />
        <StatCard value={`${ar.amd_up_pct}%`} label="Day Up" variant="positive" />
        <StatCard value={`${ar.amd_down_pct}%`} label="Day Down" variant="negative" />
        <StatCard value={`${ar.amd_inside_pct}%`} label="Day Inside" />
      </StatGrid>

      <Card title="Recent Daily Data">
        <DataTable
          columns={[
            { key: 'date', label: 'Date' },
            { key: 'asian_range_pct', label: 'Range %', align: 'right', format: (v: number) => `${v?.toFixed(2)}%` },
            { key: 'london_broke_high', label: 'L↑', format: (v: boolean) => v ? '✓' : '' },
            { key: 'london_broke_low', label: 'L↓', format: (v: boolean) => v ? '✓' : '' },
            { key: 'ny_broke_high', label: 'NY↑', format: (v: boolean) => v ? '✓' : '' },
            { key: 'ny_broke_low', label: 'NY↓', format: (v: boolean) => v ? '✓' : '' },
            { key: 'direction', label: 'Dir', format: (v: string) => v },
          ]}
          data={ar.daily.slice(-50).reverse()}
          maxHeight="400px"
        />
      </Card>
    </div>
  );
}
