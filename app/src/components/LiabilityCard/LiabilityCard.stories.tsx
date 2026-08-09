import type { Meta, StoryObj } from '@storybook/react-vite'
import { LiabilityCard } from './LiabilityCard'
import { Badge } from '../Badge/Badge'

/** LiabilityCard — карточка ответственности с иконкой типа. Матрица: Type = autonomous | bridge | user. */
const meta = {
  title: 'Components/LiabilityCard',
  component: LiabilityCard,
  tags: ['autodocs'],
  args: {
    type: 'autonomous',
    title: 'Rebalancing Execution',
    responsible: 'Autonomous Agent',
    description: 'Agent-initiated rebalancing within pre-approved rule parameters. Executed without human intervention.',
  },
  argTypes: {
    type:        { control: 'inline-radio', options: ['autonomous', 'bridge', 'user'] },
    title:       { control: 'text' },
    responsible: { control: 'text' },
    description: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof LiabilityCard>

export default meta
type Story = StoryObj<typeof meta>

export const Autonomous: Story = {
  args: {
    type: 'autonomous',
    title: 'Rebalancing Execution',
    responsible: 'Autonomous Agent',
    description: 'Agent-initiated rebalancing within pre-approved rule parameters.',
    badge: <Badge variant="success">Active</Badge>,
  },
}

export const Bridge: Story = {
  args: {
    type: 'bridge',
    title: 'Cross-chain Bridge',
    responsible: 'Bridge Protocol',
    description: 'Stargate Finance handles token transfer. Protocol-level responsibility for bridge execution.',
    badge: <Badge variant="info">Protocol</Badge>,
  },
}

export const User: Story = {
  args: {
    type: 'user',
    title: 'Rule Configuration',
    responsible: 'James Harrington',
    description: 'User-defined rule parameters. Portfolio Manager retains liability for strategic allocation decisions.',
    badge: <Badge variant="warning">Manual</Badge>,
  },
}

/** Матрица Type — все три рядом. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <LiabilityCard
        type="autonomous"
        title="Rebalancing Execution"
        responsible="Autonomous Agent"
        description="Agent-initiated rebalancing within pre-approved rule parameters."
        badge={<Badge variant="success">Active</Badge>}
      />
      <LiabilityCard
        type="bridge"
        title="Cross-chain Bridge"
        responsible="Bridge Protocol"
        description="Stargate Finance handles token transfer. Protocol-level responsibility."
        badge={<Badge variant="info">Protocol</Badge>}
      />
      <LiabilityCard
        type="user"
        title="Rule Configuration"
        responsible="James Harrington"
        description="User-defined rule parameters. Portfolio Manager retains liability."
        badge={<Badge variant="warning">Manual</Badge>}
      />
    </div>
  ),
}
