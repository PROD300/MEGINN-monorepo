import { createStore } from '../data/store'
import type { ToastVariant } from '../components/Toast/Toast'

export interface ToastEntry {
  id: string
  variant: ToastVariant
  message: string
}

export const toastStore = createStore<ToastEntry[]>([])

export function showToast(variant: ToastVariant, message: string, duration = 3000) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  toastStore.setState(prev => [...prev, { id, variant, message }])
  setTimeout(() => dismissToast(id), duration)
}

export function dismissToast(id: string) {
  toastStore.setState(prev => prev.filter(t => t.id !== id))
}
