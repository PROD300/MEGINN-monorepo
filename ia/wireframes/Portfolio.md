# Portfolio

**Размер:** desktop 1440×1024
**Назначение:** главный дашборд авторизованного пользователя: активы, AUM, состояние по сетям

---

## Секции (сверху вниз)

### Header (64px высота, full-width)
- Logo «OBSIDIAN» (левый край, 32px от края)
- Кнопка Emergency Stop — прямоугольник 160×36, метка «⚠ Stop All» (центр-правее)
- Иконка уведомлений (правый край, 48×48, с бейджем «3»)
- Avatar-плейсхолдер 36×36 + имя «James Harrington» (правый край)

### Layout (ниже хедера: Sidebar слева + Main справа)

#### Sidebar (240px ширина, высота = оставшаяся)
**Верхний padding: 40px; Gap между пунктами: 30px**
Навигация вертикально:
- Portfolio ← активный пункт (выделен)
- Rebalancing Rules
- Liability & Compliance
- Audit Log
- ——— разделитель ———
- Account Settings
- Выход

#### Main (1200px, весь правый остаток)

##### NetworkBar (40px, full-width Main)
- Тег «ETH — Connected» (зелёная точка-плейсхолдер + текст)
- Тег «Arbitrum — Connected» (зелёная точка + текст)
- Тег «Bridge — Active» (синяя точка + текст; отображает статус F20 Cross-chain Bridge; tooltip: «Li.Fi · last bridge: 3h ago · avg 42 sec»)
- Текст «Last sync: 2 min ago» (правый край)

##### MetricCards (120px высота, 3 карточки в ряд, равные ширины, gap 24px)
- Карточка 1: метка «Total AUM» / значение «$487 350 000» / подпись «across 2 networks»
- Карточка 2: метка «Active Rules» / значение «3» / подпись «auto-rebalancing enabled»
- Карточка 3: метка «Last Rebalance» / значение «2h ago» / подпись «ETH → USDC, Arbitrum»

##### AssetAllocation (заголовок «Asset Allocation», таблица)
Таблица, 5 колонок:
| Asset | Network | Balance | Allocation | Target |
|---|---|---|---|---|
| USDC | Arbitrum | $210 000 000 | 43.1% | 45% |
| ETH | Ethereum | $156 000 000 | 32.0% | 30% |
| stETH | Ethereum | $89 000 000 | 18.3% | 20% |
| USDT | Arbitrum | $32 350 000 | 6.6% | 5% |

Под таблицей: метка «Next rebalance trigger: ETH allocation +2.0% above target»

##### RecentActivity (заголовок «Recent Automation Activity», список)
4 строки-карточки:
- «Auto-rebalance: ETH → USDC — $4 200 000 — 2h ago — ✓ Success»
- «Cross-chain bridge: RWA rebalance — ETH→ARB — $2 100 000 — 3h ago — ✓ Success» (бейдж «Cross-chain»)
- «Auto-rebalance: stETH → ETH — $1 800 000 — 6h ago — ✓ Success»
- «Rule triggered: Slippage Guard — paused USDT rule — 1d ago — ⚠ Warning»

Кнопка-ссылка «View full audit log →» (правый край блока)

---

## Пустое состояние
Если правил нет — вместо MetricCards и AssetAllocation один блок по центру Main:
- Плейсхолдер-иллюстрация 120×120
- H2 «Portfolio not configured»
- Подпись «Set up your Smart Account and create your first rebalancing rule to start»
- CTA-кнопка «Go to Rebalancing Rules»

---

## Placeholder-контент
- Имя пользователя: James Harrington (Family Office CIO)
- AUM: $487 350 000 — реалистично для $500M+ family office из PRD
- Активы: USDC, ETH, stETH, USDT — типовой institutional DeFi-портфель
