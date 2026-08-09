# Screen: NotFound

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `249:2`

---

## Layout type
AppShell (minimal — user is likely logged in). Main area: centered 404 content.
1440×1024 desktop.

---

## Composition

### AppTopBar
- Component instance (128:2), FILL × FIXED 64px

### AppSidebar
- Component instance (128:10), FIXED 240px × FILL
- Active item: none

### Main (FILL × HUG, vertical, gap 0)

#### ErrorBody (FILL × HUG, vertical, justify center, align center, padding space-12 V)

  **NotFoundCard (FIXED 480 × HUG, vertical, gap space-6, padding space-8)**
  - Fill: surface-default, Border: border-default, Radius: radius-lg

  **NumberDisplay**: «404» DS/Heading/3xl (font-size 48px) text-muted letter-spacing-tight (align-center)

  **Divider** H-1 border-default FILL

  **Title**: «Page not found» DS/Heading/xl text-default (align-center)

  **Description**: «The page you're looking for doesn't exist or may have been moved. Check the URL and try again.» DS/Body/sm text-muted (align-center)

  **CTA Row (horizontal, gap space-3, justify center, padding space-4 T)**
  - Button/primary/md «Back to Portfolio»
  - Button/ghost/md «Go to Dashboard»

  **SupportLink**: «Need help? Contact support →» DS/Body/xs text-accent (align-center)

---

## Tokens used
- surface-app-shell, surface-default, border-default
- text-default, text-muted, text-accent
- space-4, space-6, space-8, space-12
- radius-lg
