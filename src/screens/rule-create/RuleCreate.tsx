import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { TopNav, Input, Select, Button, Card } from '../../components'
import { registerScreen } from '../registry'
import { addRule, ruleNameExists } from '../../data/rules'
import { gasReserveStore, isGasReserveLow, GAS_RESERVE_MINIMUM_USD } from '../../data/gas'
import { showToast } from '../../lib/toast'
import styles from './RuleCreate.module.css'

const assetOptions = [
  { value: 'ETH', label: 'ETH' },
  { value: 'stETH', label: 'stETH' },
  { value: 'USDT', label: 'USDT' },
  { value: 'RWA', label: 'RWA' },
  { value: 'USDC', label: 'USDC' },
]
const networkOptions = [
  { value: 'Ethereum', label: 'Ethereum' },
  { value: 'Arbitrum', label: 'Arbitrum' },
]
const conditionOptions = [
  { value: '>', label: '>' },
  { value: '<', label: '<' },
]
const actionOptions = [
  { value: 'Sell to rebalance', label: 'Sell to rebalance' },
  { value: 'Buy to rebalance', label: 'Buy to rebalance' },
]

const currentAllocation: Record<string, number> = {
  ETH: 32, stETH: 18.3, USDT: 6.6, RWA: 45, USDC: 43.1,
}

interface FormState {
  ruleName: string
  description: string
  asset: string
  network: string
  conditionOp: string
  threshold: string
  action: string
  sellFrom: string
  sellInto: string
  targetNetwork: string
  targetAllocation: string
  maxSlippage: string
  maxGasPrice: string
}

const initialForm: FormState = {
  ruleName: '',
  description: '',
  asset: 'ETH',
  network: 'Ethereum',
  conditionOp: '>',
  threshold: '35',
  action: 'Sell to rebalance',
  sellFrom: 'ETH',
  sellInto: 'USDC',
  targetNetwork: 'Arbitrum',
  targetAllocation: '30',
  maxSlippage: '0.8',
  maxGasPrice: '25',
}

type FormErrors = Partial<Record<keyof FormState, string>>

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!form.ruleName.trim()) errors.ruleName = 'Rule name is required'
  else if (ruleNameExists(form.ruleName)) errors.ruleName = 'A rule with this name already exists'

  const threshold = Number(form.threshold)
  if (form.threshold.trim() === '' || Number.isNaN(threshold) || threshold < 0 || threshold > 100) {
    errors.threshold = '0–100'
  }

  const targetAllocation = Number(form.targetAllocation)
  if (form.targetAllocation.trim() === '' || Number.isNaN(targetAllocation) || targetAllocation < 0 || targetAllocation > 100) {
    errors.targetAllocation = 'Must be 0–100%'
  }

  const maxSlippage = Number(form.maxSlippage)
  if (form.maxSlippage.trim() === '' || Number.isNaN(maxSlippage) || maxSlippage <= 0 || maxSlippage > 100) {
    errors.maxSlippage = 'Must be a positive %, up to 100'
  }

  const maxGasPrice = Number(form.maxGasPrice)
  if (form.maxGasPrice.trim() === '' || Number.isNaN(maxGasPrice) || maxGasPrice <= 0) {
    errors.maxGasPrice = 'Must be a positive number'
  }

  return errors
}

export function RuleCreate() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [pendingAction, setPendingAction] = useState<'activate' | 'draft' | null>(null)
  const gasReserve = gasReserveStore.useStore()
  const gasLow = isGasReserveLow(gasReserve.balanceUsd)

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleSubmit(asDraft: boolean) {
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      showToast('error', 'Please fix the highlighted fields')
      return
    }

    if (!asDraft && gasLow) {
      showToast('error', 'Gas reserve too low to activate rules. Save as draft instead.')
      return
    }

    setPendingAction(asDraft ? 'draft' : 'activate')

    const ruleName = form.ruleName.trim()
    setTimeout(() => {
      addRule({
        name: ruleName,
        description: form.description.trim() || `${form.asset} ${form.conditionOp} ${form.threshold}% → ${form.action.split(' ')[0].toLowerCase()} ${form.sellFrom === form.asset ? form.sellInto : form.sellFrom}`,
        network: form.network === form.targetNetwork ? form.network : `Cross-chain: ${form.network} → ${form.targetNetwork}`,
        crossChain: form.network !== form.targetNetwork,
        asset: form.asset,
        conditionOp: form.conditionOp,
        threshold: Number(form.threshold),
        action: form.action,
        sellFrom: form.sellFrom,
        sellInto: form.sellInto,
        targetNetwork: form.targetNetwork,
        targetAllocation: Number(form.targetAllocation),
        maxSlippage: Number(form.maxSlippage),
        maxGasPrice: Number(form.maxGasPrice),
      }, asDraft)

      showToast('success', asDraft ? `"${ruleName}" saved as draft` : `"${ruleName}" created and activated`)
      navigate('/rebalancing-rules')
    }, 600)
  }

  const isCrossChain = form.network !== form.targetNetwork
  const verb = form.action.split(' ')[0]
  const allocation = currentAllocation[form.asset] ?? 0

  return (
    <div className={styles.screen}>
      <TopNav active="rebalancing" />

      <div className={styles.body}>
        <main className={styles.main}>
          {/* PageHeader */}
          <div className={styles.pageHeader}>
            <div className={styles.breadcrumb}>
              <a href="#" className={styles.breadcrumbAccent} onClick={e => { e.preventDefault(); navigate('/rebalancing-rules') }}>Rebalancing Rules</a>
              <span className={styles.breadcrumbMuted}>/</span>
              <span className={styles.breadcrumbMuted}>Create Rule</span>
            </div>
            <span className={styles.pageTitle}>Create Rebalancing Rule</span>
          </div>

          {/* ContentArea */}
          <div className={styles.contentArea}>
            {/* FormColumn */}
            <div className={styles.formColumn}>
              {/* Rule Identity */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Rule Identity</h2>
                <div className={styles.fieldNarrow}>
                  <label className={styles.fieldLabel}>Rule Name</label>
                  <Input
                    placeholder="e.g. ETH Rebalancing Guard"
                    value={form.ruleName}
                    onChange={e => update('ruleName', e.target.value)}
                    variant={errors.ruleName ? 'error' : 'default'}
                    errorMessage={errors.ruleName}
                  />
                </div>
                <div className={styles.fieldFull}>
                  <label className={styles.fieldLabel}>Description (optional)</label>
                  <Input
                    placeholder="Keeps allocation within target range"
                    value={form.description}
                    onChange={e => update('description', e.target.value)}
                  />
                </div>
              </section>

              {/* Trigger */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>When should the rule fire?</h2>
                <div className={styles.assetNetworkRow}>
                  <div className={styles.fieldGrow}>
                    <label className={styles.fieldLabel}>Asset</label>
                    <Select options={assetOptions} value={form.asset} onChange={e => update('asset', e.target.value)} className={styles.selectFill} />
                  </div>
                  <div className={styles.fieldGrow}>
                    <label className={styles.fieldLabel}>Network</label>
                    <Select options={networkOptions} value={form.network} onChange={e => update('network', e.target.value)} className={styles.selectFill} />
                  </div>
                </div>
                <div className={styles.conditionRow}>
                  <span className={styles.conditionLabel}>If allocation</span>
                  <Select options={conditionOptions} value={form.conditionOp} onChange={e => update('conditionOp', e.target.value)} />
                  <Input
                    value={form.threshold}
                    onChange={e => update('threshold', e.target.value)}
                    className={styles.smallInput}
                    variant={errors.threshold ? 'error' : 'default'}
                  />
                  <span className={styles.conditionLabel}>%</span>
                </div>
                {errors.threshold && <span className={styles.fieldError}>{errors.threshold}</span>}
                <p className={styles.helperText}>Current {form.asset}: {allocation}% — rule will not fire until threshold is reached</p>
              </section>

              {/* Action */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>What should happen?</h2>
                <div className={styles.fieldNarrow}>
                  <label className={styles.fieldLabel}>Action</label>
                  <Select options={actionOptions} value={form.action} onChange={e => update('action', e.target.value)} />
                </div>
                <div className={styles.sellRow}>
                  <span className={styles.sellLabel}>{verb}</span>
                  <Select options={assetOptions} value={form.sellFrom} onChange={e => update('sellFrom', e.target.value)} />
                  <span className={styles.sellLabel}>into</span>
                  <Select options={assetOptions} value={form.sellInto} onChange={e => update('sellInto', e.target.value)} />
                </div>
                <div className={styles.fieldNarrow}>
                  <label className={styles.fieldLabel}>Target network for swap</label>
                  <Select options={networkOptions} value={form.targetNetwork} onChange={e => update('targetNetwork', e.target.value)} />
                </div>
                <p className={styles.helperText}>Different network? Cross-chain Bridge will be used automatically · powered by Li.Fi</p>
                {isCrossChain && (
                  <div className={styles.crossChainBox}>
                    <span className={styles.crossChainTitle}>Cross-chain execution: {form.sellFrom} will be bridged {form.network} → {form.targetNetwork} before swap.</span>
                    <span className={styles.crossChainSubtitle}>Est. bridge time: ~40 sec. Bridge fee included in slippage tolerance.</span>
                  </div>
                )}
                <div className={styles.fieldWide}>
                  <label className={styles.fieldLabel}>Target allocation after rebalance</label>
                  <Input
                    value={form.targetAllocation}
                    onChange={e => update('targetAllocation', e.target.value)}
                    variant={errors.targetAllocation ? 'error' : 'default'}
                    errorMessage={errors.targetAllocation}
                  />
                </div>
              </section>

              {/* Safety */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Safety &amp; Execution</h2>
                <div className={styles.safeRow}>
                  <div className={styles.fieldWide}>
                    <label className={styles.fieldLabel}>Max slippage tolerance</label>
                    <Input
                      value={form.maxSlippage}
                      onChange={e => update('maxSlippage', e.target.value)}
                      variant={errors.maxSlippage ? 'error' : 'default'}
                      errorMessage={errors.maxSlippage}
                    />
                  </div>
                  <div className={styles.fieldWide}>
                    <label className={styles.fieldLabel}>Max gas price</label>
                    <Input
                      value={form.maxGasPrice}
                      onChange={e => update('maxGasPrice', e.target.value)}
                      variant={errors.maxGasPrice ? 'error' : 'default'}
                      errorMessage={errors.maxGasPrice}
                    />
                  </div>
                </div>
              </section>

              {gasLow && (
                <div className={styles.gasBanner} data-track="gas-reserve-low-banner">
                  <AlertTriangle size={14} className={styles.gasBannerIcon} />
                  <span>
                    Low gas reserve: ${gasReserve.balanceUsd} USD (minimum ${GAS_RESERVE_MINIMUM_USD} USD required to activate rules).
                    You can still save this rule as a draft.
                  </span>
                </div>
              )}

              {/* CTARow */}
              <div className={styles.ctaRow}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleSubmit(false)}
                  loading={pendingAction === 'activate'}
                  disabled={gasLow || pendingAction === 'draft'}
                  data-track="save-activate-rule"
                >
                  Save &amp; Activate Rule
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleSubmit(true)}
                  loading={pendingAction === 'draft'}
                  disabled={pendingAction === 'activate'}
                  data-track="save-draft-rule"
                >
                  Save as Draft
                </Button>
                <Button variant="ghost" size="md" onClick={() => navigate('/rebalancing-rules')} disabled={pendingAction !== null}>Cancel</Button>
              </div>
            </div>

            {/* PreviewColumn */}
            <div className={styles.previewColumn}>
              <Card
                title="Live Preview"
                description="This panel updates as you fill out the form. Review every setting before saving — you can edit the rule anytime after creation."
                className={styles.summaryCard}
              />

              <div className={styles.previewContent}>
                <h2 className={styles.sectionTitle}>Rule Preview</h2>
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Name</span>
                  <span className={styles.previewValue}>{form.ruleName || '—'}</span>
                </div>
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Trigger</span>
                  <span className={styles.previewValue}>{form.asset} {form.conditionOp} {form.threshold || '—'}% on {form.network}</span>
                </div>
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Action</span>
                  <span className={styles.previewValue}>{verb} {form.sellFrom} → {form.sellInto} on {form.targetNetwork}</span>
                </div>
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Execution</span>
                  <span className={styles.previewValue}>{isCrossChain ? 'Cross-chain via Bridge (Li.Fi)' : 'Same-chain'}</span>
                </div>
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Target alloc</span>
                  <span className={styles.previewValue}>{form.targetAllocation || '—'}%</span>
                </div>
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Slippage guard</span>
                  <span className={styles.previewValue}>{form.maxSlippage || '—'}% (incl. bridge fee)</span>
                </div>
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Status</span>
                  <span className={styles.previewValueSuccess}>Will activate immediately</span>
                </div>
              </div>

              <Card
                title="Estimated Impact"
                description={`At current portfolio: ${allocation === Number(form.threshold) ? 'threshold met now' : 'no action needed'} (${form.asset} at ${allocation}%)`}
                action={`Would trigger at: ~$14 700 000 · Estimated swap: ~$9 800 000`}
                className={styles.estimatedImpactCard}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

registerScreen({
  id: 'rule-create',
  name: 'Create Rule',
  description: 'Multi-section rebalancing rule form with live rule preview and estimated impact',
  route: '/rule-create',
  component: RuleCreate,
})
