import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './IconButton.module.css'

export type IconButtonState = 'default' | 'hover' | 'disabled'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label: string
}

export function IconButton({ icon, label, className, ...props }: IconButtonProps) {
  return (
    <button
      className={[styles.iconBtn, className ?? ''].join(' ')}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  )
}
