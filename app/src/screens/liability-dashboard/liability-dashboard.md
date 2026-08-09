# Screen: LiabilityDashboard

**Роут:** `/liability-dashboard`
**Файл:** `src/screens/liability-dashboard/LiabilityDashboard.tsx`
**Figma:** node 239:2 — Screen/LiabilityDashboard

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `AppTopBar` | base | Верхняя панель |
| `AppSidebar` | base | Боковое меню, `active="liability"` |
| `StatCard` | base | ×3 — Platform Status, Legal Coverage, Compliance Flags |
| `LiabilityCard` | base | ×3 — Autonomous Rebalancing / Bridge Operations / Your Responsibility (типы autonomous/bridge/user) |
| `Badge` | base | success-варианты "Covered" ×2, "Active" ×1 — передаются в LiabilityCard как `badge` prop |
| `Button` | base | primary/sm — Download Report (header), View Agreement (карточка) |
| `Table` | base | density="compact" — Portfolio Risk Status (Asset/Allocation/Target/Deviation/Risk) |

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `PageHeader` | Заголовок страницы + кнопка Download Report |
| `AgreementCard` | Legal Agreement: статус Signed (check + label), мета (signed by/role/date), кнопка View Agreement на всю ширину |
| `RiskAllocationCard` | Обёртка карточки с заголовком "Portfolio Risk Status" вокруг Table |

Все блоки — inline в LiabilityDashboard.tsx, не вынесены в `/parts/`, так как используются один раз и просто компонуют базовые элементы + токены.

## Статика (mock-контент из макета)

- StatCard: Operational / 100% / 0
- LiabilityCard карточки — тексты и статусы badge ровно как в макете
- Legal Agreement: Signed by James Harrington, Role Family Office CIO, Date May 5, 2026
- Risk table: USDC/ETH/stETH/USDT строки с allocation/target/deviation/risk

## Кандидаты на вынос в базу

- `AgreementCard` / `RiskAllocationCard` — если паттерн карточки "заголовок + статус + мета + действие" повторится на другом экране

## Подтверждение

Логика, обработчики, состояние, мок-датасеты с генерацией — не добавлены. Контент статичен, повторяет дизайн 1:1.
