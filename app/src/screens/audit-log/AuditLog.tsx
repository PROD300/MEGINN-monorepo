import { useMemo, useState } from 'react'
import { TopNav, Button, Select, Input, Table } from '../../components'
import { registerScreen } from '../registry'
import { auditLogStore, type AuditRow } from '../../data/auditLog'
import { showToast } from '../../lib/toast'
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
  { key: 'timestamp', header: 'Timestamp', render: (row: Record<string, unknown>) => <span className="ds-numeric">{String(row.timestamp)}</span> },
  { key: 'type', header: 'Type' },
  { key: 'rule', header: 'Rule' },
  { key: 'asset', header: 'Asset' },
  { key: 'amount', header: 'Amount', render: (row: Record<string, unknown>) => <span className="ds-numeric">{String(row.amount)}</span> },
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

function exportFilename(ext: string) {
  return `obsidian-audit-log-${new Date().toISOString().slice(0, 10)}.${ext}`
}

function downloadBlob(content: string, mime: string, filename: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function rowsToCsv(rows: AuditRow[]) {
  const header = ['Timestamp', 'Type', 'Rule', 'Asset', 'Amount', 'Network', 'Provider', 'Result']
  const lines = [header.join(',')]
  rows.forEach(r => {
    lines.push([r.timestamp, r.type, r.rule, r.asset, r.amount, r.network, r.provider, r.result]
      .map(v => `"${v.replace(/"/g, '""')}"`).join(','))
  })
  return lines.join('\n')
}

function rowsToPrintableHtml(rows: AuditRow[]) {
  const body = rows.map(r => `<tr><td>${r.timestamp}</td><td>${r.type}</td><td>${r.rule}</td><td>${r.asset}</td><td>${r.amount}</td><td>${r.network}</td><td>${r.provider}</td><td>${r.result}</td></tr>`).join('')
  return `<!doctype html><html><head><title>OBSIDIAN — Audit Log</title><style>
    body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
    h1 { font-size: 18px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 12px; }
    th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; }
    th { background: #f5f5f5; }
  </style></head><body>
    <h1>OBSIDIAN — Audit Log</h1>
    <div>Generated: ${new Date().toLocaleString()} · ${rows.length} event${rows.length === 1 ? '' : 's'}</div>
    <table><thead><tr><th>Timestamp</th><th>Type</th><th>Rule</th><th>Asset</th><th>Amount</th><th>Network</th><th>Provider</th><th>Result</th></tr></thead>
    <tbody>${body}</tbody></table>
  </body></html>`
}

export function AuditLog() {
  const auditRows = auditLogStore.useStore()
  const [draft, setDraft] = useState<Filters>(emptyFilters)
  const [applied, setApplied] = useState<Filters>(emptyFilters)
  const [exportingCsv, setExportingCsv] = useState(false)
  const [exportingPdf, setExportingPdf] = useState(false)

  const visibleRows = useMemo(() => applyFilters(auditRows, applied), [auditRows, applied])
  const hasActiveFilters = applied.type || applied.status || applied.dateFrom || applied.dateTo

  function handleExportCsv() {
    if (visibleRows.length === 0) {
      showToast('error', 'Nothing to export for the current filters')
      return
    }
    setExportingCsv(true)
    setTimeout(() => {
      downloadBlob(rowsToCsv(visibleRows), 'text/csv;charset=utf-8;', exportFilename('csv'))
      setExportingCsv(false)
      showToast('success', `Exported ${visibleRows.length} event${visibleRows.length === 1 ? '' : 's'} to CSV`)
    }, 400)
  }

  function handleExportPdf() {
    if (visibleRows.length === 0) {
      showToast('error', 'Nothing to export for the current filters')
      return
    }
    setExportingPdf(true)
    setTimeout(() => {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(rowsToPrintableHtml(visibleRows))
        printWindow.document.close()
        printWindow.focus()
        printWindow.print()
      }
      setExportingPdf(false)
      showToast('success', `Opened print view for ${visibleRows.length} event${visibleRows.length === 1 ? '' : 's'} — choose "Save as PDF"`)
    }, 400)
  }

  function updateDraft<K extends keyof Filters>(key: K, value: string) {
    setDraft(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className={styles.screen}>
      <TopNav active="audit" />

      <div className={styles.body}>
        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeader}>
            <span className={styles.pageTitle}>Audit Log</span>
            <div className={styles.exportRow}>
              <Button variant="primary" size="sm" onClick={handleExportCsv} loading={exportingCsv}>Export CSV</Button>
              <Button variant="primary" size="sm" onClick={handleExportPdf} loading={exportingPdf}>Export PDF</Button>
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
              <div className={styles.emptyState} data-track="audit-log-empty-state">
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
