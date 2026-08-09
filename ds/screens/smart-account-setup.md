# Screen: SmartAccountSetup

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `243:2`

---

## Layout type
Standard AppShell: AppTopBar + AppSidebar + Main.
1440×1024 desktop. Sidebar active: Account Settings.

---

## Composition

### AppTopBar
- Component instance (128:2), FILL × FIXED 64px

### AppSidebar
- Component instance (128:10), FIXED 240px × FILL
- Active item: Account Settings (secondary section)

### Main (FILL × HUG, vertical, gap 0)

#### PageHeader
- FILL × HUG, horizontal, space-between, padding space-4
- Title: «Smart Account Setup» DS/Heading/xl text-default
- Button/primary/md «+ Add Role» (Lucide/user-plus 16px)
- Bottom border: border-default

#### SmartAccountInfoBanner
- FILL × HUG, horizontal, gap space-3, padding space-3
- Fill: bg-info-subtle, border-bottom: border-default, left-border 3px border-focus
- Lucide/shield 14px text-accent
- «F01: Smart Account — self-custody wallet with role-based automation. Your funds are always under your control.» DS/Body/xs text-muted

#### WalletsSection
- FILL × HUG, vertical, gap space-3, padding space-4
- SectionTitle: «Connected Wallets» DS/Heading/lg
- 2 × WalletRow (inline composition — кандидат на вынос при ≥3 использованиях):
  
  **WalletRow: Primary Wallet**
  - FILL × HUG, horizontal, gap space-3, padding space-3, align center
  - Fill: surface-default, Border: border-default, Radius: radius-md
  - Left: Lucide/wallet 20px text-accent
  - Middle (FILL, vertical, gap space-1):
    - «Primary Wallet» DS/Body/sm Medium text-default
    - «0x4aB2...c1F8» DS/Body/xs text-muted (monospace)
    - «Ethereum · Arbitrum» DS/Body/xs text-muted
  - Right: Badge/success «Primary» + Button/ghost/sm «Disconnect»
  
  **WalletRow: Hardware Wallet**
  - Same structure
  - Left: Lucide/cpu 20px text-muted
  - «Hardware Wallet (Ledger)» + «0x9eC1...a3D2» + «Ethereum»
  - Badge/info «Backup» + Button/ghost/sm «Disconnect»
  
  **AddWalletRow (dashed border, FILL × HUG, center-aligned, padding space-3)**
  - Border-dashed border-default, Radius: radius-md
  - Lucide/plus-circle 16px text-muted + «Connect another wallet» DS/Body/sm text-muted

#### RolesSection
- FILL × HUG, vertical, gap space-3, padding space-4
- SectionTitle: «Roles & Permissions» DS/Heading/lg

  **3 × RoleRow (inline composition — кандидат на вынос в UI kit, 3+ копий):**
  
  **RoleRow: CIO (Owner)**
  - FILL × HUG, horizontal, gap space-3, padding space-3, align center
  - Fill: surface-default, Border: border-default, Radius: radius-md
  - Left: Avatar placeholder 36×36 (surface-level-2, radius-pill)
  - Middle (FILL, vertical, gap space-1):
    - «James Harrington» DS/Body/sm Medium text-default
    - «CIO · Full access» DS/Body/xs text-muted
    - «0x4aB2...c1F8» DS/Body/xs text-muted monospace
  - Right: Badge/success «Active» + Button/ghost/sm «Edit»
  
  **RoleRow: Operator**
  - Same structure (no avatar — just initials rect)
  - «DeFi Operator» + «Execute only — Read + Execute rules» + «0x9eC1...a3D2»
  - Badge/success «Active» + Edit
  
  **RoleRow: Emergency Contact**
  - «Emergency Contact» + «View only — read-only monitoring» + «email: ops@familyoffice.com»
  - Badge/info «Inactive» + Edit

#### SecuritySection
- FILL × HUG, vertical, gap space-3, padding space-4
- SectionTitle: «Security Settings» DS/Heading/lg
- SecurityRow 1 (horizontal, gap space-3, align center, padding space-3 V):
  - Lucide/lock 16px text-muted
  - «Multi-sig required for amounts above» DS/Body/sm text-default
  - Input/default FIXED 140px value «10,000 USD»
  - «FILL → text-muted» DS/Body/xs
- SecurityRow 2:
  - Lucide/hardware 16px (use Lucide/cpu)
  - «Hardware wallet confirmation for critical actions» DS/Body/sm
  - Toggle placeholder (FIXED 44×24, Radius pill, fill accent-500 = ON)
- Bottom border on each row: border-default

---

## Edge cases

### AddRoleModal (visible: false)
- Modal instance (45:18) — «Add New Role»
- Input fields: Name / Wallet address / Permission level Select / Notify toggle

---

## Tokens used
- surface-app-shell, surface-default, surface-level-2, bg-info-subtle
- text-default, text-muted, text-accent, text-success
- border-default, border-focus
- space-1, space-2, space-3, space-4
- radius-md, radius-pill
- Icons: Lucide/user-plus 16px, Lucide/shield 14px, Lucide/wallet 20px, Lucide/cpu 20px, Lucide/plus-circle 16px, Lucide/lock 16px
