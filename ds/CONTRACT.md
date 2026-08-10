# DS Contract — правила работы с дизайн-системой в проекте OBSIDIAN

**Источник ДС:** ds_baseline (стартовая, поставлена с нуля)  
**Figma-файл:** https://www.figma.com/design/PcpLlKJqePv7h5acIUEgfd/Obsidian-MCP  
**Структура файла:**
- Страница **Foundation** (18:2) → фрейм «Foundation-Tokens» (35:2) — токены, TextStyles
- Страница **Components** (26:2) → фрейм «Components-Doc» (45:46) — компоненты  
**Icon library:** Lucide (MIT, рендерится через `figma.createNodeFromSvg()`)  
**Дата постановки:** 2026-05-05

---

## Главное правило

При любом задании, которое касается интерфейса (новый экран, новая форма, новая карточка, доработка существующего), агент работает строго через эту ДС. Новые экраны = композиция из существующих компонентов плюс существующих токенов. Прибитые цвета, размеры, радиусы и шрифты в обход Variables запрещены.

---

## Что значит «через ДС»

1. **Компоненты — только из UI-кита.** При сборке экрана агент берёт инстансы компонентов со страницы Components (26:2). На старте: Button, Input, Card, Modal, Navbar, IconButton, Badge. Не рисует новые фреймы с нуля под конкретный экран.

2. **Цвета — только через Semantic Variables.** Никаких `fills = SOLID #4B34F5`. Только `setBoundVariable("fills", "surface-action-primary")`. Если в коде получился прибитый hex — это баг, переделывается через Variable.

3. **Типографика — через Variables и стили.** Все text-узлы обязаны иметь `textStyleId` из коллекции `DS/*`. Прибитый `fontSize` в text-узле — баг.

4. **Радиусы и отступы — через Variables.** `cornerRadius` и `itemSpacing` через `setBoundVariable`, не прибитые числа.

5. **Auto Layout везде.** Любая секция экрана — Auto Layout, иначе при правке контента поедет.

---

## Коллекции Variables (Figma Local Variables)

### Primitive (47 токенов)
- **Цвета:** accent-50…900 (6), gray-00…950 (9), success/warning/error/info-500 (4) = 19 цветов
- **Числа:** размеры шрифтов (8), веса (4), line-height (2), letter-spacing (1), radii (4), spacing (8) = 27 чисел
- **Строки:** font-sans = "Inter" = 1

### Semantic (28 токенов, все — алиасы к Primitive)
- **Surfaces:** surface-default, surface-subtle, surface-elevated, surface-action-primary, surface-action-primary-hover, surface-action-ghost-hover
- **Text:** text-default, text-muted, text-disabled, text-on-action, text-on-dark, text-error, text-warning, text-success, text-accent
- **Borders:** border-default, border-strong, border-focus, border-error, border-warning
- **Status:** bg-success, bg-warning, bg-error, bg-info
- **Levels:** surface-level-1, surface-level-2, surface-level-3, surface-level-4

---

## TextStyles (11 стилей, все с bound fontSize)

**Шрифты:** font-sans = Geist, font-mono = Geist Mono ← ребрендинг 2026-08-09, было Inter/system-mono. Подробности: `ds/foundation.md`, `HANDOFF_COWORK_TYPOGRAPHY_2026-08-09.md`.

| Стиль | Размер переменная | Начертание |
|-------|------------------|-----------|
| DS/Heading/4xl | size-4xl (48) | Bold |
| DS/Heading/3xl | size-3xl (32) | Semi Bold |
| DS/Heading/2xl | size-2xl (24) | Semi Bold |
| DS/Heading/xl | size-xl (20) | Semi Bold |
| DS/Heading/lg | size-lg (18) | Medium |
| DS/Body/base | size-base (16) | Regular |
| DS/Body/sm | size-sm (14) | Regular |
| DS/Body/sm Medium | size-sm (14) | Medium |
| DS/Body/xs | size-xs (12) | Regular |
| DS/Label/xs | size-xs (12) | Medium + letter-spacing 5% |
| DS/Numeric | font-mono + tabular-nums | ← новый, 2026-08-09. Для сумм, балансов, адресов, хешей, таймстемпов — везде, где цифры не должны «прыгать»/не выровнены |

---

## Что делать, если нужного нет

**Нет компонента:**
1. Добавить на страницу Components (26:2) по тем же правилам: ComponentNode, fills через Semantic, Auto Layout.
2. Записать в `ds/components.md`: имя, назначение, варианты, Node ID.
3. Только после — использовать на экране.

**Нет смыслового токена:**
1. Добавить Variable в коллекцию Semantic с привязкой к существующему примитиву.
2. Если нет подходящего примитива — добавить и его в Primitive.
3. Записать в `ds/foundation.md` в соответствующий слой.
4. Только после — использовать на экране.

**Нет паттерна композиции:**
1. Создать `ds/patterns.md` (если нет).
2. Описать паттерн: имя, из каких компонентов и токенов собирается, Node ID примера в Figma.

---

## Что запрещено

- Прибитые цвета (`fill = SOLID hex`) в компонентах или экранах.
- Прибитые `fontSize`, `lineHeight`, радиусы, отступы — где есть подходящий Variable.
- Создание нового компонента «на лету» внутри экрана без выноса в UI-кит.
- Перезапись Variables без явного «ребрендинг» команды.
- Параллельный проект с отдельной ДС.

## Когда правила можно нарушить

Только при явной команде «здесь без ДС, ad-hoc». Тогда — отдельный фрейм вне SectionNode, помеченный `[ad-hoc]`.
