# Screen: NetworkError

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `247:2`

---

## Layout type
AppShell present (user is logged in when error occurs). Main area: centered error content.
1440×1024 desktop.

---

## Composition

### AppTopBar
- Component instance (128:2), FILL × FIXED 64px

### AppSidebar
- Component instance (128:10), FIXED 240px × FILL
- Active item: Portfolio (wherever user was)

### Main (FILL × HUG, vertical, gap 0)

#### ErrorBody (FILL × HUG, vertical, justify center, align center, padding space-12 V)

  **ErrorCard (FIXED 560 × HUG, vertical, gap space-6, padding space-8)**
  - Fill: surface-default, Border: border-default, Radius: radius-lg, Shadow: shadow-lg

  **ErrorIcon**: Lucide/wifi-off 48px text-error (align-center)
  
  **ErrorTitle**: «Network Error» DS/Heading/2xl text-error (align-center)
  
  **ErrorDescription**: «Unable to connect to the blockchain network. Portfolio data may be stale.» DS/Body/sm text-muted (align-center)

  **Divider** H-1 border-default

  **NetworkStatusSection (vertical, gap space-2, FILL)**
  - SectionLabel: «Connection Status» DS/Body/xs text-muted
  - StatusRow: Lucide/circle-x 14px text-error + «Ethereum RPC — Disconnected» DS/Body/sm text-default
  - StatusRow: Lucide/circle-x 14px text-error + «Arbitrum RPC — Disconnected» DS/Body/sm text-default
  - StatusRow: Lucide/wifi-off 14px text-muted + «Bridge Provider (Li.Fi) — Unknown» DS/Body/sm text-muted

  **Divider** H-1 border-default

  **InstructionsSection (vertical, gap space-2, FILL)**
  - SectionLabel: «Troubleshooting» DS/Body/xs text-muted
  - StepList (vertical, gap space-1, DS/Body/xs text-default):
    - «1. Check your internet connection»
    - «2. RPC providers may be experiencing downtime»
    - «3. Try switching to a backup RPC in Settings»
    - «4. Your assets are safe — automation is paused during outages»

  **CTA Row (horizontal, gap space-3, justify center, padding space-4 T)**
  - Button/primary/md «Retry Connection» (Lucide/refresh-cw 16px)
  - Button/ghost/md «Go to Settings»

  **StatusLink: «Check provider status →» DS/Body/xs text-accent align-center**

---

## Edge cases

### PartialOutage (visible: false — one RPC down, other OK)
- Only one StatusRow shows circle-x, other shows Lucide/check-circle text-success
- ErrorTitle: «Partial Network Issue»
- Description: «Ethereum RPC unavailable. Arbitrum operations continue normally.»

---

## Tokens used
- surface-app-shell, surface-default
- text-default, text-muted, text-accent, text-error
- border-default
- space-1, space-2, space-4, space-6, space-8, space-12
- shadow-lg, radius-lg
- Icons: Lucide/wifi-off 48px + 14px, Lucide/circle-x 14px, Lucide/refresh-cw 16px, Lucide/check-circle 14px
