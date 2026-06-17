import { Bell, OctagonAlert } from 'lucide-react'
import styles from './AppTopBar.module.css'

interface AppTopBarProps {
  userName?: string
  initials?: string
  hasNotification?: boolean
  onStopAll?: () => void
}

export function AppTopBar({
  userName = 'James Harrington',
  initials = 'JH',
  hasNotification = true,
  onStopAll,
}: AppTopBarProps) {
  return (
    <header className={styles.topbar}>
      <span className={styles.logo}>OBSIDIAN</span>
      <span className={styles.spacer} />
      <button className={styles.stopBtn} onClick={onStopAll}>
        <OctagonAlert size={12} /> Stop All
      </button>
      <span className={styles.notif}>
        <Bell size={18} />
        {hasNotification && <span className={styles.notifDot} />}
      </span>
      <span className={styles.userName}>{userName}</span>
      <span className={styles.avatar}>{initials}</span>
    </header>
  )
}
