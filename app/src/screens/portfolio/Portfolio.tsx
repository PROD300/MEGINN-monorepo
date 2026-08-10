import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav, Banner, StatCard, ActivityRow, Table, Button, Modal, Input, Select } from '../../components'
import { registerScreen } from '../registry'
import { allocationStore, activityStore, getTotalAUM, rebalanceNow, addAsset } from '../../data/portfolio'
import { rulesStore, getRuleById } from '../../data/rules'
import { showToast } from '../../lib/toast'
import { formatUsd, formatPct } from '../../lib/format'
import styles from './Portfolio.module.css'

const allocationColumns = [
  { key: 'asset', header: 'Asset' },
  { key: 'allocation', header: 'Allocation', render: (row: Record<string, unknown>) => <span className={styles.mono}>{String(row.allocation)}</span> },
  { key: 'value', header: 'Value', render: (row: Record<string, unknown>) => <span className={styles.mono}>{String(row.value)}</span> },
]

const assetOptions = [
  { value: 'ETH', label: 'ETH' },
  { value: 'stETH', label: 'stETH' },
  { value: 'RWA', label: 'RWA' },
  { value: 'USDT', label: 'USDT' },
  { value: 'USDC', label: 'USDC' },
  { value: 'BTC', label: 'BTC' },
  { value: 'ARB', label: 'ARB' },
]

interface AddAssetErrors {
  asset?: string
  amount?: string
}

export function Portfolio() {
  const navigate = useNavigate()
  const allocation = allocationStore.useStore()
  const activity = activityStore.useStore()
  const rules = rulesStore.useStore()

  const [rebalancing, setRebalancing] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [assetForm, setAssetForm] = useState({ asset: '', amount: '' })
  const [assetErrors, setAssetErrors] = useState<AddAssetErrors>({})

  const totalAUM = getTotalAUM(allocation)
  const activeRulesCount = rules.filter(r => r.secondaryAction === 'Pause').length

  const lastRebalanceActivity = activity.find(a => a.description.startsWith('Auto-rebalance'))
  const lastRebalanceFlow = lastRebalanceActivity?.description.split(':')[1]?.split('·')[0]?.trim()

  const eth = allocation.find(a => a.asset === 'ETH')
  const ethRule = getRuleById('eth-balance-guard')
  const ethAllocationPct = totalAUM > 0 && eth ? (eth.valueUsd / totalAUM) * 100 : 0
  const ethOverBy = ethRule ? ethAllocationPct - ethRule.threshold : 0

  const allocationRows = allocation
    .map(a => ({
      asset: a.asset,
      allocation: formatPct(totalAUM > 0 ? (a.valueUsd / totalAUM) * 100 : 0),
      value: formatUsd(a.valueUsd),
    })) as Record<string, unknown>[]

  function handleRebalanceNow() {
    setRebalancing(true)
    setTimeout(() => {
      const moved = rebalanceNow()
      setRebalancing(false)
      if (moved > 0) {
        showToast('success', `Rebalanced ${formatUsd(moved)} from ETH to USDC`)
      } else {
        showToast('success', 'All allocations are already within target')
      }
    }, 700)
  }

  function handleDownloadReport() {
    setDownloading(true)
    setTimeout(() => {
      const lines: string[] = []
      lines.push('OBSIDIAN — Portfolio Report')
      lines.push(`Generated: ${new Date().toLocaleString()}`)
      lines.push('')
      lines.push(`Total AUM,${formatUsd(totalAUM)}`)
      lines.push(`Active Rules,${activeRulesCount}`)
      lines.push('')
      lines.push('Asset Allocation')
      lines.push('Asset,Allocation,Value')
      allocation.forEach(a => {
        lines.push(`${a.asset},${formatPct(totalAUM > 0 ? (a.valueUsd / totalAUM) * 100 : 0)},${formatUsd(a.valueUsd)}`)
      })
      lines.push('')
      lines.push('Recent Automation Activity')
      lines.push('Description,Time,Status')
      activity.forEach(a => {
        lines.push(`"${a.description.replace(/"/g, '""')}",${a.time},${a.statusLabel}`)
      })

      const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `obsidian-portfolio-report-${new Date().toISOString().slice(0, 10)}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setDownloading(false)
      showToast('success', 'Portfolio report downloaded')
    }, 500)
  }

  function handleAddAsset() {
    const errors: AddAssetErrors = {}
    const amount = Number(assetForm.amount)
    if (!assetForm.asset.trim()) errors.asset = 'Asset is required'
    if (assetForm.amount.trim() === '' || Number.isNaN(amount) || amount <= 0) {
      errors.amount = 'Enter a positive USD amount'
    }

    setAssetErrors(errors)
    if (Object.keys(errors).length > 0) {
      showToast('error', 'Please fix the highlighted fields')
      return
    }

    addAsset(assetForm.asset.trim(), amount)
    showToast('success', `${formatUsd(amount)} added to ${assetForm.asset.trim()}`)
    setModalOpen(false)
    setAssetForm({ asset: '', amount: '' })
    setAssetErrors({})
  }

  const onTarget = ethOverBy <= 0.05

  return (
    <div className={styles.screen}>
      <TopNav active="portfolio" />

      <div className={styles.body}>
        <main className={styles.main}>
          {/* AlertBanner */}
          <div className={styles.bannerSlot}>
            {onTarget ? (
              <Banner variant="success">All allocations within target</Banner>
            ) : (
              <Banner variant="warning">Next rebalance trigger: ETH allocation +{formatPct(ethOverBy)} above target</Banner>
            )}
          </div>

          {/* Bento grid — asymmetric, Asset Allocation as the large central tile */}
          <div className={styles.bento}>
            <div className={styles.tileStat1}>
              <StatCard variant="neutral" label="Total AUM" value={formatUsd(totalAUM)} subtitle="across 2 networks" />
            </div>
            <div className={styles.tileStat2}>
              <StatCard variant="success" label="Active Rules" value={String(activeRulesCount)} subtitle="auto-rebalancing enabled" />
            </div>
            <div className={styles.tileStat3}>
              <StatCard variant="neutral" label="Last Rebalance" value={lastRebalanceActivity?.time ?? '—'} subtitle={lastRebalanceFlow ?? 'No rebalances yet'} />
            </div>
            <div className={styles.tileStat4}>
              <StatCard
                variant={onTarget ? 'success' : 'warning'}
                label="Rebalance Trigger"
                value={onTarget ? 'On target' : `+${formatPct(ethOverBy)}`}
                subtitle={onTarget ? 'All allocations within target' : 'ETH allocation above target'}
              />
            </div>

            <div className={[styles.tile, styles.tileAllocation].join(' ')}>
              <div className={styles.secHeader}>
                <span className={styles.secTitle}>Asset Allocation</span>
              </div>
              <div className={styles.tableWrap}>
                {allocationRows.length > 0 ? (
                  <Table columns={allocationColumns} rows={allocationRows} />
                ) : (
                  <div className={styles.emptyState}>No assets in portfolio yet.</div>
                )}
              </div>
            </div>

            <div className={[styles.tile, styles.tileNetwork].join(' ')}>
              <div className={styles.secHeader}>
                <span className={styles.secTitle}>Network Status</span>
                <span className={styles.statusSync}>2 min ago</span>
              </div>
              <div className={styles.networkList}>
                <span className={styles.statusItem}>● ETH — Connected</span>
                <span className={styles.statusItem}>● Arbitrum — Connected</span>
                <span className={styles.statusItemAccent}>● Bridge — Active (Li.Fi · avg 42 sec)</span>
              </div>
            </div>

            <div className={[styles.tile, styles.tileActivity].join(' ')}>
              <div className={styles.secHeader}>
                <span className={styles.secTitle}>Recent Activity</span>
                <a href="#" className={styles.secLink} onClick={e => { e.preventDefault(); navigate('/audit-log') }}>View log →</a>
              </div>
              <div className={styles.activityList}>
                {activity.length > 0 ? (
                  activity.slice(0, 6).map(item => (
                    <ActivityRow key={item.id} status={item.status} description={item.description} time={item.time} statusLabel={item.statusLabel} />
                  ))
                ) : (
                  <div className={styles.emptyState}>No automation activity yet.</div>
                )}
              </div>
            </div>

            <div className={[styles.tile, styles.tileActions].join(' ')}>
              <div className={styles.quickActions}>
                <button className={styles.primaryCta} onClick={handleRebalanceNow} disabled={rebalancing}>
                  {rebalancing ? 'Rebalancing…' : 'Rebalance Now'}
                </button>
                <button className={styles.linkAction} onClick={() => setModalOpen(true)}>Add Asset</button>
                <button className={styles.linkAction} onClick={() => navigate('/cross-chain-bridge')} data-track="bridge-funds-cta">Bridge Funds</button>
                <button className={styles.linkAction} onClick={handleDownloadReport} disabled={downloading}>
                  {downloading ? 'Preparing…' : 'Download Report'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal
        open={modalOpen}
        title="Add Asset"
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleAddAsset}>Add Asset</Button>
          </>
        }
      >
        <div className={styles.modalField}>
          <label className={styles.modalLabel}>Asset</label>
          <Select
            options={assetOptions}
            placeholder="Select asset"
            value={assetForm.asset}
            onChange={e => setAssetForm(prev => ({ ...prev, asset: e.target.value }))}
          />
          {assetErrors.asset && <span className={styles.modalLabel}>{assetErrors.asset}</span>}
        </div>
        <div className={styles.modalField}>
          <label className={styles.modalLabel}>Amount (USD)</label>
          <Input
            type="number"
            placeholder="e.g. 1000000"
            value={assetForm.amount}
            onChange={e => setAssetForm(prev => ({ ...prev, amount: e.target.value }))}
            variant={assetErrors.amount ? 'error' : 'default'}
            errorMessage={assetErrors.amount}
          />
        </div>
      </Modal>
    </div>
  )
}

registerScreen({
  id: 'portfolio',
  name: 'Portfolio',
  description: 'AUM overview, asset allocation table, rebalancing activity, quick actions',
  route: '/portfolio',
  component: Portfolio,
})
