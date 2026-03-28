function cssVar(name: string): string {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Live-read CSS variables for current theme
export function getColors() {
  return {
    bg: cssVar('--bg') || '#0d1117',
    cardBg: cssVar('--card-bg') || '#161b22',
    cardBgHover: cssVar('--card-bg-hover') || '#1c2128',
    border: cssVar('--border') || '#21262d',
    borderLight: cssVar('--border-light') || '#30363d',
    text: cssVar('--text') || '#e6edf3',
    textMuted: cssVar('--text-muted') || '#8b949e',
    textDim: cssVar('--text-dim') || '#484f58',
    accent: cssVar('--accent') || '#58a6ff',
    positive: cssVar('--positive') || '#3fb950',
    negative: cssVar('--negative') || '#f85149',
    cyan: cssVar('--cyan') || '#79c0ff',
    purple: cssVar('--purple') || '#bc8cff',
    yellow: cssVar('--yellow') || '#e3b341',
    orange: cssVar('--orange') || '#d29922',
    chartGrid: cssVar('--chart-grid') || '#21262d',
    tooltipBg: cssVar('--tooltip-bg') || '#1c2128',
    rowAlt: cssVar('--row-alt') || 'rgba(255,255,255,0.015)',
  };
}

// Static fallback for imports (used where CSS vars aren't needed at import time)
export const COLORS = {
  bg: 'var(--bg)',
  cardBg: 'var(--card-bg)',
  cardBgHover: 'var(--card-bg-hover)',
  border: 'var(--border)',
  borderLight: 'var(--border-light)',
  text: 'var(--text)',
  textMuted: 'var(--text-muted)',
  textDim: 'var(--text-dim)',
  accent: 'var(--accent)',
  positive: 'var(--positive)',
  negative: 'var(--negative)',
  cyan: 'var(--cyan)',
  purple: 'var(--purple)',
  yellow: 'var(--yellow)',
  orange: 'var(--orange)',
  chartGrid: 'var(--chart-grid)',
  tooltipBg: 'var(--tooltip-bg)',
  rowAlt: 'var(--row-alt)',
};

export const FONT_MONO = "'JetBrains Mono', monospace";

export function getAxisStyle() {
  const c = getColors();
  return {
    stroke: c.borderLight,
    tick: { fill: c.textMuted, fontSize: 11, fontFamily: FONT_MONO },
    axisLine: { stroke: c.border },
    tickLine: { stroke: c.border },
  };
}

export function getTooltipStyle() {
  const c = getColors();
  return {
    contentStyle: {
      background: c.tooltipBg,
      border: `1px solid ${c.borderLight}`,
      borderRadius: 6,
      color: c.text,
      fontSize: 12,
      fontFamily: FONT_MONO,
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    },
    itemStyle: { color: c.text },
    labelStyle: { color: c.textMuted, fontWeight: 600 },
  };
}

export function getGridStyle() {
  const c = getColors();
  return { strokeDasharray: '3 3', stroke: c.chartGrid };
}

// Deprecated static exports for backward compat
export const AXIS_STYLE = {
  stroke: '#30363d',
  tick: { fill: '#8b949e', fontSize: 11, fontFamily: FONT_MONO },
  axisLine: { stroke: '#21262d' },
  tickLine: { stroke: '#21262d' },
};
export const TOOLTIP_STYLE = {
  contentStyle: {
    background: '#1c2128',
    border: '1px solid #30363d',
    borderRadius: 6,
    color: '#e6edf3',
    fontSize: 12,
    fontFamily: FONT_MONO,
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
  },
  itemStyle: { color: '#e6edf3' },
  labelStyle: { color: '#8b949e', fontWeight: 600 },
};
export const GRID_STYLE = { strokeDasharray: '3 3', stroke: '#21262d' };
