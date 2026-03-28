import { COLORS, FONT_MONO } from './charts/theme';

interface StatCardProps {
  value: string | number;
  label: string;
  variant?: 'positive' | 'negative' | 'accent' | 'default';
  small?: boolean;
}

const variantMap: Record<string, string> = {
  positive: COLORS.positive,
  negative: COLORS.negative,
  accent: COLORS.accent,
  default: COLORS.text,
};

export function StatCard({ value, label, variant = 'default', small }: StatCardProps) {
  return (
    <div style={{
      background: COLORS.cardBg,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: small ? '12px 14px' : '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      transition: 'background 0.2s, border-color 0.2s',
    }}>
      <div style={{
        fontFamily: FONT_MONO,
        fontSize: small ? 18 : 24,
        fontWeight: 700,
        color: variantMap[variant],
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      }}>{value}</div>
      <div style={{
        fontSize: 11,
        color: COLORS.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        fontWeight: 500,
      }}>{label}</div>
    </div>
  );
}
