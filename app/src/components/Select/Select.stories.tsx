import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const networks = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'arbitrum', label: 'Arbitrum' },
  { value: 'optimism', label: 'Optimism' },
  { value: 'base',     label: 'Base' },
  { value: 'polygon',  label: 'Polygon' },
]

/** Select — нативный dropdown 240px. Состояния: default / open (нативный) / disabled. */
const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    options: networks,
    placeholder: 'Select network...',
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled:    { control: 'boolean' },
    options:     { control: 'object' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: { defaultValue: 'ethereum' },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'ethereum' },
}

const assetClasses = [
  { value: 'l1',    label: 'L1 Tokens' },
  { value: 'l2',    label: 'L2 Tokens' },
  { value: 'stable',label: 'Stablecoins' },
  { value: 'defi',  label: 'DeFi' },
  { value: 'rwa',   label: 'RWA' },
]

/** Матрица — разные наборы опций. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <Select options={networks}     placeholder="Select network..." />
      <Select options={networks}     defaultValue="arbitrum" />
      <Select options={assetClasses} placeholder="Asset class..." />
      <Select options={networks}     defaultValue="ethereum" disabled />
    </div>
  ),
}
