# MEGINN Landing Page — Техническое задание

**Версия:** 1.0  
**Дата:** 2026-05-14  
**Статус:** Draft  
**Аудитория документа:** Design, Frontend, Product

---

## 1. Контекст и назначение

Лэндинг — единственная публичная страница проекта на этапе MVP. Все остальные экраны в ситемапе (`Portfolio`, `RebalancingRules`, и т.д.) находятся за авторизацией.

**Цель лэндинга:** сконвертировать тёплый трафик (референс от другого family office, Token2049, поиск "institutional DeFi platform") в заявку на демо или запрос на ранний доступ.

**Ключевое ограничение:** продукт B2B, чек $50K–100K/год, решение принимается долго. Лэндинг — не страница конверсии в оплату, а страница квалификации лида и первичного доверия.

---

## 2. Целевая аудитория страницы

### Primary
**Family Office CIO** — управляет $500M+ AUM, крипто-аллокация 5–10% ($40M+). Находит через референс или конференцию. Хочет убедиться: "это не retail, это моё".

Его страхи на лэндинге:
- "Ещё один DeFi-стартап для розницы"
- "Непонятно, кто несёт ответственность за средства"
- "Это требует постоянного внимания — у меня нет времени"

### Secondary
**Treasury Manager** — VP по цифровым активам в корпорации, $50M+ в крипто. Ищет платформу, которую можно показать совету директоров. Его страхи: compliance, аудит, accountability.

### Не целевая
Розничные инвесторы, DeFi-энтузиасты, операторы — лэндинг не для них.

---

## 3. Позиционирование и ключевое сообщение

**Главный тезис:**  
> "Set your rules once. MEGINN manages your portfolio autonomously — with full legal coverage."

**Расшифровка для каждой персоны:**
- CIO: меньше 10 минут в месяц, AI следит за аллокацией, вы получаете post-factum уведомления
- Treasury Manager: 100% операций покрыты Legal/Custodian Framework, audit trail, compliance-ready

**Differentiators (из competitive analysis — whitespace):**
1. AI-first — ни один конкурент не имеет
2. Legal/Custodian Coverage — уникально
3. Enterprise RBAC + Multi-level approval — уникально
4. Built for institutions, not retail

---

## 4. Структура страницы

Страница — single-page, scroll-based. Семь секций + футер.

```
[S1] Hero
[S2] Problem
[S3] How It Works
[S4] Features
[S5] Trust & Security
[S6] Who It's For
[S7] CTA / Early Access
[Footer]
```

---

## 5. Спецификация секций

---

### S1 — Hero

**Цель:** За 5 секунд ответить на вопрос "это для меня?" и вызвать желание читать дальше.

**Компоновка:** Full-viewport. Слева — текст, справа — визуал (абстрактный дашборд / анимированная сетка активов).

**Контент:**

| Элемент | Текст |
|---------|-------|
| **Eyebrow** | Institutional Portfolio Automation |
| **H1** | Your portfolio runs itself. You just review. |
| **Subhead** | MEGINN is an AI-native platform for Family Offices and Corporate Treasuries that manages digital asset portfolios autonomously — within your rules, with full legal coverage. |
| **Primary CTA** | Request Early Access |
| **Secondary CTA** | See How It Works ↓ |
| **Trust signal под CTA** | Built for $10M+ AUM · Ethereum & Arbitrum · Legal/Custodian Framework |

**Визуал:** Тёмный фон (соответствует DS — brand dark). Правая часть — preview дашборда Portfolio с анимацией: строки активов тихо обновляются, один показатель помечается "Rebalanced by AI". Не интерактивно.

**Логика:**
- H1 закрывает боль CIO: нет времени, не хочет каждый раз нажимать approve
- Subhead квалифицирует: Family Office, Corporate Treasury, autonomous, legal coverage
- Trust signal отсеивает retail до того, как они прокрутят дальше

---

### S2 — Problem

**Цель:** Показать, что мы понимаем их реальную боль — не "сложно инвестировать", а конкретные операционные проблемы.

**Заголовок секции:** The Status Quo Is Broken

**Формат:** 3 карточки (pain points), каждая со значком, заголовком, описанием. Icon slot: 60×60px.

| # | Значок | Заголовок | Описание |
|---|--------|-----------|----------|
| 1 | ⏱ | Manual Management Eats Time | You're approving every rebalance transaction manually. A $40M crypto allocation shouldn't require daily attention. |
| 2 | ⚖ | Personal Liability Is Unclear | When an automated trade goes wrong — who is responsible? Most platforms leave that question unanswered. |
| 3 | 🧩 | Five Tools, Zero Coherence | Ledger for custody, Excel for tracking, email for approvals, phone calls to the bank. Institutional management deserves better. |

**Логика:** Три боли взяты напрямую из персон (раздражители из ux/personas.md). Не абстрактные, а буквальные цитаты-инсайты.

---

### S3 — How It Works

**Цель:** Показать simple mental model "как работает" за три шага. Снять страх сложности.

**Заголовок:** Institutional automation in three steps.

**Формат:** Горизонтальный stepper (на desktop), вертикальный (на mobile). Каждый шаг — иконка, номер, заголовок, 2–3 строки текста.

| Шаг | Заголовок | Текст |
|-----|-----------|-------|
| 1. Set Your Rules | Define your allocation strategy | Tell MEGINN: "Keep RWA at 50%, ETH below 30%." Set risk thresholds, networks, and approval delegation. One-time setup. |
| 2. MEGINN Runs Automatically | AI monitors and rebalances 24/7 | The system continuously tracks your portfolio across Ethereum and Arbitrum. When a threshold is crossed, it rebalances — no manual approval needed. |
| 3. You Review, Not Manage | Post-factum notifications and one-click reports | Get notified after each automated action. Quarterly report for the family council or board — generated in one click. |

**Визуал под stepper:** Тонкая линия соединяет шаги. Под шагом 2 — маленькая подпись "Protected by Emergency Stop" со ссылкой на S4.

---

### S4 — Features

**Цель:** Раскрыть ключевые возможности для технически квалифицированного читателя (Treasury Manager читает именно сюда).

**Заголовок:** Built for institutional requirements.

**Формат:** 2×3 сетка карточек (6 features). Каждая карточка: иконка + название + 2 строки описания. Icon slot: 60×60px.

| Feature | Название | Описание |
|---------|----------|----------|
| F21 | AI Auto-Rebalancing | Rule-based automation maintains your target allocation across Ethereum and Arbitrum — no transaction approval required. |
| F17 | Legal & Custodian Coverage | Explicit liability framework: MEGINN's role, custodian's role, and your role — documented and signed before any automation runs. |
| F01 | Smart Accounts & RBAC | Role-based permissions: CIO, Operator, Auditor. Institutional-grade access control with hardware key support. |
| F15 | Immutable Audit Log | Every automated action is logged: timestamp, rule triggered, transaction hash, gas cost. Tamper-proof history for compliance teams. |
| F22 | Emergency Stop | One-click kill switch halts all automated processes instantly — available from every screen, 24/7. |
| F20 | Cross-Chain Bridge | Unified bridging between Ethereum and Arbitrum via Li.Fi/Socket. Auto-rebalancing works across both networks seamlessly. |

**Акцент:** F17 (Legal Coverage) выделен визуально — большая карточка или highlight border. Это ключевой дифференциатор и главный страх закрывается именно здесь.

---

### S5 — Trust & Security

**Цель:** Закрыть страхи "hack", "compliance", "кто они такие" для обеих персон.

**Заголовок:** Security and compliance at the foundation.

**Формат:** 2 колонки. Левая — Security, правая — Compliance. Icon slot: 40×40px (без изменений).

**Security (левая):**
- Smart Accounts with role-based access
- Emergency Stop on every screen
- Slippage Guard on all automated trades
- Self-custody: your keys, your assets — always withdrawable even if UI is unavailable

**Compliance (правая):**
- SOC2-ready architecture
- Immutable audit trail for every action
- Legal/Custodian Liability Framework (signed on-platform)
- Designed for board-level reporting

**Ниже:** Баннер с фактом из market research:
> "Institutional DeFi engagement projected to grow from 24% to 75% by 2027. MEGINN is infrastructure for what comes next."
> — Source: [Research Report, 2026]

**Логика:** Treasury Manager читает compliance-список и думает "это можно показать аудиторам". CIO читает self-custody и думает "даже если стартап закроется, мои деньги в безопасности".

---

### S6 — Who It's For

**Цель:** Последнее квалификационное сито — человек должен узнать себя и почувствовать "это сделано для меня".

**Заголовок:** Made for the people who manage serious capital.

**Формат:** 2 карточки рядом.

**Карточка 1: Family Office CIO**
- AUM: $100M–$2B total, $10M–$100M in digital assets
- Use case: Set and forget allocation. Quarterly report for family council.
- Time commitment: < 10 minutes per month
- "MEGINN handles the execution. I handle the strategy."

**Карточка 2: Corporate Treasury Manager**
- AUM: $20M–$100M in digital assets
- Use case: Board-approved limits enforced automatically. Full compliance trail.
- Time commitment: Dashboard review 2–3× per week
- "Every automated transaction is logged and auditable. Exactly what the board requires."

**Под карточками:** "Not a fit: retail investors, trading desks, yield farmers. MEGINN is built for governance-heavy institutional environments with $10M+ in digital assets."

**Логика:** Явный anti-positioning — отсекаем неподходящих лидов сразу, экономим время sales.

---

### S7 — CTA / Early Access

**Цель:** Сконвертировать квалифицированного читателя в лид (форма) или встречу (Calendly).

**Заголовок:** Join institutional-grade portfolio automation.

**Подзаголовок:** MEGINN is currently in closed early access. We onboard a limited number of family offices and corporate treasuries per quarter.

**Форма (минимальная):**
- Full name
- Work email (корпоративный, не gmail — валидация)
- Organization
- AUM in digital assets (dropdown: $1M–10M / $10M–50M / $50M–200M / $200M+)
- [Submit] "Request Early Access"

**Альтернативный путь:** "Prefer to talk first? [Schedule a 30-min call →]" (Calendly link)

**После отправки:** Inline confirmation "We'll be in touch within 2 business days." + email с подтверждением.

**Privacy note:** "Your information is used solely to evaluate fit. We don't share it with third parties."

**Логика квалификации через форму:**
- Корпоративный email = серьёзный намерение
- AUM dropdown = быстрая квалификация без вопросов
- Ограниченное количество ("limited number") = scarcity без агрессии

---

### Footer

**Колонки:**

| Колонка 1 | Колонка 2 | Колонка 3 |
|-----------|-----------|-----------|
| **MEGINN** логотип + tagline: "Institutional portfolio automation." | **Platform** — Features / How It Works / Security | **Legal** — Privacy Policy / Terms of Service / Cookie Policy |
| | **Company** — Contact / LinkedIn | |

**Нижняя строка:** © 2026 MEGINN. All rights reserved. · "Smart Accounts secured by account abstraction. MEGINN does not hold custody of user assets."

---

## 6. Навигация (Header)

**Компоненты:**
- Логотип (левый край)
- Nav: Features · Security · Who It's For
- CTA кнопка: "Request Access" (primary, правый край)

**Behaviour:**
- Sticky при скролле
- На мобайле: hamburger меню
- CTA кнопка дублируется в мобильном меню

---

## 7. Логика CTA на странице

Три точки входа в конверсию:

| Место | Текст CTA | Действие |
|-------|-----------|----------|
| Hero | "Request Early Access" | Якорь к S7 |
| S3 (How It Works) — под stepper | "See the platform in action →" | Открывает Calendly |
| S7 | "Request Early Access" | Submit form |

Одна точка — вторичный призыв:

| Место | Текст | Действие |
|-------|-------|----------|
| S4 (Features) | "Book a demo to see every feature →" | Calendly |

---

## 8. SEO и метаданные

| Поле | Значение |
|------|----------|
| **Title** | MEGINN — Institutional Digital Asset Portfolio Automation |
| **Meta description** | AI-native platform for Family Offices and Corporate Treasuries. Autonomous portfolio rebalancing with full legal coverage. Built for $10M+ AUM. |
| **OG title** | MEGINN: Set your rules. We manage the rest. |
| **OG description** | Institutional portfolio automation for Family Offices and Corporate Treasuries. Ethereum & Arbitrum. Legal/Custodian Framework included. |
| **OG image** | Dark-background dashboard preview, 1200×630 |
| **Canonical** | https://meginn.finance/ (placeholder) |

**Target keywords (информационный, не транзакционный трафик):**
- "institutional DeFi platform"
- "family office crypto management"
- "corporate treasury digital assets"
- "autonomous portfolio rebalancing"

---

## 9. Аналитика и события

Все события передаются в аналитику (Mixpanel / Segment / GA4 — на усмотрение команды).

| Событие | Триггер |
|---------|---------|
| `landing_viewed` | Загрузка страницы |
| `hero_cta_clicked` | Клик "Request Early Access" в Hero |
| `how_it_works_viewed` | S3 вошла в viewport (IntersectionObserver, 80%) |
| `features_section_viewed` | S4 вошла в viewport |
| `demo_link_clicked` | Клик на любую Calendly-ссылку |
| `form_started` | Фокус на первом поле формы |
| `form_submitted` | Успешный submit формы |
| `aum_selected` | Выбор значения в AUM dropdown |

**Критичный funnel:**
```
landing_viewed → hero_cta_clicked → form_started → form_submitted
```

---

## 10. Адаптивность

| Breakpoint | Изменения |
|-----------|----------|
| Desktop (≥1280px) | Базовая раскладка |
| Tablet (768–1279px) | 2-колоночные сетки → 1 колонка, stepper вертикальный |
| Mobile (< 768px) | Все секции стекируются вертикально, Hero визуал скрыт, форма занимает полную ширину |

---

## 11. Технические требования

- **Framework:** TBD (Next.js рекомендован — SSG для SEO)
- **Анимации:** Subtle scroll-triggered fade-in для карточек (не интерактивный дашборд в Hero — статичный screenshot или Lottie)
- **Шрифты / токены:** Соответствие `ds/foundation.md` — использовать DS-токены
- **Форма:** Backend — Typeform / Tally / собственный endpoint с Webhook в Notion/Airtable
- **Calendly:** Embedded popup, не redirect
- **Время загрузки:** LCP < 2.5s, hero-изображение — WebP, lazy load для ниже fold
- **GDPR:** Cookie consent banner, privacy policy в футере

---

## 12. Что лэндинг НЕ делает

Явные ограничения scope:

- ❌ Не содержит pricing (продукт в early access, цена обсуждается индивидуально)
- ❌ Не содержит live demo или sandbox (нет продукта для показа без онбординга)
- ❌ Не содержит блог / ресурсы (нет контента на запуске)
- ❌ Не содержит Whitepaper / tokenomics (не token project)
- ❌ Не содержит отдельных страниц под каждую персону (трафик пока не масштабный, один лэндинг)

---

## 13. Открытые вопросы

| # | Вопрос | Критичность | Кто отвечает |
|---|--------|------------|--------------|
| 1 | Домен — meginn.finance или другой? | Высокая | Founder |
| 2 | Есть ли уже реальные клиенты для case study / логотипов? | Средняя | BD |
| 3 | Calendly подключён или нужен другой инструмент для встреч? | Средняя | Ops |
| 4 | Какой CRM получает лиды из формы? | Средняя | Ops |
| 5 | Есть ли брендовый визуал / иллюстрации для Hero? | Средняя | Design |
| 6 | Нужна ли локализация (RU/EN) или только EN? | Низкая | Product |

---

## 14. Зависимости

- `ds/CONTRACT.md` — дизайн-система обязательна
- `ds/foundation.md` — токены (цвета, типографика, отступы)
- `ds/components.md` — Button, Card, Input, Form компоненты
- Figma: https://www.figma.com/design/PcpLlKJqePv7h5acIUEgfd/Obsidian-MCP — источник truth для UI

---

*Автор: Product / IA*  
*Версия: 1.0*  
*Следующий шаг: Дизайн макета в Figma на основе этого ТЗ*
