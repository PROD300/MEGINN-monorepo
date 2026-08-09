import type { ReactNode } from 'react'
import styles from './Table.module.css'

export type TableDensity = 'default' | 'compact'

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (row: T) => ReactNode
}

interface TableProps<T extends Record<string, unknown>> {
  density?: TableDensity
  columns: Column<T>[]
  rows: T[]
}

export function Table<T extends Record<string, unknown>>({
  density = 'default',
  columns,
  rows,
}: TableProps<T>) {
  return (
    <table className={[styles.table, styles[density]].join(' ')}>
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
