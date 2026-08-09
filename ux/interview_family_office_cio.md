# Итоги интервью: Family Office CIO

**Дата:** 2026-04-17  
**Персона:** Family Office CIO (персона 2)  
**Метод:** Симуляция интервью

---

## 1. Подтвердившиеся предположения

| Из профиля | Подтвердилось |
|------------|---------------|
| <2 часа/месяц на крипто-управление | ✅ Подтверждено — хочет auto-rebalancing без ручного approval |
| Privacy — критически важно | ✅ Подтверждено — спрашивает про block explorer visibility |
| RWA tokenization — приоритет | ✅ Подтверждено — $15M из $40M уже в RWA, планируют $30M |
| Quarterly reports для family meeting | ✅ Подтверждено — точный формат описан |
| Multi-chain использует | ✅ Подтверждено — ETH, Arbitrum, Solana, Polygon |

---

## 2. Новые инсайты

| Инсайт | Детали |
|--------|--------|
| **Юридическое покрытие — must have** | Не просто "нужна юридическая поддержка", а "кто несёт риск?" — спрашивает о custodian liability |
| **Auto-rebalancing vs Suggestion** | "Suggestion" — недостаточно. Нужен auto-rebalancing с override. Лимиты: "если >35% — автоматически продай до 30%" |
| **Bridge — критический** | Не спросил про bridge — сам поднял. 6 сетей без bridge — бесполезно |
| **Audit требования уже сейчас** | Не "когда-нибудь", а уже есть аудитор, который требует transaction log |
| **Tax report — годовой mandatory** | Налоговая требует holdings на 31 декабря — это обязательный репорт |

---

## 3. Edge Cases

| Edge Case | Описание |
|-----------|----------|
| **Custodian liability** | Кто несёт ответственность за средства? Не дадут деньги без ответа |
| **Regulatory risk** | Токенизация — "страшно". Спрашивает про юридическое оформление в их юрисдикции |
| **Override для emergency** | Auto-rebalancing хорошо, но нужна кнопка "стоп" |
| **Post-factum notification** | Не нужно approve — нужно знать post-factum |
| **Stress test report** | Хочет видеть "что если ETH -50%" — не было в нашем брифе |

---

## 4. Противоречия

| Противоречие | Комментарий |
|--------------|-------------|
| Бюджет "не проблема" vs "нужно доказать value" | Готов платить premium, но family council должен approve — нужно demo |
| Basic technical skills vs хочет advanced features | Говорит "базовые", но спрашивает про bridges, ZK-rollups — значит понимает |
| "Minimal management time" vs volume $30-50M/year | Высокий volume, но хочет <2 часа/месяц — только auto-rebalancing |

---

## 5. Рекомендации для дизайна

| Рекомендация | Приоритет | Детали |
|--------------|-----------|--------|
| **Auto-rebalancing с лимитами** | 🔴 Critical | Не "suggestion", а правила: "если X > Y% → автоматически Z" |
| **Юридическое покрытие / Custodian** | 🔴 Critical | Ответ на "кто несёт риск?" — без этого не продать |
| **Bridge между сетями** | 🔴 Critical | 6 сетей — хорошо. Bridge — must have |
| **Report templates** | 🟠 High | Portfolio Summary, Performance Attribution, Transaction Log, Compliance Report, Tax Report (CSV/PDF/Excel) |
| **Privacy implementation** | 🟠 High | Ответить на вопрос "как это работает технически?" — block explorer visibility |
| **Override / Emergency stop** | 🟡 Medium | Кнопка "стоп" для auto-rebalancing |
| **Post-factum notifications** | 🟡 Medium | Уведомления без approval — "сделано: было X, стало Y" |
| **Stress test report** | 🟡 Medium | "Что если ETH -50%?" — future feature |
| **Avalanche network** | 🟢 Low | Добавить в roadmap |

---

## 6. Action Items

1. ✅ Добавить в бриф: **Auto-rebalancing rules** (не просто suggestions)
2. ✅ Добавить в бриф: **Legal/Custodian coverage** — кто несёт ответственность
3. ✅ Добавить в бриф: **Cross-chain Bridge** — критическая фича
4. ✅ Расширить F19 (Reporting): добавить все 6 шаблонов
5. ✅ Добавить Edge Case: **Override button** в описание фичи

---

## 7. Volume Target

| Метрика | Значение |
|---------|----------|
| AUM (крипто) | $40M |
| В RWA | $15M → $30M (план) |
| Monthly volume | $2-5M |
| Yearly volume | $30-50M |