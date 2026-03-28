import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { getAxisStyle, getColors, getGridStyle, getTooltipStyle, FONT_MONO } from './theme';

interface BarDef { key: string; color?: string; name?: string; }

interface SimpleBarProps {
  data: any[];
  xKey: string;
  bars: BarDef[];
  height?: number;
  title?: string;
  colorByValue?: boolean;
  yLabel?: string;
}

export function SimpleBar({ data, xKey, bars, height = 300, title, colorByValue, yLabel }: SimpleBarProps) {
  const c = getColors();
  const axis = getAxisStyle();
  const grid = getGridStyle();
  const tip = getTooltipStyle();

  return (
    <div>
      {title && <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 8 }}>{title}</div>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid {...grid} />
          <XAxis dataKey={xKey} {...axis} />
          <YAxis {...axis} label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', fill: c.textMuted, fontSize: 11, fontFamily: FONT_MONO } : undefined} />
          <Tooltip {...tip} />
          {bars.map(b => (
            <Bar key={b.key} dataKey={b.key} name={b.name || b.key} fill={b.color || c.accent} radius={[2, 2, 0, 0]}>
              {colorByValue && data.map((entry, idx) => (
                <Cell key={idx} fill={entry[b.key] >= 0 ? c.positive : c.negative} />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
