import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import styles from './Toast.module.css'

export type ToastVariant = 'success' | 'warning' | 'error'

interface ToastProps {
  variant: ToastVariant
  children: string
}

const icons = {
  success: <CheckCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  error: <XCircle size={16} />,
}

export function Toast({ variant, children }: ToastProps) {
  return (
    <div className={[styles.toast, styles[variant]].join(' ')}>
      <span className={[styles.icon, styles[variant]].join(' ')}>{icons[variant]}</span>
      {children}
    </div>
  )
}
