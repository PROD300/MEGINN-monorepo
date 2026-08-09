# OBSIDIAN: Product Requirements Document (PRD) v2.0 (Optimized Budget)

## Executive Summary
**OBSIDIAN** — The Lean AI-native enterprise platform for institutional digital asset management.

- **Problem**: Family Offices and Corporate Treasuries face high operational risks and time costs managing DeFi portfolios.
- **Key Insight**: Security and automation are not "features" but "survival requirements". In a constrained budget environment, OBSIDIAN focuses on **Autonomous Rebalancing** and **Legal Risk Distribution**.
- **Solution**: A lean platform built on Smart Accounts that automates portfolio maintenance while providing clear legal/custodial liability frameworks.
- **Primary Persona**: **Family Office CIO** whose primary pain is manual management time and personal liability risk.

---

## 1. Goals and Metrics

### OKRs
**Objective 1: Institutional Security & Liability**
- **KR 1**: 100% of transactions covered by the "Legal/Custodian Liability" framework.
- **KR 2**: Zero manual "Approve" steps for automated rebalancing once rules are set.
- **KR 3**: Immutable audit logs for all automated actions.

**Objective 2: Maximum Efficiency**
- **KR 1**: Reduce rebalancing management time to < 10 minutes per month.
- **KR 2**: Support at least 2 primary networks (ETH, Arbitrum) with integrated automation.

### North Star Metric
**Automation Volume**: The total value of assets managed by autonomous rules.

---

## 2. Target Audience

| Persona | Description | JTBD |
|---------|-------------|------|
| **Family Office CIO** (Primary) | Manages $500M+ AUM, needs "Set and Forget" solutions. | Access yield with zero daily effort and clear legal protection. |
| **Treasury Manager** (Secondary) | Needs to prove compliance and control. | Ensure treasury assets stay within board-approved limits automatically. |

---

## 3. MVP Scope (v2.0 Lean)
**MVP Core**: Autonomous rule-based management on top of a secure Smart Account infrastructure.

### Must-Have Features (Phase 1)
- **F01: Smart Accounts**: Account abstraction with role-based permissions.
- **F20: Cross-chain Bridge**: Unified bridge between Ethereum and Arbitrum via Li.Fi/Socket/Across. **Reinstated into MVP as a hard dependency of F21.** F21 AI Auto-Rebalancing cannot function without F20 — missing bridge means partial trade execution. Auto-rebalancing must operate across all supported networks; AI requires cross-chain asset access, otherwise the feature is broken.
- **F21: AI Auto-Rebalancing Engine**: Rule-based automation (Threshold triggers) across all supported networks via F20.
- **F17: Liability & Compliance Framework**: Explicit UI/Legal integration to address "who is responsible?".
- **F22: Emergency Stop**: One-click kill switch for all automated processes.
- **F15: Audit Logging**: Automated transaction history for compliance.

### Deferred (v2.0+)
- **AI Prediction/Deep Analysis**: Replaced by simple rule-based automation.
- **Advanced Reporting**: Limited to basic PDF snapshots.
- **ERC-4626 Vaults**: Native integrations deferred; focusing on direct asset management.

---

## 4. User Stories (Updated)

| ID | Persona | Story | Acceptance Criteria |
|----|---------|-------|---------------------|
| US01 | CIO | As a CIO, I want to define rebalancing rules once, so that the system maintains my portfolio without me signing every transaction. | 1. Rule definition UI 2. Autonomous execution 3. Post-factum notification. |
| US02 | CIO | As a CIO, I want a clear legal statement on custodian liability, so that I can justify the platform risk to the family council. | 1. Liability dashboard 2. Legal terms integration 3. Risk status indicators. |

---

## 5. Risks and Open Questions
- **Risk**: Platform insolvency/Budget issues. *Mitigation*: Focus on "Self-Custody" Smart Accounts so users can always withdraw funds even if the UI is down.
- **Risk**: Automated trade failure due to liquidity/slippage. *Mitigation*: Implementation of "Slippage Guard" and "Emergency Stop".

---

## 6. Roadmap
- **v1.0 (Lean MVP)**: Smart Accounts, Cross-chain Bridge (F20), Auto-rebalancing (F21), Legal Framework.
- **v1.1**: Basic Reporting, Extra Network Support (Solana).
- **v2.0**: Full AI Analytics, Advanced Privacy, 7+ chain support.
