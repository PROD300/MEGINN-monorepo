import { useNavigate, useParams } from 'react-router-dom'
import { TopNav, Badge, Button, Card, Table } from '../../components'
import { registerScreen } from '../registry'
import { rulesStore, toggleRulePause } from '../../data/rules'
import { showToast } from '../../lib/toast'
import styles from './RuleDetail.module.css'

const historyColumns = [
  { key: 'timestamp', header: 'Timestamp', render: (row: Record<string, unknown>) => <span className="ds-numeric">{String(row.timestamp)}</span> },
  { key: 'triggeredAt', header: 'Triggered At', render: (row: Record<string, unknown>) => <span className="ds-numeric">{String(row.triggeredAt)}</span> },
  { key: 'action', header: 'Action' },
  { key: 'amount', header: 'Amount', render: (row: Record<string, unknown>) => <span className="ds-numeric">{String(row.amount)}</span> },
  { key: 'gas', header: 'Gas', render: (row: Record<string, unknown>) => <span className="ds-numeric">{String(row.gas)}</span> },
  { key: 'result', header: 'Result' },
]

// [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
// Represents on-chain execution history for this rule, normally sourced
// from a chain indexer/backend. Hardcoded seed rows, never updated.
const historyRows = [
  { timestamp: 'Jun 16, 14:22', triggeredAt: 'ETH 32.1%', action: 'Sell ETH → USDC', amount: '$4 200 000', gas: '22 Gwei', result: 'Success' },
  { timestamp: 'Jun 15, 22:10', triggeredAt: 'ETH 32.4%', action: 'Sell ETH → USDC', amount: '$5 100 000', gas: '23 Gwei', result: 'Success' },
  { timestamp: 'Jun 14, 08:55', triggeredAt: 'ETH 33.0%', action: 'Sell ETH → USDC', amount: '$6 800 000', gas: '28 Gwei', result: 'Skipped — Gas' },
  { timestamp: 'Jun 12, 16:40', triggeredAt: 'ETH 32.5%', action: 'Sell ETH → USDC', amount: '$4 700 000', gas: '21 Gwei', result: 'Success' },
  { timestamp: 'Jun 10, 09:15', triggeredAt: 'ETH 32.8%', action: 'Sell ETH → USDC', amount: '$5 600 000', gas: '20 Gwei', result: 'Success' },
] as Record<string, unknown>[]

export function RuleDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const rules = rulesStore.useStore()
  const rule = rules.find(r => r.id === id)

  if (!rule) {
    return (
      <div className={styles.screen}>
        <TopNav active="rebalancing" />
        <div className={styles.body}>
          <main className={styles.main}>
            <div className={styles.pageHeaderWrap}>
              <div className={styles.pageHeader}>
                <span className={styles.title}>Rule not found</span>
              </div>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/rebalancing-rules')}>Back to Rebalancing Rules</Button>
          </main>
        </div>
      </div>
    )
  }

  const isPaused = rule.secondaryAction === 'Resume'
  const ruleId = rule.id
  const ruleName = rule.name

  // [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
  // Pause/Resume would normally submit an on-chain state change for the
  // automation contract. toggleRulePause() just mutates local store state.
  function handlePauseToggle() {
    toggleRulePause(ruleId)
    showToast('success', `${ruleName} ${isPaused ? 'resumed' : 'paused'}`)
  }

  return (
    <div className={styles.screen}>
      <TopNav active="rebalancing" />

      <div className={styles.body}>
        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeaderWrap}>
            <div className={styles.pageHeader}>
              <div className={styles.breadcrumb}>
                <span className={styles.breadcrumbAccent} onClick={() => navigate('/rebalancing-rules')} style={{ cursor: 'pointer' }}>Rebalancing Rules</span>
                <span className={styles.breadcrumbMuted}>›</span>
                <span className={styles.breadcrumbMuted}>{rule.name}</span>
              </div>
              <div className={styles.titleRow}>
                <span className={styles.title}>{rule.name}</span>
                <Badge variant={isPaused ? 'warning' : 'success'}>{isPaused ? 'Paused' : 'Active'}</Badge>
                {isPaused && (
                  <a href="#" className={styles.secLink} onClick={e => { e.preventDefault(); navigate(`/transaction-error/${ruleId}`) }}>View failure details →</a>
                )}
                <span className={styles.spacer} />
                <Button variant="primary" size="sm" onClick={() => navigate('/rule-create')}>Edit Rule</Button>
                <Button variant="primary" size="sm" onClick={handlePauseToggle}>{isPaused ? 'Resume Rule' : 'Pause Rule'}</Button>
              </div>
            </div>
          </div>

          {/* RuleOverviewSection */}
          <div className={styles.overviewSection}>
            <Card
              className={styles.overviewCard}
              title="Rule Overview"
              description={`${rule.description}. Executes automatically within configured safety bounds — no manual approval required.`}
              action="View trigger conditions →"
            />

            <div className={styles.executionCard}>
              <span className={styles.execTitle}>Execution Settings</span>
              <div className={styles.lvRow}>
                <span className={styles.lvLabel}>Target allocation</span>
                <span className={styles.lvValue}>{rule.targetAllocation}%</span>
              </div>
              <div className={styles.lvRow}>
                <span className={styles.lvLabel}>Max slippage</span>
                <span className={styles.lvValue}>{rule.maxSlippage}%</span>
              </div>
              <div className={styles.lvRow}>
                <span className={styles.lvLabel}>Max gas price</span>
                <span className={styles.lvValue}>{rule.maxGasPrice} Gwei</span>
              </div>
              <div className={styles.lvRow}>
                <span className={styles.lvLabel}>Execution</span>
                <span className={styles.lvValue}>Any time</span>
              </div>
              <div className={styles.lvRow}>
                <span className={styles.lvLabel}>Cross-chain</span>
                <span className={styles.lvValueAccent}>{rule.crossChain ? 'Yes — via Li.Fi' : 'No (same-chain)'}</span>
              </div>
              <span className={styles.execFootnote}>Bridge fee included in slippage tolerance</span>
            </div>
          </div>

          {/* ExecutionHistorySection */}
          <div className={styles.historySection}>
            <div className={styles.secHeader}>
              <span className={styles.secTitle}>Execution History</span>
              <a href="#" className={styles.secLink} onClick={e => { e.preventDefault(); navigate('/audit-log') }}>View full audit log →</a>
            </div>
            <Table columns={historyColumns} rows={historyRows} />
          </div>

          {/* FooterStats */}
          <div className={styles.footerStatsWrap}>
            <div className={styles.footerStats}>
              Total executed: 4 times · Total volume: $20.6M · Avg execution: 40 sec
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'rule-detail',
  name: 'Rule Detail',
  description: 'Rule overview, execution settings, execution history table',
  route: '/rule-detail/:id',
  component: RuleDetail,
})
