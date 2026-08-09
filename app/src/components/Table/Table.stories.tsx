import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from './Table'
import { Badge } from '../Badge/Badge'

type RuleRow = {
  name: string
  network: string
  target: string
  current: string
  status: string
  triggered: string
}

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
  { name: 'ETH Target 30%',    network: 'Ethereum / Arbitrum', target: '30.0%', current: '28.4%', status: 'Active',  triggered: '2h ago' },
  { name: 'USDC Liquidity',    network: 'Ethereum',            target: '15.0%', current: '15.1%', status: 'Active',  triggered: '6h ago' },
  { name: 'BTC Allocation',    network: 'Ethereum / Base',     target: '20.0%', current: '22.3%', status: 'Paused',  triggered: '1d ago' },
  { name: 'ARB Yield Route',   network: 'Arbitrum',            target: '10.0%', current: '9.8%',  status: 'Active',  triggered: '45m ago' },
  { name: 'OP Bridge Reserve', network: 'Optimism',            target: '5.0%',  current: '0.0%',  status: 'Error',   triggered: '3d ago' },
]

/** Table — таблица данных с двумя плотностями: default / compact. */
const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    density: 'default',
    columns: ruleColumns,
    rows: ruleRows,
  },
  argTypes: {
    density: { control: 'inline-radio', options: ['default', 'compact'] },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { density: 'default' } }
export const Compact: Story = { args: { density: 'compact' } }

/** Матрица density — обе рядом. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Density: default</p>
        <Table density="default" columns={ruleColumns} rows={ruleRows} />
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Density: compact</p>
        <Table density="compact" columns={ruleColumns} rows={ruleRows} />
      </div>
    </div>
  ),
}
