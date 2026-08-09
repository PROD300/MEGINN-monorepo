# Screen: Rule Detail

**Роут:** `/rule-detail/:id` (читает правило из `src/data/rules.ts` по id, 2026-06-18)
**Файл:** `src/screens/rule-detail/RuleDetail.tsx`
**Figma:** node 237:2 — Screen/RuleDetail

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `AppTopBar` | base | Верхняя панель |
| `AppSidebar` | base | `active="rebalancing"` |
| `Badge` | base | "Active" (variant success) рядом с заголовком |
| `Button` | base | ×2 — Edit Rule, Pause Rule (primary, sm) |
| `Card` | base | Левая карточка в RuleOverviewSection — в макете оставлена с дефолтным placeholder-контентом ("Card Title" / "Card description text goes here." / "View details →"), перенесена один в один |
| `Table` | base | Execution History: Timestamp / Triggered At / Action / Amount / Gas / Result, 5 строк |

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `PageHeader` | Breadcrumb (Rebalancing Rules › ETH Balance Guard) + TitleRow (title + Badge + Edit/Pause) |
| `ExecutionSettingsCard` | Карточка-список Label/Value: Target allocation, Max slippage, Max gas price, Execution, Cross-chain + footnote |
| `FooterStats` | Строка "Total executed / Total volume / Avg execution" |

Все блоки — inline в RuleDetail.tsx. `ExecutionSettingsCard` (key-value список в карточке) — кандидат на вынос в базу, если повторится на другом экране (похожий паттерн на LiabilityCard, но другая структура).

## Статика (контент из макета)

- Breadcrumb: Rebalancing Rules › ETH Balance Guard
- Title: ETH Balance Guard, Badge: Active
- Card (overview): дефолтный placeholder из макета — не придуман, перенесён как есть
- Execution Settings: 30% / 0.8% / 25 Gwei / Any time / Yes — via Li.Fi (F20)
- 5 строк Execution History (Jun 16…Jun 10)
- FooterStats: Total executed: 4 times · Total volume: $20.6M · Avg execution: 40 sec

## Расхождения с макетом

Левая Card в RuleOverviewSection в самом макете Figma не была заполнена реальным контентом дизайнером (инстанс Card со значениями по умолчанию вместо реальных данных правила) — перенесено точно так, как в макете, без додумывания контента.

## Кандидаты на вынос в базу

- `ExecutionSettingsCard` (key-value card pattern) — если встретится повторно.

## Не оживлено

Edit Rule / Pause Rule / View full audit log — рендерятся без обработчиков и переходов.
