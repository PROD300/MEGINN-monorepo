# Screen: Account Settings

**Роут:** `/settings`
**Файл:** `src/screens/settings/Settings.tsx`
**Figma:** node 244:2 — Screen/Settings

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|----------------|
| `AppTopBar` | base | Верхняя панель |
| `AppSidebar` | base | Боковое меню, `active="settings"` |
| `Tabs` | base | Profile / Notifications / Security — в макете ни один таб визуально не активен, поэтому `active=""` (нет совпадения, все default); `onChange` — пустая функция-заглушка (тип пропса обязательный, поведения нет) |
| `Badge` | base | "Family Office CIO" (Profile), "Primary"/"Backup" (Connected Wallets) — variant success |
| `Input` | base | Full Name, Work Email, Organization |
| `Select` | base | AUM Range — "$100M–$500M", растянут на всю ширину через `fullWidthSelect` |
| `Button` | base | Save Changes / Cancel (primary, sm), Manage Wallets → , Deactivate Account |

## Локальные части (доменные, inline в файле экрана)

| Блок | Описание |
|------|----------|
| `ProfileCard` | Заголовок + AvatarRow (avatar-плейсхолдер + имя/email/Badge) + divider + 4 FieldRow + CTA |
| `NotificationsCard` | Заголовок + 5 ToggleRow (label + toggle-индикатор) |
| `ConnectedWalletsCard` | Заголовок + 2 MiniWalletRow (адрес + Badge) + кнопка Manage Wallets |
| `DangerZoneCard` | Заголовок (text-error) + описание + кнопка Deactivate Account, рамка border-error |
| `toggleOn` / `toggleOff` | Статичные визуальные индикаторы переключателя (нет компонента Toggle в базе) — кандидат на вынос в UI-кит, такой же паттерн уже встретился в SmartAccountSetup |

## Статика (контент из макета)

- Profile: James Harrington, james@familyoffice.com, Family Office CIO, Organization "Harrington Family Office", AUM Range "$100M–$500M"
- Notifications: 5 переключателей, 4 включены, "Weekly summary digest" выключен (по макету)
- Connected Wallets: 0x4aB2...c1F8 (Primary), 0x9eC1...a3D2 (Backup)
- Danger Zone: предупреждающий текст про деактивацию аккаунта

## Кандидаты на вынос в базу

- `Toggle` — повторно встретился (после SmartAccountSetup), стоит вынести в UI-кит на следующей итерации

## Подтверждение

Логика, обработчики, состояние и слой данных не добавлены — экран полностью статичный. `Tabs.onChange` — пустая заглушка для удовлетворения типа пропса, переключение табов не работает.
