# Screen: Onboarding

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `236:2`

---

## Layout type
AppTopBar (dark) + main content center (no sidebar — пользователь ещё не онбордился).
Background: surface-default.
1440×1024 desktop.

---

## Composition

### AppTopBar
- Component instance (128:2), FILL × FIXED 64px

### OnboardingBody
- FILL × HUG, vertical, gap space-8, align center, padding space-12 V

#### StepIndicator
- FIXED 480 × HUG, horizontal, gap 0, justify center
- 3 × StepDot: step number + title line
  - StepDot/active (step 1): filled circle accent-500 + «Smart Account» text-accent DS/Body/xs
  - StepDot/default (step 2): circle border-default + «Permissions» text-muted DS/Body/xs
  - StepDot/default (step 3): circle border-default + «Review» text-muted DS/Body/xs
- Connector lines between dots: FILL H-1 border-default / border-focus (for completed)
- Progress text: «Step 1 of 3» DS/Body/xs text-muted align-center

#### StepCard (показывается Step 1 — Connect Smart Account)
- FIXED 640 × HUG, vertical, gap space-6, padding space-8
- Fill: surface-default
- Border: border-default
- Radius: radius-lg
- Shadow: shadow-md

**StepHeader**
- FILL × HUG, vertical, gap space-2
- Lucide/shield-check 32px text-accent align-center
- «Connect Smart Account» DS/Heading/xl text-default align-center
- «Link your wallet to create an institutional Smart Account with role-based permissions.» DS/Body/sm text-muted align-center

**SmartAccountInfo (bg-info-subtle, border-focus left 3px, padding space-3, radius-md)**
- «F01: Smart Accounts enable rule-based automation without signing every transaction. Your funds remain under self-custody at all times.» DS/Body/xs text-muted

**WalletConnectRow (FILL × HUG, vertical, gap space-3)**
- Button/primary/lg «Connect Wallet» (Lucide/wallet 16px) FILL
- «Supports: MetaMask · Ledger · Gnosis Safe · WalletConnect» DS/Body/xs text-muted align-center

**AlreadyConnected (visible: false, заменяет WalletConnectRow)**
- FILL × HUG, horizontal, gap space-3, padding space-3
- Fill: bg-success-subtle, border-default, radius-md
- Lucide/check-circle 16px text-success
- «0x4aB2...c1F8 — Connected» DS/Body/sm text-default
- Button/ghost/md «Disconnect»

**StepCTA (FILL × HUG, horizontal, space-between)**
- Button/ghost/sm «← Back» (disabled on step 1)
- Button/primary/md «Continue →»

---

## Edge cases

### WalletError
- visible: false, inside WalletConnectRow
- «Unable to connect wallet. Please try again.» DS/Body/xs text-error

---

## Tokens used
- surface-app-shell, surface-default, bg-info-subtle, bg-success-subtle
- text-default, text-muted, text-accent, text-success, text-error
- border-default, border-focus
- space-2, space-3, space-6, space-8, space-12
- shadow-md, radius-lg, radius-md
- Icons: Lucide/shield-check 32px, Lucide/wallet 16px, Lucide/check-circle 16px
