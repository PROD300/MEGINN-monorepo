# Screen: RuleDetail

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `237:2`

---

## Layout type
Standard AppShell: AppTopBar + AppSidebar + Main.
1440×1024 desktop. Sidebar active: Rebalancing Rules.

---

## Composition

### AppTopBar
- Component instance (128:2), FILL × FIXED 64px

### AppSidebar
- Component instance (128:10), FIXED 240px × FILL
- Active item: Rebalancing Rules

### Main (FILL × HUG, vertical, gap 0)

#### PageHeader
- FILL × HUG, vertical, gap space-2, padding space-4
- Breadcrumb (horizontal, gap space-1, align center):
  - «Rebalancing Rules» DS/Body/xs text-accent
  - Lucide/chevron-right 12px text-muted
  - «ETH Balance Guard» DS/Body/xs text-muted
- TitleRow (horizontal, gap space-3, align center):
  - «ETH Balance Guard» DS/Heading/xl text-default
  - Badge/success «Active»
  - Spacer (FILL)
  - Button/secondary/md «Edit Rule»
  - Button/ghost/md «Pause Rule»
- Bottom border: border-default

#### RuleOverviewSection
- FILL × HUG, horizontal, gap space-4, padding space-4

  **RuleConditionCard** (Card/default instance 89:6, FILL, shadow-sm)
  - SectionTitle «Trigger» DS/Heading/lg
  - Row: «If» text-muted + «ETH allocation» text-default + «>» text-accent + «32%» text-default DS/Body/sm
  - Row: «then» text-muted + «Sell excess to USDC» text-default DS/Body/sm
  - Divider
  - MetaRow (vertical, gap space-2):
    - «Network: Arbitrum» Lucide/layers 12px + DS/Body/xs text-muted
    - «Last triggered: 2h ago» Lucide/clock 12px + DS/Body/xs text-muted
    - «Next check: in 14 min» Lucide/refresh-cw 12px + DS/Body/xs text-accent

  **ExecutionSettingsCard** (Card/default instance 89:6, FIXED 320px, shadow-sm)
  - SectionTitle «Execution Settings» DS/Heading/lg
  - LabelValueRows (vertical, gap space-2, DS/Body/xs):
    - «Target allocation» · «30%» text-default
    - «Max slippage» · «0.8%» text-default
    - «Max gas price» · «25 Gwei» text-default
    - «Execution» · «Any time» text-default
    - «Cross-chain» · «Yes — via Li.Fi (F20)» text-accent
  - SubLabel: «Bridge fee included in slippage tolerance» DS/Body/xs text-muted

#### ExecutionHistorySection
- FILL × HUG, vertical, gap 0, padding space-4

  **SectionHeader (horizontal, space-between)**
  - «Execution History» DS/Heading/lg
  - «View full audit log →» DS/Body/sm text-accent

  **Table/default instance (60:46)**
  - FILL × HUG
  - Columns: Timestamp · Triggered At · Action · Amount · Gas · Bridge · Result
  - 5 rows (mix of success, one skipped-gas):
    - Row 1: «Jun 16, 2026 14:22» · ETH 32.1% · Sell ETH → USDC · $4 200 000 · 22 Gwei · Li.Fi 41 sec · «Success» text-success
    - Row 2: «Jun 15, 2026 22:10» · ETH 32.4% · Sell ETH → USDC · $5 100 000 · 23 Gwei · Li.Fi 39 sec · «Success» text-success
    - Row 3: «Jun 14, 2026 08:55» · ETH 33.0% · Sell ETH → USDC · $6 800 000 · 28 Gwei · — · «Skipped — Gas» text-warning Badge/warning
    - Row 4: «Jun 12, 2026 16:40» · ETH 32.5% · Sell ETH → USDC · $4 700 000 · 21 Gwei · Li.Fi 43 sec · «Success» text-success
    - Row 5: «Jun 10, 2026 09:15» · ETH 32.8% · Sell ETH → USDC · $5 600 000 · 20 Gwei · Li.Fi 38 sec · «Success» text-success

#### FooterStats
- FILL × HUG, horizontal, gap space-6, padding space-3 H / space-3 V
- Background: surface-subtle, border-top: border-default
- «Total executed: 4 times · Total volume: $20.6M · Avg execution: 40 sec» DS/Body/xs text-muted

---

## Edge cases

### NoHistory (EmptyState)
- visible: false, внутри ExecutionHistorySection (заменяет Table)
- «No executions yet. Rule will trigger automatically when conditions are met.» DS/Body/xs text-muted, padding space-6 center

### PausedBanner
- visible: false, между PageHeader и RuleOverviewSection
- FILL × HUG, padding space-3 H / space-2 V, bg-warning-subtle, border-bottom border-warning
- «Rule is paused. Reason: Slippage exceeded 1.2%. Resume when conditions improve.» DS/Body/xs text-warning

---

## Tokens used
- surface-app-shell, surface-default, surface-subtle, bg-warning-subtle, bg-info-subtle
- text-default, text-muted, text-accent, text-success, text-warning
- border-default, border-warning
- space-1, space-2, space-3, space-4, space-6
- shadow-sm
- Icons: Lucide/chevron-right 12px, Lucide/layers 12px, Lucide/clock 12px, Lucide/refresh-cw 12px
