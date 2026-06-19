import { WifiOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppTopBar, AppSidebar, Button } from '../../components'
import { registerScreen } from '../registry'
import styles from './NetworkError.module.css'

interface StatusRowData {
  label: string
  state: 'error' | 'unknown'
}

const statusRows: StatusRowData[] = [
  { label: 'Ethereum RPC — Disconnected', state: 'error' },
  { label: 'Arbitrum RPC — Disconnected', state: 'error' },
  { label: 'Bridge Provider (Li.Fi) — Unknown', state: 'unknown' },
]

export function NetworkError() {
  const navigate = useNavigate()

  return (
    <div className={styles.screen}>
      <AppTopBar />

      <div className={styles.body}>
        <AppSidebar active="portfolio" />

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
              {statusRows.map(row => (
                <div key={row.label} className={styles.statusRow}>
                  <span className={[styles.statusDot, row.state === 'error' ? styles.statusDotError : styles.statusDotUnknown].join(' ')} />
                  <span className={row.state === 'error' ? styles.statusLabelError : styles.statusLabelUnknown}>{row.label}</span>
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
              <Button variant="primary" size="sm" className={styles.ctaButton}>Retry Connection</Button>
              <Button variant="primary" size="sm" className={styles.ctaButton} onClick={() => navigate('/settings')}>Go to Settings</Button>
            </div>

            <a href="#" className={styles.statusLink}>Check provider status →</a>
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
