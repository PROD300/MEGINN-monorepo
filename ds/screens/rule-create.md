# Screen: RuleCreate

**Wireframe Node ID:** `8:2`
**Final Screen Node ID:** `143:113`

---

## Composition

### AppTopBar
- Component instance (new A), FILL × FIXED 64px

### AppSidebar
- Component instance (new B), FIXED 240px × FILL
- Active item: Rebalancing Rules

### Main (FILL × HUG, vertical, gap 0)

#### PageHeader
- FILL × HUG, vertical, gap space-1, padding space-3 H / space-3 V
- Breadcrumb: «Rebalancing Rules» text-accent DS/Body/xs + «/» text-muted + «Create Rule» text-muted
  - Lucide/chevron-right 12px between items
- Title: «Create Rebalancing Rule» DS/Heading/xl text-default
- Bottom border: border-default

#### ContentArea (FILL × HUG, horizontal, gap space-6, padding space-6)

  ##### FormColumn (FILL grow=1 × HUG, vertical, gap space-6)

  **Section: Rule Identity**
  - SectionTitle: «Rule Identity» DS/Heading/lg text-default
  - Field: «Rule Name» DS/Body/xs text-muted + Input/default/default (240→FILL) placeholder «ETH Rebalancing Guard»
  - Field: «Description (optional)» + Input/default/default FILL, placeholder «Keeps ETH allocation within target range»

  **Section: When should the rule fire?**
  - SectionTitle: «When should the rule fire?» DS/Heading/lg
  - Row (horizontal, gap space-3):
    - Field «Asset»: Select/default FIXED 340px, value «ETH»
    - Field «Network»: Select/default FIXED 340px, value «Ethereum»
  - Row (horizontal, gap space-2, align center):
    - «If allocation» DS/Body/sm text-muted
    - Select/default FIXED 64px value «>»
    - Input/default FIXED 80px value «35 %»
  - Hint: «Current ETH: 32.0% — rule will not fire until threshold is reached» DS/Body/xs text-muted

  **Section: What should happen?**
  - SectionTitle: «What should happen?»
  - Field «Action»: Select/default FILL value «Sell to rebalance»
  - Row (horizontal, gap space-2, align center):
    - «Sell» DS/Body/sm + Select/default 120px «ETH» + «into» + Select/default 120px «USDC»
  - Field «Target network for swap»: Select/default FILL value «Arbitrum»
  - Hint: «Different network? Cross-chain Bridge (F20) will be used automatically · powered by Li.Fi» DS/Body/xs text-muted

  **CrossChainInfoBox**
  - FILL × HUG, horizontal, gap space-3, padding space-3
  - fill: bg-info-subtle, left-border 3px border-focus (strokeLeftWeight=3)
  - Left column:
    - «Cross-chain execution: ETH will be bridged Ethereum → Arbitrum before swap.» DS/Body/sm Medium text-default
    - «Est. bridge time: ~40 sec. Bridge fee included in slippage tolerance.» DS/Body/xs text-muted
  - Lucide/info 16px text-accent

  **Field: Target allocation after rebalance**
  - «Target allocation after rebalance» DS/Body/xs text-muted
  - Input/default FIXED 200px value «30 %»

  **Section: Safety & Execution**
  - SectionTitle: «Safety & Execution»
  - Row (horizontal, gap space-6):
    - Field «Max slippage tolerance»: Input/default FIXED 240px value «0.8 %» + hint «Rule pauses if slippage exceeds this (incl. bridge fee F20)»
    - Field «Max gas price»: Input/default FIXED 240px value «25 Gwei» + hint «Transaction skipped if gas exceeds limit»

  **CTARow (horizontal, gap space-3, padding space-4 V 0 H)**
  - Button/primary/md «Save & Activate Rule»
  - Button/secondary/md «Save as Draft»
  - Button/ghost/md «Cancel»

  ##### PreviewColumn (FIXED 320px × HUG, vertical, gap space-4)

  **RulePreview Card**
  - Card/default (89:6 instance)
  - shadow-sm
  - SectionTitle: «Rule Preview» DS/Heading/lg
  - Table-like rows (vertical, gap space-2):
    - Name: «ETH Rebalancing Guard»
    - Trigger: «ETH > 35% on Ethereum»
    - Action: «Sell ETH → USDC on Arbitrum»
    - Execution: «Cross-chain via Bridge (F20 · Li.Fi)»
    - Target alloc: «30%»
    - Slippage guard: «0.8% (incl. bridge fee)»
    - Status: «Will activate immediately» DS/Body/sm Medium text-success

  **EstimatedImpact Card**
  - Card/default (89:6 instance)
  - SectionTitle: «Estimated Impact» DS/Heading/lg
  - Text rows:
    - «At current portfolio: no action needed (ETH at 32%)» DS/Body/xs text-muted
    - «Would trigger at: ~$14 700 000 ETH (32% → 35%)» DS/Body/xs text-default
    - «Estimated swap size: ~$9 800 000» DS/Body/sm Medium text-default

---

## Edge cases

### ValidationError (Rule Name empty)
- Input/error/default state, border-error, text-error «Rule name is required»
- visible: false по умолчанию

### CrossChainWarning (когда сеть не совпадает)
- CrossChainInfoBox visible: true (уже в wireframe)
- При совпадении сетей — visible: false

## Edge cases — осознанно пропущены / запланированы (аудит 2026-05-14)

- Form / submitting state: пропущено, добавить в следующей итерации (Button/primary/loading + disable inputs)
- Form / success state: пропущено, добавить в следующей итерации (confirmation + redirect)
- Form / server error: пропущено, добавить в следующей итерации (Toast/error)

## Figma-правки (аудит 2026-05-14)

Исправлены неверные типы компонентов в форме:
- field-Asset: Input → Select («ETH»)
- field-Network: Input → Select («Ethereum»)
- field-Action: Input → Select («Sell to rebalance»)
- field-Target network for swap: Input → Select («Arbitrum»)
- ConditionRow threshold: Select → Input («35 %»)
- EstimatedImpact: FRAME → Card/default instance

---

## Tokens used
- surface-app-shell, surface-default, bg-info-subtle
- text-default, text-muted, text-accent, text-success, text-error
- border-default, border-focus, border-error
- space-1, space-2, space-3, space-4, space-6
