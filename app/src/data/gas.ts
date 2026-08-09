import { createStore } from './store'

export interface GasReserve {
  balanceUsd: number
}

export const GAS_RESERVE_MINIMUM_USD = 500

// Seeded below the minimum so the low-balance edge case (banner + blocked
// activation) is visible by default without extra setup steps.
export const gasReserveStore = createStore<GasReserve>({ balanceUsd: 180 })

export function isGasReserveLow(balanceUsd: number) {
  return balanceUsd < GAS_RESERVE_MINIMUM_USD
}

export function topUpGasReserve(amountUsd: number) {
  gasReserveStore.setState(prev => ({ balanceUsd: prev.balanceUsd + amountUsd }))
}
