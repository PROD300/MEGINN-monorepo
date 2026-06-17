import type { Meta, StoryObj } from '@storybook/react-vite'
import { NotificationRow } from './NotificationRow'
import { Badge } from '../Badge/Badge'

/** NotificationRow — строка уведомления с цветной точкой. Матрица: Status = success | info | warning. */
const meta = {
  title: 'Components/NotificationRow',
  component: NotificationRow,
  tags: ['autodocs'],
  args: {
    status: 'success',
    title: 'Rule executed',
    description: 'ETH rebalancing completed — 1.2 ETH moved to Arbitrum.',
    time: '2 min ago',
  },
  argTypes: {
    status:      { control: 'inline-radio', options: ['success', 'info', 'warning'] },
    title:       { control: 'text' },
    description: { control: 'text' },
    time:        { control: 'text' },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof NotificationRow>

export default meta
type Story = StoryObj<typeof meta>

export const SuccessStatus: Story = {
  args: {
    status: 'success',
    title: 'Rule executed',
    description: 'ETH rebalancing completed — 1.2 ETH moved to Arbitrum.',
    time: '2 min ago',
    badge: <Badge variant="success">Completed</Badge>,
  },
}

export const InfoStatus: Story = {
  args: {
    status: 'info',
    title: 'Bridge in progress',
    description: '50,000 USDC bridging from Ethereum to Optimism via Stargate.',
    time: '15 min ago',
    badge: <Badge variant="info">Pending</Badge>,
  },
}

export const WarningStatus: Story = {
  args: {
    status: 'warning',
    title: 'Threshold approaching',
    description: 'ETH allocation at 28.4% — target is 30%, drift –1.6%.',
    time: '1 hr ago',
    badge: <Badge variant="warning">Attention</Badge>,
  },
}

/** Матрица Status — лента уведомлений. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ width: 520, border: '1px solid var(--border-default)', borderRadius: 8, overflow: 'hidden' }}>
      <NotificationRow
        status="success"
        title="Rule executed"
        description="ETH rebalancing completed — 1.2 ETH moved to Arbitrum."
        time="2 min ago"
        badge={<Badge variant="success">Completed</Badge>}
      />
      <NotificationRow
        status="info"
        title="Bridge in progress"
        description="50,000 USDC bridging from Ethereum to Optimism via Stargate."
        time="15 min ago"
        badge={<Badge variant="info">Pending</Badge>}
      />
      <NotificationRow
        status="warning"
        title="Threshold approaching"
        description="ETH allocation at 28.4% — target 30%, drift –1.6%."
        time="1 hr ago"
        badge={<Badge variant="warning">Attention</Badge>}
      />
      <NotificationRow
        status="success"
        title="Audit log signed"
        description="Daily snapshot generated and cryptographically signed."
        time="6 hr ago"
        badge={<Badge variant="success">Signed</Badge>}
      />
    </div>
  ),
}
