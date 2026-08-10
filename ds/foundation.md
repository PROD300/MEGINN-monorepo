# Foundation — OBSIDIAN Design System

**Бриф:** финтех · b2b · строгий, надёжный · web · en

---

## Слой 1 — примитивные токены

### Палитра

**Акцент (Indigo) — доверие без retail-blue:**
- accent-50  = #EEF2FF
- accent-100 = #E0E7FF
- accent-300 = #A5B4FC
- accent-500 = #4F46E5   ← основной акцент
- accent-700 = #3730A3
- accent-900 = #1E1B4B

**Нейтралы (Cool Gray — 9 ступеней):**
- gray-00  = #FFFFFF
- gray-50  = #F8FAFC
- gray-100 = #F1F5F9
- gray-200 = #E2E8F0
- gray-300 = #CBD5E1
- gray-500 = #64748B
- gray-700 = #334155
- gray-900 = #0F172A
- gray-950 = #020617

**Функциональные — единый акцент, 2026-08-10:**
- success-500 = #4B34F5
- warning-500 = #4B34F5
- error-500   = #4B34F5
- info-500    = #4B34F5

Все четыре сведены к одному значению (тот же индиго, что и accent-500) — статус
(allocation OK / порог близко / emergency stop / информационное уведомление)
читается по иконке и тексту, не по оттенку. Раньше здесь была отдельная
цветовая палитра (зелёный/жёлтый/красный/синий) — устарело ещё на ребрендинге
2026-08-09 (частичная конвергенция success/error), полностью унифицировано
2026-08-10 вместе с компонентом Banner (см. `ds/components.md`).

⚠ Остальная часть этого файла (Слой 2 ниже, поверхности, тени) документирует
светлую тему до ребрендинга 2026-08-09 и не соответствует текущему тёмному
UI Kit — требует отдельного обновления, не входящего в эту правку.

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
- radius-md   = 8
- radius-lg   = 16

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

### Тени

- shadow-sm = 0 1px 2px rgba(15,23,42,0.08)
- shadow-md = 0 4px 6px rgba(15,23,42,0.10), 0 1px 3px rgba(15,23,42,0.06)
- shadow-lg = 0 10px 15px rgba(15,23,42,0.10), 0 4px 6px rgba(15,23,42,0.05)

---

## Слой 2 — смысловые токены

### Поверхности

- surface-default              → gray-50       ← фон страницы / app background
- surface-subtle               → gray-50       ← фон секций (alternating)
- surface-elevated             → gray-00       ← карточки поверх subtle (shadow-sm)
- surface-level-1              → gray-50       ← body / page background
- surface-level-2              → gray-100      ← sidebar / nav rail
- surface-level-3              → gray-200      ← dividers, input borders
- surface-level-4              → gray-300      ← disabled, inactive tabs
- surface-action-primary       → accent-500
- surface-action-primary-hover → accent-700
- surface-action-ghost-hover   → accent-50

### Текст

- text-default      → gray-900
- text-muted        → gray-500
- text-disabled     → gray-300
- text-on-action    → gray-00
- text-on-dark      → gray-00
- text-error        → error-500
- text-warning      → warning-500
- text-success      → success-500
- text-accent       → accent-500

### Обводки

- border-default    → gray-200
- border-strong     → gray-300
- border-focus      → accent-500
- border-error      → error-500
- border-warning    → warning-500

### Состояния и статусы (для risk-индикаторов)

- bg-success        → success-500
- bg-warning        → warning-500
- bg-error          → error-500
- bg-info           → info-500
- bg-success-subtle → success-500 @ 10% opacity   ← ✓ создана 2026-05-05 (grow_ui_kit)
- bg-warning-subtle → warning-500 @ 10% opacity   ← ✓ создана 2026-05-05
- bg-error-subtle   → error-500   @ 10% opacity   ← ✓ создана 2026-05-05
- bg-info-subtle    → info-500    @ 10% opacity    ← ✓ создана 2026-05-05

### Компонентные поверхности (нейтральные уровни)

- surface-level-1   → gray-50    ← body background
- surface-level-2   → gray-100   ← sidebar / nav rail
- surface-level-3   → gray-200   ← dividers, input borders
- surface-level-4   → gray-300   ← disabled, inactive tabs

### AppShell (добавлено 2026-05-06 — final_screens)

- surface-app-shell   → gray-900   ← тёмный фон TopBar и Sidebar (= surface-dark)
- text-nav-item       → gray-300   ← неактивный пункт навигации на тёмном фоне (= text-on-dark-muted)
- text-nav-active     → gray-00    ← активный пункт навигации на тёмном фоне (= text-on-dark)
- text-on-dark-accent → accent-300 ← акцентный цвет на тёмном фоне (= text-on-dark-brand)
- border-app-shell    → gray-700   ← разделители внутри AppShell (= border-dark)

## Слой 3 — компонентные токены

*На стартовом наборе не нужен. Добавляется отдельной директивой при расширении компонентов вариантами и состояниями.*

---

**Figma-файл:** https://www.figma.com/design/PcpLlKJqePv7h5acIUEgfd/Obsidian-MCP  
**Страница:** Foundation (18:2) → фрейм «Foundation-Tokens» (35:2)  
**Дата:** 2026-05-05 | **Версия:** 1.0 (starter)
