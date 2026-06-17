import styles from './StatCard.module.css'

export type StatCardVariant = 'neutral' | 'success' | 'warning'

interface StatCardProps {
  variant?: StatCardVariant
  label: string
  value: string
  subtitle?: string
}

export function StatCard({ variant = 'neutral', label, value, subtitle }: StatCardProps) {
  return (
    <div className={[styles.card, styles[variant]].join(' ')}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
    </div>
  )
}
