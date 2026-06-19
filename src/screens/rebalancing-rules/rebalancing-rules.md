# Screen: RebalancingRules

**Роут:** `/rebalancing-rules`
**Файл:** `src/screens/rebalancing-rules/RebalancingRules.tsx`
**Figma:** node 142:83 — Screen/RebalancingRules

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `AppTopBar` | base | Верхняя панель |
| `AppSidebar` | base | Боковое меню, `active="rebalancing"` |
| `Tabs` | base | All (4) / Active (3) / Paused (1) / Error (0) / Cross-chain (1) F20, active="all" |
| `Badge` | base | success / warning — статус правила |
| `Button` | base | "+ Create Rule" (primary) |

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `RuleCard` | name + description + network (left) \| lastTriggered + Badge + Edit/Pause-Resume (right); cross-chain вариант — left-border 3px `border-focus`. Уже задокументирован как кандидат в `ds/components.md` (Used in: screens/rebalancing-rules) |
| `PageHeader` | заголовок + Create Rule, inline |
| `FooterStats` | строка статистики автоматизации, inline |

`RuleCard` оставлен inline в RebalancingRules.tsx (не в `/parts/`), так как используется только на этом экране — компонент-кандидат на вынос в UI-кит при повторном использовании.

## Статика (контент из макета)

- 4 правила: ETH Balance Guard (success, Arbitrum), stETH Target Allocation (success, Ethereum), RWA Cross-chain Rebalance (success, cross-chain ETH→ARB), USDT Ceiling (warning, Arbitrum, action "Resume")
- FooterStats: "Automation volume: $6 000 000 managed in last 24h" / "Cross-chain: $2 100 000 bridged · Bridge: Li.Fi | Next check: in 14 min"

## Не удалось сопоставить 1:1

Нет расхождений — все блоки 1:1 с макетом.

## Логика/состояние

Не добавлено. `Tabs` рендерится со статичным `active="all"` и пустым `onChange`; `Edit`/`Pause`/`Resume` — обычные `<a href="#">` без обработчиков.
