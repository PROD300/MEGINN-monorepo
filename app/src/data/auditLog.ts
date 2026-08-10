import { createStore } from './store'

/* [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
   Stands in for a real compliance audit trail normally sourced from a
   backend/chain indexer. Rows here are hardcoded seed data plus whatever
   addAuditEntry() appends to local state. */

export type AuditResultVariant = 'success' | 'warning' | 'error'

export interface AuditRow {
  id: string
  timestamp: string
  type: string
  rule: string
  asset: string
  amount: string
  network: string
  provider: string
  result: string
  resultVariant: AuditResultVariant
}

const initialRows: AuditRow[] = [
  { id: 'a1', timestamp: 'Jun 16 14:22', type: 'Rebalance', rule: 'ETH Balance Guard', asset: 'ETH→USDC', amount: '$4 200 000', network: 'Arbitrum', provider: 'Li.Fi', result: 'Success', resultVariant: 'success' },
  { id: 'a2', timestamp: 'Jun 16 11:08', type: 'Bridge', rule: 'RWA Cross-chain', asset: 'USDC', amount: '$2 100 000', network: 'ETH→ARB', provider: 'Li.Fi', result: 'Success', resultVariant: 'success' },
  { id: 'a3', timestamp: 'Jun 15 22:10', type: 'Rebalance', rule: 'ETH Balance Guard', asset: 'ETH→USDC', amount: '$5 100 000', network: 'Arbitrum', provider: 'Li.Fi', result: 'Success', resultVariant: 'success' },
  { id: 'a4', timestamp: 'Jun 15 19:55', type: 'Rule Paused', rule: 'USDT Ceiling', asset: '—', amount: '—', network: 'Arbitrum', provider: '—', result: 'Slippage 1.2%', resultVariant: 'warning' },
  { id: 'a5', timestamp: 'Jun 14 08:55', type: 'Rebalance', rule: 'ETH Balance Guard', asset: 'ETH→USDC', amount: '—', network: 'Arbitrum', provider: '—', result: 'Gas Too High', resultVariant: 'error' },
  { id: 'a6', timestamp: 'Jun 12 16:40', type: 'Rebalance', rule: 'ETH Balance Guard', asset: 'ETH→USDC', amount: '$4 700 000', network: 'Arbitrum', provider: 'Li.Fi', result: 'Success', resultVariant: 'success' },
  { id: 'a7', timestamp: 'Jun 10 09:15', type: 'Rebalance', rule: 'stETH Target', asset: 'stETH→ETH', amount: '$1 800 000', network: 'Ethereum', provider: '—', result: 'Success', resultVariant: 'success' },
  { id: 'a8', timestamp: 'Jun 05 12:00', type: 'System', rule: '—', asset: '—', amount: '—', network: '—', provider: '—', result: 'Account activated', resultVariant: 'success' },
]

export const auditLogStore = createStore<AuditRow[]>(initialRows)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Matches the "MMM DD HH:MM" shape parseAuditDate() expects, e.g. "Jun 16 14:22".
function formatAuditTimestamp(d: Date) {
  const day = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${months[d.getMonth()]} ${day} ${hh}:${mm}`
}

export function addAuditEntry(entry: Omit<AuditRow, 'id' | 'timestamp'>) {
  const id = `a-${Date.now()}-${Math.random().toString(36).slice(2)}`
  const timestamp = formatAuditTimestamp(new Date())
  auditLogStore.setState(prev => [{ ...entry, id, timestamp }, ...prev])
}
