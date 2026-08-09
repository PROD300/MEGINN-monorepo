import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatCard } from './StatCard'

/** StatCard — KPI-карточка с цветным индикатором. Варианты: neutral / success / warning. */
const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  args: {
    variant: 'neutral',
    label: 'Portfolio AUM',
    value: '$12.4M',
    subtitle: '+2.3% today',
  },
  argTypes: {
    variant:  { control: 'inline-radio', options: ['neutral', 'success', 'warning'] },
    label:    { control: 'text' },
    value:    { control: 'text' },
    subtitle: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {
  args: { variant: 'neutral', label: 'Portfolio AUM', value: '$12.4M', subtitle: 'As of Jun 17, 2026' },
}

export const Success: Story = {
  args: { variant: 'success', label: 'Active Rules', value: '12 / 14', subtitle: 'All within threshold' },
}

export const Warning: Story = {
  args: { variant: 'warning', label: 'ETH Allocation', value: '28.4%', subtitle: 'Target 30% — drift –1.6%' },
}

/** Матрица Variant — все три рядом. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <StatCard variant="neutral" label="Portfolio AUM"   value="$12.4M"   subtitle="As of Jun 17, 2026" />
      <StatCard variant="success" label="Active Rules"    value="12 / 14"  subtitle="All within threshold" />
      <StatCard variant="warning" label="ETH Allocation"  value="28.4%"    subtitle="Target 30% — drift –1.6%" />
      <StatCard variant="neutral" label="Total Chains"    value="5"        subtitle="Ethereum · Arbitrum · Optimism · Base · Polygon" />
      <StatCard variant="success" label="Bridge Success"  value="99.2%"    subtitle="Last 30d" />
      <StatCard variant="warning" label="Compliance Risk" value="Medium"   subtitle="3 flags pending review" />
    </div>
  ),
}
