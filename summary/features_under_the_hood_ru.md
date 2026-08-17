# MEGINN — фичи под капотом: что реализовано, что заявлено в PRD

Обзорный документ: сводка по ключевым дифференцирующим фичам продукта — что реально смоделировано в коде приложения (`app/src/data/*`, `app/src/screens/*`), а что пока существует только как замысел в PRD/брифах. Собрано по факту чтения кодовой базы на 2026-08-14.

**Общая оговорка**: код приложения — это frontend-мок логической схемы данных (в коде явно помечено `[LOGICAL SCHEMA — NOT WIRED TO A BACKEND]`), а не продакшен-интеграция с бэкендом или блокчейном. "Реализовано" ниже означает "смоделировано в UI и данных с полной бизнес-логикой", не "работает on-chain".

---

## 1. Smart Accounts — реализовано

- Account abstraction, self-custody: MEGINN не имеет кастодии над активами пользователя.
- Три роли: **CIO (full access)**, **Operator (execute only)**, **Auditor/Emergency contact (view only)** — каждая со своим адресом.
- **Multisig-порог**: операции выше настраиваемой суммы (по умолчанию $10 000) требуют второй подписи.
- **Hardware key confirmation** — обязательное подтверждение критичных действий аппаратным кошельком (Ledger как backup-кошелёк).
- Файлы: `app/src/data/roles.ts`, `app/src/data/security.ts`, `app/src/screens/smart-account-setup/SmartAccountSetup.tsx`.

## 2. Legal Liability — реализовано (самый проработанный флоу в продукте)

- **Custodial Liability Agreement** (5 разделов: автономная ребалансировка, bridge-операции, Emergency Stop, audit logging, обязательства пользователя) — e-signature с привязкой к имени, роли, дате. Пока не подписано — автоторговля выключена.
- Ответственность распределена по трём сторонам явно, каждая со своим статусом:
  1. Autonomous Rebalancing → **Smart Account Protocol** (Covered)
  2. Bridge Operations → **bridge-провайдер** (напр. Li.Fi) (Covered)
  3. Rule configuration, oversight, emergency stop → **Account Owner** (Active)
- Экспорт в **Liability & Compliance Report** (CSV): статус платформы, % юридического покрытия, портфельный риск.
- Файлы: `app/src/screens/legal-terms/LegalTerms.tsx`, `app/src/screens/liability-dashboard/LiabilityDashboard.tsx`, `app/src/data/agreement.ts`.

## 3. Audit Log — реализовано

- Фильтруемый лог событий (Rebalance, Bridge, Rule Paused, System) со статусами success/warning/error.
- Экспорт в CSV и печатный HTML→PDF.
- Файлы: `app/src/data/auditLog.ts`, `app/src/screens/audit-log/AuditLog.tsx`.
- Оговорка в коде: имитирует audit trail, который в проде обычно приходит из бэкенда/chain-индексатора — не tamper-proof по факту, хотя в PRD заявлено "Immutable audit logs".

## 4. Cross-chain Bridge — реализовано

- Маршрутизация через агрегаторов: **Li.Fi** (primary), **Socket** и **Across** (fallback) — с метриками среднего времени на провайдера.
- Slippage guard распространяется и на bridge-комиссию, не только на своп.
- Статусы операций (pending/success/failed) отслеживаются; кто отвечает за сбой стороннего моста — прописано в Legal Terms (не MEGINN).
- **Emergency Stop** мгновенно отменяет все pending bridge-операции.
- Поддерживаемые сети в MVP: Ethereum, Arbitrum (Solana/Base — в roadmap).
- Файлы: `app/src/data/bridge.ts`, `app/src/screens/cross-chain-bridge/CrossChainBridge.tsx`.

## 5. Rebalancing Rules (rule-based automation) — реализовано; "AI" — только бренд-название

- Детерминированный **rule engine**: правила вида "если ETH > 35% от портфеля → продать до 30%".
- Ограничители безопасности: max slippage, max gas price, минимальный газовый резерв (ниже — активировать правило нельзя).
- Выполняется **без ручного approve на каждую операцию** — осознанное продуктовое решение (`prd/prd.md`, KR2: "Zero manual 'Approve' steps for automated rebalancing once rules are set").
- **Важно**: никакого ML/AI-движка в коде нет. PRD прямо фиксирует: *"AI Prediction/Deep Analysis: Replaced by simple rule-based automation."* "AI" в названии продукта и лендинге — маркетинговый термин поверх threshold-based правил.
- Файлы: `app/src/data/rules.ts`, `app/src/screens/rule-create/RuleCreate.tsx`, `app/src/screens/rule-detail/RuleDetail.tsx`.

## 6. Multilevel Approval — только в PRD/брифах, в коде не реализовано

- Задокументированный замысел (`prd/features_list.md` F11, `briefs/meginn/personas.md`): 2-3-уровневая цепочка одобрения (например, CFO → CEO → Treasury) с автоматическим роутингом по сумме/типу операции.
- В актуальном MVP-коде **отсутствует полностью** — ни экрана, ни компонента, ни данных с approval-workflow нет.
- Единственная реально закодированная форма approval — multisig-порог (вторая подпись выше суммы, см. п.1). Это осознанный отказ от многоуровневого одобрения в пользу принципа "zero manual approval" для скорости ребалансировки.
- Роль-модель (CIO/Operator/Auditor) и multisig-порог уже создают архитектурную основу, на которую многоуровневое согласование можно нарастить в будущем — но это план, не факт.

## 7. SOC2 / Compliance, KYC/AML — только claims, в коде не реализовано

- Лендинг заявляет: *"SOC 2 — ready architecture. Controls and logging built for Type II evidence collection."* — это позиционирование "готова архитектура под SOC2 evidence", не сертификация и не готовый контроль.
- Реально есть: audit log + liability dashboard (см. п.2-3) — это и есть та "architecture", на которую опирается claim.
- **KYC/AML-движок и whitelist** (`prd/features_list.md` F14) — упомянуты только как пункт бэклога, ни одного экрана/данных в коде нет.

---

## Сводная таблица

| Фича | Статус |
|---|---|
| Smart Accounts (roles, multisig, hardware key) | ✅ Реализовано |
| Legal Liability (agreement + dashboard + CSV) | ✅ Реализовано |
| Audit Log (фильтры + экспорт) | ✅ Реализовано |
| Cross-chain Bridge (Li.Fi/Socket/Across routing) | ✅ Реализовано |
| Rebalancing Rules (детерминированный rule engine) | ✅ Реализовано |
| "AI" в ребалансировке | ⚠️ Бренд-термин, реально rule-based, ML/AI-движка нет |
| Multilevel Approval (CFO→CEO→Treasury) | 📋 Только в PRD/брифах, в коде нет |
| SOC2 сертификация/контроль | 📋 Только claim на лендинге ("ready architecture") |
| KYC/AML движок | 📋 Только пункт бэклога |
