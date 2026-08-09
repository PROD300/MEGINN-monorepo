import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'

/** Card — контейнер с заголовком, описанием и action-ссылкой. Матрица: State = default | hover. */
const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    state: 'default',
    title: 'ETH Rebalancing Rule',
    description: 'Maintains ETH allocation at 30% of portfolio across Ethereum and Arbitrum.',
    action: 'View details →',
  },
  argTypes: {
    state:       { control: 'inline-radio', options: ['default', 'hover'] },
    title:       { control: 'text' },
    description: { control: 'text' },
    action:      { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { state: 'default' } }
export const Hover: Story   = { args: { state: 'hover' } }

export const MinimalNoAction: Story = {
  args: { action: undefined, description: undefined, title: 'Bridge Provider' },
}

/** Матрица State. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <Card
        state="default"
        title="ETH Rebalancing Rule"
        description="Maintains ETH allocation at 30% of portfolio across Ethereum and Arbitrum."
        action="View details →"
      />
      <Card
        state="hover"
        title="ETH Rebalancing Rule"
        description="Maintains ETH allocation at 30% of portfolio across Ethereum and Arbitrum."
        action="View details →"
      />
      <Card
        state="default"
        title="Cross-chain Bridge"
        description="Stargate Finance — avg 2m 15s · $4.2M volume."
        action="Configure →"
      />
    </div>
  ),
}
