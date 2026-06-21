import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '../../components'
import { registerScreen } from '../registry'
import { showToast } from '../../lib/toast'
import styles from './Login.module.css'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [pendingAction, setPendingAction] = useState<'wallet' | 'email' | null>(null)

  function handleConnectWallet() {
    setPendingAction('wallet')
    setTimeout(() => {
      showToast('success', 'Wallet connected — welcome back')
      navigate('/portfolio')
    }, 700)
  }

  function handleSignIn() {
    const nextErrors: { email?: string; password?: string } = {}
    if (!email.trim()) nextErrors.email = 'Work email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email address'
    if (!password) nextErrors.password = 'Password is required'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      showToast('error', 'Please fix the highlighted fields')
      return
    }

    setPendingAction('email')
    setTimeout(() => {
      showToast('success', 'Signed in — welcome back')
      navigate('/portfolio')
    }, 700)
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        {/* LogoBlock */}
        <div className={styles.logoBlock}>
          <span className={styles.logo}>OBSIDIAN</span>
          <span className={styles.tagline}>Institutional Portfolio Management</span>
        </div>

        <div className={styles.divider} />

        {/* WalletSection */}
        <div className={styles.walletSection}>
          <span className={styles.hint}>Connect via wallet</span>
          <Button
            variant="primary"
            size="sm"
            className={styles.fullWidth}
            onClick={handleConnectWallet}
            loading={pendingAction === 'wallet'}
            disabled={pendingAction === 'email'}
            data-track="connect-wallet"
          >
            Connect Wallet
          </Button>
          <span className={styles.hint}>MetaMask · Ledger · Gnosis Safe</span>
        </div>

        {/* OrDiv */}
        <div className={styles.orDiv}>
          <span className={styles.orLine} />
          <span className={styles.orText}>or</span>
          <span className={styles.orLine} />
        </div>

        {/* EmailSection */}
        <div className={styles.emailSection}>
          <span className={styles.hintLeft}>Sign in with email</span>
          <Input
            placeholder="Work email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant={errors.email ? 'error' : 'default'}
            errorMessage={errors.email}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant={errors.password ? 'error' : 'default'}
            errorMessage={errors.password}
          />
          <Button
            variant="primary"
            size="sm"
            className={styles.fullWidth}
            onClick={handleSignIn}
            loading={pendingAction === 'email'}
            disabled={pendingAction === 'wallet'}
          >
            Sign In
          </Button>
        </div>

        {/* FooterLinks */}
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>Forgot password?</a>
          <a href="#" className={styles.footerLink}>Request Access →</a>
        </div>
      </div>
    </div>
  )
}

registerScreen({
  id: 'login',
  name: 'Login',
  description: 'Sign in via wallet or work email, institutional portfolio access',
  route: '/login',
  component: Login,
})
