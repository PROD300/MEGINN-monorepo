import { Bell, LogOut } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { profileStore, getInitials } from '../../data/profile'
import { notificationsStore, getUnreadCount } from '../../data/notifications'
import meginnMark from '../../assets/meginn-mark.svg'
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
        <button className={styles.brand} onClick={() => navigate('/portfolio')} aria-label="MEGINN — Portfolio">
          <img className={styles.mark} src={meginnMark} alt="" aria-hidden="true" />
          <span className={styles.logo}>MEGINN</span>
        </button>

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

        <div className={styles.actions}>
          <button className={styles.stopBtn} onClick={onStopAll ?? (() => navigate('/emergency-stop'))}>
            Stop All
          </button>
          <button className={styles.iconBtn} onClick={() => navigate('/notifications')} aria-label="Notifications">
            <Bell size={16} />
            {showDot && <span className={styles.notifDot} />}
          </button>
          {/* [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
              "Exit" would normally invalidate a real session/auth token.
              Here it just navigates to /login — nothing is actually signed out. */}
          <button className={styles.iconBtn} onClick={() => navigate('/login')} aria-label="Exit">
            <LogOut size={16} />
          </button>
          <button className={styles.userMenu} onClick={() => navigate('/settings')}>
            <span className={styles.userName}>{displayName}</span>
            <span className={styles.avatar}>{displayInitials}</span>
          </button>
        </div>
      </header>
    </div>
  )
}
