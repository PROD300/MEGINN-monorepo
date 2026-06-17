import { ReactNode } from 'react'
import styles from './Card.module.css'

export type CardState = 'default' | 'hover'

interface CardProps {
  state?: CardState
  title?: string
  description?: string
  action?: string
  children?: ReactNode
  className?: string
}

export function Card({ state = 'default', title, description, action, children, className }: CardProps) {
  return (
    <div className={[styles.card, state === 'hover' ? styles.hover : '', className ?? ''].join(' ')}>
      {title && <div className={styles.title}>{title}</div>}
      {description && <div className={styles.description}>{description}</div>}
      {children}
      {action && <span className={styles.action}>{action}</span>}
    </div>
  )
}
