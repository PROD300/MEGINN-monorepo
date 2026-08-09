# Screen: Login

**Роут:** `/login`
**Файл:** `src/screens/login/Login.tsx`
**Figma:** node 234:2 — Screen/Login

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `Button` | base | Connect Wallet (primary, sm, fullWidth), Sign In (primary, sm, fullWidth) |
| `Input` | base | Work email, Password |

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `LogoBlock` | OBSIDIAN + tagline "Institutional Portfolio Management" |
| `WalletSection` | hint + Connect Wallet button + supported wallets caption |
| `OrDiv` | разделитель "or" между секциями входа |
| `EmailSection` | hint + 2 Input + Sign In button |
| `FooterLinks` | Forgot password? / Request Access → |

Все блоки — inline в Login.tsx, без `/parts/` (простые, не повторяются на других экранах).

## Раскладка

Экран без AppShell (публичный, неавторизованный) — full-height dark background (`--surface-app-shell`), карточка 480px по центру (flex center), внутри — vertical stack с gap-6.

## Статика (контент из макета)

- OBSIDIAN / Institutional Portfolio Management
- Connect Wallet / MetaMask · Ledger · Gnosis Safe
- Work email / Password placeholders, Sign In
- Forgot password? / Request Access →

## Кандидаты на вынос в базу

- Нет новых доменных компонентов, кандидатов на вынос не выявлено.

## Не оживлено

Кнопки и ссылки рендерятся без обработчиков, инпуты без состояния/валидации.
