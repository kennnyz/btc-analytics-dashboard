import type { CSSProperties, ReactNode } from 'react';
import { COLORS } from './charts/theme';

interface CardProps {
  title?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function Card({ title, children, style }: CardProps) {
  return (
    <div style={{
      background: COLORS.cardBg,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      transition: 'background 0.2s, border-color 0.2s',
      ...style,
    }}>
      {title && (
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 12 }}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
