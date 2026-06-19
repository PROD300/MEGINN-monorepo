# Screen: LegalTerms

**Роут:** `/legal-terms`
**Файл:** `src/screens/legal-terms/LegalTerms.tsx`
**Figma:** node 240:2 — Screen/LegalTerms

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `AppTopBar` | base | Верхняя панель |
| `AppSidebar` | base | Боковое меню, `active="liability"` (раздел Liability & Compliance) |
| `Badge` | base | success — "Awaiting Signature" |
| `Button` | base | primary/sm — Sign Agreement (full width) |

Экран авторизованный, использует общий AppShell (AppTopBar + AppSidebar), как Portfolio.

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `PageHeader` | Breadcrumb (Liability & Compliance › Legal Agreement) + заголовок страницы |
| `DocumentCard` | Карточка документа: заголовок, версия/дата, 5 пронумерованных секций (заголовок + текст) |
| `SignatureCard` | Sign Agreement: Badge статус, разделители, данные подписанта, checkbox-плейсхолдер, кнопка, примечание |
| `WarningCard` | Предупреждение о последствиях подписания (warning-токены) |

Все блоки — inline в LegalTerms.tsx, не вынесены в `/parts/`, используются один раз на экране.

## Статика (mock-контент из макета)

- Все 5 секций документа — текст 1:1 из макета (Autonomous Rebalancing, Bridge Operations F20, Emergency Stop F22, Audit Logging F15, User Obligations)
- Подписант: James Harrington, Family Office CIO, Date: Jun 16, 2026
- Checkbox отрисован как статичный визуальный плейсхолдер (не input, не управляется состоянием)

## Кандидаты на вынос в базу

- `SignatureCard` — если паттерн "карточка подписи документа" повторится на другом экране
- Checkbox как примитив — пока не было запроса на отдельный Checkbox-компонент в базе

## Подтверждение

Логика, обработчики (в т.ч. для checkbox/кнопки), состояние, мок-датасеты с генерацией — не добавлены. Контент статичен, повторяет дизайн 1:1.
