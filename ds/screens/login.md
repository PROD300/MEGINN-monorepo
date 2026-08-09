# Screen: Login

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `234:2`

---

## Layout type
Full-screen centered — нет AppTopBar / AppSidebar (pre-auth экран).
Background: surface-app-shell (gray-900) — тёмная, premium fintech тональность.
1440×1024 desktop.

---

## Composition

### Background
- FIXED 1440 × HUG (или FIXED 1024 для canvas)
- Fill: surface-app-shell

### CenterWrapper
- FILL × HUG, horizontal, justify center, align center, padding space-12 V
- 1 child: LoginCard

### LoginCard
- FIXED 480 × HUG, vertical, gap space-6, padding space-8
- Fill: surface-default (gray-50)
- Border: border-default
- Radius: radius-lg
- Shadow: shadow-lg

#### LogoBlock
- FILL × HUG, vertical, gap space-1, align center, padding space-2 V
- «OBSIDIAN» DS/Heading/2xl text-default letter-spacing-tight
- «Institutional Portfolio Management» DS/Body/sm text-muted

#### Divider
- FILL × FIXED 1, fill border-default

#### WalletSection
- FILL × HUG, vertical, gap space-3
- SectionLabel: «Connect via wallet» DS/Body/xs text-muted align-center
- Button/primary/lg «Connect Wallet» (Lucide/wallet 16px + text) FILL
- SubLabel: «Supports: MetaMask · Ledger · Gnosis Safe» DS/Body/xs text-muted align-center

#### OrDivider
- FILL × HUG, horizontal, gap space-3, align center
- Line FILL H-1 border-default
- «or» DS/Body/xs text-muted
- Line FILL H-1 border-default

#### EmailSection
- FILL × HUG, vertical, gap space-3
- SectionLabel: «Sign in with email» DS/Body/xs text-muted
- Input/default/default FILL placeholder «Work email»
- Input/default/default FILL placeholder «Password» (type=password)
- Button/primary/lg «Sign In» FILL

#### FooterLinks
- FILL × HUG, horizontal, space-between
- «Forgot password?» DS/Body/xs text-accent
- «Request Access →» DS/Body/xs text-accent

---

## Edge cases

### ValidationError
- visible: false
- Input/error/default state on email/password + text-error label «Invalid email or password»

### LoadingState
- Button/primary/loading state on «Sign In»
- visible: false

---

## Tokens used
- surface-app-shell, surface-default, border-default
- text-default, text-muted, text-accent
- space-1, space-2, space-3, space-6, space-8, space-12
- shadow-lg, radius-lg
- Icons: Lucide/wallet 16px
