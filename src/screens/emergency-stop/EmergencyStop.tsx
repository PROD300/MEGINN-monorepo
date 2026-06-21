import { useState } from 'react'
import { OctagonAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppTopBar, AppSidebar, Button, Input } from '../../components'
import { registerScreen } from '../registry'
import { rulesStore, pauseAllRules } from '../../data/rules'
import { bridgeStore, cancelAllPendingBridges } from '../../data/bridge'
import { gasReserveStore } from '../../data/gas'
import { showToast } from '../../lib/toast'
import { formatUsd } from '../../lib/format'
import styles from './EmergencyStop.module.css'

export function EmergencyStop() {
  const navigate = useNavigate()
  const rules = rulesStore.useStore()
  const bridges = bridgeStore.useStore()
  const gasReserve = gasReserveStore.useStore()
  const [confirmText, setConfirmText] = useState('')
  const [stopping, setStopping] = useState(false)
  const canConfirm = confirmText === 'STOP'

  const activeRulesCount = rules.filter(r => r.secondaryAction === 'Pause').length
  const activeBridgeCount = bridges.filter(b => b.status === 'pending').length

  function handleStopAll() {
    setStopping(true)
    setTimeout(() => {
      pauseAllRules()
      cancelAllPendingBridges()
      showToast('warning', 'All automated operations stopped. Rules paused, pending bridges cancelled.')
      navigate('/portfolio')
    }, 800)
  }

  return (
    <div className={styles.screen}>
      <AppTopBar />

      <div className={styles.body}>
        <AppSidebar active="settings" />

        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeader}>
            <OctagonAlert size={24} className={styles.icon} />
            <span className={styles.title}>Emergency Stop</span>
          </div>

          {/* WarningBanner */}
          <div className={styles.warningBanner}>
            <span className={styles.warningIcon} />
            <span className={styles.warningText}>
              This action will immediately halt ALL automated operations: rebalancing rules, bridge transactions, and scheduled checks.
            </span>
          </div>

          {/* StopContentArea */}
          <div className={styles.contentArea}>
            {/* ImpactColumn */}
            <div className={styles.impactColumn}>
              <div className={styles.statusCard}>
                <span className={styles.cardTitle}>Current Active Operations</span>

                <div className={styles.impactRow}>
                  <span className={styles.impactLabel}>Active rebalancing rules: {activeRulesCount}</span>
                  <span className={styles.impactValue}>{activeRulesCount > 0 ? '→ Will be paused' : '— none running'}</span>
                </div>
                <div className={styles.impactRow}>
                  <span className={styles.impactLabel}>Active bridge operations: {activeBridgeCount}</span>
                  <span className={styles.impactValue}>{activeBridgeCount > 0 ? '→ Will be cancelled' : '— none in progress'}</span>
                </div>
                <div className={styles.impactRow}>
                  <span className={styles.impactLabel}>Gas reserve balance: {formatUsd(gasReserve.balanceUsd)}</span>
                  <span className={styles.impactValue}>→ Reserved</span>
                </div>

                <div className={styles.divider} />

                <span className={styles.cardFootnote}>
                  After stop: all rules set to PAUSED. No transactions will execute until manually resumed.
                </span>
              </div>

              <div className={styles.recoveryCard}>
                <span className={styles.cardTitle}>Recovery</span>
                <span className={styles.recoveryIntro}>To resume operations after Emergency Stop:</span>
                <span className={styles.recoveryStep}>1. Review why stop was triggered</span>
                <span className={styles.recoveryStep}>2. Check network/gas conditions</span>
                <span className={styles.recoveryStep}>3. Re-activate rules one by one in Rebalancing Rules</span>
                <span className={styles.recoveryNote}>Assets remain in your wallet at all times during stop.</span>
              </div>
            </div>

            {/* ConfirmColumn */}
            <div className={styles.confirmColumn}>
              <div className={styles.confirmCard}>
                <span className={styles.stopIcon}>
                  <OctagonAlert size={22} />
                </span>
                <span className={styles.confirmTitle}>Stop All Operations?</span>
                <span className={styles.confirmSubtitle}>
                  This cannot be undone automatically. You will need to manually re-enable each rule.
                </span>

                <div className={styles.confirmDivider} />

                <div className={styles.confirmInput}>
                  <span className={styles.confirmInputLabel}>Type STOP to confirm</span>
                  <Input placeholder="STOP" value={confirmText} onChange={e => setConfirmText(e.target.value)} />
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  className={styles.fullWidth}
                  disabled={!canConfirm || stopping}
                  loading={stopping}
                  onClick={handleStopAll}
                >
                  Stop All Operations
                </Button>
                <Button variant="primary" size="sm" className={styles.fullWidth} onClick={() => navigate('/portfolio')} disabled={stopping}>Cancel — Keep Running</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'emergency-stop',
  name: 'Emergency Stop',
  description: 'Halt all automated operations — impact summary, recovery steps, confirm dialog',
  route: '/emergency-stop',
  component: EmergencyStop,
})
