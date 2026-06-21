export function formatUsd(amount: number) {
  return `$${Math.round(amount).toLocaleString('en-US').replace(/,/g, ' ')}`
}

export function formatPct(value: number) {
  return `${Number(value.toFixed(1))}%`
}
