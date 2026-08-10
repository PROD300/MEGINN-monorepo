import type { ReactNode } from 'react'
import styles from './Banner.module.css'

export type BannerVariant = 'info' | 'success' | 'warning' | 'error'

interface BannerProps {
  variant: BannerVariant
  children: ReactNode
}

export function Banner({ variant, children }: BannerProps) {
  return (
    <div className={styles.bannerWrap}>
      <div className={[styles.banner, styles[variant]].join(' ')}>{children}</div>
    </div>
  )
}
