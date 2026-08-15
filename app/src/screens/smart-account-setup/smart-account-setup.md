# Screen: Smart Account Setup

**Роут:** `/smart-account-setup`
**Файл:** `src/screens/smart-account-setup/SmartAccountSetup.tsx`
**Figma:** node 243:2 — Screen/SmartAccountSetup

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|----------------|
| `AppTopBar` | base | Верхняя панель |
| `AppSidebar` | base | Боковое меню, `active="settings"` (ближайший доступный пункт — Account Settings; отдельного пункта Smart Account Setup в навигации нет) |
| `Button` | base | "+ Add Role" (primary, sm), "Disconnect" ×2 (primary, sm) |
| `Badge` | base | "Primary" / "Backup" (variant success) в WalletRow, "Active" в RoleRow |
| `RoleRow` | base | ×3 — James Harrington (CIO), DeFi Operator, Emergency Contact |
| `Input` | base | "Multi-sig required for amounts above" — defaultValue "10,000 USD" |

## Локальные части (доменные, inline в файле экрана)

| Блок | Описание |
|------|----------|
| `PageHeader` | Заголовок экрана + кнопка Add Role |
| `InfoBanner` | Информационная плашка про F01 Smart Account |
| `WalletRow` (инлайн) | Карточка кошелька: иконка + имя/адрес/сети + Badge + Disconnect. В макете это не RoleRow и не отдельный задокументированный компонент базы — собран локально из Badge + Button + токенов. Кандидат на вынос, если повторится на другом экране. |
| `AddWalletRow` | Пунктирная рамка с иконкой Plus и текстом "Connect another wallet" |
| `SecRow` + `toggleOn` | Строка настройки безопасности: иконка + лейбл + Input или toggle-индикатор. Toggle нарисован как локальный статичный индикатор (нет компонента Toggle в базе) — кандидат на вынос в UI-кит при повторном использовании. |

## Статика (контент из макета)

- Wallets: Primary Wallet (0x4aB2...c1F8, Ethereum · Arbitrum), Hardware Wallet Ledger (0x9eC1...a3D2, Ethereum)
- Roles: James Harrington / CIO · Full access; DeFi Operator / Execute only; Emergency Contact / View only
- Security: "10,000 USD" lимит на мультисиг, toggle "Hardware wallet confirmation" по умолчанию выключен (visual off)
- Иконки — плейсхолдеры из lucide-react (Wallet, HardDrive, Plus, ShieldCheck, Fingerprint)

## Кандидаты на вынос в базу

- `WalletRow` — если встретится на втором экране
- `Toggle` — если встретится на втором экране

## Подтверждение

Логика, обработчики, состояние и слой данных не добавлены — экран полностью статичный, содержимое единично взято из дизайна.
