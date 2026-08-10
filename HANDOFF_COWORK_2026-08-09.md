# Хэндовер из сессии Cowork → Claude Code (2026-08-09)

Этот файл — саммари сессии в Cowork mode, чтобы продолжить работу в Claude Code без повторного пересказа контекста. Прочитай целиком перед началом работы.

---

## Контекст задачи

Проект Obsidian состоит из двух частей:
1. **`app/`** — веб-приложение (React + Vite + Storybook), дизайн-система уже поставлена (`ds/CONTRACT.md`, токены в `app/src/tokens/*.css`, компоненты в `app/src/components/*`, экраны в `app/src/screens/*`). Задеплоено на **Vercel**, репозиторий на GitHub: `PROD300/OBSIDIAN.git` (remote `origin`, ветка `main`).
2. **`landing/`** — маркетинговый сайт (сырой HTML/CSS/JS-набросок).

> **Обновление 2026-08-10:** ограничение «landing только в Figma, не в коде» **снято Daria**. Лендинг теперь дорабатывается полностью, включая код (`landing/*.html`, `landing.css`, `landing.js`). Он закоммичен и запушен в `PROD300/OBSIDIAN-monorepo` (main), но **пока не задеплоен на Vercel** — деплой в процессе (новый Vercel-проект на тот же репозиторий, Root Directory: `landing`). Точка входа переименована в `index.html` (был `Landing Page.html` — Vercel ищет `index.html` в корне статического сайта; старый файл удалён — подтверждено Daria, см. `HANDOFF_COWORK_2026-08-10.md`).

Цель: поднять визуал `app/` до уровня Awwwards-level (институциональный Web3/финтех), используя существующую ДС и фирменный стиль, плюс доработать `landing/` в Figma.

---

## Что уже сделано в этой сессии

1. Проведён ресерч трендов UI/UX в Web3 и институциональном финтехе 2026 — сохранён в `research/web3-ui-trends-2026.md` (24 референса, 13 площадок: Awwwards, Behance, Dribbble, Siteinspire, Land-book, Lapa Ninja, Landingfolio, Mobbin, UI8, 99designs, Godly, + прямые бенчмарки конкурентов Fireblocks/BitGo/Anchorage/Coinbase/Ledger).
2. Углублённый разбор топ-8 референсов с проверенными фактами (реальные hex-палитры с Awwwards, метрики кейса Zerion, структура сайта Fireblocks) — сохранён в `research/web3-ui-top8-references.md`.
3. Прочитан и учтён `ds/CONTRACT.md` — жёсткое правило: только компоненты из кита, цвета только через Semantic Variables/токены, типографика через TextStyles, радиусы/отступы через токены, никаких прибитых hex/px.
4. Изучена структура `app/src`: компоненты (Button, Card, Input, Badge, Modal, Select, Tabs, Toast, Table, StatCard, ActivityRow, AppSidebar, AppTopBar, IconButton, RoleRow, LiabilityCard, Toggle, ToastContainer) и экраны (Portfolio, Login, LiabilityDashboard, SmartAccountSetup, LegalTerms, RebalancingRules, AuditLog, Settings, Notifications, TransactionError, RuleCreate, EmergencyStop, NotFound, CrossChainBridge, NetworkError, Onboarding, RuleDetail).

## Итоговое резюме трендов (кратко, детали — в research/)

- Тёмная тема по умолчанию, графитовая/тёмно-синяя база + один акцентный цвет (пример: Sui — #298DFF+#000, Fireblocks — #212647).
- Уход от 8px-скруглений: либо острые 0–4px углы (институциональный/техно-строгий вид), либо капсульные pill-элементы для кнопок/бейджей — среднего почти нет.
- Bento-грид для дашбордов, glassmorphism точечно (только модалки/тулбары), явный таймлайн статуса транзакции/мультиподписи вместо спиннера, моно-шрифт для чисел.
- Zerion (chudarin.com/cases/zerion.html) — лучший продуктовый референс по механикам доверия: Transaction Simulation, Phishing Defense, единая дизайн-система на всех платформах.
- Fireblocks — лучший референс по институциональной архитектуре сайта: trust-сигналы (логотипы enterprise-клиентов) в первом экране, кейсы с метриками, навигация по индустриям клиента.

---

## Открытые вопросы / блокеры на момент хэндовера

1. **Figma-доступ.** Daria добавила страницу **«Production-ready Asset Puck»** в Figma-файл **Obsidian MCP** (тот же файл, что в `ds/CONTRACT.md`: https://www.figma.com/design/PcpLlKJqePv7h5acIUEgfd/Obsidian-MCP). Она согласилась авторизовать Figma MCP-коннектор — в Cowork-сессии это сделать не удалось (non-interactive, OAuth не проходит). **В Claude Code — используй `/mcp` или проверь, подключён ли Figma MCP, и подтяни актуальные ассеты (иконки/иллюстрации/графику) со страницы «Production-ready Asset Puck», прежде чем работать над визуалом.**
2. **Push/деплой `app/`.** Daria сказала, что пушить и деплоить буду я (агент) — сама даст доступ, если что-то понадобится. В Cowork-сессии песочница (shell) была недоступна (`HYPERVISOR_VIRT_DISABLED`), поэтому `git push` не выполнялся. **В Claude Code проверь, есть ли уже доступ к `git push` в этом репо (см. `app/.git/config` — remote уже прописан на `PROD300/OBSIDIAN.git`); если нет — спроси Daria явно, что нужно (обычно достаточно PAT, встроенного в remote URL локально, деплой на Vercel скорее всего автоматический через GitHub-интеграцию — уточни у неё, привязан ли Vercel-проект к этому репо на автодеплой).**
3. **`landing/`** — ~~дорабатывается только в Figma, в коде не трогать~~ (снято 2026-08-10, см. обновление в начале файла). Работа над кодом лендинга разрешена и уже ведётся.

---

## Рекомендованный порядок дальнейшей работы

1. Проверить доступность Figma MCP → прочитать страницу «Production-ready Asset Puck» → выгрузить нужные ассеты (иконки/иллюстрации) в `app/src/assets`, если что-то нужно для `app/`.
2. Составить конкретный план визуального апгрейда `app/` по экранам (см. список выше), опираясь на `ds/CONTRACT.md` + `research/web3-ui-trends-2026.md` + `research/web3-ui-top8-references.md`.
3. Вносить изменения в код (`app/src`), строго через существующие токены/компоненты ДС (см. правила в `ds/CONTRACT.md`) — либо предложить новые токены/компоненты по процессу, описанному там же («Что делать, если нужного нет»).
4. Проверять через Storybook (`npm run storybook` в `app/`) и/или dev-сервер.
5. Коммитить и пушить в `main` (после уточнения доступа у Daria) — это должно триггерить автодеплой на Vercel, если подключена GitHub-интеграция.
6. Для `landing/` — работать только в Figma на странице «Production-ready Asset Puck», в код не переносить, не деплоить.
