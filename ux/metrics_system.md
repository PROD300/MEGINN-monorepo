# OBSIDIAN: Tier-1 Metrics System

## Единый источник истины (Single Source of Truth)

> **Версия:** 1.4
> **Дата:** 2026-04-17
> **Статус:** Institutional Grade
> **Asset System:** v2
> **Traceability:** v2.1
> **New Features:** F20 (Bridge), F21 (Auto-Rebalancing), F22 (Override)
> **Interview Insights:** Family Office CIO

---

## 1. Core Institutional Metrics (M)

Эти метрики — основа для институциональных клиентов. Без них продукт не готов к enterprise-продажам.

### AUM (Assets Under Management)

| Параметр | Значение |
|----------|----------|
| Текущее | $0 |
| Цель Этап 1 | $50M+ |
| Цель Этап 2 | $250M+ |
| Measurement | Ежедневный tracking в dashboard |
| Dependencies | Onboarding, Custody, Vaults |

### Volume (Объём операций)

| Параметр | Значение |
|----------|----------|
| Текущее | $0 |
| Цель Этап 1 | $100M/месяц |
| Цель Этап 2 | $500M/месяц |
| Measurement | Ежемесячный aggregate |
| Dependencies | Execution, UX, Latency |

### Institutional Clients (Количество институциональных клиентов)

| Параметр | Значение |
|----------|----------|
| Текущее | 0 |
| Цель Этап 1 | 5–10 |
| Цель Этап 2 | 25–50 |
| Measurement | Counter, ежемесячно |
| Dependencies | Onboarding, Compliance |

### Average Client Size (Средний размер клиента)

| Параметр | Значение |
|----------|----------|
| Текущее | — |
| Цель Этап 1 | $5M+ |
| Цель Этап 2 | $10M+ |
| Measurement | AUM / Clients |
| Dependencies | Enterprise tier |

---

## 2. Operational Efficiency (M)

### Transaction Time (Время подтверждения операции)

| Параметр | Значение |
|----------|----------|
| Текущее | >30 мин |
| Цель | <3–5 мин (end-to-end) |
| Measurement | Latency tracking, p95 |
| Dependencies | Execution, Approvals |

### Approval Coverage (Доля операций с многоступенчатым подтверждением)

| Параметр | Значение |
|----------|----------|
| Текущее | 0% |
| Цель | 95–100% |
| Measurement | % of transactions with approval workflow |
| Dependencies | Multi-level Approval System |

### Report Generation Time (Время подготовки отчёта)

| Параметр | Значение |
|----------|----------|
| Текущее | дней |
| Цель | <1 часа |
| Measurement | Report generation latency |
| Dependencies | Reporting, Audit Logs |

---

## 3. Control & Compliance (M)

### Audit Trail Completeness (Полнота истории действий)

| Параметр | Значение |
|----------|----------|
| Текущее | частично |
| Цель | 100% |
| Measurement | % of actions with complete audit log |
| Dependencies | Audit Logging System |

### Policy Coverage (Доля операций под правилами контроля)

| Параметр | Значение |
|----------|----------|
| Текущее | 0% |
| Цель | 100% |
| Measurement | % of transactions matching policy rules |
| Dependencies | Policy Engine |

### Compliance Level (Уровень compliance)

| Параметр | Значение |
|----------|----------|
| Текущее | — |
| Цель | 100% (SOC2/GDPR) |
| Measurement | Compliance audit results |
| Dependencies | Compliance Module |

---

## 4. Security & Reliability (M)

### Security Incidents (Критические инциденты безопасности)

| Параметр | Значение |
|----------|----------|
| Текущее | — |
| Цель | 0 |
| Measurement | Incident counter, severity tracking |
| Dependencies | RBAC, Security Module |

### Incident Response Time (Время реакции на инцидент)

| Параметр | Значение |
|----------|----------|
| Текущее | — |
| Цель | <15 минут |
| Measurement | MTTR (Mean Time To Response) |
| Dependencies | Incident Response |

### Uptime

| Параметр | Значение |
|----------|----------|
| Текущее | — |
| Цель | 99.9% |
| Measurement | Uptime monitoring |
| Dependencies | Infrastructure |

---

## 5. Growth & Usage (S)

Эти метрики вторичны. Фокус — на Core Institutional.

### Active Investors (Активные инвесторы)

| Параметр | Значение |
|----------|----------|
| Текущее | 0 |
| Цель Этап 1 | 50–200 |
| Цель Этап 2 | 500–2000 |
| Measurement | Monthly active users |

### Client Retention (Удержание клиентов)

| Параметр | Значение |
|----------|----------|
| Текущее | — |
| Цель | >90% |
| Measurement | Monthly retention rate |

### Activity Frequency (Частота операций на клиента)

| Параметр | Значение |
|----------|----------|
| Текущее | — |
| Цель | рост MoM |
| Measurement | Transactions per client per month |

### DAU/MAU Ratio

| Параметр | Значение |
|----------|----------|
| Текущее | — |
| Цель | >50% |
| Measurement | Engagement metric |

---

## 6. Удалённые метрики

| Метрика | Причина удаления |
|---------|----------------|
| ROI как целевой KPI | Нельзя гарантировать рыночную доходность. Заменено на наблюдаемые метрики. |

---

## 7. Dashboard Layout (Tier-1)

```
┌─────────────────────────────────────────────────────────────┐
│ OBSIDIAN Dashboard — Institutional Grade              [Admin] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ CORE METRICS                    CONTROL & COMPLIANCE        │
│ ┌─────────────────────┐         ┌─────────────────────┐   │
│ │ AUM                 │         │ Audit Trail         │   │
│ │ $XX.XM   ▲ +X.X%   │         │ XX.X% complete ✓   │   │
│ └─────────────────────┘         └─────────────────────┘   │
│ ┌─────────────────────┐         ┌─────────────────────┐   │
│ │ Volume (Monthly)    │         │ Policy Coverage     │   │
│ │ $XXX.XM            │         │ XX.X% ✓            │   │
│ └─────────────────────┘         └─────────────────────┘   │
│ ┌─────────────────────┐         ┌─────────────────────┐   │
│ │ Institutional       │         │ Compliance          │   │
│ │ Clients: XX         │         │ SOC2/GDPR ✓        │   │
│ └─────────────────────┘         └─────────────────────┘   │
│                                                             │
│ OPERATIONAL EFFICIENCY          SECURITY & RELIABILITY    │
│ ┌─────────────────────┐         ┌─────────────────────┐   │
│ │ Transaction Time    │         │ Security Incidents │   │
│ │ XX.Xs  ▼ target ✓  │         │ 0 (critical) ✓    │   │
│ └─────────────────────┘         └─────────────────────┘   │
│ ┌─────────────────────┐         ┌─────────────────────┐   │
│ │ Approval Coverage    │         │ Response Time      │   │
│ │ XX.X% ✓             │         │ <15min target ✓    │   │
│ └─────────────────────┘         └─────────────────────┘   │
│                                                             │
│ GROWTH METRICS                                           │
│ ┌─────────────────────┐         ┌─────────────────────┐   │
│ │ Active Investors     │         │ Retention           │   │
│ │ XX                   │         │ XX.X% ✓            │   │
│ └─────────────────────┘         └─────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. Alert Thresholds

| Метрика | Warning | Critical |
|---------|---------|----------|
| AUM | <$1M (Этап 1) | <$500K |
| Volume | <$10M/month | <$5M/month |
| Transaction Time | >5 min | >10 min |
| Approval Coverage | <90% | <80% |
| Audit Trail | <95% | <90% |
| Security Incidents | >0 | >1 |
| Incident Response | >10 min | >15 min |
| Uptime | <99.5% | <99% |
| Retention | <85% | <80% |

---

## 10. Reporting Schedule

| Report | Frequency | Audience | SLA |
|--------|-----------|----------|-----|
| Daily Dashboard | Daily | Internal | Real-time |
| Weekly Metrics | Weekly | PM, Leadership | Monday 9AM |
| Monthly Institutional | Monthly | Investors | 5th of month |
| Quarterly Business Review | Quarterly | Board | 10th of quarter |
| Compliance Audit | Quarterly | Audit Committee | Per schedule |
| Incident Report | As needed | Security team | <1 hour |

---

*Этот документ — единый источник истины для метрик OBSIDIAN.*
*Все последующие документы должны ссылаться на эту версию.*
