import { createStore } from './store'

export type BridgeStatus = 'pending' | 'success' | 'failed'

export interface BridgeOperation {
  id: string
  asset: string
  route: string
  amountUsd: number
  provider: string
  status: BridgeStatus
  time: string
}

// One operation seeded in-flight so the Active Bridges / loading state has
// something to show without extra setup; one seeded as failed so the
// success-rate stat isn't a hardcoded 100%.
const initialOperations: BridgeOperation[] = [
  { id: 'b-pending-1', asset: 'RWA', route: 'ETH → Arbitrum', amountUsd: 1_200_000, provider: 'Li.Fi', status: 'pending', time: 'Started 18 sec ago' },
  { id: 'b-1', asset: 'RWA', route: 'ETH → Arbitrum', amountUsd: 2_100_000, provider: 'Li.Fi', status: 'success', time: '3h ago' },
  { id: 'b-2', asset: 'USDC', route: 'ETH → Arbitrum', amountUsd: 500_000, provider: 'Li.Fi', status: 'success', time: '20h ago' },
  { id: 'b-3', asset: 'RWA', route: 'Arbitrum → ETH', amountUsd: 80_000, provider: 'Socket', status: 'failed', time: '2d ago' },
]

export const bridgeStore = createStore<BridgeOperation[]>(initialOperations)

export function isWithin24h(time: string) {
  if (/sec ago|min ago|h ago|Just now|Started/.test(time)) return true
  const days = time.match(/(\d+)d ago/)
  return days ? Number(days[1]) < 1 : false
}

export function completeBridge(id: string) {
  bridgeStore.setState(prev => prev.map(op => op.id === id ? { ...op, status: 'success', time: 'Just now' } : op))
}

export function cancelAllPendingBridges() {
  bridgeStore.setState(prev => prev.map(op => op.status === 'pending'
    ? { ...op, status: 'failed', time: 'Cancelled — Emergency Stop' }
    : op))
}
