import { LayoutDashboard, RefreshCw, Scale, FileText, Settings, LogOut } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './AppSidebar.module.css'

export type NavItemId = 'portfolio' | 'rebalancing' | 'liability' | 'audit' | 'settings'

interface AppSidebarProps {
  active?: NavItemId
  onNavigate?: (id: NavItemId) => void
}

const primaryNav = [
  { id: 'portfolio' as NavItemId,    label: 'Portfolio',              Icon: LayoutDashboard, route: '/portfolio' },
  { id: 'rebalancing' as NavItemId,  label: 'Rebalancing Rules',      Icon: RefreshCw,        route: '/rebalancing-rules' },
  { id: 'liability' as NavItemId,    label: 'Liability & Compliance', Icon: Scale,            route: '/liability-dashboard' },
  { id: 'audit' as NavItemId,        label: 'Audit Log',              Icon: FileText,         route: '/audit-log' },
  { id: 'settings' as NavItemId,     label: 'Account Settings',       Icon: Settings,         route: '/settings' },
]

export function AppSidebar({ active, onNavigate }: AppSidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const activeId = active ?? primaryNav.find(item => item.route === location.pathname)?.id

  function handleClick(item: typeof primaryNav[number]) {
    onNavigate?.(item.id)
    navigate(item.route)
  }

  return (
    <nav className={styles.sidebar}>
      {primaryNav.map(item => (
        <button
          key={item.id}
          className={[styles.navItem, activeId === item.id ? styles.active : ''].join(' ')}
          onClick={() => handleClick(item)}
        >
          <item.Icon size={16} />
          {item.label}
        </button>
      ))}
      <div className={styles.divider} />
      <div className={styles.secondary}>
        <button className={styles.navItem} onClick={() => navigate('/login')}>
          <LogOut size={16} /> Exit
        </button>
      </div>
    </nav>
  )
}
