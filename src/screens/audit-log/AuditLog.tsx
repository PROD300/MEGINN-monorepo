import { useMemo, useState } from 'react'
import { AppTopBar, AppSidebar, Button, Select, Input, Table } from '../../components'
import { registerScreen } from '../registry'
import styles from './AuditLog.module.css'

const typeOptions = [
  { value: 'Rebalance', label: 'Rebalance' },
  { value: 'Bridge', label: 'Bridge' },
  { value: 'Rule Paused', label: 'Rule Paused' },
  { value: 'System', label: 'System' },
]

const statusOptions = [
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' },
]

const auditColumns = [
  { key: 'timestamp', header: 'Timestamp' },
  { key: 'type', header: 'Type' },
  { key: 'rule', header: 'Rule' },
  { key: 'asset', header: 'Asset' },
  { key: 'amount', header: 'Amount' },
  { key: 'network', header: 'Network' },
  { key: 'provider', header: 'Provider' },
  {
    key: 'result',
    header: 'Result',
    render: (row: Record<string, unknown>) => (
      <span className={styles[`result_${row.resultVariant as string}`]}>{String(row.result)}</span>
    ),
  },
]

interface AuditRow {
  timestamp: string
  type: string
  rule: string
  asset: string
  amount: string
  network: string
  provider: string
  result: string
  resultVariant: 'success' | 'warning' | 'error'
}

const auditRows: AuditRow[] = [
  { timestamp: 'Jun 16 14:22', type: 'Rebalance', rule: 'ETH Balance Guard', asset: 'ETH→USDC', amount: '$4 200 000', network: 'Arbitrum', provider: 'Li.Fi', result: 'Success', resultVariant: 'success' },
  { timestamp: 'Jun 16 11:08', type: 'Bridge', rule: 'RWA Cross-chain', asset: 'USDC', amount: '$2 100 000', network: 'ETH→ARB', provider: 'Li.Fi', result: 'Success', resultVariant: 'success' },
  { timestamp: 'Jun 15 22:10', type: 'Rebalance', rule: 'ETH Balance Guard', asset: 'ETH→USDC', amount: '$5 100 000', network: 'Arbitrum', provider: 'Li.Fi', result: 'Success', resultVariant: 'success' },
  { timestamp: 'Jun 15 19:55', type: 'Rule Paused', rule: 'USDT Ceiling', asset: '—', amount: '—', network: 'Arbitrum', provider: '—', result: 'Slippage 1.2%', resultVariant: 'warning' },
  { timestamp: 'Jun 14 08:55', type: 'Rebalance', rule: 'ETH Balance Guard', asset: 'ETH→USDC', amount: '—', network: 'Arbitrum', provider: '—', result: 'Gas Too High', resultVariant: 'error' },
  { timestamp: 'Jun 12 16:40', type: 'Rebalance', rule: 'ETH Balance Guard', asset: 'ETH→USDC', amount: '$4 700 000', network: 'Arbitrum', provider: 'Li.Fi', result: 'Success', resultVariant: 'success' },
  { timestamp: 'Jun 10 09:15', type: 'Rebalance', rule: 'stETH Target', asset: 'stETH→ETH', amount: '$1 800 000', network: 'Ethereum', provider: '—', result: 'Success', resultVariant: 'success' },
  { timestamp: 'Jun 05 12:00', type: 'System', rule: '—', asset: '—', amount: '—', network: '—', provider: '—', result: 'Account activated', resultVariant: 'success' },
]

function parseAuditDate(timestamp: string): Date {
  // "Jun 16 14:22" → "Jun 16 2026 14:22" so the JS Date parser handles it reliably
  const withYear = timestamp.replace(/^(\w+ \d+) (\d+:\d+)$/, '$1 2026 $2')
  return new Date(withYear)
}

interface Filters {
  type: string
  status: string
  dateFrom: string
  dateTo: string
}

const emptyFilters: Filters = { type: '', status: '', dateFrom: '', dateTo: '' }

function applyFilters(rows: AuditRow[], filters: Filters): AuditRow[] {
  return rows.filter(row => {
    if (filters.type && row.type !== filters.type) return false
    if (filters.status && row.resultVariant !== filters.status) return false
    const rowDate = parseAuditDate(row.timestamp)
    if (filters.dateFrom && rowDate < new Date(filters.dateFrom)) return false
    if (filters.dateTo && rowDate > new Date(`${filters.dateTo}T23:59:59`)) return false
    return true
  })
}

export function AuditLog() {
  const [draft, setDraft] = useState<Filters>(emptyFilters)
  const [applied, setApplied] = useState<Filters>(emptyFilters)

  const visibleRows = useMemo(() => applyFilters(auditRows, applied), [applied])
  const hasActiveFilters = applied.type || applied.status || applied.dateFrom || applied.dateTo

  function updateDraft<K extends keyof Filters>(key: K, value: string) {
    setDraft(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className={styles.screen}>
      <AppTopBar />

      <div className={styles.body}>
        <AppSidebar active="audit" />

        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeader}>
            <span className={styles.pageTitle}>Audit Log</span>
            <div className={styles.exportRow}>
              <Button variant="primary" size="sm">Export CSV</Button>
              <Button variant="primary" size="sm">Export PDF</Button>
            </div>
          </div>

          {/* FilterBar */}
          <div className={styles.filterBar}>
            <span className={styles.filterLabel}>Filter:</span>
            <div className={styles.selectWrapWide}>
              <Select options={typeOptions} placeholder="All Types" value={draft.type} onChange={e => updateDraft('type', e.target.value)} />
            </div>
            <div className={styles.selectWrap}>
              <Select options={statusOptions} placeholder="All Statuses" value={draft.status} onChange={e => updateDraft('status', e.target.value)} />
            </div>
            <div className={styles.inputWrap}>
              <Input type="date" placeholder="Date from" value={draft.dateFrom} onChange={e => updateDraft('dateFrom', e.target.value)} />
            </div>
            <div className={styles.inputWrap}>
              <Input type="date" placeholder="Date to" value={draft.dateTo} onChange={e => updateDraft('dateTo', e.target.value)} />
            </div>
            <Button variant="primary" size="sm" onClick={() => setApplied(draft)}>Apply</Button>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={() => { setDraft(emptyFilters); setApplied(emptyFilters) }}>Clear</Button>
            )}
            <span className={styles.spacer} />
            <span className={styles.eventsCount}>{visibleRows.length} event{visibleRows.length === 1 ? '' : 's'}</span>
          </div>

          {/* AuditTable */}
          <div className={styles.tableSection}>
            {visibleRows.length > 0 ? (
              <Table density="default" columns={auditColumns} rows={visibleRows as unknown as Record<string, unknown>[]} />
            ) : (
              <div className={styles.emptyState}>
                Nothing found for these filters. Try widening the date range or clearing a filter.
              </div>
            )}
          </div>

          {/* PaginationRow */}
          <div className={styles.paginationRow}>
            <span className={styles.paginationLabel}>
              {visibleRows.length > 0 ? `Showing 1–${visibleRows.length} of ${visibleRows.length} events` : 'No events to show'}
            </span>
            <div className={styles.pageCtrl}>
              <Button variant="secondary" size="sm">Prev</Button>
              <Button variant="secondary" size="sm">1</Button>
              <Button variant="secondary" size="sm">Next</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'audit-log',
  name: 'Audit Log',
  description: 'Filterable audit table of automation events with export and pagination',
  route: '/audit-log',
  component: AuditLog,
})
