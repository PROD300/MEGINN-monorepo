# OBSIDIAN: Конкурентный анализ

## Метаданные

| Параметр | Значение |
|----------|----------|
| Инициатива | OBSIDIAN |
| Дата | 2026-04-16 |
| Версия | 1.0 |
| Основание | OBSIDIAN_brief.md |

---

## Выбор конкурентов

Для OBSIDIAN (система управления капиталом с AI + токенизация + multi-chain) выбраны 5 конкурентов:

| # | Конкурент | Почему закрывает нашу задачу |
|---|-----------|-----------------------------|
| 1 | **Yearn Finance** | ERC-4626 vaults, yield aggregation, battle-tested architecture |
| 2 | **Instadapp** | Multi-chain DeFi management, Smart Accounts, DSL middleware |
| 3 | **DeFi Saver** | Automation, leverage management, liquidation protection |
| 4 | **Pendle Finance** | Tokenization of yield, structured products |
| 5 | **Superform / Beefy** | Cross-chain yield, vault aggregators |

---

## Сравнительная таблица

| Параметр | Yearn | Instadapp | DeFi Saver | Pendle | Superform |
|----------|-------|-----------|------------|--------|-----------|
| **Multi-chain** | ETH, Arb, Opt, Base | ETH, Arb, Poly | ETH, Arb, Poly | ETH, Arb, Poly | Multi-chain |
| **ERC-4626** | ✅ V3 | ❌ | ❌ | ❌ | ✅ |
| **Tokenization** | Vault shares | DSA | ❌ | ✅ PT/SY | ✅ |
| **AI/Automation** | Bot-based | Connector-based | ✅ Full automation | ❌ | ❌ |
| **NFT-based identity** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **RBAC** | Governance | DSA permissions | ❌ | ❌ | ❌ |
| **Compliance-ready** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **AI Assistant** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Target audience** | Retail/DeFi degens | Advanced DeFi users | Leveraged positions | Yield traders | Retail yield |
| **TVL** | $500M+ | $500M+ | $1B+ | $500M+ | $100M+ |
| **Native token** | YFI | INST | DFS | PENDLE | BIFI |

---

## 1. Yearn Finance

### Ключевые фичи
- **yVaults V3** — ERC-4626 compatible vaults с tokenized strategies
- **Automated yield aggregation** — лучшие APY через автоматическое перераспределение
- **Keep3r network** — децентрализованная автоматизация harvest/earn
- **Periphery contracts** — Registry, Debt Allocator, Accountant, APR Oracles
- **Vault Factory** — permissionless deployment для Curve/Balancer LP tokens

### Монетизация
| Компонент | Цена |
|-----------|------|
| Management fee | 0% (factory), 0-2% (standard) |
| Performance fee | 10-20% от прибыли |
| Vault deployment | Бесплатно (factory) |

### UX
- **Онбординг:** Connect wallet → Browse vaults → Deposit
- **Основной флоу:** Dashboard с TVL/APY → Vault selection → Deposit/Withdraw
- **Навигация:** Простая, 3 основных раздела (Vaults, Zaros, Labs)
- **Ключевые экраны:** Vault list, Vault detail, Portfolio overview

### Плюсы
✅ Лучший в своём классе TVL и безопасность
✅ ERC-4626 v3 — стандарт индустрии
✅ Battle-tested код, множественные аудиты
✅ Permissionless strategy deployment

### Минусы
❌ Нет AI-функций
❌ Сложная стратегия для обычных пользователей
❌ Нет compliance/GDPR-ready
❌ Ориентирован на DeFi-профессионалов, не enterprise

---

## 2. Instadapp

### Ключевые фичи
- **DeFi Smart Accounts (DSA)** — non-custodial smart wallets с multi-protocol access
- **DSL (DeFi Smart Layer)** — middleware для cross-protocol interaction
- **Avocado** — multi-chain smart wallet
- **Protocol refinancing** — 1-click migration между Aave/Compound/Maker
- **Flash loan integration** — для complex leveraged positions

### Монетизация
| Компонент | Цена |
|-----------|------|
| Platform usage | Бесплатно |
| Flash loan fees | 0.09% |
| INST token | Governance + potential fee sharing |

### UX
- **Онбординг:** Create DSA → Connect wallet → Explore protocols
- **Основной флоу:** Dashboard → Select protocol → Execute action
- **Навигация:** Сложная, 10+ разделов, для продвинутых
- **Ключевые экраны:** DSA overview, Protocol dashboard, Portfolio, Strategies

### Плюсы
✅ Лучший multi-chain UX для advanced users
✅ Flash loan power для complex strategies
✅ Модульные connectors — легко добавлять протоколы
✅ Strong DeFi foundation (Aave, Maker, Compound)

### Минусы
❌ Высокий порог входа для новичков
❌ Нет AI-ассистента
❌ Нет RBAC для enterprise
❌ Сложный интерфейс для корпоративных клиентов

---

## 3. DeFi Saver

### Ключевые фичи
- **Automation** — 24/7 liquidation protection, stop-loss, take-profit, trailing stops
- **Leverage management** — automated boost/repay, collateral switch
- **Recipe system** — drag-and-drop strategy builder
- **Multi-protocol** — Aave, Maker, Compound, Morpho, Liquity, Spark
- **Safety-first** — modular strategies с fallback mechanisms

### Монетизация
| Компонент | Цена |
|-----------|------|
| Automation fee | 0.05% за execution |
| Advanced actions | 0.25% service fee |
| Basic operations | Бесплатно |

### UX
- **Онбординг:** Connect wallet → Select position → Configure automation
- **Основной флоу:** Portfolio view → Select position → Automate/Swap
- **Навигация:** Clean, focused на 3 основных actions
- **Ключевые экраны:** Dashboard, Position detail, Automation config, Swap

### Плюсы
✅ Лучший automation в DeFi — работает в same block
✅ Профессиональный UI для leverage management
✅ Safety mechanisms (fallbacks, on-chain verification)
✅ Transparent fees

### Минусы
❌ Только lending protocols, no general asset management
❌ Нет AI — всё через rule-based automation
❌ Нет multi-chain (limited networks)
❌ Не подходит для enterprise/corporate clients

---

## 4. Pendle Finance

### Ключевые фичи
- **Tokenization of yield** — PT (Principal Token) + YT (Yield Token)
- **Structured products** — гибкие yield-bearing assets
- **SY (Standardized Yield)** — универсальная обёртка для yield-bearing assets
- **Early exit** — trade future yield separately
- **Liquidity provision** — SY liquidity pools

### Монетизация
| Компонент | Цена |
|-----------|------|
| Trading fees | 0.1-0.4% от trades |
| PENDLE token | Governance + fee discounts |

### UX
- **Онбординг:** Connect → Select asset → Mint PT/YT
- **Основной флоу:** Markets → Position → Trade yield
- **Навигация:** Средней сложности, Markets-centric
- **Ключевые экраны:** Markets list, Position management, Swap

### Плюсы
✅ Инновационная tokenization model
✅ First-mover в yield trading
✅ Интересно для institutional investors
✅ DeFi-native compliance (on-chain)

### Минусы
❌ Сложная концепция для обычных пользователей
❌ Limited asset coverage
❌ Нет AI
❌ Нет RBAC или enterprise features

---

## 5. Superform / Beefy

### Ключевые фичи
- **Cross-chain yield** — unified interface для vault discovery
- **Beefy** — vault auto-compounding
- **Superform** — cross-chain deployment
- **Multi-chain aggregation** — one-click multi-chain deposits
- **Vault optimization** — APY maximization

### Монетизация
| Компонент | Цена |
|-----------|------|
| Platform | Бесплатно |
| Vault fees | Зависит от vault (обычно 0.1-1%) |
| BIFI token | Governance |

### UX
- **Онбординг:** Connect → Browse vaults → Deposit
- **Основной флоу:** Dashboard → Vault list → Auto-invest
- **Навигация:** Простая, vault-focused
- **Ключевые экраны:** Vault list, Vault detail, Portfolio

### Плюсы
✅ Лучший UX для cross-chain yield
✅ Automatic vault switching (Beefy)
✅ Broad protocol coverage
✅ Simple для retail

### Минусы
❌ Нет deep management features
❌ Нет AI
❌ Нет tokenization capabilities
❌ Retail-focused, not enterprise

---

## Gap-анализ: где OBSIDIAN уникален

| Функция | Yearn | Instadapp | DeFi Saver | Pendle | OBSIDIAN |
|---------|-------|-----------|------------|--------|----------|
| AI Portfolio Analysis | ❌ | ❌ | ❌ | ❌ | **✅** |
| AI Risk Prediction | ❌ | ❌ | ❌ | ❌ | **✅** |
| NFT Agent Identity | ❌ | ❌ | ❌ | ❌ | **✅** |
| Enterprise RBAC | ❌ | Partial | ❌ | ❌ | **✅** |
| Compliance-ready | ❌ | ❌ | ❌ | ❌ | **✅** |
| Multi-chain vault | Partial | Partial | ❌ | Partial | **✅** |
| Tokenization | Partial | ❌ | ❌ | ✅ | **✅** |
| Agent NFT | ❌ | ❌ | ❌ | ❌ | **✅** |

---

## Паттерны для перенятия

### 1. Yearn Finance
- **ERC-4626 как стандарт** — использовать для всех vaults
- **Periphery contracts** — модульная архитектура для extensibility
- **Vault Factory** — permissionless deployment для community

### 2. Instadapp
- **DSA pattern** — smart accounts с granular permissions
- **Connector architecture** — модульные integrations
- **Protocol refinancing** — 1-click migration UI

### 3. DeFi Saver
- **Automation triggers** — rule-based automation как baseline
- **Safety mechanisms** — fallbacks, on-chain verification
- **Dashboard UX** — focused, action-oriented interface

### 4. Pendle Finance
- **Tokenization patterns** — PT/YT для yield separation
- **SY wrapper** — standardized yield representation

### 5. Superform
- **Cross-chain abstraction** — unified interface
- **Auto-optimization** — vault switching

---

## Niche OBSIDIAN: где мы сильнее

### 1. AI-first подход
**Ни один конкурент** не имеет AI-ассистента. OBSIDIAN может стать первым платформой где:
- AI анализирует портфель в реальном времени
- AI предсказывает риски до их наступления
- AI предлагает actions на естественном языке

### 2. Enterprise-ready architecture
Все конкуренты — DeFi-native, retail-focused. OBSIDIAN может закрыть:
- RBAC с NFT-based permissions
- Compliance-ready (GDPR, SOC2)
- Multi-level approval для high-risk operations

### 3. Agent NFT = Autonomous DeFi
Agent NFT концепция уникальна:
- Он-чейн AI agent identity
- Delegated execution rights
- Transparent audit trail

### 4. Security tokenization
Pendle делает yield tokenization, но никто не делает security tokenization:
- Токенизация реальных активов
- Юридически обёрнутые доли
- Regulatory compliance

---

## UX-паттерны для OBSIDIAN

### Онбординг
```
1. Connect wallet(s) → Multi-wallet support
2. Role selection → Admin/Operator/Investor/Auditor
3. Portfolio import → Auto-detect from connected wallets
4. AI welcome → "Your portfolio has $X across Y chains..."
5. Quick actions → AI-suggested first steps
```

### Dashboard (obsidian-style)
```
┌─────────────────────────────────────────────────┐
│ OBSIDIAN                    [AI] [Notifications] │
├─────────────┬───────────────────────────────────┤
│ Dashboard   │ Portfolio Value: $X,XXX,XXX       │
│ Wallets     │ ┌─────────────────────────────┐   │
│ Assets      │ │ AI Insights                  │   │
│ Strategies  │ │ • Risk: Low (green)          │   │
│ Vaults      │ │ • Opportunity: ETH staking   │   │
│ AI Assistant│ │ • Action: Rebalance by 5%    │   │
│ Settings    │ └─────────────────────────────┘   │
│             │ ┌─────────────────────────────┐   │
│ [Role: Admin│ │ Multi-chain Assets          │   │
│             │ │ ETH: $X │ BTC: $X │ USDC: $X│   │
│             │ └─────────────────────────────┘   │
└─────────────┴───────────────────────────────────┘
```

### Transaction Flow
```
1. Action initiated → AI validates → Risk score shown
2. Multi-level approval (if high-risk) → Pending approvals
3. Confirmation → Smart contract execution
4. Result → Audit log updated
```

---

## Выводы

### Ключевые инсайты
1. **ERC-4626 — must-have** — Yearn доказал стандарт
2. **Automation — table stakes** — DeFi Saver установил ожидания
3. **Multi-chain — requirement** — все движутся к cross-chain
4. **AI — whitespace** — никто не делает, но все ждут
5. **Enterprise — gap** — все конкуренты retail-focused

### Рекомендации для OBSIDIAN
1. **Взять ERC-4626** как core vault standard (как Yearn)
2. **Добавить automation** (rule-based как DeFi Saver)
3. **Улучшить AI** — стать первым AI-native платформой
4. **Фокус на RBAC + Compliance** — отстройка от конкурентов
5. **Agent NFT** — уникальная value proposition

### MVP differentiation
| Компетенция | Конкуренты сильны | OBSIDIAN должен быть |
|-------------|-------------------|---------------------|
| Yield aggregation | Yearn, Beefy | Равный или лучше |
| Automation | DeFi Saver | AI-enhanced |
| Multi-chain | Instadapp | Равный |
| AI | Никто | **10x лучше** |
| Enterprise | Никто | **First mover** |

---

## Файлы

| Файл | Назначение |
|------|------------|
| `OBSIDIAN_brief.md` | Бриф проекта |
| `competitive_analysis.md` | Этот файл |
