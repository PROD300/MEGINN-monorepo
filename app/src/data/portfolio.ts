import { createStore } from './store'
import { getRuleById } from './rules'
import { formatUsd } from '../lib/format'

export interface AllocationEntry {
  asset: string
  valueUsd: number
}

export type ActivityStatus = 'success' | 'warning' | 'info'

export interface ActivityEntry {
  id: string
  status: ActivityStatus
  description: string
  time: string
  statusLabel: string
}

// Sums to $487,350,000 to match the seeded Total AUM; ETH sits 2% above the
// eth-balance-guard threshold (35%) so the allocation banner has a real
// trigger to react to out of the box.
const initialAllocation: AllocationEntry[] = [
  { asset: 'ETH', valueUsd: 180_319_500 },
  { asset: 'RWA', valueUsd: 219_307_500 },
  { asset: 'stETH', valueUsd: 38_988_000 },
  { asset: 'USDT', valueUsd: 34_114_500 },
  { asset: 'USDC', valueUsd: 14_620_500 },
]

const initialActivity: ActivityEntry[] = [
  {
    id: 'seed-1',
    status: 'success',
    description: 'Auto-rebalance: ETH → USDC · $4 200 000',
    time: '2h ago',
    statusLabel: 'Success',
  },
  {
    id: 'seed-2',
    status: 'info',
    description: 'Cross-chain bridge: RWA rebalance — ETH→ARB · $2 100 000',
    time: '3h ago',
    statusLabel: 'Success [Bridge]',
  },
  {
    id: 'seed-3',
    status: 'success',
    description: 'Auto-rebalance: stETH → ETH · $1 800 000',
    time: '6h ago',
    statusLabel: 'Success',
  },
  {
    id: 'seed-4',
    status: 'warning',
    description: 'Rule triggered: Slippage Guard — paused USDT rule',
    time: '1d ago',
    statusLabel: 'Warning',
  },
]

export const allocationStore = createStore<AllocationEntry[]>(initialAllocation)
export const activityStore = createStore<ActivityEntry[]>(initialActivity)

export function getTotalAUM(allocation: AllocationEntry[]) {
  return allocation.reduce((sum, a) => sum + a.valueUsd, 0)
}

export function addActivity(entry: Omit<ActivityEntry, 'id'>) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  activityStore.setState(prev => [{ ...entry, id }, ...prev])
}

/** Sells ETH down to the eth-balance-guard target, buying USDC with the proceeds. Returns the amount moved, or 0 if ETH is already at/below target. */
export function rebalanceNow() {
  const allocation = allocationStore.getState()
  const total = getTotalAUM(allocation)
  const eth = allocation.find(a => a.asset === 'ETH')
  const targetPct = getRuleById('eth-balance-guard')?.targetAllocation ?? 30
  if (!eth) return 0

  const targetValue = total * (targetPct / 100)
  const excess = eth.valueUsd - targetValue
  if (excess <= 0) return 0

  allocationStore.setState(prev => prev.map(a => {
    if (a.asset === 'ETH') return { ...a, valueUsd: a.valueUsd - excess }
    if (a.asset === 'USDC') return { ...a, valueUsd: a.valueUsd + excess }
    return a
  }))
  addActivity({
    status: 'success',
    description: `Auto-rebalance: ETH → USDC · ${formatUsd(excess)}`,
    time: 'Just now',
    statusLabel: 'Success',
  })
  return excess
}

export function addAsset(asset: string, amountUsd: number) {
  allocationStore.setState(prev => {
    const exists = prev.some(a => a.asset === asset)
    if (exists) return prev.map(a => a.asset === asset ? { ...a, valueUsd: a.valueUsd + amountUsd } : a)
    return [...prev, { asset, valueUsd: amountUsd }]
  })
  addActivity({
    status: 'info',
    description: `Asset added: ${formatUsd(amountUsd)} to ${asset}`,
    time: 'Just now',
    statusLabel: 'Manual',
  })
}
