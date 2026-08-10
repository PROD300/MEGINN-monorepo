import { Bell, LogOut } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { profileStore, getInitials } from '../../data/profile'
import { notificationsStore, getUnreadCount } from '../../data/notifications'
import styles from './TopNav.module.css'

export type NavItemId = 'portfolio' | 'rebalancing' | 'liability' | 'audit' | 'settings'

interface TopNavProps {
  active?: NavItemId
  userName?: string
  initials?: string
  hasNotification?: boolean
  onStopAll?: () => void
  glow?: 'default' | 'subtle'
}

const primaryNav = [
  { id: 'portfolio' as NavItemId,   label: 'Portfolio',              route: '/portfolio' },
  { id: 'rebalancing' as NavItemId, label: 'Rebalancing Rules',      route: '/rebalancing-rules' },
  { id: 'liability' as NavItemId,   label: 'Liability & Compliance', route: '/liability-dashboard' },
  { id: 'audit' as NavItemId,       label: 'Audit Log',              route: '/audit-log' },
]

export function TopNav({
  active,
  userName,
  initials,
  hasNotification,
  onStopAll,
  glow = 'subtle',
}: TopNavProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const profile = profileStore.useStore()
  const notifications = notificationsStore.useStore()
  const displayName = userName ?? profile.fullName
  const displayInitials = initials ?? getInitials(profile.fullName)
  const showDot = hasNotification ?? getUnreadCount(notifications) > 0
  const activeId = active ?? primaryNav.find(item => item.route === location.pathname)?.id

  return (
    <div className={styles.topnavWrap}>
      <header className={[styles.topnav, glow === 'subtle' ? styles.subtleGlow : ''].join(' ')}>
        <span className={styles.logo} onClick={() => navigate('/portfolio')}>OBSIDIAN</span>

        <nav className={styles.nav}>
          {primaryNav.map(item => (
            <button
              key={item.id}
              className={[styles.navItem, activeId === item.id ? styles.active : ''].join(' ')}
              onClick={() => navigate(item.route)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <span className={styles.spacer} />

        <button className={styles.stopBtn} onClick={onStopAll ?? (() => navigate('/emergency-stop'))}>
          Stop All
        </button>
        <button className={styles.iconBtn} onClick={() => navigate('/notifications')} aria-label="Notifications">
          <Bell size={16} />
          {showDot && <span className={styles.notifDot} />}
        </button>
        <button className={styles.iconBtn} onClick={() => navigate('/login')} aria-label="Exit">
          <LogOut size={16} />
        </button>
        <button className={styles.userMenu} onClick={() => navigate('/settings')}>
          <span className={styles.userName}>{displayName}</span>
          <span className={styles.avatar}>{displayInitials}</span>
        </button>
      </header>
    </div>
  )
}
