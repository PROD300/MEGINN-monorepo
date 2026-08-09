# Screen: CrossChainBridge

**Роут:** `/cross-chain-bridge`
**Файл:** `src/screens/cross-chain-bridge/CrossChainBridge.tsx`
**Figma:** node 144:156 — Screen/CrossChainBridge

## Компоненты из базы

| Компонент | Откуда | Использование |
|-----------|--------|---------------|
| `AppTopBar` | base | Верхняя панель |
| `AppSidebar` | base | Боковое меню, `active="rebalancing"` |
| `Badge` | base | success ("Active — Primary") / info ("Active — Fallback") ×2 |
| `Table` | base | Active Bridges и Bridge History — Asset/Allocation/Value, ×2 (одинаковые колонки/строки, как в макете) |

## Локальные части (доменные, в папке screen)

| Блок | Описание |
|------|----------|
| `BridgeProviderCard` | name + Badge (top) + avgTime + volume; уже задокументирован в `ds/components.md` как кандидат (Used in: screens/cross-chain-bridge) |
| `F20Banner` | info-баннер про зависимость F20→F21, inline |
| `Footer` | строка статистики бриджа, inline |

`BridgeProviderCard` оставлен inline (не в `/parts/`), так как используется только на этом экране.

## Статика (контент из макета)

- F20Banner: "F20 Cross-chain Bridge — required dependency of F21 AI Auto-Rebalancing...", "Providers: Li.Fi (Primary) · Socket (Fallback) · Across (Fallback)"
- Bridge Providers: Li.Fi (success, 42 sec avg, $2.1M today), Socket (info, 55 sec avg, $0 today), Across (info, 38 sec avg, $0 today)
- Active Bridges / Bridge History таблицы: AAPL 35% $42,000 / MSFT 28% $33,600 — это та же placeholder-таблица, что и в макете (идентична Asset Allocation на Portfolio); перенесена как есть, не подменена другим контентом
- Footer: "Total bridged (24h): $8 100 000" / "Avg bridge time: 41 sec" / "Success rate: 100%" / "Active provider: Li.Fi"

## Не удалось сопоставить 1:1

Нет расхождений — таблицы в макете содержат те же AAPL/MSFT-строки, что и Portfolio (видимо общий placeholder-датасет в дизайне), перенесены без изменений.

## Логика/состояние

Не добавлено. "View full audit log →" — обычная `<a href="#">` без обработчика.
