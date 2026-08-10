# Хэндовер из сессии Cowork → Claude Code (2026-08-10)

Эта сессия Cowork не имеет доступа к shell/git (`HYPERVISOR_VIRT_DISABLED` — та же проблема, что в прошлой сессии, по решению Daria не чиним, работаем в обход). Все изменения ниже сделаны через файловые правки и **ещё не закоммичены и не запушены**. Второй агент (с доступом к git/Vercel) должен: проверить diff, закоммитить, запушить, и при необходимости задеплоить.

---

## Контекст задачи

Daria сняла ограничение «`landing/` дорабатывается только в Figma» (было в `HANDOFF_COWORK_2026-08-09.md`) — теперь лендинг дорабатывается полностью в коде, наравне с `app/`. Подробности и обоснование — в обновлённом `HANDOFF_COWORK_2026-08-09.md` (см. блок «Обновление 2026-08-10» в начале файла).

**Оба — `app/` и `landing/` — чисто портфолио-прототипы для демонстрации UX/дизайна.** Не коммерческий проект, без бэкенда: без реальной аутентификации, без подключения кошелька, без ончейн-транзакций, без CRM/аналитики. Это осознанное решение Daria — весь бэкенд-подобный функционал существует только как «логическая схема» в коде (см. ниже).

---

## Что сделано в этой сессии

### 1. `landing/` — переименование точки входа
- Создан `landing/index.html` (полная копия бывшего `landing/Landing Page.html`) — статический хостинг (Vercel) ищет `index.html` в корне, старое имя с пробелом отдавало бы 404.
- Старый `landing/Landing Page.html` **удалён** (Daria подтвердила).

### 2. `landing/` — синхронизация с актуальной дизайн-системой
Токены в `landing/ds/colors_and_type.css` были на уровне ребрендинга 2026-05-05 (Inter, старый accent `#4F46E5`, раздельные success/warning/error/info). Обновлено под текущее состояние `app/src/tokens/{primitives,semantics,typography}.css`:
- Accent ramp → новая индиго-фиолетовая шкала (`accent-500: #4B34F5`, было `#4F46E5`).
- `success/warning/error/info-500` сведены к одному значению `#4B34F5` (единый акцент, статус — по иконке/тексту, ребрендинг 2026-08-10).
- Шрифт: Inter/JetBrains Mono → Geist/Geist Mono.
- `radius-md`: 8px → 4px.
- Добавлены `shadow-glow-accent`, `shadow-glow-accent-strong`, `text-info`, `border-info`.
- **Семантические токены (text-default, surface-default и т.д.) НЕ скопированы 1:1 из app** — `app/` ушёл в полностью тёмную тему по умолчанию (`surface-default → gray-950`, `text-default → gray-00`), а у лендинга своя светлая структура (светлый body + тёмные Hero/Access секции через `.section--dark`). Слепое копирование сделало бы текст белым-на-белом в светлых секциях лендинга. Если нужно, чтобы лендинг тоже ушёл в тёмную тему по умолчанию — это отдельное дизайн-решение, не входило в эту правку, нужно отдельное ТЗ от Daria.
- Обновлены 6 инлайн-SVG в `landing/index.html` (график в hero-моке) с прибитого `#4F46E5` на `var(--accent-500)`.
- Обновлены 2 прибитых hex в `landing/ds/mark.svg` (неиспользуемый пока логотип-марк) на `#4B34F5`.

**Известное ограничение:** шрифт Geist подключён через Google Fonts CDN (`@import` в `colors_and_type.css`) — по `HANDOFF_COWORK_TYPOGRAPHY_2026-08-09.md` это официально допустимо только для прототипа (урезанная версия без `font-feature-settings`, табличные цифры в hero-дашборде могут слегка «прыгать»). Для чистового варианта: скопировать `app/src/assets/fonts/Geist-Variable.woff2` и `GeistMono-Variable.woff2` в `landing/ds/fonts/` и подключить через `@font-face` (как в `app/src/tokens/typography.css`), заменить `@import`. У меня (Cowork) не было доступа к shell, чтобы скопировать бинарники — тривиально сделать через `cp` при коммите, если важно.

### 3. Бэкенд-логика помечена как «логическая схема» (не убрана, только прокомментирована)

По запросу Daria: весь код, который выглядит как реальная интеграция (форма → CRM, аналитика, кошелёк, подпись транзакций и т.д.), должен остаться в коде, но с явной пометкой, что это заглушка для демонстрации UX, не работающая интеграция. Конвенция комментария (единая для `landing/` и `app/`, grep-able):

```
[LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
```

**`landing/`** (сделано напрямую):
- `landing/landing.js` — форма Early Access (§4), analytics `track()` (§5), Calendly-заглушка (§7).
- `landing/index.html` — общий баннер-комментарий вверху `<body>`, локальный комментарий над `<form id="accessForm">`.

**`app/src`** (сделано через субагента, 28 файлов, только комментарии — поведение/JSX/CSS не менялись):
- Data-слой (`app/src/data/*.ts`, 11 файлов) — баннер в каждом: `store.ts`, `agreement.ts`, `auditLog.ts`, `bridge.ts`, `gas.ts`, `network.ts`, `notifications.ts`, `portfolio.ts`, `profile.ts`, `roles.ts`, `rules.ts`, `security.ts`.
- Экраны (17 файлов): `Login.tsx`, `Onboarding.tsx`, `SmartAccountSetup.tsx`, `LegalTerms.tsx`, `RuleCreate.tsx`, `RuleDetail.tsx`, `RebalancingRules.tsx`, `EmergencyStop.tsx`, `Portfolio.tsx`, `AuditLog.tsx`, `LiabilityDashboard.tsx`, `Settings.tsx`, `NetworkError.tsx`, `TransactionError.tsx`, `CrossChainBridge.tsx`, `components/TopNav/TopNav.tsx`.
- Не тронуты: `Notifications.tsx`, `NotFound.tsx`, `IndexPage.tsx` (ничего backend-подобного не нашли за пределами уже помеченного data-слоя), `.stories.tsx`/`.css`/`.md`.

**Проверка перед коммитом:** это чисто комментарии, но стоит быстро прогнать `npm run build` / `npm run storybook` в `app/`, чтобы убедиться, что ничего синтаксически не сломалось при массовой правке 28 файлов.

---

## Что нужно от второго агента

1. **Проверить diff** по всем файлам выше (особенно 28 файлов в `app/src` — правка была через субагента, стоит бегло свериться, что это точно только комментарии).
2. **Закоммитить и запушить** в `main` (`PROD300/OBSIDIAN-monorepo`).
3. **Деплой `landing/`** — Daria создаёт новый Vercel-проект сама (тот же репозиторий, Root Directory: `landing`, Framework Preset: Other). Некоммерческий портфолио-прототип без бэкенда — тариф Hobby подходит без оговорок (лимиты Hobby: 200 проектов, 100 ГБ/мес трафика, 100 деплоев/день — с большим запасом для статики).
4. **(Опционально)** самостоятельно закрыть ограничение шрифта: скопировать Geist-файлы в `landing/ds/fonts/`, подключить через `@font-face`, убрать Google Fonts `@import`.
5. Дальше — по стоячему правилу Daria (введено в этой сессии): **коммитить и пушить после каждой выполненной команды**, чтобы Cowork-сессия видела актуальное состояние через git.

---

## Добавление (та же сессия, позже) — Hero-интеракшн лендинга

По запросу Daria усилила интерактивность Hero-секции (`landing/index.html`, `landing.css`, `landing.js`). Все изменения — только в этих трёх файлах, чистая фронтенд-анимация, не требует сборки (см. её вопрос про "статика без билда" — CDN-теги/plain JS работают на статическом деплое без изменений). Новое:

- Хореография появления контента Hero при загрузке (`.hero__reveal` + `--d`-задержки).
- Живые тикающие цифры в дашборд-моке (AUM, delta, allocation %, value) — обобщила `runTicks()` в общую shared-функцию (раньше была локальной только для панели "How It Works"), добавила поддержку `data-prefix`/`data-suffix`/`data-thousands`.
- Рост баров аллокации от 0 при загрузке.
- Ambient cursor spotlight за курсором по тёмному фону Hero (`#heroSpotlight`).
- Magnetic-кнопки в Hero CTA (`.btn--magnetic`).
- 3D-tilt дашборд-карточки по курсору (`perspective` на `.hero__viz`, `rotateX/rotateY` на `.dash`).
- Вместо одного статичного callout "Rebalanced by AI" на фиксированной строке — 4 чередующихся AI-сценария (rebalance / threshold check / gas route / cross-chain sync), каждый подсвечивает свою строку таблицы.
- Все mouse-driven эффекты (spotlight/magnetic/tilt) отключаются на touch-устройствах (`hover: hover` media query) и при `prefers-reduced-motion: reduce`.

Задеплоенный URL для проверки: https://obsidian-monorepo-landing.vercel.app/ (Daria уже создала отдельный Vercel-проект, Root Directory `landing`) — эти правки в нём ещё не отражены, пока не запушены.

## Добавление (та же сессия, ещё позже) — точечные правки лендинга

Мелкие правки поверх Hero-интеракшна выше, тоже только в `landing/`:

- **Security & Compliance, карточка с цитатой** (`.quote` в `landing.css`) — убран акцентный левый бордер (`border-left: 3px solid var(--accent-500)`), осталась обычная равномерная обводка.
- **Тайминги анимаций, по просьбе Daria:**
  - Тикающие цифры в Hero-дашборде (AUM, delta, allocation %, value) замедлены: `runTicks()` в `landing.js` теперь читает опциональный `data-duration` с самого тик-элемента (дефолт остался 1400ms — не трогает панель "How It Works"); на всех Hero-тик-спанах в `index.html` выставлено `data-duration="2600"` (было жёстко 1400ms на все).
  - Рост баров аллокации в Hero (`.bar > i` в `landing.css`) с 900ms до 2000ms — подтянула к новому темпу цифр, иначе бары дозаполнялись раньше, чем цифры досчитывались, и было рассинхронизировано визуально.
  - Автопрокрутка шагов в "How It Works" (live-demo, 3 вкладки) — `DURATION` в `landing.js` с 8000ms на 4000ms (ускорено вдвое по прямой просьбе).

Ничего из этого не меняет структуру/разметку, только числовые константы и один CSS-бордер — низкий риск при ревью diff.

## Связанные файлы
- `HANDOFF_COWORK_2026-08-09.md` — общий хэндовер, обновлён в этой сессии (снятие ограничения на `landing/`)
- `HANDOFF_COWORK_TYPOGRAPHY_2026-08-09.md` — обоснование Geist, ограничение Google Fonts CDN
- `ds/CONTRACT.md`, `ds/foundation.md` — актуальные токены ДС
- `ia/landing/landing_tz.md` — полное ТЗ лендинга (референс для «логической схемы» форм/аналитики)
