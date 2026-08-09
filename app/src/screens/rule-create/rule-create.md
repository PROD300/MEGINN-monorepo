# Screen: RuleCreate

**Роут:** `/rule-create`
**Файл:** `src/screens/rule-create/RuleCreate.tsx`
**Figma:** node 143:113 — Screen/RuleCreate

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `AppTopBar` | base | Верхняя панель |
| `AppSidebar` | base | Боковое меню, `active="rebalancing"` (форма создания правила относится к разделу Rebalancing Rules) |
| `Input` | base | Rule Name, Description, "If allocation" value, Target allocation after rebalance, Max slippage tolerance, Max gas price — все `readOnly` со статичным `defaultValue` |
| `Select` | base | Asset, Network, condition (">"), Action, Sell-from / Sell-into, Target network for swap |
| `Button` | base | Save & Activate Rule (primary), Save as Draft (secondary), Cancel (ghost) |
| `Card` | base | Estimated Impact (title + description + action) |

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `PageHeader` (breadcrumb + title) | inline |
| `CrossChainBox` | info-блок про cross-chain исполнение, left-border 3px `border-focus`, фон `bg-info-subtle` — inline |
| `Rule Preview` (previewRows) | список строк label/value в карточке-сводке — inline, статичный список `previewRows` |

Ни один из локальных блоков не повторяется в каталоге `ds/components.md` под отдельным именем — пока оставлены inline.

## Статика (контент из макета)

- Rule Identity: "ETH Rebalancing Guard" / "Keeps ETH allocation within target range"
- Trigger: Asset=ETH, Network=Ethereum, "If allocation > 35 %", "Current ETH: 32.0% — rule will not fire until threshold is reached"
- Action: "Sell to rebalance", Sell ETH into USDC, Target network for swap = Arbitrum, cross-chain hint text, CrossChainBox text, Target allocation after rebalance = 30 %
- Safety & Execution: Max slippage tolerance = 0.8 %, Max gas price = 25 Gwei
- Rule Preview: Name / Trigger / Action / Execution / Target alloc / Slippage guard / Status (success, "Will activate immediately")
- Estimated Impact card: "At current portfolio: no action needed (ETH at 32%)" / "Would trigger at: ~$14 700 000 · Estimated swap: ~$9 800 000"

## Не удалось сопоставить 1:1

В макете над "Rule Preview" есть пустой инстанс `Card` (node 143:223, height ~10px, без заголовка/описания/контента) — выглядит как артефакт компоновки в Figma, а не содержательный блок. Не воспроизведён как отдельный пустой элемент, чтобы не рисовать пустую рамку без информации; реальный контент Preview-колонки (Rule Preview + Estimated Impact) перенесён полностью.

## Логика/состояние

Не добавлено. Все `Input` — `readOnly` со статичным `defaultValue` (визуально как заполненное поле из макета, без onChange/состояния). `Select` — без `onChange`, со статичным `defaultValue`. Кнопки не имеют обработчиков.
