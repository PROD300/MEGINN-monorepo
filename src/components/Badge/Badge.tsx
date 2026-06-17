import { ReactNode } from 'react'
import styles from './Badge.module.css'

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info'

interface BadgeProps {
  variant: BadgeVariant
  children: ReactNode
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[variant]].join(' ')}>
      {children}
    </span>
  )
}
