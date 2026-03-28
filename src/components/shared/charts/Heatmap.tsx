import { getColors, FONT_MONO } from './theme';

interface HeatmapProps {
  data: number[][];
  rowLabels: string[];
  colLabels: string[];
  title?: string;
  format?: (v: number) => string;
}

function interpolateColor(val: number, min: number, max: number, isDark: boolean): string {
  if (max === min) return isDark ? '#30363d' : '#d1d9e0';
  const t = (val - min) / (max - min);
  if (t < 0.5) {
    const s = t * 2;
    return isDark
      ? `rgba(248,81,73,${0.7 - s * 0.5})`
      : `rgba(207,34,46,${0.3 - s * 0.2})`;
  }
  const s = (t - 0.5) * 2;
  return isDark
    ? `rgba(63,185,80,${0.2 + s * 0.5})`
    : `rgba(26,127,55,${0.1 + s * 0.3})`;
}

export function Heatmap({ data, rowLabels, colLabels, title, format }: HeatmapProps) {
  const c = getColors();
  const all = data.flat();
  const min = Math.min(...all);
  const max = Math.max(...all);
  const fmt = format || ((v: number) => v.toFixed(1));
  const isDark = c.bg === '#0d1117';

  return (
    <div>
      {title && <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 12 }}>{title}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: `80px repeat(${colLabels.length}, 1fr)`, gap: 2 }}>
        <div />
        {colLabels.map(cl => (
          <div key={cl} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: c.textMuted, padding: '4px 0', fontFamily: FONT_MONO }}>{cl}</div>
        ))}
        {data.map((row, ri) => (
          <div key={ri} style={{ display: 'contents' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, padding: '8px 4px', fontFamily: FONT_MONO, display: 'flex', alignItems: 'center' }}>{rowLabels[ri]}</div>
            {row.map((val, ci) => (
              <div key={ci} style={{
                background: interpolateColor(val, min, max, isDark),
                borderRadius: 4,
                padding: '8px 4px',
                textAlign: 'center',
                fontSize: 11,
                fontFamily: FONT_MONO,
                color: c.text,
                fontWeight: 500,
              }}>
                {fmt(val)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
