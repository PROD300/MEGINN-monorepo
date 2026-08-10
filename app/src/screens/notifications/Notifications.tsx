import { useState } from 'react'
import { TopNav, Button, Badge, Tabs, NotificationRow } from '../../components'
import { registerScreen } from '../registry'
import { notificationsStore, markAllRead, markRead, getUnreadCount, type NotificationCategory } from '../../data/notifications'
import { showToast } from '../../lib/toast'
import styles from './Notifications.module.css'

type Category = 'all' | NotificationCategory

export function Notifications() {
  const notifications = notificationsStore.useStore()
  const [tab, setTab] = useState<Category>('all')

  const unreadCount = getUnreadCount(notifications)
  const visible = tab === 'all' ? notifications : notifications.filter(n => n.category === tab)

  function countFor(category: Category) {
    if (category === 'all') return notifications.length
    return notifications.filter(n => n.category === category).length
  }

  function handleMarkAllRead() {
    markAllRead()
    showToast('success', 'All notifications marked as read')
  }

  return (
    <div className={styles.screen}>
      <TopNav active="settings" />

      <div className={styles.body}>
        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeaderWrap}>
            <div className={styles.pageHeader}>
              <span className={styles.pageTitle}>Notifications</span>
              <Button variant="primary" size="sm" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
                {unreadCount === 0 ? 'All read' : 'Mark all read'}
              </Button>
            </div>
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
              <div key={n.id} onClick={() => !n.read && markRead(n.id)} style={{ cursor: n.read ? 'default' : 'pointer' }}>
                <NotificationRow
                  status={n.status}
                  title={n.title}
                  description={n.description}
                  time={n.time}
                  badge={!n.read && <Badge variant="info">New</Badge>}
                />
              </div>
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
