# OBSIDIAN: Full Features List

This list compiles all requirements and features identified across project artifacts.

## Core Platform Features

| ID | Feature | Description | Source | Persona |
|----|---------|-------------|--------|---------|
| F01 | Smart Accounts | Account abstraction, roles, permissions, cold storage support. | Brief, Personas | Treasury Manager |
| F02 | Multi-chain Dashboard | Unified interface for ETH, Arbitrum, Base, Solana, Polygon, etc. | Brief, Audit | All |
| F03 | ERC-4626 Vaults | Standardized deposit, withdrawal, and vault share management. | Brief, Analysis | All |
| F04 | Base Asset Management | Support for ETH, USDC, wBTC, and other core liquid assets. | Brief | All |
| F05 | Strategy Registry | Immutable registry of strategies with approval workflows. | Brief | Auditor |
| F06 | Position Tracking | Visual and tokenized representation of user positions. | Brief | All |
| F07 | Multi-chain Support | Integration with Arbitrum, Base, Ethereum, Solana, Polygon, BNB. | Brief, Analysis | All |
| F20 | Cross-chain Bridge | Unified bridging between all supported networks. Hard dependency of F21 — reinstated into MVP v1.0. | Interview | All |
| F22 | Emergency Override | "Stop" button to halt auto-rebalancing or any rule execution. | Interview | CIO |

## AI Features

| ID | Feature | Description | Source | Persona |
|----|---------|-------------|--------|---------|
| F08 | AI Portfolio Analysis | Deep analysis of current holdings, P&L, and allocation. | Brief, Personas | All |
| F09 | AI Risk Prediction | Predictive modeling of portfolio risks based on market data. | Brief | All |
| F10 | Natural Language Queries | Dialogue interface to ask questions about the portfolio. | Brief, Analysis | All |
| F21 | AI Auto-Rebalancing | Rule-based automatic rebalancing with limits and post-factum alerts. | Interview | CIO |
| F24 | Stress Test Report | "What if" scenarios (e.g., "What if ETH -50%?") simulations. | Interview | CIO |

## Enterprise & Compliance Features

| ID | Feature | Description | Source | Persona |
|----|---------|-------------|--------|---------|
| F11 | Multi-Level Approval | 2-3 levels of confirmation with automatic routing by amount/type. | Brief, Personas | Treasury Manager |
| F12 | Incident Response | Automated threat detection, escalation, and SLA tracking. | Brief | Treasury Manager |
| F13 | Institutional Reporting | Automated PDF/CSV/Excel reports (6 templates). | Brief, Personas | CIO, Manager |
| F14 | Compliance Engine | Policy enforcement, whitelist/KYC checks. | Brief | Auditor |
| F15 | Audit Logging | Immutable, tamper-proof record of every system action. | Brief, Personas | Auditor |
| F16 | Identity-linked Assets | ERC-3643/ERC-1400 with privacy-preserving identity checks. | Brief, Interview | CIO |
| F25 | Tax Report Module | Capital gains, holdings as of Dec 31, and transaction logs. | Interview | CIO |

## UX/UI Specifics (from Audit)

| ID | Feature | Description | Source | Persona |
|----|---------|-------------|--------|---------|
| U01 | Transaction Preview | High-fidelity preview of exactly what will happen in a transaction. | Audit, Personas | Operator |
| U02 | Risk Warnings | Visual badges and tooltips for high-risk strategies or vaults. | Audit | CIO |
| U03 | Welcome Onboarding | Multi-step flow to guide new institutional users. | Audit | All |
| U04 | Role-based Views | Different dashboard layouts based on user roles (Admin/Operator/CIO). | Analysis | All |

## Future / Advanced Features

| ID | Feature | Description | Source | Persona |
|----|---------|-------------|--------|---------|
| A01 | Permissioned RWA | Full tokenization framework for real-world assets. | Brief | CIO |
| A02 | Structured Products | Tranches and risk layers for sophisticated yield strategies. | Brief | CIO |
| A03 | Avalanche Subnets | Support for Avalanche-specific institutional networks. | Brief | CIO |
| A04 | Managed Accounts | Delegate management options for Family Offices. | Personas | CIO |
