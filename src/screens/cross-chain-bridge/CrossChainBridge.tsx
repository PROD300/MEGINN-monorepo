import { useNavigate } from 'react-router-dom'
import { AppTopBar, AppSidebar, Badge, Table } from '../../components'
import { registerScreen } from '../registry'
import styles from './CrossChainBridge.module.css'

const bridgeColumns = [
  { key: 'asset', header: 'Asset' },
  { key: 'allocation', header: 'Allocation' },
  { key: 'value', header: 'Value' },
]

const bridgeRows = [
  { asset: 'AAPL', allocation: '35%', value: '$42,000' },
  { asset: 'MSFT', allocation: '28%', value: '$33,600' },
] as Record<string, unknown>[]

interface ProviderData {
  name: string
  statusLabel: string
  statusVariant: 'success' | 'info'
  avgTime: string
  volume: string
}

const providers: ProviderData[] = [
  { name: 'Li.Fi', statusLabel: 'Active – Primary', statusVariant: 'success', avgTime: 'Avg time: 42 sec avg', volume: 'Volume: $2.1M today' },
  { name: 'Socket', statusLabel: 'Active – Fallback', statusVariant: 'info', avgTime: 'Avg time: 55 sec avg', volume: 'Volume: $0 today' },
  { name: 'Across', statusLabel: 'Active – Fallback', statusVariant: 'info', avgTime: 'Avg time: 38 sec avg', volume: 'Volume: $0 today' },
]

function BridgeProviderCard({ provider }: { provider: ProviderData }) {
  return (
    <div className={styles.providerCard}>
      <div className={styles.providerTop}>
        <span className={styles.providerName}>{provider.name}</span>
        <Badge variant={provider.statusVariant}>{provider.statusLabel}</Badge>
      </div>
      <span className={styles.providerMeta}>{provider.avgTime}</span>
      <span className={styles.providerMeta}>{provider.volume}</span>
    </div>
  )
}

export function CrossChainBridge() {
  const navigate = useNavigate()

  return (
    <div className={styles.screen}>
      <AppTopBar />

      <div className={styles.body}>
        <AppSidebar active="rebalancing" />

        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeader}>
            <div className={styles.breadcrumb}>
              <a href="#" className={styles.breadcrumbAccent} onClick={e => { e.preventDefault(); navigate('/rebalancing-rules') }}>Rebalancing Rules</a>
              <span className={styles.breadcrumbMuted}>/</span>
              <span className={styles.breadcrumbMuted}>Cross-chain Bridge</span>
            </div>
            <span className={styles.pageTitle}>Cross-chain Bridge</span>
          </div>

          {/* InfoBanner */}
          <div className={styles.f20Banner}>
            <span className={styles.f20Title}>Cross-chain Bridge</span>
            <span className={styles.f20Subtitle}>— required dependency of AI Auto-Rebalancing. Provides cross-chain access across all supported networks.</span>
            <span className={styles.f20Subtitle}>Providers: Li.Fi (Primary) · Socket (Fallback) · Across (Fallback)</span>
          </div>

          {/* BridgeProviders */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Bridge Providers</span>
            <div className={styles.providersRow}>
              {providers.map(p => (
                <BridgeProviderCard key={p.name} provider={p} />
              ))}
            </div>
          </div>

          {/* ActiveBridges */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Active Bridges</span>
            <div className={styles.divider} />
            <Table columns={bridgeColumns} rows={bridgeRows} />
          </div>

          {/* BridgeHistory */}
          <div className={styles.section}>
            <div className={styles.secHeader}>
              <span className={styles.sectionTitle}>Bridge History</span>
              <a href="#" className={styles.secLink} onClick={e => { e.preventDefault(); navigate('/audit-log') }}>View full audit log →</a>
            </div>
            <Table columns={bridgeColumns} rows={bridgeRows} />
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <span>Total bridged (24h): $8 100 000</span>
            <span>Avg bridge time: 41 sec</span>
            <span>Success rate: 100%</span>
            <span>Active provider: Li.Fi</span>
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
