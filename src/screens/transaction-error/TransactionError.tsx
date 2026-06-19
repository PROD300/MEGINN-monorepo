import { AlertTriangle, PauseCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppTopBar, AppSidebar, Badge, Button, ActivityRow } from '../../components'
import { registerScreen } from '../registry'
import styles from './TransactionError.module.css'

const detailRows = [
  { label: 'Rule triggered:', value: 'USDT Ceiling' },
  { label: 'Attempted action:', value: 'Sell $30 000 000 USDT → USDC' },
  { label: 'Network:', value: 'Arbitrum' },
  { label: 'Failure reason:', value: 'Slippage 2.1% exceeded limit 0.8%', isError: true },
  { label: 'Gas at execution:', value: '22 Gwei (within limit)' },
  { label: 'Bridge involved:', value: 'No (same-chain)' },
  { label: 'Timestamp:', value: 'Jun 15, 2026 · 19:55 UTC' },
]

export function TransactionError() {
  const navigate = useNavigate()

  return (
    <div className={styles.screen}>
      <AppTopBar />

      <div className={styles.body}>
        <AppSidebar active="liability" />

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
                  Rule automatically paused. USDT Ceiling will not execute until you review and resume it.
                </span>
              </div>

              <div className={styles.cta}>
                <Button variant="primary" size="sm" className={styles.ctaBtn} onClick={() => navigate('/rule-detail/usdt-ceiling')}>Review Rule Settings</Button>
                <Button variant="primary" size="sm" className={styles.ctaBtn} onClick={() => navigate('/rebalancing-rules')}>Back to Rules</Button>
                <Button variant="primary" size="sm" className={styles.ctaBtn} onClick={() => navigate('/audit-log')}>View in Audit Log</Button>
              </div>
            </div>

            {/* SideColumn */}
            <div className={styles.sideColumn}>
              <div className={styles.preventionCard}>
                <span className={styles.cardTitle}>How to Resolve</span>
                <span className={styles.stepText}>1. Review the current slippage conditions</span>
                <span className={styles.stepText}>2. Consider increasing slippage tolerance (current: 0.8%)</span>
                <span className={styles.stepText}>3. Or wait for lower volatility before resuming</span>
                <span className={styles.stepText}>4. Resume rule from Rebalancing Rules screen</span>
                <div className={styles.divider} />
                <span className={styles.safeText}>Assets are safe — no transaction executed.</span>
              </div>

              <div className={styles.relatedEvents}>
                <span className={styles.cardTitle}>Related Events</span>
                <ActivityRow
                  status="success"
                  description="Rule paused — USDT Ceiling"
                  time="1d ago · 2h ago"
                  statusLabel="Success"
                />
                <ActivityRow
                  status="success"
                  description="Gas skipped — ETH Balance Guard"
                  time="2d ago · 2h ago"
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
  route: '/transaction-error',
  component: TransactionError,
})
