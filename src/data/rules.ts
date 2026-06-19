import { createStore } from './store'

export interface Rule {
  id: string
  name: string
  description: string
  network: string
  lastTriggered: string
  status: 'success' | 'warning'
  secondaryAction: 'Pause' | 'Resume'
  crossChain?: boolean
  asset: string
  conditionOp: string
  threshold: number
  action: string
  sellFrom: string
  sellInto: string
  targetNetwork: string
  targetAllocation: number
  maxSlippage: number
  maxGasPrice: number
}

const initialRules: Rule[] = [
  {
    id: 'eth-balance-guard',
    name: 'ETH Balance Guard',
    description: 'ETH allocation > 32% → sell excess to USDC',
    network: 'Arbitrum',
    lastTriggered: 'Last triggered: 2h ago',
    status: 'success',
    secondaryAction: 'Pause',
    asset: 'ETH', conditionOp: '>', threshold: 35, action: 'Sell to rebalance',
    sellFrom: 'ETH', sellInto: 'USDC', targetNetwork: 'Arbitrum',
    targetAllocation: 30, maxSlippage: 0.8, maxGasPrice: 25,
  },
  {
    id: 'steth-target-allocation',
    name: 'stETH Target Allocation',
    description: 'stETH < 18% → buy stETH from ETH',
    network: 'Ethereum',
    lastTriggered: 'Last triggered: 6h ago',
    status: 'success',
    secondaryAction: 'Pause',
    asset: 'stETH', conditionOp: '<', threshold: 18, action: 'Buy to rebalance',
    sellFrom: 'ETH', sellInto: 'stETH', targetNetwork: 'Ethereum',
    targetAllocation: 20, maxSlippage: 0.6, maxGasPrice: 25,
  },
  {
    id: 'rwa-cross-chain-rebalance',
    name: 'RWA Cross-chain Rebalance',
    description: 'RWA < 50% → buy RWA from USDC via Bridge',
    network: 'Cross-chain: ETH → ARB',
    lastTriggered: 'Last triggered: 3h ago',
    status: 'success',
    secondaryAction: 'Pause',
    crossChain: true,
    asset: 'RWA', conditionOp: '<', threshold: 50, action: 'Buy to rebalance',
    sellFrom: 'USDC', sellInto: 'RWA', targetNetwork: 'Arbitrum',
    targetAllocation: 50, maxSlippage: 0.8, maxGasPrice: 25,
  },
  {
    id: 'usdt-ceiling',
    name: 'USDT Ceiling',
    description: 'USDT > 6% → sell USDT to USDC',
    network: 'Arbitrum',
    lastTriggered: 'Last triggered: 1d ago',
    status: 'warning',
    secondaryAction: 'Resume',
    asset: 'USDT', conditionOp: '>', threshold: 6, action: 'Sell to rebalance',
    sellFrom: 'USDT', sellInto: 'USDC', targetNetwork: 'Arbitrum',
    targetAllocation: 5, maxSlippage: 0.8, maxGasPrice: 25,
  },
]

export const rulesStore = createStore<Rule[]>(initialRules)

function slugify(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export type NewRule = Omit<Rule, 'id' | 'status' | 'secondaryAction' | 'lastTriggered'>

export function addRule(rule: NewRule, asDraft = false) {
  const id = slugify(rule.name) || `rule-${Date.now()}`
  rulesStore.setState(prev => [
    {
      ...rule,
      id,
      status: asDraft ? 'warning' : 'success',
      secondaryAction: asDraft ? 'Resume' : 'Pause',
      lastTriggered: asDraft ? 'Not triggered yet (draft)' : 'Not triggered yet',
    },
    ...prev,
  ])
  return id
}

export function toggleRulePause(id: string) {
  rulesStore.setState(prev => prev.map(r => r.id === id
    ? {
        ...r,
        status: r.secondaryAction === 'Pause' ? 'warning' : 'success',
        secondaryAction: r.secondaryAction === 'Pause' ? 'Resume' : 'Pause',
      }
    : r))
}

export function pauseAllRules() {
  rulesStore.setState(prev => prev.map(r => ({ ...r, status: 'warning', secondaryAction: 'Resume' })))
}

export function getRuleById(id: string | undefined) {
  if (!id) return undefined
  return rulesStore.getState().find(r => r.id === id)
}

export function ruleNameExists(name: string) {
  return rulesStore.getState().some(r => r.name.toLowerCase() === name.trim().toLowerCase())
}
