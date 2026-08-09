# component_variants — Tabs (TabItem)
# Добавление State=disabled к существующим default | active

## Текущая матрица
State=default | active (2 ячейки)

## Новая матрица
- State: default | active | disabled
- Итого: 3 ячейки

## Новый вариант
State=disabled

## Что меняется

| State    | fill                       | bottom-border  | text            | opacity |
|----------|----------------------------|----------------|-----------------|---------|
| default  | —                          | —              | text-muted / DS/Body/sm        | 1.0 |
| active   | surface-action-ghost-hover | border-focus 2px | text-accent / DS/Body/sm Medium | 1.0 |
| disabled | —                          | —              | text-disabled / DS/Body/sm     | 1.0 |

## Привязки к Variables
- text disabled → text-disabled
- fill, border: унаследованы из существующих вариантов
- padding → space-3 V / space-4 H (без изменений)
