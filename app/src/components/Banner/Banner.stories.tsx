import type { Meta, StoryObj } from '@storybook/react-vite'
import { Banner } from './Banner'

/** Banner — floating panel notice, sits directly under TopNav. Same floating-tile
 * recipe as the rest of the kit (border-hairline + shadow-float, radius-md), aligned
 * to the page's max-width container — not full-bleed. Variants: info / success / warning / error. */
const meta = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  args: {
    variant: 'info',
    children: 'Cross-chain Bridge — required dependency of AI Auto-Rebalancing.',
  },
  argTypes: {
    variant:  { control: 'inline-radio', options: ['info', 'success', 'warning', 'error'] },
    children: { control: 'text' },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: { variant: 'info', children: 'Cross-chain Bridge — required dependency of AI Auto-Rebalancing.' },
}

export const Success: Story = {
  args: { variant: 'success', children: 'All allocations within target' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Next rebalance trigger: ETH allocation +2.0% above target' },
}

export const Error: Story = {
  args: { variant: 'error', children: 'This action will immediately halt ALL automated operations.' },
}

/** Матрица Variant — все четыре друг под другом. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Banner variant="info">Cross-chain Bridge — required dependency of AI Auto-Rebalancing.</Banner>
      <Banner variant="success">All allocations within target</Banner>
      <Banner variant="warning">Next rebalance trigger: ETH allocation +2.0% above target</Banner>
      <Banner variant="error">This action will immediately halt ALL automated operations.</Banner>
    </div>
  ),
}
