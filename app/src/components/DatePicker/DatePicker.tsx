import { useEffect, useRef, useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './DatePicker.module.css'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function parseISO(value: string): Date | null {
  if (!value) return null
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDisplay(date: Date): string {
  return `${MONTHS[date.getMonth()].slice(0, 3)} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`
}

export function DatePicker({ value, onChange, placeholder = 'Select date', className }: DatePickerProps) {
  const selected = parseISO(value)
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(selected ?? new Date())
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  function toggleOpen() {
    if (!open) setViewDate(selected ?? new Date())
    setOpen(o => !o)
  }

  function goMonth(delta: number) {
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() + delta, 1))
  }

  function pickDay(day: number) {
    onChange(toISO(new Date(viewDate.getFullYear(), viewDate.getMonth(), day)))
    setOpen(false)
  }

  function clear(e: React.MouseEvent) {
    e.stopPropagation()
    onChange('')
  }

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const todayISO = toISO(new Date())

  return (
    <div className={[styles.root, className ?? ''].join(' ')} ref={rootRef}>
      <button type="button" className={styles.trigger} onClick={toggleOpen}>
        <Calendar size={14} className={styles.triggerIcon} />
        <span className={[styles.triggerText, selected ? 'ds-numeric' : ''].join(' ')}>
          {selected ? formatDisplay(selected) : placeholder}
        </span>
      </button>
      {open && (
        <div className={styles.popover}>
          <div className={styles.header}>
            <button type="button" className={styles.navBtn} onClick={() => goMonth(-1)} aria-label="Previous month">
              <ChevronLeft size={14} />
            </button>
            <span className={styles.monthLabel}>{MONTHS[month]} {year}</span>
            <button type="button" className={styles.navBtn} onClick={() => goMonth(1)} aria-label="Next month">
              <ChevronRight size={14} />
            </button>
          </div>
          <div className={styles.weekRow}>
            {WEEKDAYS.map(w => <span key={w} className={styles.weekday}>{w}</span>)}
          </div>
          <div className={styles.grid}>
            {cells.map((day, i) => {
              if (day === null) return <span key={i} className={styles.dayEmpty} />
              const iso = toISO(new Date(year, month, day))
              const isSelected = iso === value
              const isToday = iso === todayISO
              return (
                <button
                  type="button"
                  key={i}
                  className={[styles.day, 'ds-numeric', isSelected ? styles.daySelected : '', !isSelected && isToday ? styles.dayToday : ''].join(' ')}
                  onClick={() => pickDay(day)}
                >
                  {day}
                </button>
              )
            })}
          </div>
          {value && (
            <button type="button" className={styles.clearBtn} onClick={clear}>Clear</button>
          )}
        </div>
      )}
    </div>
  )
}
