# Screen: TransactionError

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `248:2`

---

## Layout type
AppShell present. Main area: centered error content with context about the failed transaction.
F22 adjacent — rule auto-paused after this error. Slippage Guard (F22) or Gas limit exceeded.
1440×1024 desktop.

---

## Composition

### AppTopBar
- Component instance (128:2), FILL × FIXED 64px

### AppSidebar
- Component instance (128:10), FIXED 240px × FILL
- Active item: Rebalancing Rules

### Main (FILL × HUG, vertical, gap 0)

#### ErrorBody (FILL × HUG, horizontal, gap space-6, padding space-6, align start)

  ##### ErrorCard (FILL × HUG, vertical, gap space-4, align center)

  **ErrorHeader (vertical, gap space-3, align center)**
  - Lucide/alert-triangle 48px text-error
  - «Transaction Failed» DS/Heading/2xl text-error
  - Badge/error «Slippage Exceeded» (or «Gas Too High» variant — visible: false for gas)

  **Divider** H-1 border-default FILL

  **TransactionDetailsCard (Card/default 89:6, FILL, shadow-sm)**
  - SectionTitle «Failed Transaction Details» DS/Heading/lg
  - DetailRows (vertical, gap space-2, FILL, DS/Body/sm):
    - «Rule triggered:» text-muted + «USDT Ceiling» text-default
    - «Attempted action:» text-muted + «Sell $30 000 000 USDT → USDC» text-default
    - «Network:» text-muted + «Arbitrum» text-default
    - «Failure reason:» text-muted + «Slippage 2.1% exceeded limit 0.8%» text-error
    - «Gas at execution:» text-muted + «22 Gwei (within limit)» text-default
    - «Bridge involved:» text-muted + «No (same-chain)» text-muted
    - «Timestamp:» text-muted + «Jun 15, 2026 · 19:55 UTC» text-default

  **AutomaticActionBanner**
  - FILL × HUG, horizontal, gap space-3, padding space-3
  - Fill: bg-warning-subtle, border-left 3px border-warning, radius-md
  - Lucide/pause-circle 16px text-warning
  - «Rule automatically paused. USDT Ceiling will not execute until you review and resume it.» DS/Body/xs text-warning

  **CTA Row (horizontal, gap space-3, FILL, justify center, padding space-4 T)**
  - Button/primary/md «Review Rule Settings» (→ RuleDetail)
  - Button/ghost/md «Back to Rebalancing Rules»
  - Button/ghost/md «View in Audit Log»

  ##### SideColumn (FIXED 320px × HUG, vertical, gap space-4)

  **PreventionCard (Card/default 89:6, shadow-sm)**
  - SectionTitle «How to Resolve» DS/Heading/lg
  - Steps (vertical, gap space-2, DS/Body/xs text-default):
    - «1. Review the current slippage conditions»
    - «2. Consider increasing slippage tolerance (current: 0.8%)»
    - «3. Or wait for lower volatility before resuming»
    - «4. Resume rule from Rebalancing Rules screen»
  - Divider
  - «Assets are safe — no transaction executed.» DS/Body/xs text-success Lucide/shield 12px

  **SimilarIncidents (Card/default 89:6, shadow-sm)**
  - SectionTitle «Related Events» DS/Heading/lg
  - 2 × mini ActivityRow (ActivityRow instance 130:39):
    - warning: «Rule paused — USDT Ceiling» · 1d ago
    - info: «Gas skipped — ETH Balance Guard» · 2d ago

---

## Edge cases

### GasExceeded variant (visible: false — alternate error type)
- Badge: «Gas Too High»
- Failure reason: «Gas 45 Gwei exceeded limit 25 Gwei»
- Slippage field: «N/A»

---

## Tokens used
- surface-app-shell, surface-default, bg-warning-subtle
- text-default, text-muted, text-error, text-warning, text-success
- border-default, border-warning
- space-2, space-3, space-4, space-6
- shadow-sm, radius-md
- Icons: Lucide/alert-triangle 48px, Lucide/pause-circle 16px, Lucide/shield 12px
