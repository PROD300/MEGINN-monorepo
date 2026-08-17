# Foundation — MEGINN Design System

**Бриф:** финтех · b2b · строгий, надёжный · web · en

---

## Слой 1 — примитивные токены

### Палитра

**Акцент («Petrol») — ребрендинг 2026-08-17, OBSIDIAN → MEGINN:**
- accent-50  = #E8F3F6
- accent-100 = #CDE7EC
- accent-300 = #6FBBCB
- accent-500 = #1C7EA0   ← основной акцент
- accent-700 = #145C77
- accent-900 = #0B3546

Заменяет индиго/сине-фиолетовую шкалу («Ice Blue» pilot, hue ≈247°, #4B34F5) —
она визуально совпадала с фирменным фиолетовым hue настоящего бренда
obsidian.md (узнаваемый градиент-логотип, hue примерно 260–280°), что стало
проблемой при смене имени продукта на MEGINN, а не просто совпадением. Новая
шкала — hue ≈198°, осознанно в «синем поле» (зелёное направление было
предложено и отклонено на этом же заходе). Нейтралы (Cool Gray ниже) —
**без изменений**, ребрендинг затронул только accent. Старое значение
#4B34F5 больше нигде в коде не используется — если встретится оно или
соседние hex того ряда (#F0EEFF/#DEDAFF/#9C8DFA/#2E1FB8/#180F5C), это
остаток доребрендингового состояния.

**Нейтралы (Cool Gray — 9 ступеней), без изменений:**
- gray-00  = #FFFFFF
- gray-50  = #F8FAFC
- gray-100 = #F1F5F9
- gray-200 = #E2E8F0
- gray-300 = #CBD5E1
- gray-500 = #64748B
- gray-700 = #334155
- gray-900 = #0F172A
- gray-950 = #020617

**Функциональные — единый акцент, конвенция без изменений с 2026-08-10:**
- success-500 = #1C7EA0
- warning-500 = #1C7EA0
- error-500   = #1C7EA0
- info-500    = #1C7EA0

Все четыре сведены к одному значению (тот же petrol, что и accent-500 —
обновлено вместе с accent-ramp 2026-08-17) — статус (allocation OK / порог
близко / emergency stop / информационное уведомление) читается по иконке и
тексту, не по оттенку. Раньше здесь была отдельная цветовая палитра
(зелёный/жёлтый/красный/синий) — устарело ещё на ребрендинге 2026-08-09
(частичная конвергенция success/error), полностью унифицировано 2026-08-10
вместе с компонентом Banner (см. `ds/components.md`). Разведение обратно на
отдельные оттенки поднималось как открытый вопрос при выборе Petrol (зелёный
акцент делал конвергенцию особенно рискованной — теперь, когда accent снова
синий, риск ниже), но осталось нерешённым — единый акцент по-прежнему
действует для всех четырёх.

**Тени — 3 базовых уровня + accent-glow (deprecated):**
- shadow-sm = 0 1px 2px rgba(15,23,42,0.08)
- shadow-md = 0 4px 6px rgba(15,23,42,0.10), 0 1px 3px rgba(15,23,42,0.06)
- shadow-lg = 0 10px 15px rgba(15,23,42,0.10), 0 4px 6px rgba(15,23,42,0.05)
- shadow-float = 0 24px 48px -24px rgba(0,0,0,0.55), inset 0 1px 0 0 rgba(255,255,255,0.05) — добавлен с тёмным ребрендингом, для «плавающих» элементов (модалки, floating callout)
- shadow-glow-accent / shadow-glow-accent-strong = **`none`, deprecated 2026-08-10** — раньше акцентное неоновое свечение вокруг карточек/кнопок при hover/tilt, признано «устаревшим» и обнулено в коде (`app/src/tokens/primitives.css`), токен оставлен только чтобы не ломать существующие ссылки. Не использовать в новых компонентах.

⚠ Этот файл проверен и синхронизирован с кодом 2026-08-17 (см. `app/src/tokens/primitives.css`, `semantics.css`) — accent-ramp и функциональные цвета обновлены на Petrol, ребрендинг OBSIDIAN → MEGINN. Слой 2 ниже полностью переписан под текущий тёмный UI Kit (было: светлая тема до ребрендинга 2026-08-09).

### Типографика

- font-sans = Geist ← ребрендинг 2026-08-09, было Inter. Self-hosted через npm-пакет `geist` (OFL), variable-файлы в `app/src/assets/fonts/`, `@font-face` в `app/src/tokens/typography.css`. НЕ через Google Fonts CDN — урезанная версия без `font-feature-settings`, без которых не работают табличные цифры. Обоснование и источники: `research/web3-typography-research.md`, `HANDOFF_COWORK_TYPOGRAPHY_2026-08-09.md`.
- font-mono = Geist Mono ← тоже ребрендинг 2026-08-09, было system mono stack. Та же пара, тот же файл подключения.
- size-xs   = 12
- size-sm   = 14
- size-base = 16
- size-lg   = 18
- size-xl   = 20
- size-2xl  = 24
- size-3xl  = 32
- size-4xl  = 48
- weight-regular  = 400
- weight-medium   = 500
- weight-semibold = 600
- weight-bold     = 700
- line-height-base = 1.5
- line-height-tight = 1.25   ← для плотных дашборд-таблиц (B2B адаптация)
- letter-spacing-tight = -0.02em   ← для заголовков 2xl+

**DS/Numeric** ← новый TextStyle, добавлен 2026-08-09 вместе с ребрендингом на Geist (пробел ДС — числовых данных раньше не было отдельного стиля):
```css
.ds-numeric {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0;
}
```
Применять к: суммам, балансам, P&L, тикерам, адресам кошельков, хешам транзакций, таймстемпам, ID правил, gas — везде, где цифры стоят в колонке или обновляются live и не должны «прыгать». Применено в `StatCard.value`, `.mono`-классе Portfolio (Asset Allocation таблица), `ActivityRow.time`.

### Радиусы

- radius-none = 0
- radius-sm   = 4
- radius-md   = 4   ← было 8, унифицировано на острый институциональный радиус, 2026-08-09
- radius-lg   = 16

Карточки/панели (StatCard, BridgeProviderCard, RoleRow, LiabilityCard и т.п.) используют `radius-md` — см. `ds/components.md`.

### Отступы

- space-1  = 4
- space-2  = 8
- space-3  = 12
- space-4  = 16
- space-5  = 20 (добавлен 2026-06-18 — для паддинга карточек, ранее отсутствовал в шкале)
- space-6  = 24
- space-8  = 32
- space-12 = 48
- space-16 = 64

---

## Слой 2 — смысловые токены

**Тёмная тема по умолчанию, промоут из Portfolio-пилота на весь продукт, 2026-08-09.** Всё ниже — актуальное состояние `app/src/tokens/semantics.css`, ранее (до этой правки) этот раздел ошибочно документировал светлую тему допребрендинга — расхождение устранено 2026-08-11.

### Поверхности

- surface-default              → gray-950      ← фон страницы / app background (было gray-50 — светлая тема, устарело)
- surface-subtle               → gray-900
- surface-elevated             → gray-900      ← карточки/модалки (было gray-00 + shadow-sm — теперь плоская поверхность на тёмном, без тени по умолчанию)
- surface-level-1              → gray-950
- surface-level-2              → gray-900
- surface-level-3              → gray-700
- surface-level-4              → gray-500
- surface-action-primary       → accent-500
- surface-action-primary-hover → accent-700
- surface-action-ghost-hover   → accent-900    ← было accent-50 (светлый тинт) — на тёмном фоне тинт берётся из тёмного конца шкалы
- surface-hover                → gray-300      ← добавлено 2026-08-10, ховер-фон для текстовых кнопок: Button (primary/secondary/ghost), TopNav Stop All, Portfolio primaryCta. TopNav icon-кнопки (Bell/Exit) hover решён иначе — см. accent-300 в разделе «Текст» ниже, не через surface-hover. IconButton (shared-компонент) — hover всё ещё на паузе. TopNav user-меню — откачено на прежний hover (пользователь оценил старую версию выше), не входит в это правило
- surface-card-sheen           → linear-gradient(180deg, rgba(255,255,255,.06) 0%, rgba(255,255,255,0) 55%) ← добавлено 2026-08-10, верхний блик только на Table rows/header и RuleCard rows, НЕ на карточках-контейнерах (те плоские — см. border-hairline ниже)

### Текст

- text-default      → gray-00       ← было gray-900 (тёмный текст на светлом) — устарело
- text-muted        → gray-300      ← было gray-500
- text-subtle       → gray-500      ← добавлено 2026-08-11, приглушённый hint-текст на плоской тёмной поверхности (Onboarding infoBanner/successBanner, после того как фон/обводку убрали), более приглушённый чем text-muted. Выбран через контраст: 3.75:1 vs surface-elevated, gray-700 (1.72:1) отклонён
- text-disabled     → gray-700      ← было gray-300
- text-on-action    → gray-00
- text-on-dark      → gray-00
- text-error        → error-500
- text-warning      → warning-500
- text-success      → success-500
- text-info         → info-500      ← добавлено 2026-08-10, было пропущено при первой конвергенции функциональных цветов
- text-accent       → accent-300    ← было accent-500 (недостаточный контраст на тёмном фоне)
- text-accent-hover → accent-700      ← добавлено 2026-08-10, hover-текст для текстовых кнопок (primary/secondary/ghost) — правило: hover = surface-hover фон + text-accent-hover текст. Icon-only кнопки пока не входят, см. surface-hover выше

### Обводки

- border-default    → gray-700      ← было gray-200 (светлая тема)
- border-strong     → gray-500      ← было gray-300
- border-focus      → accent-500
- border-error      → error-500
- border-warning    → warning-500
- border-info       → info-500      ← добавлено 2026-08-10, симметрично text-info
- border-hairline   → прозрачный (transparent) — обводка карточек убрана 2026-08-10 («went flat»), токен оставлен как заглушка, чтобы не переписывать все точки использования. Figma (`Foundation-Tokens`, переменная `border-hairline`) приведена в соответствие 2026-08-11 (было полупрозрачный акцент 32%, теперь тоже transparent — код источник истины по правилу Daria).

### Статусы / risk-индикаторы

- bg-success        → success-500
- bg-warning        → warning-500
- bg-error          → error-500
- bg-info           → info-500
- bg-success-subtle → success-500 @ 10% opacity   ← с 2026-08-10 фактически равен accent @ 10% (все четыре *-subtle сведены к одному тинту, см. Слой 1 → Функциональные)
- bg-warning-subtle → warning-500 @ 10% opacity
- bg-error-subtle   → error-500   @ 10% opacity
- bg-info-subtle    → info-500    @ 10% opacity

### AppShell (добавлено 2026-05-06 — final_screens)

- surface-app-shell   → gray-950   ← было задокументировано как gray-900, код (`semantics.css`) фактически gray-950 — поправлено 2026-08-11. Тёмный фон TopBar и Sidebar (= surface-dark)
- text-nav-item       → gray-300   ← неактивный пункт навигации на тёмном фоне (= text-on-dark-muted)
- text-nav-active     → gray-00    ← активный пункт навигации на тёмном фоне (= text-on-dark)
- text-on-dark-accent → accent-300 ← акцентный цвет на тёмном фоне (= text-on-dark-brand)
- border-app-shell    → gray-700   ← разделители внутри AppShell (= border-dark)
- TopNav icon-кнопки (Bell/Exit) hover → `accent-300` напрямую (не через семантический токен) — фон не меняется, только цвет иконки, 2026-08-10

## Слой 3 — компонентные токены

*На стартовом наборе не нужен. Добавляется отдельной директивой при расширении компонентов вариантами и состояниями.*

---

**Figma-файл:** https://www.figma.com/design/PcpLlKJqePv7h5acIUEgfd/Obsidian-MCP  
**Страница:** Foundation (18:2) → фрейм «Foundation-Tokens» (35:2)  
**Дата:** 2026-08-17 | **Версия:** 1.2 — accent-ramp заменён на Petrol (ребрендинг OBSIDIAN → MEGINN), синхронизировано с кодом (`primitives.css`, `semantics.css`, `Foundation.stories.tsx`). ⚠ Figma-фрейм `Foundation-Tokens` (35:2) на момент этой правки **ещё не обновлён** — Variables там всё ещё указывают на старую индиго-шкалу, синхронизация отдельным шагом.
