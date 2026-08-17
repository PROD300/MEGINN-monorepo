# RuleCreate

**Размер:** desktop 1440×1024
**Назначение:** создание нового правила ребалансировки: порог, сеть, условие, аллокация

---

## Секции (сверху вниз)

### Header (64px высота, full-width)
Идентичен Portfolio:
- Logo «MEGINN» (левый край)
- Кнопка Emergency Stop — «⚠ Stop All» (центр-правее)
- Иконка уведомлений с бейджем «3» (правый край)
- Avatar 36×36 + «James Harrington» (правый край)

### Layout (ниже хедера: Sidebar слева + Main справа)

#### Sidebar (240px ширина)
**Верхний padding: 40px; Gap между пунктами: 30px**
Навигация:
- Portfolio
- Rebalancing Rules ← активный пункт (RuleCreate — дочерний экран)
- Liability & Compliance
- Audit Log
- ——— разделитель ———
- Account Settings
- Выход

#### Main (1200px, два столбца: Form 720px + Preview 440px, gap 40px)

##### Breadcrumb + PageHeader (56px)
- Хлебные крошки: «Rebalancing Rules / Create Rule»
- H1 «Create Rebalancing Rule»

##### FormColumn (720px, форма сверху вниз)

**FormSection — Rule Identity**
- Поле «Rule Name» — текстовый input, placeholder «ETH Rebalancing Guard»
- Поле «Description (optional)» — textarea 2 строки, placeholder «Keeps ETH allocation within target range»

**FormSection — Trigger Condition**
Заголовок секции: «When should the rule fire?»
- Селектор «Asset» — dropdown, выбрано «ETH»
- Селектор «Network» — dropdown, выбрано «Ethereum»
- Строка условия (3 элемента в ряд):
  - Лейбл «If allocation» — текст
  - Селектор оператора — dropdown: «>» (выбрано) / «<» / «≠»
  - Input «35» + единица «%»
- Подсказка под строкой: «Current ETH allocation: 32.0% — rule will not fire until threshold is reached»

**FormSection — Action**
Заголовок: «What should happen?»
- Селектор «Action» — dropdown: «Sell to rebalance» (выбрано) / «Buy to rebalance»
- Строка (2 элемента в ряд):
  - Лейбл «Sell» + dropdown «ETH»
  - Лейбл «into» + dropdown «USDC»
- Селектор «Target network for swap» — dropdown «Arbitrum»
  - Подсказка под селектором: «Different network? Cross-chain Bridge (F20) will be used automatically · powered by Li.Fi»
  - Если выбрана другая сеть — появляется info-баннер: «Cross-chain execution: ETH will be bridged Ethereum → Arbitrum before swap. Est. bridge time: ~40 sec. Bridge fee included in slippage tolerance.»
- Поле «Target allocation after rebalance» — input «30» + «%»

**FormSection — Execution Settings**
Заголовок: «Safety & Execution»
- Поле «Max slippage tolerance» — input «0.8» + «%» / подсказка «Rule pauses if slippage exceeds this value»
- Поле «Max gas price» — input «25» + «Gwei» / подсказка «Transaction skipped if gas exceeds limit»
- Переключатель «Execution window» — «Any time» (выбрано) / «Business hours only»

**FormSection — Notifications**
Заголовок: «Notifications»
- Тогл «Notify after each execution» — включён
- Тогл «Notify if rule is paused automatically» — включён

**FormFooter (кнопки)**
- Кнопка «Save & Activate Rule» (primary, 200×44)
- Кнопка «Save as Draft» (secondary)
- Ссылка «Cancel»

##### PreviewColumn (440px, правая панель — sticky)

**RuleSummary**
Заголовок «Rule Preview»
Карточка-превью (плейсхолдер серый фон):
- Название: «ETH Rebalancing Guard»
- Триггер: «ETH > 35% on Ethereum»
- Действие: «Sell ETH → USDC on Arbitrum»
- Режим исполнения: «Cross-chain via Bridge (F20 · Li.Fi)»
- Целевая аллокация: «30%»
- Slippage guard: «0.8%» (включает bridge fee)
- Статус после сохранения: «Will activate immediately»

**RuleImpactEstimate**
Заголовок «Estimated Impact»
- «At current portfolio: no action needed (ETH at 32%)»
- «Would trigger at: ~$14 700 000 ETH (32% → 35%)»
- «Estimated swap size: ~$9 800 000»

---

## Состояние валидации
Если обязательное поле не заполнено при нажатии Save:
- Поле обводится / метка-ошибка под полем (текст-плейсхолдер «This field is required»)
- Кнопка «Save & Activate Rule» остаётся доступной, но форма прокручивается к первой ошибке

---

## Placeholder-контент
- Rule Name: «ETH Rebalancing Guard» — понятный institutional-нейминг
- Цифры (35%, 30%, 0.8 Gwei) — реалистичные для DeFi-операций
- Impact Estimate — подчёркивает «Set and Forget» ценность из PRD
