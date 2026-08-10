# DS Components — каталог UI-кита OBSIDIAN

**Figma-файл:** https://www.figma.com/design/PcpLlKJqePv7h5acIUEgfd/Obsidian-MCP  
**Страница:** Components (26:2) → фрейм «Components-Doc» (45:46)  
**Дата:** 2026-05-06 | **Версия:** 2.0 (component_variants — матрицы состояний)

---

## Базовые компоненты (7)

### Button
- **Node ID:** `45:8`
- **Тип:** ComponentSet (36 вариантов)
- **Матрица:** `Type=primary|secondary|ghost` × `State=default|hover|disabled|loading` × `Size=sm|md|lg`
- **Fills:** primary → `surface-action-primary` / hover → `surface-action-primary-hover` | secondary/ghost hover → `surface-action-ghost-hover`
- **Border:** secondary → `border-default` / hover → `border-strong`
- **Text:** `DS/Body/sm Medium` (md/lg) · `DS/Body/xs` (sm) | primary → `text-on-action` | others → `text-accent`
- **Radius:** `radius-md`
- **Padding:** sm: space-3 H / space-1 V · md: space-4 H / space-2 V · lg: space-6 H / space-3 V
- **disabled:** opacity 0.4 · **loading:** текст скрыт, loader rect 12px

### Input
- **Node ID:** `45:13`
- **Тип:** ComponentSet (8 вариантов)
- **Матрица:** `Variant=default|error` × `State=default|hover|focus|disabled`
- **Fill:** default/hover/focus → `surface-default` · disabled → `surface-subtle`
- **Border:** default → `border-default` · hover → `border-strong` · focus → `border-focus` · error → `border-error`
- **Text:** default/hover → `text-muted` · focus → `text-default` · disabled → `text-disabled`
- **Style:** `DS/Body/sm` · **Radius:** `radius-md` · **Width:** 240px

### Card
- **Node ID:** `89:6`
- **Тип:** ComponentSet (2 варианта)
- **Матрица:** `State=default|hover`
- **Fill:** `surface-elevated`
- **Border:** default → `border-default` · hover → `border-strong`
- **Shadow:** default → shadow-sm · hover → shadow-md
- **Radius:** `radius-lg`
- **Структура:** Heading/lg (title) + Body/sm (description) + Body/sm Medium (action link)
- **Width:** 240px
- **Padding:** `space-5` (20px) — выровнено с остальными card-паттернами проекта (TxDetailsCard, PreventionCard, StatusCard и др., 2026-06-18)

### Modal
- **Node ID:** `45:18`
- **Тип:** Component (одиночный)
- **Fill:** `surface-default`
- **Border:** `border-default`
- **Radius:** `radius-lg`
- **Структура:** Header (320px, Space Between) + divider + Body (320px) + divider + Footer (surface-subtle, MAX-align)
- **Width:** фиксирован 320px
- **Status:** unused в текущих экранах — кандидат на применение (EmergencyStop confirmation, Rule delete/pause confirmation)

### Navbar
- **Node ID:** `94:8`
- **Тип:** ComponentSet (2 варианта)
- **Матрица:** `State=default|active` (active = первый NavItem text-accent + border-focus bottom 2px)
- **Fill:** `surface-level-2`
- **Структура:** Logo (Body/sm Medium, text-accent) + Nav items (Body/sm, text-muted)
- **Layout:** horizontal, itemSpacing 24, padding 24px H / 12px V
- **Width:** фиксирован 480px
- **Status:** orphaned — вытеснен паттерном AppTopBar + AppSidebar; кандидат на удаление при следующем аудите

### IconButton
- **Node ID:** `92:6`
- **Тип:** ComponentSet (3 варианта)
- **Матрица:** `State=default|hover|disabled`
- **Fill:** default → `surface-action-ghost-hover` · hover → `surface-level-2`
- **Border:** `border-default` · **disabled:** opacity 0.4
- **Radius:** `radius-md` · **Size:** 36×36px
- **Status:** unused в текущих экранах; кандидат на применение в следующей итерации (toolbar actions, inline icon actions)

### Badge
- **Node ID:** `45:45`
- **Тип:** ComponentSet (4 варианта)
- **Варианты:** `Variant=success` · `Variant=warning` · `Variant=error` · `Variant=info`
- **Fills:** bg-success / bg-warning / bg-error / bg-info
- **Text:** `DS/Label/xs`, `text-on-action`
- **Radius:** `radius-lg` (pill)
- **Padding:** 8px H / 2px V

---

## Расширенные компоненты (4) — UI Kit extended, 2026-05-05

### Table
- **Node ID:** `60:46`
- **Тип:** ComponentSet (2 варианта)
- **Варианты:** `Density=compact` · `Density=default`
- **Состояния:** Row: default | hover
- **Fills:** Header → `surface-level-2` · Row → `surface-default` / `surface-action-ghost-hover`
- **Border:** Row bottom → `border-default`
- **Text:** Header → `DS/Label/xs`, `text-muted` · Cell → `DS/Body/sm`, `text-default`
- **Padding compact:** space-2 V / space-3 H · **default:** space-3 V / space-4 H
- **Location:** страница Components (26:2), фрейм «UI Kit — extended» (59:2)

### Tabs
- **Node ID:** `60:51`
- **Тип:** ComponentSet (3 варианта) — TabItem, собирается в полосу из нескольких инстансов
- **Матрица:** `State=default|active|disabled`
- **Fills:** active → `surface-action-ghost-hover` · default → transparent
- **Border:** active bottom 2px → `border-focus`
- **Text:** active → `DS/Body/sm Medium`, `text-accent` · default → `DS/Body/sm`, `text-muted`
- **Padding:** space-3 V / space-4 H
- **Location:** страница Components (26:2), фрейм «UI Kit — extended» (59:2)

### Select
- **Node ID:** `66:8`
- **Тип:** ComponentSet (2 варианта)
- **Варианты:** `State=default` · `State=open`
- **Fill:** `surface-default`
- **Border:** default → `border-default` · open → `border-focus`
- **Text:** `DS/Body/sm`, `text-muted`
- **Radius:** `radius-md`
- **Width:** фиксирован 240px · **Padding:** space-2 V / space-4 H
- **Location:** страница Components (26:2), фрейм «UI Kit — extended» (59:2)

### Toast
- **Node ID:** `66:21`
- **Тип:** ComponentSet (3 варианта)
- **Варианты:** `Variant=success` · `Variant=warning` · `Variant=error`
- **Fills:** `bg-success-subtle` / `bg-warning-subtle` / `bg-error-subtle`
- **Border:** success → `border-default` · warning → `border-warning` · error → `border-error`
- **Icon:** `text-success` / `text-warning` / `text-error`
- **Text:** `DS/Body/sm`, `text-default`
- **Radius:** `radius-md` · **Padding:** space-3 V / space-4 H · Icon gap: space-3
- **Location:** страница Components (26:2), фрейм «UI Kit — extended» (59:2)
- **Status:** unused в текущих экранах; кандидат на применение в следующей итерации (rule saved, bridge error, form submit feedback)

---

## AppShell и экранные компоненты (6) — final_screens, 2026-05-06

### AppTopBar
- **Node ID:** `128:2`
- **Тип:** Component (одиночный)
- **Fill:** `surface-app-shell` (gray-900)
- **Структура:** Logo (text-on-dark-accent) · Spacer · StopAll button (bg-error) · Notifications (bell + badge) · UserName · Avatar
- **Size:** FILL × FIXED 64px
- **Used in:** screens/portfolio, screens/rebalancing-rules, screens/rule-create, screens/cross-chain-bridge

### AppSidebar
- **Node ID:** `128:10`
- **Тип:** Component (одиночный)
- **Fill:** `surface-app-shell` (gray-900)
- **Структура:** 4 NavItems (Portfolio / Rebalancing Rules / Liability & Compliance / Audit Log) + divider + 2 secondary (Account Settings / Exit)
- **NavItem active:** DS/Body/sm Medium, `text-nav-active`, left-border 3px `text-on-dark-accent`, fill `border-app-shell`
- **NavItem default:** DS/Body/sm, `text-nav-item`
- **Size:** FIXED 240px × FILL
- **Used in:** screens/portfolio, screens/rebalancing-rules, screens/rule-create, screens/cross-chain-bridge

### StatCard
- **Node ID:** `130:17`
- **Тип:** ComponentSet (3 варианта)
- **Матрица:** `Variant=neutral|success|warning`
- **Структура:** indicator bar 3px (цвет по варианту) + Label (DS/Body/xs, text-muted) + Value (DS/Heading/2xl) + Subtitle (DS/Body/xs, text-muted)
- **Fill:** `surface-default` · **Border:** `border-default` · **Radius:** `radius-md` · **Shadow:** shadow-sm
- **Used in:** screens/portfolio

### ActivityRow
- **Node ID:** `130:39`
- **Тип:** ComponentSet (3 варианта)
- **Матрица:** `Status=success|warning|info`
- **Структура:** Description (DS/Body/sm) + Meta row (DS/Body/xs) с цветным статусом
- **info:** left-border 3px `border-focus`
- **Fill:** `surface-default` · **Border-bottom:** `border-default`
- **Used in:** screens/portfolio, screens/cross-chain-bridge

### RuleCard *(inline, не ComponentSet)*
- **Тип:** локальная композиция (кандидат на вынос в UI-кит при появлении 2-го экрана)
- **Структура:** name + description + network (left) | lastTriggered + Badge + Edit/Pause (right)
- **Status:** active → Badge/success · paused → Badge/warning · error → Badge/error
- **cross-chain:** left-border 3px `border-focus`
- **Used in:** screens/rebalancing-rules

### BridgeProviderCard *(inline, не ComponentSet)*
- **Тип:** локальная композиция (кандидат на вынос при повторном использовании)
- **Структура:** ProviderName + StatusBadge + AvgTime + Volume
- **Fill:** `surface-default` · **Border:** `border-default` · **Radius:** `radius-md`
- **Used in:** screens/cross-chain-bridge

---

## Новые компоненты — Phase 2.5, 2026-06-16

### NotificationRow
- **Node ID:** `230:20`
- **Тип:** ComponentSet (3 варианта)
- **Матрица:** `Status=success|info|warning`
- **Структура:** StatusDot 8px (цвет по варианту) + Content column (Title DS/Body/sm Medium + Description DS/Body/xs + Meta DS/Body/xs) + border-bottom border-default
- **Fill:** `surface-default`
- **Width:** FIXED 760px (при использовании ставить `layoutSizingHorizontal = FILL`)
- **Location:** страница Sitemap (0:1)
- **Used in:** screens/notifications
- Дубликат на странице Components (26:2, node 377:20) удалён 2026-08-09.

### RoleRow
- **Node ID:** `230:35`
- **Тип:** ComponentSet (2 варианта)
- **Матрица:** `Status=active|inactive`
- **Структура:** Avatar placeholder 36×36 radius-pill (surface-level-2) + Info column (Name DS/Body/sm Medium + Role DS/Body/xs + Address DS/Body/xs text-muted) + Status badge 60×22
- **Fill:** `surface-default` · **Border:** `border-default` · **Radius:** radius-md
- **Width:** FIXED 540px (при использовании ставить `layoutSizingHorizontal = FILL`)
- **Location:** страница Sitemap (0:1)
- **Used in:** screens/smart-account-setup
- Дубликат на странице Components (26:2, node 377:39) удалён 2026-08-09.

### LiabilityCard
- **Node ID:** `230:51`
- **Тип:** ComponentSet (3 варианта)
- **Матрица:** `Type=autonomous|bridge|user`
- **Структура:** Icon placeholder 20×20 + Title DS/Heading/lg + Responsible DS/Body/sm Medium + Description DS/Body/xs text-muted
- **Fill:** `surface-default` · **Border:** `border-default` · **Radius:** radius-md · **Shadow:** shadow-sm
- **Width:** FIXED 360px (при использовании ставить `layoutSizingHorizontal = FILL`)
- **Location:** страница Sitemap (0:1)
- **Used in:** screens/liability-dashboard
- Дубликат на странице Components (26:2, node 377:54) удалён 2026-08-09.

---

## Новые компоненты — Phase 2.6, 2026-06-18

### Toggle
- **Node ID:** нет (добавлен в код первым, не выгружен в Figma Components page — см. «Как добавить новый компонент» ниже)
- **Тип:** Component (одиночный), управляемый `checked`/`onChange`/`disabled`
- **Структура:** track (pill, 44×24) + thumb (20×20 circle, translateX 20px при `on`)
- **Fill:** off → `border-default` · on → `surface-action-primary` · hover → `border-strong`/`surface-action-primary-hover`
- **Disabled:** opacity 0.4
- **Used in:** screens/smart-account-setup, screens/settings
- **Status:** соответствует инстансу `Toggle` (44×24) из дизайна SmartAccountSetup (node 243:91) — спецификация размеров взята оттуда

## Новые компоненты — 2026-08-10

### Banner
- **Node ID:** `423:6`
- **Тип:** ComponentSet (4 варианта)
- **Матрица:** `Variant=info|success|warning|error`
- **Location:** страница Components (26:2), фрейм «UI Kit — extended» (59:2), под ActivityRow
- **Структура (обновлено 2026-08-10):** одиночный div, composes pageBlock напрямую — выравнивается по левому/правому краю наравне с остальным контентом страницы (max-width 1440, centered), НЕ full-bleed. Floating-panel recipe — та же, что у всех остальных плиток (border-hairline + shadow-float + radius-md) — «вторая плавающая лента под TopNav», но без акцентного свечения TopNav, чтобы не перебивать его. lucide-иконка (Info/CheckCircle/AlertTriangle/XCircle по варианту) + текст.
- **Цвет — единый по всем 4 вариантам, 2026-08-10:** fill `bg-*-subtle`, текст/иконка — все резолвятся в один и тот же индиго (`#4B34F5`, см. `ds/foundation.md` → Функциональные). Border — нейтральный `border-hairline` (не по варианту) — то же самое приглушённое стекло, что у всех карточек. Info/Success/Warning/Error визуально неотличимы по цвету — различие только по форме иконки и по тексту сообщения. Не баг, осознанное решение (см. флаг в `primitives.css`/`semantics.css`).
- **Fills:** info → `bg-info-subtle` · success → `bg-success-subtle` · warning → `bg-warning-subtle` · error → `bg-error-subtle`
- **Border:** `border-hairline` на всех 4 сторонах, `radius-md` — карточка/панель, не лента
- **Shadow:** `shadow-float` — та же плавающая тень, что у StatCard/EmergencyStop-карточек/Toast; заметно тише акцентного свечения TopNav
- **Text/Icon color:** info → `text-info` · success → `text-success` · warning → `text-warning` · error → `text-error`
- **Padding:** space-3 V / space-5 H
- **Used in:** screens/portfolio (Rebalance alert), screens/emergency-stop (Warning), screens/cross-chain-bridge (F20 dependency notice), screens/smart-account-setup (self-custody notice)
- **Не используется для:** контекстных уведомлений внутри формы/колонки (RuleCreate gas-баннер, TransactionError auto-paused, Onboarding info/success) — те остаются скруглёнными inline-блоками внутри контента, это отдельный паттерн, не Banner
- **Status:** роллаут завершён на всех page-level баннерах проекта, 2026-08-10

## Как добавить новый компонент

1. Открыть страницу Components (26:2) в файле Obsidian-MCP
2. Создать ComponentNode (не Frame) через Figma Plugin API или UI
3. Все fills — через Semantic Variables (`setBoundVariable`)
4. Весь текст — через DS/ TextStyle (`setTextStyleIdAsync`)
5. Добавить строку в этот файл с Node ID
6. Только после — использовать на экранах через `createInstance()`
