# component_variants — Button
# Прогон 1 из 2 (Type × State, 12 ячеек); Прогон 2 — добавить Size

## Текущая матрица
Type=primary | secondary | ghost (3 ячейки, одна ось, ось ошибочно называлась "State")

## Новая матрица (Прогон 1)
- Type: primary | secondary | ghost
- State: default | hover | disabled | loading
- Итого: 3 × 4 = 12 ячеек

## Имена вариантов
Type=primary, State=default
Type=primary, State=hover
Type=primary, State=disabled
Type=primary, State=loading
Type=secondary, State=default  ← переименовать из существующего State=secondary
Type=secondary, State=hover
Type=secondary, State=disabled
Type=secondary, State=loading
Type=ghost, State=default      ← переименовать из существующего State=ghost
Type=ghost, State=hover
Type=ghost, State=disabled
Type=ghost, State=loading

## Что меняется по состояниям

| State    | primary fill                   | secondary fill              | ghost fill                  | text            | opacity |
|----------|--------------------------------|-----------------------------|-----------------------------|-----------------|---------|
| default  | surface-action-primary         | —                           | —                           | text-on-action / text-accent | 1.0 |
| hover    | surface-action-primary-hover   | surface-action-ghost-hover  | surface-action-ghost-hover  | без изменений   | 1.0 |
| disabled | surface-action-primary         | —                           | —                           | без изменений   | 0.4 |
| loading  | surface-action-primary         | —                           | —                           | hidden (плейсхолдер 12px rect) | 1.0 |

Strokes:
- secondary/default: border-default
- secondary/hover: border-strong
- secondary/disabled: border-default @ opacity 0.4
- secondary/loading: border-default

## Привязки к Variables
- fills → surface-action-primary / surface-action-primary-hover / surface-action-ghost-hover
- strokes → border-default / border-strong
- text → text-on-action / text-accent
- padding, radius → space-4 H / space-2 V / radius-md (из существующих)
- disabled: opacity = 0.4 на корневом ComponentNode

## Прогон 2 (после апрува прогона 1)
Size: sm | md | lg
- sm: padding space-3 H / space-1 V, text DS/Body/xs
- md: текущий (space-4 H / space-2 V, DS/Body/sm Medium)
- lg: padding space-6 H / space-3 V, text DS/Body/base Medium
Итого с Size: 3 × 4 × 3 = 36 ячеек
