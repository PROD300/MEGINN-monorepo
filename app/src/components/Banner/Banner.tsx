import type { ReactNode } from 'react'
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import styles from './Banner.module.css'

export type BannerVariant = 'info' | 'success' | 'warning' | 'error'

interface BannerProps {
  variant: BannerVariant
  children: ReactNode
}

const icons = {
  info: <Info size={16} />,
  success: <CheckCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  error: <XCircle size={16} />,
}

export function Banner({ variant, children }: BannerProps) {
  return (
    <div className={[styles.banner, styles[variant]].join(' ')}>
      <span className={[styles.icon, styles[variant]].join(' ')}>{icons[variant]}</span>
      <span className={[styles.text, styles[variant]].join(' ')}>{children}</span>
    </div>
  )
}
