# Screen: CrossChainBridge

**Wireframe Node ID:** `9:2`
**Final Screen Node ID:** `144:156`

---

## Composition

### AppTopBar
- Component instance (new A), FILL × FIXED 64px

### AppSidebar
- Component instance (new B), FIXED 240px × FILL
- Active item: Rebalancing Rules (bridge is sub-section)

### Main (FILL × HUG, vertical, gap 0)

#### PageHeader
- FILL × HUG, vertical, gap space-1, padding space-3 H / space-3 V
- Breadcrumb: «Rebalancing Rules» text-accent + «/» + «Cross-chain Bridge» text-muted, Lucide/chevron-right 12px
- Title: «Cross-chain Bridge» DS/Heading/xl

#### F20InfoBanner
- FILL × HUG, horizontal, gap space-3, padding space-3
- fill: bg-info-subtle, border-bottom: border-default, left-border 3px border-focus
- Left: Lucide/zap 16px text-accent
- Text column:
  - «F20 Cross-chain Bridge» DS/Body/sm Medium text-accent
  - «— обязательная зависимость F21 AI Auto-Rebalancing. Обеспечивает кросс-чейн доступ к активам во всех поддерживаемых сетях.» DS/Body/xs text-muted
  - «Провайдеры: Li.Fi (Primary) · Socket (Fallback) · Across (Fallback)» DS/Body/xs text-muted

#### BridgeProvidersSection
- FILL × HUG, vertical, gap space-3, padding space-4

  **SectionTitle:** «Bridge Providers» DS/Heading/lg

  **ProvidersRow (horizontal, gap space-4)**
  - 3 × BridgeProviderCard instances:
    - BridgeProviderCard/active-primary: «Li.Fi» / Badge/success «Active — Primary» / «Avg time: 42 sec avg» / «Volume: $2.1M today»
    - BridgeProviderCard/active-fallback: «Socket» / Badge/info «Active — Fallback» / «Avg time: 55 sec avg» / «Volume: $0 today»
    - BridgeProviderCard/active-fallback: «Across» / Badge/info «Active — Fallback» / «Avg time: 38 sec avg» / «Volume: $0 today»

#### ActiveBridgesSection
- FILL × HUG, vertical, gap 0, padding space-4

  **SectionTitle:** «Active Bridges» DS/Heading/lg

  **Table/default instance (Density=default)**
  - Columns: Rule · From · To · Asset · Amount · Status · ETA
  - Row: RWA Cross-chain Rebalance · Ethereum · Arbitrum · USDC · $2 100 000 · «In Progress» (text-accent) · ~18 sec

  **NoActiveBridges text** (visible when empty): «No other active bridges» DS/Body/xs text-muted

#### BridgeHistorySection
- FILL × HUG, vertical, gap 0, padding space-4

  **SectionHeader (horizontal, space-between)**
  - «Bridge History» DS/Heading/lg
  - «View full audit log →» DS/Body/sm text-accent

  **Table/default instance (Density=default)**
  - Columns: Rule · From · To · Asset · Amount · Provider · Duration · Result
  - Row 1: RWA Cross-chain Rebalance · Ethereum · Arbitrum · USDC · $2 100 000 · Li.Fi · 41 sec · «Success» text-success
  - Row 2: RWA Cross-chain Rebalance · Ethereum · Arbitrum · USDC · $1 800 000 · Li.Fi · 43 sec · «Success» text-success
  - Row 3: ETH Balance Guard · Ethereum · Arbitrum · ETH · $4 200 000 · Li.Fi · 39 sec · «Success» text-success

#### FooterStats
- FILL × HUG, horizontal, gap space-6, padding space-3 H / space-3 V
- Background: surface-subtle, border-top: border-default
- «Total bridged (24h): $8 100 000» · «Avg bridge time: 41 sec» · «Success rate: 100%» · «Active provider: Li.Fi» DS/Body/xs text-muted
- «F20 Cross-chain Bridge — required dependency of F21 AI Auto-Rebalancing Engine (restored to MVP v1.0)» DS/Body/xs text-accent

---

## Edge cases

### EmptyActiveBridges
- visible: false (заменяет Table в ActiveBridgesSection)
- Text: «No active bridge operations» DS/Body/xs text-muted, center-aligned, padding space-6

### ProviderError
- visible: false для BridgeProviderCard с error state
- Badge/error override на соответствующем провайдере

## Edge cases — осознанно пропущены / запланированы (аудит 2026-05-14)

- BridgeProviders / all-providers-down: пропущено, добавить в следующей итерации — критическое состояние для B2B
- ActiveBridges / loading: пропущено, добавить в следующей итерации
- ActiveBridges / bridge-error: пропущено, добавить в следующей итерации
- BridgeHistory / empty: пропущено, добавить в следующей итерации
- BridgeHistory / loading: пропущено, добавить в следующей итерации
- BridgeHistory / error: пропущено, добавить в следующей итерации

---

## Tokens used
- surface-app-shell, surface-default, surface-subtle, bg-info-subtle
- text-default, text-muted, text-accent, text-success
- border-default, border-focus
- space-2, space-3, space-4, space-6
