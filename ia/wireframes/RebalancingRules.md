# RebalancingRules

**Размер:** desktop 1440×1024
**Назначение:** список всех правил ребалансировки с их статусом (активно / пауза / ошибка)

---

## Секции (сверху вниз)

### Header (64px высота, full-width)
Идентичен Portfolio:
- Logo «OBSIDIAN» (левый край)
- Кнопка Emergency Stop — «⚠ Stop All» (центр-правее)
- Иконка уведомлений с бейджем «3» (правый край)
- Avatar 36×36 + «James Harrington» (правый край)

### Layout (ниже хедера: Sidebar слева + Main справа)

#### Sidebar (240px ширина)
**Верхний padding: 40px; Gap между пунктами: 30px**
Навигация:
- Portfolio
- Rebalancing Rules ← активный пункт
- Liability & Compliance
- Audit Log
- ——— разделитель ———
- Account Settings
- Выход

#### Main (1200px)

##### PageHeader (56px высота)
- H1 «Rebalancing Rules» (левый край)
- Кнопка «+ Create Rule» (правый край, 160×40)

##### StatusFilter (40px высота)
Таб-переключатель:
- «All (4)» ← активный таб
- «Active (3)»
- «Paused (1)»
- «Error (0)»
- «Cross-chain (1)» — фильтр только правил с бриджем (F20)

##### RulesList (список карточек, gap 12px)

**RuleCard 1 — ETH Balance Guard**
- Левая часть: название «ETH Balance Guard» (Medium, 16px) / подпись «ETH allocation > 32% → sell excess to USDC»
- Центр: сеть «Arbitrum» / последнее срабатывание «Last triggered: 2h ago»
- Правая часть: бейдж «Active» / кнопки-плейсхолдеры «Edit» · «Pause»

**RuleCard 2 — stETH Target Allocation**
- Левая часть: «stETH Target Allocation» / «stETH < 18% → buy stETH from ETH»
- Центр: «Ethereum» / «Last triggered: 6h ago»
- Правая часть: бейдж «Active» / «Edit» · «Pause»

**RuleCard 3 — RWA Cross-chain Rebalance** *(новое правило — кросс-чейн, F20)*
- Левая часть: «RWA Cross-chain Rebalance» / «RWA < 50% → buy RWA from USDC via Bridge»
- Центр: иконка-бейдж «Cross-chain» (Ethereum → Arbitrum) / «Last triggered: 3h ago»
- Правая часть: бейдж «Active» / «Edit» · «Pause»
- Строка-подсказка под картой (info): «Bridge powered by F20 · via Li.Fi · avg. 42 sec»

**RuleCard 4 — USDT Ceiling**
- Левая часть: «USDT Ceiling» / «USDT > 6% → sell USDT to USDC»
- Центр: «Arbitrum» / «Last triggered: 1d ago»
- Правая часть: бейдж «Paused — Slippage Guard» / «Edit» · «Resume»
- Строка-предупреждение под картой: «Rule paused automatically: slippage exceeded 1.2% on last attempt»

##### AutomationSummary (нижняя строка, 48px)
- Текст «Automation volume: $6 000 000 managed in last 24h»
- Текст «Cross-chain volume: $2 100 000 bridged in last 24h · Bridge: Li.Fi»
- Текст «Next scheduled check: in 14 min»

---

## Пустое состояние (EmptyRules)
Если правил нет — вместо StatusFilter и RulesList:
- Плейсхолдер-иллюстрация 120×120 (по центру Main)
- H2 «No rebalancing rules yet»
- Подпись «Create your first rule to start automated portfolio management»
- CTA «+ Create Rule» (кнопка по центру)

---

## Placeholder-контент
- 4 правила — реалистичный набор для $487M DeFi-портфеля
- RuleCard 3 «RWA Cross-chain Rebalance» демонстрирует F20 Cross-chain Bridge в действии: правило пересекает сети (Ethereum → Arbitrum) автоматически
- Статусы отражают сценарий из PRD: Slippage Guard как причина паузы (F22)
- Automation volume и Cross-chain volume подчёркивают North Star Metric из PRD
- Таб «Cross-chain» позволяет CIO мониторить только кросс-чейн операции
