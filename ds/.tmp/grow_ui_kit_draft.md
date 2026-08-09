# grow_ui_kit — черновик описаний компонентов
# Дата: 2026-05-05 | Статус: ожидает апрув

---

### Table

**Назначение:** Табличный список данных портфеля с заголовком, строками и плотностями отображения.

**Анатомия:**
- Header (строка-заголовок с именами колонок)
- Row (строка данных)
- Cell (ячейка — авто ширина, flex 1)

**Варианты:**
- Density: compact | default

**Состояния:**
- Row: default | hover

**Отступы:**
- compact — Row padding: space-2 (8px) V × space-3 (12px) H
- default — Row padding: space-3 (12px) V × space-4 (16px) H
- itemSpacing между Cell: space-4 (16px)

**Привязки к Variables:**
- Header fill → `surface-level-2`
- Row fill default → `surface-default`
- Row fill hover → `surface-action-ghost-hover`
- Row border-bottom → `border-default`
- Header text → `text-muted`, стиль `DS/Label/xs`
- Cell text → `text-default`, стиль `DS/Body/sm`

---

### Tabs

**Назначение:** Горизонтальная полоса-переключатель между разделами одного экрана (Portfolio / Transactions / Analytics).

**Анатомия:**
- TabBar (контейнер-полоса, border-bottom разделяет от контента ниже)
- TabItem (отдельная вкладка: текст-метка + нижний индикатор)

**Варианты:**
- State: default | active (2 варианта TabItem — компонент собирается из нескольких экземпляров)

**Состояния:**
- default / active

**Отступы:**
- TabItem padding: space-3 (12px) V × space-4 (16px) H
- itemSpacing между TabItem в TabBar: space-2 (8px)

**Привязки к Variables:**
- TabBar border-bottom → `border-default`
- TabItem bottom-border (active) → `border-focus`
- TabItem fill (active background) → `surface-action-ghost-hover`
- TabItem text active → `text-accent`, стиль `DS/Body/sm Medium`
- TabItem text default → `text-muted`, стиль `DS/Body/sm`

---

### Select

**Назначение:** Поле выбора одного значения из списка — для фильтров и форм (Currency, Asset Class, Period).

**Анатомия:**
- Trigger (весь компонент — поле + chevron-иконка)
- Label (текст выбранного значения или placeholder)
- Chevron (иконка ▾, 16×16, text-muted)

**Варианты:**
- State: default | open

**Состояния:**
- default / open (border сменяется на border-focus)

**Отступы:**
- Trigger padding: space-2 (8px) V × space-4 (16px) H
- itemSpacing Label — Chevron: space-2 (8px)
- Фиксированная ширина: 240px (как Input)

**Привязки к Variables:**
- Fill → `surface-default`
- Border default → `border-default`
- Border open → `border-focus`
- Text (value/placeholder) → `text-muted`, стиль `DS/Body/sm`
- Radius → `radius-md`

---

### Toast

**Назначение:** Всплывающее уведомление о результате действия или системном событии.

**Анатомия:**
- Container (horizontal Auto Layout)
- Icon (статусная иконка 16×16)
- Message (текст уведомления)

**Варианты:**
- Variant: success | warning | error

**Состояния:**
- single (неинтерактивный — hover/focus не нужны на старте)

**Отступы:**
- Container padding: space-3 (12px) V × space-4 (16px) H
- itemSpacing Icon — Message: space-3 (12px)

**Привязки к Variables:**
- Container fill success → `bg-success-subtle`
- Container fill warning → `bg-warning-subtle`
- Container fill error → `bg-error-subtle`
- Container border success → `border-default` ⚠️ (border-success отсутствует в текущих токенах; добавить позже или оставить без обводки)
- Container border warning → `border-warning`
- Container border error → `border-error`
- Icon color success → `text-success`
- Icon color warning → `text-warning`
- Icon color error → `text-error`
- Message text → `text-default`, стиль `DS/Body/sm`
- Radius → `radius-md`
