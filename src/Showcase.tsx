import { useState } from 'react'
import {
  Button, Input, Card, Modal, Badge, IconButton, Select, Tabs, Toast, Table,
  StatCard, ActivityRow, NotificationRow, RoleRow, LiabilityCard,
  AppTopBar, AppSidebar,
} from './components'
import { Settings, Search, RefreshCw } from 'lucide-react'

const semanticColors = [
  // Surfaces
  { name: 'surface-default',               var: '--surface-default' },
  { name: 'surface-subtle',                var: '--surface-subtle' },
  { name: 'surface-elevated',              var: '--surface-elevated' },
  { name: 'surface-action-primary',        var: '--surface-action-primary' },
  { name: 'surface-action-primary-hover',  var: '--surface-action-primary-hover' },
  { name: 'surface-action-ghost-hover',    var: '--surface-action-ghost-hover' },
  { name: 'surface-level-2',               var: '--surface-level-2' },
  { name: 'surface-level-3',               var: '--surface-level-3' },
  { name: 'surface-app-shell',             var: '--surface-app-shell' },
  // Text
  { name: 'text-default',   var: '--text-default' },
  { name: 'text-muted',     var: '--text-muted' },
  { name: 'text-accent',    var: '--text-accent' },
  { name: 'text-success',   var: '--text-success' },
  { name: 'text-warning',   var: '--text-warning' },
  { name: 'text-error',     var: '--text-error' },
  { name: 'text-on-action', var: '--text-on-action' },
  // Borders
  { name: 'border-default', var: '--border-default' },
  { name: 'border-focus',   var: '--border-focus' },
  { name: 'border-error',   var: '--border-error' },
  { name: 'border-warning', var: '--border-warning' },
  // Status
  { name: 'bg-success',        var: '--bg-success' },
  { name: 'bg-warning',        var: '--bg-warning' },
  { name: 'bg-error',          var: '--bg-error' },
  { name: 'bg-info',           var: '--bg-info' },
  { name: 'bg-success-subtle', var: '--bg-success-subtle' },
  { name: 'bg-warning-subtle', var: '--bg-warning-subtle' },
  { name: 'bg-error-subtle',   var: '--bg-error-subtle' },
  { name: 'bg-info-subtle',    var: '--bg-info-subtle' },
]

const typeStyles: { label: string; cls: string }[] = [
  { label: 'DS/Heading/4xl',      cls: 'ds-heading-4xl' },
  { label: 'DS/Heading/3xl',      cls: 'ds-heading-3xl' },
  { label: 'DS/Heading/2xl',      cls: 'ds-heading-2xl' },
  { label: 'DS/Heading/xl',       cls: 'ds-heading-xl' },
  { label: 'DS/Heading/lg',       cls: 'ds-heading-lg' },
  { label: 'DS/Body/base',        cls: 'ds-body-base' },
  { label: 'DS/Body/sm',          cls: 'ds-body-sm' },
  { label: 'DS/Body/sm Medium',   cls: 'ds-body-sm-medium' },
  { label: 'DS/Body/xs',          cls: 'ds-body-xs' },
  { label: 'DS/Label/xs',         cls: 'ds-label-xs' },
]

const tableColumns = [
  { key: 'rule', header: 'Rule' },
  { key: 'network', header: 'Network' },
  { key: 'amount', header: 'Amount' },
  { key: 'status', header: 'Status' },
]
const tableRows = [
  { rule: 'ETH Balance Guard', network: 'Arbitrum', amount: '$4 200 000', status: 'Success' },
  { rule: 'USDT Ceiling',      network: 'Arbitrum', amount: '—',          status: 'Paused' },
  { rule: 'stETH Target',      network: 'Ethereum', amount: '$1 800 000', status: 'Success' },
]

/* ─── Showcase ─────────────────────────────────────────── */
export function Showcase() {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [activeNav, setActiveNav] = useState<'portfolio' | 'rebalancing' | 'liability' | 'audit' | 'settings'>('portfolio')
  const [inputVal, setInputVal] = useState('')

  return (
    <div style={{ fontFamily: 'var(--font-sans)', background: 'var(--surface-subtle)', minHeight: '100vh' }}>

      {/* AppShell preview */}
      <section style={{ marginBottom: 0 }}>
        <AppTopBar />
      </section>

      <div style={{ display: 'flex' }}>
        <AppSidebar active={activeNav} onNavigate={setActiveNav} />

        <main style={{ flex: 1, padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

          {/* ── Section: Palette ─────────────────────── */}
          <Section title="Palette — Semantic Tokens">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              {semanticColors.map(({ name, var: v }) => (
                <SwatchItem key={name} name={name} cssVar={v} />
              ))}
            </div>
          </Section>

          {/* ── Section: Typography ──────────────────── */}
          <Section title="Typography — TextStyles">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', background: 'var(--surface-elevated)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
              {typeStyles.map(({ label, cls }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)' }}>
                  <span style={{ width: 180, fontSize: 'var(--size-xs)', color: 'var(--text-muted)', flexShrink: 0 }}>{label}</span>
                  <span className={cls} style={{ color: 'var(--text-default)' }}>The quick brown fox</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Section: Button ──────────────────────── */}
          <Section title="Button">
            <Row>
              <Button variant="primary" size="sm">Primary SM</Button>
              <Button variant="primary" size="md">Primary MD</Button>
              <Button variant="primary" size="lg">Primary LG</Button>
              <Button variant="primary" size="md" disabled>Disabled</Button>
              <Button variant="primary" size="md" loading>Loading</Button>
            </Row>
            <Row>
              <Button variant="secondary" size="md">Secondary</Button>
              <Button variant="ghost" size="md">Ghost</Button>
              <Button variant="secondary" size="md" icon={<RefreshCw size={14} />}>With Icon</Button>
            </Row>
          </Section>

          {/* ── Section: Input ───────────────────────── */}
          <Section title="Input">
            <Row wrap>
              <div style={{ width: 240 }}>
                <Input placeholder="Default input" value={inputVal} onChange={e => setInputVal(e.target.value)} />
              </div>
              <div style={{ width: 240 }}>
                <Input label="With label" placeholder="Enter value" />
              </div>
              <div style={{ width: 240 }}>
                <Input variant="error" placeholder="Error state" errorMessage="This field is required" />
              </div>
              <div style={{ width: 240 }}>
                <Input placeholder="Disabled" disabled />
              </div>
            </Row>
          </Section>

          {/* ── Section: Badge ───────────────────────── */}
          <Section title="Badge">
            <Row>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </Row>
          </Section>

          {/* ── Section: Card ────────────────────────── */}
          <Section title="Card">
            <Row wrap>
              <Card
                title="Portfolio Rebalancing"
                description="Automated rule-based rebalancing for institutional portfolios."
                action="View rules →"
                style={{ width: 280 } as React.CSSProperties}
              />
              <Card
                state="hover"
                title="Hover State"
                description="Stronger border and shadow on hover."
                action="Learn more →"
                style={{ width: 280 } as React.CSSProperties}
              />
            </Row>
          </Section>

          {/* ── Section: Modal ───────────────────────── */}
          <Section title="Modal">
            <Button variant="secondary" size="md" onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Modal
              open={modalOpen}
              title="Confirm Action"
              onClose={() => setModalOpen(false)}
              footer={
                <>
                  <Button variant="ghost" size="md" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" size="md" onClick={() => setModalOpen(false)}>Confirm</Button>
                </>
              }
            >
              Are you sure you want to proceed? This action will execute the rebalancing rule immediately.
            </Modal>
          </Section>

          {/* ── Section: IconButton ──────────────────── */}
          <Section title="IconButton">
            <Row>
              <IconButton icon={<Settings size={16} />} label="Settings" />
              <IconButton icon={<Search size={16} />} label="Search" />
              <IconButton icon={<RefreshCw size={16} />} label="Refresh" disabled />
            </Row>
          </Section>

          {/* ── Section: Select ──────────────────────── */}
          <Section title="Select">
            <Row>
              <Select
                placeholder="All Types"
                options={[
                  { value: 'rebalance', label: 'Rebalancing' },
                  { value: 'bridge', label: 'Bridge' },
                  { value: 'paused', label: 'Rule Paused' },
                  { value: 'system', label: 'System' },
                ]}
              />
              <Select
                placeholder="All Statuses"
                options={[
                  { value: 'success', label: 'Success' },
                  { value: 'warning', label: 'Warning' },
                  { value: 'error', label: 'Error' },
                ]}
              />
            </Row>
          </Section>

          {/* ── Section: Tabs ────────────────────────── */}
          <Section title="Tabs">
            <Tabs
              tabs={[
                { label: 'Profile', value: 'profile' },
                { label: 'Notifications', value: 'notifications' },
                { label: 'Security', value: 'security' },
                { label: 'Disabled', value: 'x', disabled: true },
              ]}
              active={activeTab}
              onChange={setActiveTab}
            />
            <div style={{ padding: 'var(--space-4)', fontSize: 'var(--size-sm)', color: 'var(--text-muted)' }}>
              Active tab: <strong style={{ color: 'var(--text-default)' }}>{activeTab}</strong>
            </div>
          </Section>

          {/* ── Section: Toast ───────────────────────── */}
          <Section title="Toast">
            <Row wrap>
              <Toast variant="success">Rebalancing rule saved successfully.</Toast>
              <Toast variant="warning">Gas price approaching limit. Rule may skip.</Toast>
              <Toast variant="error">Transaction failed. Slippage exceeded 0.8%.</Toast>
            </Row>
          </Section>

          {/* ── Section: Table ───────────────────────── */}
          <Section title="Table">
            <Table density="default" columns={tableColumns} rows={tableRows} />
            <div style={{ marginTop: 'var(--space-3)' }}>
              <Table density="compact" columns={tableColumns} rows={tableRows} />
            </div>
          </Section>

          {/* ── Section: StatCard ────────────────────── */}
          <Section title="StatCard">
            <Row>
              <StatCard variant="neutral" label="Total AUM" value="$420M" subtitle="As of Jun 16, 2026" />
              <StatCard variant="success" label="ETH Allocation" value="30.2%" subtitle="Target: 30%" />
              <StatCard variant="warning" label="USDT Allocation" value="6.6%" subtitle="Target: 5% · +1.6%" />
            </Row>
          </Section>

          {/* ── Section: ActivityRow ─────────────────── */}
          <Section title="ActivityRow">
            <div style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <ActivityRow status="success" description="ETH Balance Guard: Sold $4.2M ETH → USDC" time="2h ago" statusLabel="Success" />
              <ActivityRow status="warning" description="USDT Ceiling paused — Slippage 1.2%" time="1d ago" statusLabel="Rule Paused" />
              <ActivityRow status="info" description="Cross-chain bridge initiated via Li.Fi" time="3h ago" statusLabel="Bridge" />
            </div>
          </Section>

          {/* ── Section: NotificationRow ─────────────── */}
          <Section title="NotificationRow">
            <div style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <NotificationRow
                status="success"
                title="Auto-rebalance completed"
                description="ETH Balance Guard: Sold $4.2M ETH → USDC · Arbitrum · Li.Fi"
                time="2h ago"
                badge={<Badge variant="success">Success</Badge>}
              />
              <NotificationRow
                status="warning"
                title="Rule paused: Slippage Guard triggered"
                description="USDT Ceiling: Slippage 1.2% exceeded 0.8% limit."
                time="1d ago"
                badge={<Badge variant="warning">Rule Paused</Badge>}
              />
              <NotificationRow
                status="info"
                title="System health check completed"
                description="All bridge providers operational. ETH / Arbitrum RPC connected."
                time="2d ago"
                badge={<Badge variant="info">System</Badge>}
              />
            </div>
          </Section>

          {/* ── Section: RoleRow ─────────────────────── */}
          <Section title="RoleRow">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <RoleRow
                status="active"
                name="James Harrington"
                role="CIO · Full access"
                address="0x4aB2...c1F8"
                badge={<Badge variant="success">Active</Badge>}
                actions={<Button variant="ghost" size="sm">Edit</Button>}
              />
              <RoleRow
                status="active"
                name="DeFi Operator"
                role="Execute only"
                address="0x9eC1...a3D2"
                badge={<Badge variant="success">Active</Badge>}
                actions={<Button variant="ghost" size="sm">Edit</Button>}
              />
              <RoleRow
                status="inactive"
                name="Emergency Contact"
                role="View only"
                address="ops@familyoffice.com"
                badge={<Badge variant="info">Inactive</Badge>}
                actions={<Button variant="ghost" size="sm">Edit</Button>}
              />
            </div>
          </Section>

          {/* ── Section: LiabilityCard ───────────────── */}
          <Section title="LiabilityCard">
            <Row wrap>
              <div style={{ flex: 1, minWidth: 260 }}>
                <LiabilityCard
                  type="autonomous"
                  title="Autonomous Rebalancing"
                  responsible="Smart Account Protocol"
                  description="Executed automatically per your rules. No manual approval required."
                  badge={<Badge variant="success">Covered</Badge>}
                />
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <LiabilityCard
                  type="bridge"
                  title="Bridge Operations"
                  responsible="Li.Fi Protocol"
                  description="Cross-chain transfers governed by Li.Fi terms. Slippage guard active."
                  badge={<Badge variant="success">Covered</Badge>}
                />
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <LiabilityCard
                  type="user"
                  title="Your Responsibility"
                  responsible="Account Owner"
                  description="Rule configuration, oversight, emergency stop authority."
                  badge={<Badge variant="info">Active</Badge>}
                />
              </div>
            </Row>
          </Section>

        </main>
      </div>
    </div>
  )
}

/* ─── Helpers ──────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="ds-heading-lg" style={{ color: 'var(--text-default)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-default)' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Row({ children, wrap }: { children: React.ReactNode; wrap?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: wrap ? 'wrap' : 'nowrap' }}>
      {children}
    </div>
  )
}

function SwatchItem({ name, cssVar }: { name: string; cssVar: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 96 }}>
      <div style={{
        width: 64,
        height: 40,
        borderRadius: 'var(--radius-sm)',
        background: `var(${cssVar})`,
        border: '1px solid var(--border-default)',
      }} />
      <span style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-all' }}>{name}</span>
    </div>
  )
}
