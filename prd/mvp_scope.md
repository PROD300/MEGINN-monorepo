# MEGINN: MVP Scope (v2.0 - Optimized Budget)

## MVP Definition
**MEGINN MVP** is a "Lean Institutional Automation" platform. Due to budget constraints, the focus is shifted from a broad feature set to a narrow, high-value core: **Autonomous Rebalancing** and **Legal Risk Management** for Family Offices.

## MVP Feature List (Absolute Minimum)

### 1. Foundation (Core Infrastructure)
- **F01: Smart Accounts**: Basic account abstraction to support institutional roles.
- **F17: Legal/Custodian Liability Module**: A dedicated section/framework in the UI that clarifies risk distribution and custodian status (Must-have for legal sign-off).
- **F15: Audit Logging**: Essential tamper-proof history for compliance.

### 2. The Core Value Proposition
- **F20: Cross-chain Bridge**: Unified bridge between Ethereum and Arbitrum (Li.Fi/Socket/Across). **Reinstated into MVP** — required hard dependency for F21. Without F20, AI Auto-Rebalancing can only execute within a single chain, making it a broken feature for multi-network portfolios.
- **F21: AI Auto-Rebalancing**: Limit-based automatic execution across all supported networks (e.g., "Sell if ETH > 15%"), powered by F20 bridge.
    - *Key requirement: No manual "Approve" needed for recurring rebalancing.*
- **F22: Emergency Override**: A "Kill Switch" for all automated actions.

### 3. Visibility (Simplified)
- **F02: Focused Dashboard**: Support for 2 networks (ETH, Arbitrum) and major assets (ETH, USDC, RWA).
- **F13: Basic Reporting**: One-click PDF "Portfolio Snapshot" (AUM, Allocation).

## De-prioritized / Out of Scope (v1.1+)
1. **F08/F09: AI Prediction/Deep Analysis**: Replaced by simple rule-based automation.
2. **F03: ERC-4626 Vaults**: Complex yield strategies deferred.
3. **F16: ZK-Privacy**: High-cost feature deferred.
4. **F25: Tax Report Module**: Moved to post-MVP.

## Primary User Scenario: Family Office CIO
1. **Setup**: CIO configures a Smart Account and defines rebalancing rules (e.g., "Keep RWA at 50%").
2. **Monitoring**: CIO checks the dashboard once a week.
3. **Automation**: System automatically trades to maintain limits. CIO receives a "Post-factum" notification.
4. **Trust**: CIO views the "Legal Coverage" certificate in the platform to ensure institutional liability is covered.
