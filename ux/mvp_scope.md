# MEGINN: MVP Scope

**Дата:** 2026-04-17  
**Версия:** 1.0

---

## Одно предложение

**MEGINN** — AI-native enterprise платформа для управления цифровыми активами. Специализирована для корпоративных клиентов и family offices. Обеспечивает полный контроль, compliance, и AI-аналитику в одном интерфейсе.

---

## Список фич MVP

### Core Platform (7 фич)

| # | Фича | Описание |
|---|------|---------|
| F01 | Smart Accounts | Account abstraction, RBAC, roles для enterprise |
| F02 | Multi-chain Dashboard | Unified view ETH, Arbitrum, Base, Solana, Polygon |
| F03 | ERC-4626 Vaults | Vaults для депозитов/выводов (ERC-4626 standard) |
| F04 | Base Asset Management | Поддержка ETH, USDC, wBTC |
| F07 | AI Portfolio Analysis | AI-анализ портфеля в реальном времени |
| F08 | AI Risk Prediction | ML-based предсказание рисков |
| F10 | Audit Logging | Immutable action logging, 100% history |

### Enterprise (4 фичи)

| # | Фича | Описание |
|---|------|---------|
| F17 | Multi-Level Approval | 2-3 уровня подтверждения, routing по суммам |
| F19 | Institutional Reporting | 3 templates: Portfolio Summary, Transaction Log, Compliance Report |
| **Legal** | **Legal/Custodian Coverage** | Legal partner network, custodian liability |
| **Compliance** | **Compliance Engine** | Policy enforcement, whitelist |

### Infrastructure (1 фича)

| # | Фича | Описание |
|---|------|---------|
| **F20** | **Cross-chain Bridge** | Unified bridge 7+ networks (Li.Fi/Socket/Across) |

### AI Auto-Rebalancing (1 фича)

| # | Фича | Описание |
|---|------|---------|
| **F21** | **AI Auto-Rebalancing** | Auto-rebalancing с лимитами (если X > Y% → Z), override |

---

**Total MVP фич:** 13

---

## Основной сценарий (Primary Persona: Family Office CIO)

### Путь от входа до результата

```
1. Connect Wallet
   ↓
2. Dashboard (Multi-chain view)
   ↓
3. AI Analysis: "show portfolio"
   → AI показывает текущее состояние, P&L
   ↓
4. AI предложение: "suggest rebalancing"
   → AI предлагает rebalancing если лимит превышен
   ↓
5. Auto-Rebalancing (F21)
   → Автоматически ребалансирует если в пределах лимитов
   → Post-factum notification
   ↓
6. Override (если нужно)
   → Кнопка "стоп" если что-то не так
   ↓
7. Report: "generate portfolio summary"
   → PDF/CSV export для family meeting
```

### Экраны MVP

1. **Login/Connect** — Wallet connection
2. **Dashboard** — Multi-chain overview, AI insights
3. **Vaults** — Deposit/withdraw, vault management
4. **AI Assistant** — Natural language interface
5. **Reports** — 3 templates (Portfolio, Transactions, Compliance)
6. **Settings** — RBAC, approval rules, rebalancing limits

---

## Что осознанно НЕ входит в MVP

### Top 3 фичи для Post-MVP v1.1

| # | Фича | Почему не сейчас |
|---|------|-----------------|
| 1 | **Stress Test Report** | Низкий приоритет — "нужно будет когда-нибудь", не сейчас |
| 2 | **Tax Report Module** | Требует интеграции с tax providers — сложно для MVP |
| 3 | **Emergency Override** | М��жно управлять вручную пока auto-rebalancing работает корректно |

### Почему не сейчас?

- **Время:** MVP за 2-4 недели, <$10K
- **Фокус:** Core platform + AI + compliance готовы → можно продавать
- **Риск:** Не успеть с legal/custodian coverage до launch

### Готовность к продажам

После MVP:
- ✅ Enterprise clients (Treasury Manager) — могут onboard
- ✅ Family Offices (CIO) — могут использовать
- ✅ Можно演示 для family council
- ✅ SOC2-ready (Audit Logging, Compliance Engine)

---

## Success Metrics для MVP (Tier-1)

| Метрика | Цель | 
|---------|------|
| AUM | $50M+ (Этап 1) |
| Volume | $100M+/месяц |
| Institutional clients | 5-10 |
| Average client size | $5M+ |
| Approval Coverage | 95-100% |
| Report Generation | <1 hour |
| Incident Response | <15 min |

---

## Dependencies

| Фича | Зависит от |
|------|-----------|
| F21 (Auto-Rebalancing) | **F20 (Cross-chain Bridge)** — обязательно; F07 (AI Analysis), F02 (Dashboard) |
| F19 (Reporting) | F10 (Audit Logging) |
| F17 (Approval) | F01 (Smart Accounts) |
| F20 (Bridge) | External: Li.Fi / Socket / Across API |

---

## Risks

| Risk | Mitigation |
|------|------------|
| Legal/Custodian — нет партнёра | Начать с limited scope, добавить later |
| Bridge API — могут быть проблемы | F20 в MVP — fallback недопустим; требуется резервный провайдер (Socket → Across) |
| Auto-Rebalancing — ошибки | Override button обязательно |

---

**Status:** MVP Scope Ready  
**Для:** Sprint 1-2, $10K budget  
**Primary:** Family Office CIO + Treasury Manager