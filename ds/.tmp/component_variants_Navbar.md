# component_variants — Navbar
# 2 ячейки (промоут одиночного Component в ComponentSet)

## Текущая матрица
Одиночный Component (нет вариантов)

## Новая матрица
- State: default | active
- Итого: 2 ячейки

## Имена вариантов
State=default  ← из существующего (все NavItem → text-muted)
State=active   ← первый NavItem (Portfolio) → text-accent + border-focus bottom 2px

## Что меняется по состояниям

| State   | Logo | NavItem-1 (Portfolio)                    | NavItems 2-4   |
|---------|------|------------------------------------------|----------------|
| default | text-accent | text-muted, DS/Body/sm          | text-muted     |
| active  | text-accent | text-accent, DS/Body/sm Medium, bottom-border border-focus 2px | text-muted |

## Привязки к Variables
- Navbar fill → surface-level-2 (без изменений)
- Active NavItem text → text-accent
- Active NavItem border-bottom → border-focus
- Active NavItem stroke: strokeBottomWeight=2, остальные=0
- Прочие NavItem → text-muted
