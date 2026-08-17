# Screen: Portfolio

**Wireframe Node ID:** `6:2`
**Final Screen Node ID:** `140:83`

---

## Composition

### AppTopBar
- Component instance (new A)
- FILL × FIXED 64px
- Content: MEGINN logo · Spacer · Stop All button (Button/primary/md, error-red override) · Bell icon (Lucide/bell 20px) + Badge/info «3» · «James Harrington» text · Avatar placeholder 36×36

### AppSidebar
- Component instance (new B)
- FIXED 240px × FILL
- Active item: Portfolio

### Main (FILL × HUG, vertical, gap 0)

#### StatusBar
- FILL × FIXED 40px, surface-level-2, padding space-3 H
- Auto Layout horizontal, space-between
- Left: «● ETH — Connected» (text-success · DS/Body/xs) · «● Arbitrum — Connected» (text-success) · «● Bridge — Active (F20 · Li.Fi · avg 42 sec)» (text-accent)
- Right: «Last sync: 2 min ago» (text-muted · DS/Body/xs)
- Bottom border: border-default

#### StatsRow
- FILL × HUG, horizontal, gap space-4, padding space-4
- 3 × StatCard instance:
  - StatCard/neutral: «Total AUM» / «$487 350 000» / «across 2 networks»
  - StatCard/success: «Active Rules» / «3» / «auto-rebalancing enabled»
  - StatCard/neutral: «Last Rebalance» / «2h ago» / «ETH → USDC via Bridge»

#### AlertBanner (Next rebalance trigger)
- FILL × HUG, horizontal, padding space-3 H / space-2 V
- Fill: bg-warning-subtle, border-bottom: border-warning
- Text: «Next rebalance trigger: ETH allocation +2.0% above target» — DS/Body/xs, text-warning

#### AssetAllocationSection
- FILL × HUG, vertical, gap 0, padding space-4

  **SectionHeader**
  - FILL × HUG, horizontal, space-between, padding space-2 V 0 H
  - Title: «Asset Allocation» DS/Heading/lg text-default
  - Bottom border: border-default

  **Table instance (Density=default)**
  - Table ComponentSet instance (60:46)
  - FILL × HUG
  - Override rows: USDC/Arbitrum/$210M/43.1%/45%, ETH/Ethereum/$156M/32%/30%, stETH/Ethereum/$89M/18.3%/20%, USDT/Arbitrum/$32.35M/6.6%/5%
  - Extra column «Target» — добавляется как текст-override в Cell

#### QuickActionsRow
- FILL × HUG, horizontal, gap space-3, padding space-4 H / space-3 V
- Background: surface-subtle, border-top: border-default
- 4 × Button instances:
  - Button/primary/md «Rebalance Now»
  - Button/ghost/md «Add Asset»
  - Button/ghost/md «Bridge Funds»
  - Button/ghost/md «Download Report»

#### RecentActivitySection
- FILL × HUG, vertical, gap 0, padding space-4

  **SectionHeader**
  - FILL × HUG, horizontal, space-between
  - Title: «Recent Automation Activity» DS/Heading/lg
  - Link: «View full audit log →» DS/Body/sm, text-accent

  **4 × ActivityRow instances:**
  - ActivityRow/success: «Auto-rebalance: ETH → USDC» · $4 200 000 · 2h ago · Success
  - ActivityRow/info: «Cross-chain bridge: RWA rebalance — ETH→ARB» · $2 100 000 · 3h ago · Success [F20 Bridge]
  - ActivityRow/success: «Auto-rebalance: stETH → ETH» · $1 800 000 · 6h ago · Success
  - ActivityRow/warning: «Rule triggered: Slippage Guard — paused USDT rule» · 1d ago · Warning

---

## Edge cases

### EmptyState (Asset Allocation)
- visible: false, внутри AssetAllocationSection, заменяет Table
- Card/default по центру: «No assets tracked yet» + Button/ghost/md «Add first asset»

### LoadingState (StatsRow)
- visible: false, 3 StatCard с opacity 0.4

## Edge cases — осознанно пропущены / запланированы (аудит 2026-05-14)

- StatsRow / first-appearance: пропущено, добавить в следующей итерации (final_screens)
- StatsRow / stale-data: пропущено, добавить в следующей итерации
- StatsRow / fresh-updated: пропущено, добавить в следующей итерации
- AssetAllocation / loading: пропущено, добавить в следующей итерации
- AssetAllocation / error: пропущено, добавить в следующей итерации
- RecentActivity / empty: пропущено, добавить в следующей итерации
- RecentActivity / loading: пропущено, добавить в следующей итерации
- RecentActivity / error: пропущено, добавить в следующей итерации

---

## Tokens used
- surface-app-shell (= surface-dark → gray-900), surface-default (→ gray-50), surface-subtle, surface-level-2
- text-default, text-muted, text-accent, text-success, text-warning
- text-nav-active (= text-on-dark → gray-00), text-nav-item (= text-on-dark-muted → gray-300)
- border-default, border-warning, border-app-shell (= border-dark → gray-700), bg-warning-subtle
- space-2, space-3, space-4, space-6
- shadow-sm (StatCard)
