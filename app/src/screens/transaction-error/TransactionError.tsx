import { AlertTriangle, PauseCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge, Button, ActivityRow } from '../../components'
import { registerScreen } from '../registry'
import { rulesStore } from '../../data/rules'
import styles from './TransactionError.module.css'

export function TransactionError() {
  const navigate = useNavigate()
  const { ruleId } = useParams<{ ruleId?: string }>()
  const rules = rulesStore.useStore()
  const rule = rules.find(r => r.id === (ruleId ?? 'usdt-ceiling'))

  if (!rule) {
    return (
      <div className={styles.screen}>
        <div className={styles.body}>
          <main className={styles.main}>
            <div className={styles.notFoundWrap}>
              <div className={styles.notFoundCard}>
                <span className={styles.errorTitle}>No failed transaction found</span>
                <Button variant="primary" size="sm" onClick={() => navigate('/rebalancing-rules')}>Back to Rules</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
  // Represents a real transaction receipt / RPC error payload from a
  // failed on-chain swap. Derived here purely from local mock rule state.
  const detailRows = [
    { label: 'Rule triggered:', value: rule.name },
    { label: 'Attempted action:', value: `${rule.action} — ${rule.sellFrom} → ${rule.sellInto}` },
    { label: 'Network:', value: rule.network },
    { label: 'Failure reason:', value: `Slippage exceeded configured limit of ${rule.maxSlippage}%`, isError: true },
    { label: 'Gas limit configured:', value: `${rule.maxGasPrice} Gwei` },
    { label: 'Bridge involved:', value: rule.crossChain ? 'Yes — via Li.Fi' : 'No (same-chain)' },
    { label: 'Last triggered:', value: rule.lastTriggered.replace(/^Last triggered:\s*/i, '') },
  ]

  return (
    <div className={styles.screen}>
      <div className={styles.body}>
        <main className={styles.main}>
          <div className={styles.errorBody}>
            {/* ErrorCardCol */}
            <div className={styles.errorCardCol}>
              <div className={styles.errorHeader}>
                <span className={styles.alertIcon}>
                  <AlertTriangle size={26} />
                </span>
                <span className={styles.errorTitle}>Transaction Failed</span>
                <Badge variant="success">Slippage Exceeded</Badge>
              </div>

              <div className={styles.divider} />

              <div className={styles.txDetailsCard}>
                <span className={styles.cardTitle}>Failed Transaction Details</span>
                {detailRows.map(row => (
                  <div className={styles.detailRow} key={row.label}>
                    <span className={styles.detailLabel}>{row.label}</span>
                    <span className={row.isError ? styles.detailValueError : styles.detailValue}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div className={styles.autoPausedBanner}>
                <PauseCircle size={16} className={styles.warnIcon} />
                <span className={styles.warnText}>
                  Rule automatically paused. {rule.name} will not execute until you review and resume it.
                </span>
              </div>

              <div className={styles.cta}>
                <Button variant="primary" size="sm" className={styles.ctaBtn} onClick={() => navigate(`/rule-detail/${rule.id}`)}>Review Rule Settings</Button>
                <Button variant="primary" size="sm" className={styles.ctaBtn} onClick={() => navigate('/rebalancing-rules')}>Back to Rules</Button>
                <Button variant="primary" size="sm" className={styles.ctaBtn} onClick={() => navigate('/audit-log')}>View in Audit Log</Button>
              </div>
            </div>

            {/* SideColumn */}
            <div className={styles.sideColumn}>
              <div className={styles.preventionCard}>
                <span className={styles.cardTitle}>How to Resolve</span>
                <span className={styles.stepText}>1. Review the current slippage conditions</span>
                <span className={styles.stepText}>2. Consider increasing slippage tolerance (current: {rule.maxSlippage}%)</span>
                <span className={styles.stepText}>3. Or wait for lower volatility before resuming</span>
                <span className={styles.stepText}>4. Resume rule from Rebalancing Rules screen</span>
                <div className={styles.divider} />
                <span className={styles.safeText}>Assets are safe — no transaction executed.</span>
              </div>

              <div className={styles.relatedEvents}>
                <span className={styles.cardTitle}>Related Events</span>
                <ActivityRow
                  status="warning"
                  description={`Rule paused — ${rule.name}`}
                  time="1d ago"
                  statusLabel="Paused"
                />
                <ActivityRow
                  status="success"
                  description="Gas skipped — ETH Balance Guard"
                  time="2d ago"
                  statusLabel="Success"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'transaction-error',
  name: 'Transaction Failed',
  description: 'Failed transaction details, auto-pause notice, resolution steps, related events',
  route: '/transaction-error/:ruleId?',
  component: TransactionError,
})
