# Screen: Emergency Stop

**Роут:** `/emergency-stop`
**Файл:** `src/screens/emergency-stop/EmergencyStop.tsx`
**Figma:** node 246:2 — Screen/EmergencyStop

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `AppTopBar` | base | Верхняя панель |
| `AppSidebar` | base | `active="settings"` (раздел Account Settings — ближайший к Emergency Stop в навигации) |
| `Input` | base | "Type STOP to confirm" поле (placeholder "STOP") |
| `Button` | base | ×2 — Stop All Operations, Cancel — Keep Running (primary, sm, fullWidth) |

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `PageHeader` | icon placeholder + "Emergency Stop" заголовок |
| `WarningBanner` | error-фон полоса с предупреждением о немедленной остановке всех операций |
| `CurrentStatusCard` (ImpactColumn) | "Current Active Operations": 3 impact-строки (label слева / результат справа) + divider + footnote |
| `RecoveryCard` (ImpactColumn) | "Recovery": вступление + 3 шага восстановления + заметка про активы в кошельке |
| `ConfirmCard` (ConfirmColumn) | stop-icon + заголовок (text-error) + subtitle + divider + ConfirmInput + 2 кнопки |

Все блоки — inline в EmergencyStop.tsx. Экран собран на базовом AppShell (TopBar+Sidebar), без Modal — в макете это полноценная страница, не оверлей, поэтому компонент `Modal` не использован (хотя в `ds/components.md` он помечен как кандидат для EmergencyStop confirmation — в данном макете confirm card встроена в страницу, не всплывающее окно).

## Раскладка

Main: PageHeader → WarningBanner (полоса на всю ширину) → StopContentArea (flex, wrap на узких экранах): ImpactColumn (flex 1, две карточки в столбик) + ConfirmColumn (фикс. до 400px, карточка с error-бордером).

## Статика (контент из макета)

- Заголовок: Emergency Stop
- Warning: "This action will immediately halt ALL automated operations: rebalancing rules, bridge transactions, and scheduled checks."
- Current Active Operations: rebalancing rules: 3 → Will be paused; bridge operations: 1 → Will be cancelled; gas reserve 25 Gwei → Reserved
- Footnote: "After stop: all rules set to PAUSED..."
- Recovery: 3 шага + "Assets remain in your wallet at all times during stop."
- Confirm card: "Stop All Operations?" / subtitle / "Type STOP to confirm" / Input "STOP" / Stop All Operations / Cancel — Keep Running

## Кандидаты на вынос в базу

- Нет новых повторяющихся паттернов сверх уже отмеченных в `ds/components.md` (Modal остаётся неиспользуемым кандидатом).

## Не оживлено

Input без состояния/валидации (placeholder "STOP" статичен, не реальный ввод), кнопки без обработчиков, без реального подтверждения/навигации.
