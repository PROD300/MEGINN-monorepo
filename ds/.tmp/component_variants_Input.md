# component_variants — Input
# 2 × 4 = 8 ячеек

## Текущая матрица
Variant=default | error (2 ячейки)

## Новая матрица
- Variant: default | error
- State: default | hover | focus | disabled
- Итого: 2 × 4 = 8 ячеек

## Имена вариантов
Variant=default, State=default   ← из существующего
Variant=default, State=hover
Variant=default, State=focus
Variant=default, State=disabled
Variant=error, State=default     ← из существующего
Variant=error, State=hover
Variant=error, State=focus
Variant=error, State=disabled

## Что меняется по состояниям

| State    | fill             | border (default) | border (error)  | text            | opacity |
|----------|------------------|-----------------|-----------------|-----------------|---------|
| default  | surface-default  | border-default  | border-error    | text-muted      | 1.0 |
| hover    | surface-default  | border-strong   | border-error    | text-muted      | 1.0 |
| focus    | surface-default  | border-focus    | border-error    | text-default    | 1.0 |
| disabled | surface-subtle   | border-default  | —               | text-disabled   | 1.0 |

## Привязки к Variables
- fill → surface-default / surface-subtle
- stroke → border-default / border-strong / border-focus / border-error
- text → text-muted / text-default / text-disabled
- radius → radius-md, padding → space-4 H / space-2 V
