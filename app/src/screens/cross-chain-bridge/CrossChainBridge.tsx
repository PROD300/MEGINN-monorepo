import { useNavigate } from 'react-router-dom'
import { TopNav, Banner, Badge, Table, Button } from '../../components'
import { registerScreen } from '../registry'
import { bridgeStore, completeBridge, isWithin24h, type BridgeOperation, type BridgeStatus } from '../../data/bridge'
import { showToast } from '../../lib/toast'
import { formatUsd } from '../../lib/format'
import styles from './CrossChainBridge.module.css'

const statusBadge: Record<BridgeStatus, 'success' | 'warning' | 'error'> = {
  pending: 'warning',
  success: 'success',
  failed: 'error',
}

const statusLabel: Record<BridgeStatus, string> = {
  pending: 'In progress',
  success: 'Success',
  failed: 'Failed',
}

interface ProviderMeta {
  name: string
  avgTime: string
}

const providerMeta: ProviderMeta[] = [
  { name: 'Li.Fi', avgTime: 'Avg time: 42 sec avg' },
  { name: 'Socket', avgTime: 'Avg time: 55 sec avg' },
  { name: 'Across', avgTime: 'Avg time: 38 sec avg' },
]

function BridgeProviderCard({ provider, volumeToday, isActive }: { provider: ProviderMeta; volumeToday: number; isActive: boolean }) {
  return (
    <div className={styles.providerCard}>
      <div className={styles.providerTop}>
        <span className={styles.providerName}>{provider.name}</span>
        <Badge variant={isActive ? 'success' : 'info'}>{isActive ? 'Active – Primary' : 'Active – Fallback'}</Badge>
      </div>
      <span className={styles.providerMeta}>{provider.avgTime}</span>
      <span className={styles.providerMeta}>Volume: {formatUsd(volumeToday)} today</span>
    </div>
  )
}

export function CrossChainBridge() {
  const navigate = useNavigate()
  const operations = bridgeStore.useStore()

  const activeOps = operations.filter(op => op.status === 'pending')
  const historyOps = operations.filter(op => op.status !== 'pending')

  const completedToday = historyOps.filter(op => isWithin24h(op.time))
  const successToday = completedToday.filter(op => op.status === 'success')
  const totalBridged24h = successToday.reduce((sum, op) => sum + op.amountUsd, 0)
  const successRate = completedToday.length > 0
    ? Math.round((successToday.length / completedToday.length) * 100)
    : 100
  const activeProvider = operations[0]?.provider ?? 'Li.Fi'

  function volumeForProvider(provider: string) {
    return successToday.filter(op => op.provider === provider).reduce((sum, op) => sum + op.amountUsd, 0)
  }

  function handleCompleteNow(op: BridgeOperation) {
    completeBridge(op.id)
    showToast('success', `${op.asset} bridge ${op.route} completed · ${formatUsd(op.amountUsd)}`)
  }

  const activeColumns = [
    { key: 'asset', header: 'Asset', render: (row: Record<string, unknown>) => <span className="ds-numeric">{String(row.asset)}</span> },
    { key: 'route', header: 'Route' },
    { key: 'amountUsd', header: 'Amount', render: (row: Record<string, unknown>) => <span className="ds-numeric">{formatUsd(row.amountUsd as number)}</span> },
    { key: 'provider', header: 'Provider' },
    { key: 'time', header: 'Status', render: (row: Record<string, unknown>) => (
      <span className={styles.inProgressCell}>
        <Badge variant={statusBadge[row.status as BridgeStatus]}>{statusLabel[row.status as BridgeStatus]}</Badge>
        <span className={`${styles.providerMeta} ds-numeric`}>{row.time as string}</span>
      </span>
    ) },
    { key: 'action', header: '', render: (row: Record<string, unknown>) => (
      <Button variant="ghost" size="sm" onClick={() => handleCompleteNow(row as unknown as BridgeOperation)}>Complete now</Button>
    ) },
  ]

  const historyColumns = [
    { key: 'asset', header: 'Asset', render: (row: Record<string, unknown>) => <span className="ds-numeric">{String(row.asset)}</span> },
    { key: 'route', header: 'Route' },
    { key: 'amountUsd', header: 'Amount', render: (row: Record<string, unknown>) => <span className="ds-numeric">{formatUsd(row.amountUsd as number)}</span> },
    { key: 'provider', header: 'Provider' },
    { key: 'time', header: 'Time', render: (row: Record<string, unknown>) => <span className="ds-numeric">{String(row.time)}</span> },
    { key: 'status', header: 'Status', render: (row: Record<string, unknown>) => (
      <Badge variant={statusBadge[row.status as BridgeStatus]}>{statusLabel[row.status as BridgeStatus]}</Badge>
    ) },
  ]

  return (
    <div className={styles.screen}>
      <TopNav active="rebalancing" />

      <div className={styles.body}>
        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeaderWrap}>
            <div className={styles.pageHeader}>
              <div className={styles.breadcrumb}>
                <a href="#" className={styles.breadcrumbAccent} onClick={e => { e.preventDefault(); navigate('/rebalancing-rules') }}>Rebalancing Rules</a>
                <span className={styles.breadcrumbMuted}>/</span>
                <span className={styles.breadcrumbMuted}>Cross-chain Bridge</span>
              </div>
              <span className={styles.pageTitle}>Cross-chain Bridge</span>
            </div>
          </div>

          {/* InfoBanner */}
          <Banner variant="info">
            Cross-chain Bridge — required dependency of AI Auto-Rebalancing. Providers: Li.Fi (Primary) · Socket (Fallback) · Across (Fallback)
          </Banner>

          {/* BridgeProviders */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Bridge Providers</span>
            <div className={styles.providersRow}>
              {providerMeta.map(p => (
                <BridgeProviderCard key={p.name} provider={p} volumeToday={volumeForProvider(p.name)} isActive={p.name === activeProvider} />
              ))}
            </div>
          </div>

          {/* ActiveBridges */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Active Bridges</span>
            <div className={styles.divider} />
            {activeOps.length > 0 ? (
              <Table columns={activeColumns} rows={activeOps as unknown as Record<string, unknown>[]} />
            ) : (
              <div className={styles.emptyState}>No bridges in progress.</div>
            )}
          </div>

          {/* BridgeHistory */}
          <div className={styles.section}>
            <div className={styles.secHeader}>
              <span className={styles.sectionTitle}>Bridge History</span>
              <a href="#" className={styles.secLink} onClick={e => { e.preventDefault(); navigate('/audit-log') }}>View full audit log →</a>
            </div>
            {historyOps.length > 0 ? (
              <Table columns={historyColumns} rows={historyOps as unknown as Record<string, unknown>[]} />
            ) : (
              <div className={styles.emptyState}>No completed bridges yet.</div>
            )}
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <span>Total bridged (24h): {formatUsd(totalBridged24h)}</span>
            <span>Success rate: {successRate}%</span>
            <span>Active provider: {activeProvider}</span>
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'cross-chain-bridge',
  name: 'Cross-chain Bridge',
  description: 'Bridge providers, active bridges table, bridge history, footer stats',
  route: '/cross-chain-bridge',
  component: CrossChainBridge,
})
