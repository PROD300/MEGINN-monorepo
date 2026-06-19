import { Bell, OctagonAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { profileStore, getInitials } from '../../data/profile'
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
  hasNotification = true,
  onStopAll,
}: AppTopBarProps) {
  const navigate = useNavigate()
  const profile = profileStore.useStore()
  const displayName = userName ?? profile.fullName
  const displayInitials = initials ?? getInitials(profile.fullName)

  return (
    <header className={styles.topbar}>
      <span className={styles.logo} onClick={() => navigate('/portfolio')} style={{ cursor: 'pointer' }}>OBSIDIAN</span>
      <span className={styles.spacer} />
      <button className={styles.stopBtn} onClick={onStopAll ?? (() => navigate('/emergency-stop'))}>
        <OctagonAlert size={12} /> Stop All
      </button>
      <button className={styles.notif} onClick={() => navigate('/notifications')}>
        <Bell size={18} />
        {hasNotification && <span className={styles.notifDot} />}
      </button>
      <button className={styles.userMenu} onClick={() => navigate('/settings')}>
        <span className={styles.userName}>{displayName}</span>
        <span className={styles.avatar}>{displayInitials}</span>
      </button>
    </header>
  )
}
