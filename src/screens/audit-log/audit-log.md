# Screen: AuditLog

**Роут:** `/audit-log`
**Файл:** `src/screens/audit-log/AuditLog.tsx`
**Figma:** node 241:2 — Screen/AuditLog

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `AppTopBar` | base | Верхняя панель |
| `AppSidebar` | base | Боковое меню, `active="audit"` |
| `Button` | base | Export CSV / Export PDF (primary/sm в header), Apply (filter bar), Prev/1/Next (secondary/sm, pagination) |
| `Select` | base | All Types, All Statuses — ширина переопределена локально (160px/140px) под макет, обёрнуты в локальные wrapper-div для скоупа стиля |
| `Input` | base | Date from, Date to — статичные placeholder-инпуты, без значения и обработчиков |
| `Table` | base | density="default" — 8 строк аудита (Timestamp/Type/Rule/Asset/Amount/Network/Provider/Result), Result раскрашен через `render` по статусу |

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `PageHeader` | Заголовок Audit Log + ExportRow (2 кнопки) |
| `FilterBar` | Filter label + 2 Select + 2 Input + Apply + spacer + "8 events" счётчик |
| `PaginationRow` | "Showing 1–8 of 8 events" + PageCtrl (Prev/1/Next) |

Все три блока — inline в AuditLog.tsx, не вынесены в `/parts/`, так как используются один раз.

## Статика (mock-контент из макета)

- 8 строк аудита 1:1 из макета (включая Rule Paused / Gas Too High / Account activated спецслучаи с "—" в пустых ячейках)
- Цвет результата: success → text-success, warning ("Slippage 1.2%") → text-warning, error ("Gas Too High") → text-error
- Select/Input используют `defaultValue=""` — неуправляемые, без onChange (нет логики)

## Кандидаты на вынос в базу

- Паттерн FilterBar (Select × N + Input × N + Apply + counter) — если повторится на другом экране, вынести как локальную композицию верхнего уровня

## Подтверждение

Логика, обработчики (фильтрация, экспорт, пагинация), состояние, мок-датасеты с генерацией — не добавлены. Контент статичен, повторяет дизайн 1:1.
