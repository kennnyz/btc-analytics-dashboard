import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getAxisStyle, getColors, getGridStyle, getTooltipStyle } from './theme';

interface LineDef { key: string; color?: string; name?: string; }

interface SimpleLineProps {
  data: any[];
  xKey: string;
  lines: LineDef[];
  height?: number;
  title?: string;
}

export function SimpleLine({ data, xKey, lines, height = 300, title }: SimpleLineProps) {
  const c = getColors();
  const axis = getAxisStyle();
  const grid = getGridStyle();
  const tip = getTooltipStyle();

  return (
    <div>
      {title && <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 8 }}>{title}</div>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid {...grid} />
          <XAxis dataKey={xKey} {...axis} />
          <YAxis {...axis} />
          <Tooltip {...tip} />
          {lines.map(l => (
            <Line key={l.key} type="monotone" dataKey={l.key} name={l.name || l.key} stroke={l.color || c.accent} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
