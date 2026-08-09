# component_variants — IconButton
# 3 ячейки (промоут одиночного Component в ComponentSet)

## Текущая матрица
Одиночный Component (нет вариантов)

## Новая матрица
- State: default | hover | disabled
- Итого: 3 ячейки

## Имена вариантов
State=default   ← из существующего
State=hover
State=disabled

## Что меняется по состояниям

| State    | fill                        | border         | opacity |
|----------|-----------------------------|----------------|---------|
| default  | surface-action-ghost-hover  | border-default | 1.0 |
| hover    | surface-level-2             | border-default | 1.0 |
| disabled | surface-action-ghost-hover  | border-default | 0.4 |

Иконка (⊕) — без изменений, text-accent во всех состояниях.

## Привязки к Variables
- fill → surface-action-ghost-hover / surface-level-2
- stroke → border-default
- radius → radius-md
- size → 36×36px (фиксирован)
