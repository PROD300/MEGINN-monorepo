import { useState } from 'react'
import { WifiOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import { registerScreen } from '../registry'
import { networkStatusStore, setAllConnected, type ConnectionStatus } from '../../data/network'
import { showToast } from '../../lib/toast'
import styles from './NetworkError.module.css'

const dotClass: Record<ConnectionStatus, string> = {
  disconnected: styles.statusDotError,
  unknown: styles.statusDotUnknown,
  connected: styles.statusDotConnected,
}

const labelClass: Record<ConnectionStatus, string> = {
  disconnected: styles.statusLabelError,
  unknown: styles.statusLabelUnknown,
  connected: styles.statusLabelConnected,
}

const statusSuffix: Record<ConnectionStatus, string> = {
  disconnected: 'Disconnected',
  unknown: 'Unknown',
  connected: 'Connected',
}

export function NetworkError() {
  const navigate = useNavigate()
  const connections = networkStatusStore.useStore()
  const [retrying, setRetrying] = useState(false)
  const [attempted, setAttempted] = useState(false)

  function handleRetry() {
    setRetrying(true)
    setTimeout(() => {
      setRetrying(false)
      if (!attempted) {
        setAttempted(true)
        showToast('error', 'Still unable to reach Ethereum RPC. Retrying again may help after a brief outage.')
        return
      }
      setAllConnected()
      showToast('success', 'Reconnected to all networks')
      navigate('/portfolio')
    }, 900)
  }

  return (
    <div className={styles.screen}>
      <div className={styles.body}>
        <main className={styles.main}>
          <div className={styles.errorCard}>
            <div className={styles.iconWrap}>
              <WifiOff size={24} />
            </div>
            <span className={styles.title}>Network Error</span>
            <span className={styles.subtitle}>Unable to connect to the blockchain network. Portfolio data may be stale.</span>

            <div className={styles.divider} />

            <div className={styles.networkStatus}>
              <span className={styles.statusHeading}>Connection Status</span>
              {connections.map(row => (
                <div key={row.name} className={styles.statusRow}>
                  <span className={[styles.statusDot, dotClass[row.status]].join(' ')} />
                  <span className={labelClass[row.status]}>{row.name} — {statusSuffix[row.status]}</span>
                </div>
              ))}
            </div>

            <div className={styles.divider} />

            <div className={styles.troubleshooting}>
              <span className={styles.troubleshootingHeading}>Troubleshooting</span>
              <span className={styles.troubleshootingItem}>1. Check your internet connection</span>
              <span className={styles.troubleshootingItem}>2. RPC providers may be experiencing downtime</span>
              <span className={styles.troubleshootingItem}>3. Try switching to a backup RPC in Settings</span>
              <span className={styles.troubleshootingItem}>4. Your assets are safe — automation is paused during outages</span>
            </div>

            <div className={styles.cta}>
              <Button variant="primary" size="sm" className={styles.ctaButton} onClick={handleRetry} loading={retrying} disabled={retrying} data-track="retry-connection">Retry Connection</Button>
              <Button variant="primary" size="sm" className={styles.ctaButton} onClick={() => navigate('/settings')} disabled={retrying}>Go to Settings</Button>
            </div>

            <a href="#" className={styles.statusLink} onClick={e => { e.preventDefault(); navigate('/cross-chain-bridge') }}>Check provider status →</a>
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'network-error',
  name: 'Network Error',
  description: 'Blockchain connectivity error card with connection status and troubleshooting steps',
  route: '/network-error',
  component: NetworkError,
})
