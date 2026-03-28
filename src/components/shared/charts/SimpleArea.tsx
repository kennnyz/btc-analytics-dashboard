import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getAxisStyle, getColors, getGridStyle, getTooltipStyle } from './theme';

interface SimpleAreaProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  title?: string;
}

export function SimpleArea({ data, xKey, yKey, color, height = 300, title }: SimpleAreaProps) {
  const c = getColors();
  const axis = getAxisStyle();
  const grid = getGridStyle();
  const tip = getTooltipStyle();
  const lineColor = color || c.accent;
  const gradientId = `area-grad-${yKey}`;

  return (
    <div>
      {title && <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 8 }}>{title}</div>}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={lineColor} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid {...grid} />
          <XAxis dataKey={xKey} {...axis} />
          <YAxis {...axis} />
          <Tooltip {...tip} />
          <Area type="monotone" dataKey={yKey} stroke={lineColor} strokeWidth={2} fill={`url(#${gradientId})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
