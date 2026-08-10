import { createStore } from './store'

/* [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
   Represents live RPC/bridge-provider connection status. In production
   this would come from actually pinging Ethereum/Arbitrum RPC endpoints
   and Li.Fi; here it's static seed data flipped by setAllConnected(). */

export type ConnectionStatus = 'connected' | 'disconnected' | 'unknown'

export interface NetworkConnection {
  name: string
  status: ConnectionStatus
}

const initialConnections: NetworkConnection[] = [
  { name: 'Ethereum RPC', status: 'disconnected' },
  { name: 'Arbitrum RPC', status: 'disconnected' },
  { name: 'Bridge Provider (Li.Fi)', status: 'unknown' },
]

export const networkStatusStore = createStore<NetworkConnection[]>(initialConnections)

export function setAllConnected() {
  networkStatusStore.setState(prev => prev.map(c => ({ ...c, status: 'connected' })))
}

export function isFullyConnected(connections: NetworkConnection[]) {
  return connections.every(c => c.status === 'connected')
}
