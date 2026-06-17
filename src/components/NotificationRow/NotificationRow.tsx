import { ReactNode } from 'react'
import styles from './NotificationRow.module.css'

export type NotificationStatus = 'success' | 'info' | 'warning'

interface NotificationRowProps {
  status: NotificationStatus
  title: string
  description: string
  time: string
  badge?: ReactNode
}

export function NotificationRow({ status, title, description, time, badge }: NotificationRowProps) {
  return (
    <div className={styles.row}>
      <span className={[styles.dot, styles[status]].join(' ')} />
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
        <div className={styles.meta}>
          <span>{time}</span>
          {badge}
        </div>
      </div>
    </div>
  )
}
