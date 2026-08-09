# Screen: Settings

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `244:2`

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
- Active item: Account Settings

### Main (FILL × HUG, vertical, gap 0)

#### PageHeader
- FILL × HUG, padding space-4
- Title: «Account Settings» DS/Heading/xl text-default
- Bottom border: border-default

#### SettingsTabs (secondary nav within Main)
- FILL × HUG, horizontal, gap 0, padding 0 space-4
- 3 × Tabs instance (60:51):
  - Tabs/active «Profile»
  - Tabs/default «Notifications»
  - Tabs/default «Security»
- Bottom border: border-default

#### ContentArea (FILL × HUG, horizontal, gap space-6, padding space-6, align start)

  ##### ProfileColumn (FILL × HUG, vertical, gap space-6)

  **ProfileCard (Card/default 89:6, FILL, shadow-sm)**
  - SectionTitle «Profile» DS/Heading/lg
  - AvatarRow (horizontal, gap space-4, align center, padding space-4 V):
    - Avatar placeholder 64×64 (surface-level-2, radius-pill)
    - NameBlock (vertical, gap space-1):
      - «James Harrington» DS/Heading/lg text-default
      - «james@familyoffice.com» DS/Body/sm text-muted
      - Badge/info «Family Office CIO»
  - Divider H-1 border-default
  - FieldRows (vertical, gap space-3, padding space-3 V):
    - FieldRow: «Full Name» DS/Body/xs text-muted + Input/default FILL «James Harrington»
    - FieldRow: «Work Email» + Input/default FILL «james@familyoffice.com»
    - FieldRow: «Organization» + Input/default FILL «Harrington Family Office»
    - FieldRow: «AUM Range» + Select/default FILL «$100M–$500M»
  - Button/primary/md «Save Changes» + Button/ghost/md «Cancel»

  **NotificationsCard (Card/default 89:6, FILL, shadow-sm)**
  - SectionTitle «Notification Preferences» DS/Heading/lg
  - ToggleRows (vertical, gap 0):
    - ToggleRow: «Notify after each rebalancing execution» + Toggle ON
    - ToggleRow: «Notify if rule is paused automatically» + Toggle ON
    - ToggleRow: «Emergency Stop alerts» + Toggle ON (disabled OFF — mandatory)
    - ToggleRow: «Bridge operation completions» + Toggle ON
    - ToggleRow: «Weekly summary digest» + Toggle OFF
  - Each ToggleRow: FILL × HUG, horizontal, space-between, padding space-3 V, border-bottom border-default

  ##### DangerZoneColumn (FIXED 320px × HUG, vertical, gap space-4)

  **ConnectedWalletsCard (Card/default 89:6, shadow-sm)**
  - SectionTitle «Connected Wallets» DS/Heading/lg
  - 2 mini WalletRows (compact: address + badge + link):
    - «0x4aB2...c1F8» DS/Body/xs text-muted monospace + Badge/success «Primary»
    - «0x9eC1...a3D2» DS/Body/xs text-muted monospace + Badge/info «Backup»
  - Button/ghost/sm «Manage Wallets →» text-accent

  **DangerZoneCard**
  - FILL × HUG, vertical, gap space-3, padding space-4
  - Fill: surface-default, Border: border-error 1px, Radius: radius-md
  - SectionTitle «Danger Zone» DS/Heading/lg text-error
  - «Deactivating your account will halt all automation and disconnect all wallets.» DS/Body/xs text-muted
  - Button/secondary/md «Deactivate Account» (override border-error, text-error)

---

## Edge cases

### SaveSuccess (visible: false)
- Toast/success «Settings saved successfully» — positioned top-right, auto-dismiss

### SaveError (visible: false)
- Toast/error «Failed to save settings. Please try again.»

---

## Tokens used
- surface-app-shell, surface-default, surface-level-2
- text-default, text-muted, text-accent, text-error
- border-default, border-error
- space-1, space-2, space-3, space-4, space-6
- shadow-sm, radius-md, radius-pill
- Icons: none specific (toggle placeholder as rect)
