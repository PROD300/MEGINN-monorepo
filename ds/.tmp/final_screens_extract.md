# final_screens — новые компоненты (Phase 2.5)
# Дата: 2026-05-06

---

### AppTopBar

**Назначение:** Глобальная шапка приложения — присутствует на всех экранах.

**Анатомия:**
- Logo (text «MEGINN», DS/Body/sm Medium, text-on-dark-accent)
- Spacer (FILL)
- StopAll (Button/primary/md instance — override цвет на red/error?)
- Notifications (IconButton instance + Badge/info overlay)
- UserName (DS/Body/sm, text-nav-item)
- AvatarRect (placeholder 36×36, radius-md)

**Варианты:** одиночный Component

**Отступы:** space-4 V × space-6 H, FILL × FIXED 64px

**Привязки:**
- fill → `surface-app-shell`
- text → `text-nav-item` / `text-on-dark-accent`

---

### AppSidebar

**Назначение:** Левая вертикальная навигация — присутствует на всех экранах.

**Анатомия:**
- NavItems (vertical list, 6 пунктов): Portfolio, Rebalancing Rules, Liability & Compliance, Audit Log
- Divider (1px, border-app-shell)
- SecondaryItems: Account Settings, Exit

**Каждый NavItem:**
- State=default: text DS/Body/sm, `text-nav-item`
- State=active: text DS/Body/sm Medium, `text-nav-active`, left-border 3px `text-on-dark-accent`

**Варианты:** одиночный Component (активный пункт варьируется instance-override)

**Размеры:** FIXED 240px × FILL

**Привязки:**
- fill → `surface-app-shell`
- divider → `border-app-shell`

---

### StatCard

**Назначение:** KPI-карточка с одной метрикой (Total AUM, Active Rules, Last Rebalance).

**Анатомия:**
- Top indicator bar (3px, цветная)
- Label (DS/Body/xs, text-muted)
- Value (DS/Heading/2xl, text-default)
- Subtitle (DS/Body/xs, text-muted)

**Варианты:** `Variant=neutral | success | warning`
- indicator bar цвет: border-default | bg-success | bg-warning

**Отступы:** space-4 V × space-4 H, FILL grow=1 × HUG

**Привязки:**
- fill → `surface-default`
- border → `border-default`
- radius → `radius-md`
- shadow-sm

---

### ActivityRow

**Назначение:** Строка журнала автоматической активности (Portfolio + Bridge History).

**Анатомия:**
- LeftAccent (3px optional left-border — только для cross-chain)
- Description (DS/Body/sm, text-default)
- Meta (DS/Body/xs, text-muted) — asset → amount → time → StatusText

**Варианты:** `Status=success | warning | info`
- success: StatusText `text-success`
- warning: StatusText `text-warning`
- info: StatusText `text-accent`, left-border `border-focus`

**Отступы:** space-3 V × space-4 H, FILL × HUG

**Привязки:**
- fill → `surface-default`
- bottom border → `border-default`

---

### RuleCard

**Назначение:** Карточка правила в списке RebalancingRules.

**Анатомия:**
- LeftAccent (3px — только cross-chain, border-focus)
- Left column: RuleName (DS/Body/sm Medium, text-default) + Description (DS/Body/xs, text-muted) + NetworkRow (DS/Body/xs, text-muted)
- Right column: LastTriggered (DS/Body/xs, text-muted) + StatusBadge + Actions (Edit / Pause|Resume text-buttons)

**Варианты:** `Status=active | paused | error`
- active: Badge/success
- paused: Badge/warning
- error: Badge/error

**Отступы:** space-4 V × space-4 H, FILL × HUG

**Привязки:**
- fill → `surface-default`
- border → `border-default`

---

### BridgeProviderCard

**Назначение:** Карточка провайдера бриджа (Li.Fi / Socket / Across).

**Анатомия:**
- ProviderName (DS/Body/sm Medium, text-default)
- StatusBadge (Badge instance — success для active)
- AvgTime (DS/Body/xs, text-muted)
- Volume (DS/Body/xs, text-muted)

**Варианты:** `Status=active-primary | active-fallback | inactive`

**Отступы:** space-4 V × space-4 H, FILL grow=1 × HUG

**Привязки:**
- fill → `surface-default`
- border → `border-default`
- radius → `radius-md`

---

## Новые Semantic-токены

| Токен | Alias | Назначение |
|-------|-------|-----------|
| `surface-app-shell` | → gray-900 | Фон шапки и сайдбара |
| `text-nav-item` | → gray-300 | Неактивный пункт навигации |
| `text-nav-active` | → gray-00 | Активный пункт навигации |
| `text-on-dark-accent` | → accent-300 | Акцент на тёмном фоне (лого, ссылки) |
| `border-app-shell` | → gray-700 | Разделители внутри AppShell |
