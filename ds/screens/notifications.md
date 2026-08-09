# Screen: Notifications

**Wireframe Node ID:** (нет wireframe — создан из product context)
**Final Screen Node ID:** `245:2`

---

## Layout type
Standard AppShell: AppTopBar + AppSidebar + Main.
1440×1024 desktop. Sidebar active: Account Settings.
Note: US01 AC3 — post-factum notification center.

---

## Composition

### AppTopBar
- Component instance (128:2), FILL × FIXED 64px

### AppSidebar
- Component instance (128:10), FIXED 240px × FILL
- Active item: Account Settings

### Main (FILL × HUG, vertical, gap 0)

#### PageHeader
- FILL × HUG, horizontal, space-between, padding space-4
- Title: «Notifications» DS/Heading/xl text-default
- Right: Button/ghost/md «Mark all read» (Lucide/check-check 16px)
- Bottom border: border-default

#### NotificationFilterTabs
- FILL × HUG, horizontal, gap 0, padding 0 space-4
- 4 × Tabs instance (60:51):
  - Tabs/active «All (6)»
  - Tabs/default «Rebalancing (3)»
  - Tabs/default «Compliance (1)»
  - Tabs/default «System (2)»
- Bottom border: border-default

#### NotificationList
- FILL × HUG, vertical, gap 0
- 6 × NotificationRow (inline composition — КАНДИДАТ на вынос в UI kit, 6 копий):

  **NotificationRow: Structure**
  - FILL × HUG, horizontal, gap space-3, padding space-3 H / space-3 V, align start
  - Left: StatusDot (FIXED 8×8, radius-pill, color by status)
  - StatusIcon: Lucide icon 16px (color by status)
  - Content (FILL, vertical, gap space-1):
    - Title DS/Body/sm Medium text-default
    - Description DS/Body/xs text-muted
    - Meta (horizontal, gap space-2): Time DS/Body/xs text-muted + Badge variant
  - Right: «Mark read» Button/ghost/sm (or unread dot)
  - Bottom border: border-default

  **Row 1 (success, unread):**
  - Dot: success-500 · Icon: Lucide/check-circle 16px text-success
  - «Auto-rebalance completed successfully»
  - «ETH Balance Guard: Sold $4.2M ETH → USDC · Arbitrum · Li.Fi»
  - «2h ago» + Badge/success «Success»

  **Row 2 (info, unread):**
  - Dot: info-500 · Icon: Lucide/git-merge 16px text-accent
  - «Cross-chain bridge operation completed»
  - «RWA Cross-chain Rebalance: $2.1M USDC bridged ETH → Arbitrum via Li.Fi»
  - «3h ago» + Badge/info «Bridge»

  **Row 3 (success, read — opacity 0.7 on dot):**
  - «Auto-rebalance: stETH Target completed»
  - «stETH Target Allocation: Sold $1.8M stETH → ETH · Ethereum»
  - «6h ago» + Badge/success «Success»

  **Row 4 (warning, unread):**
  - Dot: warning-500 · Icon: Lucide/alert-triangle 16px text-warning
  - «Rule paused automatically: Slippage Guard triggered»
  - «USDT Ceiling: Slippage 1.2% exceeded 0.8% limit. Rule paused.»
  - «1d ago» + Badge/warning «Rule Paused»

  **Row 5 (info, read):**
  - «System health check completed»
  - «All bridge providers operational. ETH / Arbitrum RPC connected.»
  - «2d ago» + Badge/info «System»

  **Row 6 (success, read):**
  - «Smart Account activated»
  - «Your Smart Account is now active. Rebalancing rules are enabled.»
  - «1w ago» + Badge/success «System»

---

## Edge cases

### EmptyNotifications (visible: false)
- Заменяет NotificationList
- Center-aligned: Lucide/bell-off 32px text-muted + «No notifications yet» DS/Body/sm text-muted + «Notifications will appear here as automation runs.» DS/Body/xs text-muted

---

## Tokens used
- surface-app-shell, surface-default
- text-default, text-muted, text-accent, text-success, text-warning
- border-default
- space-1, space-2, space-3, space-4
- success-500, info-500, warning-500 (raw for StatusDot)
- Icons: Lucide/check-check 16px, Lucide/check-circle 16px, Lucide/git-merge 16px, Lucide/alert-triangle 16px, Lucide/bell-off 32px
