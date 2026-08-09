# Screen: LegalTerms

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `240:2`

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
- Active item: Liability & Compliance

### Main (FILL × HUG, vertical, gap 0)

#### PageHeader
- FILL × HUG, vertical, gap space-1, padding space-3 H / space-3 V
- Breadcrumb: «Liability & Compliance» text-accent + «/» + «Legal Agreement» text-muted (Lucide/chevron-right 12px)
- Title: «Legal Agreement & Liability Terms» DS/Heading/xl text-default
- Bottom border: border-default

#### ContentArea (FILL × HUG, horizontal, gap space-6, padding space-6, align start)

  ##### DocumentColumn (FILL × HUG, vertical, gap space-4)

  **DocumentCard (Card/default instance 89:6, FILL, shadow-sm)**
  - Padding space-6 inside
  - DocTitle: «OBSIDIAN Platform — Custodial Liability Agreement» DS/Heading/lg text-default
  - DocMeta: «Version 1.0 · Effective May 2026 · English» DS/Body/xs text-muted
  - Divider H-1 border-default
  
  - Section (vertical, gap space-3):
    - H3: «1. Autonomous Rebalancing» DS/Heading/lg
    - Text: «By activating rebalancing rules, you authorize the Smart Account protocol to execute trades on your behalf without per-transaction approval, within the parameters you define.» DS/Body/sm text-default
    
  - Section:
    - H3: «2. Bridge Operations (F20)»
    - Text: «Cross-chain bridge operations via Li.Fi, Socket, and Across protocols are governed by their respective terms. OBSIDIAN provides routing and monitoring but is not responsible for bridge provider failures.»
    
  - Section:
    - H3: «3. Emergency Stop (F22)»
    - Text: «You retain full authority to halt all automated operations at any time via the Emergency Stop function. Activation is immediate and irreversible until manually re-enabled.»
    
  - Section:
    - H3: «4. Audit Logging (F15)»
    - Text: «All automated actions are recorded in an immutable audit log. You may export this data at any time for compliance reporting.»
    
  - Section:
    - H3: «5. User Obligations»
    - Text: «You are responsible for: (a) setting appropriate rule parameters; (b) maintaining sufficient gas balance; (c) reviewing post-factum notifications; (d) activating Emergency Stop if needed.»

  ##### SideColumn (FIXED 320px × HUG, vertical, gap space-4)

  **SignatureCard (Card/default instance 89:6, shadow-md)**
  - SectionTitle «Sign Agreement» DS/Heading/lg
  - StatusBadge: Badge/warning «Awaiting Signature» (or Badge/success «Signed» if already done)
  - Divider
  - UserInfo (vertical, gap space-1, DS/Body/xs text-muted):
    - Lucide/user 14px + «James Harrington»
    - Lucide/briefcase 14px + «Family Office CIO»
    - Lucide/calendar 14px + «Date: Jun 16, 2026»
  - CheckboxRow (horizontal, gap space-2, padding space-2 V):
    - Checkbox (placeholder rect 16×16, border-default, radius-sm)
    - «I have read and understood all terms» DS/Body/xs text-default
  - Button/primary/md «Sign Agreement» FILL
  - «Once signed, automated trading will be enabled.» DS/Body/xs text-muted align-center

  **WarningCard**
  - FILL × HUG, padding space-3, bg-warning-subtle, border-warning border-left 3px, radius-md
  - Lucide/alert-triangle 14px text-warning
  - «Signing authorizes autonomous execution within your defined rules. Rules remain under your control at all times.» DS/Body/xs text-muted

---

## Edge cases

### AlreadySigned (replaces SignatureCard signature area)
- visible: false
- Status: Badge/success «Signed»
- «Signed on May 5, 2026» DS/Body/xs text-muted
- Button/ghost/md «Re-sign» (if new version)

---

## Tokens used
- surface-app-shell, surface-default, bg-warning-subtle
- text-default, text-muted, text-accent, text-warning
- border-default, border-warning
- space-1, space-2, space-3, space-4, space-6
- shadow-sm, shadow-md, radius-md, radius-sm
- Icons: Lucide/chevron-right 12px, Lucide/user 14px, Lucide/briefcase 14px, Lucide/calendar 14px, Lucide/alert-triangle 14px
