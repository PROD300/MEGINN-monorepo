// Рабочий конфиг — сгенерирован директивой directive_dashboard. Руками не редактировать.
window.DASHBOARD_CONFIG = {
  // Путь 2 (прототип на Vercel/https): адрес сбора — постоянный https-туннель ngrok на VPS.
  endpoint: "https://passenger-making-cupped.ngrok-free.dev",
  // Реальный первый экран сценария (не дев-индекс "/"):
  prototypeUrl: "https://obsidian-peach-sigma.vercel.app/login",
  screens: {
    "/login": "Login",
    "/onboarding": "Onboarding",
    "/portfolio": "Portfolio",
    "/rebalancing-rules": "Rebalancing Rules",
    "/rule-create": "Create Rule",
    "/rule-detail/eth-balance-guard": "Rule Detail — ETH Balance Guard",
    "/rule-detail/steth-target-allocation": "Rule Detail — stETH Target Allocation",
    "/rule-detail/rwa-cross-chain-rebalance": "Rule Detail — RWA Cross-chain Rebalance",
    "/rule-detail/usdt-ceiling": "Rule Detail — USDT Ceiling",
    "/cross-chain-bridge": "Cross-chain Bridge",
    "/liability-dashboard": "Liability & Compliance",
    "/legal-terms": "Legal Agreement & Liability Terms",
    "/audit-log": "Audit Log",
    "/smart-account-setup": "Smart Account Setup",
    "/settings": "Account Settings",
    "/notifications": "Notifications",
    "/emergency-stop": "Emergency Stop",
    "/network-error": "Network Error",
    "/transaction-error": "Transaction Failed",
    "/not-found": "Not Found"
  },
  flows: [
    {
      id: "bridge-funds",
      name: "Bridge Funds Cross-chain",
      funnel: ["/portfolio", "/cross-chain-bridge"],
      goal: "/cross-chain-bridge",
      firstClick: { screen: "/portfolio", target: "button: Bridge Funds" }
    },
    {
      id: "rule-create",
      name: "Create Rebalancing Rule",
      funnel: ["/portfolio", "/rebalancing-rules", "/rule-create"],
      goal: "/rule-create",
      firstClick: { screen: "/rebalancing-rules", target: "button: + Create Rule" }
    },
    {
      id: "sign-agreement",
      name: "Review & Sign Legal Agreement",
      funnel: ["/liability-dashboard", "/legal-terms"],
      goal: "/legal-terms",
      firstClick: { screen: "/liability-dashboard", target: "button: View Agreement" }
    }
  ],
  // DASH_KEY не включали (необязательно для прототип-теста) — чтение метрик открыто.
  key: ""
};
