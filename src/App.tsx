import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IndexPage } from './screens/IndexPage'
import { getScreens } from './screens/registry'
import { ToastContainer } from './components'

// register all screens
import './screens/portfolio/Portfolio'
import './screens/login/Login'
import './screens/onboarding/Onboarding'
import './screens/rebalancing-rules/RebalancingRules'
import './screens/rule-create/RuleCreate'
import './screens/rule-detail/RuleDetail'
import './screens/cross-chain-bridge/CrossChainBridge'
import './screens/liability-dashboard/LiabilityDashboard'
import './screens/legal-terms/LegalTerms'
import './screens/audit-log/AuditLog'
import './screens/smart-account-setup/SmartAccountSetup'
import './screens/settings/Settings'
import './screens/notifications/Notifications'
import './screens/emergency-stop/EmergencyStop'
import './screens/network-error/NetworkError'
import './screens/transaction-error/TransactionError'
import './screens/not-found/NotFound'

export default function App() {
  const screens = getScreens()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        {screens.map(s => (
          <Route key={s.id} path={s.route} element={<s.component />} />
        ))}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}
