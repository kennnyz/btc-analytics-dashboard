import { useState, useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Brush, Cell,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { StatCard } from '../shared/StatCard';
import { StatGrid } from '../shared/StatGrid';
import { Card } from '../shared/Card';
import { SimplePie } from '../shared/charts/SimplePie';
import { SimpleBar } from '../shared/charts/SimpleBar';
import { DataTable } from '../shared/DataTable';
import { COLORS, FONT_MONO, getColors, getAxisStyle, getGridStyle, getTooltipStyle } from '../shared/charts/theme';

export default function Backtests() {
  const { backtests } = useData();
  const [idx, setIdx] = useState(0);
  const [filter, setFilter] = useState<'all' | 'win' | 'loss'>('all');
  const [search, setSearch] = useState('');

  if (!backtests || backtests.strategies.length === 0) return <div>No backtest data.</div>;

  const strat = backtests.strategies[idx];
  const st = strat.stats;

  // Shorten equity curve dates for display
  const equityData = useMemo(() => {
    return strat.equity_curve.map(p => ({
      ...p,
      label: p.date === 'start' ? 'Start' : p.date.slice(0, 10),
    }));
  }, [strat.equity_curve]);

  const filteredTrades = useMemo(() => {
    let trades = strat.trades;
    if (filter === 'win') trades = trades.filter(t => t.win);
    if (filter === 'loss') trades = trades.filter(t => !t.win);
    if (search) trades = trades.filter(t => t.symbol.toLowerCase().includes(search.toLowerCase()));
    return trades;
  }, [strat.trades, filter, search]);

  const reasonData = Object.entries(st.by_reason).map(([k, v]) => ({ name: k.replace('hit_', '').replace('_', ' '), value: v }));
  const symbolData = Object.entries(st.by_symbol).map(([k, v]) => ({ symbol: k, pnl: v.pnl, trades: v.trades, wr: v.wr }));

  const pnlBuckets = useMemo(() => {
    const pnls = strat.trades.map(t => t.pnl);
    if (pnls.length === 0) return [];
    const min = Math.floor(Math.min(...pnls));
    const max = Math.ceil(Math.max(...pnls));
    const step = Math.max(0.5, (max - min) / 20);
    const buckets: { range: string; count: number }[] = [];
    for (let s = min; s < max; s += step) {
      const count = pnls.filter(p => p >= s && p < s + step).length;
      buckets.push({ range: `${s.toFixed(1)}`, count });
    }
    return buckets;
  }, [strat.trades]);

  const selectStyle: React.CSSProperties = {
    padding: '6px 12px',
    background: 'var(--card-bg)',
    border: '1px solid var(--border-light)',
    borderRadius: 6,
    color: 'var(--text)',
    fontSize: 13,
    fontFamily: FONT_MONO,
    outline: 'none',
  };

  const c = getColors();
  const axis = getAxisStyle();
  const grid = getGridStyle();
  const tip = getTooltipStyle();

  const brushStyle = {
    dataKey: 'label',
    height: 25,
    stroke: c.borderLight,
    fill: c.cardBg,
    travellerWidth: 8,
  };

  return (
    <div>
      <h2>Backtest Results</h2>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
        <select value={idx} onChange={e => { setIdx(Number(e.target.value)); setFilter('all'); setSearch(''); }} style={selectStyle}>
          {backtests.strategies.map((s, i) => (
            <option key={s.slug} value={i}>{s.name} ({s.period})</option>
          ))}
        </select>
      </div>

      <StatGrid>
        <StatCard value={st.trades} label="Trades" variant="accent" />
        <StatCard value={`${st.wr}%`} label="Win Rate" variant={st.wr >= 40 ? 'positive' : 'negative'} />
        <StatCard value={st.pf.toFixed(2)} label="Profit Factor" variant={st.pf >= 1 ? 'positive' : 'negative'} />
        <StatCard value={`${st.pnl > 0 ? '+' : ''}${st.pnl}%`} label="Total PnL" variant={st.pnl >= 0 ? 'positive' : 'negative'} />
        <StatCard value={`${st.mdd}%`} label="Max Drawdown" variant="negative" />
        <StatCard value={`${st.avg_win}% / ${st.avg_loss}%`} label="Avg Win / Loss" />
        <StatCard value={st.sharpe.toFixed(2)} label="Sharpe Ratio" variant={st.sharpe > 0 ? 'positive' : 'negative'} />
        <StatCard value={`$${st.end_balance.toLocaleString()}`} label="End Balance" variant={st.end_balance > 1000 ? 'positive' : 'negative'} />
      </StatGrid>

      {/* Equity Curve with Brush */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card>
          <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 8 }}>Equity Curve</div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={equityData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <defs>
                <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c.accent} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={c.accent} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid {...grid} />
              <XAxis dataKey="label" {...axis} interval="preserveStartEnd" />
              <YAxis {...axis} />
              <Tooltip {...tip} />
              <Area type="monotone" dataKey="balance" stroke={c.accent} strokeWidth={2} fill="url(#eqGrad)" />
              {equityData.length > 50 && <Brush {...brushStyle} startIndex={0} endIndex={equityData.length - 1} />}
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Returns with Brush */}
        <Card>
          <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 8 }}>Monthly Returns</div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={st.monthly_returns} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid {...grid} />
              <XAxis dataKey="month" {...axis} interval="preserveStartEnd" />
              <YAxis {...axis} />
              <Tooltip {...tip} />
              <Bar dataKey="pnl" name="PnL %" radius={[2, 2, 0, 0]}>
                {st.monthly_returns.map((entry, i) => (
                  <Cell key={i} fill={entry.pnl >= 0 ? c.positive : c.negative} />
                ))}
              </Bar>
              {st.monthly_returns.length > 12 && (
                <Brush dataKey="month" height={25} stroke={c.borderLight} fill={c.cardBg} travellerWidth={8} startIndex={0} endIndex={st.monthly_returns.length - 1} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card><SimplePie data={reasonData} title="Close Reasons" height={250} /></Card>
        <Card><SimpleBar data={symbolData} xKey="symbol" bars={[{ key: 'pnl' }]} title="PnL by Symbol %" colorByValue height={250} /></Card>
        <Card><SimpleBar data={pnlBuckets} xKey="range" bars={[{ key: 'count', color: c.purple }]} title="PnL Distribution" height={250} /></Card>
      </div>

      <Card title="Trade History">
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter symbol..." style={{ ...selectStyle, width: 180 }} />
          <select value={filter} onChange={e => setFilter(e.target.value as any)} style={selectStyle}>
            <option value="all">All Trades</option>
            <option value="win">Wins</option>
            <option value="loss">Losses</option>
          </select>
          <span style={{ color: COLORS.textMuted, fontSize: 12, display: 'flex', alignItems: 'center', fontFamily: FONT_MONO }}>
            {filteredTrades.length} trades
          </span>
        </div>
        <DataTable
          columns={[
            { key: 'symbol', label: 'Symbol' },
            { key: 'open_time', label: 'Open', format: (v: string) => v?.slice(0, 16) || '' },
            { key: 'close_time', label: 'Close', format: (v: string) => v?.slice(0, 16) || '' },
            { key: 'entry', label: 'Entry', align: 'right', format: (v: number) => v?.toFixed(2) || '' },
            { key: 'exit', label: 'Exit', align: 'right', format: (v: number) => v?.toFixed(2) || '' },
            { key: 'reason', label: 'Reason', format: (v: string) => v?.replace('hit_', '').replace('_', ' ') || '' },
            { key: 'pnl', label: 'PnL %', align: 'right', colorize: true, format: (v: number) => `${v > 0 ? '+' : ''}${v?.toFixed(2)}%` },
            { key: 'hours', label: 'Hours', align: 'right', format: (v: number) => v?.toFixed(1) || '' },
            { key: 'balance', label: 'Balance', align: 'right', format: (v: number) => `$${v?.toFixed(0)}` },
          ]}
          data={filteredTrades}
          maxHeight="500px"
        />
      </Card>
    </div>
  );
}
