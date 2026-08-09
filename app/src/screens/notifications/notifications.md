# Screen: Notifications

**Роут:** `/notifications`
**Файл:** `src/screens/notifications/Notifications.tsx`
**Figma:** node 245:2 — Screen/Notifications

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|----------------|
| `AppTopBar` | base | Верхняя панель |
| `AppSidebar` | base | Боковое меню, `active="settings"` (нет отдельного пункта Notifications в навигации) |
| `Button` | base | "Mark all read" (primary, sm) |
| `Tabs` | base | Filter: All (6) / Rebalancing (3) / Compliance (1) / System (2), `active="all"`, `onChange` — заглушка |
| `NotificationRow` | base | ×6 — события из макета, все `status="success"` (зелёная точка во всех строках по скриншоту) |

## Локальные части

Нет — экран полностью собран из готовых компонентов базы (`AppTopBar`, `AppSidebar`, `Button`, `Tabs`, `NotificationRow`), без доменных композиций.

## Статика (контент из макета)

- Заголовок "Notifications", кнопка "Mark all read"
- Фильтры: All (6), Rebalancing (3), Compliance (1), System (2)
- 6 строк уведомлений: auto-rebalance success, cross-chain bridge completed, stETH target completed, rule paused (Slippage Guard), system health check, Smart Account activated — тексты и время "Хh ago"/"Хd ago"/"1w ago" взяты из макета один в один

## Кандидаты на вынос в базу

Нет новых — `NotificationRow` уже в базе и использован по документации `ds/components.md`.

## Подтверждение

Логика, обработчики, состояние и слой данных не добавлены — экран полностью статичный. `Tabs.onChange` — пустая заглушка для удовлетворения типа пропса, фильтрация не работает.
