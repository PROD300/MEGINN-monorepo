import { useState } from 'react'
import { AppTopBar, AppSidebar, Button, Tabs, NotificationRow } from '../../components'
import { registerScreen } from '../registry'
import styles from './Notifications.module.css'

type Category = 'all' | 'rebalancing' | 'compliance' | 'system'

interface NotificationItem {
  status: 'success' | 'info' | 'warning'
  title: string
  description: string
  time: string
  category: Exclude<Category, 'all'>
}

const notifications: NotificationItem[] = [
  {
    status: 'success',
    title: 'Auto-rebalance completed successfully',
    description: 'ETH Balance Guard: Sold $4.2M ETH → USDC · Arbitrum · Li.Fi',
    time: '2h ago',
    category: 'rebalancing',
  },
  {
    status: 'success',
    title: 'Cross-chain bridge operation completed',
    description: 'RWA Cross-chain Rebalance: $2.1M USDC bridged ETH → Arbitrum via Li.Fi',
    time: '3h ago',
    category: 'rebalancing',
  },
  {
    status: 'success',
    title: 'Auto-rebalance: stETH Target completed',
    description: 'stETH Target Allocation: Sold $1.8M stETH → ETH · Ethereum',
    time: '6h ago',
    category: 'rebalancing',
  },
  {
    status: 'warning',
    title: 'Rule paused automatically: Slippage Guard triggered',
    description: 'USDT Ceiling: Slippage 1.2% exceeded 0.8% limit. Rule paused.',
    time: '1d ago',
    category: 'compliance',
  },
  {
    status: 'success',
    title: 'System health check completed',
    description: 'All bridge providers operational. ETH / Arbitrum RPC connected.',
    time: '2d ago',
    category: 'system',
  },
  {
    status: 'success',
    title: 'Smart Account activated',
    description: 'Your Smart Account is now active. Rebalancing rules are enabled.',
    time: '1w ago',
    category: 'system',
  },
]

function countFor(category: Category) {
  if (category === 'all') return notifications.length
  return notifications.filter(n => n.category === category).length
}

export function Notifications() {
  const [tab, setTab] = useState<Category>('all')
  const visible = tab === 'all' ? notifications : notifications.filter(n => n.category === tab)

  return (
    <div className={styles.screen}>
      <AppTopBar />

      <div className={styles.body}>
        <AppSidebar active="settings" />

        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeader}>
            <span className={styles.pageTitle}>Notifications</span>
            <Button variant="primary" size="sm">Mark all read</Button>
          </div>

          {/* FilterTabs */}
          <div className={styles.tabsWrap}>
            <Tabs
              tabs={[
                { label: `All (${countFor('all')})`, value: 'all' },
                { label: `Rebalancing (${countFor('rebalancing')})`, value: 'rebalancing' },
                { label: `Compliance (${countFor('compliance')})`, value: 'compliance' },
                { label: `System (${countFor('system')})`, value: 'system' },
              ]}
              active={tab}
              onChange={value => setTab(value as Category)}
            />
          </div>

          {/* NotificationList */}
          <div className={styles.list}>
            {visible.length === 0 && (
              <div className={styles.emptyState}>No notifications in this category.</div>
            )}
            {visible.map((n) => (
              <NotificationRow
                key={n.title}
                status={n.status}
                title={n.title}
                description={n.description}
                time={n.time}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'notifications',
  name: 'Notifications',
  description: 'Filterable notification feed: rebalancing, compliance, system events',
  route: '/notifications',
  component: Notifications,
})
