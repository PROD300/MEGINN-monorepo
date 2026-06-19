# Screen: TransactionError

**Роут:** `/transaction-error`
**Файл:** `src/screens/transaction-error/TransactionError.tsx`
**Figma:** node 248:2 — Screen/TransactionError

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `AppTopBar` | base | Верхняя панель |
| `AppSidebar` | base | Боковое меню, `active="liability"` (раздел Liability & Compliance, экран достижим из контекста Rules/Liability) |
| `Badge` | base | success — "Slippage Exceeded" (цвет взят 1:1 из макета, в Figma бейдж зелёный несмотря на контекст ошибки) |
| `Button` | base | primary/sm ×3 — Review Rule Settings / Back to Rules / View in Audit Log, растянуты на всю ширину CTA-ряда |
| `ActivityRow` | base | ×2 — Related Events (Rule paused — USDT Ceiling, Gas skipped — ETH Balance Guard) |

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `ErrorHeader` | Иконка-плейсхолдер alert + заголовок "Transaction Failed" + Badge |
| `TxDetailsCard` | Карточка деталей: 7 строк label/value (Rule triggered, Attempted action, Network, Failure reason, Gas at execution, Bridge involved, Timestamp) |
| `AutoPausedBanner` | Предупреждение о паузе правила (warning-токены) |
| `PreventionCard` | "How to Resolve" — 4 шага + примечание "Assets are safe" |

Все блоки — inline в TransactionError.tsx, не вынесены в `/parts/`, используются один раз на экране.

## Статика (mock-контент из макета)

- Все детали транзакции 1:1 из макета (USDT Ceiling, Sell $30 000 000 USDT → USDC, Arbitrum, Slippage 2.1% / limit 0.8%, 22 Gwei, No same-chain, Jun 15 2026 19:55 UTC)
- Related Events: 2 строки, meta-поле ActivityRow содержит оба значения времени из макета ("1d ago · 2h ago" и "2d ago · 2h ago"), т.к. базовый компонент имеет один слот `time` — не форкался под второе поле

## Расхождения с макетом

- ActivityRow в макете показывает два независимых meta-значения времени рядом со статусом; базовый компонент поддерживает только один `time` prop — оба значения объединены строкой через "·", без потери текста.

## Кандидаты на вынос в базу

- Нет новых кандидатов — структура карточек (заголовок + список строк) близка к LiabilityCard/StatCard, но недостаточно повторяется для выноса.

## Подтверждение

Логика, обработчики (кнопки CTA), состояние, мок-датасеты с генерацией — не добавлены. Контент статичен, повторяет дизайн 1:1.
