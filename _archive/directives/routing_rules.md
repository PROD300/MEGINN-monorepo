# ROUTING RULES

Основной агент выполняет роль оркестратора и принимает решение о маршрутизации задачи между субагентами в зависимости от типа входящего запроса, стадии зрелости брифа и наличия подтверждённого контекста.

---

## 1. Маршрутизация в Product Brief Architect
Вызывай `@product-brief-architect`, если запрос относится хотя бы к одному из условий:

### Discovery и инициация
- новая продуктовая инициатива;
- формирование MVP;
- roadmap item;
- feature brief;
- release scope;
- OKR / KPI alignment;
- stakeholder alignment;
- business case;
- recursive briefing;
- risk discovery.

### Признаки во входящем запросе
- есть слова: «инициатива», «бриф», «MVP», «релиз», «метрики», «roadmap»
- нет подтверждённой экранной структуры
- неизвестны роли или границы задачи
- отсутствуют бизнес-метрики
- есть неопределённость по интеграциям или безопасности

### Output
Вернуть:
- PRD-ready brief section
- scope definition
- open questions
- risk register
- KPI / OKR block
- traceability links

---

## 2. Маршрутизация в UX Capital Flow Architect
Вызывай `@ux-capital-flow-architect`, если выполнены все условия:

### Preconditions
- бизнес-контекст подтверждён
- роли пользователей определены
- MVP-граница зафиксирована
- критические операции известны
- RBAC-модель хотя бы на уровне гипотез

### Типы задач
- dashboard logic;
- карта экранов;
- таблицы активов;
- потоки подтверждения переводов;
- сценарии ошибок;
- audit trail UX;
- role-based dashboards;
- reporting screens;
- risk warnings;
- portfolio hierarchy.

### Признаки во входящем запросе
- есть слова: «экран», «таблица», «dashboard», «flow», «подтверждение», «ошибка»
- задача требует visual hierarchy
- есть high-risk action
- нужно снизить вероятность пользовательской ошибки

### Output
Вернуть:
- flow map
- screen hierarchy
- table logic
- confirmation patterns
- error states
- role visibility matrix
- UX risk mitigation recommendations

---

## 3. Последовательная маршрутизация
Если задача затрагивает и продуктовую, и UX-часть:

### Шаг 1
Сначала всегда:
`@product-brief-architect`

### Шаг 2
После подтверждения:
`@ux-capital-flow-architect`

### Правило
UX-агент не вызывается до тех пор, пока:
- не зафиксирован MVP
- не определены роли
- не известны critical actions
- не описаны ограничения безопасности

---

## 4. Recursive Routing
Если в процессе работы субагент выявил:
- новую роль
- новую сущность
- новый integration dependency
- compliance risk
- новую high-risk operation

основной агент обязан:
1. вернуть задачу в `@product-brief-architect`
2. обновить master brief
3. повторно вызвать UX-агента только для затронутого scope

---

## 5. Escalation Rules
Основной агент НЕ вызывает UX-агента напрямую, если:
- KPI не определены
- scope конфликтует
- есть ≥1 unresolved conflict
- отсутствует owner решения
- compliance section пустой
- integration SLA неизвестен

В этом случае:
→ эскалация обратно в Product Brief Architect.

---

## 6. Consolidation
После работы любого субагента основной агент обязан:

1. встроить output в `brief.md`
2. проставить maturity tags
3. обновить traceability matrix
4. синхронизировать open questions
5. проверить definition of done
6. определить следующий routing step