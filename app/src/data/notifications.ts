import { createStore } from './store'

export type NotificationCategory = 'rebalancing' | 'compliance' | 'system'
export type NotificationStatus = 'success' | 'info' | 'warning'

export interface NotificationItem {
  id: string
  status: NotificationStatus
  title: string
  description: string
  time: string
  category: NotificationCategory
  read: boolean
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    status: 'success',
    title: 'Auto-rebalance completed successfully',
    description: 'ETH Balance Guard: Sold $4.2M ETH → USDC · Arbitrum · Li.Fi',
    time: '2h ago',
    category: 'rebalancing',
    read: false,
  },
  {
    id: 'n2',
    status: 'success',
    title: 'Cross-chain bridge operation completed',
    description: 'RWA Cross-chain Rebalance: $2.1M USDC bridged ETH → Arbitrum via Li.Fi',
    time: '3h ago',
    category: 'rebalancing',
    read: false,
  },
  {
    id: 'n3',
    status: 'success',
    title: 'Auto-rebalance: stETH Target completed',
    description: 'stETH Target Allocation: Sold $1.8M stETH → ETH · Ethereum',
    time: '6h ago',
    category: 'rebalancing',
    read: false,
  },
  {
    id: 'n4',
    status: 'warning',
    title: 'Rule paused automatically: Slippage Guard triggered',
    description: 'USDT Ceiling: Slippage 1.2% exceeded 0.8% limit. Rule paused.',
    time: '1d ago',
    category: 'compliance',
    read: true,
  },
  {
    id: 'n5',
    status: 'success',
    title: 'System health check completed',
    description: 'All bridge providers operational. ETH / Arbitrum RPC connected.',
    time: '2d ago',
    category: 'system',
    read: true,
  },
  {
    id: 'n6',
    status: 'success',
    title: 'Smart Account activated',
    description: 'Your Smart Account is now active. Rebalancing rules are enabled.',
    time: '1w ago',
    category: 'system',
    read: true,
  },
]

export const notificationsStore = createStore<NotificationItem[]>(initialNotifications)

export function markAllRead() {
  notificationsStore.setState(prev => prev.map(n => ({ ...n, read: true })))
}

export function markRead(id: string) {
  notificationsStore.setState(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
}

export function getUnreadCount(notifications: NotificationItem[]) {
  return notifications.filter(n => !n.read).length
}
