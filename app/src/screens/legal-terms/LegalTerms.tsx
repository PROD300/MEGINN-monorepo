import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav, Badge, Button } from '../../components'
import { registerScreen } from '../registry'
import { agreementStore, signAgreement } from '../../data/agreement'
import { profileStore } from '../../data/profile'
import { showToast } from '../../lib/toast'
import styles from './LegalTerms.module.css'

const sections = [
  {
    title: '1. Autonomous Rebalancing',
    body: 'By activating rebalancing rules, you authorize the Smart Account protocol to execute trades on your behalf without per-transaction approval, within the parameters you define.',
  },
  {
    title: '2. Bridge Operations',
    body: 'Cross-chain bridge operations via Li.Fi, Socket, and Across protocols are governed by their respective terms. OBSIDIAN provides routing and monitoring but is not responsible for bridge provider failures.',
  },
  {
    title: '3. Emergency Stop',
    body: 'You retain full authority to halt all automated operations at any time via the Emergency Stop function. Activation is immediate and irreversible until manually re-enabled.',
  },
  {
    title: '4. Audit Logging',
    body: 'All automated actions are recorded in an immutable audit log. You may export this data at any time for compliance reporting.',
  },
  {
    title: '5. User Obligations',
    body: 'You are responsible for: (a) setting appropriate rule parameters; (b) maintaining sufficient gas balance; (c) reviewing post-factum notifications; (d) activating Emergency Stop if needed.',
  },
]

export function LegalTerms() {
  const navigate = useNavigate()
  const agreement = agreementStore.useStore()
  const profile = profileStore.useStore()
  const [agreed, setAgreed] = useState(false)
  const [signing, setSigning] = useState(false)

  // [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
  // Represents submitting an e-signature to a real backend/legal-agreement
  // service. Here it's a fake delay before flipping local agreement state.
  function handleSign() {
    if (!agreed || agreement.signed || signing) return
    setSigning(true)
    setTimeout(() => {
      signAgreement()
      setSigning(false)
      showToast('success', 'Agreement signed — automated trading enabled')
    }, 600)
  }

  return (
    <div className={styles.screen}>
      <TopNav active="liability" />

      <div className={styles.body}>
        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeaderWrap}>
            <div className={styles.pageHeader}>
              <div className={styles.breadcrumb}>
                <span className={styles.breadcrumbAccent} onClick={() => navigate('/liability-dashboard')} style={{ cursor: 'pointer' }}>Liability &amp; Compliance</span>
                <span className={styles.breadcrumbMuted}>›</span>
                <span className={styles.breadcrumbMuted}>Legal Agreement</span>
              </div>
              <span className={styles.pageTitle}>Legal Agreement &amp; Liability Terms</span>
            </div>
          </div>

          {/* ContentArea */}
          <div className={styles.contentArea}>
            {/* DocumentColumn */}
            <div className={styles.documentColumn}>
              <div className={styles.documentCard}>
                <span className={styles.docTitle}>OBSIDIAN Platform — Custodial Liability Agreement</span>
                <span className={styles.docMeta}>Version 1.0 · Effective May 2026 · English</span>
                <div className={styles.divider} />
                {sections.map(section => (
                  <div className={styles.section} key={section.title}>
                    <span className={styles.sectionTitle}>{section.title}</span>
                    <span className={styles.sectionBody}>{section.body}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SideColumn */}
            <div className={styles.sideColumn}>
              <div className={styles.signatureCard}>
                <span className={styles.cardTitle}>Sign Agreement</span>
                <Badge variant={agreement.signed ? 'success' : 'warning'}>
                  {agreement.signed ? 'Signed' : 'Awaiting Signature'}
                </Badge>
                <div className={styles.divider} />
                <span className={styles.signerName}>{profile.fullName}</span>
                <span className={styles.signerMeta}>Family Office CIO</span>
                <span className={styles.signerMeta}>
                  {agreement.signed ? `Signed: ${agreement.signedDate}` : 'Date: Pending signature'}
                </span>
                <div className={styles.divider} />
                {agreement.signed ? (
                  <span className={styles.signedNote}>
                    This agreement has been signed. Automated trading is enabled.
                  </span>
                ) : (
                  <>
                    <label className={styles.checkboxRow} data-track="agreement-checkbox">
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={agreed}
                        onChange={e => setAgreed(e.target.checked)}
                      />
                      <span className={styles.checkboxLabel}>I have read and understood all terms</span>
                    </label>
                    <Button
                      variant="primary"
                      size="sm"
                      className={styles.fullWidthBtn}
                      disabled={!agreed || signing}
                      loading={signing}
                      onClick={handleSign}
                      data-track="sign-agreement"
                    >
                      Sign Agreement
                    </Button>
                    {!agreed && (
                      <span className={styles.signGate}>Check the box above to enable signing</span>
                    )}
                    <span className={styles.signNote}>Once signed, automated trading will be enabled.</span>
                  </>
                )}
              </div>

              <div className={styles.warningCard}>
                <span className={styles.warnIcon}>⚠</span>
                <span className={styles.warnText}>
                  Signing authorizes autonomous execution within your defined rules. Rules remain under your control at all times.
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'legal-terms',
  name: 'Legal Agreement & Liability Terms',
  description: 'Custodial liability agreement document, signature card, warning notice',
  route: '/legal-terms',
  component: LegalTerms,
})
