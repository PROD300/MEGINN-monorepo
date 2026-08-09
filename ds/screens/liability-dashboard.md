# Screen: LiabilityDashboard

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `239:2`

---

## Layout type
Standard AppShell: AppTopBar + AppSidebar + Main.
1440×1024 desktop. Sidebar active: Liability & Compliance.

---

## Composition

### AppTopBar
- Component instance (128:2), FILL × FIXED 64px

### AppSidebar
- Component instance (128:10), FIXED 240px × FILL
- Active item: Liability & Compliance (нужен override — в текущем AppSidebar нет этого пункта явно)
- Note: при вёрстке override text + active state на 3-м NavItem

### Main (FILL × HUG, vertical, gap 0)

#### PageHeader
- FILL × HUG, horizontal, space-between, padding space-4
- Title: «Liability & Compliance» DS/Heading/xl text-default
- Button/secondary/md «Download Report» (Lucide/download 16px)
- Bottom border: border-default

#### RiskStatusRow (StatsRow pattern)
- FILL × HUG, horizontal, gap space-4, padding space-4
- 3 × StatCard instance:
  - StatCard/success: «Platform Status» / «Operational» / «All systems running»
  - StatCard/success: «Legal Coverage» / «100%» / «All transactions covered (F17)»
  - StatCard/neutral: «Compliance Flags» / «0» / «No open issues»

#### LiabilityFrameworkSection
- FILL × HUG, vertical, gap space-3, padding space-4

  **SectionTitle:** «Liability Framework (F17)» DS/Heading/lg

  **LiabilityCardsRow (horizontal, gap space-4)**
  - 3 × LiabilityCard (inline composition — кандидат на вынос в UI kit):
    
    **LiabilityCard: «Autonomous Rebalancing»**
    - FILL × HUG, vertical, gap space-3, padding space-4
    - Fill: surface-default, Border: border-default, Radius: radius-md, Shadow: shadow-sm
    - Icon: Lucide/zap 20px text-accent
    - Title: «Autonomous Rebalancing» DS/Heading/lg
    - Responsible: «Smart Account Protocol» DS/Body/sm text-default
    - Description: «Executed automatically per your rules. No manual approval required.» DS/Body/xs text-muted
    - Footer badge: Badge/success «Covered»
    
    **LiabilityCard: «Bridge Operations (F20)»**
    - Same structure
    - Icon: Lucide/git-merge 20px text-accent
    - Title: «Bridge Operations»
    - Responsible: «Li.Fi Protocol»
    - Description: «Cross-chain transfers governed by Li.Fi terms. Slippage guard active.» DS/Body/xs text-muted
    - Footer badge: Badge/success «Covered»
    
    **LiabilityCard: «User Responsibility»**
    - Same structure
    - Icon: Lucide/user-check 20px text-muted
    - Title: «Your Responsibility»
    - Responsible: «Account Owner (James Harrington)»
    - Description: «Rule configuration, oversight, emergency stop authority.» DS/Body/xs text-muted
    - Footer badge: Badge/info «Active»

#### AgreementStatusSection
- FILL × HUG, horizontal, gap space-4, padding space-4, align start

  **AgreementCard (Card/default instance, FILL, shadow-sm)**
  - SectionTitle «Legal Agreement» DS/Heading/lg
  - StatusRow (horizontal, gap space-2, align center):
    - Lucide/check-circle 16px text-success
    - «Signed» DS/Body/sm Medium text-success
  - MetaRows (vertical, gap space-1, DS/Body/xs text-muted):
    - «Signed by: James Harrington»
    - «Role: Family Office CIO»
    - «Date: May 5, 2026»
  - Button/ghost/md «View Agreement»

  **RiskAllocationCard (Card/default instance, FILL × HUG, shadow-sm)**
  - SectionTitle «Portfolio Risk Status» DS/Heading/lg
  - Table/default instance (60:46):
    - Columns: Asset · Allocation · Target · Deviation · Risk
    - USDC: 43.1% / 45% / -1.9% / Badge/success «Low»
    - ETH: 32% / 30% / +2.0% / Badge/warning «Medium»
    - stETH: 18.3% / 20% / -1.7% / Badge/success «Low»
    - USDT: 6.6% / 5% / +1.6% / Badge/warning «Medium»

---

## Edge cases

### UnsignedAgreement (visible: false)
- Заменяет AgreementCard
- bg-warning-subtle card с текстом «Legal Agreement unsigned. Review and sign to activate automated trading.»
- Button/primary/md «Sign Agreement»

---

## Tokens used
- surface-app-shell, surface-default, bg-warning-subtle
- text-default, text-muted, text-accent, text-success, text-warning
- border-default
- space-1, space-2, space-3, space-4
- shadow-sm
- Icons: Lucide/download 16px, Lucide/zap 20px, Lucide/git-merge 20px, Lucide/user-check 20px, Lucide/check-circle 16px
