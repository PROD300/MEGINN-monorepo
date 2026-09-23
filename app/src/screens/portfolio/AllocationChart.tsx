import { useRef, useState } from 'react'
import type { AllocationEntry } from '../../data/portfolio'
import { formatUsd } from '../../lib/format'
import styles from './AllocationChart.module.css'

interface AllocationChartProps {
  entries: AllocationEntry[]
  totalAUM: number
}

const TREND_DAYS = 14
const VIEW_W = 560
const VIEW_H = 220
const PAD_TOP = 14
const PAD_BOTTOM = 8
// 0, not a few units of breathing room — the curve's leftmost point needs
// to land exactly on the tile's own content edge, flush with the section
// title above it and every other tile's text. Any left pad here reads as
// the chart starting further right than its neighbors once you're
// checking pixel-for-pixel instead of eyeballing it.
const PAD_LEFT = 0
const PAD_RIGHT = 6
// Fraction of maxPct reserved as scale headroom *below* 0% — keeps the
// smallest allocation's curve from reading as pinned to the baseline.
// Kept small on purpose: it scales with the chart's own pixel height, so
// the same fraction that was a subtle margin at ~430px read as a big dead
// band once the chart got taller — this only needs to be big enough that
// the lowest curve visibly clears the very bottom edge, not a large gap.
const BOTTOM_HEADROOM = 0.08

function hashSeed(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
  return h >>> 0
}

// mulberry32 — small deterministic PRNG so each asset's trend is stable
// across re-renders instead of reshuffling on every render.
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
// Represents the historical allocation-% series a portfolio indexer would
// supply. Built as a random walk seeded by the asset ticker, then shifted so
// it lands exactly on today's real allocation — the chart's right edge always
// agrees with the live % shown in the tooltip and elsewhere on this screen.
//
// The swing is bounded with tanh rather than a hard floor: a flat `Math.max`
// clamp made a small allocation's dips pile up at the same clamped value for
// several days in a row, reading as a curve pinned flat at zero. tanh eases
// toward its bound asymptotically instead, so the line still curves, and
// scaling the bound to the asset's own value (rather than one fixed number)
// keeps small allocations swinging by a visible fraction of themselves
// instead of getting a barely-there wiggle.
function buildTrend(asset: string, todayPct: number, days: number): number[] {
  const rng = mulberry32(hashSeed(asset))
  const amplitude = Math.min(todayPct * 0.55, 8)
  const step = amplitude * 0.45
  const walk: number[] = [0]
  for (let i = 1; i <= days; i++) {
    walk.push(walk[i - 1] + (rng() - 0.5) * step)
  }
  const offset = walk[days]
  return walk.map(v => todayPct + amplitude * Math.tanh((v - offset) / amplitude))
}

// Catmull-Rom -> cubic Bezier. Divisor 6 is the "neutral" tension (passes
// exactly through every point with no overshoot); using a smaller divisor
// pulls each control point further out, rounding the bends into fuller,
// more pronounced curves instead of nearly-straight segments between points.
const CURVE_TENSION_DIVISOR = 4.5

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x},${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / CURVE_TENSION_DIVISOR
    const c1y = p1.y + (p2.y - p0.y) / CURVE_TENSION_DIVISOR
    const c2x = p2.x - (p3.x - p1.x) / CURVE_TENSION_DIVISOR
    const c2y = p2.y - (p3.y - p1.y) / CURVE_TENSION_DIVISOR
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`
  }
  return d
}

function formatUsdCompact(amount: number) {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`
  return formatUsd(amount)
}

function seriesColor(rank: number) {
  return rank === 0 ? 'var(--accent-300)' : 'var(--text-muted)'
}

function seriesOpacity(rank: number) {
  return rank === 0 ? 1 : Math.max(0.35, 0.8 - rank * 0.15)
}

// Vertical clearance a two-line end label needs, in viewBox Y-units — the
// ceiling this dodge eases *toward*, not a flat minimum it snaps every close
// pair to (that would make a 1%-apart pair and a 4%-apart pair land the same
// distance apart, which reads as wrong once you notice it).
const MIN_LABEL_GAP_UNITS = 22
// The floor even two identical values still get, so their labels stay just
// barely distinguishable instead of sitting on top of each other. This is a
// units count, not a ratio of the ceiling — the two-line label's own height
// is a fixed ~23 real CSS px regardless of the chart's rendered size, so the
// floor has to clear that in the *worst-case* render height (the chart's own
// CSS min-height), not shrink along with a smaller ceiling.
const MIN_LABEL_GAP_FLOOR_UNITS = 15
// The lowest a *shifted* trend point is ever allowed to sit. Kept as a
// floor on the per-series offset itself (below), never as a clamp on the
// resulting points — clamping points after the fact is what caused the
// "pinned flat at zero" look in the first place: several consecutive days
// of a small allocation's real wiggle would all get flattened to the same
// clamped value once a big enough offset pushed them past it.
const DISPLAY_FLOOR = 0.3

// When two assets' allocations are close enough that their labels would
// crowd together, shift each affected series' whole trend up/down by a
// constant so its curve — not just its label — visibly clears its
// neighbor. How much varies smoothly with how close the *real* values are:
// nearly-equal values are eased apart just enough to stay legible; values
// already a comfortable distance apart are left at their true position.
// Order is highest-to-lowest todayPct; the top one never moves.
function dodgeSeries<T extends { todayPct: number; trend: number[] }>(sortedDesc: T[], unitsPerPct: number) {
  const ceilGapPct = MIN_LABEL_GAP_UNITS / unitsPerPct
  const floorGapPct = MIN_LABEL_GAP_FLOOR_UNITS / unitsPerPct
  const idealPct = sortedDesc.map(s => s.todayPct)
  for (let i = 1; i < idealPct.length; i++) {
    const realGap = sortedDesc[i - 1].todayPct - sortedDesc[i].todayPct
    if (realGap < ceilGapPct) {
      const closeness = 1 - Math.max(0, realGap) / ceilGapPct // 0 (at the ceiling) .. 1 (identical values)
      const requiredGap = ceilGapPct - closeness * (ceilGapPct - floorGapPct)
      idealPct[i] = Math.min(idealPct[i], idealPct[i - 1] - requiredGap)
    }
  }
  // Cap how far down each series' own offset can go, given its own real
  // trend's low point — a small allocation right next to a much bigger one
  // can be asked for more clearance than its own value can absorb; when
  // that happens, dodge it less rather than let the curve go under.
  const actualPct = sortedDesc.map((s, i) => {
    const idealOffset = idealPct[i] - s.todayPct
    const safeOffset = Math.max(idealOffset, DISPLAY_FLOOR - Math.min(...s.trend))
    return s.todayPct + safeOffset
  })
  // A series capped by the line above can leave the gap *below* it too
  // short (the series under it still needs its own clearance, but nothing
  // pushed it away to make room). Sweep bottom-to-top and pull each series
  // up to clear the one under it — moving a bigger series up has nowhere
  // near the same risk of running it into its own floor that moving a
  // smaller one down does.
  for (let i = actualPct.length - 2; i >= 0; i--) {
    const realGap = sortedDesc[i].todayPct - sortedDesc[i + 1].todayPct
    if (realGap >= ceilGapPct) continue
    const closeness = 1 - Math.max(0, realGap) / ceilGapPct
    const requiredGap = ceilGapPct - closeness * (ceilGapPct - floorGapPct)
    if (actualPct[i] - actualPct[i + 1] < requiredGap) {
      actualPct[i] = actualPct[i + 1] + requiredGap
    }
  }
  return sortedDesc.map((s, i) => {
    const offset = actualPct[i] - s.todayPct
    return { displayPct: actualPct[i], displayTrend: s.trend.map(v => v + offset) }
  })
}

export function AllocationChart({ entries, totalAUM }: AllocationChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const plotW = VIEW_W - PAD_LEFT - PAD_RIGHT
  const plotH = VIEW_H - PAD_TOP - PAD_BOTTOM

  const rawSeries = totalAUM <= 0 || entries.length === 0 ? [] : [...entries]
    .sort((a, b) => b.valueUsd - a.valueUsd)
    .map((entry, rank) => {
      const todayPct = (entry.valueUsd / totalAUM) * 100
      return { asset: entry.asset, valueUsd: entry.valueUsd, todayPct, rank, trend: buildTrend(entry.asset, todayPct, TREND_DAYS) }
    })

  // Rough pre-dodge scale (viewBox Y-units per pct point), just to convert
  // the label's viewBox-unit clearance requirement into a pct gap — see
  // dodgeSeries(). Has to divide by the *domain* span (maxPct scaled up by
  // the same BOTTOM_HEADROOM the real yAt uses below), not maxPct alone —
  // otherwise this assumes more pixels per pct than the chart actually
  // renders once the headroom domain is applied, and the dodge ends up
  // under-shooting the real gap it needs (labels crowd together again).
  const prelimMaxPct = rawSeries.length > 0 ? Math.max(...rawSeries.flatMap(s => s.trend)) * 1.18 : 100
  const dodged = dodgeSeries(rawSeries, plotH / (prelimMaxPct * (1 + BOTTOM_HEADROOM)))
  const series = rawSeries.map((s, i) => ({ ...s, ...dodged[i] }))

  // Final scale accounts for however far dodging pushed the lowest curves.
  const maxPct = series.length > 0 ? Math.max(...series.flatMap(s => s.displayTrend)) * 1.18 : 100
  // The y-domain's floor sits a bit *below* true 0, not at it — mapping 0%
  // straight to the plot's bottom pixel is what made a small allocation's
  // curve (which only ever wiggles a point or two above its own value) read
  // as glued to the baseline. This is headroom on the scale, same idea as
  // maxPct's own *1.18 margin at the top, just at the other end.
  const domainMin = -maxPct * BOTTOM_HEADROOM
  const domainSpan = maxPct - domainMin

  const xAt = (i: number) => PAD_LEFT + (i / TREND_DAYS) * plotW
  const yAt = (pct: number) => PAD_TOP + plotH - Math.min(1, (pct - domainMin) / domainSpan) * plotH

  // End-of-line labels — the dot sits exactly across from the curve's
  // (possibly dodged) endpoint; the printed % is always the real value.
  const labels = series.map(s => ({ asset: s.asset, pct: s.todayPct, rank: s.rank, y: yAt(s.displayPct) }))

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const scaleX = VIEW_W / rect.width
    const localX = (e.clientX - rect.left) * scaleX
    const ratio = Math.min(1, Math.max(0, (localX - PAD_LEFT) / plotW))
    setHoverIndex(Math.round(ratio * TREND_DAYS))
  }

  if (series.length === 0) return null

  const baselineY = yAt(0)

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <div
          className={styles.plotCol}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
        >
          <svg
            ref={svgRef}
            className={styles.svg}
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            role="img"
            aria-label={`Asset allocation, ${TREND_DAYS}-day trend as a percentage of AUM, per asset`}
          >
            <defs>
              {series.map(s => (
                <linearGradient key={s.asset} id={`alloc-grad-${s.asset}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={seriesColor(s.rank)} stopOpacity={s.rank === 0 ? 0.16 : 0.05} />
                  <stop offset="100%" stopColor={seriesColor(s.rank)} stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>

            {/* Gridlines — recessive hairlines at 0/50/100% of the plotted
                max, via yAt so they land on the same (headroom-adjusted)
                domain as everything else instead of the old 0-to-maxPct-
                only assumption. */}
            {[0, 0.5, 1].map(f => (
              <line
                key={f}
                x1={PAD_LEFT} x2={VIEW_W - PAD_RIGHT}
                y1={yAt(f * maxPct)} y2={yAt(f * maxPct)}
                className={styles.gridline}
              />
            ))}

            {series.map(s => {
              const points = s.displayTrend.map((pct, i) => ({ x: xAt(i), y: yAt(pct) }))
              const linePath = smoothPath(points)
              const areaPath = `${linePath} L ${points[points.length - 1].x},${baselineY} L ${points[0].x},${baselineY} Z`
              return (
                <g key={s.asset}>
                  <path d={areaPath} fill={`url(#alloc-grad-${s.asset})`} stroke="none" />
                  <path
                    d={linePath}
                    fill="none"
                    stroke={seriesColor(s.rank)}
                    strokeOpacity={seriesOpacity(s.rank)}
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              )
            })}

            {/* Hover crosshair — a straight hairline, unaffected by the
                non-uniform viewBox scale that would otherwise oval-ise a
                circular marker (see the HTML dots below for why those
                aren't drawn in SVG). */}
            {hoverIndex !== null && (
              <line
                x1={xAt(hoverIndex)} x2={xAt(hoverIndex)}
                y1={PAD_TOP} y2={PAD_TOP + plotH}
                className={styles.crosshair}
              />
            )}
          </svg>

          {/* Hover markers — plain HTML dots with a fixed pixel size, so they
              stay true circles regardless of how non-uniformly the SVG above
              is stretched (percentage positioning maps 1:1 to the viewBox
              since this column is exactly the svg's rendered box). */}
          {hoverIndex !== null && series.map(s => (
            <span
              key={s.asset}
              className={styles.hoverDot}
              style={{
                left: `${(xAt(hoverIndex) / VIEW_W) * 100}%`,
                top: `${(yAt(s.displayTrend[hoverIndex]) / VIEW_H) * 100}%`,
                background: seriesColor(s.rank),
                opacity: seriesOpacity(s.rank),
              }}
            />
          ))}

          {hoverIndex !== null && (
            <div
              className={styles.tooltip}
              style={{ left: `${Math.min(90, Math.max(10, (xAt(hoverIndex) / VIEW_W) * 100))}%` }}
            >
              <div className={styles.tooltipDay}>
                {hoverIndex === TREND_DAYS ? 'Today' : `${TREND_DAYS - hoverIndex}d ago`}
              </div>
              {series.map(s => (
                <div key={s.asset} className={styles.tooltipRow}>
                  <span className={styles.tooltipKey} style={{ background: seriesColor(s.rank), opacity: seriesOpacity(s.rank) }} />
                  <span className={styles.tooltipAsset}>{s.asset}</span>
                  <span className={styles.tooltipValue}>{Number(s.trend[hoverIndex].toFixed(1))}%</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Direct end labels — the identity channel, since a single-hue DS
            can't separate series by color alone. Plain HTML so the swatch
            dot renders as a true circle. */}
        <div className={styles.labelCol}>
          {labels.map(l => (
            <div key={l.asset} className={styles.endLabel} style={{ top: `${(l.y / VIEW_H) * 100}%` }}>
              <span className={styles.endDot} style={{ background: seriesColor(l.rank), opacity: seriesOpacity(l.rank) }} />
              <span className={styles.endText}>
                <span className={styles.endAsset}>{l.asset}</span>
                <span className={styles.endValue}>{Number(l.pct.toFixed(1))}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.axisCaption}>
        <span>{TREND_DAYS}d ago</span>
        <span>Today · % of AUM</span>
      </div>

      {/* Screen-reader / no-JS parity — same rows the chart plots for today */}
      <table className={styles.srOnly}>
        <caption>Asset allocation as a percentage of AUM</caption>
        <thead>
          <tr><th>Asset</th><th>Allocation</th><th>Value</th></tr>
        </thead>
        <tbody>
          {series.map(s => (
            <tr key={s.asset}>
              <td>{s.asset}</td>
              <td>{Number(s.todayPct.toFixed(1))}%</td>
              <td>{formatUsdCompact(s.valueUsd)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
