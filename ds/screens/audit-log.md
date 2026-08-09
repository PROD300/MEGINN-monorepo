# Screen: AuditLog

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `241:2`

---

## Layout type
Standard AppShell: AppTopBar + AppSidebar + Main.
1440×1024 desktop. Sidebar active: Audit Log.

---

## Composition

### AppTopBar
- Component instance (128:2), FILL × FIXED 64px

### AppSidebar
- Component instance (128:10), FIXED 240px × FILL
- Active item: Audit Log (4-й пункт навигации)

### Main (FILL × HUG, vertical, gap 0)

#### PageHeader
- FILL × HUG, horizontal, space-between, padding space-4
- Title: «Audit Log» DS/Heading/xl text-default
- Right row (horizontal, gap space-3):
  - Button/ghost/md «Export CSV» (Lucide/download 16px)
  - Button/ghost/md «Export PDF» (Lucide/file-text 16px)
- Bottom border: border-default

#### FilterBar
- FILL × HUG, horizontal, gap space-3, padding space-3 H / space-3 V, align center
- Background: surface-subtle, border-bottom: border-default
- «Filter:» DS/Body/xs text-muted
- Select/default FIXED 160px value «All Types»  (options: Rebalancing / Bridge / Rule Paused / Emergency / System)
- Select/default FIXED 140px value «All Statuses» (options: Success / Warning / Error / Info)
- Input/default FIXED 140px placeholder «Date from» (DS/Body/xs)
- Input/default FIXED 140px placeholder «Date to»
- Button/secondary/md «Apply»
- Spacer (FILL)
- «8 events» DS/Body/xs text-muted

#### AuditTable
- FILL × HUG, vertical, gap 0

  **Table/default instance (60:46)**
  - FILL × HUG
  - Columns (8): Timestamp · Type · Rule · Asset · Amount · Network · Provider · Result
  - 8 rows (representative audit trail):
    - «Jun 16 14:22» · «Rebalance» · ETH Balance Guard · ETH → USDC · $4 200 000 · Arbitrum · Li.Fi · Badge/success «Success»
    - «Jun 16 11:08» · «Bridge» · RWA Cross-chain · USDC · $2 100 000 · ETH→ARB · Li.Fi · Badge/success «Success»
    - «Jun 15 22:10» · «Rebalance» · ETH Balance Guard · ETH → USDC · $5 100 000 · Arbitrum · Li.Fi · Badge/success «Success»
    - «Jun 15 19:55» · «Rule Paused» · USDT Ceiling · — · — · Arbitrum · — · Badge/warning «Slippage 1.2%»
    - «Jun 14 08:55» · «Rebalance» · ETH Balance Guard · ETH → USDC · — · Arbitrum · — · Badge/warning «Gas Too High»
    - «Jun 12 16:40» · «Rebalance» · ETH Balance Guard · ETH → USDC · $4 700 000 · Arbitrum · Li.Fi · Badge/success «Success»
    - «Jun 10 09:15» · «Rebalance» · stETH Target · stETH → ETH · $1 800 000 · Ethereum · — · Badge/success «Success»
    - «Jun 05 12:00» · «System» · — · — · — · — · — · Badge/info «Smart Account activated»

#### PaginationRow
- FILL × HUG, horizontal, space-between, padding space-3 H / space-3 V
- «Showing 1–8 of 8 events» DS/Body/xs text-muted
- Pagination controls (Button/ghost/sm «←» + «1» active + «→», disabled state)

---

## Edge cases

### EmptyAudit (visible: false)
- Заменяет AuditTable + PaginationRow
- Center-aligned: Lucide/clipboard 32px text-muted + «No audit events yet» DS/Body/sm text-muted + «Events will appear here as automation rules execute.» DS/Body/xs text-muted

### FilterNoResults (visible: false)
- Заменяет AuditTable rows
- «No events match your filters.» DS/Body/xs text-muted + Button/ghost/md «Clear Filters» center

---

## Tokens used
- surface-app-shell, surface-default, surface-subtle
- text-default, text-muted, text-accent, text-success, text-warning
- border-default
- space-2, space-3, space-4
- Icons: Lucide/download 16px, Lucide/file-text 16px, Lucide/clipboard 32px
