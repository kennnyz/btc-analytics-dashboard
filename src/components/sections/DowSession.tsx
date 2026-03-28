import { useData } from '../../context/DataContext';
import { Card } from '../shared/Card';
import { Heatmap } from '../shared/charts/Heatmap';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';

export default function DowSession() {
  const { analytics } = useData();
  if (!analytics) return null;
  const d = analytics.dow_session;

  return (
    <div>
      <h2>Day of Week × Session Heatmap</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card><Heatmap data={d.reversal_heatmap.values} rowLabels={d.reversal_heatmap.rows} colLabels={d.reversal_heatmap.cols} title="Reversal Rate %" format={v => `${v.toFixed(0)}%`} /></Card>
        <Card><Heatmap data={d.return_heatmap.values} rowLabels={d.return_heatmap.rows} colLabels={d.return_heatmap.cols} title="Avg 4H Return %" format={v => `${v.toFixed(2)}%`} /></Card>
      </div>
      <Card title="Best & Worst Combinations">
        <StatGrid columns={4}>
          <StatCard value={`${d.best_worst.best_reversal.day} ${d.best_worst.best_reversal.session}`} label={`Best Rev: ${d.best_worst.best_reversal.value.toFixed(1)}%`} variant="positive" small />
          <StatCard value={`${d.best_worst.worst_reversal.day} ${d.best_worst.worst_reversal.session}`} label={`Worst Rev: ${d.best_worst.worst_reversal.value.toFixed(1)}%`} variant="negative" small />
          <StatCard value={`${d.best_worst.best_return.day} ${d.best_worst.best_return.session}`} label={`Best Ret: ${d.best_worst.best_return.value.toFixed(3)}%`} variant="positive" small />
          <StatCard value={`${d.best_worst.worst_return.day} ${d.best_worst.worst_return.session}`} label={`Worst Ret: ${d.best_worst.worst_return.value.toFixed(3)}%`} variant="negative" small />
        </StatGrid>
      </Card>
    </div>
  );
}
