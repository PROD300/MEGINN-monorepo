# Screen: Portfolio

**Роут:** `/portfolio`  
**Файл:** `src/screens/portfolio/Portfolio.tsx`  
**Figma:** node 140:83 — Screen/Portfolio

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `AppTopBar` | base | Верхняя панель (OBSIDIAN, StopAll, user) |
| `AppSidebar` | base | Боковое меню, `active="portfolio"` |
| `StatCard` | base | ×3 — Total AUM, Active Rules, Last Rebalance |
| `Table` | base | Asset Allocation: Asset / Allocation / Value |
| `Button` | base | ×4 — Rebalance Now (primary), Add Asset / Bridge Funds / Download Report (ghost) |
| `ActivityRow` | base | ×4 — история авто-ребалансировок |

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `StatusBar` | Строка статуса: ETH Connected, Arbitrum Connected, Bridge Active, Last sync |
| `AlertBanner` | Предупреждение о превышении target allocation |

Оба блока — inline в Portfolio.tsx, не вынесены в `/parts/` т.к. простые однострочные секции.

## Статика (mock-контент из макета)

- Значения StatCard: $487 350 000, 3 rules, 2h ago
- Строки таблицы: AAPL 35% / MSFT 28%
- 4 строки активности из макета
- Пользователь: James Harrington

## Кандидаты на вынос в базу

- `StatusBar` — если встретится на втором экране
- `AlertBanner` — если встретится на втором экране
