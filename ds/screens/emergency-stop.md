# Screen: EmergencyStop

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `246:2`

---

## Layout type
AppShell присутствует, но main area — тёмный overlay с центрированной confirmation card.
F22: Emergency Stop — one-click kill switch for all automated processes.
1440×1024 desktop.

---

## Composition

### AppTopBar
- Component instance (128:2), FILL × FIXED 64px

### AppSidebar
- Component instance (128:10), FIXED 240px × FILL
- Active item: none (global action)

### Main (FILL × HUG, vertical, gap 0)

#### PageHeader
- FILL × HUG, padding space-4
- Title: «Emergency Stop» DS/Heading/xl text-error (Lucide/octagon-alert 24px text-error inline)
- Bottom border: border-error

#### WarningBanner
- FILL × HUG, horizontal, gap space-3, padding space-4 H / space-3 V
- Fill: bg-error-subtle, border-bottom: border-error
- Lucide/alert-octagon 20px text-error
- «This action will immediately halt ALL automated operations: rebalancing rules, bridge transactions, and scheduled checks.» DS/Body/sm text-error Medium

#### StopContentArea (FILL × HUG, horizontal, gap space-6, padding space-6, align start)

  ##### ImpactColumn (FILL × HUG, vertical, gap space-4)

  **CurrentStatusCard (Card/default 89:6, FILL, shadow-sm)**
  - SectionTitle «Current Active Operations» DS/Heading/lg
  - ImpactRow (vertical, gap space-2, DS/Body/sm):
    - «Active rebalancing rules: 3» Lucide/zap 16px text-warning + «Will be paused»
    - «Active bridge operations: 1» Lucide/git-merge 16px text-warning + «Will be cancelled»
    - «Pending gas balance: 25 Gwei reserve» Lucide/fuel 16px text-muted
  - Divider
  - «After stop: all rules set to PAUSED. No transactions will execute until manually resumed.» DS/Body/xs text-muted

  **RecoveryCard (Card/default 89:6, FILL, shadow-sm)**
  - SectionTitle «Recovery» DS/Heading/lg
  - «To resume operations after Emergency Stop:» DS/Body/xs text-muted
  - Steps (vertical, gap space-2, DS/Body/xs):
    - «1. Review why stop was triggered»
    - «2. Check network/gas conditions»
    - «3. Re-activate rules one by one in Rebalancing Rules»
  - «Assets remain in your wallet at all times during stop.» DS/Body/xs Medium text-success

  ##### ConfirmColumn (FIXED 400px × HUG, vertical, gap space-4)

  **ConfirmCard**
  - FILL × HUG, vertical, gap space-4, padding space-6
  - Fill: surface-default, Border: border-error 2px, Radius: radius-lg, Shadow: shadow-lg
  - Lucide/octagon-alert 40px text-error (align-center)
  - «Stop All Operations?» DS/Heading/xl text-error (align-center)
  - «This cannot be undone automatically. You will need to manually re-enable each rule.» DS/Body/sm text-muted align-center
  - Divider
  - ConfirmInput (vertical, gap space-2):
    - «Type STOP to confirm» DS/Body/xs text-muted
    - Input/default FILL placeholder «STOP»
  - StopButton (Button row):
    - Full-width custom button: FILL, bg-error fill, text-on-dark text, «Stop All Operations» DS/Body/sm Medium
    - Note: use Button/primary/md with fill override to bg-error
  - Button/ghost/md «Cancel — Keep Running» FILL (text-muted)

---

## Edge cases

### StoppedState (visible: false — shows after stop confirmed)
- WarningBanner changes to: «All operations stopped. 0 active rules.» DS/Body/sm text-success
- StopButton disabled, text «Operations stopped» + Lucide/check 16px
- New section: Button/primary/md «Go to Rebalancing Rules to resume» FILL

---

## Tokens used
- surface-app-shell, surface-default, bg-error-subtle
- text-default, text-muted, text-error, text-success, text-warning, text-on-dark
- border-default, border-error
- space-2, space-3, space-4, space-6
- shadow-sm, shadow-lg, radius-lg, radius-md
- bg-error (raw for stop button fill)
- Icons: Lucide/octagon-alert 40px + 20px + 24px, Lucide/zap 16px, Lucide/git-merge 16px, Lucide/fuel 16px, Lucide/check 16px
