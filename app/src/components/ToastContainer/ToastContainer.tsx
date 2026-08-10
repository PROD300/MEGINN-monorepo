import { toastStore, dismissToast } from '../../lib/toast'
import { Toast } from '../Toast/Toast'
import styles from './ToastContainer.module.css'

export function ToastContainer() {
  const toasts = toastStore.useStore()

  if (toasts.length === 0) return null

  return (
    <div className={styles.container} onClick={() => toasts.forEach(t => dismissToast(t.id))}>
      {toasts.map(t => (
        <div key={t.id} onClick={e => e.stopPropagation()}>
          <Toast variant={t.variant}>{t.message}</Toast>
        </div>
      ))}
    </div>
  )
}
