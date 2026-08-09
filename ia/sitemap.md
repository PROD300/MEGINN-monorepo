# Sitemap — OBSIDIAN v1.0 MVP

> Зеркало этой структуры добавлено в Figma (файл Obsidian-MCP, страница «Sitemap», node `0:1`), 2026-08-09 — визуальная IA-диаграмма с теми же ветками и тегами `[core]`/`[core] F20`/`[v2]`.

```
Landing_page [core] — публичная маркетинговая страница (pre-auth)
  Navbar — OBSIDIAN logo + Features | Security | Who It's For | Request Access
  S1 Hero — "Your portfolio runs itself. You just review." + dashboard mockup
  S2 Problem — 3 карточки: ручное управление / личная ответственность / фрагментация инструментов
  S3 How It Works — 3-tab demo: Set rules → OBSIDIAN runs → You review
  S4 Features — 6 карточек: F21, F01, F17, F15, F22, F20
  S5 Trust — Security & Compliance (2 колонки) + quote banner
  S6 Who — 2 persona-карточки: Family Office CIO / Corporate Treasury Manager
  S7 Access — форма Early Access (Q3 2026): Full name, Work email, Organization, AUM range
  Footer — Platform (Features, How It Works, Security) / Company (Contact, LinkedIn) / Legal (Privacy, ToS, Cookie)

Portfolio [core] — главный дашборд: активы, AUM, состояние по сетям
  Auth
    Login [core] — авторизация: wallet connect или email + password
    Onboarding [core] — пошаговая настройка Smart Account после первого входа
  Rebalancing
    RebalancingRules [core] — список правил с их статусом (активно / пауза / ошибка)
    RuleCreate [core] — создание нового правила: порог, сеть, условие, аллокация
    RuleDetail [core] — просмотр и редактирование правила + история его срабатываний
    CrossChainBridge [core] — статус и история кросс-чейн бриджей (F20): провайдер, время, комиссия
  Compliance
    LiabilityDashboard [core] — дашборд ответственности: кто за что отвечает, индикаторы риска
    LegalTerms [core] — юридические условия и подписание соглашения об ответственности
    AuditLog [core] — хронологическая история всех автоматических действий
    AuditLogDetail [v2] — детали события: хеш, правило-триггер, параметры
  Account
    SmartAccountSetup [core] — роли, разрешения, подключённые кошельки
    Settings [core] — профиль, подключённые кошельки, настройки уведомлений
    Notifications [core] — центр post-factum уведомлений (US01 AC3)
  System
    EmergencyStop [core] — аварийная остановка всех процессов (+ persistent в шапке)
    NetworkError [core] — ошибка сети / RPC с инструкцией
    TransactionError [core] — ошибка транзакции (slippage guard, газ)
    NotFound [core] — 404
```

**Легенда:**
- `[core]` — обязательно в MVP (v1.0)
- `[v2]` — следующий релиз
- `[later]` — в бэклоге

> **Обоснование приоритетов:**
> - `CrossChainBridge [core]`: обязателен в MVP как часть F20 — используется при каждом кросс-чейн правиле ребалансировки; CIO должен видеть статус и историю бриджей.
> - `AuditLogDetail [v2]`: список в `AuditLog` достаточен для MVP; детали события — усиление, не блокер.
> - Все служебные экраны (`NetworkError`, `TransactionError`, `NotFound`) — `[core]`: без них платформа не готова к продакшну с реальными деньгами.
> - `Notifications [core]`: явно требуется в US01 AC3 ("Post-factum notification").
>
> **Примечания:**
> - `EmptyRules` и `EmptyAudit` — состояния экранов `RebalancingRules` и `AuditLog`, не отдельные ноды.
> - `EmergencyStop` доступен глобально (persistent кнопка в шапке).
> - Глубина дерева: максимум 2 уровня от корня. MECE: каждый экран ровно в одном разделе.
