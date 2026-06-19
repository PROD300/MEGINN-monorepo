# Screen: Onboarding

**Роут:** `/onboarding`
**Файл:** `src/screens/onboarding/Onboarding.tsx`
**Figma:** node 236:2 — Screen/Onboarding (в макете полностью раскрыт только Step 1 из 3; Step 2 и Step 3 спроектированы по аналогии — см. ниже)

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `AppTopBar` | base | Верхняя панель |
| `Button` | base | Connect Wallet / ← Back / Continue → / Activate Smart Account |
| `RoleRow` | base | Step 2 — список ролей (те же 3 роли, что в SmartAccountSetup, для консистентности персонажей) |
| `Badge` | base | Step 2 — статус "Active" у каждой роли |

Для шагов 2 и 3 готовых компонентов из базы хватило полностью — новых компонентов в базу не добавлялось.

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `StepIndicator` | 3 шага (Smart Account / Permissions / Review) с коннекторами; активный шаг подсвечивается по текущему `step` |
| `StepCard` | карточка текущего шага — рендерится одна из трёх (1/2/3) в зависимости от состояния |
| `reviewRows` (Step 3) | сводка конфигурации перед активацией: адрес Smart Account, кошельки, роли, сети, multi-sig threshold |

## Раскладка

AppShell без сайдбара (только AppTopBar) — страница-визард, не основной рабочий экран. Контент центрирован, max-width на StepIndicator (480px) и StepCard (640px).

## Содержимое по шагам

**Step 1 — Connect Smart Account** (из макета, 1:1)
- Иконка `ShieldCheck` (по имени слоя `icon-shield-check` из Figma)
- Info banner про self-custody
- Connect Wallet + список поддерживаемых кошельков
- Back отключён (это первый шаг)

**Step 2 — Set Up Roles & Permissions** (спроектирован, в макете нет)
- Иконка `Users`
- 3 строки ролей (`RoleRow`): CIO/Full access, DeFi Operator/Execute only, Emergency Contact/View only
- Info banner: права можно изменить позже в Smart Account Setup

**Step 3 — Review & Activate** (спроектирован, в макете нет)
- Иконка `ClipboardCheck`
- Сводная таблица конфигурации (5 строк key/value)
- Success-банер: что произойдёт после активации
- Primary CTA меняется на "Activate Smart Account" (без перехода дальше)

## Переключение шагов

`← Back` / `Continue →` переключают локальный `useState(step)` (1↔2↔3) — это **визуальная навигация по уже готовому статичному контенту**, без слоя данных: ничего не сохраняется, не валидируется, не отправляется. Это тот же класс взаимодействия, что у `Toggle` (самостоятельное визуальное состояние виджета) — не бизнес-логика онбординга (создание Smart Account, реальная привязка кошелька — не реализовано).

## Не оживлено

Connect Wallet / Activate Smart Account не выполняют реального действия. Переключение шагов — чисто визуальная навигация по готовому контенту, чтобы видна была полная структура визарда.
