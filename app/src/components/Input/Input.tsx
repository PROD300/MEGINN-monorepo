import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

export type InputVariant = 'default' | 'error'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  label?: string
  errorMessage?: string
}

export function Input({
  variant = 'default',
  label,
  errorMessage,
  className,
  ...props
}: InputProps) {
  return (
    <div className={[styles.wrapper, variant === 'error' ? styles.error : ''].join(' ')}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={[styles.input, className ?? ''].join(' ')} {...props} />
      {variant === 'error' && errorMessage && (
        <span className={styles.errorMsg}>{errorMessage}</span>
      )}
    </div>
  )
}
