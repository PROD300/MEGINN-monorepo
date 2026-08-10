import { createStore } from './store'

/* [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
   Represents the smart account's on-chain gas reserve balance. In
   production this would be read from the chain; here it's a fixed seed
   value that topUpGasReserve() adds to in local memory. */

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
