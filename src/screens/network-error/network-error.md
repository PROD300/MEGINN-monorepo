# Screen: NetworkError

**Роут:** `/network-error`
**Файл:** `src/screens/network-error/NetworkError.tsx`
**Figma:** node 247:2 — Screen/NetworkError

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `AppTopBar` | base | Верхняя панель (по скриншоту шелл присутствует, экран не служебный full-bleed, а ErrorCard вписан в обычный AppShell) |
| `AppSidebar` | base | Боковое меню, `active="portfolio"` (в макете активен Portfolio) |
| `Button` | base | Retry Connection / Go to Settings — `variant="primary" size="sm"` (совпадает с маленькими CTA из макета: px space-3/space-1, text-xs), растянуты `flex:1` |

Примечание: вопреки предположению в задаче «вероятно без шелла», скриншот макета явно показывает AppTopBar + AppSidebar (тёмный фон gray-900) с центрированной ErrorCard на тёмном фоне Main — шелл есть, экран не full-bleed.

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `ErrorCard` | wifi-off-иконка (lucide `WifiOff`) + title + subtitle + divider + NetworkStatus (3 строки статуса с точкой-индикатором) + divider + Troubleshooting (4 пункта) + CTA + ссылка "Check provider status →" — вся карточка inline в NetworkError.tsx |

Карточка центрирована в Main (`align-items:center; justify-content:center`), фон Main — `--surface-app-shell` (тёмный), как в макете.

## Статика (контент из макета)

- Title: "Network Error", subtitle: "Unable to connect to the blockchain network. Portfolio data may be stale."
- Connection Status: Ethereum RPC — Disconnected (error), Arbitrum RPC — Disconnected (error), Bridge Provider (Li.Fi) — Unknown (muted/unknown)
- Troubleshooting: 4 статичных пункта из макета
- CTA: "Retry Connection", "Go to Settings"
- Ссылка: "Check provider status →"

## Не удалось сопоставить 1:1

Иконка в макете — закрашенный квадрат-плейсхолдер с `bg-error`; заменена на реальную иконку Lucide `WifiOff` (по имени слоя "wifi-off-icon" в Figma) того же размера/цвета — это плейсхолдер-замена иконки, разрешённая директивой ("Картинки/иконки — плейсхолдеры").

## Логика/состояние

Не добавлено. Кнопки и ссылка без обработчиков/навигации.
