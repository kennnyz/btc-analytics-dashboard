import { useState, useMemo } from 'react';
import { COLORS, FONT_MONO } from './charts/theme';

type Row = Record<string, unknown>;

interface Column {
  key: string;
  label: string;
  // Method syntax keeps callers' narrower param types (e.g. (v: number) => string) assignable.
  format?(value: unknown, row: Row): string | React.ReactNode;
  align?: 'left' | 'right' | 'center';
  colorize?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: object[];
  sortable?: boolean;
  maxHeight?: string;
}

export function DataTable({ columns, data, sortable = true, maxHeight = '500px' }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = useMemo(() => {
    const rows = data as Row[];
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      const cmp = typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb));
      return sortAsc ? cmp : -cmp;
    });
  }, [data, sortKey, sortAsc]);

  const handleSort = (key: string) => {
    if (!sortable) return;
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  return (
    <div style={{ overflow: 'auto', maxHeight, borderRadius: 6, border: `1px solid ${COLORS.border}` }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} onClick={() => handleSort(col.key)} style={{
                padding: '8px 10px',
                textAlign: col.align || 'left',
                fontSize: 11, fontWeight: 600,
                color: COLORS.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: sortable ? 'pointer' : 'default',
                position: 'sticky', top: 0,
                background: COLORS.cardBg,
                borderBottom: `1px solid ${COLORS.border}`,
                whiteSpace: 'nowrap', userSelect: 'none', zIndex: 1,
              }}>
                {col.label}
                {sortKey === col.key && <span style={{ marginLeft: 4, opacity: 0.6 }}>{sortAsc ? '▲' : '▼'}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : COLORS.rowAlt }}>
              {columns.map(col => {
                const raw = row[col.key];
                const formatted = col.format ? col.format(raw, row) : (raw as React.ReactNode);
                let color = COLORS.text;
                if (col.colorize && typeof raw === 'number') {
                  color = raw > 0 ? COLORS.positive : raw < 0 ? COLORS.negative : COLORS.textMuted;
                }
                return (
                  <td key={col.key} style={{
                    padding: '6px 10px',
                    textAlign: col.align || 'left',
                    fontSize: 12, fontFamily: FONT_MONO,
                    whiteSpace: 'nowrap',
                    borderBottom: `1px solid ${COLORS.border}`,
                    color,
                  }}>
                    {formatted}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
