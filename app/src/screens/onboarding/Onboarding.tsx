import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Users, ClipboardCheck, Check } from 'lucide-react'
import { Button, RoleRow, Badge } from '../../components'
import { registerScreen } from '../registry'
import { showToast } from '../../lib/toast'
import styles from './Onboarding.module.css'

const stepMeta = [
  { id: 1, label: 'Smart Account' },
  { id: 2, label: 'Permissions' },
  { id: 3, label: 'Review' },
]

const roles = [
  {
    status: 'active' as const,
    name: 'James Harrington',
    role: 'CIO · Full access',
    address: '0x4aB2...c1F8',
  },
  {
    status: 'active' as const,
    name: 'DeFi Operator',
    role: 'Execute only — Read + Execute rules',
    address: '0x9eC1...a3D2',
  },
  {
    status: 'active' as const,
    name: 'Emergency Contact',
    role: 'View only — read-only',
    address: 'ops@familyoffice.com',
  },
]

const reviewRows = [
  { label: 'Smart Account', value: '0x4aB2...c1F8' },
  { label: 'Connected wallets', value: '2 (Primary + Hardware backup)' },
  { label: 'Roles configured', value: '3' },
  { label: 'Networks', value: 'Ethereum · Arbitrum' },
  { label: 'Multi-sig threshold', value: '10,000 USD' },
]

export function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [walletConnected, setWalletConnected] = useState(false)
  const [connectingWallet, setConnectingWallet] = useState(false)
  const [activating, setActivating] = useState(false)

  function goBack() {
    setStep(s => Math.max(1, s - 1))
  }

  function goNext() {
    setStep(s => Math.min(3, s + 1))
  }

  // [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
  // Represents a real wallet-connect handshake. No wallet provider is
  // actually invoked — this just flips local state after a fake delay.
  function handleConnectWallet() {
    setConnectingWallet(true)
    setTimeout(() => {
      setConnectingWallet(false)
      setWalletConnected(true)
      showToast('success', 'Wallet connected')
    }, 600)
  }

  // [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
  // Represents deploying/activating a real smart account contract on-chain.
  // Here it's a fake delay with no contract deployment or backend call.
  function handleActivate() {
    setActivating(true)
    setTimeout(() => {
      setActivating(false)
      showToast('success', 'Smart Account activated — welcome to OBSIDIAN')
      navigate('/portfolio')
    }, 800)
  }

  return (
    <div className={styles.screen}>
      <div className={styles.body}>
        {/* StepIndicator */}
        <div className={styles.stepIndicator}>
          {stepMeta.map((s, i) => (
            <Fragment key={s.id}>
              <div className={styles.step}>
                <span className={step === s.id ? styles.stepCircleActive : styles.stepCircle}>{s.id}</span>
                <span className={step === s.id ? styles.stepLabelActive : styles.stepLabel}>{s.label}</span>
              </div>
              {i < stepMeta.length - 1 && <span className={styles.connector} />}
            </Fragment>
          ))}
        </div>

        <span className={styles.stepCaption}>Step {step} of 3</span>

        {/* StepCard */}
        {step === 1 && (
          <div className={[styles.stepCard, styles.stepCardNarrow].join(' ')}>
            <div className={styles.stepHeader}>
              <ShieldCheck size={32} className={styles.icon} />
              <span className={styles.stepTitle}>Connect Smart Account</span>
              <span className={styles.stepSubtitle}>
                Link your wallet to create an institutional Smart Account with role-based permissions.
              </span>
            </div>

            <div className={styles.infoBanner}>
              Smart Accounts enable rule-based automation without signing every transaction. Your funds remain under self-custody at all times.
            </div>

            <div className={styles.walletConnectRow}>
              <Button
                variant="primary"
                size="sm"
                className={styles.fullWidth}
                onClick={handleConnectWallet}
                loading={connectingWallet}
                disabled={walletConnected}
                icon={walletConnected ? <Check size={14} /> : undefined}
              >
                {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
              </Button>
              <span className={styles.walletHint}>Supports: MetaMask · Ledger · Gnosis Safe · WalletConnect</span>
            </div>

            <div className={styles.stepCta}>
              <Button variant="primary" size="sm" disabled>← Back</Button>
              <Button variant="primary" size="sm" onClick={goNext} disabled={!walletConnected}>Continue →</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={[styles.stepCard, styles.stepCardNarrow].join(' ')}>
            <div className={styles.stepHeader}>
              <Users size={32} className={styles.icon} />
              <span className={styles.stepTitle}>Set Up Roles &amp; Permissions</span>
              <span className={styles.stepSubtitle}>
                Define who can configure rules, execute trades, and review activity on this Smart Account.
              </span>
            </div>

            <div className={styles.infoBanner}>
              Permissions can be changed anytime from Smart Account Setup after onboarding.
            </div>

            <div className={styles.roleList}>
              {roles.map(r => (
                <RoleRow
                  key={r.name}
                  status={r.status}
                  name={r.name}
                  role={r.role}
                  address={r.address}
                  badge={<Badge variant="success">Active</Badge>}
                />
              ))}
            </div>

            <div className={styles.stepCta}>
              <Button variant="primary" size="sm" onClick={goBack}>← Back</Button>
              <Button variant="primary" size="sm" onClick={goNext}>Continue →</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={[styles.stepCard, styles.stepCardNarrow].join(' ')}>
            <div className={styles.stepHeader}>
              <ClipboardCheck size={32} className={styles.icon} />
              <span className={styles.stepTitle}>Review &amp; Activate</span>
              <span className={styles.stepSubtitle}>
                Confirm your Smart Account configuration before activating autonomous rebalancing.
              </span>
            </div>

            <div className={styles.reviewList}>
              {reviewRows.map(row => (
                <div className={styles.reviewRow} key={row.label}>
                  <span className={styles.reviewLabel}>{row.label}</span>
                  <span className={styles.reviewValue}>{row.value}</span>
                </div>
              ))}
            </div>

            <div className={styles.successBanner}>
              Once activated, OBSIDIAN will begin monitoring your portfolio. No funds move until you create rebalancing rules.
            </div>

            <div className={styles.stepCta}>
              <Button variant="primary" size="sm" onClick={goBack} disabled={activating}>← Back</Button>
              <Button variant="primary" size="sm" onClick={handleActivate} loading={activating}>Activate Smart Account</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

registerScreen({
  id: 'onboarding',
  name: 'Onboarding',
  description: '3-step Smart Account wizard — connect wallet, assign roles, review & activate',
  route: '/onboarding',
  component: Onboarding,
})
