import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav, StatCard, LiabilityCard, Badge, Button, Table } from '../../components'
import { registerScreen } from '../registry'
import { agreementStore } from '../../data/agreement'
import { profileStore } from '../../data/profile'
import { showToast } from '../../lib/toast'
import styles from './LiabilityDashboard.module.css'

const riskColumns = [
  { key: 'asset', header: 'Asset', render: (row: Record<string, unknown>) => <span className="ds-numeric">{String(row.asset)}</span> },
  { key: 'allocation', header: 'Allocation', render: (row: Record<string, unknown>) => <span className="ds-numeric">{String(row.allocation)}</span> },
  { key: 'target', header: 'Target', render: (row: Record<string, unknown>) => <span className="ds-numeric">{String(row.target)}</span> },
  {
    key: 'deviation',
    header: 'Deviation',
    render: (row: Record<string, unknown>) => (
      <span className={`ds-numeric ${row.risk === 'Medium' ? styles.warningText : styles.successText}`}>
        {String(row.deviation)}
      </span>
    ),
  },
  {
    key: 'risk',
    header: 'Risk',
    render: (row: Record<string, unknown>) => (
      <span className={row.risk === 'Medium' ? styles.warningText : styles.successText}>
        {String(row.risk)}
      </span>
    ),
  },
]

const riskRows = [
  { asset: 'USDC', allocation: '43.1%', target: '45%', deviation: '-1.9%', risk: 'Low' },
  { asset: 'ETH', allocation: '32%', target: '30%', deviation: '+2.0%', risk: 'Medium' },
  { asset: 'stETH', allocation: '18.3%', target: '20%', deviation: '-1.7%', risk: 'Low' },
  { asset: 'USDT', allocation: '6.6%', target: '5%', deviation: '+1.6%', risk: 'Medium' },
] as Record<string, unknown>[]

export function LiabilityDashboard() {
  const navigate = useNavigate()
  const agreement = agreementStore.useStore()
  const profile = profileStore.useStore()
  const [downloading, setDownloading] = useState(false)

  function handleDownloadReport() {
    setDownloading(true)
    setTimeout(() => {
      const lines: string[] = []
      lines.push('OBSIDIAN — Liability & Compliance Report')
      lines.push(`Generated: ${new Date().toLocaleString()}`)
      lines.push('')
      lines.push('Platform Status,Operational')
      lines.push('Legal Coverage,100%')
      lines.push('Compliance Flags,0')
      lines.push('')
      lines.push('Liability Framework')
      lines.push('Area,Responsible Party,Status')
      lines.push('Autonomous Rebalancing,Smart Account Protocol,Covered')
      lines.push('Bridge Operations,Li.Fi Protocol,Covered')
      lines.push(`Your Responsibility,Account Owner (${profile.fullName}),Active`)
      lines.push('')
      lines.push('Legal Agreement')
      lines.push(`Status,${agreement.signed ? 'Signed' : 'Awaiting Signature'}`)
      if (agreement.signed) {
        lines.push(`Signed by,${profile.fullName}`)
        lines.push(`Date,${agreement.signedDate}`)
      }
      lines.push('')
      lines.push('Portfolio Risk Status')
      lines.push('Asset,Allocation,Target,Deviation,Risk')
      riskRows.forEach(row => {
        lines.push(`${row.asset},${row.allocation},${row.target},${row.deviation},${row.risk}`)
      })

      const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `obsidian-liability-report-${new Date().toISOString().slice(0, 10)}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setDownloading(false)
      showToast('success', 'Liability & Compliance report downloaded')
    }, 500)
  }

  return (
    <div className={styles.screen}>
      <TopNav active="liability" />

      <div className={styles.body}>
        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeader}>
            <span className={styles.pageTitle}>Liability &amp; Compliance</span>
            <Button variant="primary" size="sm" onClick={handleDownloadReport} loading={downloading}>
              Download Report
            </Button>
          </div>

          {/* RiskStatusRow */}
          <div className={styles.statsRow}>
            <StatCard
              variant="neutral"
              label="Platform Status"
              value="Operational"
              subtitle="All systems running"
            />
            <StatCard
              variant="neutral"
              label="Legal Coverage"
              value="100%"
              subtitle="All transactions covered"
            />
            <StatCard
              variant="neutral"
              label="Compliance Flags"
              value="0"
              subtitle="No open issues"
            />
          </div>

          {/* LiabilityFrameworkSection */}
          <div className={styles.section}>
            <span className={styles.secTitle}>Liability Framework</span>
            <div className={styles.liabilityRow}>
              <LiabilityCard
                type="autonomous"
                title="Autonomous Rebalancing"
                responsible="Smart Account Protocol"
                description="Executed automatically per your rules. No manual approval required."
                badge={<Badge variant="success">Covered</Badge>}
              />
              <LiabilityCard
                type="bridge"
                title="Bridge Operations"
                responsible="Li.Fi Protocol"
                description="Cross-chain transfers governed by Li.Fi terms. Slippage guard active."
                badge={<Badge variant="success">Covered</Badge>}
              />
              <LiabilityCard
                type="user"
                title="Your Responsibility"
                responsible="Account Owner (James Harrington)"
                description="Rule configuration, oversight, emergency stop authority."
                badge={<Badge variant="success">Active</Badge>}
              />
            </div>
          </div>

          {/* AgreementStatusSection */}
          <div className={styles.agreementSection}>
            <div className={styles.agreementCard}>
              <span className={styles.cardTitle}>Legal Agreement</span>
              {agreement.signed ? (
                <>
                  <div className={styles.statusRow}>
                    <span className={styles.checkIcon}>✓</span>
                    <span className={styles.signedLabel}>Signed</span>
                  </div>
                  <span className={styles.cardMeta}>Signed by: {profile.fullName}</span>
                  <span className={styles.cardMeta}>Role: Family Office CIO</span>
                  <span className={styles.cardMeta}>Date: {agreement.signedDate}</span>
                </>
              ) : (
                <>
                  <div className={styles.statusRow}>
                    <span className={styles.pendingIcon}>⚠</span>
                    <span className={styles.pendingLabel}>Awaiting Signature</span>
                  </div>
                  <span className={styles.cardMeta}>Automated trading is disabled until signed.</span>
                </>
              )}
              <Button variant="primary" size="sm" className={styles.fullWidthBtn} onClick={() => navigate('/legal-terms')} data-track="view-agreement">View Agreement</Button>
            </div>

            <div className={styles.riskCard}>
              <span className={styles.cardTitle}>Portfolio Risk Status</span>
              <div className={styles.riskTable}>
                <Table density="compact" columns={riskColumns} rows={riskRows} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'liability-dashboard',
  name: 'Liability & Compliance',
  description: 'Liability framework cards, legal agreement status, portfolio risk table',
  route: '/liability-dashboard',
  component: LiabilityDashboard,
})
