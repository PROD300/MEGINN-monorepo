import styles from './Tabs.module.css'

export type TabState = 'default' | 'active' | 'disabled'

interface Tab {
  label: string
  value: string
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (value: string) => void
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className={styles.tabList} role="tablist">
      {tabs.map(tab => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={active === tab.value}
          className={[styles.tab, active === tab.value ? styles.active : ''].join(' ')}
          disabled={tab.disabled}
          onClick={() => !tab.disabled && onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
