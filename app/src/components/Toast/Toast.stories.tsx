import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast } from './Toast'

/** Toast — уведомление-полоска. Варианты: success / warning / error. */
const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    variant: 'success',
    children: 'Rule saved successfully',
  },
  argTypes: {
    variant:  { control: 'inline-radio', options: ['success', 'warning', 'error'] },
    children: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: { variant: 'success', children: 'Rule saved successfully' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Allocation threshold approaching — 28.4% of 30%' },
}

export const Error: Story = {
  args: { variant: 'error', children: 'Bridge transaction failed: insufficient liquidity on Arbitrum' },
}

/** Матрица Variant — все три рядом. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 400 }}>
      <Toast variant="success">Rule saved successfully</Toast>
      <Toast variant="warning">Allocation threshold approaching — 28.4% of 30%</Toast>
      <Toast variant="error">Bridge transaction failed: insufficient liquidity on Arbitrum</Toast>
    </div>
  ),
}
