# OBSIDIAN: Приоритизация по MoSCoW

**Дата:** 2026-04-17  
**Версия:** 1.0

---

## Критерии Must Have

1. **JTBD-primary персоны** — фича напрямую связана с job-to-be-done
2. **Без неё сценарий невозможен** — основной путь не работает
3. **Table stakes** — есть у всех, пользователь ожидает по умолчанию
4. **Либо whitespace** — уникально для нас, критично для дифференциации

---

## Must Have 🔴 (Запуск — Minimum Viable Product)

| # | Фича | Для кого | Критерий | 
|---|------|---------|----------|
| F01 | Smart Accounts | Все | Table stakes, security |
| F02 | Multi-chain Dashboard | Все | Table stakes, unified view |
| F03 | ERC-4626 Vaults | Все | Table stakes, DeFi standard |
| F04 | Base Asset Management | Все | Table stakes, base assets |
| F07 | AI Portfolio Analysis | Все | Whitespace, key differentiator |
| F08 | AI Risk Prediction | P1, P2 | Whitespace, ключевой для family office |
| F09 | Compliance Engine | P1, P2 | Table stakes, enterprise |
| F10 | Audit Logging | P1, P2 | Table stakes, audit requirements |
| **F20** | **Cross-chain Bridge** | P1, P2 | **Возвращён в MVP** — обязательная зависимость F21. Без моста авто-ребалансировка работает только в одной сети и является сломанной фичей |
| **F21** | **AI Auto-Rebalancing** | P2 | **Critical из интервью** — ключевой для family office; требует F20 |
| **F17** | **Multi-Level Approval** | P1, P2 | Enterprise, compliance |
| **F19** | **Reporting (3 templates)** | P1, P2 | Ключевой из интервью (min 3, не 6) |
| **Legal/Custodian Coverage** | P1, P2 | **Critical из интервью** — не продать без ответа |

---

## Should Have 🟠 (Сразу после MVP)

| # | Фича | Для кого | 
|---|------|---------|
| F05 | Strategy Registry | P1, P2 |
| F06 | Position Tracking | P1, P2 |
| F11 | Permissioned Assets (RWA) | P2 |
| F12 | Automatic Alerts | P2 |
| F13 | Identity-linked Assets | P1 |
| **F22** | **Emergency Override** | P2 | |
| **F24** | **Stress Test Report** | P1 | |
| **F25** | **Tax Report Module** | P1 | |
| **Transaction Preview** | P3 | |
| **Risk Warnings** | P1, P2 | |

---

## Could Have 🟡 (Если есть время и ресурсы)

| # | Фича | Для кого |
|---|------|---------|
| F14 | OBSIDIAN Token | — |
| F15 | Structured Products | P2 |
| **F26** | Avalanche Network | P2 |
| Welcome/Onboarding | P2 | |
| Specific Error Messages | P3 | |

---

## Won't Have ❌ (Осознанно откладываем)

| # | Фича | Причина |
|---|------|---------|
| Agent NFT | Заменено на Smart Accounts + AI |
| Governance Token | Сложная токономика |
| Staking Token | Не приоритет |
| NFT-маркетплейс | Не core |
| Routing Aggregation |later, not now |

---

## График релизов

### MVP (Sprint 1-2, $10K)

Must Have фичи без дополнительных маркировок — это MVP scope.

### Post-MVP v1.1 (Sprint 3-4)

- F22 (Emergency Override)
- F24 (Stress Test)
- F25 (Tax Report)
- Transaction Preview

### Post-MVP v1.2 (Sprint 5-6)

- F11 (RWA tokenization)
- F14 (OBSIDIAN Token)
- Welcome/Onboarding
- F15 (Structured Products)

### Post-MVP v2.0 (Sprint 7+)

- F26 (Avalanche)
- Routing Aggregation
- Full RWA tokenization Legal Framework

---

## Рекомендация

**MVP scope:**
- 11 Must Have фич + Legal/Custodian Coverage
- Total: ~12 фич
- Primary personas: P1 (Treasury Manager), P2 (Family Office CIO)

**Не включать в MVP:**
- Full 6 templates для Reporting — только 3 (Portfolio Summary, Transaction Log, Compliance)
- F24, F25 — Tax/Stress report в v1.1
- Avalanche — v2.0