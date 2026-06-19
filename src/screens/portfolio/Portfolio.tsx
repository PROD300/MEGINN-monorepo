import { useNavigate } from 'react-router-dom'
import { AppTopBar, AppSidebar, StatCard, ActivityRow, Table, Button } from '../../components'
import { registerScreen } from '../registry'
import styles from './Portfolio.module.css'

const allocationColumns = [
  { key: 'asset', header: 'Asset' },
  { key: 'allocation', header: 'Allocation' },
  { key: 'value', header: 'Value' },
]

const allocationRows = [
  { asset: 'AAPL', allocation: '35%', value: '$42,000' },
  { asset: 'MSFT', allocation: '28%', value: '$33,600' },
] as Record<string, unknown>[]

const activityItems = [
  {
    status: 'success' as const,
    description: 'Auto-rebalance: ETH → USDC · $4 200 000',
    time: '2h ago',
    statusLabel: 'Success',
  },
  {
    status: 'info' as const,
    description: 'Cross-chain bridge: RWA rebalance — ETH→ARB · $2 100 000',
    time: '3h ago',
    statusLabel: 'Success [Bridge]',
  },
  {
    status: 'success' as const,
    description: 'Auto-rebalance: stETH → ETH · $1 800 000',
    time: '6h ago',
    statusLabel: 'Success',
  },
  {
    status: 'warning' as const,
    description: 'Rule triggered: Slippage Guard — paused USDT rule',
    time: '1d ago',
    statusLabel: 'Warning',
  },
]

export function Portfolio() {
  const navigate = useNavigate()

  return (
    <div className={styles.screen}>
      <AppTopBar />

      <div className={styles.body}>
        <AppSidebar active="portfolio" />

        <main className={styles.main}>
          {/* StatusBar */}
          <div className={styles.statusBar}>
            <div className={styles.statusLeft}>
              <span className={styles.statusItem}>● ETH — Connected</span>
              <span className={styles.statusItem}>● Arbitrum — Connected</span>
              <span className={styles.statusItemAccent}>● Bridge — Active (Li.Fi · avg 42 sec)</span>
            </div>
            <span className={styles.statusSync}>Last sync: 2 min ago</span>
          </div>

          {/* StatsRow */}
          <div className={styles.statsRow}>
            <StatCard
              variant="neutral"
              label="Total AUM"
              value="$487 350 000"
              subtitle="across 2 networks"
            />
            <StatCard
              variant="success"
              label="Active Rules"
              value="3"
              subtitle="auto-rebalancing enabled"
            />
            <StatCard
              variant="neutral"
              label="Last Rebalance"
              value="2h ago"
              subtitle="ETH → USDC via Bridge"
            />
          </div>

          {/* AlertBanner */}
          <div className={styles.alertBanner}>
            ⚠&nbsp;&nbsp;Next rebalance trigger: ETH allocation +2.0% above target
          </div>

          {/* Asset Allocation */}
          <div className={styles.section}>
            <div className={styles.secHeader}>
              <span className={styles.secTitle}>Asset Allocation</span>
            </div>
            <div className={styles.divider} />
            <Table columns={allocationColumns} rows={allocationRows} />
          </div>

          {/* QuickActions */}
          <div className={styles.quickActions}>
            <Button variant="primary" size="md">Rebalance Now</Button>
            <Button variant="ghost" size="md">Add Asset</Button>
            <Button variant="ghost" size="md" onClick={() => navigate('/cross-chain-bridge')}>Bridge Funds</Button>
            <Button variant="ghost" size="md">Download Report</Button>
          </div>

          {/* Recent Activity */}
          <div className={styles.activitySection}>
            <div className={styles.secHeader}>
              <span className={styles.secTitle}>Recent Automation Activity</span>
              <a href="#" className={styles.secLink} onClick={e => { e.preventDefault(); navigate('/audit-log') }}>View full audit log →</a>
            </div>
            <div className={styles.activityList}>
              {activityItems.map((item, i) => (
                <ActivityRow key={i} {...item} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'portfolio',
  name: 'Portfolio',
  description: 'AUM overview, asset allocation table, rebalancing activity, quick actions',
  route: '/portfolio',
  component: Portfolio,
})
