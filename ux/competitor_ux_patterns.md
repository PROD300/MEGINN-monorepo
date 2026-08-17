# MEGINN: UX Patterns — Конкуренты

## Метаданные

| Параметр | Значение |
|----------|----------|
| Инициатива | MEGINN |
| Дата | 2026-04-16 |
| Версия | 1.0 |

---

## 1. Industry Standards (что все делают одинаково)

Это ожидания пользователей — нужно делать так же.

### Onboarding Flow
```
All competitors:
1. Connect wallet
2. Browse available options
3. Deposit/start using
```

**MEGINN:** То же, но добавить:
- Role selection (Admin/Operator/Investor/Auditor)
- AI welcome ("Your portfolio has $X across Y chains...")
- Guided first action

### Dashboard Layout
```
Common pattern:
┌─────────────────────────────────────┐
│ Logo    [Wallet] [Settings] [Help] │
├─────────┬───────────────────────────┤
│ Nav     │ Main Content Area         │
│         │                           │
│ - Home  │ [Stats Cards]            │
│ - Vaults│ [Charts]                 │
│ - etc.  │ [Action Buttons]         │
│         │                           │
└─────────┴───────────────────────────┘
```

**MEGINN:** Добавить AI Insights panel справа

### Navigation Structure
```
Common: Sidebar navigation
- Dashboard
- Vaults/Strategies
- Portfolio/Assets
- History/Transactions
- Settings
```

**MEGINN:** Добавить:
- AI Assistant (persistent)
- Team Management (для enterprise)
- Audit Logs (для compliance)

---

## 2. Differentiation Points (где конкуренты расходятся)

### Vault Selection UI

| Competitor | Pattern |
|------------|---------|
| Yearn | List view with TVL/APY, sortable |
| Instadapp | Card grid with protocol icons |
| DeFi Saver | Focus on position, vault secondary |
| Pendle | Market-first, yield visualization |
| Superform | Comparison table, auto-highlight best |

**MEGINN recommendation:** Combo approach
- Sortable list view (Yearn)
- Quick compare toggle (Superform)
- AI "recommended" badge

### Transaction Confirmation

| Competitor | Pattern |
|------------|---------|
| Yearn | Simple confirm, show gas |
| Instadapp | Advanced mode with flash loan preview |
| DeFi Saver | Multiple steps, safety warnings |
| Pendle | Show PT/YT split upfront |

**MEGINN recommendation:**
```
1. Action summary with AI risk score
2. Multi-level approval (if enterprise)
3. Confirmation with gas estimate
4. Real-time status + audit log
```

### Portfolio Visualization

| Competitor | Pattern |
|------------|---------|
| Yearn | Simple pie chart, TVL |
| Instadapp | Multi-protocol view, complex |
| DeFi Saver | Position-focused, health factor |
| Pendle | Yield breakdown, PT/YT split |
| Superform | Cross-chain aggregate |

**MEGINN recommendation:**
- Unified multi-chain view
- AI-generated insights sidebar
- Risk distribution visualization
- Allocation recommendations

---

## 3. Recommended Patterns для MEGINN

### Onboarding (от Yearn + MEGINN twist)

```
Step 1: Connect Wallet(s)
         ↓
Step 2: Select Role
         [Admin] [Operator] [Investor] [Auditor]
         ↓
Step 3: Portfolio Import
         [Auto-detect from wallets]
         ↓
Step 4: AI Welcome
         "Your portfolio: $X across Y chains
          3 wallets detected, Z protocols"
         ↓
Step 5: AI First Action
         [AI suggests: "Rebalance by 5%?"]
```

### Dashboard Layout (enterprise-friendly)

```
┌──────────────────────────────────────────────────────────────┐
│ MEGINN           [AI 💬] [🔔] [👤 Admin ▼]              │
├─────────────┬──────────────────────────────────────────────┤
│ Dashboard   │ ┌─────────────────┬──────────────────────────┐ │
│ Wallets    │ │ Portfolio Value │ ▲ +12.4% (30d)          │ │
│ Assets     │ │ $2,450,000     │                         │ │
│ Strategies │ └─────────────────┴──────────────────────────┘ │
│ Vaults    │ ┌────────────────────────────────────────────┐  │
│ Transfers  │ │ 🧠 AI Insights                           │  │
│ AI Assistant│ │ • Risk: Low (green) — well balanced     │  │
│ Team       │ │ • Opportunity: ETH staking +0.3%/day    │  │
│ Reports    │ │ • Action: Rebalance BTC by 5%? [→]      │  │
│ Settings   │ └────────────────────────────────────────────┘  │
│            │ ┌────────────────────────────────────────────┐  │
│ ──────────│ │ Multi-chain Assets                       │  │
│ Audit Log │ │ ETH $800K ████████░░  32%              │  │
│ Compliance│ │ BTC $600K █████░░░░░░  24%              │  │
│           │ │ USDC $550K █████░░░░░░  22%              │  │
│           │ │ Other $500K ████░░░░░░░  20%              │  │
│           │ └────────────────────────────────────────────┘  │
└─────────────┴──────────────────────────────────────────────┘
```

### Transaction Flow (with AI + Approval)

```
┌─────────────────────────────────────────┐
│ Confirm Transaction                      │
├─────────────────────────────────────────┤
│                                         │
│ Type: Rebalance Portfolio                │
│ Amount: $50,000 ETH → USDC              │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🧠 AI Analysis                       │ │
│ │ Risk Score: Low ✓                    │ │
│ │ Gas Estimate: $12.50                 │ │
│ │ Expected APY Impact: +0.3%          │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ ✓✓ Approval Required (2 of 3)        │ │
│ │ [✓] admin@meginn.xyz — Approved    │ │
│ │ [○] operator@meginn.xyz — Pending  │ │
│ │ [○] trader@meginn.xyz — Pending    │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Cancel]                    [Approve]  │
└─────────────────────────────────────────┘
```

### AI Assistant Interface

```
┌─────────────────────────────────────────┐
│ 🧠 AI Assistant                    [—][×]│
├─────────────────────────────────────────┤
│                                         │
│ You: Show me my portfolio risk           │
│                                         │
│ AI: Your portfolio risk is LOW ✓        │
│                                         │
│ Breakdown:                              │
│ • ETH position: 32% (low volatility)   │
│ • BTC position: 24% (medium volatility)│
│ • Stablecoins: 22% (stable)            │
│ • DeFi positions: 20% (higher risk)   │
│                                         │
│ Recommendation: Consider reducing DeFi  │
│ exposure to 15% for lower volatility.   │
│                                         │
│ [Accept] [Adjust] [Learn More]         │
│                                         │
├─────────────────────────────────────────┤
│ Type a message...              [Send ➤] │
└─────────────────────────────────────────┘
```

---

## 4. Anti-patterns (избегать)

### Не повторять:
1. **Instadapp complexity** — too many options upfront
2. **DeFi Saver narrow scope** — only lending protocols
3. **Yearn DeFi-only** — no enterprise features
4. **Pendle complexity** — PT/YT confusing for newcomers

### MEGINN的不同 (differentiation):
1. **AI-first** — AI is persistent, not optional
2. **Role-based** — different views for different roles
3. **Compliance-visible** — audit trail always visible
4. **Progressive disclosure** — simple first, detailed on demand

---

## 5. Accessibility & Internationalization

### Accessibility (WCAG 2.1 AA)

- Keyboard navigation for all actions
- ARIA labels for DeFi terms
- High contrast mode for charts
- Screen reader support for transaction confirmations

### Internationalization

- Multi-language support (EN, RU, ZH, AR)
- RTL layout support for Arabic
- Localized number/currency formatting
- Timezone-aware transaction history

---

## 6. Mobile Considerations

### Priority Screens (mobile-first)

1. Dashboard (portfolio overview)
2. AI Assistant (quick insights)
3. Transaction confirmation (approvals)
4. Notifications/alerts

### Desktop-only Features

1. Team management
2. Advanced analytics
3. Compliance reports
4. Multi-window workflows

---

## 7. Key UX Differentiators для MEGINN

| Feature | How It Works | Why It Matters |
|---------|--------------|----------------|
| AI Insights sidebar | Persistent panel with recommendations | Sets us apart from all competitors |
| Role-based views | Admin sees team, Investor sees portfolio | Enterprise requirement |
| Approval workflow | Multi-level confirmations | Compliance must-have |
| Audit trail | Every action logged, searchable | Regulatory requirement |
| Natural language | "Show my risk" not "Risk Dashboard" | Accessibility, speed |
