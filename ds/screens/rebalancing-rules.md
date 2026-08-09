# Screen: RebalancingRules

**Wireframe Node ID:** `7:2`
**Final Screen Node ID:** `142:83`

---

## Composition

### AppTopBar
- Component instance (new A), FILL × FIXED 64px

### AppSidebar
- Component instance (new B), FIXED 240px × FILL
- Active item: Rebalancing Rules

### Main (FILL × HUG, vertical, gap 0)

#### PageHeader
- FILL × HUG, horizontal, space-between, padding space-4 H / space-4 V
- Left: «Rebalancing Rules» DS/Heading/xl text-default
- Right: Button/primary/md «+ Create Rule»
- Bottom border: border-default

#### TabsBar
- FILL × HUG, horizontal, gap 0, padding 0 space-4
- 5 × Tabs instance (60:51):
  - Tabs/active «All (4)»
  - Tabs/default «Active (3)»
  - Tabs/default «Paused (1)»
  - Tabs/default «Error (0)»
  - Tabs/default «Cross-chain (1) F20»
- Bottom border: border-default

#### RulesList
- FILL × HUG, vertical, gap 0

  **4 × RuleCard instances:**
  - RuleCard/active: «ETH Balance Guard» / «ETH allocation > 32% → sell excess to USDC» / Arbitrum / «Last triggered: 2h ago» / Badge/success «Active» / Edit · Pause
  - RuleCard/active: «stETH Target Allocation» / «stETH < 18% → buy stETH from ETH» / Ethereum / «Last triggered: 6h ago» / Badge/success «Active» / Edit · Pause
  - RuleCard/active + cross-chain: «RWA Cross-chain Rebalance» / «RWA < 50% → buy RWA from USDC via Bridge» / «Cross-chain: ETH → ARB» / «Last triggered: 3h ago» / Badge/success + left-border blue
  - RuleCard/paused: «USDT Ceiling» / «USDT > 6% → sell USDT to USDC» / Arbitrum / «Last triggered: 1d ago» / Badge/warning «Paused — Slippage Guard» / Edit · Resume

#### FooterStats
- FILL × HUG, horizontal, gap space-6, padding space-3 H / space-3 V
- Background: surface-subtle, border-top: border-default
- «Automation volume: $6 000 000 managed in last 24h» DS/Body/xs, text-muted
- «Cross-chain volume: $2 100 000 bridged · Bridge: Li.Fi | Next check: in 14 min» DS/Body/xs, text-muted

---

## Edge cases

### EmptyState (нет правил)
- visible: false, внутри RulesList
- Card/default по центру: icon(Lucide/zap 24px) + «No rules yet» DS/Body/sm + «Rules automate your portfolio rebalancing» DS/Body/xs text-muted + Button/primary/md «Create first rule»

### ErrorBanner (Slippage warning)
- visible: true (уже в wireframe как warning row под paused rule)
- Styled frame: fill bg-warning-subtle, border-left 3px border-warning
- Text: «Rule paused automatically: slippage exceeded 1.2% on last attempt» DS/Body/xs text-warning

## Edge cases — осознанно пропущены / запланированы (аудит 2026-05-14)

- RulesList / loading: пропущено, добавить в следующей итерации (final_screens)
- RulesList / error (engine failure): пропущено, добавить в следующей итерации

---

## Tokens used
- surface-app-shell, surface-default, surface-subtle
- text-default, text-muted, text-accent, text-success, text-warning
- border-default, border-focus, bg-warning-subtle
- space-3, space-4, space-6
