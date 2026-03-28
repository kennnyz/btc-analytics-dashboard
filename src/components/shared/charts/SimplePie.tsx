import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { getColors, getTooltipStyle, FONT_MONO } from './theme';

interface PieItem { name: string; value: number; color?: string; }

interface SimplePieProps {
  data: PieItem[];
  height?: number;
  title?: string;
}

export function SimplePie({ data, height = 300, title }: SimplePieProps) {
  const c = getColors();
  const tip = getTooltipStyle();
  const palette = [c.accent, c.purple, c.yellow, c.orange, c.positive, c.negative, c.cyan];

  return (
    <div>
      {title && <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 8 }}>{title}</div>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Tooltip {...tip} />
          <Legend wrapperStyle={{ color: c.textMuted, fontSize: 12, fontFamily: FONT_MONO }} />
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="70%" innerRadius="40%" strokeWidth={0}>
            {data.map((entry, idx) => (
              <Cell key={entry.name} fill={entry.color || palette[idx % palette.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
