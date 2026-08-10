import type { ReactNode } from 'react'
import styles from './Table.module.css'

export type TableDensity = 'default' | 'compact'
export type TableRowStyle = 'flat' | 'sheen'

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (row: T) => ReactNode
}

interface TableProps<T extends Record<string, unknown>> {
  density?: TableDensity
  /** 'flat' (default) — static rows, no background/dividers/hover, per the
   *  2026-08-10 minimalism pass. 'sheen' — the older per-row highlight +
   *  divider treatment, kept only for screens with an existing sign-off
   *  (e.g. Audit Log, approved by Kati) that shouldn't change under them. */
  rowStyle?: TableRowStyle
  columns: Column<T>[]
  rows: T[]
}

export function Table<T extends Record<string, unknown>>({
  density = 'default',
  rowStyle = 'flat',
  columns,
  rows,
}: TableProps<T>) {
  return (
    <table className={[styles.table, styles[density], rowStyle === 'sheen' ? styles.sheenRows : ''].join(' ')}>
      <thead className={styles.thead}>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)} className={styles.th}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map(col => (
              <td key={String(col.key)} className={styles.td}>
                {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
