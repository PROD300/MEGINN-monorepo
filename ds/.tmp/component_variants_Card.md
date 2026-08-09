# component_variants — Card
# 2 ячейки (промоут одиночного Component в ComponentSet)

## Текущая матрица
Одиночный Component (нет вариантов)

## Новая матрица
- State: default | hover
- Итого: 2 ячейки

## Имена вариантов
State=default   ← из существующего Component
State=hover

## Что меняется по состояниям

| State   | fill             | border          | shadow   |
|---------|------------------|-----------------|----------|
| default | surface-elevated | border-default  | shadow-sm |
| hover   | surface-elevated | border-strong   | shadow-md |

Контент (title, description, action link) — без изменений.

## Привязки к Variables
- fill → surface-elevated
- stroke → border-default / border-strong
- shadows: shadow-sm → shadow-md (hardcoded effect, переключается в варианте)
- radius → radius-lg
