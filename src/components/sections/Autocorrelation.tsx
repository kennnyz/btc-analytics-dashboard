import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { SimpleBar } from '../shared/charts/SimpleBar';

export default function Autocorrelation() {
  const { analytics } = useData();
  if (!analytics) return null;
  const a = analytics.autocorrelation;

  const data = [
    { tf: '1H', corr: a.autocorr_1h },
    { tf: '4H', corr: a.autocorr_4h },
    { tf: '1D', corr: a.autocorr_1d },
    { tf: '5D Mom', corr: a.momentum_5d_corr },
  ];

  return (
    <div>
      <h2>Return Autocorrelation</h2>
      <StatGrid>
        <StatCard value={a.autocorr_1h.toFixed(4)} label="1H Autocorrelation" variant={a.autocorr_1h > 0 ? 'positive' : 'negative'} />
        <StatCard value={a.autocorr_4h.toFixed(4)} label="4H Autocorrelation" variant={a.autocorr_4h > 0 ? 'positive' : 'negative'} />
        <StatCard value={a.autocorr_1d.toFixed(4)} label="1D Autocorrelation" variant={a.autocorr_1d > 0 ? 'positive' : 'negative'} />
        <StatCard value={a.momentum_5d_corr.toFixed(4)} label="5D Momentum Corr" variant={a.momentum_5d_corr > 0 ? 'positive' : 'negative'} />
      </StatGrid>
      <Card><SimpleBar data={data} xKey="tf" bars={[{ key: 'corr' }]} title="Autocorrelation by Timeframe" colorByValue /></Card>
    </div>
  );
}
