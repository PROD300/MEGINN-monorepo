import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../components/Button/Button'
import { Input } from '../components/Input/Input'
import { Select } from '../components/Select/Select'
import { Badge } from '../components/Badge/Badge'
import { Modal } from '../components/Modal/Modal'
import { Tabs } from '../components/Tabs/Tabs'
import { Table } from '../components/Table/Table'
import { Toast } from '../components/Toast/Toast'
import { StatCard } from '../components/StatCard/StatCard'
import { ActivityRow } from '../components/ActivityRow/ActivityRow'
import { TopNav, type NavItemId } from '../components/TopNav/TopNav'

// ─── Sandbox: Modal Form ───────────────────────────────────────────────────────

function ModalSandbox() {
  const [open, setOpen] = useState(false)
  const [nameError, setNameError] = useState('')

  function handleCreate() {
    setNameError('')
    setOpen(false)
  }

  return (
    <div style={{ padding: 24 }}>
      <Button variant="primary" onClick={() => setOpen(true)}>New Rebalancing Rule</Button>
      <Modal
        open={open}
        title="New Rebalancing Rule"
        onClose={() => setOpen(false)}
        footer={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleCreate}>Create Rule</Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input
            label="Rule name"
            placeholder="ETH Target 30%"
            variant={nameError ? 'error' : 'default'}
            errorMessage={nameError}
          />
          <Input label="Target allocation (%)" placeholder="30.00" type="number" />
          <Input label="Drift threshold (%)" placeholder="2.00" type="number" />
          <Select
            options={[
              { value: 'ethereum', label: 'Ethereum' },
              { value: 'arbitrum', label: 'Arbitrum' },
              { value: 'optimism', label: 'Optimism' },
              { value: 'base',     label: 'Base' },
            ]}
            placeholder="Select network..."
          />
        </div>
      </Modal>
    </div>
  )
}

// ─── Sandbox: Form with validation ────────────────────────────────────────────

function FormSandbox() {
  const [submitted, setSubmitted] = useState(false)
  const [amount, setAmount] = useState('')
  const amountError = submitted && !amount ? 'Amount is required' : ''

  return (
    <div style={{ width: 360, padding: 24, background: 'var(--surface-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: 'var(--text-default)', marginBottom: 20 }}>
        Rebalancing Rule
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input label="Rule name" placeholder="ETH Target 30%" />
        <Input
          label="Target allocation (%)"
          placeholder="30.00"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          variant={amountError ? 'error' : 'default'}
          errorMessage={amountError}
        />
        <Input label="Drift threshold (%)" placeholder="2.00" />
        <Select
          options={[
            { value: 'eth', label: 'ETH' },
            { value: 'usdc', label: 'USDC' },
            { value: 'wbtc', label: 'WBTC' },
          ]}
          placeholder="Select asset..."
        />
        <Select
          options={[
            { value: 'ethereum', label: 'Ethereum' },
            { value: 'arbitrum', label: 'Arbitrum' },
            { value: 'optimism', label: 'Optimism' },
          ]}
          placeholder="Select network..."
        />
        {submitted && !amountError && (
          <Toast variant="success">Rule created successfully</Toast>
        )}
        {amountError && (
          <Toast variant="error">Please fill in all required fields</Toast>
        )}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
          <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={() => setSubmitted(true)}>Create Rule</Button>
        </div>
      </div>
    </div>
  )
}

// ─── Sandbox: Navigation ──────────────────────────────────────────────────────

function NavigationSandbox() {
  const [tab, setTab] = useState('overview')

  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Positions', value: 'positions' },
    { label: 'History', value: 'history' },
    { label: 'Risk', value: 'risk' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 500, overflow: 'hidden', border: '1px solid var(--border-default)', borderRadius: 8 }}>
      <TopNav active={'portfolio' as NavItemId} userName="James Harrington" initials="JH" hasNotification />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', flex: 1, background: 'var(--surface-level-1)', overflow: 'auto' }}>
          <Tabs tabs={tabs} active={tab} onChange={setTab} />
          <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <StatCard variant="neutral" label="Portfolio AUM"  value="$12.4M"  subtitle="As of Jun 17, 2026" />
            <StatCard variant="success" label="Active Rules"   value="12 / 14" subtitle="All within threshold" />
            <StatCard variant="warning" label="ETH Allocation" value="28.4%"   subtitle="Target 30% — drift –1.6%" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Sandbox: Data + Feedback ─────────────────────────────────────────────────

type RuleRow = { name: string; network: string; target: string; current: string; status: string; triggered: string }

const ruleColumns = [
  { key: 'name',      header: 'Rule Name' },
  { key: 'network',   header: 'Network' },
  { key: 'target',    header: 'Target' },
  { key: 'current',   header: 'Current' },
  {
    key: 'status',
    header: 'Status',
    render: (row: RuleRow) => (
      <Badge variant={row.status === 'Active' ? 'success' : row.status === 'Paused' ? 'warning' : 'error'}>
        {row.status}
      </Badge>
    ),
  },
  { key: 'triggered', header: 'Last Triggered' },
]

const ruleRows: RuleRow[] = [
  { name: 'ETH Target 30%',  network: 'Ethereum / Arbitrum', target: '30.0%', current: '28.4%', status: 'Active', triggered: '2h ago' },
  { name: 'USDC Liquidity',  network: 'Ethereum',            target: '15.0%', current: '15.1%', status: 'Active', triggered: '6h ago' },
  { name: 'BTC Allocation',  network: 'Ethereum / Base',     target: '20.0%', current: '22.3%', status: 'Paused', triggered: '1d ago' },
  { name: 'ARB Yield Route', network: 'Arbitrum',            target: '10.0%', current: '9.8%',  status: 'Active', triggered: '45m ago' },
]

function DataFeedbackSandbox() {
  const [toast, setToast] = useState<{ variant: 'success' | 'warning' | 'error'; text: string } | null>(null)

  function handleAction(label: string) {
    setToast({ variant: 'success', text: `${label} executed` })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button variant="primary" size="sm" onClick={() => handleAction('New rule created')}>New Rule</Button>
        <Button variant="secondary" size="sm" onClick={() => setToast({ variant: 'warning', text: 'ETH allocation approaching threshold' })}>
          Trigger Warning
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setToast({ variant: 'error', text: 'Bridge transaction failed on Optimism' })}>
          Trigger Error
        </Button>
      </div>

      {toast && <Toast variant={toast.variant}>{toast.text}</Toast>}

      <Table density="default" columns={ruleColumns} rows={ruleRows} />

      <div style={{ border: '1px solid var(--border-default)', borderRadius: 8, overflow: 'hidden' }}>
        <ActivityRow status="success" description="ETH rebalanced: 1.2 ETH moved from Ethereum to Arbitrum" time="2m ago" statusLabel="Completed" />
        <ActivityRow status="info"    description="Cross-chain bridge: 50,000 USDC → Optimism via Stargate" time="15m ago" statusLabel="In Progress" />
        <ActivityRow status="warning" description="ETH allocation at 28.4% — approaching drift threshold" time="45m ago" statusLabel="Attention" />
      </div>
    </div>
  )
}

// ─── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Sandboxes/Overview',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Modal + Input + Select + Badge + Button в связке — диалог создания правила. */
export const ModalForm: Story = {
  render: () => <ModalSandbox />,
}

/** Form — Input / Select / Toast / Button — состояния ошибки и успеха. */
export const Form: Story = {
  render: () => <FormSandbox />,
}

/** Navigation — TopNav + Tabs + StatCard в одном контексте. */
export const Navigation: Story = {
  render: () => <NavigationSandbox />,
}

/** Data & Feedback — Table + ActivityRow + Toast + Button в одном блоке. */
export const DataFeedback: Story = {
  render: () => <DataFeedbackSandbox />,
}
