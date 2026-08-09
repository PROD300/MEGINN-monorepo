import styles from './ActivityRow.module.css'

export type ActivityStatus = 'success' | 'warning' | 'info'

interface ActivityRowProps {
  status: ActivityStatus
  description: string
  time: string
  statusLabel: string
}

export function ActivityRow({ status, description, time, statusLabel }: ActivityRowProps) {
  return (
    <div className={[styles.row, styles[status]].join(' ')}>
      <span className={styles.description}>{description}</span>
      <div className={styles.meta}>
        <span className={styles.time}>{time}</span>
        <span className={[styles.status, styles[status]].join(' ')}>· {statusLabel}</span>
      </div>
    </div>
  )
}
