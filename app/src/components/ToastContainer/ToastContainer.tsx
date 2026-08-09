import { toastStore } from '../../lib/toast'
import { Toast } from '../Toast/Toast'
import styles from './ToastContainer.module.css'

export function ToastContainer() {
  const toasts = toastStore.useStore()

  if (toasts.length === 0) return null

  return (
    <div className={styles.container}>
      {toasts.map(t => (
        <Toast key={t.id} variant={t.variant}>{t.message}</Toast>
      ))}
    </div>
  )
}
