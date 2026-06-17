import { ReactNode } from 'react'
import styles from './RoleRow.module.css'

export type RoleStatus = 'active' | 'inactive'

interface RoleRowProps {
  status: RoleStatus
  name: string
  role: string
  address: string
  badge?: ReactNode
  actions?: ReactNode
  initials?: string
}

export function RoleRow({ name, role, address, badge, actions, initials }: RoleRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.avatar}>{initials ?? name.charAt(0)}</div>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.role}>{role}</span>
        <span className={styles.address}>{address}</span>
      </div>
      <div className={styles.right}>
        {badge}
        {actions}
      </div>
    </div>
  )
}
