import type { Meta, StoryObj } from '@storybook/react-vite'
import { Server, Plus } from 'lucide-react'
import { Button } from './Button'

/** Button — основное действие, secondary outline, ghost-ссылка. Матрица: Type × Size × State. */
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Create Rule',
  },
  argTypes: {
    variant:  { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] },
    size:     { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    loading:  { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: 'primary' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }

export const Small: Story = { args: { size: 'sm', children: 'Add Node' } }
export const Large: Story = { args: { size: 'lg', children: 'Deploy Portfolio' } }

export const WithIcon: Story = {
  args: { variant: 'primary', icon: <Plus size={14} />, children: 'New Rule' },
}

export const Loading: Story = { args: { loading: true, children: 'Processing...' } }
export const Disabled: Story = { args: { disabled: true } }

/** Матрица Type × Size × State — все варианты рядом. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['primary', 'secondary', 'ghost'] as const).map(variant => (
        <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ width: 80, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>{variant}</span>
          {(['sm', 'md', 'lg'] as const).map(size => (
            <Button key={size} variant={variant} size={size}>
              {size === 'sm' ? 'Add Rule' : size === 'md' ? 'Create Rule' : 'Deploy Portfolio'}
            </Button>
          ))}
          <Button variant={variant} disabled>Disabled</Button>
          <Button variant={variant} loading>Loading</Button>
          <Button variant={variant} icon={<Server size={14} />}>With Icon</Button>
        </div>
      ))}
    </div>
  ),
}
