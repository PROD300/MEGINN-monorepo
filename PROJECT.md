# OBSIDIAN — Project Environment

## GitHub Repository

- **URL:** https://github.com/PROD300/OBSIDIAN
- **Branch:** main
- **Content:** Full prototype — design system + 17 wired screens (navigation, mock data layer, forms, states & edge cases)

## Handoff

First push: 2026-06-17  
Pushed: React base (`app/`) — 80 files, node_modules excluded.

## Deploy

- **Путь:** готовый сервис — Vercel
- **Живая ссылка:** https://obsidian-peach-sigma.vercel.app/
- **SPA-маршрутизация:** настроена через `app/vercel.json` (rewrite всех путей на `/index.html`), внутренние экраны открываются по прямой ссылке без 404
- **Примечание:** у проекта есть второй авто-домен `obsidian-obsidian-team.vercel.app` — он всё ещё за стеной Vercel Authentication, не используйте его как публичную ссылку
- Авто-пересборка на каждый пуш в `main` (~2–3 мин)
- Последний пуш: 2026-06-21 (коммит `a70c53f`) — Portfolio оживлён (allocation store, Rebalance Now, Add Asset, Download Report); подтверждено на проде
- Пуш 2026-06-21 (коммит `195b637`) — оживлены Cross-Chain Bridge, Notifications, Emergency Stop, Audit Log export, Settings вкладки, Network Error, Transaction Error (live mock data, без статики)

## Дашборд юзер-тестов

- **Путь:** прототип на Vercel (https) → сбор на VPS (77.73.233.11) → мост ngrok (постоянный домен)
- **Сбор событий:** `https://passenger-making-cupped.ngrok-free.dev` (health ✓), процесс `dashboard-collector` (systemd, порт 8787, автостарт), хранилище `/opt/dashboard/server/data/events.jsonl` на VPS
- **Туннель:** `ngrok-dashboard` (systemd, автостарт), `ngrok http 8787 --url=https://passenger-making-cupped.ngrok-free.dev`
- **Трекер:** встроен в прототип (`app/public/track.js`, подключён в `app/index.html`), ключевые элементы размечены `data-track`
- **Дашборд:** http://77.73.233.11:8080/ (статика, процесс `dashboard-app`, systemd, автостарт), конфиг уже прописан (`dashboard/app/config.js`)
- **Сценарии (3):** Bridge Funds Cross-chain (`bridge-funds`), Create Rebalancing Rule (`rule-create`), Review & Sign Legal Agreement (`sign-agreement`) — построены по реально достижимым в навигации путям (сверено по коду, не по макету)
- **Гипотезы:** не подтянуты — в проекте не найдено раздела гипотез/допущений (PRD, brief, заметки)
- Мои тестовые прогоны при проверке подключения помечены «внутренними» (`/internal`) и не попадут в метрики реального раунда
- Все три ссылки U-теста (`prototypeUrl?ut_task=<id>`) проверены живым проходом — события доходят до дашборда корректно
- Доступы (пароль VPS, ngrok authtoken) переданы транзиентно, нигде не записаны
