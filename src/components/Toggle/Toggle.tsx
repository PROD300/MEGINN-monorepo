import { useState } from 'react'
import styles from './Toggle.module.css'

interface ToggleProps {
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

export function Toggle({ defaultChecked = false, checked, onChange, disabled = false }: ToggleProps) {
  const isControlled = checked !== undefined
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isOn = isControlled ? checked : internalChecked

  function handleClick() {
    if (disabled) return
    if (!isControlled) setInternalChecked(v => !v)
    onChange?.(!isOn)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      className={[styles.toggle, isOn ? styles.on : ''].join(' ')}
      disabled={disabled}
      onClick={handleClick}
    >
      <span className={styles.thumb} />
    </button>
  )
}
