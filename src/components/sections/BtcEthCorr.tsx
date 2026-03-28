import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Brush,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { getColors, getAxisStyle, getGridStyle, getTooltipStyle } from '../shared/charts/theme';

export default function BtcEthCorr() {
  const { analytics } = useData();
  if (!analytics?.btc_eth_correlation) return <div>No data.</div>;

  const be = analytics.btc_eth_correlation;
  const ic = analytics.btc_internal_corr;
  const c = getColors();
  const axis = getAxisStyle();
  const grid = getGridStyle();
  const tip = getTooltipStyle();

  return (
    <div>
      <h2>Correlations</h2>
      <StatGrid>
        <StatCard value={be.overall_corr.toFixed(3)} label="BTC-ETH Correlation" variant="accent" />
        <StatCard value={`${be.divergence_pct}%`} label="Divergence Days" />
        {ic && <>
          <StatCard value={ic.return_volume_corr.toFixed(3)} label="Return ↔ Volume" />
          <StatCard value={ic.volatility_next_return_corr.toFixed(3)} label="Volatility → Next Return" />
          <StatCard value={ic.volume_trend_corr.toFixed(3)} label="Vol Trend ↔ Price Trend" />
        </>}
      </StatGrid>

      <Card title="BTC-ETH 30d Rolling Correlation">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={be.rolling_30d} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="corrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.accent} stopOpacity={0.3} />
                <stop offset="100%" stopColor={c.accent} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid {...grid} />
            <XAxis dataKey="date" {...axis} interval="preserveStartEnd" />
            <YAxis {...axis} domain={[0, 1]} />
            <Tooltip {...tip} />
            <Area type="monotone" dataKey="corr" stroke={c.accent} strokeWidth={2} fill="url(#corrGrad)" name="Correlation" />
            {be.rolling_30d.length > 100 && (
              <Brush dataKey="date" height={25} stroke={c.borderLight} fill={c.cardBg} travellerWidth={8} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
