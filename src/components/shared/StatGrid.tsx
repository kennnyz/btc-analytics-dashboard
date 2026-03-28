import type { ReactNode } from 'react';

interface StatGridProps {
  children: ReactNode;
  columns?: number;
  minWidth?: number;
}

export function StatGrid({ children, columns, minWidth = 200 }: StatGridProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: columns
        ? `repeat(${columns}, 1fr)`
        : `repeat(auto-fit, minmax(${minWidth}px, 1fr))`,
      gap: 12,
      marginBottom: 16,
    }}>
      {children}
    </div>
  );
}
