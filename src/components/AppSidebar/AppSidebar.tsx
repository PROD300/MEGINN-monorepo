import { LayoutDashboard, RefreshCw, Scale, FileText, Settings, LogOut } from 'lucide-react'
import styles from './AppSidebar.module.css'

export type NavItemId = 'portfolio' | 'rebalancing' | 'liability' | 'audit' | 'settings'

interface AppSidebarProps {
  active?: NavItemId
  onNavigate?: (id: NavItemId) => void
}

const primaryNav = [
  { id: 'portfolio' as NavItemId,    label: 'Portfolio',              Icon: LayoutDashboard },
  { id: 'rebalancing' as NavItemId,  label: 'Rebalancing Rules',      Icon: RefreshCw },
  { id: 'liability' as NavItemId,    label: 'Liability & Compliance', Icon: Scale },
  { id: 'audit' as NavItemId,        label: 'Audit Log',              Icon: FileText },
  { id: 'settings' as NavItemId,     label: 'Account Settings',       Icon: Settings },
]

export function AppSidebar({ active, onNavigate }: AppSidebarProps) {
  return (
    <nav className={styles.sidebar}>
      {primaryNav.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={[styles.navItem, active === id ? styles.active : ''].join(' ')}
          onClick={() => onNavigate?.(id)}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
      <div className={styles.divider} />
      <div className={styles.secondary}>
        <button className={styles.navItem}>
          <LogOut size={16} /> Exit
        </button>
      </div>
    </nav>
  )
}
