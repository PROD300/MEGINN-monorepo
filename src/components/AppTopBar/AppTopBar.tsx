import { Bell, OctagonAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { profileStore, getInitials } from '../../data/profile'
import { notificationsStore, getUnreadCount } from '../../data/notifications'
import styles from './AppTopBar.module.css'

interface AppTopBarProps {
  userName?: string
  initials?: string
  hasNotification?: boolean
  onStopAll?: () => void
}

export function AppTopBar({
  userName,
  initials,
  hasNotification,
  onStopAll,
}: AppTopBarProps) {
  const navigate = useNavigate()
  const profile = profileStore.useStore()
  const notifications = notificationsStore.useStore()
  const displayName = userName ?? profile.fullName
  const displayInitials = initials ?? getInitials(profile.fullName)
  const showDot = hasNotification ?? getUnreadCount(notifications) > 0

  return (
    <header className={styles.topbar}>
      <span className={styles.logo} onClick={() => navigate('/portfolio')} style={{ cursor: 'pointer' }}>OBSIDIAN</span>
      <span className={styles.spacer} />
      <button className={styles.stopBtn} onClick={onStopAll ?? (() => navigate('/emergency-stop'))}>
        <OctagonAlert size={12} /> Stop All
      </button>
      <button className={styles.notif} onClick={() => navigate('/notifications')}>
        <Bell size={18} />
        {showDot && <span className={styles.notifDot} />}
      </button>
      <button className={styles.userMenu} onClick={() => navigate('/settings')}>
        <span className={styles.userName}>{displayName}</span>
        <span className={styles.avatar}>{displayInitials}</span>
      </button>
    </header>
  )
}
