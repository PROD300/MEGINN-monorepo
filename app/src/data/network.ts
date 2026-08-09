import { createStore } from './store'

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
