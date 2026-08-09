import type { Meta, StoryObj } from '@storybook/react-vite'
import { ActivityRow } from './ActivityRow'

/** ActivityRow — строка активности с цветным статусом. Матрица: Status = success | warning | info. */
const meta = {
  title: 'Components/ActivityRow',
  component: ActivityRow,
  tags: ['autodocs'],
  args: {
    status: 'success',
    description: 'ETH rebalanced: 1.2 ETH moved from Ethereum to Arbitrum',
    time: '2m ago',
    statusLabel: 'Completed',
  },
  argTypes: {
    status:      { control: 'inline-radio', options: ['success', 'warning', 'info'] },
    description: { control: 'text' },
    time:        { control: 'text' },
    statusLabel: { control: 'text' },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ActivityRow>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    status: 'success',
    description: 'ETH rebalanced: 1.2 ETH moved from Ethereum to Arbitrum',
    time: '2m ago',
    statusLabel: 'Completed',
  },
}

export const Warning: Story = {
  args: {
    status: 'warning',
    description: 'ETH allocation at 28.4% — approaching 30% target drift threshold',
    time: '15m ago',
    statusLabel: 'Attention',
  },
}

export const Info: Story = {
  args: {
    status: 'info',
    description: 'Cross-chain bridge initiated: 50,000 USDC Ethereum → Optimism via Stargate',
    time: '1h ago',
    statusLabel: 'In Progress',
  },
}

/** Матрица Status — лента активности. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ width: 520, border: '1px solid var(--border-default)', borderRadius: 8, overflow: 'hidden' }}>
      <ActivityRow status="success" description="ETH rebalanced: 1.2 ETH moved from Ethereum to Arbitrum" time="2m ago" statusLabel="Completed" />
      <ActivityRow status="info"    description="Cross-chain bridge initiated: 50,000 USDC Ethereum → Optimism" time="15m ago" statusLabel="In Progress" />
      <ActivityRow status="warning" description="ETH allocation at 28.4% — approaching drift threshold" time="45m ago" statusLabel="Attention" />
      <ActivityRow status="success" description="USDC liquidity rule checked — within target 15%" time="1h ago" statusLabel="Completed" />
      <ActivityRow status="info"    description="Audit log snapshot generated and signed" time="6h ago" statusLabel="Info" />
    </div>
  ),
}
