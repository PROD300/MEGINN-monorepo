import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

/** Badge — статусный пилл. Варианты: success / warning / error / info. */
const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    variant: 'success',
    children: 'Active',
  },
  argTypes: {
    variant:  { control: 'inline-radio', options: ['success', 'warning', 'error', 'info'] },
    children: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = { args: { variant: 'success', children: 'Active' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Paused' } }
export const Error: Story   = { args: { variant: 'error',   children: 'Error' } }
export const Info: Story    = { args: { variant: 'info',    children: 'Pending' } }

/** Все варианты рядом. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Paused</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Pending</Badge>
      <Badge variant="success">Rule OK</Badge>
      <Badge variant="warning">Threshold Near</Badge>
      <Badge variant="error">Bridge Failed</Badge>
      <Badge variant="info">Cross-chain</Badge>
    </div>
  ),
}
