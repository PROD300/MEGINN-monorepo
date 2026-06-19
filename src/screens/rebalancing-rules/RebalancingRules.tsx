import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppTopBar, AppSidebar, Tabs, Badge, Button } from '../../components'
import { registerScreen } from '../registry'
import { rulesStore, toggleRulePause, type Rule } from '../../data/rules'
import { showToast } from '../../lib/toast'
import styles from './RebalancingRules.module.css'

type TabValue = 'all' | 'active' | 'paused' | 'cross-chain'

function RuleCard({ rule }: { rule: Rule }) {
  const navigate = useNavigate()

  function handleSecondaryAction(e: React.MouseEvent) {
    e.preventDefault()
    toggleRulePause(rule.id)
    showToast('success', `${rule.name} ${rule.secondaryAction === 'Pause' ? 'paused' : 'resumed'}`)
  }

  return (
    <div className={[styles.ruleCard, rule.crossChain ? styles.ruleCardCrossChain : ''].join(' ')}>
      <div className={styles.ruleLeft} onClick={() => navigate(`/rule-detail/${rule.id}`)} style={{ cursor: 'pointer' }}>
        <span className={styles.ruleName}>{rule.name}</span>
        <span className={styles.ruleDescription}>{rule.description}</span>
        <span className={styles.ruleNetwork}>{rule.network}</span>
      </div>
      <div className={styles.ruleRight}>
        <span className={styles.ruleLastTriggered}>{rule.lastTriggered}</span>
        <Badge variant={rule.status}>{rule.status}</Badge>
        <div className={styles.ruleActions}>
          <a href="#" className={styles.actionEdit} onClick={e => { e.preventDefault(); navigate('/rule-create') }}>Edit</a>
          <a href="#" className={styles.actionSecondary} onClick={handleSecondaryAction}>{rule.secondaryAction}</a>
        </div>
      </div>
    </div>
  )
}

export function RebalancingRules() {
  const navigate = useNavigate()
  const rules = rulesStore.useStore()
  const [tab, setTab] = useState<TabValue>('all')

  const activeCount = rules.filter(r => r.secondaryAction === 'Pause').length
  const pausedCount = rules.filter(r => r.secondaryAction === 'Resume').length
  const crossChainCount = rules.filter(r => r.crossChain).length

  const visibleRules = rules.filter(r => {
    if (tab === 'active') return r.secondaryAction === 'Pause'
    if (tab === 'paused') return r.secondaryAction === 'Resume'
    if (tab === 'cross-chain') return r.crossChain
    return true
  })

  return (
    <div className={styles.screen}>
      <AppTopBar />

      <div className={styles.body}>
        <AppSidebar active="rebalancing" />

        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeader}>
            <span className={styles.pageTitle}>Rebalancing Rules</span>
            <Button variant="primary" size="md" onClick={() => navigate('/rule-create')}>+ Create Rule</Button>
          </div>

          {/* TabsBar */}
          <Tabs
            tabs={[
              { label: `All (${rules.length})`, value: 'all' },
              { label: `Active (${activeCount})`, value: 'active' },
              { label: `Paused (${pausedCount})`, value: 'paused' },
              { label: 'Error (0)', value: 'error' },
              { label: `Cross-chain (${crossChainCount})`, value: 'cross-chain' },
            ]}
            active={tab}
            onChange={value => setTab(value as TabValue)}
          />

          {/* RulesList */}
          <div className={styles.rulesList}>
            {visibleRules.length === 0 && (
              <div className={styles.emptyState}>No rules match this filter.</div>
            )}
            {visibleRules.map(rule => (
              <RuleCard key={rule.id} rule={rule} />
            ))}
          </div>

          {/* FooterStats */}
          <div className={styles.footerStats}>
            <span>Automation volume: $6 000 000 managed in last 24h</span>
            <span>Cross-chain: $2 100 000 bridged · Bridge: Li.Fi | Next check: in 14 min</span>
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'rebalancing-rules',
  name: 'Rebalancing Rules',
  description: 'Rule list with tabs filter, rule cards, automation footer stats',
  route: '/rebalancing-rules',
  component: RebalancingRules,
})
